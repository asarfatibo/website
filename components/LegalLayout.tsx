import type { ReactNode } from "react";

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-14 text-base text-ink/80">
      {children}
    </article>
  );
}
