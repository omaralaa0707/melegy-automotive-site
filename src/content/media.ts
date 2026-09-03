/**
 * Melegy Auto post through one rigid template. Every "available" post runs
 * the same eight fields in the same order — model, year, trim, factory
 * paint, mileage, service history, licence, then an equipment list broken
 * into the same bullet groups, always closed with three phone numbers and
 * the same working hours. Every "sold" post is the opposite: one line, no
 * fields, no photograph of the showroom — just a delivery snapshot and a
 * thank-you.
 *
 * Eight of their last posts alternate exactly: sold, available, sold,
 * available, sold, available, sold, available. This page is built from that
 * alternation and that template, field for field.
 */

export type SoldId = "tiggo8-sold" | "qashqai" | "c180" | "tiggo3";
export type AvailableId = "ibiza" | "508" | "500x" | "tiggo8-av";

export type Sold = {
  id: SoldId;
  marque: string;
  model: string;
  frame: string;
  postUrl: string;
};

export type Available = {
  id: AvailableId;
  marque: string;
  model: string;
  year: string;
  trim?: string;
  /** "فابريكة بالكامل" — no paint outside the factory's own. */
  factoryPaint: boolean;
  mileageKm: number;
  /** "توكيل" — agency-serviced, as opposed to an independent workshop. */
  serviceAgency: boolean;
  licence: string;
  /** Their own bullet groups, kept intact rather than flattened to one list —
   *  the groups are how they wrote it, line by line. */
  equipment: { en: string[]; ar: string[] }[];
  /** True only for the one post with the extended financing paragraph. */
  extendedFinance: boolean;
  frames: string[];
  postUrl: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

export const SOLD: Sold[] = [
  { id: "tiggo8-sold", marque: "Chery", model: "Tiggo 8", frame: "/media/tiggo8-sold-1.jpg", postUrl: post("DcyRpIRDNWb") },
  { id: "qashqai", marque: "Nissan", model: "Qashqai", frame: "/media/qashqai-1.jpg", postUrl: post("DcwdkcymlSi") },
  { id: "c180", marque: "Mercedes-Benz", model: "C180", frame: "/media/c180-1.jpg", postUrl: post("DctAj6GFreu") },
  { id: "tiggo3", marque: "Chery", model: "Tiggo 3", frame: "/media/tiggo3-1.jpg", postUrl: post("DcqbFlHFk8M") },
];

export const AVAILABLE: Available[] = [
  {
    id: "ibiza",
    marque: "SEAT",
    model: "Ibiza",
    year: "2025",
    trim: "Limited Edition",
    factoryPaint: true,
    mileageKm: 54000,
    serviceAgency: true,
    licence: "2 years",
    equipment: [
      { en: ["Airbag", "ABS", "Steering-wheel controls"], ar: ["ايرباج", "Abs", "تحكم طارة"] },
      { en: ["Cruise control", "Digital odometer"], ar: ["مثبت سرعة", "عداد ديجيتال"] },
      { en: ["Touchscreen deck", "Bluetooth", "A/C", "Front & rear sensors"], ar: ["كاسيت شاشة", "بلوتوث", "تكييف", "سينسور خلفى وأمامى"] },
      { en: ["Power mirrors", "Folding mirrors", "Turn signals on mirrors", "Panoramic sunroof", "Keyless entry, front & rear"], ar: ["مرايات كهربا", "مرايات ضم", "إشارات بالمرايات", "فتحه سقف بانوراما", "بصمه داخليه وخارجيه"] },
      { en: ["Rear camera"], ar: ["فامية خلفي"] },
      { en: ["LED headlights", "Fog lights"], ar: ["فوانيس LED", "فوج لايت"] },
      { en: ["Sport rims and other extras"], ar: ["جنوط اسبور وكماليات اخري"] },
    ],
    extendedFinance: false,
    frames: ["/media/ibiza-1.jpg", "/media/ibiza-2.jpg", "/media/ibiza-3.jpg"],
    postUrl: post("DcyF1cKloSA"),
  },
  {
    id: "508",
    marque: "Peugeot",
    model: "508",
    year: "2022",
    trim: "GT Line",
    factoryPaint: true,
    mileageKm: 135000,
    serviceAgency: true,
    licence: "1 year",
    equipment: [
      { en: ["Airbag", "ABS", "Steering-wheel controls"], ar: ["ايرباج", "Abs", "تحكم طارة"] },
      { en: ["Cruise control", "Digital odometer", "Keyless entry, front & rear", "Red leather trim"], ar: ["مثبت سرعة", "عداد ديجيتال", "بصمة داخليه وخارجيه", "فرش جلد احمر"] },
      { en: ["Touchscreen deck", "Wireless charger", "Bluetooth"], ar: ["كاسيت شاشة", "شاحن وايرلس", "بلوتوث"] },
      { en: ["A/C", "Rear A/C", "Folding mirrors", "Power mirrors", "Turn signals on mirrors"], ar: ["تكييف", "تكييف خلفي", "مرايات ضم", "مرايات كهربا", "إشارات بالمرايا"] },
      { en: ["Panoramic sunroof", "Power seats with memory", "Lumbar support", "Power boot", "Electric handbrake", "Rear camera"], ar: ["فتحه سقف بانوراما", "كراسى كهربا + ميمورى", "داعم قطنيه", "شنطه كهربا", "فرامل يد كهرباء", "كاميرا خلفية"] },
      { en: ["Front & rear sensors", "Rain sensor", "Rear side camera"], ar: ["سينسور خلفى وأمامى", "حساس مطر", "فاميه جانبي خلفي"] },
      { en: ["LED headlights, front & rear", "Fog lights"], ar: ["فوانيس ليد امامي وخلفي", "فوج لايت"] },
      { en: ["Sport rims and other extras"], ar: ["جنوط اسبور وكماليات اخري"] },
    ],
    extendedFinance: true,
    frames: ["/media/508-1.jpg", "/media/508-2.jpg", "/media/508-3.jpg"],
    postUrl: post("DcvlaWQljcB"),
  },
  {
    id: "500x",
    marque: "Fiat",
    model: "500X",
    year: "2021",
    factoryPaint: true,
    mileageKm: 97000,
    serviceAgency: true,
    licence: "1 year",
    equipment: [
      { en: ["Airbag", "ABS", "Two-tone paint"], ar: ["ايرباج", "Abs", "two tone"] },
      { en: ["Cassette deck", "Bluetooth", "Rear camera", "Front & rear sensors", "Electric handbrake"], ar: ["كاسيت", "بلوتوث", "كاميرا خلفيه", "سينسور امامى وخلفى", "هاند بريك كهربا"] },
      { en: ["Touch A/C", "Turn signals on mirrors", "USB port", "Panoramic sunroof", "Power seats"], ar: ["تكييف تاتش", "اشارات في المرايات", "مخرج usb", "فتحه سقف بانوراما", "كراسى كهربا"] },
      { en: ["Power mirrors", "Steering-wheel controls", "Cruise control", "Fog lights", "LED headlights, front & rear"], ar: ["مرايات كهرباء", "تحكم فى الطاره", "مثبت سرعه", "فوج لايت", "فوانيس ليد امامي وخلفي"] },
      { en: ["Sport rims and other extras"], ar: ["جنوط اسبور وكماليات اخري"] },
    ],
    extendedFinance: false,
    frames: ["/media/500x-1.jpg", "/media/500x-2.jpg", "/media/500x-3.jpg"],
    postUrl: post("DcrC0LpFhk3"),
  },
  {
    id: "tiggo8-av",
    marque: "Chery",
    model: "Tiggo 8",
    year: "2025",
    trim: "Luxury",
    factoryPaint: true,
    mileageKm: 58000,
    serviceAgency: true,
    licence: "1 year",
    equipment: [
      { en: ["Airbag", "ABS", "Steering-wheel controls", "7 seats"], ar: ["ايرباج", "Abs", "تحكم طارة", "7 seats"] },
      { en: ["Cruise control", "Digital odometer", "Keyless entry, front & rear", "Electric handbrake"], ar: ["مثبت سرعة", "عداد ديجيتال", "بصمة داخليه وخارجيه", "هاند كهرباء"] },
      { en: ["Touchscreen deck", "Bluetooth", "Touch A/C", "Rear A/C"], ar: ["كاسيت شاشة", "بلوتوث", "تكييف تاتش", "تكييف خلفي"] },
      { en: ["360° camera", "Folding mirrors", "Power mirrors", "Leather trim", "Panoramic sunroof"], ar: ["كاميرا 360", "مرايات ضم", "مرايات كهربا", "فرش جلد", "فتحة سقف بانوراما"] },
      { en: ["Rear side camera", "Front & rear sensors"], ar: ["فامية جانبي خلفي", "سينسور خلفي وامامى"] },
      { en: ["Xenon headlights", "LED headlights, front & rear", "Fog lights"], ar: ["فوانيس زينون", "فوانيس ليد امامي وخلفي", "فوج لايت"] },
      { en: ["Sport rims and other extras"], ar: ["جنوط اسبور وكماليات اخري"] },
    ],
    extendedFinance: false,
    frames: ["/media/tiggo8-av-1.jpg", "/media/tiggo8-av-2.jpg", "/media/tiggo8-av-3.jpg"],
    postUrl: post("DcodvwZlk1C"),
  },
];

export const PROFILE = {
  instagram: "https://www.instagram.com/melegyauto/",
  facebook: "https://www.facebook.com/profile.php?id=61582233003912",
  maps: "https://www.google.com/maps/search/?api=1&query=Melegy+Auto+Nasr+City+Mehwar+El+Shaheed+Cairo",
  phones: ["01227174125", "01270000169", "01271578303"],
  phoneHref: "tel:+201227174125",
  branches: [
    { city: "Cairo", cityAr: "القاهرة", address: "Nasr City, Mehwar El Shaheed", addressAr: "مدينة نصر، محور الشهيد" },
    { city: "Ismailia", cityAr: "الإسماعيلية", address: "Fox Square, Ard El Gam3iyat", addressAr: "ميدان فوكس، أرض الجمعيات" },
  ],
  hours: "Sat–Thu, 12:00 pm – 1:00 am",
  hoursAr: "السبت للخميس، من ١٢ ظهرًا حتى ١ صباحًا",
  followers: "2,130",
  posts: "961",
  /** Their own slogan hashtag: "used, with us, is zero [flaws]". */
  slogan: "#المستعمل_عندنا_زيرو",
} as const;
