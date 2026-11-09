import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-paper hover:bg-forest-deep border border-forest hover:border-forest-deep",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  inverse: "border border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-forest",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  /** Direction the icon nudges on hover and keyboard focus, matching where it points. */
  iconShift?: "right" | "down";
};

const shifts = {
  right: "group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5",
  down: "group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5",
};

/** Anchor styled as a button. Every action on this site is navigation, so anchors are the right element. */
export function ButtonLink({
  variant = "primary",
  icon,
  external,
  iconShift = "right",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-6 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {icon ? (
        <span className={`transition-transform duration-300 ease-out-soft ${shifts[iconShift]}`}>
          {icon}
        </span>
      ) : null}
    </a>
  );
}
