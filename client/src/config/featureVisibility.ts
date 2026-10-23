/**
 * Temporary release switches for unfinished MedWeg areas.
 *
 * To restore a suspended area, change only the relevant flag or remove the
 * country from the hidden lists. The underlying data, pages, and assets stay
 * in the repository while these settings are disabled.
 */
export const FEATURE_VISIBILITY = {
  specialties: false,
  mentors: false,
  questions: false,
} as const;

export const HIDDEN_COUNTRY_IDS = [
  "egypt",
  "sudan",
  "switzerland",
  "austria",
  "norway",
  "new-zealand",
  "saudi-arabia",
  "uae",
  "qatar",
] as const;

export const HIDDEN_COUNTRY_NAMES = [
  "Bahrain",
  "Kuwait",
  "Oman",
  "Qatar",
  "Saudi Arabia",
  "United Arab Emirates",
  "Egypt",
  "Sudan",
  "Switzerland",
  "Austria",
  "Norway",
  "New Zealand",
] as const;

export function isCountryVisible(id: string) {
  return !HIDDEN_COUNTRY_IDS.includes(
    id as (typeof HIDDEN_COUNTRY_IDS)[number]
  );
}

export function isCountryNameVisible(name: string) {
  return !HIDDEN_COUNTRY_NAMES.includes(
    name as (typeof HIDDEN_COUNTRY_NAMES)[number]
  );
}
