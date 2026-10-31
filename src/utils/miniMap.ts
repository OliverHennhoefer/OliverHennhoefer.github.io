import { geoEqualEarth, geoPath } from "d3-geo";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import mapData from "../data/maps/map-units.json";
import { visitedCountries } from "./travel";

// A light version of the travel map for the home page: small canvas, whole-pixel
// coordinates, near-duplicate points dropped and specks under ~2px² skipped.
export const miniWidth = 640;
const countries = (mapData as FeatureCollection<Polygon | MultiPolygon, { name: string }>).features
  .filter((country) => country.properties.name !== "Antarctica");
const land = { type: "FeatureCollection", features: countries } as FeatureCollection<Polygon | MultiPolygon>;
const projection = geoEqualEarth().fitWidth(miniWidth, land);
const path = geoPath(projection).digits(0);
export const miniHeight = Math.ceil(path.bounds(land)[1][1]);
const visited = new Set(visitedCountries);

function simplify(d: string | null): string {
  if (!d) return "";
  return d.split("M").filter(Boolean).map((ring) => {
    const points = ring.replace(/Z$/, "").split("L").map((pair) => pair.split(",").map(Number));
    const kept: number[][] = [];
    for (const point of points) {
      const last = kept[kept.length - 1];
      if (!last || Math.abs(point[0] - last[0]) + Math.abs(point[1] - last[1]) >= 2) kept.push(point);
    }
    const xs = kept.map((p) => p[0]), ys = kept.map((p) => p[1]);
    const area = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
    if (kept.length < 3 || area < 2) return "";
    return `M${kept.map((p) => p.join(",")).join("L")}Z`;
  }).join("");
}

export const miniCountries = countries.map((country) => ({
  name: country.properties.name,
  // Tiny territories would vanish when simplified; keep their whole-pixel outline instead.
  path: simplify(path(country)) || path(country) || "",
  visited: visited.has(country.properties.name),
}));
