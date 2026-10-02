/**
 * Single source of truth for every string, list and roster on the page.
 * Section components are pure renderers over this data - copy edits and new
 * team members never require touching JSX.
 */

export type NavItem = { label: string; href: string };

export type Domain = {
  id: string;
  icon: "code" | "brush" | "users";
  title: string;
  body: string;
};

export type Member = {
  /** Left undefined until real people are added - tile renders a placeholder. */
  name?: string;
  role?: string;
  /** Path under /public, e.g. "/images/team/asha.jpg" */
  src?: string;
};

export type TeamGroup = { label: string; members: Member[] };

export type GalleryItem = { id: string; caption: string; src?: string };

/** Four empty slots, matching the placeholder grid in the design. */
const emptySlots = (n: number): Member[] => Array.from({ length: n }, () => ({}));

export const site = {
  name: "Swift Coding Club",
  tagline: "Build. Learn. Belong.",

  joinUrl: "/register",

  /**
   * Clean paths, not hash fragments. Each is a real route (see
   * src/app/[section]/page.tsx) that renders this same page and scrolls to the
   * matching section, so the links work without JS and are crawlable.
   * `href.slice(1)` is the section's DOM id.
   */
  nav: [
    { label: "About", href: "/about" },
    { label: "Domains", href: "/domains" },
    { label: "Our Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Recruitments", href: "/recruitments" },
  ] satisfies NavItem[],

  hero: {
    eyebrow: ["Code", "Collaborate", "Create"],
    titleLines: ["Swift", "Coding Club"],
    subtitle: "Where ideas meet logic, and learners build the future.",
    cta: "Join the Club",
    note: ["Same students.", "Bigger possibilities."],
    pillars: ["Learn", "Build", "Share", "Grow"],
    code: {
      declaration: "let ideas = [",
      values: ["learn", "build", "grow"],
      close: "]",
    },
  },

  about: {
    index: "01",
    title: "About",
    body: "The Swift Coding Club aims to make coding more accessible and enjoyable for everyone. Our diverse membership includes tech enthusiasts and students who share a passion for learning and coding. Experienced members lead the development of tools and organize relevant workshops. We support and collaborate, share ideas, and work on exciting projects within and beyond our university. Whether you're looking to enhance your resumes, build connections, or simply have a good time, the Swift Coding Club offers something for everyone. We're a student-run community dedicated to learning, building, and growing together.",
    note: ["More than code", "A community"],
    photo: {
      src: "/images/laptop-stickers.png",
      alt: "A laptop covered in club stickers, including one reading “Good Code Brighter People”.",
    },
  },

  domains: {
    index: "02",
    title: "Domains",
    intro:
      "We explore, learn and build across multiple domains, giving members the freedom to find what excites them the most.",
    outro: "Different interests. A shared mindset.",
    items: [
      {
        id: "technical",
        icon: "code",
        title: "Technical",
        body: "Workshops, projects, DSA, web & app development and more.",
      },
      {
        id: "creatives",
        icon: "brush",
        title: "Creatives",
        body: "Design, content, branding and everything that brings ideas to life.",
      },
      {
        id: "corporate",
        icon: "users",
        title: "Corporate",
        body: "Outreach, sponsorships, events and collaborations to grow the club's impact.",
      },
    ] satisfies Domain[],
  },

  team: {
    index: "03",
    title: "Our Team",
    intro: "A group of learners, builders and dreamers.",
    note: ["You here?", "Maybe soon :)"],
    groups: [
      { label: "Technical", members: emptySlots(4) },
      { label: "Creatives", members: emptySlots(4) },
      { label: "Corporate", members: emptySlots(4) },
    ] satisfies TeamGroup[],
  },

  gallery: {
    index: "04",
    title: "Gallery",
    intro: "Late nights, whiteboards and the occasional working demo.",
    items: [
      { id: "g1", caption: "Workshop night" },
      { id: "g2", caption: "Hackathon kickoff" },
      { id: "g3", caption: "Design jam" },
      { id: "g4", caption: "Demo day" },
      { id: "g5", caption: "Study circle" },
      { id: "g6", caption: "Team offsite" },
    ] satisfies GalleryItem[],
  },

  recruitments: {
    index: "05",
    title: "Recruitments",
    heading: "Applications are open.",
    body: "No prior experience required just curiosity and the willingness to build something with other people.",
    cta: "Join the Club",
  },

  register: {
    eyebrow: "Recruitments 2026",
    title: "Join the Club",
    intro:
      "Tell us a little about yourself. No prior experience required - we care more about curiosity than credentials.",
    /** The form is commented out on /register while applications are closed. */
    openingSoon: {
      title: "Opening soon",
      body: "We aren't taking applications yet. The form will go live right here the moment recruitments open - check back soon, or watch our socials for the date.",
    },
    years: ["1st year", "2nd year", "3rd year", "4th year"],
    success: {
      title: "You're on the list.",
      body: "Thanks for applying. We'll review your response and email you about the next round within a week.",
    },
    /** Mock submission \u2014 nothing leaves the browser. */
    note: "This is a demo form. Submissions are not stored or sent anywhere yet.",
  },

  footer: {
    words: ["Ideas", "People", "Progress"],
    closing: "Together",
  },
} as const;
