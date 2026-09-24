import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Blob } from "@/components/decor/Blob";

export function Footer() {
  const { words, closing } = site.footer;

  return (
    <footer className="relative mt-8 overflow-hidden pb-14 pt-24 md:pb-16 md:pt-32">
      {/* The large coral wash anchoring the bottom-left of the page */}
      <Blob
        className="bottom-[-16rem] left-[-14rem] size-[42rem]"
        from="rgba(249,78,30,0.30)"
      />
      <Blob
        className="bottom-[-10rem] left-[-2rem] size-[26rem]"
        from="rgba(255,150,110,0.22)"
      />

      <div className="relative mx-auto flex max-w-[1320px] flex-col gap-12 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <Reveal>
          <p className="font-hand text-[1.625rem] leading-[1.35] text-flame">
            {words.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
            <span className="block">
              <span className="text-flame/70">{"{"}</span> {closing}{" "}
              <span className="text-flame/70">{"}"}</span>
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:text-right">
          <p className="font-display text-[1.0625rem] tracking-[-0.02em] text-ink">
            {site.name}
          </p>
          <p className="mt-1.5 text-[0.8125rem] text-body">{site.tagline}</p>
          <span
            className="mt-4 block h-[3px] w-20 rounded-full bg-flame md:ml-auto"
            aria-hidden
          />
        </Reveal>
      </div>
    </footer>
  );
}
