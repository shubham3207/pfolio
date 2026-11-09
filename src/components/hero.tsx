import type React from "react";
import Image from "next/image";
import { hero } from "@/content/about";
import { site } from "@/content/site";
import { Container } from "./ui/container";
import { ButtonLink } from "./ui/button-link";
import { SocialLinks } from "./ui/social-links";
import { ArrowDownIcon, DownloadIcon } from "./ui/icons";

/*
 * Portrait frame shape, chosen by `portrait.shape` in content/site.ts.
 * "arch": soft elliptical top corners (42% of the width across, 30% of the height down) and a
 * flat bottom; percentages keep the curve in proportion at every size. "rect": the original.
 */
const ARCH = "42% 42% 0 0 / 30% 30% 0 0";

export function Hero() {
  // Entrance timing (ms); see the "First-load entrance" notes in globals.css.
  const at = (ms: number, extra?: Record<string, string>) => ({ "--d": `${ms}ms`, ...extra }) as React.CSSProperties;
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-6 pb-4 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Portrait first on mobile so the person, not a paragraph, is the first impression. */}
          <div style={at(260)} className="hero-portrait order-first w-full sm:mx-auto sm:max-w-[26rem] lg:order-last lg:col-span-5 lg:mx-0 lg:max-w-[25.5rem] lg:justify-self-end">
            <div
              style={site.portrait.shape === "arch" ? { borderRadius: ARCH } : undefined}
              className="relative aspect-[4/3] overflow-hidden bg-wash sm:aspect-[4/5]"
            >
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 408px, (min-width: 640px) 416px, 100vw"
                className="object-cover object-[48%_28%] sm:object-[48%_40%]"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p style={at(120, { "--y": "8px" })} className="hero-rise eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title" className="mt-5 font-serif text-display font-normal text-ink sm:mt-6">
              {/* One masked line per authored break; the text itself is plain, so it reads normally. */}
              {hero.headline.lines.map((line, i) => (
                <span key={line} className="hero-line-mask">
                  <span className="hero-line" style={at(200 + i * 100)}>
                    {line}
                    {i === hero.headline.lines.length - 1 ? (
                      <>
                        {" "}
                        <em className="text-forest">{hero.headline.emphasis}</em>
                      </>
                    ) : (
                      // Keeps words apart in the text that screen readers and search engines read;
                      // invisible on screen because each line is its own block.
                      " "
                    )}
                  </span>
                </span>
              ))}
            </h1>
            <p style={at(560)} className="hero-rise mt-6 max-w-[27rem] text-lede text-ink-soft sm:mt-7">{hero.intro}</p>

            <div style={at(640)} className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#work" icon={<ArrowDownIcon />} iconShift="down">
                View my work
              </ButtonLink>
              <ButtonLink
                href={site.resume.href}
                download={site.resume.fileName}
                variant="secondary"
                iconShift="down"
                icon={<DownloadIcon />}
              >
                Download resume<span className="sr-only"> (PDF)</span>
              </ButtonLink>
            </div>

            <div style={at(820, { "--y": "8px" })} className="hero-rise mt-6">
              <SocialLinks />
            </div>
          </div>
        </div>

        <dl style={at(760)} className="intro-fade mt-14 grid border-t border-line-strong sm:mt-16 md:grid-cols-3">
          {hero.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`py-5 md:py-6 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l md:pl-8" : ""} ${
                i < hero.facts.length - 1 ? "md:pr-8" : ""
              }`}
            >
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-ink">
                {/* Keep each "·" part (e.g. a date range) together on one line. */}
                {fact.value.split(" · ").map((part, j) => (
                  <span key={part}>
                    {j > 0 ? " · " : ""}
                    <span className="whitespace-nowrap">{part}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
