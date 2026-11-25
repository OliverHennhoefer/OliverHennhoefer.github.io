// Countries for the Travel row of the home page timeline. Each is drawn as its round flag
// (public/flags, from circle-flags, MIT) at the date of the visit; a country without a year
// is not plotted. Add one entry per visit: the same country may appear more than once.
export type Trip = { country: string; flag: string; year?: number; month?: number };

export const trips: Trip[] = [
  { country: "Austria", flag: "at" },
  { country: "China", flag: "cn" },
  { country: "Croatia", flag: "hr" },
  { country: "Cuba", flag: "cu" },
  { country: "Czechia", flag: "cz" },
  { country: "England", flag: "gb-eng" },
  { country: "France", flag: "fr" },
  { country: "Germany", flag: "de" },
  { country: "Greece", flag: "gr" },
  { country: "Italy", flag: "it" },
  { country: "Japan", flag: "jp" },
  { country: "Morocco", flag: "ma" },
  { country: "New Zealand", flag: "nz" },
  { country: "Norway", flag: "no" },
  { country: "Scotland", flag: "gb-sct" },
  { country: "Sri Lanka", flag: "lk" },
  { country: "Sweden", flag: "se" },
  { country: "Switzerland", flag: "ch" },
  { country: "United Arab Emirates", flag: "ae" },
];
