export type Goal = {
  title: string;
  /** One short line of context, optional. */
  detail?: string;
  /** Year the goal is aimed at or was reached, if known. */
  year?: number;
  done: boolean;
};

// Two or three public goals. The home page hides the section while this list is empty.
export const goals: Goal[] = [
  { title: "CompTIA Security+ certification", detail: "Version 8: threats, attacks, vulnerabilities, and the CIA triad", done: false },
];
