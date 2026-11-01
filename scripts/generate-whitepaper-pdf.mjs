/**
 * One-time generator for the official 2026 doctrinal white paper.
 * No native dependencies: multi-page PDF 1.4, Helvetica, WinAnsi.
 *
 * Output:
 *   public/docs/Livre_Blanc_2026_Auditabilite_IA_Publique_Institut_Article_4.pdf
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PDF_PUBLIC_PATH =
  "/docs/Livre_Blanc_2026_Auditabilite_IA_Publique_Institut_Article_4.pdf";
const OUT_PATH = path.join(root, "public", PDF_PUBLIC_PATH);

const EM = String.fromCharCode(0x97);
const BULLET = String.fromCharCode(0x95);

const REFERENCE = "A4I-DOC-2026-001";
const LICENSE = "CC BY-NC 4.0";
const PUBLISHER =
  "L'Institut Article 4 (Association Loi 1901 " +
  EM +
  " Independent Observatory & Trusted Third-Party)";
const AUTHOR =
  "Adel El Bouzagaoui, Research Director, L'Institut Article 4";
const EN_TITLE =
  "2026 White Paper: Enforceable Auditability of AI Systems in Public Services and Higher Education " +
  EM +
  " Operationalizing EU AI Act Article 14 and Annex III via Zero-Knowledge Cryptographic State Sealing";
const FR_TITLE =
  "Livre Blanc 2026 : L'Auditabilité Opposable des Systèmes d'IA dans les Services Publics et l'Enseignement Supérieur";
const FORMULA =
  "SHA-256(Metadata || Annex III Matrix || Oversight Log)";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 52;
const CONTENT_W = PAGE_W - MARGIN * 2;
const HEADER_H = 46;
const MIN_Y = 52;
const SLATE = "0.0588 0.0902 0.1647";
const BODY = "0.0980 0.1216 0.1725";
const MUTED = "0.3216 0.3765 0.4431";
const RULE = "0.7961 0.8353 0.8824";
const WASH = "0.9451 0.9569 0.9686";
const WHITE = "1 1 1";

const WIDTH = new Map();
function setWidth(chars, units) {
  for (const ch of chars) WIDTH.set(ch, units);
}
setWidth(" ", 278);
setWidth("ijlI'", 222);
setWidth("ftr", 333);
setWidth("s", 500);
setWidth("acegz", 500);
setWidth("bdhnopqu", 556);
setWidth("m", 833);
setWidth("w", 722);
setWidth("J", 500);
setWidth("IL", 556);
setWidth("EF", 611);
setWidth("ABDKPR", 667);
setWidth("CHNOQTUVXY", 722);
setWidth("G", 778);
setWidth("M", 833);
setWidth("W", 944);
setWidth("0123456789", 556);
setWidth(".,:;|!", 278);
setWidth("?-()[]/", 333);
setWidth("+=<>", 584);
setWidth("&", 667);
setWidth("%@", 833);
setWidth("éèêë", 556);
setWidth("àáâäã", 556);
setWidth("ç", 500);
setWidth("ùúûü", 556);
setWidth("ïîìí", 278);
setWidth("ôöòóõ", 556);
setWidth("ñ", 556);
setWidth("ÿý", 500);
setWidth("Æ", 1000);
setWidth("æ", 889);
setWidth("Œ", 1000);
setWidth("œ", 889);
setWidth("«»", 333);
setWidth("§", 556);
setWidth(EM, 1000);
setWidth(BULLET, 350);

function textWidth(value, size, bold) {
  const scale = bold ? 1.08 : 1;
  let width = 0;
  for (const ch of value) {
    width += ((WIDTH.get(ch) ?? 580) / 1000) * size * scale;
  }
  return width;
}

function wrap(value, size, bold, maxWidth) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  const pushHard = (word) => {
    let piece = "";
    for (const ch of word) {
      const trial = piece + ch;
      if (piece && textWidth(trial, size, bold) > maxWidth) {
        lines.push(piece);
        piece = ch;
      } else {
        piece = trial;
      }
    }
    return piece;
  };
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (textWidth(trial, size, bold) <= maxWidth) {
      current = trial;
    } else {
      if (current) lines.push(current);
      current =
        textWidth(word, size, bold) > maxWidth ? pushHard(word) : word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function pdfLiteral(value) {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    if (code === 0x5c || code === 0x28 || code === 0x29) out += `\\${ch}`;
    else if (code < 32 || code > 255) out += "?";
    else out += ch;
  }
  return `(${out})`;
}

function num(value) {
  return Number(value).toFixed(2);
}

class Document {
  constructor() {
    this.pages = [];
    this.ops = [];
    this.y = 0;
    this.fresh = true;
    this.newPage();
  }

  newPage() {
    this.ops = [];
    this.pages.push(this.ops);
    this.paintHeader();
    this.y = PAGE_H - HEADER_H - 22;
    this.fresh = true;
  }

  paintHeader() {
    const bottom = PAGE_H - HEADER_H;
    this.ops.push(`${SLATE} rg`);
    this.ops.push(`0 ${num(bottom)} ${num(PAGE_W)} ${num(HEADER_H)} re f`);
    this.ops.push("0.7961 0.8353 0.8824 rg");
    this.ops.push(`0 ${num(bottom - 2.4)} ${num(PAGE_W)} 2.4 re f`);
    this.ops.push(`${WHITE} rg`);
    this.ops.push(
      `BT /F2 8.5 Tf 1 0 0 1 ${num(MARGIN)} ${num(bottom + 18)} Tm ${pdfLiteral("L'INSTITUT ARTICLE 4")} Tj ET`,
    );
    const right = `${REFERENCE}   |   ${LICENSE}`;
    const rightWidth = textWidth(right, 8, false);
    this.ops.push(
      `BT /F1 8 Tf 1 0 0 1 ${num(PAGE_W - MARGIN - rightWidth)} ${num(bottom + 18)} Tm ${pdfLiteral(right)} Tj ET`,
    );
  }

  ensure(height) {
    if (this.y - height < MIN_Y) {
      if (this.fresh) return;
      this.newPage();
    }
  }

  draw(text, x, baseline, font, size, color) {
    this.ops.push(`${color} rg`);
    this.ops.push(
      `BT ${font} ${num(size)} Tf 1 0 0 1 ${num(x)} ${num(baseline)} Tm ${pdfLiteral(text)} Tj ET`,
    );
    this.fresh = false;
  }

  paragraph(text, opts = {}) {
    const size = opts.size ?? 10.5;
    const leading = opts.leading ?? 14.6;
    const font = opts.bold ? "/F2" : opts.italic ? "/F3" : "/F1";
    const color = opts.color ?? BODY;
    const gapAfter = opts.gapAfter ?? 8;
    const indent = opts.indent ?? 0;
    const lines = wrap(text, size, Boolean(opts.bold), CONTENT_W - indent);
    for (const line of lines) {
      this.ensure(leading);
      this.draw(line, MARGIN + indent, this.y - size, font, size, color);
      this.y -= leading;
    }
    this.y -= gapAfter;
  }

  heading(kicker, title) {
    this.ensure(46);
    this.ops.push(`${SLATE} rg`);
    this.ops.push(
      `${num(MARGIN)} ${num(this.y - 18)} 3.2 18 re f`,
    );
    this.draw(kicker, MARGIN + 12, this.y - 8, "/F2", 8, MUTED);
    this.y -= 20;
    const lines = wrap(title, 13, true, CONTENT_W - 12);
    for (const line of lines) {
      this.ensure(17);
      this.draw(line, MARGIN + 12, this.y - 13, "/F2", 13, SLATE);
      this.y -= 16.5;
    }
    this.y -= 8;
  }

  rule() {
    this.ensure(14);
    this.ops.push(`${RULE} rg`);
    this.ops.push(
      `${num(MARGIN)} ${num(this.y - 4)} ${num(CONTENT_W)} 0.8 re f`,
    );
    this.y -= 16;
    this.fresh = false;
  }

  statPair(leftValue, leftLabel, rightValue, rightLabel) {
    const gap = 12;
    const boxW = (CONTENT_W - gap) / 2;
    const leftLines = wrap(leftLabel, 8.5, false, boxW - 28);
    const rightLines = wrap(rightLabel, 8.5, false, boxW - 28);
    const boxH = Math.max(72, 50 + Math.max(leftLines.length, rightLines.length) * 11);
    this.ensure(boxH + 8);
    const bottom = this.y - boxH;
    for (const [index, value, label] of [
      [0, leftValue, leftLabel],
      [1, rightValue, rightLabel],
    ]) {
      const x = MARGIN + index * (boxW + gap);
      this.ops.push(`${WASH} rg`);
      this.ops.push(`${num(x)} ${num(bottom)} ${num(boxW)} ${num(boxH)} re f`);
      this.ops.push(`${SLATE} rg`);
      this.ops.push(`${num(x)} ${num(bottom)} 3 ${num(boxH)} re f`);
      this.draw(value, x + 16, bottom + 40, "/F2", 18, SLATE);
      const labelLines = wrap(label, 8.5, false, boxW - 28);
      let labelY = bottom + 22;
      for (const line of labelLines) {
        this.draw(line, x + 16, labelY, "/F1", 8.5, MUTED);
        labelY -= 11;
      }
    }
    this.y = bottom - 14;
    this.fresh = false;
  }

  formula(text) {
    const lines = wrap(text, 10, true, CONTENT_W - 28);
    const boxH = 18 + lines.length * 14;
    this.ensure(boxH + 6);
    const bottom = this.y - boxH;
    this.ops.push(`${SLATE} rg`);
    this.ops.push(
      `${num(MARGIN)} ${num(bottom)} ${num(CONTENT_W)} ${num(boxH)} re f`,
    );
    let baseline = this.y - 20;
    for (const line of lines) {
      this.draw(line, MARGIN + 14, baseline, "/F2", 10, WHITE);
      baseline -= 14;
    }
    this.y = bottom - 14;
    this.fresh = false;
  }

  bullet(text) {
    const size = 10.5;
    const leading = 14.6;
    const lines = wrap(text, size, false, CONTENT_W - 16);
    lines.forEach((line, index) => {
      this.ensure(leading);
      if (index === 0) {
        this.draw(BULLET, MARGIN, this.y - size, "/F1", size, SLATE);
      }
      this.draw(line, MARGIN + 16, this.y - size, "/F1", size, BODY);
      this.y -= leading;
    });
    this.y -= 4;
  }

  finalize() {
    const total = this.pages.length;
    this.pages.forEach((ops, index) => {
      const footer = new DocumentFooter(ops);
      footer.paint(index + 1, total);
    });
    return this.pages.map((ops) => ops.join("\n"));
  }
}

class DocumentFooter {
  constructor(ops) {
    this.ops = ops;
  }

  paint(page, total) {
    this.ops.push(`${WASH} rg`);
    this.ops.push(`0 0 ${num(PAGE_W)} 34 re f`);
    this.ops.push(`${SLATE} rg`);
    this.ops.push(`0 34 ${num(PAGE_W)} 1.15 re f`);
    const left =
      "Association Loi 1901  ·  Independent Observatory & Trusted Third-Party";
    this.ops.push(`${SLATE} rg`);
    this.ops.push(
      `BT /F1 7.5 Tf 1 0 0 1 ${num(MARGIN)} 14.5 Tm ${pdfLiteral(left)} Tj ET`,
    );
    const label = `${page}  /  ${total}`;
    const labelWidth = textWidth(label, 8, true);
    this.ops.push(
      `BT /F2 8 Tf 1 0 0 1 ${num(PAGE_W - MARGIN - labelWidth)} 14.5 Tm ${pdfLiteral(label)} Tj ET`,
    );
  }
}

function buildPdf(pageStreams) {
  const bodies = [null];
  const reserve = () => {
    bodies.push(null);
    return bodies.length - 1;
  };
  const add = (body) => {
    bodies.push(Buffer.from(body, "latin1"));
    return bodies.length - 1;
  };

  const catalogId = reserve();
  const pagesId = reserve();
  const fontId = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );
  const fontBoldId = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );
  const fontItalicId = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>",
  );
  const infoId = add(
    `<< /Title ${pdfLiteral(EN_TITLE)} /Author ${pdfLiteral("Adel El Bouzagaoui")} /Subject ${pdfLiteral(FR_TITLE)} /Keywords ${pdfLiteral(`${REFERENCE}, ${LICENSE}, EU AI Act, Article 14, Annex III, VerifIA, WaqfLedger`)} /Creator ${pdfLiteral("L'Institut Article 4")} /Producer ${pdfLiteral(REFERENCE)} >>`,
  );

  const pageIds = [];
  for (const stream of pageStreams) {
    const content = Buffer.from(stream, "latin1");
    const contentId = bodies.length;
    bodies.push(
      Buffer.concat([
        Buffer.from(`<< /Length ${content.length} >>\nstream\n`, "latin1"),
        content,
        Buffer.from("\nendstream", "latin1"),
      ]),
    );
    const pageId = add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${num(PAGE_W)} ${num(PAGE_H)}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R >> >> >>`,
    );
    pageIds.push(pageId);
  }

  bodies[pagesId] = Buffer.from(
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`,
    "latin1",
  );
  bodies[catalogId] = Buffer.from(
    `<< /Type /Catalog /Pages ${pagesId} 0 R >>`,
    "latin1",
  );

  const chunks = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1")];
  const offsets = [0];
  const position = () => chunks.reduce((sum, chunk) => sum + chunk.length, 0);

  for (let id = 1; id < bodies.length; id += 1) {
    offsets[id] = position();
    chunks.push(Buffer.from(`${id} 0 obj\n`, "latin1"));
    chunks.push(bodies[id]);
    chunks.push(Buffer.from("\nendobj\n", "latin1"));
  }

  const xrefPos = position();
  let xref = `xref\n0 ${bodies.length}\n`;
  xref += "0000000000 65535 f \n";
  for (let id = 1; id < bodies.length; id += 1) {
    xref += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${bodies.length} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
  chunks.push(Buffer.from(xref, "latin1"));
  return Buffer.concat(chunks);
}

function compose() {
  const doc = new Document();

  doc.paragraph("SCIENTIFIC PUBLICATION  ·  PUBLIC-INTEREST MISSION  ·  2026", {
    size: 8,
    bold: true,
    color: MUTED,
    leading: 12,
    gapAfter: 12,
  });
  doc.paragraph(EN_TITLE, {
    size: 15,
    bold: true,
    color: SLATE,
    leading: 19.5,
    gapAfter: 10,
  });
  doc.paragraph(FR_TITLE, {
    size: 11.5,
    italic: true,
    color: BODY,
    leading: 15.5,
    gapAfter: 8,
  });
  doc.rule();

  doc.paragraph("HEADER METADATA", {
    size: 8,
    bold: true,
    color: MUTED,
    leading: 12,
    gapAfter: 8,
  });
  doc.paragraph(`Reference: ${REFERENCE}  |  License: ${LICENSE}`, {
    size: 11,
    bold: true,
    color: SLATE,
    leading: 15,
    gapAfter: 6,
  });
  doc.paragraph(`Publisher: ${PUBLISHER}`, {
    size: 10.5,
    leading: 14.4,
    gapAfter: 4,
  });
  doc.paragraph(`Author: ${AUTHOR}`, {
    size: 10.5,
    leading: 14.4,
    gapAfter: 4,
  });
  doc.paragraph(
    "Siège : Montpellier. RNA W343030686. SIRET 92288647800010. The Institute is an Association Loi 1901 with strictly disinterested management within the meaning of Article 206-1 bis of the French General Tax Code.",
    { size: 9, color: MUTED, leading: 12.4, gapAfter: 8 },
  );
  doc.rule();
  doc.paragraph("Contents", {
    size: 11,
    bold: true,
    color: SLATE,
    leading: 14,
    gapAfter: 6,
  });
  [
    "Bilingual title and executive abstract (English and French).",
    "Chapter 1. Statutory framework: Article 14, Annex III §3, and the legal failure of static PDF audits.",
    "Chapter 2. Empirical benchmark 2026: twelve European and transatlantic public and academic deployments.",
    "Chapter 3. VerifIA and WaqfLedger: canonical SHA-256 state sealing with zero PII retention.",
    "Chapter 4. Operational public doctrine: the Zero-Detector Rule, Article 50 declarations, and the EdTech rider.",
  ].forEach((item) => doc.bullet(item));

  doc.newPage();
  doc.heading("EXECUTIVE ABSTRACT", "Executive Summary");
  doc.paragraph(
    "This white paper states the operational doctrine of L'Institut Article 4 for enforceable auditability of artificial intelligence used in public services and higher education. Enforceable, here, means opposable: a later reviewer, a data-protection authority, a court, or the institution itself can test whether the human-oversight record that accompanied a decision is the same record that existed when the decision was taken. The paper operationalizes Article 14 and Annex III of Regulation (EU) 2024/1689 by replacing mutable documentary exports with a zero-knowledge cryptographic seal of the canonical local state.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Public bodies and universities now use models to rank applicants, predict dropout, allocate benefits, triage municipal requests, assist clinicians, and judge academic work. Where a system determines access to education or to an essential public service, Annex III places it in the high-risk class. Article 14 then requires that natural persons oversee the system: they must understand its capabilities and limitations, remain able to decide not to use it, intervene in its operation, and stop it. A static PDF exported from a vendor console does not discharge that duty. It can be regenerated, it is silent on the oversight log, and it supplies no cryptographic binding to the state that actually produced the output.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "The 2026 empirical benchmark examines twelve European and transatlantic deployments in public administration and higher education. Seventy-five percent have migrated, or are migrating, hosting toward SecNumCloud or on-premise infrastructure. Fifty-eight percent present Annex III high-risk exposure. Sovereign hosting is necessary and incomplete. Moving compute inside a qualified perimeter does not, by itself, create an opposable record of human oversight.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    `The VerifIA protocol and the WaqfLedger utility answer that gap with a canonical local commitment: ${FORMULA}. The preimage is assembled and hashed on the operator's premises. The ledger retains the digest, the document reference, and the sealing time. It retains no personal data. Verification recomputes the hash. Equality confirms that the metadata, the Annex III classification matrix, and the oversight log were not rewritten after the seal. Inequality is itself an audit finding.`,
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Three operational rules follow for universities, university hospitals, laboratories, and municipalities. The Zero-Detector Rule prohibits a disciplinary sanction that rests only on an uncorroborated score from Turnitin, GPTZero, or an equivalent detector. Article 50 requires an ex-ante declaration by the student or user, made before assessment, and included in the oversight log that enters the seal. The EdTech sovereign procurement rider obliges the public buyer to demand SecNumCloud or on-premise hosting, an Article 14 override, Article 50 transparency, and an export of the canonical state so that the buyer, not the vendor, can compute the seal.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "The Institute publishes this doctrine as a public-interest scientific work under the Creative Commons Attribution-NonCommercial 4.0 International licence. It is an observatory and a trusted third party. It is not a party to the administrative decision that the seal records, and it does not retain the personal data from which the seal was computed.",
    { gapAfter: 4 },
  );

  doc.newPage();
  doc.heading("RÉSUMÉ EXÉCUTIF", "Résumé exécutif");
  doc.paragraph(
    "Ce livre blanc énonce la doctrine opérationnelle de L'Institut Article 4 sur l'auditabilité opposable des systèmes d'intelligence artificielle déployés dans les services publics et l'enseignement supérieur. Opposable signifie qu'un réexamen ultérieur, par l'établissement, une autorité de protection des données ou le juge, peut vérifier que la trace de surveillance humaine jointe à une décision est bien celle qui existait au moment de la décision. Le document opérationnalise l'article 14 et l'annexe III du règlement (UE) 2024/1689 en substituant, aux exports documentaires muables, un scellement cryptographique à connaissance nulle de l'état local canonique.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Les administrations et les universités utilisent désormais des modèles pour classer des candidatures, prédire le décrochage, attribuer des prestations, trier des demandes municipales, assister le clinicien ou évaluer un travail académique. Lorsqu'un système détermine l'accès à l'éducation ou à un service public essentiel, l'annexe III le range dans la classe à haut risque. L'article 14 impose alors que des personnes physiques surveillent le système : elles doivent en comprendre les capacités et les limites, pouvoir décider de ne pas l'utiliser, intervenir dans son fonctionnement et l'arrêter. Un PDF statique exporté d'une console d'éditeur ne satisfait pas ce devoir. Il peut être régénéré, il est muet sur le journal de surveillance, et il n'offre aucune liaison cryptographique avec l'état qui a effectivement produit le résultat.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Le benchmark empirique 2026 porte sur douze déploiements européens et transatlantiques, dans l'administration publique et l'enseignement supérieur. Soixante-quinze pour cent ont migré, ou migrent, l'hébergement vers SecNumCloud ou une infrastructure sur site. Cinquante-huit pour cent présentent une exposition à haut risque au sens de l'annexe III. L'hébergement souverain est nécessaire et insuffisant. Déplacer le calcul dans un périmètre qualifié ne crée pas, à lui seul, une trace opposable de la surveillance humaine.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    `Le protocole VerifIA et l'utilitaire WaqfLedger répondent par un engagement local canonique : ${FORMULA}. La préimage est assemblée et condensée dans les locaux de l'opérateur. Le registre conserve le condensat, la référence du document et l'horodatage du scellement. Il ne conserve aucune donnée à caractère personnel. La vérification recalcule le condensat. L'égalité confirme que les métadonnées, la matrice de classification Annexe III et le journal de surveillance n'ont pas été réécrits après le sceau. L'inégalité est elle-même un constat d'audit.`,
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Trois règles opérationnelles en découlent pour les universités, les centres hospitaliers universitaires, les laboratoires et les collectivités. La règle du zéro détecteur interdit une sanction disciplinaire qui reposerait seulement sur un score non corroboré de Turnitin, de GPTZero ou d'un détecteur équivalent. L'article 50 impose une déclaration préalable de l'étudiant ou de l'usager, produite avant l'évaluation et versée au journal de surveillance qui entre dans le sceau. Le cahier de clauses souveraines pour l'EdTech oblige l'acheteur public à exiger un hébergement SecNumCloud ou sur site, une capacité d'arrêt au sens de l'article 14, la transparence de l'article 50, et l'export de l'état canonique afin que l'acheteur, et non le fournisseur, calcule le sceau.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "L'Institut publie cette doctrine comme un travail scientifique d'intérêt général sous la licence Creative Commons Attribution - Pas d'Utilisation Commerciale 4.0 International. Il est un observatoire et un tiers de confiance. Il n'est pas partie à la décision administrative que le sceau enregistre, et il ne conserve pas les données personnelles à partir desquelles le sceau a été calculé.",
    { gapAfter: 4 },
  );

  doc.newPage();
  doc.heading(
    "CHAPTER 1  ·  STATUTORY FRAMEWORK",
    "Article 14 Human Oversight, Annex III §3 Educational High-Risk Scope, and the Legal Failure of Static PDF Audits",
  );
  doc.paragraph(
    "Article 14 of the EU AI Act organises human oversight of high-risk systems as a design duty and as an operational duty. The system must be built so that natural persons can oversee it. Those persons must be able to understand the relevant capacities and limitations, to monitor the operation for anomalies, to interpret the output correctly, to decide not to use the system or to disregard its output, to intervene, and to interrupt the system through a stop. Oversight that exists only in a policy slide, or only in a narrative written after a dispute, does not meet the article. The oversight has to be exercisable on the individual operation, and the fact that it was exercised has to be reconstructible.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Annex III, point 3, brings into the high-risk class AI systems intended to be used to determine access or admission to educational and vocational training institutions, to evaluate learning outcomes, to assess the appropriate level of education for an individual, and to monitor and detect prohibited behaviour of students during tests. Adjacent public-service uses fall under the high-risk class when they evaluate eligibility for essential public assistance, or when they are used by public authorities to evaluate creditworthiness or to dispatch emergency services. The educational limb is the one universities meet first: admission scoring, proctoring, automated marking support, and dropout-risk models that trigger an intervention in a student's path are not outside the Act because the operator is a public university.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "A static PDF audit fails this framework for four structural reasons. First, a PDF is a presentation, not a state. The same dashboard can emit a different file tomorrow without a trace that the oversight log changed. Second, the file is ordinarily produced by the vendor, so the buyer cannot show that the artefact was computed from the buyer's own canonical records. Third, the PDF does not bind three objects that Article 14 and Annex III make inseparable: the system metadata, the classification matrix that justifies the high-risk treatment, and the log of the human decision to accept, override, or stop the output. Fourth, a PDF is a poor exhibit in administrative review. It can be disputed as a selective export. It cannot be recomputed.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "The legal consequence is narrow and practical. Where Annex III §3 or a neighbouring high-risk heading applies, the institution must keep an oversight record that a third party can test. The record has to travel with the decision, not with the vendor's marketing archive. The remainder of this paper specifies that record as a cryptographic commitment computed locally, and it refuses the substitute that the market currently sells: a detector score printed into a PDF and treated as if it were an audit.",
    { gapAfter: 4 },
  );

  doc.newPage();
  doc.heading(
    "CHAPTER 2  ·  EMPIRICAL BENCHMARK 2026",
    "Twelve European and Transatlantic Public and Academic Deployments",
  );
  doc.paragraph(
    "The 2026 benchmark of L'Institut Article 4 covers twelve deployments of AI in public services and higher education across European and transatlantic jurisdictions. The corpus is limited to systems whose existence is supported by public institutional disclosures. Each deployment is classified on three axes that the Act itself uses: the Annex III heading, if any; the hosting perimeter; and the posture of human oversight. The figures below are the Institute's aggregate findings for this corpus. They are not a league table of vendors and they are not a finding of infringement against a named body.",
    { gapAfter: 10 },
  );
  doc.statPair(
    "75%",
    "Sovereign hosting migration to SecNumCloud or on-premise infrastructure.",
    "58%",
    "Annex III high-risk exposure across the twelve-deployment corpus.",
  );
  doc.paragraph(
    "Seventy-five percent of the corpus has migrated, or is in a documented migration, from general hyperscaler transit toward SecNumCloud or on-premise hosting. That movement is the right response to confidentiality, to research-ethics constraints, and to the expectation that a public buyer can name the jurisdiction of the machines. It is not a substitute for Article 14. A model that scores students on a sovereign cluster is still a high-risk system if it determines access, admission, or evaluation. The residual quarter of the corpus remains on infrastructure the institution does not control. For those systems, the procurement rider in Chapter 4 is a condition of renewal, not an optional schedule.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Fifty-eight percent of the corpus falls inside Annex III high-risk exposure, principally through the educational heading and through public-service eligibility or allocation. The complementary share is not a comfort. Systems that sit under Article 50, including student-facing assistants and administrative chatbots, still require that the person be told they are interacting with an AI system, in due time, before the interaction shapes a file. Article 50 transparency and Article 14 oversight are stacked, not alternative, whenever the same institution runs both a high-risk evaluator and a general-purpose assistant.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Two readings follow from the joint distribution. Institutions that have both sovereign hosting and high-risk exposure are the priority for state sealing: the data-protection perimeter is improving while the opposable oversight record is still missing. Institutions that have high-risk exposure and non-sovereign hosting fail both tests and should not add a detector-based integrity product on top of an unsealed decision system. Hosting sovereignty without a recomputable oversight log is an incomplete control. A recomputable log on infrastructure the institution cannot locate is also incomplete. The doctrine requires both.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Method. Entries are drawn from publicly verifiable sources and institutional disclosures. Risk headings follow Annex III, Article 50, and Article 5. Hosting classes distinguish SecNumCloud, sovereign bare metal, on-premise campus infrastructure, and hyperscaler arrangements. A SHA-256 digest may be computed locally for each record. That digest is a receipt on WaqfLedger only when the ledger has acknowledged it. A hash string alone is not treated as an on-chain anchoring. The benchmark is versioned and open to scholarly scrutiny. It does not ingest student-level personal data.",
    { gapAfter: 4 },
  );

  doc.newPage();
  doc.heading(
    "CHAPTER 3  ·  VERIFIA & WAQFLEDGER",
    "Zero-Knowledge Canonical SHA-256 State Sealing, with Zero PII Retention",
  );
  doc.paragraph(
    "VerifIA is the protocol layer. It normalises the three objects an auditor must see together: the system metadata, the Annex III classification matrix, and the human-oversight log. WaqfLedger is the utility that stores the resulting receipt. The architecture is deliberately small. It does not move the student file, the prompt, the answer script, or the mark book to the ledger. It moves a commitment.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "The canonical preimage is the concatenation, in a fixed order and a fixed encoding, of those three objects. The seal is the SHA-256 digest of that concatenation:",
    { gapAfter: 8 },
  );
  doc.formula(FORMULA);
  doc.paragraph(
    "Metadata identifies the system, the deploying institution, the model or service version, the purpose, and the hosting class. The Annex III matrix records the heading relied upon, the role of the system in access, admission, evaluation, or essential-service allocation, and the human-oversight measures assigned to that heading. The oversight log records, for the sealed period or the sealed decision, who reviewed the output, whether the output was followed, overridden, or stopped, and the Article 50 declaration where the use is one that a student or user had to disclose. The concatenation order is part of the canon. A party cannot produce a matching digest by rearranging fields after the fact.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Computation is local. The institution, or the assurance environment it controls, builds the preimage and calculates the digest on premises or inside the qualified hosting perimeter. Only the digest, the public reference (A4I-DOC or the deployment identifier), and the sealing timestamp need to leave that perimeter. WaqfLedger retains those receipt fields. It does not retain the preimage. Zero PII retention is a storage rule, not a slogan: names, student identifiers, free-text justifications, scripts, and prompts are excluded from the ledger by the shape of the protocol. If a field would identify a person, it stays inside the institution's own record, inside the preimage, and outside the receipt.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "The construction is zero-knowledge in the operational sense required of a public receipt. A verifier who sees the ledger learns that a named institution sealed a named canonical state at a named time. The verifier does not learn the personal data inside that state. Knowledge of the underlying records remains with the controller. When an audit is lawfully opened, the controller recomputes SHA-256 over the preserved preimage and exhibits equality or inequality with the receipt. Equality is evidence that the metadata, the matrix, and the oversight log were not altered after sealing. Inequality is evidence that they were. No student record has to be copied onto the ledger for that test to be decisive.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "This is a cryptographic commitment, not a claim that a zero-knowledge proof circuit replaces the hash. The Act's audit problem, as this Institute states it, is integrity plus data minimisation. SHA-256 over a canonical local preimage solves both if, and only if, the preimage is complete and the institution actually keeps it. A receipt of an empty log is a truthful receipt of an empty log, and an empty log will not satisfy Article 14. The protocol does not launder a missing oversight act into a compliant one.",
    { gapAfter: 4 },
  );

  doc.newPage();
  doc.heading(
    "CHAPTER 4  ·  OPERATIONAL PUBLIC DOCTRINE",
    "The Zero-Detector Rule, Article 50 Ex-Ante Declarations, and the EdTech Sovereign Procurement Rider",
  );
  doc.paragraph(
    "The statutory and technical chapters collapse into three rules that a university, a hospital, a laboratory, or a municipality can adopt without waiting for a vendor to rename its dashboard an audit.",
    { gapAfter: 8 },
  );
  doc.paragraph("1.  The Zero-Detector Rule", {
    size: 11.5,
    bold: true,
    color: SLATE,
    leading: 15,
    gapAfter: 4,
  });
  doc.paragraph(
    "A similarity score or an AI-writing score is not, by itself, proof of academic misconduct. Turnitin, GPTZero, and equivalent detectors may be consulted as signals. They may not be the sole basis of a sanction. The Institute states the Zero-Detector Rule as a prohibition: no disciplinary or administrative decision may rest on an uncorroborated detector output. Corroboration requires a named human decision-maker, an opportunity for the student to be heard, reasons that address the work itself, and an entry in the oversight log. That entry is part of the preimage. A detector PDF attached to a file, with no human judgement and no seal, is the static audit that Chapter 1 rejects, applied to a person's academic record.",
    { gapAfter: 8 },
  );
  doc.paragraph("2.  Article 50 ex-ante student declarations", {
    size: 11.5,
    bold: true,
    color: SLATE,
    leading: 15,
    gapAfter: 4,
  });
  doc.paragraph(
    "Article 50 requires that people be informed, in a clear and distinguishable manner, when they are interacting with an AI system, and it requires disclosure of synthetic content in the cases the article lists. In higher education the Institute draws a stricter operational consequence, timed before the assessment rather than after an accusation. Before a piece of work is submitted for evaluation, the student makes an ex-ante declaration: whether an AI system assisted the work, which class of system, and for what part of the task. The declaration is an input to the oversight log. It is sealed with the metadata and the Annex III matrix. Transparency reconstructed after a detector alert is not Article 50 compliance. It is a dispute about a disclosure that should already have existed.",
    { gapAfter: 8 },
  );
  doc.paragraph("3.  The EdTech sovereign procurement rider", {
    size: 11.5,
    bold: true,
    color: SLATE,
    leading: 15,
    gapAfter: 4,
  });
  doc.paragraph(
    "Public buyers insert the following rider into EdTech and public-service AI contracts, as conditions of award and of renewal. Hosting is SecNumCloud or an on-premise environment under the buyer's control. Institutional content is not used to train a supplier model without a recorded legal basis. The system exposes an Article 14 override and a stop that a trained natural person can actually use. User-facing functions meet Article 50 before the interaction influences a file. The supplier exports the canonical state, meaning metadata, Annex III matrix, and oversight log, in the concatenation the buyer specifies, so that the buyer computes the SHA-256 seal. The supplier's recommended workflow must not instruct the buyer to sanction a person on a detector score alone. Audit rights may name L'Institut Article 4 as an independent third party when the buyer so decides. A contract that cannot meet the rider is a contract for a system the buyer cannot audit.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Taken together, the three rules keep the high-risk decision inside the public institution. The vendor may supply a model. The vendor does not supply the legal act of oversight, does not keep the personal data of the seal, and does not define misconduct as whatever a detector printed.",
    { gapAfter: 4 },
  );

  doc.newPage();
  doc.heading("COLOPHON", "Licence, citation, and limit of this publication");
  doc.paragraph(
    `${REFERENCE}. ${LICENSE}. ${PUBLISHER}. ${AUTHOR}.`,
    { bold: true, color: SLATE, gapAfter: 8 },
  );
  doc.paragraph(
    "This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Licence. Attribution must name the author and L'Institut Article 4 and must cite the reference A4I-DOC-2026-001. Commercial use of the text is not granted by this licence. The doctrinal rules may be copied into a public procurement clause or an institutional regulation without that copying being treated as a commercial exploitation of the paper.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Suggested citation: El Bouzagaoui, A. (2026). Enforceable Auditability of AI Systems in Public Services and Higher Education: Operationalizing EU AI Act Article 14 and Annex III via Zero-Knowledge Cryptographic State Sealing (A4I-DOC-2026-001). L'Institut Article 4, Montpellier.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "This publication is a scientific and doctrinal statement of an independent observatory. It is not a legal opinion delivered to a named administration, not a conformity assessment under the EU AI Act, and not a certification of any vendor. Figures in Chapter 2 describe the twelve-deployment benchmark stated in this document. Registry identifiers of the publisher: RNA W343030686, SIRET 92288647800010. Ledger utility: waqfledger.tech. Institutional site: article4institute.org.",
    { gapAfter: 8 },
  );
  doc.paragraph(
    "Canonical file: Livre_Blanc_2026_Auditabilite_IA_Publique_Institut_Article_4.pdf",
    { size: 9, color: MUTED, leading: 12.5, gapAfter: 2 },
  );

  return doc.finalize();
}

function verifyDownloadLinks() {
  const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
  const failures = [];
  const constants = read("src/config/constants.ts");
  if (!constants.includes(`"${PDF_PUBLIC_PATH}"`)) {
    failures.push("src/config/constants.ts does not publish the canonical pdfPath");
  }
  const callout = read("components/WhitePaperCallout.tsx");
  if (!callout.includes("href={LIVRE_BLANC_2026.pdfPath}")) {
    failures.push("WhitePaperCallout does not link through LIVRE_BLANC_2026.pdfPath");
  }
  for (const rel of ["app/page.tsx", "app/bouclier-public/page.tsx"]) {
    const source = read(rel);
    if (!source.includes("<WhitePaperCallout")) {
      failures.push(`${rel} does not render WhitePaperCallout`);
    }
  }
  const stale = [];
  for (const rel of [
    "app/page.tsx",
    "app/bouclier-public/page.tsx",
    "components/WhitePaperCallout.tsx",
  ]) {
    const source = read(rel);
    for (const match of source.matchAll(/Livre_Blanc[^"'\\\s)]*/g)) {
      if (!match[0].endsWith("Livre_Blanc_2026_Auditabilite_IA_Publique_Institut_Article_4.pdf") && match[0] !== "Livre_Blanc") {
        stale.push(`${rel}: ${match[0]}`);
      }
    }
  }
  if (stale.length) failures.push(`Unexpected white-paper paths: ${stale.join("; ")}`);
  return failures;
}

