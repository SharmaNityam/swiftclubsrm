import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollSpy } from "@/components/layout/ScrollSpy";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Domains } from "@/components/sections/Domains";
import { Team } from "@/components/sections/Team";
import { Gallery } from "@/components/sections/Gallery";
import { Recruitments } from "@/components/sections/Recruitments";

/**
 * The one-page composition. Rendered by both `/` and every `/[section]` route
 * so the clean URLs serve identical content rather than a redirect.
 */
export function HomeSections() {
  return (
    <>
      <Navbar />
      <ScrollSpy />
      <main className="flex-1">
        <Hero />
        <About />
        <Domains />
        <Team />
        <Gallery />
        <Recruitments />
      </main>
      <Footer />
    </>
  );
}
