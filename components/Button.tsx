import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";

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
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary: "bg-zinc-950 text-white shadow-sm hover:bg-zinc-800",
  secondary:
    "border border-zinc-200 bg-white text-zinc-950 shadow-sm hover:border-zinc-300 hover:bg-zinc-50",
  whatsapp: "bg-[#25D366] text-zinc-950 shadow-sm hover:bg-[#20bd5a]",
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
  const classes = `${baseStyles} ${variants[variant]} ${className}`.trim();

  if (href) {
    const linkProps = props as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "className" | "children" | "href"
    >;

    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
