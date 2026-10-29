import type { ReactNode } from "react";
import Spinner from "./spinner";

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg bg-slate-900 p-4 shadow-sm sm:p-6 ring-1 ring-slate-800">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function SectionFallback({ title }: { title: string }) {
  return (
    <Section title={title}>
      <Spinner className="py-6" />
    </Section>
  );
}
