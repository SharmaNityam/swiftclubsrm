import Image from "next/image";
import { site } from "@/content/site";
import { hasAsset } from "@/lib/asset";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HandNote } from "@/components/ui/HandNote";
import { CodeCard } from "@/components/decor/CodeCard";
import { SwiftMark } from "@/components/decor/SwiftMark";
import { Blob, TileShape } from "@/components/decor/Blob";
import { GridTexture } from "@/components/decor/GridTexture";
import { SketchArrow } from "@/components/decor/Sketches";

const LOGO_SRC = "/images/logo-swift.png";

export function Hero() {
  const { eyebrow, titleLines, subtitle, cta, note, pillars } = site.hero;

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-12 md:pb-28 md:pt-40">
      {/* Warm washes behind the composition */}
      <GridTexture className="right-0 top-0 h-[70%] w-[55%] opacity-60" size={30} />
      <Blob className="right-[-12%] top-[-20%] size-[54rem]" from="rgba(255,122,69,0.20)" />
      <Blob className="left-[-16%] top-[2%] size-[36rem]" from="rgba(255,180,150,0.18)" />
      <Blob className="bottom-[-24%] left-[18%] size-[44rem]" from="rgba(255,165,130,0.15)" />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          {/* ── Copy ─────────────────────────────────────────── */}
          <div>
            <Reveal>
              <p className="tracked-label flex flex-wrap items-center gap-x-3 gap-y-1">
                {eyebrow.map((word, i) => (
                  <span key={word} className="flex items-center gap-3">
                    {i > 0 && <span className="text-flame/70">&bull;</span>}
                    {word}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display-tight mt-10 text-[clamp(2.5rem,6.6vw,6rem)]">
                <span className="block whitespace-nowrap">
                  <span className="text-flame">{"{"}</span> {titleLines[0]}
                </span>
                <span className="block whitespace-nowrap">
                  {titleLines[1]} <span className="text-flame">{"}"}</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-body lg:text-[1.25rem] lg:leading-[1.65]">
                {subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10">
                <Button href={site.joinUrl}>{cta}</Button>
              </div>
            </Reveal>
          </div>

          {/* ── Card composition ─────────────────────────────── */}
          <div className="relative mx-auto aspect-square w-full max-w-[26rem] lg:max-w-none">
            {/* Stacked cards behind the mark: same size and radius as the logo,
                offset diagonally so they read as a deliberate stack. */}
            <TileShape
              tone="peach"
              className="left-[4%] top-[8%] size-[58%] opacity-70"
            />
            <TileShape
              tone="blush"
              className="left-[22%] top-[26%] size-[58%]"
            />

            <Reveal delay={0.12} className="absolute inset-0">
              <div className="absolute left-[13%] top-[17%] w-[58%]">
                {hasAsset(LOGO_SRC) ? (
                  <div className="aspect-square overflow-hidden rounded-[22%]">
                    <Image
                      src={LOGO_SRC}
                      alt="Swift Coding Club logo"
                      width={447}
                      height={447}
                      priority
                      sizes="(max-width: 1024px) 46vw, 300px"
                      className="block h-full w-full scale-[1.015] object-cover"
                    />
                  </div>
                ) : (
                  /* Coded fallback until the official mark is supplied */
                  <div className="grid aspect-square w-full place-items-center rounded-[22%] bg-flame">
                    <SwiftMark className="w-[58%] text-white" />
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="absolute right-0 top-[2%] w-[44%] max-w-[12rem]">
              <CodeCard />
            </Reveal>

            {/* Margin annotation */}
            <div className="absolute bottom-[0%] right-[-6%] w-[58%] max-w-[16rem] text-flame">
              <Reveal delay={0.34}>
                <HandNote lines={note} rotate={-7} size="sm" className="text-right" />
                <SketchArrow className="mt-1 ml-auto w-20 opacity-80" />
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── LEARN / BUILD / SHARE / GROW ──────────────────── */}
        <Reveal delay={0.1} className="mt-4 lg:-mt-4">
          <div className="flex items-center gap-6 lg:ml-[58%]">
            <ul className="space-y-1">
              {pillars.map((word) => (
                <li key={word} className="tracked-label">
                  {word}
                </li>
              ))}
            </ul>
            <span className="h-px flex-1 bg-hairline" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
