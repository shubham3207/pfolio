"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { Container } from "./ui/container";
import { CloseIcon, DownloadIcon, MenuIcon } from "./ui/icons";

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Hairline under the header once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section occupying the middle of the viewport.
  useEffect(() => {
    const sections = ["top", ...navigation.map(({ id }) => id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: focus the first link on open, close on Escape or on resize to desktop.
  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header
      className={`intro-fade sticky top-0 z-40 bg-paper transition-[border-color] duration-300 border-b ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-serif text-[1.5rem] leading-none text-ink"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] transition-colors duration-200 hover:text-ink ${
                      isActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-2 h-px origin-left bg-forest transition-transform duration-300 ease-out-soft ${
                        isActive ? "scale-x-100" : "scale-x-0 opacity-40 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
            <li className="ml-3">
              <a
                href={site.resume.href}
                download={site.resume.fileName}
                className="inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-ink/25 px-4 text-[0.875rem] font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-wash"
              >
                <DownloadIcon width={16} height={16} />
                Resume
                <span className="sr-only">(PDF download)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <Container className="pt-2 pb-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line">
              {navigation.map((item, i) => (
                <li key={item.id}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="flex min-h-14 items-center justify-between text-[1.375rem] font-semibold tracking-[-0.02em] text-ink"
                  >
                    {item.label}
                    {active === item.id ? (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-forest" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.resume.href}
              download={site.resume.fileName}
              onClick={() => setOpen(false)}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[3px] bg-forest px-5 text-[0.9375rem] font-medium text-paper"
            >
              <DownloadIcon />
              Download resume
              <span className="sr-only">(PDF)</span>
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
