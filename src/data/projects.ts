export type Glyph = "rug" | "stream" | "steps" | "drift" | "tokens";

export type Project = {
  name: string;
  /** One line for the home page. */
  summary: string;
  description: string;
  role: string;
  glyph: Glyph;
  featured?: boolean;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "off-key",
    summary: "Anomaly detection for connected systems: MQTT telemetry in, streaming detection pipelines, and an interface to review the evidence behind each alarm. Built on FastAPI, React, TimescaleDB and EMQX with Docker. Its first application is bidirectional charging infrastructure within BiFlex-Industrie.",
    description: "A platform for online anomaly detection, connecting sensor data, conformal inference, and monitoring interfaces. Developed within BiFlex-Industrie for charging infrastructure, with broader applications in mind.",
    role: "Lead developer · Platform",
    glyph: "stream",
    featured: true,
    links: [
      { label: "Code", href: "https://github.com/DataDrivenSustainabilitySolutions/off-key" },
      { label: "Documentation", href: "https://datadrivensustainabilitysolutions.github.io/off-key/" },
      { label: "BiFlex-Industrie", href: "https://www.biflexindustrie.de/" },
    ],
  },
  {
    name: "nonconform",
    summary: "Turns anomaly scores into calibrated p-values with false discovery rate control. Split, cross and bootstrap calibration, weighted conformal for distribution shift, and conformal martingales for change detection.",
    description: "Conformal anomaly detection in Python: score calibration, false discovery rate control, and sequential change monitoring. Integrates with scikit-learn, PyOD, and custom detectors.",
    role: "Python · Conformal inference",
    glyph: "rug",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/nonconform" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/nonconform/" },
      { label: "PyPI", href: "https://pypi.org/project/nonconform/" },
      { label: "Paper", href: "https://proceedings.mlr.press/v329/hennhofer26a.html" },
    ],
  },
  {
    name: "online-fdr",
    summary: "Error control for hypotheses that arrive over time: LORD, SAFFRON, ADDIS and more, plus e-value methods such as e-LOND and e-BH. Checked against the R reference implementation.",
    description: "Sequential hypothesis testing with p-values and e-values. Python implementations of online false discovery rate control.",
    role: "Python · Sequential testing",
    glyph: "steps",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/online-fdr" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/online-fdr/" },
      { label: "PyPI", href: "https://pypi.org/project/online-fdr/" },
    ],
  },
  {
    name: "aberrant",
    summary: "Streaming anomaly detection behind one online interface: 30+ detectors from isolation forests and sketches to matrix profiles, with drift detection and prequential evaluation.",
    description: "Online anomaly detection for streaming data. Python methods and tooling for identifying unusual observations as a stream unfolds.",
    role: "Python · Streaming",
    glyph: "drift",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/aberrant" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/aberrant/" },
      { label: "PyPI", href: "https://pypi.org/project/aberrant/" },
    ],
  },
  {
    name: "talk-tag",
    summary: "A fine-tuned, 4-bit quantised language model that tags morphosyntactic errors in speech transcripts in CHAT format, trained on very little data.",
    description: "LLM-based annotation of morphosyntactic errors in speech transcripts, developed for language research with limited training data.",
    role: "Python · NLP",
    glyph: "tokens",
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/talk-tag" },
      { label: "PyPI", href: "https://pypi.org/project/talk-tag/" },
      { label: "Paper", href: "https://aclanthology.org/2026.law-main.20/" },
    ],
  },
];
