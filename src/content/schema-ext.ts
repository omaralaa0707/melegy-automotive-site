import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * Melegy Auto's whole account runs on one template: eight fields for an
 * available car, one line for a sold one. The shared schema has no
 * vocabulary for a fixed intake form, for two branches, or for the
 * alternation between the two post types.
 */
export type MelegyContent = SiteContent & {
  hero: SiteContent["hero"] & {
    stampAlt: string;
    availableLabel: string;
    soldLabel: string;
    followersLabel: string;
    postsLabel: string;
  };
  form: {
    eyebrow: string;
    heading: string;
    intro: string;
    fieldLabels: {
      year: string;
      trim: string;
      factoryPaint: string;
      mileage: string;
      service: string;
      licence: string;
    };
    yes: string;
    agency: string;
    equipmentLabel: string;
    financeNote: string;
    financeExtended: string;
    viewPost: string;
  };
  closed: {
    eyebrow: string;
    heading: string;
    intro: string;
    stampHint: string;
    viewPost: string;
  };
  branches: {
    eyebrow: string;
    heading: string;
    intro: string;
    hoursLabel: string;
    sloganNote: string;
  };
  contact: SiteContent["contact"] & {
    branchesLabel: string;
  };
};

export function useMelegy() {
  return useContent() as MelegyContent;
}
