/* Lädt Schriften aus dem Google-Fonts-Repository, schneidet sie auf die
   Zeichen zu, die diese Seite braucht, und legt sie als WOFF2 unter
   schrift/ ab. Die Seite lädt danach nichts mehr von fremden Servern —
   das ist in Deutschland keine Feinheit, sondern Pflicht.

   Aufruf:  node werkzeug/schriften-holen.mjs [zielordner]                 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ziel = process.argv[2] || 'schrift';
const zwischen = '/tmp/schrift-roh';

// Latin + Latin-Ext, so weit die Seite es braucht: deutsche Umlaute, das
// scharfe S, französische Akzente in Namen, Anführungszeichen, Zeichen für
// Preise und Maßangaben.
const zeichen =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  'ÄÖÜäöüßÀÁÂÃÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕØÙÚÛÝàáâãåæçèéêëìíîïñòóôõøùúûýÿŁłŠšŽžŒœ' +
  ' .,:;!?¿¡\'"„“”‚‘’«»…–—-–_/\\|()[]{}#*+=<>@&%€$£¢°·•~^`´¨' +
  '™©®№§†‡½¼¾×÷±≈≤≥→←↑↓✓✕';

const schriften = [
  // Die Schriften dieser Fassung. Beide stehen so im Auftrag des
  // Auftraggebers; sie liegen im Projekt, nicht bei Google.
  { datei: 'InstrumentSerif-Regular', pfad: 'ofl/instrumentserif/InstrumentSerif-Regular.ttf' },
  { datei: 'InstrumentSerif-Italic',  pfad: 'ofl/instrumentserif/InstrumentSerif-Italic.ttf' },
  { datei: 'Inter',                   pfad: 'ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf' },

  // Anzeige
  { datei: 'Marcellus-Regular',    pfad: 'ofl/marcellus/Marcellus-Regular.ttf' },
  { datei: 'MarcellusSC-Regular',  pfad: 'ofl/marcellussc/MarcellusSC-Regular.ttf' },
  { datei: 'Prata-Regular',        pfad: 'ofl/prata/Prata-Regular.ttf' },
  { datei: 'Gloock-Regular',       pfad: 'ofl/gloock/Gloock-Regular.ttf' },
  { datei: 'BodoniModa',           pfad: 'ofl/bodonimoda/BodoniModa%5Bopsz%2Cwght%5D.ttf' },
  { datei: 'Cinzel',               pfad: 'ofl/cinzel/Cinzel%5Bwght%5D.ttf' },
  // Text
  { datei: 'AlegreyaSans-Regular', pfad: 'ofl/alegreyasans/AlegreyaSans-Regular.ttf' },
  { datei: 'AlegreyaSans-Medium',  pfad: 'ofl/alegreyasans/AlegreyaSans-Medium.ttf' },
  { datei: 'AlegreyaSans-Bold',    pfad: 'ofl/alegreyasans/AlegreyaSans-Bold.ttf' },
  { datei: 'AlegreyaSans-Italic',  pfad: 'ofl/alegreyasans/AlegreyaSans-Italic.ttf' },
  { datei: 'Karla',                pfad: 'ofl/karla/Karla%5Bwght%5D.ttf' },
  { datei: 'Archivo',              pfad: 'ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf' },
];

mkdirSync(zwischen, { recursive: true });
mkdirSync(ziel, { recursive: true });

const nurDiese = process.argv.slice(3);
for (const s of schriften) {
  if (nurDiese.length && !nurDiese.includes(s.datei)) continue;
  const roh = join(zwischen, `${s.datei}.ttf`);
  if (!existsSync(roh)) {
    const url = `https://raw.githubusercontent.com/google/fonts/main/${s.pfad}`;
    try {
      execFileSync('curl', ['-fsSL', '--max-time', '60', '-o', roh, url]);
    } catch {
      console.log(`  ✕ ${s.datei} — nicht geladen`);
      continue;
    }
  }
  const aus = join(ziel, `${s.datei}.woff2`);
  const args = [roh, `--text=${zeichen}`, '--flavor=woff2', '--layout-features=kern,liga,onum,lnum,tnum,frac,smcp,c2sc,ss01,ss02',
                '--no-hinting', '--desubroutinize', `--output-file=${aus}`];
  try {
    execFileSync('pyftsubset', args, { stdio: 'pipe' });
    const kb = Math.round(execFileSync('stat', ['-c', '%s', aus]).toString().trim() / 1024);
    console.log(`  ✓ ${s.datei}.woff2  ${kb} KB`);
  } catch (e) {
    console.log(`  ✕ ${s.datei} — ${String(e.stderr || e).slice(0, 120)}`);
  }
}
if (process.env.AUFRAEUMEN) rmSync(zwischen, { recursive: true, force: true });
