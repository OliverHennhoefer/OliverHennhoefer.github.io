import { z } from "astro/zod";
import entries from "./reports.json";

const reportSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  pubDate: z.coerce.date(),
  kind: z.enum(["Technical report", "White paper", "Experiment", "Negative result"]),
  pdf: z.string().regex(/^\/reports\/[a-z0-9][a-z0-9-]*\.pdf$/, "Use /reports/your-report.pdf"),
  pages: z.number().int().positive().optional(),
  code: z.url().optional(),
  draft: z.boolean().default(false),
});

export const reports = z.array(reportSchema).refine(
  (items) => new Set(items.map((item) => item.id)).size === items.length,
  "Report IDs must be unique",
).parse(entries);
