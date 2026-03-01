export const withoutDiacritics = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
