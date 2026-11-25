import { laneKey, organisations, roleId, stations, type Lane } from "./career";
import { projects } from "./projects";
import { publications } from "./publications";
import releaseData from "./releases.json";
import { site } from "../site";
import { trips } from "./trips";

// Everything the home page timeline plots, in decimal years (month / 12), derived from the
// CV, publication and PyPI data so the chart never drifts from the rest of the site.

const decimal = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return year + (month - 1) / 12 + (day - 1) / 365;
};

const cvRoles = stations.flatMap((station) => station.roles.map((role) => ({
  ...role,
  orgName: organisations[station.org],
  id: roleId(station.org, role) as string | null,
  laneClass: `lane-${laneKey[role.lane]}`,
})));

// School before the CV starts, only on the timeline. Inferred from the usual German path:
// enrolment the September after turning six, four years of primary school, then eight years
// of Gymnasium (G8) to the Abitur in summer 2013.
const school = [
  { title: "Gymnasium (G8), Abitur", orgName: "Gymnasium", start: 2005 + 8 / 12, end: 2013 + 6 / 12, period: "2005 – 13" },
  { title: "Primary school", orgName: "Grundschule", start: 2001 + 8 / 12, end: 2005 + 6 / 12, period: "2001 – 05" },
].map((entry) => ({ ...entry, lane: "Education" as Lane, points: undefined as string[] | undefined, hideBar: false, id: null, laneClass: `lane-${laneKey.Education}` }));

export const timelineRoles = [...cvRoles, ...school];

// Music, sport and AI assistants outside the CV, mostly given as ages. An entry without an end is ongoing.
// An entry's own `lane` overrides the row colour (the AI row colours each assistant).
const at = (years: number) => (site.birth ? site.birth.year + (site.birth.month - 1) / 12 : 1995) + years;
type Hobby = { title: string; start: number; end?: number; period: string; lane?: string };
/** `short` replaces the row label on phones when the full one does not fit; `last` puts the row below Software. */
export const timelineHobbies: { row: string; short?: string; lane: string; last?: boolean; entries: Hobby[] }[] = [
  { row: "Music", lane: "mus", entries: [
    { title: "Choir", start: at(5), end: at(16), period: "2000 – 11" },
    { title: "Drums", start: at(16), end: 2022 + 6 / 12, period: "2011 – 22" },
  ] },
  // Athletics from school start (assumed) to 9, table tennis from 9 to 14, strength training since 2015.
  { row: "Sport", lane: "spo", entries: [
    { title: "Athletics", start: 2001 + 8 / 12, end: at(9), period: "2001 – 04" },
    { title: "Table tennis", start: at(9), end: at(14), period: "2004 – 09" },
    { title: "Strength training", start: 2015, period: "2015 – now" },
  ] },
  // Main AI assistant, with a wink. ChatGPT launched 30 Nov 2022; since Nov 2026 both are in use (striped).
  { row: "Meat-proxy for", short: "Meat-proxy", lane: "ai", last: true, entries: [
    { title: "ChatGPT", lane: "gpt", start: 2022 + 11 / 12, end: 2025 + 5 / 12, period: "Nov 2022 – May 2025" },
    { title: "Claude", lane: "cla", start: 2025 + 5 / 12, end: 2026 + 3 / 12, period: "Jun 2025 – Mar 2026" },
    { title: "ChatGPT", lane: "gpt", start: 2026 + 3 / 12, end: 2026 + 10 / 12, period: "Apr – Oct 2026" },
    { title: "ChatGPT + Claude", lane: "mix", start: 2026 + 10 / 12, period: "Nov 2026 – now" },
  ] },
];

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

/** Start of the CV, which the default "Since …" range opens with. */
export const timelineStart = Math.min(...cvRoles.map((role) => role.start));
export const birth = site.birth ? site.birth.year + (site.birth.month - 1) / 12 : null;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Trips with a month sit in the middle of it; trips with only a year are spread across that year.
export const timelineTrips = trips.filter((trip) => trip.year).map((trip, _, dated) => {
  const label = `${trip.month ? `${monthNames[trip.month - 1]} ` : ""}${trip.year}`;
  if (trip.month) return { ...trip, label, at: trip.year! + (trip.month - 0.5) / 12 };
  const sameYear = dated.filter((other) => other.year === trip.year && !other.month);
  return { ...trip, label, at: trip.year! + (sameYear.indexOf(trip) + 1) / (sameYear.length + 1) };
});
