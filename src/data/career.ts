// Dates are decimal years (month / 12). `end` omitted means ongoing.
export type OrgKey = "hka" | "init" | "disy" | "ionos" | "modus";
export type Lane = "Education" | "Industry" | "Research" | "Teaching";
/** CSS class suffix for each lane's colour. */
export const laneKey: Record<Lane, "edu" | "ind" | "res" | "tea"> = { Education: "edu", Industry: "ind", Research: "res", Teaching: "tea" };

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
  /** CV bullet points. */
  points?: string[];
  /** Leave out of the timeline when another bar already covers the period. */
  hideBar?: boolean;
};

export type Station = { org: OrgKey; period: string; roles: Role[] };

/** Anchor id of a role in the stations list, so timeline bars can link to it. */
export const roleId = (org: OrgKey, role: Pick<Role, "title">) =>
  `role-${org}-${role.title.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Newest first.
export const stations: Station[] = [
  {
    org: "hka",
    period: "2023 – now",
    roles: [
      { title: "PhD Candidate", lane: "Education", start: 2023 + 8 / 12, period: "ongoing", hideBar: true,
        points: ["Working title: Operationalizing Conformal Anomaly Detection: Scoring, Calibration, Error Control, and Deployment Beyond Idealized Conditions."] },
      { title: "Lecturer", lane: "Teaching", start: 2023 + 8 / 12, end: 2026 + 7 / 12, period: "2023 – 26",
        points: ["Unsupervised Learning (M.Sc.)", "Data Science (M.Sc.)", "Software Engineering (B.Sc.)", "Environmental Monitoring (B.Sc.)"] },
      { title: "Research Associate, Intelligent Systems Research Group", lane: "Research", start: 2023 + 8 / 12, period: "2023 – now",
        points: [
          "Research on uncertainty quantification for anomaly detection in data streams, with a focus on conformal inference and statistical error control.",
          "Lead developer of off-key within BiFlex-Industrie: set technical direction and priorities, write most of the code, and supervise student contributors.",
          "Author of the open-source Python packages nonconform, online-fdr and aberrant.",
        ] },
    ],
  },
  {
    org: "init",
    period: "2021 – 2023",
    roles: [
      { title: "Software Engineer, Machine Learning", lane: "Industry", start: 2022 + 4 / 12, end: 2023 + 8 / 12, period: "2022 – 23",
        points: [
          "Built a cloud-based, real-time application for public transport.",
          "Sole responsibility for the machine-learning pipeline predicting passenger numbers.",
        ] },
      { title: "Business Analyst, Project Coordination", lane: "Industry", start: 2021, end: 2022 + 4 / 12, period: "2021 – 22" },
    ],
  },
  {
    org: "disy",
    period: "2020",
    roles: [
      { title: "Master’s Thesis Research", lane: "Research", start: 2020 + 2 / 12, end: 2020 + 8 / 12, period: "2020",
        points: [
          "Applied geostatistics and spatial econometrics to anomaly detection in environmental data.",
          "Deployed the methods through an API and improved the project’s data preprocessing.",
        ] },
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
      { title: "Student Research Assistant, Statistics with R", lane: "Teaching", start: 2018 + 9 / 12, end: 2021, period: "2018 – 21" },
      { title: "M.Sc. Geomatics", lane: "Education", start: 2018, end: 2020 + 8 / 12, period: "2018 – 20",
        points: [
          "Thesis: Anomaly Detection in Precision Farming with R.",
          "Coursework in programming, software engineering, spatial databases, geostatistics, web services and open-source GIS.",
        ] },
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
        points: ["Thesis: Statistik und Geoanalyse mit R im hochschulischen Kontext."] },
    ],
  },
];
