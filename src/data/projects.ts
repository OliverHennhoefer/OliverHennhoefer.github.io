export type Project = {
  name: string;
  description: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "off-key",
    description: "A platform for online anomaly detection, connecting sensor data, conformal inference, and monitoring interfaces. Developed within BiFlex-Industrie for charging infrastructure, with broader applications in mind.",
    links: [
      { label: "Code", href: "https://github.com/DataDrivenSustainabilitySolutions/off-key" },
      { label: "Documentation", href: "https://datadrivensustainabilitysolutions.github.io/off-key/" },
      { label: "BiFlex-Industrie", href: "https://www.biflexindustrie.de/" },
    ],
  },
  {
    name: "nonconform",
    description: "Conformal anomaly detection in Python: score calibration, false discovery rate control, and sequential change monitoring. Integrates with scikit-learn, PyOD, and custom detectors.",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/nonconform" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/nonconform/" },
      { label: "PyPI", href: "https://pypi.org/project/nonconform/" },
      { label: "Paper", href: "https://proceedings.mlr.press/v329/hennhofer26a.html" },
    ],
  },
  {
    name: "online-fdr",
    description: "Sequential hypothesis testing with p-values and e-values. Python implementations of online false discovery rate control.",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/online-fdr" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/online-fdr/" },
      { label: "PyPI", href: "https://pypi.org/project/online-fdr/" },
    ],
  },
  {
    name: "aberrant",
    description: "Online anomaly detection for streaming data. Python methods and tooling for identifying unusual observations as a stream unfolds.",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/aberrant" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/aberrant/" },
      { label: "PyPI", href: "https://pypi.org/project/aberrant/" },
    ],
  },
  {
    name: "talk-tag",
    description: "LLM-based annotation of morphosyntactic errors in speech transcripts, developed for language research with limited training data.",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/talk-tag" },
      { label: "PyPI", href: "https://pypi.org/project/talk-tag/" },
      { label: "Paper", href: "https://aclanthology.org/2026.law-main.20/" },
    ],
  },
];
