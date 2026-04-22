import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, MessageCircleMore } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "whatsapp";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonLinkProps = BaseButtonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

type NativeButtonProps = BaseButtonProps & {
  href?: never;
} & ComponentPropsWithoutRef<"button">;

type ButtonProps = ButtonLinkProps | NativeButtonProps;

const baseStyles =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-zinc-950 text-white shadow-[0_18px_40px_-20px_rgba(24,24,27,0.7)] hover:-translate-y-0.5 hover:bg-zinc-800",
  secondary:
    "border border-zinc-200 bg-white text-zinc-950 shadow-[0_10px_28px_-18px_rgba(24,24,27,0.55)] hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50",
  whatsapp:
    "bg-[#25D366] text-zinc-950 shadow-[0_18px_40px_-20px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 hover:bg-[#20bd5a]",
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const icon =
    variant === "whatsapp" ? (
      <MessageCircleMore aria-hidden="true" className="h-4 w-4" />
    ) : (
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    );
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );
  const classes = `${baseStyles} ${variants[variant]} ${className}`.trim();

  if (href) {
    const linkProps = props as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "className" | "children" | "href"
    >;

    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
