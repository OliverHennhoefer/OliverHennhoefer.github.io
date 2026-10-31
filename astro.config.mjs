import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://oliverhennhoefer.github.io",
  integrations: [mdx(), sitemap({
    // noindex pages (404, Impressum) and empty index routes stay out of the sitemap.
    filter: (page) => !["/404", "/impressum"].some((path) => new URL(page).pathname.startsWith(path)) && new URL(page).pathname !== "/reports/",
    serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
  })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: "github-light",
    },
  },
});
