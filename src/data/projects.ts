export type Project = {
  name: string;
  description: string;
  selected: boolean;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "nonconform",
    description: "Conformal anomaly and change-point detection in Python. Moving beyond heuristic thresholds to make uncertainty explicit.",
    selected: true,
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/nonconform" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/nonconform/" },
      { label: "PyPI", href: "https://pypi.org/project/nonconform/" },
      { label: "Paper", href: "https://arxiv.org/abs/2605.13642" },
    ],
  },
  {
    name: "online-fdr",
    description: "False discovery rate control for sequential hypothesis testing. Python tools for testing hypotheses as they arrive.",
    selected: true,
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/online-fdr" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/online-fdr/" },
      { label: "PyPI", href: "https://pypi.org/project/online-fdr/" },
    ],
  },
  {
    name: "aberrant",
    description: "Online anomaly detection for streaming data. Python methods and tooling for identifying unusual observations as a stream unfolds.",
    selected: true,
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/aberrant" },
      { label: "Documentation", href: "https://oliverhennhoefer.github.io/aberrant/" },
      { label: "PyPI", href: "https://pypi.org/project/aberrant/" },
    ],
  },
  {
    name: "talk-tag",
    description: "Resources and tooling for fine-grained morphosyntactic error annotation in transcribed speech.",
    selected: false,
    links: [
      { label: "Code", href: "https://github.com/OliverHennhoefer/talk-tag" },
      { label: "PyPI", href: "https://pypi.org/project/talk-tag/" },
      { label: "Paper", href: "https://aclanthology.org/2026.law-main.20/" },
    ],
  },
];
