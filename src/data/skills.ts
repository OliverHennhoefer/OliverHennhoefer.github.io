import type { IconName } from "./icons";

export type Pill = { name: string; icon?: IconName };
export type Skill = { area: string; methods: string[]; tools: Pill[] };

export const skills: Skill[] = [
  {
    area: "Uncertainty quantification",
    methods: ["Conformal Prediction", "Conformal Martingales", "Online FDR Control", "E-values", "Bootstrap", "Density Estimation"],
    tools: [],
  },
  {
    area: "Unsupervised learning",
    methods: ["Anomaly Detection", "Change-Point Detection", "Concept Drift", "Stream Learning", "Clustering"],
    tools: [{ name: "scikit-learn", icon: "scikitlearn" }, { name: "PyOD" }, { name: "River" }],
  },
  {
    area: "Deep learning & NLP",
    methods: ["LLM Fine-Tuning", "LoRA", "Autoencoders"],
    tools: [{ name: "PyTorch", icon: "pytorch" }, { name: "Hugging Face", icon: "huggingface" }],
  },
  {
    area: "Geospatial analysis",
    methods: ["GIS", "Geostatistics", "Spatial Econometrics", "Hotspot Analysis"],
    tools: [{ name: "ArcGIS", icon: "arcgis" }],
  },
  {
    area: "Programming",
    methods: [],
    tools: [{ name: "Python", icon: "python" }, { name: "R", icon: "r" }, { name: "SQL", icon: "database" }, { name: "Java", icon: "java" }, { name: "TypeScript", icon: "typescript" }],
  },
  {
    area: "Applications & data",
    methods: ["REST APIs"],
    tools: [{ name: "FastAPI", icon: "fastapi" }, { name: "React", icon: "react" }, { name: "PostgreSQL", icon: "postgresql" }, { name: "TimescaleDB", icon: "timescale" }, { name: "MQTT", icon: "mqtt" }],
  },
  {
    area: "Delivery",
    methods: ["CI/CD", "Package Development"],
    tools: [{ name: "Git", icon: "git" }, { name: "GitHub Actions", icon: "githubactions" }, { name: "pytest", icon: "pytest" }, { name: "Docker", icon: "docker" }],
  },
  {
    area: "Languages",
    methods: ["German · native", "English · C2", "Chinese · basic"],
    tools: [],
  },
];
