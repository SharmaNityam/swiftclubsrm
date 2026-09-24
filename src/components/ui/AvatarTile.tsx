import Image from "next/image";
import type { Member } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A team slot. Renders the mockup's grey placeholder glyph until a real photo
 * is supplied via `member.src`, so the grid is complete from day one and
 * filling it later is a `site.ts` edit rather than a component change.
 */
export function AvatarTile({
  member,
  className,
}: {
  member: Member;
  className?: string;
}) {
  const hasPhoto = Boolean(member.src);

  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-[10px] bg-tile",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_14px_-10px_rgba(11,11,12,0.3)]",
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src={member.src!}
          alt={member.name ? `${member.name}${member.role ? `, ${member.role}` : ""}` : "Club member"}
          fill
          sizes="(max-width: 768px) 22vw, 90px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <PlaceholderGlyph />
      )}

      {member.name ? (
        <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/65 to-transparent px-2 pb-1.5 pt-6 text-[0.6875rem] font-medium text-white">
          {member.name}
        </span>
      ) : null}
    </div>
  );
}

/** The grey silhouette shown in the design's empty roster slots. */
function PlaceholderGlyph() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="absolute inset-0 size-full p-[30%] text-glyph"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="24" cy="15" r="9" />
      <path d="M24 27c-9.4 0-17 6.3-17 14 0 .6.5 1 1 1h32c.6 0 1-.4 1-1 0-7.7-7.6-14-17-14Z" />
    </svg>
  );
}
