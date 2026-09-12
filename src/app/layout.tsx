import type { Metadata } from "next";
import { Bitter, Space_Mono, Katibeh, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A slab serif for the official register of a form, a monospace for the
// fields themselves — the two faces a real intake sheet would actually use.
const bitter = Bitter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bitter",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const katibeh = Katibeh({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-katibeh",
});
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Melegy Auto — the form | Nasr City & Ismailia",
  description:
    "Every available car runs through the same eight fields; every sold car ends in one line. A dealership page built as the intake form itself, with a stamp that falls on a closed file.",
  metadataBase: new URL("https://melegy-automotive-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Melegy Auto — the form",
    description: "A dealership page built from their own rigid intake template, field for field.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#1c1a17" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${bitter.variable} ${spaceMono.variable} ${katibeh.variable} ${vazirmatn.variable}`}
    >
      <body className="bg-ground text-cream antialiased">
        {/* Fields tick in under an intersection observer, so without
            scripting every block would stay at opacity 0. */}
        <noscript>
          <style>{`[data-tick],[data-tick-rule]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
