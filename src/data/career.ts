// Dates are decimal years (month / 12). `end` omitted means ongoing.
export type CareerLane = "Education" | "Industry" | "Research";
export type CareerEntry = {
  lane: CareerLane;
  role: string;
  organisation: string;
  start: number;
  end?: number;
  label: string;
  /** Shown in the short list on the home page. */
  highlight?: boolean;
};

export const career: CareerEntry[] = [
  { lane: "Research", role: "Research Associate & Lecturer", organisation: "Karlsruhe University of Applied Sciences", start: 2023 + 8 / 12, label: "2023 – now", highlight: true },
  { lane: "Industry", role: "Software Engineer, Machine Learning", organisation: "INIT Group", start: 2022 + 4 / 12, end: 2023 + 8 / 12, label: "2022 – 23", highlight: true },
  { lane: "Industry", role: "Business Analyst, Project Coordination", organisation: "INIT Group", start: 2021, end: 2022 + 4 / 12, label: "2021 – 22", highlight: true },
  { lane: "Research", role: "Student Research Assistant, Statistics with R", organisation: "Karlsruhe University of Applied Sciences", start: 2018 + 9 / 12, end: 2021, label: "2018 – 21" },
  { lane: "Industry", role: "Master’s Thesis Research", organisation: "Disy Informationssysteme", start: 2020 + 2 / 12, end: 2020 + 8 / 12, label: "2020" },
  { lane: "Industry", role: "Working Student, Data Analysis & QA", organisation: "1&1 IONOS", start: 2018 + 2 / 12, end: 2020 + 1 / 12, label: "2018 – 20" },
  { lane: "Education", role: "M.Sc. Geomatics", organisation: "Karlsruhe University of Applied Sciences", start: 2018, end: 2020 + 8 / 12, label: "2018 – 20", highlight: true },
  { lane: "Industry", role: "Intern, Traffic Statistics", organisation: "Modus Consult Gericke", start: 2015 + 9 / 12, end: 2016 + 2 / 12, label: "2015 – 16" },
  { lane: "Education", role: "B.Sc. Geoinformation Management", organisation: "Karlsruhe University of Applied Sciences", start: 2013, end: 2017, label: "2013 – 17" },
];
