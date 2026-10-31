import type { APIRoute } from "astro";
import { projects } from "../data/projects";
import { publications } from "../data/publications";
import { site } from "../site";

// A plain-text profile for AI assistants and answer engines (https://llmstxt.org).
// Generated from the same data as the pages, so it never drifts from the site.
export const GET: APIRoute = () => {
  const lines = [
    `# ${site.author}`,
    "",
    `> ${site.author} (also written ${site.alternateNames[0]}) is a PhD candidate, research associate and lecturer at ${site.affiliation} (${site.affiliationShort}) in ${site.location}. Research focus: unsupervised learning and uncertainty quantification, in particular conformal anomaly detection with statistical error control.`,
    "",
    `- PhD working title: "${site.thesis}"`,
    `- Research group: ${site.researchGroup}, ${site.affiliation}`,
    `- Teaching: Unsupervised Learning and Data Science (M.Sc.); Software Engineering and Environmental Monitoring (B.Sc.)`,
    `- Research topics: ${site.knowsAbout.join(", ")}`,
    `- Previously: machine learning software engineer at INIT Group (passenger demand prediction for public transport)`,
    `- Education: M.Sc. Geomatics and B.Sc. Geoinformation Management, ${site.affiliation}`,
    `- Contact: ${site.email}`,
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/): overview of research, software, publications and skills`,
    `- [CV](${site.url}/cv/): experience, teaching, education, talks, software and publications`,
    "",
    "## Profiles",
    "",
    `- [Google Scholar](${site.socials.scholar})`,
    `- [GitHub](${site.socials.github})`,
    `- [LinkedIn](${site.socials.linkedin})`,
    `- [X](${site.socials.x})`,
    ...site.identities.map((href) => `- [${new URL(href).hostname}](${href})`),
    "",
    "## Research software",
    "",
    ...projects.map((project) => `- [${project.name}](${project.links[0].href}): ${project.description} Role: ${project.role}.`),
    "",
    "## Publications",
    "",
    ...publications.map((publication) =>
      `- [${publication.title}](${publication.url}): ${publication.authors}. ${publication.venue}, ${publication.year}.`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
