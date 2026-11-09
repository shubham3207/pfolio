import { site } from "@/content/site";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "./icons";

const items = [
  { ...site.social.linkedin, Icon: LinkedInIcon },
  { ...site.social.github, Icon: GitHubIcon },
];

/** LinkedIn and GitHub links. URLs live in content/site.ts. */
export function SocialLinks({
  showHandles = false,
  tone = "default",
  withArrow = false,
}: {
  showHandles?: boolean;
  tone?: "default" | "inverse";
  /** Reveal a small ↗ on hover/focus, signalling the link leaves the site. */
  withArrow?: boolean;
}) {
  const color = tone === "inverse" ? "text-paper/85 hover:text-paper" : "text-ink-soft hover:text-forest";
  const handleColor = tone === "inverse" ? "text-paper/75" : "text-muted";
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
      {items.map(({ label, handle, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] transition-colors duration-200 ${color}`}
          >
            <Icon className="shrink-0 transition-transform duration-200 ease-out-soft group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5" />
            <span className="link-underline">
              {label}
              {showHandles ? <span className={handleColor}> · {handle}</span> : null}
            </span>
            {withArrow ? (
              <ArrowUpRightIcon
                width={14}
                height={14}
                className="-ml-1 opacity-0 transition-[opacity,translate] duration-200 ease-out-soft -translate-x-1 translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              />
            ) : null}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
