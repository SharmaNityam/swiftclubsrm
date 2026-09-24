import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { DomainCard } from "@/components/ui/DomainCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob } from "@/components/decor/Blob";
import { GridTexture } from "@/components/decor/GridTexture";
import { Spark } from "@/components/decor/Sketches";

export function Domains() {
  const { index, title, intro, outro, items } = site.domains;

  return (
    <section id="domains" className="relative overflow-hidden py-24 md:py-36">
      <Blob className="left-[-12%] top-[2%] size-[46rem]" from="rgba(255,160,120,0.18)" />
      <Blob className="bottom-[-16%] left-[10%] size-[44rem]" from="rgba(255,185,150,0.15)" />
      <GridTexture className="inset-y-0 left-0 w-1/2 opacity-70" />
      <Spark
        className="absolute right-[7%] top-[10%] w-20 text-flame md:w-28"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <SectionHeading index={index} title={title} />

        <Reveal delay={0.08}>
          <p className="mt-7 max-w-[40rem] text-[1.0625rem] leading-[1.8] text-body lg:text-[1.25rem] lg:leading-[1.75] md:ml-[8.5rem]">
            {intro}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {items.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} delay={i * 0.1} />
          ))}
        </ul>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 flex max-w-[54rem] items-center gap-6">
            <span className="h-px flex-1 bg-hairline" aria-hidden />
            <p className="tracked-label text-center">{outro}</p>
            <span className="h-px flex-1 bg-hairline" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
