import type { MelegyContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: MelegyContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Melegy Auto",
    shortName: "MA",
    tagline: "المستعمل عندنا زيرو — used, with us, is zero",
  },

  nav: [
    { label: "The form", href: "#form" },
    { label: "Closed files", href: "#closed" },
    { label: "The branches", href: "#branches" },
  ],

  hero: {
    eyebrow: "Nasr City & Ismailia",
    headline: "Every car here goes through the same eight fields",
    sub: "Melegy Auto post to one template: a fixed order of fields for a car that is available, and one closing line for a car that is sold. Nothing in between. This page is built from that form, field for field — select a file below to see the stamp fall.",
    primaryCta: "Call Melegy Auto",
    secondaryCta: "Open the form",
    stampAlt: "A paper intake sheet on a dark counter, with a rubber stamp above it that strikes down and inks SOLD across a closed file.",
    availableLabel: "Available",
    soldLabel: "Sold",
    followersLabel: "Followers",
    postsLabel: "Posts",
  },

  about: {
    heading: "Melegy Auto",
    body: [
      "A showroom in Nasr City and a second in Ismailia, posting used and nearly-new cars to one fixed template — the same eight questions answered every time, and nothing published once a car is gone.",
    ],
  },

  services: { heading: "The form", items: [] },
  gallery: { heading: "The form", items: [] },

  form: {
    eyebrow: "The form",
    heading: "The eight fields, filled in the same order every time",
    intro: "Four available listings, read exactly as Melegy Auto wrote them: model, year, trim, whether the paint is entirely the factory's own, the mileage, who has serviced it, the licence, and the equipment — always broken into the same bullet groups.",
    fieldLabels: {
      year: "Year",
      trim: "Trim",
      factoryPaint: "Factory paint",
      mileage: "Mileage",
      service: "Service history",
      licence: "Licence",
    },
    yes: "Fully factory — no outside paint",
    agency: "Agency-serviced",
    equipmentLabel: "Equipment",
    financeNote: "All instalment systems available.",
    financeExtended: "Banks and finance companies · lowest down payment · lowest rate · longest repayment term.",
    viewPost: "See the post",
  },

  closed: {
    eyebrow: "Closed files",
    heading: "What a sold post actually says",
    intro: "Four of their last eight posts are this short: a delivery photo, a marque, and a thank-you. No mileage, no equipment, no reason given — the file is simply closed.",
    stampHint: "Select a file to watch the stamp fall.",
    viewPost: "See the post",
  },

  branches: {
    eyebrow: "Two branches",
    heading: "Nasr City, and the only Ismailia showroom in this series",
    intro: "Every post carries the same three numbers and the same hours, whichever branch the car is sitting in.",
    hoursLabel: "Hours",
    sloganNote: "Their own hashtag, on every single post: \"used, with us, is zero\" — the claim that nothing pre-owned here shows it.",
  },

  contact: {
    heading: "Visit",
    addressLabel: "Branches",
    address: `${PROFILE.branches[0].address} · ${PROFILE.branches[1].address}`,
    phoneLabel: "Call",
    phones: [...PROFILE.phones],
    branchesLabel: "Branches",
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call Melegy Auto",
  },

  footer: {
    disclaimer: "A concept design, built as a demonstration. Not an official Melegy Auto site, and not affiliated with them. All photography, marks and quoted copy belong to Melegy Auto.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