function assertContents(pdf) {
  const required = [
    REFERENCE,
    LICENSE,
    "Adel El Bouzagaoui",
    "Research Director",
    "Association Loi 1901",
    "Independent Observatory & Trusted Third-Party",
    "Enforceable Auditability of AI Systems in Public Services and Higher Education",
    "Auditabilité Opposable",
    "Executive Summary",
    "Résumé exécutif",
    "SHA-256\\(Metadata || Annex III Matrix || Oversight Log\\)",
    "75%",
    "58%",
    "SecNumCloud",
    "Zero-Detector Rule",
    "Turnitin",
    "GPTZero",
    "Article 50",
    "Annex III",
  ];
  const missing = required.filter(
    (phrase) => !pdf.includes(Buffer.from(phrase, "latin1")),
  );
  if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-"))) missing.push("%PDF header");
  const tail = pdf.toString("latin1");
  const xref = tail.match(/startxref\n(\d+)\n%%EOF\s*$/);
  if (!xref) missing.push("startxref");
  else {
    const at = Number(xref[1]);
    if (pdf.subarray(at, at + 4).toString("latin1") !== "xref") {
      missing.push("xref offset");
    }
  }
  return missing;
}

function assertLayout(streams) {
  const problems = [];
  const re =
    /BT (\/F\d) ([0-9.]+) Tf 1 0 0 1 ([0-9.-]+) ([0-9.-]+) Tm \(((?:\\.|[^)\\])*)\) Tj ET/g;
  streams.forEach((stream, page) => {
    re.lastIndex = 0;
    let match = re.exec(stream);
    while (match) {
      const size = Number(match[2]);
      const x = Number(match[3]);
      const y = Number(match[4]);
      const decoded = match[5].replace(/\\([()\\])/g, "$1");
      const width = textWidth(decoded, size, match[1] === "/F2");
      const right = x + width;
      const inHeader = y > PAGE_H - HEADER_H;
      const inFooter = y < 36;
      const limit = inHeader || inFooter ? PAGE_W - 16 : PAGE_W - MARGIN;
      if (right > limit + 1) {
        problems.push(
          `page ${page + 1} overflows (${right.toFixed(1)} > ${limit.toFixed(1)}): ${decoded.slice(0, 72)}`,
        );
      }
      if (!inHeader && !inFooter && y < 40) {
        problems.push(`page ${page + 1} collides with footer: ${decoded.slice(0, 72)}`);
      }
      match = re.exec(stream);
    }
  });
  return problems;
}

const linkFailures = verifyDownloadLinks();
if (linkFailures.length) {
  console.error("White paper link check failed:");
  for (const failure of linkFailures) console.error(`- ${failure}`);
  process.exit(1);
}

const pageStreams = compose();
const layoutProblems = assertLayout(pageStreams);
if (layoutProblems.length) {
  console.error("PDF layout check failed:");
  for (const problem of layoutProblems) console.error(`- ${problem}`);
  process.exit(1);
}

const pdf = buildPdf(pageStreams);
const missing = assertContents(pdf);
if (missing.length) {
  console.error(`PDF is missing required content: ${missing.join(", ")}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, pdf);
const sha256 = crypto.createHash("sha256").update(pdf).digest("hex");

console.log(`Wrote ${OUT_PATH}`);
console.log(`Bytes: ${pdf.length}`);
console.log(`Pages: ${(pdf.toString("latin1").match(/\/Type \/Page\b/g) || []).length}`);
console.log(`Link check: / and /bouclier-public -> ${PDF_PUBLIC_PATH}`);
console.log(`SHA-256: ${sha256}`);
