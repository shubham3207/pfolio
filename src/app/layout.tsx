import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { site } from "@/content/site";
import { MotionObserver } from "@/components/motion-observer";
import { motionBootScript } from "@/lib/motion-boot";
import "./globals.css";

/* Display serif for a few personal statements; Manrope for everything else. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${site.name} · Data Analyst`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title,
    description: site.description,
    url: "/",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  image: `${site.url}${site.portrait.src}`,
  address: { "@type": "PostalAddress", addressRegion: "MA", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Clark University" },
    { "@type": "CollegeOrUniversity", name: "Coventry University" },
  ],
  sameAs: [site.social.linkedin.href, site.social.github.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The boot script adds motion classes to <html> before hydration.
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${manrope.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      {/* Browser extensions (Grammarly, password managers…) often add attributes to <body> before React loads. */}
      <body className="bg-paper text-ink" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[3px] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <MotionObserver />
      </body>
    </html>
  );
}
