import { cacheLife } from "next/cache";
import { site } from "@/content/site";
import { Container } from "./ui/container";
import { ArrowUpIcon } from "./ui/icons";

/** Current year, prerendered with the page and refreshed daily, so it rolls over on its own. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep py-1.5 text-[0.875rem] text-paper/75">
      <Container className="flex flex-wrap items-center justify-between gap-x-6">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <a
          href="#top"
          className="group -mr-1 inline-flex min-h-11 items-center gap-2 px-1 text-paper/85 transition-colors hover:text-paper"
        >
          <span className="link-underline">Back to top</span>
          <ArrowUpIcon
            width={15}
            height={15}
            className="transition-transform duration-200 ease-out-soft group-hover:-translate-y-[3px] group-focus-visible:-translate-y-[3px]"
          />
        </a>
      </Container>
    </footer>
  );
}
