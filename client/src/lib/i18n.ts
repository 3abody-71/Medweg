export const ARABIC_COUNTRY_NAMES: Record<string, string> = {
  usa: "الولايات المتحدة",
  uk: "المملكة المتحدة",
  australia: "أستراليا",
  canada: "كندا",
  germany: "ألمانيا",
  ireland: "أيرلندا",
  qatar: "قطر",
  "saudi-arabia": "السعودية",
  uae: "الإمارات العربية المتحدة",
  switzerland: "سويسرا",
  norway: "النرويج",
  sweden: "السويد",
  netherlands: "هولندا",
  newzealand: "نيوزيلندا",
};

export function countryName(
  id: string,
  englishName: string,
  isArabic: boolean
) {
  return isArabic ? (ARABIC_COUNTRY_NAMES[id] ?? englishName) : englishName;
}

export function uiText(isArabic: boolean, english: string, arabic: string) {
  return isArabic ? arabic : english;
}
