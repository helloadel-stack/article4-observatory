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

function makeXlsx(rows, sheetName = "Feuille1") {
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
  <sheets><sheet name="${xmlEscape(String(sheetName).slice(0, 31))}" sheetId="1" r:id="rId1"/></sheets>
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

function stripAccents(s) {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

function makePdf(lines) {
  const textOps = lines
    .map((line, i) => {
      const y = 780 - i * 18;
      const escaped = stripAccents(line)
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

const licenseNotice = [
  "Licence Creative Commons Attribution - Pas d'Utilisation Commerciale 4.0 International (CC BY-NC 4.0).",
  "Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).",
  "Licencia Creative Commons Atribucion-NoComercial 4.0 Internacional (CC BY-NC 4.0).",
  "https://creativecommons.org/licenses/by-nc/4.0/",
  "Livrable de preparation a la gouvernance — jamais un certificat de conformite legale ni une homologation officielle AI Act.",
];

const matriceShadow = makeXlsx(
  [
    [
      "ID",
      "Outil / Usage",
      "Service",
      "Donnees traitees",
      "Declare",
      "Risque",
      "Base legale",
      "Responsable",
      "Action",
    ],
    [
      "SA-01",
      "Assistant redaction",
      "Secretariat general",
      "Courriers administratifs",
      "Oui",
      "Limite",
      "Art. 4",
      "DGS",
      "Charte + formation",
    ],
    [
      "SA-02",
      "Chatbot usagers",
      "Accueil numerique",
      "Questions usagers",
      "Oui",
      "Limite",
      "Art. 50",
      "DSI",
      "Mention transparence",
    ],
    [
      "SA-03",
      "Aide au triage",
      "Sante / hopital",
      "Donnees de sante",
      "Non",
      "Eleve",
      "Annexe III",
      "DPO",
      "Supervision humaine",
    ],
    [
      "SA-04",
      "Scoring marches",
      "Achats",
      "Offres / notations",
      "Non",
      "Eleve",
      "Annexe III",
      "DAF",
      "Clause CCAP",
    ],
    ["SA-05", "", "", "", "Non", "", "", "", "A completer"],
  ],
  "Matrice Shadow AI",
);

const charteUsage = makeDocx([
  "Bouclier IA Publique — Module 1",
  "Charte d'usage institutionnelle (Article 4)",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "1. Objet — Encadrer l'usage de l'IA par les agents, prestataires et elus.",
  "2. Champ — Tous les systemes d'IA, y compris les outils non declares (Shadow AI).",
  "3. Litteratie Article 4 — Les operateurs qui conçoivent ou appliquent les politiques doivent demontrer une competence IA.",
  "4. Donnees — Interdiction d'injecter des donnees personnelles, de sante ou de marche non autorisees dans un outil non habilite.",
  "5. Transparence — Mention claire lorsqu'un usager interagit avec un systeme d'IA (Article 50).",
  "6. Responsabilites — DGS (pilotage), DSI (hebergement), DPO (protection des donnees).",
  "7. Sanction interne — Signalement via le formulaire d'incident du Module 3.",
  "",
  ...licenseNotice,
]);

const planSensibilisation = makePdf([
  "Bouclier IA Publique — Module 1",
  "Plan de sensibilisation DGS / DSI / DPO",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Mois 1 : cartographie Shadow AI et comite de lancement.",
  "Mois 2 : atelier Article 4 pour encadrants (litteratie operateurs).",
  "Mois 3 : clause CCAP et boussole de risque (Module 2).",
  "Mois 4 : registre public et mentions Article 50 (Module 3).",
  "Mois 5-6 : scorecard executif et feuille de route 12 mois.",
  "",
  "Publics : elus, DGS, DSI, DPO, chefs de service, acheteurs.",
  "Preuve : attestation A4I-SHIELD via /bouclier-public#scorecard",
  "",
  ...licenseNotice,
]);

const boussole = makeXlsx(
  [
    [
      "Question",
      "Si oui",
      "Si non",
      "Categorie AI Act",
      "Action minimale",
    ],
    [
      "Identification biométrique temps reel dans l'espace public ?",
      "Interdit Art. 5 — arreter",
      "Continuer",
      "Article 5",
      "Decommissionner",
    ],
    [
      "Decision ou notation sur des personnes (education, sante, prestations) ?",
      "Annexe III — haut risque",
      "Continuer",
      "Annexe III",
      "Supervision humaine + audit",
    ],
    [
      "Interaction directe avec un usager ?",
      "Article 50",
      "Continuer",
      "Article 50",
      "Mention de transparence",
    ],
    [
      "Hebergement hors UE / hyperscaler US ?",
      "Risque souverainete",
      "Souverain",
      "Gouvernance",
      "Clause CCAP + plan de migration",
    ],
    [
      "Personnel operateurs forme Article 4 ?",
      "OK",
      "Ecart litteratie",
      "Article 4",
      "Plan de sensibilisation",
    ],
  ],
  "Boussole Risque IA",
);

const clauseCcap = makeDocx([
  "Bouclier IA Publique — Module 2",
  "Clause type CCAP — Marches publics IA",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Article X — Transparence et souverainete des systemes d'IA",
  "Le titulaire declare tout systeme d'IA utilise pour l'execution du marche.",
  "Il indique le lieu d'hebergement, le sous-traitant, le modele et les flux transatlantiques.",
  "Les systemes a haut risque (Annexe III) exigent une supervision humaine documentee.",
  "Toute interaction usager doit porter une mention de transparence (Article 50).",
  "Les identifications biometriques temps reel dans l'espace public sont exclues (Article 5).",
  "Le titulaire communique un registre des modeles et prompts a haut impact.",
  "Le pouvoir adjudicateur peut exiger un hebergement SecNumCloud, bare-metal souverain ou on-premise.",
  "Non-conformite : mise en demeure, puis resiliation pour faute.",
  "",
  ...licenseNotice,
]);

const grilleFournisseurs = makePdf([
  "Bouclier IA Publique — Module 2",
  "Grille d'evaluation fournisseurs IA",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Critere 1 — Classification AI Act (Art. 5 / Annexe III / Art. 50).",
  "Critere 2 — Hebergement souverain (SecNumCloud, UE, on-prem).",
  "Critere 3 — Supervision humaine et droit d'override.",
  "Critere 4 — Litteratie Article 4 des operateurs prestataires.",
  "Critere 5 — Registre des modeles, prompts et sous-traitants.",
  "Critere 6 — Alignement DINUM/CNIL, APD, nLPD/PFPDT, Loi 25.",
  "Notation : 0 (absent) a 5 (exemplaire). Seuil d'attribution : 3/5.",
  "",
  ...licenseNotice,
]);

const registre = makeXlsx(
  [
    [
      "ID systeme",
      "Finalite",
      "Responsable",
      "Fournisseur / hebergement",
      "Categorie AI Act",
      "Supervision humaine",
      "Mention Art. 50",
      "Revue DPO/DSI",
    ],
    [
      "REG-01",
      "Chatbot accueil",
      "DSI",
      "SecNumCloud",
      "Article 50",
      "Revue supervisee",
      "Oui",
      "2026-09-01",
    ],
    [
      "REG-02",
      "Aide au diagnostic",
      "Direction medicale",
      "HDS souverain",
      "Annexe III",
      "Double override",
      "Oui",
      "2026-08-15",
    ],
    ["REG-03", "", "", "", "", "", "", ""],
  ],
  "Registre Art. 50",
);

const protocolesHitl = makeDocx([
  "Bouclier IA Publique — Module 3",
  "Protocoles de supervision humaine",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Niveau A — Double override obligatoire avant toute mesure adverse.",
  "Niveau B — Revue humaine supervisee sous 48 heures.",
  "Niveau C — Avis humain consultatif, sans decision autonome.",
  "Interdit — Fonctionnement autonome sur des droits ou prestations.",
  "Journal : identifiant du dossier, operateur, decision, horodatage.",
  "Preuve : empreinte SHA-256 optionnelle via WaqfLedger.",
  "",
  ...licenseNotice,
]);

const formulaireIncident = makePdf([
  "Bouclier IA Publique — Module 3",
  "Formulaire de signalement d'incident IA",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "1. Date / heure / service",
  "2. Systeme ou outil implique",
  "3. Personnes concernees (sans donnee excessive)",
  "4. Nature : biais, fuite, decision autonome, absence de mention Art. 50",
  "5. Mesure immédiate (isolation, override, information DPO)",
  "6. Escalade DGS / DSI / DPO sous 24 heures",
  "7. Revue et clôture documentee",
  "",
  ...licenseNotice,
]);

const scorecardPdf = makePdf([
  "Bouclier IA Publique — Module 4",
  "Scorecard de maturite IA publique (niveaux 0 a 5)",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "0 IA Sauvage — usages non gouvernes, Shadow AI generalisee.",
  "1 Sensibilisation — cartographie et formation Article 4 engagees.",
  "2 Cadre initial — charte adoptee, clause CCAP en cours.",
  "3 Gouvernance operationnelle — registre et Art. 50 actifs.",
  "4 Maitrise institutionnelle — scorecard suivi, audits periodiques.",
  "5 IA Exemplaire — preuves WaqfLedger, alignement regional demontre.",
  "",
  "Generer l'attestation : https://article4institute.org/bouclier-public#scorecard",
  "",
  ...licenseNotice,
]);

const roadmap = makeDocx([
  "Bouclier IA Publique — Module 4",
  "Feuille de route strategique 6 / 12 mois",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "0-3 mois : matrice Shadow AI, charte, comite IA, sensibilisation Article 4.",
  "3-6 mois : boussole de risque, clause CCAP, grille fournisseurs.",
  "6-9 mois : registre public, protocoles HITL, formulaire d'incident.",
  "9-12 mois : scorecard executif, budget, attestation A4I-SHIELD, revue annuelle.",
  "Jalons : DGS (pilotage), DSI (hebergement), DPO (conformite).",
  "Indicateurs : % usages declares, % hebergement souverain, delai d'override.",
  "",
  ...licenseNotice,
]);

const guideComite = makePdf([
  "Bouclier IA Publique — Module 4",
  "Guide de structuration du Comite IA",
  "Institut Article 4 (A4I) — CC BY-NC 4.0",
  "",
  "Composition minimale : DGS, DSI, DPO, direction metier, elu referent.",
  "Frequence : trimestrielle, plus cellule incident sous 24 h.",
  "Ordre du jour type : registre, risques Annexe III, litteratie, marches.",
  "Livrables : compte rendu, scorecard, arbitrages d'override.",
  "Lien observatoire : cartographie des deploiements publics et educatifs.",
  "",
  ...licenseNotice,
]);

const readme = Buffer.from(
  [
    "Bouclier IA Publique (Safe Public AI Shield / Escudo IA Publica)",
    "Institut Article 4 (A4I) — Programme non-lucratif pro bono — CC BY-NC 4.0",
    "",
    "Ce kit n'est PAS un logiciel open source OSI. Il est publie sous licence",
    "non commerciale CC BY-NC 4.0 pour le secteur public et educatif.",
    "",
    "Module 1 — Diagnostic Shadow AI & Charte (Art. 4)",
    "  01-matrice-shadow-ai.xlsx",
    "  01-charte-usage-institutionnelle.docx",
    "  01-plan-sensibilisation-dgs-dsi-dpo.pdf",
    "",
    "Module 2 — Boussole du Risque IA & Clause marches publics",
    "  02-boussole-risque-ia.xlsx",
    "  02-clause-type-ccap-ia.docx",
    "  02-grille-evaluation-fournisseurs.pdf",
    "",
    "Module 3 — Registre & Transparence algorithmique (Art. 50)",
    "  03-registre-modeles-prompts.xlsx",
    "  03-protocoles-supervision-humaine.docx",
    "  03-formulaire-signalement-incident.pdf",
    "",
    "Module 4 — Scorecard executif & feuille de route",
    "  04-scorecard-maturite-ia-publique.pdf",
    "  04-roadmap-strategique-6-12-mois.docx",
    "  04-guide-structuration-comite-ia.pdf",
    "",
    "Alignement: DINUM/CNIL + France Universites/CGE + ISO/IEC 42001 (FR),",
    "APD (BE), nLPD/PFPDT (CH), Loi 25 + OBVIA (Quebec).",
    "Attestation: https://article4institute.org/bouclier-public#scorecard",
    "Verification: https://waqfledger.tech/verify",
    "Observatoire: https://article4institute.org#observatory",
  ].join("\n"),
  "utf8",
);

const licenseTxt = Buffer.from(licenseNotice.join("\n"), "utf8");

const bundle = zipStore([
  { name: "README.txt", data: readme },
  { name: "LICENSE-CC-BY-NC-4.0.txt", data: licenseTxt },
  { name: "01-matrice-shadow-ai.xlsx", data: matriceShadow },
  { name: "01-charte-usage-institutionnelle.docx", data: charteUsage },
  { name: "01-plan-sensibilisation-dgs-dsi-dpo.pdf", data: planSensibilisation },
  { name: "02-boussole-risque-ia.xlsx", data: boussole },
  { name: "02-clause-type-ccap-ia.docx", data: clauseCcap },
  { name: "02-grille-evaluation-fournisseurs.pdf", data: grilleFournisseurs },
  { name: "03-registre-modeles-prompts.xlsx", data: registre },
  { name: "03-protocoles-supervision-humaine.docx", data: protocolesHitl },
  { name: "03-formulaire-signalement-incident.pdf", data: formulaireIncident },
  { name: "04-scorecard-maturite-ia-publique.pdf", data: scorecardPdf },
  { name: "04-roadmap-strategique-6-12-mois.docx", data: roadmap },
  { name: "04-guide-structuration-comite-ia.pdf", data: guideComite },
]);

const outPath = path.join(outDir, "Bouclier_IA_Publique_Bundle_v2026.zip");
fs.writeFileSync(outPath, bundle);
console.log(`Wrote ${outPath} (${bundle.length} bytes)`);
