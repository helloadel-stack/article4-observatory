import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function escapePdfText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function toPdfLatin1(value) {
  const fancy = {
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2013": "-",
    "\u2014": "-",
    "\u2026": "...",
    "\u00a0": " ",
    "\u2122": "(TM)",
  };
  return [...value]
    .map((ch) => {
      if (fancy[ch]) return fancy[ch];
      const code = ch.charCodeAt(0);
      if (code >= 0x20 && code <= 0xff) return ch;
      return "?";
    })
    .join("");
}

function buildSimplePdf(lines, opts = {}) {
  const fontSize = opts.fontSize ?? 11;
  const lineHeight = opts.lineHeight ?? 16;
  const startY = 800;
  const contentLines = lines.map((line, i) => {
    const y = startY - i * lineHeight;
    const text = escapePdfText(toPdfLatin1(line));
    return `BT /F1 ${fontSize} Tf 50 ${y} Td (${text}) Tj ET`;
  });
  const stream = Buffer.from(contentLines.join("\n"), "latin1");
  const objs = [
    "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n",
    "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n",
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n",
    `4 0 obj<< /Length ${stream.length} >>stream\n${stream.toString("latin1")}\nendstream\nendobj\n`,
    "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>endobj\n",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const obj of objs) {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += obj;
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

const outDir = path.join(root, "public", "downloads");
fs.mkdirSync(outDir, { recursive: true });

const pdf = buildSimplePdf(
  [
    "ARTICLE 4 INSTITUTE",
    "SafeAI Framework — Ateliers Juridiques Executive",
    "https://article4institute.org",
    "",
    "PLAQUETTE PROGRAMME",
    "Masterclass & Workshop In-Situ",
    "Gouvernance IA & Audit AI Act pour Professionnels du Droit",
    "",
    "Public cible",
    "- Cabinets d'Avocats",
    "- Directeurs Juridiques / CLO",
    "- Ordres des Avocats / Barreaux",
    "",
    "Curriculum (6 heures pédagogiques)",
    "1. Secret Professionnel & Shadow AI Juridique (1,5 h)",
    "2. Qualification Contractuelle & Clause Marchés & SaaS IA (2 h)",
    "3. Transparence Algorithmique & Registre Art. 50 (1,5 h)",
    "4. Audit Cryptographique & Attestation WaqfLedger (1 h)",
    "",
    "Formats",
    "- 1 Journée Intensive",
    "- 2 Journées Résidentielles",
    "",
    "Référentiels",
    "CNIL · DINUM · APD (Belgique) · PFPDT (Suisse)",
    "Standards de formation continue des Barreaux",
    "",
    "Réservation & lettre d'invitation",
    "https://article4institute.org/ateliers-juridiques#reservation",
    "sales@article4institute.org",
    "",
    "Preuves d'audit : https://waqfledger.tech",
    "Licence institutionnelle — Article 4 Institute (A4I) 2026",
  ],
  { fontSize: 10, lineHeight: 14 },
);

const outPath = path.join(outDir, "ateliers-juridiques-plaquette.pdf");
fs.writeFileSync(outPath, pdf);
console.log(`Wrote ${outPath} (${pdf.length} bytes)`);
