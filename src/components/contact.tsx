import type React from "react";
import { site } from "@/content/site";
import { Container } from "./ui/container";
import { SocialLinks } from "./ui/social-links";

/** Splits the address after "@" so a narrow screen wraps it there, never mid-word. */
function EmailText({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <>
      {user}
      <wbr />@{domain}
    </>
  );
}

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-forest pt-12 pb-8 text-paper sm:pt-14 sm:pb-9">
      <Container className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow flex items-center gap-2.5 self-start text-paper/80 lg:col-span-3 lg:pt-3">
          <span className="tabular-nums">05</span>
          <span aria-hidden="true" className="h-px w-6 bg-paper/40" />
          Contact
        </p>

        <div className="min-w-0 lg:col-span-9">
          <h2 id="contact-title" className="reveal max-w-[19ch] font-serif text-[clamp(1.875rem,1.25rem+2.3vw,3.125rem)] leading-[1.04] font-normal tracking-[-0.01em]">
            Have something interesting in mind?
          </h2>
          <p className="reveal mt-3 max-w-[44ch] text-lede text-paper/85" style={delay(90)}>
            I’m always open to meaningful conversations, interesting problems, and new opportunities.
          </p>

          <p className="reveal mt-6 sm:mt-7" style={delay(180)}>
            <a
              href={`mailto:${site.email}`}
              className="inline-block max-w-full text-[clamp(1.125rem,0.82rem+1.5vw,1.875rem)] font-medium leading-tight tracking-[-0.025em] text-paper"
            >
              <span className="link-draw link-draw-lg pb-1.5 [overflow-wrap:anywhere]">
                <EmailText email={site.email} />
              </span>
            </a>
          </p>

          <div className="reveal mt-3 -mb-2" style={delay(260)}>
            <SocialLinks tone="inverse" withArrow />
          </div>
        </div>
      </Container>
    </section>
  );
}
