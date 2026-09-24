import type { Metadata, Viewport } from "next";
import { Archivo_Black, Caveat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Archivo Black ships a single weight — it must be declared explicitly. */
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swift-club.vercel.app"),
  title: {
    default: "Swift Coding Club — Build. Learn. Belong.",
    template: "%s · Swift Coding Club",
  },
  description:
    "A student-run community where ideas meet logic and learners build the future. Workshops, projects and collaboration across technical, creative and corporate domains.",
  keywords: [
    "Swift Coding Club",
    "student coding club",
    "workshops",
    "web development",
    "DSA",
  ],
  openGraph: {
    title: "Swift Coding Club — Build. Learn. Belong.",
    description:
      "Where ideas meet logic, and learners build the future. Join a student-run community of builders.",
    type: "website",
    locale: "en_US",
    siteName: "Swift Coding Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Coding Club — Build. Learn. Belong.",
    description: "Where ideas meet logic, and learners build the future.",
  },
};

/** Updated live by the toggle so mobile browser chrome tracks the theme. */
export const viewport: Viewport = {
  themeColor: "#fffcfa",
};

/**
 * Runs before the browser paints any of <body>, so the correct theme is on
 * <html> from the very first frame — no flash of the wrong palette. It has to
 * be a blocking inline script for that reason; anything deferred, including a
 * React effect, necessarily runs after paint. Wrapped in try/catch because
 * localStorage throws outright in some privacy modes.
 */
const THEME_INIT = `(function(){try{
var s=localStorage.getItem("theme");
var t=(s==="light"||s==="dark"||s==="apple")?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
document.documentElement.dataset.theme=t;
var m=document.querySelector('meta[name="theme-color"]');
if(m)m.setAttribute("content",t==="apple"?"#000000":t==="dark"?"#121011":"#fffcfa");
}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The init script sets data-theme before React hydrates; that difference
      // from the server HTML is intentional, not a bug to warn about.
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${inter.variable} ${caveat.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {children}
      </body>
    </html>
  );
}
