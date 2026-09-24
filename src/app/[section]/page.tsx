import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { HomeSections } from "@/components/HomeSections";
import { ScrollToSectionOnMount } from "@/components/layout/ScrollToSectionOnMount";

const SECTIONS = site.nav.map((n) => n.href.slice(1));

/** Prerender one static page per section — no redirects, no client-only routing. */
export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

/** Anything outside the known sections is a genuine 404. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[section]">): Promise<Metadata> {
  const { section } = await params;
  const item = site.nav.find((n) => n.href === `/${section}`);
  if (!item) return {};

  return {
    title: item.label,
    // These routes serve the same page as "/", so point ranking at the original
    // rather than letting six URLs compete as duplicate content.
    alternates: { canonical: "/" },
  };
}

export default async function SectionPage({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  if (!SECTIONS.includes(section)) notFound();

  return (
    <>
      <ScrollToSectionOnMount id={section} />
      <HomeSections />
    </>
  );
}
