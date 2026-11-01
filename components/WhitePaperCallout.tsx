import { FileText } from "lucide-react";
import { LIVRE_BLANC_2026, type Lang } from "@/src/config/constants";

type WhitePaperCalloutProps = {
  lang: Lang;
  tone?: "light" | "dark";
};

export default function WhitePaperCallout({
  lang,
  tone = "light",
}: WhitePaperCalloutProps) {
  const dark = tone === "dark";

  return (
    <aside
      aria-labelledby="livre-blanc-2026-title"
      className={
        dark
          ? "rounded-2xl border border-indigo-400/40 bg-indigo-950/80 px-6 py-6 sm:px-8"
          : "mt-8 scroll-mt-24 border border-indigo-200 bg-indigo-50 px-6 py-6 sm:px-8"
      }
    >
      <p
        className={
          dark
            ? "text-xs font-semibold uppercase tracking-[0.16em] text-indigo-200"
            : "text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700"
        }
      >
        {LIVRE_BLANC_2026.eyebrow[lang]}
      </p>
      <div className="mt-3 flex items-start gap-3">
        <FileText
          className={
            dark
              ? "mt-0.5 h-5 w-5 shrink-0 text-indigo-200"
              : "mt-0.5 h-5 w-5 shrink-0 text-indigo-700"
          }
          aria-hidden
        />
        <h2
          id="livre-blanc-2026-title"
          className={
            dark
              ? "text-lg font-semibold tracking-tight text-white sm:text-xl"
              : "text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          }
        >
          {LIVRE_BLANC_2026.title[lang]}
        </h2>
      </div>
      <p className="mt-3">
        <span
          className={
            dark
              ? "inline-flex rounded-full border border-indigo-300/40 bg-indigo-900/70 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-indigo-50"
              : "inline-flex rounded-full border border-indigo-300 bg-white px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-indigo-900"
          }
        >
          {LIVRE_BLANC_2026.referencePrefix[lang]} {LIVRE_BLANC_2026.reference}
          {" · "}
          {LIVRE_BLANC_2026.license}
          {" · "}
          {LIVRE_BLANC_2026.scholarlyIndex[lang]}
        </span>
      </p>
      <a
        href={LIVRE_BLANC_2026.pdfPath}
        download
        className={
          dark
            ? "mt-5 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-950 transition hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            : "mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        }
      >
        {LIVRE_BLANC_2026.cta[lang]}
      </a>
    </aside>
  );
}
