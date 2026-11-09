import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Fonts and portrait for generated images (favicon, Apple icon, Open Graph card). Read at build time. */
const here = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

export async function ogFonts() {
  const [serif, serifItalic, sans500, sans600] = await Promise.all([
    here("instrument-serif-latin-400-normal.woff"),
    here("instrument-serif-latin-400-italic.woff"),
    here("manrope-latin-500-normal.woff"),
    here("manrope-latin-600-normal.woff"),
  ]);
  return [
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serifItalic, weight: 400 as const, style: "italic" as const },
    { name: "Manrope", data: sans500, weight: 500 as const, style: "normal" as const },
    { name: "Manrope", data: sans600, weight: 600 as const, style: "normal" as const },
  ];
}

export async function portraitDataUrl() {
  const jpg = await readFile(join(process.cwd(), "public/images/shubham-sapkota.jpg"));
  return `data:image/jpeg;base64,${jpg.toString("base64")}`;
}

export const palette = { paper: "#FFFFFF", stone: "#F3F5F4", ink: "#202724", muted: "#4B5550", forest: "#2D5143", line: "#E5E7E5" };
