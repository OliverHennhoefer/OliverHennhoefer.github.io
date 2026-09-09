import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getWriting } from "../utils/writing";
import { site } from "../site";

export async function GET(context: APIContext) {
  const entries = await getWriting();

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: entries.map((entry) => ({
      title: entry.title,
      description: entry.description,
      pubDate: entry.pubDate,
      link: entry.href,
      categories: entry.tags,
    })),
  });
}
