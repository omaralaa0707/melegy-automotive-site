import type { MelegyContent } from "./schema-ext";
import { PROFILE } from "./media";

export const ar: MelegyContent = {
  locale: "ar",
  dir: "rtl",

  brand: {
    name: "ملچي أوتو",
    shortName: "MA",
    tagline: "#المستعمل_عندنا_زيرو",
  },

  nav: [
    { label: "الاستمارة", href: "#form" },
    { label: "ملفات مغلقة", href: "#closed" },
    { label: "الفرعان", href: "#branches" },
  ],

  hero: {
    eyebrow: "مدينة نصر والإسماعيلية",
    headline: "كل سيارة هنا تمر بنفس الحقول الثمانية",
    sub: "ملچي أوتو ينشرون على استمارة واحدة ثابتة: ترتيب محدد من الحقول للسيارة المعروضة، وسطر إغلاق واحد للسيارة المباعة. لا شيء بينهما. هذه الصفحة مبنية من تلك الاستمارة، حقلًا حقلًا — اختر ملفًا أدناه لترى الختم يهبط.",
    primaryCta: "اتصل بملچي أوتو",
    secondaryCta: "افتح الاستمارة",
    stampAlt: "استمارة ورقية على منضدة داكنة، وختم مطاطي فوقها يهبط ويطبع «تم البيع» على ملف مغلق.",
    availableLabel: "معروضة",
    soldLabel: "مباعة",
    followersLabel: "متابع",
    postsLabel: "منشور",
  },

  about: {
    heading: "ملچي أوتو",
    body: [
      "معرض في مدينة نصر وآخر في الإسماعيلية، ينشران سيارات مستعملة وشبه جديدة على استمارة واحدة ثابتة — نفس الأسئلة الثمانية تُجاب في كل مرة، ولا يُنشر شيء بعد أن تُباع السيارة.",
    ],
  },

  services: { heading: "الاستمارة", items: [] },
  gallery: { heading: "الاستمارة", items: [] },

  form: {
    eyebrow: "الاستمارة",
    heading: "الحقول الثمانية، مملوءة بالترتيب نفسه في كل مرة",
    intro: "أربعة عروض، مقروءة تمامًا كما كتبها ملچي أوتو: الطراز والسنة والفئة وهل الدهان بالكامل دهان المصنع والممشى ومَن يقوم بالصيانة والرخصة والكماليات — مقسّمة دائمًا إلى المجموعات نفسها.",
    fieldLabels: {
      year: "الموديل",
      trim: "الفئة",
      factoryPaint: "دهان المصنع",
      mileage: "الممشى",
      service: "الصيانات",
      licence: "الرخصة",
    },
    yes: "فابريكة بالكامل — بدون دهان خارجي",
    agency: "صيانات توكيل",
    equipmentLabel: "الكماليات",
    financeNote: "يوجد لدينا جميع أنظمة التقسيط.",
    financeExtended: "بنوك وشركات تمويل · أقل مقدم · أقل فائدة · أطول فترة سداد.",
    viewPost: "شاهد المنشور",
  },

  closed: {
    eyebrow: "ملفات مغلقة",
    heading: "ما يقوله منشور «تم البيع» فعليًا",
    intro: "أربعة من آخر ثمانية منشوراتهم بهذا الاختصار: صورة تسليم وماركة وشكر. لا ممشى ولا كماليات ولا سبب — الملف يُغلق فقط.",
    stampHint: "اختر ملفًا لترى الختم يهبط.",
    viewPost: "شاهد المنشور",
  },

  branches: {
    eyebrow: "فرعان",
    heading: "مدينة نصر، والإسماعيلية — الفرع الوحيد فيها بهذه السلسلة",
    intro: "كل منشور يحمل الأرقام الثلاثة نفسها والمواعيد نفسها، أيًا كان الفرع الذي تقف فيه السيارة.",
    hoursLabel: "المواعيد",
    sloganNote: "وسمهم الثابت في كل منشور: «المستعمل عندنا زيرو» — أي أن المستعمل لديهم لا يظهر عليه أنه كذلك.",
  },

  contact: {
    heading: "زوروهم",
    addressLabel: "الفروع",
    address: `${PROFILE.branches[0].addressAr} · ${PROFILE.branches[1].addressAr}`,
    phoneLabel: "اتصال",
    phones: [...PROFILE.phones],
    branchesLabel: "الفروع",
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "اتصل بملچي أوتو",
  },

  footer: {
    disclaimer: "تصميم مفاهيمي بُني كعرض توضيحي. ليس موقعًا رسميًا لملچي أوتو وغير تابع لهم. جميع الصور والعلامات والنصوص المقتبسة ملك لهم.",
    rights: "تصميم بواسطة Claude",
  },

  a11y: {
    toggleLanguage: "Switch to English",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
  },
};
