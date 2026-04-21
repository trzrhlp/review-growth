import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({
  items,
  className = "",
}: BreadcrumbsProps) {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-zinc-500 ${className}`.trim()}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.path} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-medium text-zinc-700">{item.name}</span>
                ) : (
                  <Link
                    href={item.path}
                    className="transition hover:text-zinc-950"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
