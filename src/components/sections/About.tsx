import Image from "next/image";
import { site } from "@/content/site";
import { hasAsset } from "@/lib/asset";
import { Reveal } from "@/components/ui/Reveal";
import { HandNote } from "@/components/ui/HandNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, TileShape } from "@/components/decor/Blob";
import { GridTexture } from "@/components/decor/GridTexture";
import { Squiggle, Underswoosh } from "@/components/decor/Sketches";

export function About() {
  const { index, title, body, note, photo } = site.about;

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      {/* Rotated tile motif bleeding off the left edge */}
      <Blob className="left-[-8%] top-[4%] size-[42rem]" from="rgba(255,150,110,0.18)" />
      <Blob className="right-[-10%] bottom-[-10%] size-[48rem]" from="rgba(255,175,140,0.16)" />
      <GridTexture className="right-0 top-[8%] h-[70%] w-[45%] opacity-50" size={30} />

      <TileShape
        tone="flame"
        className="left-[-6rem] top-[28%] hidden size-48 rotate-[24deg] opacity-90 lg:block lg:size-60"
      />
      <TileShape
        tone="peach"
        className="left-[-2.5rem] top-[46%] hidden size-44 rotate-[18deg] lg:block lg:size-52"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
          {/* ── Copy ─────────────────────────────────────────── */}
          <div>
            <SectionHeading index={index} title={title} />

            <Reveal delay={0.1}>
              <p className="mt-9 max-w-[38rem] text-[1.0625rem] leading-[1.8] text-body lg:text-[1.25rem] lg:leading-[1.75] md:ml-[8.5rem]">
                {body}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-12 w-fit md:ml-[8.5rem]">
                <HandNote lines={note} rotate={-5} size="lg" />
                <Underswoosh className="mt-1 w-56 text-flame/70" />
              </div>
            </Reveal>
          </div>

          {/* ── Taped photo ──────────────────────────────────── */}
          <Reveal delay={0.14} className="relative mx-auto w-full max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[26rem]">
            <div className="relative rotate-[-3deg]">
              {/* Tape strips, drawn rather than baked into the photo */}
              <span
                aria-hidden
                className="absolute -top-4 right-6 z-10 h-9 w-24 rotate-[-14deg] rounded-[2px] bg-flame/85 shadow-[0_4px_10px_-6px_rgba(11,11,12,0.5)]"
              />
              <span
                aria-hidden
                className="absolute -bottom-3 left-4 z-10 h-8 w-20 rotate-[8deg] rounded-[2px] bg-flame/75"
              />

              <div className="overflow-hidden rounded-[6px] border-[10px] border-surface bg-tile shadow-[0_14px_30px_-20px_rgba(11,11,12,0.35)]">
                {hasAsset(photo.src) ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1086}
                    height={1448}
                    sizes="(max-width: 1024px) 85vw, 400px"
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <div className="grid aspect-[3/4] w-full place-items-center bg-tile text-center">
                    <span className="font-hand text-2xl leading-tight text-muted">
                      Good Code
                      <br />
                      Brighter People
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Squiggle className="mt-4 ml-auto w-36 text-flame" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
