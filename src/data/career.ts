// Dates are decimal years (month / 12). `end` omitted means ongoing.
export type OrgKey = "hka" | "init" | "disy" | "ionos" | "modus";
export type Lane = "Education" | "Industry" | "Research & teaching";

export const organisations: Record<OrgKey, string> = {
  hka: "Karlsruhe University of Applied Sciences",
  init: "INIT Group",
  disy: "Disy Informationssysteme",
  ionos: "1&1 IONOS",
  modus: "Modus Consult Gericke",
};

export type Role = {
  title: string;
  lane: Lane;
  start: number;
  end?: number;
  period: string;
  detail?: string;
  /** Small chips under the role, e.g. courses taught. */
  items?: string[];
  /** Leave out of the timeline when another bar already covers the period. */
  hideBar?: boolean;
};

export type Station = { org: OrgKey; period: string; roles: Role[] };

// Newest first.
export const stations: Station[] = [
  {
    org: "hka",
    period: "2023 – now",
    roles: [
      { title: "PhD Candidate", lane: "Education", start: 2023 + 8 / 12, period: "ongoing", hideBar: true,
        detail: "Working title: Operationalizing Conformal Anomaly Detection: Scoring, Calibration, Error Control, and Deployment Beyond Idealized Conditions." },
      { title: "Lecturer", lane: "Research & teaching", start: 2023 + 8 / 12, period: "2023 – now", hideBar: true,
        detail: "Courses in master’s and bachelor’s programmes.",
        items: ["Unsupervised Learning · M.Sc.", "Data Science · M.Sc.", "Software Engineering · B.Sc.", "Environmental Monitoring · B.Sc."] },
      { title: "Research Associate, Intelligent Systems Research Group", lane: "Research & teaching", start: 2023 + 8 / 12, period: "2023 – now",
        detail: "Conformal inference, anomaly detection and sequential testing. Lead developer of off-key within BiFlex-Industrie." },
    ],
  },
  {
    org: "init",
    period: "2021 – 2023",
    roles: [
      { title: "Software Engineer, Machine Learning", lane: "Industry", start: 2022 + 4 / 12, end: 2023 + 8 / 12, period: "2022 – 23",
        detail: "Sole responsibility for the pipeline predicting passenger numbers in a cloud-based, real-time public transport application." },
      { title: "Business Analyst, Project Coordination", lane: "Industry", start: 2021, end: 2022 + 4 / 12, period: "2021 – 22" },
    ],
  },
  {
    org: "disy",
    period: "2020",
    roles: [
      { title: "Master’s Thesis Research", lane: "Industry", start: 2020 + 2 / 12, end: 2020 + 8 / 12, period: "2020",
        detail: "Geostatistics and spatial econometrics for anomaly detection in environmental data, deployed through an API." },
    ],
  },
  {
    org: "ionos",
    period: "2018 – 2020",
    roles: [
      { title: "Working Student, Data Analysis", lane: "Industry", start: 2019 + 5 / 12, end: 2020 + 1 / 12, period: "2019 – 20" },
      { title: "Working Student, Quality Assurance", lane: "Industry", start: 2018 + 2 / 12, end: 2019 + 5 / 12, period: "2018 – 19" },
    ],
  },
  {
    org: "hka",
    period: "2018 – 2021",
    roles: [
      { title: "Student Research Assistant, Statistics with R", lane: "Research & teaching", start: 2018 + 9 / 12, end: 2021, period: "2018 – 21" },
      { title: "M.Sc. Geomatics", lane: "Education", start: 2018, end: 2020 + 8 / 12, period: "2018 – 20",
        detail: "Thesis: Anomaly Detection in Precision Farming with R." },
    ],
  },
  {
    org: "modus",
    period: "2015 – 2016",
    roles: [{ title: "Intern, Traffic Statistics", lane: "Industry", start: 2015 + 9 / 12, end: 2016 + 2 / 12, period: "2015 – 16" }],
  },
  {
    org: "hka",
    period: "2013 – 2017",
    roles: [
      { title: "B.Sc. Geoinformation Management", lane: "Education", start: 2013, end: 2017, period: "2013 – 17",
        detail: "Thesis: Statistik und Geoanalyse mit R im hochschulischen Kontext." },
    ],
  },
];
