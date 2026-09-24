import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { HandNote } from "@/components/ui/HandNote";
import { AvatarTile } from "@/components/ui/AvatarTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SketchArrow } from "@/components/decor/Sketches";

export function Team() {
  const { index, title, intro, note, groups } = site.team;

  return (
    <section id="team" className="relative overflow-hidden py-24 md:py-36">
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <SectionHeading index={index} title={title} />

        <Reveal delay={0.08}>
          <p className="mt-7 text-[1.0625rem] leading-[1.8] text-body lg:text-[1.25rem] lg:leading-[1.75] md:ml-[8.5rem]">
            {intro}
          </p>
        </Reveal>

        <div className="relative mt-14 md:ml-[8.5rem]">
          <div className="space-y-6 md:space-y-7 lg:max-w-[52rem]">
            {groups.map((group, gi) => (
              <Reveal
                key={group.label}
                delay={gi * 0.1}
                className="grid gap-3 md:grid-cols-[9rem_1fr] md:items-center md:gap-8"
              >
                <h3 className="text-[1.125rem] font-bold text-ink lg:text-[1.25rem]">
                  {group.label}
                </h3>

                <ul className="grid grid-cols-4 gap-3 md:gap-6">
                  {group.members.map((member, mi) => (
                    <li key={`${group.label}-${mi}`}>
                      <AvatarTile member={member} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Margin annotation, tucked beside the grid on wide screens */}
          <div className="mt-10 w-fit text-flame lg:absolute lg:-top-8 lg:right-0 lg:mt-0 lg:w-[14rem]">
            <Reveal delay={0.24}>
              <HandNote lines={note} rotate={-5} size="md" />
              <SketchArrow className="mt-2 w-24 opacity-80" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
