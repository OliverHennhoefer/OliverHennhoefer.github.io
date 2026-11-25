import { laneKey, organisations, roleId, stations } from "./career";
import { projects } from "./projects";
import { publications } from "./publications";
import releaseData from "./releases.json";
import { site } from "../site";

// Everything the home page timeline plots, in decimal years (month / 12), derived from the
// CV, publication and PyPI data so the chart never drifts from the rest of the site.

const decimal = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return year + (month - 1) / 12 + (day - 1) / 365;
};

export const timelineRoles = stations.flatMap((station) => station.roles.map((role) => ({
  ...role,
  orgName: organisations[station.org],
  id: roleId(station.org, role),
  laneClass: `lane-${laneKey[role.lane]}`,
})));

const surname = "Hennhöfer";
const firstAuthor = (authors: string) => authors.split(",")[0].trim().split(" ").slice(1).join(" ") === surname;
// Publications only carry a year, so papers of the same year are spread evenly across it.
export const timelinePublications = publications.map((publication) => {
  const sameYear = publications.filter((other) => other.year === publication.year);
  const index = sameYear.indexOf(publication);
  return { ...publication, at: publication.year + (index + 1) / (sameYear.length + 1), first: firstAuthor(publication.authors) };
});

export const timelinePackages = Object.entries(releaseData as Record<string, string[][]>).map(([name, list]) => {
  const releases = list.map(([date, version]) => ({ date, version, at: decimal(date) }));
  // One span per major version, from its first release to the first release of the next one.
  const majors: { major: number; start: number; date: string; count: number; end?: number }[] = [];
  for (const release of releases) {
    const major = Number(release.version.split(".")[0]);
    const known = majors.find((entry) => entry.major === major);
    if (known) known.count++;
    else majors.push({ major, start: release.at, date: release.date, count: 1 });
  }
  majors.sort((a, b) => a.start - b.start).forEach((entry, i) => { entry.end = majors[i + 1]?.start; });
  const project = projects.find((candidate) => candidate.name === name);
  return { name, role: project?.role ?? "", releases, majors };
});

export const timelineStart = Math.min(...timelineRoles.map((role) => role.start));
export const birth = site.birth ? site.birth.year + (site.birth.month - 1) / 12 : null;
