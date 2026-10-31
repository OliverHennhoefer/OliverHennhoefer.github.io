import type { IconName } from "./icons";

export type Pill = { name: string; icon?: IconName };
export type Skill = { area: string; methods: string[]; tools: Pill[] };

export const skills: Skill[] = [
  {
    area: "Statistics & uncertainty",
    methods: ["Uncertainty Quantification", "Conformal Prediction", "Conformal Martingales", "Multiple Testing", "Distribution-Free Inference"],
    tools: [],
  },
  {
    area: "Machine learning",
    methods: ["Unsupervised Learning", "Anomaly Detection", "Change-Point Detection", "Continual Learning", "Time Series Analysis"],
    tools: [],
  },
  {
    area: "Deep learning & LLMs",
    methods: ["LoRA", "MCP Servers"],
    tools: [{ name: "PyTorch", icon: "pytorch" }, { name: "Hugging Face", icon: "huggingface" }],
  },
  {
    area: "Geospatial analysis",
    methods: ["GIS", "Geostatistics", "Spatial Econometrics"],
    tools: [{ name: "ArcGIS", icon: "arcgis" }],
  },
  {
    area: "Programming",
    methods: [],
    tools: [{ name: "Python", icon: "python" }, { name: "R", icon: "r" }, { name: "TypeScript", icon: "typescript" }, { name: "SQL", icon: "database" }, { name: "Swift", icon: "swift" }, { name: "Java", icon: "java" }, { name: "Claude Code", icon: "claude" }, { name: "Codex", icon: "openai" }],
  },
  {
    area: "Web & data",
    methods: [],
    tools: [{ name: "FastAPI", icon: "fastapi" }, { name: "React", icon: "react" }, { name: "SvelteKit", icon: "svelte" }, { name: "Astro", icon: "astro" }, { name: "PostgreSQL", icon: "postgresql" }, { name: "TimescaleDB", icon: "timescale" }, { name: "SQLite", icon: "sqlite" }, { name: "MQTT", icon: "mqtt" }],
  },
  {
    area: "Cloud & infrastructure",
    methods: ["Infrastructure as Code"],
    tools: [{ name: "Cloudflare", icon: "cloudflare" }, { name: "Docker", icon: "docker" }, { name: "Ansible", icon: "ansible" }, { name: "Traefik", icon: "traefik" }, { name: "Tailscale", icon: "tailscale" }, { name: "Linux", icon: "linux" }],
  },
  {
    area: "DevOps",
    methods: ["CI/CD", "Package Development"],
    tools: [{ name: "Git", icon: "git" }, { name: "GitHub Actions", icon: "githubactions" }, { name: "pytest", icon: "pytest" }, { name: "Vitest", icon: "vitest" }, { name: "Playwright" }, { name: "uv", icon: "uv" }, { name: "PyPI", icon: "pypi" }],
  },
  {
    area: "Languages",
    methods: ["German · native", "English · C2", "Chinese · basic"],
    tools: [],
  },
];
