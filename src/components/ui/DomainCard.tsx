import { CodeXml, Paintbrush, Users } from "lucide-react";
import type { Domain } from "@/content/site";
import { Reveal } from "./Reveal";

/** Data files stay serialisable by naming icons, not importing components. */
const ICONS = {
  code: CodeXml,
  brush: Paintbrush,
  users: Users,
} as const;

export function DomainCard({
  domain,
  delay = 0,
}: {
  domain: Domain;
  delay?: number;
}) {
  const Icon = ICONS[domain.icon];

  return (
    <Reveal delay={delay} as="li" className="h-full">
      <article className="group flex h-full flex-col items-center rounded-[12px] border border-hairline bg-surface px-8 py-14 text-center shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-flame/30 hover:shadow-[0_8px_20px_-12px_rgba(11,11,12,0.22)]">
        <span className="grid size-[96px] place-items-center rounded-full bg-peach transition-colors duration-300 group-hover:bg-peach">
          <Icon className="size-10 text-flame" strokeWidth={2.25} aria-hidden />
        </span>

        <h3 className="mt-7 text-[1.375rem] font-bold text-ink lg:text-[1.5rem]">
          {domain.title}
        </h3>

        <p className="mt-4 max-w-[14.5rem] text-[1.0625rem] leading-[1.7] text-body">
          {domain.body}
        </p>
      </article>
    </Reveal>
  );
}
