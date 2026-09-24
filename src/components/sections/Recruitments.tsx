import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwiftMark } from "@/components/decor/SwiftMark";

export function Recruitments() {
  const { index, title, heading, body, cta } = site.recruitments;

  return (
    <section id="recruitments" className="relative overflow-hidden py-24 md:py-36">
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <SectionHeading index={index} title={title} />

        <Reveal delay={0.1} className="mt-12 md:ml-[8.5rem]">
          <div className="relative overflow-hidden rounded-[10px] bg-flame px-8 py-12 md:px-14 md:py-16">
            {/* Oversized watermark bleeding off the card's right edge */}
            <SwiftMark
              className="pointer-events-none absolute -right-8 -top-6 w-56 text-white/10 md:w-72"
            />

            <div className="relative max-w-lg">
              <h3 className="display-tight text-[clamp(1.75rem,3.4vw,2.5rem)] text-white">
                {heading}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-white/85">
                {body}
              </p>
              <div className="mt-8">
                <Button
                  href={site.joinUrl}
                  variant="outline"
                  className="border-transparent bg-white text-flame hover:border-transparent hover:text-flame"
                >
                  {cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
