import type { Metadata } from "next";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { RegisterForm } from "@/components/sections/RegisterForm";
import { Blob } from "@/components/decor/Blob";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Apply to join the Swift Coding Club. No prior experience required — just curiosity and the willingness to build something with other people.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  const { eyebrow, title, intro } = site.register;

  return (
    <>
      <Navbar />

      <main className="relative flex-1 overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
        <Blob
          className="right-[-12%] top-[-16%] size-[42rem]"
          from="rgba(255,122,69,0.18)"
        />
        <Blob
          className="bottom-[-18%] left-[-10%] size-[36rem]"
          from="rgba(255,165,130,0.14)"
        />

        <div className="relative mx-auto max-w-[760px] px-6 md:px-10">
          <Reveal>
            <p className="tracked-label">{eyebrow}</p>
            <h1 className="display-tight mt-5 text-[clamp(2.25rem,6vw,3.75rem)]">
              {title}
            </h1>
            <span className="mt-5 block h-[3px] w-14 rounded-full bg-flame" aria-hidden />
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.8] text-body lg:text-[1.125rem]">
              {intro}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <RegisterForm />
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
