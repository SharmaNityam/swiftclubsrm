import Image from "next/image";
import { site } from "@/content/site";
import { hasAsset } from "@/lib/asset";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  const { index, title, intro, items } = site.gallery;

  return (
    <section id="gallery" className="relative overflow-hidden py-24 md:py-36">
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <SectionHeading index={index} title={title} />

        <Reveal delay={0.08}>
          <p className="mt-7 max-w-[38rem] text-[1.0625rem] leading-[1.8] text-body lg:text-[1.25rem] lg:leading-[1.75] md:ml-[8.5rem]">
            {intro}
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {items.map((item, i) => {
            const src = `/images/gallery/${item.id}.jpg`;
            return (
              <Reveal key={item.id} as="li" delay={(i % 3) * 0.08}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-[12px] bg-tile">
                  {hasAsset(src) ? (
                    <Image
                      src={src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 768px) 45vw, 360px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-tile" />
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10 text-[0.75rem] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
