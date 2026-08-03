/**
 * Minimal single-page PDF generator (Helvetica / WinAnsi).
 * Suitable for institutional letters and programme plaquettes without native deps.
 */

function escapePdfText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/** Keep Latin-1 / WinAnsi-representable characters for embedded Helvetica. */
export function toPdfLatin1(value: string): string {
  const fancy: Record<string, string> = {
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

export function buildSimplePdf(lines: readonly string[], opts?: {
  title?: string;
  fontSize?: number;
  lineHeight?: number;
}): Buffer {
  const fontSize = opts?.fontSize ?? 11;
  const lineHeight = opts?.lineHeight ?? 16;
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

export function pdfToDataUrl(pdf: Buffer): string {
  return `data:application/pdf;base64,${pdf.toString("base64")}`;
}
