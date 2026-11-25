// Visits for the Perspectives row of the home page timeline, one entry per visit. Each is drawn as
// its round flag (public/flags, from circle-flags, MIT). Without a month, visits of the same
// year are spread evenly across it; an entry without a year is not plotted.
export type Trip = { country: string; flag: string; year?: number; month?: number };

export const trips: Trip[] = [
  { country: "Austria", flag: "at", year: 2003 },
  { country: "France", flag: "fr", year: 2003 },
  { country: "Spain", flag: "es", year: 2007 },
  { country: "Greece (Corfu)", flag: "gr", year: 2008 },
  { country: "Spain", flag: "es", year: 2009 },
  { country: "Spain", flag: "es", year: 2010 },
  { country: "Spain (Mallorca)", flag: "es", year: 2012 },
  { country: "Sri Lanka", flag: "lk", year: 2011 },
  { country: "England", flag: "gb-eng", year: 2013 },
  { country: "Cuba", flag: "cu", year: 2016 },
  { country: "New Zealand", flag: "nz", year: 2017 },
  { country: "Morocco", flag: "ma", year: 2018 },
  { country: "Scotland", flag: "gb-sct", year: 2019 },
  { country: "France", flag: "fr", year: 2022 },
  { country: "United Arab Emirates", flag: "ae", year: 2022 },
  { country: "Croatia", flag: "hr", year: 2023 },
  { country: "China", flag: "cn", year: 2024 },
  { country: "Italy", flag: "it", year: 2024 },
  { country: "Switzerland", flag: "ch", year: 2024 },
  { country: "Austria", flag: "at", year: 2024 },
  { country: "Japan", flag: "jp", year: 2025 },
  { country: "Italy", flag: "it", year: 2025 },
  { country: "Switzerland", flag: "ch", year: 2025 },
  { country: "Austria", flag: "at", year: 2025 },
  { country: "France", flag: "fr", year: 2026 },
  { country: "Denmark", flag: "dk", year: 2026 },
  { country: "Sweden", flag: "se", year: 2026 },
  { country: "Norway", flag: "no", year: 2026 },
  { country: "Czechia", flag: "cz", year: 2026 },
];
