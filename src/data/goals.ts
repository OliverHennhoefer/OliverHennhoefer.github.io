export type Goal = {
  title: string;
  /** One short line of context, optional. */
  detail?: string;
  /** Year the goal is aimed at or was reached. */
  year: number;
  done: boolean;
};

// Two or three public goals. The home page hides the section while this list is empty.
export const goals: Goal[] = [];
