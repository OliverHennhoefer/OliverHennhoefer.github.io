import { getCollection } from "astro:content";
import { reports } from "../data/reports";

export type WritingEntry = {
  title: string;
  description: string;
  pubDate: Date;
  href: string;
  label: string;
  format: "Article" | "PDF";
  tags: string[];
};

export async function getWriting(): Promise<WritingEntry[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return [
    ...posts.map(({ id, data }): WritingEntry => ({
      title: data.title, description: data.description, pubDate: data.pubDate,
      href: `/blog/${id}/`, label: "Research note", format: "Article", tags: data.tags,
    })),
    ...reports.filter((report) => !report.draft).map((report): WritingEntry => ({
      title: report.title, description: report.description, pubDate: report.pubDate,
      href: `/reports/${report.id}/`, label: report.kind, format: "PDF", tags: [report.kind],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf() || a.href.localeCompare(b.href));
}
