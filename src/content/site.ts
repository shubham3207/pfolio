/**
 * Central site configuration.
 * Edit names, links and file paths here; every component reads from this file.
 */

export const site = {
  name: "Shubham Sapkota",
  role: "Data Analyst",
  location: "Greater Boston, MA",
  email: "shubham.sapkota1@gmail.com",

  /**
   * Production URL, used for metadata, Open Graph and the sitemap.
   * Set NEXT_PUBLIC_SITE_URL once you have a custom domain; otherwise the host's own URL is used
   * (Render sets RENDER_EXTERNAL_URL, Vercel sets VERCEL_PROJECT_PRODUCTION_URL).
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.RENDER_EXTERNAL_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  description:
    "Shubham Sapkota is a data analyst in Greater Boston working across analytics, machine learning and data engineering. MS Data Analytics candidate at Clark University.",

  /** Place the PDF at /public/Shubham_Sapkota_Resume.pdf (replace the file to update it). */
  resume: {
    href: "/Shubham_Sapkota_Resume.pdf",
    fileName: "Shubham_Sapkota_Resume.pdf",
  },

  /** Place the photo at /public/images/shubham-sapkota.jpg */
  portrait: {
    /** Hero frame: "arch" (soft rounded top, flat bottom) or "rect" (the original rectangle). */
    shape: "arch" as "arch" | "rect",
    src: "/images/shubham-sapkota.jpg",
    width: 1345,
    height: 1170,
    alt: "Portrait of Shubham Sapkota, smiling slightly, in a dark blazer and white shirt, photographed outdoors.",
  },

  social: {
    linkedin: {
      label: "LinkedIn",
      handle: "in/shubhamsapkota",
      href: "https://www.linkedin.com/in/shubhamsapkota",
    },
    github: {
      label: "GitHub",
      handle: "shubham3207",
      href: "https://github.com/shubham3207",
    },
  },
} as const;

export const navigation = [
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];
