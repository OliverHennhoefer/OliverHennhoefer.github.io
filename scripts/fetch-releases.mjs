// Refreshes src/data/releases.json from PyPI: the upload date and version of every release
// of each package that has a PyPI link in src/data/projects.ts. Run with `npm run releases`.
import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const names = [...source.matchAll(/https:\/\/pypi\.org\/project\/([\w.-]+)\/?/g)].map(([, name]) => name);
const releases = {};
for (const name of names) {
  const response = await fetch(`https://pypi.org/pypi/${name}/json`);
  if (!response.ok) throw new Error(`${name}: PyPI answered ${response.status}`);
  const { releases: byVersion } = await response.json();
  releases[name] = Object.entries(byVersion)
    .filter(([, files]) => files.length > 0 && !files.every((file) => file.yanked))
    .map(([version, files]) => [files.map((file) => file.upload_time_iso_8601 ?? file.upload_time).sort()[0].slice(0, 10), version])
    .sort(([a], [b]) => a.localeCompare(b));
}
// One release per line keeps diffs readable.
const json = `{\n${Object.entries(releases).map(([name, list]) => `  ${JSON.stringify(name)}: [\n${list.map((entry) => `    ${JSON.stringify(entry)}`).join(",\n")}\n  ]`).join(",\n")}\n}\n`;
await writeFile(new URL("../src/data/releases.json", import.meta.url), json);
console.log(Object.entries(releases).map(([name, list]) => `${name}: ${list.length} releases`).join("\n"));
