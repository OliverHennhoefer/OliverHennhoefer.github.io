import type { IconName } from "./icons";

export type Skill = { area: string; summary: string; tools: { name: string; icon?: IconName }[] };

export const skills: Skill[] = [
  {
    area: "Uncertainty quantification & inference",
    summary: "Conformal inference (split, cross, bootstrap and weighted), conformal martingales, online false discovery rate control (LORD, SAFFRON, ADDIS), e-values and e-BH, resampling, and kernel density estimation.",
    tools: [],
  },
  {
    area: "Unsupervised learning",
    summary: "Anomaly and change-point detection on static and streaming data: isolation forests, sketches, matrix profiles, and drift detection, with clustering and prequential evaluation.",
    tools: [{ name: "scikit-learn", icon: "scikitlearn" }, { name: "PyOD" }, { name: "River" }],
  },
  {
    area: "Deep learning & NLP",
    summary: "Neural models and language models, including parameter-efficient fine-tuning of quantised LLMs and autoencoders for anomaly detection.",
    tools: [{ name: "PyTorch", icon: "pytorch" }, { name: "Hugging Face", icon: "huggingface" }],
  },
  {
    area: "Geospatial analysis",
    summary: "GIS, geostatistics, spatial econometrics, and hotspot and spatial outlier detection.",
    tools: [{ name: "ArcGIS", icon: "arcgis" }, { name: "ArcPy" }],
  },
  {
    area: "Programming",
    summary: "Object-oriented design and typed, tested Python and R packages.",
    tools: [{ name: "Python", icon: "python" }, { name: "R", icon: "r" }, { name: "SQL" }, { name: "Java", icon: "java" }, { name: "TypeScript", icon: "typescript" }],
  },
  {
    area: "Applications & data systems",
    summary: "REST services, interactive interfaces, time-series storage, and sensor streams.",
    tools: [{ name: "FastAPI", icon: "fastapi" }, { name: "React", icon: "react" }, { name: "Shiny" }, { name: "PostgreSQL", icon: "postgresql" }, { name: "TimescaleDB", icon: "timescale" }, { name: "MQTT", icon: "mqtt" }],
  },
  {
    area: "Delivery",
    summary: "Reproducible experiments, automated testing, documentation, and containerised deployment.",
    tools: [{ name: "Git", icon: "git" }, { name: "GitHub Actions", icon: "githubactions" }, { name: "pytest", icon: "pytest" }, { name: "Docker", icon: "docker" }],
  },
  {
    area: "Languages",
    summary: "German, English, and basic Chinese.",
    tools: [],
  },
];
