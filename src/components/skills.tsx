import type { CSSProperties } from "react";
import Image from "next/image";
import { skillGroups, skillsIntro, type SkillGroup, type Tool } from "@/content/skills";
import { Container } from "./ui/container";
import { SectionHeading } from "./ui/section-heading";

/*
  The heading stays pinned on the left while categories pass on the right. Each technology is a
  small logo tile plus its name; tools without an official mark keep the tile with a quiet dot so
  the grid stays aligned without inventing a logo. Methods follow as one plain line.
  Colours come from the theme: primary ink, labels ink-soft, secondary muted, dividers line.
*/
function ToolItem({ tool }: { tool: Tool }) {
  return (
    <li className="tool group/tool flex min-h-11 items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-line bg-paper transition-[transform,border-color] duration-200 ease-out-soft group-hover/tool:-translate-y-0.5 group-hover/tool:border-forest/40"
      >
        {tool.logo ? (
          <Image
            src={`/logos/${tool.logo.includes(".") ? tool.logo : `${tool.logo}.svg`}`}
            alt=""
            width={20}
            height={20}
            // ~50 KB for all logos: load up front at low priority so a tile is never empty.
            loading="eager"
            fetchPriority="low"
            className="h-5 w-5 object-contain"
          />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-muted/50" />
        )}
      </span>
      <span className="skill-item text-[0.9375rem] leading-snug font-medium text-ink-soft transition-colors duration-200 group-hover/tool:text-forest">{tool.name}</span>
    </li>
  );
}

function Group({ group, index }: { group: SkillGroup; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const id = `skills-${number}`;
  return (
    <section
      aria-labelledby={id}
      className="reveal border-t border-line py-8"
      style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
    >
      <h3 id={id} className="flex items-baseline gap-3 text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">
        <span aria-hidden="true" className="w-6 text-[0.8125rem] font-semibold text-forest tabular-nums">
          {number}
        </span>
        {group.title}
      </h3>

      <div className="mt-5 sm:pl-9">
        <ul aria-label={`${group.title} tools`} className="grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3">
          {group.tools.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </ul>

        {group.methods ? (
          <p className="mt-5 text-[0.875rem] leading-relaxed text-muted">
            <span className="mr-2 font-semibold text-ink-soft">Methods</span>
            {group.methods.map((method, i) => (
              <span key={method}>
                {/* The separator stays with the method before it, so no line starts with "/". */}
                <span className="whitespace-nowrap">
                  {method}
                  {i < group.methods!.length - 1 ? (
                    <>
                      <span className="sr-only">,</span>
                      <span aria-hidden="true" className="mx-1.5 text-line-strong">/</span>
                    </>
                  ) : null}
                </span>{" "}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-24">
      <Container className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="04" label="Skills" id="skills-title" title="Toolkit" intro={skillsIntro} />
          </div>
        </div>

        <div className="min-w-0 border-b border-line lg:col-span-8">
          {skillGroups.map((group, i) => (
            <Group key={group.title} group={group} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
