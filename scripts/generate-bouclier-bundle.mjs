import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function u16(n) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n, 0);
  return b;
}

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n, 0);
  return b;
}

function zipStore(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const f of files) {
    const name = Buffer.from(f.name, "utf8");
    const data = Buffer.isBuffer(f.data) ? f.data : Buffer.from(f.data);
    const crc = crc32(data);
    const local = Buffer.concat([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),
      name,
      data,
    ]);
    const central = Buffer.concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      name,
    ]);
    locals.push(local);
    centrals.push(central);
    offset += local.length;
  }
  const centralDir = Buffer.concat(centrals);
  const end = Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);
  return Buffer.concat([...locals, centralDir, end]);
}

function xmlEscape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function makeDocx(paragraphs) {
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
  const body = paragraphs
    .map(
      (p) =>
        `<w:p><w:r><w:t xml:space="preserve">${xmlEscape(p)}</w:t></w:r></w:p>`,
    )
    .join("");
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${body}<w:sectPr/></w:body>
</w:document>`;
  return zipStore([
    { name: "[Content_Types].xml", data: contentTypes },
    { name: "_rels/.rels", data: rels },
    { name: "word/document.xml", data: document },
  ]);
}

function makeXlsx(rows) {
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
  const wbRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Boussole" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills count="1"><fill><patternFill patternType="none"/></fill></fills>
  <borders count="1"><border/></borders>
  <cellStyleXfs count="1"><xf/></cellStyleXfs>
  <cellXfs count="1"><xf xfId="0"/></cellXfs>
</styleSheet>`;
  const flat = rows.flat();
  const unique = [...new Set(flat)];
  const index = Object.fromEntries(unique.map((s, i) => [s, i]));
  const shared = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${flat.length}" uniqueCount="${unique.length}">
${unique.map((s) => `<si><t>${xmlEscape(s)}</t></si>`).join("")}
</sst>`;
  const sheetRows = rows
    .map((row, rIdx) => {
      const cells = row
        .map((cell, cIdx) => {
          const col = String.fromCharCode(65 + cIdx);
          return `<c r="${col}${rIdx + 1}" t="s"><v>${index[cell]}</v></c>`;
        })
        .join("");
      return `<row r="${rIdx + 1}">${cells}</row>`;
    })
    .join("");
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>${sheetRows}</sheetData>
</worksheet>`;
  return zipStore([
    { name: "[Content_Types].xml", data: contentTypes },
    { name: "_rels/.rels", data: rels },
    { name: "xl/workbook.xml", data: workbook },
    { name: "xl/_rels/workbook.xml.rels", data: wbRels },
    { name: "xl/worksheets/sheet1.xml", data: sheet },
    { name: "xl/sharedStrings.xml", data: shared },
    { name: "xl/styles.xml", data: styles },
  ]);
}

function makePdf(lines) {
  const textOps = lines
    .map((line, i) => {
      const y = 780 - i * 18;
      const escaped = line
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");
      return `BT /F1 11 Tf 50 ${y} Td (${escaped}) Tj ET`;
    })
    .join("\n");
  const stream = Buffer.from(textOps, "utf8");
  const objs = [
    "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n",
    "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n",
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n",
    `4 0 obj<< /Length ${stream.length} >>stream\n${stream.toString("latin1")}\nendstream\nendobj\n`,
    "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const o of objs) {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += o;
  }
  const xrefPos = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objs.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objs.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

const outDir = path.join(root, "public", "bundles");
fs.mkdirSync(outDir, { recursive: true });

const docx = makeDocx([
  "Bouclier IA Publique — Module 1",
  "Diagnostic Shadow AI & Charte d'Usage (Article 4)",
  "",
  "Institut Article 4 (A4I) — Licence CC BY-NC 4.0",
  "",
  "1. Cartographier les outils IA non declares (Shadow AI).",
  "2. Identifier les donnees traitees et les responsables.",
  "3. Adopter une charte d'usage alignee sur la litteratie IA Art. 4.",
  "4. Planifier la sensibilisation DGS / DSI / DPO.",
  "",
  "Modele open source — secteur public francophone.",
]);

const xlsx = makeXlsx([
  ["Systeme / Usage", "Domaine", "Niveau de risque", "Base legale", "Action"],
  ["Assistant redaction", "Administratif", "Limite", "Art. 4", "Charte + formation"],
  ["Chatbot usagers", "Service public", "Limite", "Art. 50", "Mention transparence"],
  ["Aide au triage", "Sante", "Eleve", "Annexe III", "Supervision humaine"],
  ["Scoring marches", "Achats", "Eleve", "Annexe III", "Clause CCAP"],
]);

const pdfRegistre = makePdf([
  "Bouclier IA Publique — Module 3",
  "Registre General & Transparence Algorithmique (Art. 50)",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Colonnes recommandees du registre:",
  "- Identifiant du systeme",
  "- Finalite et responsable",
  "- Fournisseur / hebergement",
  "- Niveau de risque",
  "- Mentions de transparence Art. 50",
  "- Date de revue DPO / DSI",
]);

const pdfScorecard = makePdf([
  "Bouclier IA Publique — Module 4",
  "Scorecard Executif (Niveaux 0 a 5) & Feuille de Route",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Niveau 0 — IA Sauvage",
  "Niveau 1 — Sensibilisation",
  "Niveau 2 — Cadre Initial",
  "Niveau 3 — Gouvernance Operationnelle",
  "Niveau 4 — Maitrise Institutionnelle",
  "Niveau 5 — IA Exemplaire",
  "",
  "Generer une attestation: /bouclier-public#scorecard",
]);

const readme = Buffer.from(
  [
    "Bouclier IA Publique (Safe Public AI Shield)",
    "Institut Article 4 (A4I) — Programme non-lucratif & open source (CC BY-NC 4.0)",
    "",
    "Contenu du package:",
    "1. 01-diagnostic-shadow-ai-charte.docx",
    "2. 02-boussole-risque-ia-clause-ccap.xlsx",
    "3. 03-registre-transparence-art50.pdf",
    "4. 04-scorecard-executif-feuille-de-route.pdf",
    "",
    "Alignement: DINUM/CNIL (FR), APD (BE), nLPD/PFPDT (CH)",
    "Verification attestations: https://waqfledger.tech",
  ].join("\n"),
  "utf8",
);

const bundle = zipStore([
  { name: "README.txt", data: readme },
  { name: "01-diagnostic-shadow-ai-charte.docx", data: docx },
  { name: "02-boussole-risque-ia-clause-ccap.xlsx", data: xlsx },
  { name: "03-registre-transparence-art50.pdf", data: pdfRegistre },
  { name: "04-scorecard-executif-feuille-de-route.pdf", data: pdfScorecard },
]);

const outPath = path.join(outDir, "Bouclier_IA_Publique_Bundle_v2026.zip");
fs.writeFileSync(outPath, bundle);
console.log(`Wrote ${outPath} (${bundle.length} bytes)`);
