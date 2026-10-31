import { projects } from "./data/projects";
import { publications } from "./data/publications";
import { site } from "./site";

/** Stable identifiers so every page describes the same person, site and institution. */
export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  university: `${site.url}/#hka`,
  thesis: `${site.url}/#phd-thesis`,
};

const homeUrl = `${site.url}/`;

/** Social profiles plus any identity-only links (e.g. ORCID). */
export const profileLinks = [...Object.values(site.socials), ...site.identities];

export const university = {
  "@type": "CollegeOrUniversity",
  "@id": ids.university,
  name: site.affiliation,
  alternateName: [site.affiliationShort, "Hochschule Karlsruhe", "Hochschule Karlsruhe – University of Applied Sciences"],
  url: site.affiliationUrl,
  address: { "@type": "PostalAddress", addressLocality: "Karlsruhe", addressCountry: "DE" },
};

export const person = {
  "@type": "Person",
  "@id": ids.person,
  name: site.author,
  alternateName: site.alternateNames,
  givenName: site.givenName,
  familyName: site.familyName,
  url: homeUrl,
  email: `mailto:${site.email}`,
  description: site.description,
  image: {
    "@type": "ImageObject",
    url: new URL(site.portrait.path, site.url).toString(),
    width: site.portrait.width,
    height: site.portrait.height,
    caption: site.author,
  },
  jobTitle: site.jobTitles,
  worksFor: { "@id": ids.university },
  affiliation: [{ "@id": ids.university }, { "@type": "ResearchOrganization", name: `${site.researchGroup}, ${site.affiliation}` }],
  alumniOf: { "@id": ids.university },
  workLocation: { "@type": "Place", name: site.location },
  knowsAbout: site.knowsAbout,
  knowsLanguage: ["de", "en"],
  sameAs: profileLinks,
};

export const website = {
  "@type": "WebSite",
  "@id": ids.website,
  url: homeUrl,
  name: site.title,
  alternateName: site.alternateNames[0],
  description: site.description,
  inLanguage: "en",
  author: { "@id": ids.person },
  publisher: { "@id": ids.person },
};

const thesis = {
  "@type": "Thesis",
  "@id": ids.thesis,
  name: site.thesis,
  inSupportOf: "PhD",
  creativeWorkStatus: "In progress",
  author: { "@id": ids.person },
  sourceOrganization: { "@id": ids.university },
  about: ["Conformal inference", "Anomaly detection", "Uncertainty quantification"],
};

const isMe = (name: string) => name.trim().split(" ").slice(1).join(" ") === site.familyName;

const scholarlyArticles = publications.map((publication) => ({
  "@type": "ScholarlyArticle",
  "@id": publication.url,
  name: publication.title,
  headline: publication.title,
  url: publication.url,
  datePublished: String(publication.year),
  isPartOf: { "@type": "CreativeWork", name: publication.venue },
  author: publication.authors.split(",").map((name) =>
    isMe(name) ? { "@id": ids.person } : { "@type": "Person", name: name.trim() }),
}));

const software = projects.map((project) => {
  const code = project.links.find(({ label }) => label === "Code")?.href;
  const docs = project.links.find(({ label }) => label === "Documentation")?.href;
  return {
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: docs ?? code,
    codeRepository: code,
    programmingLanguage: project.name === "off-key" ? ["Python", "TypeScript"] : "Python",
    author: { "@id": ids.person },
    sameAs: project.links.filter(({ label }) => label === "PyPI").map(({ href }) => href),
  };
});

/** Research output shown on the profile pages (home and CV). */
export const researchGraph = [thesis, ...scholarlyArticles, ...software];
