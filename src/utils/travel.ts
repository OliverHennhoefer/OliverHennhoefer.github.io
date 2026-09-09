import { geoEqualEarth, geoGraticule10, geoPath } from "d3-geo";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import mapData from "../data/maps/map-units.json";
import visitedNames from "../data/visited-countries.json";

const countries = (mapData as FeatureCollection<Polygon | MultiPolygon, { name: string }>).features;
const available = new Set(countries.map((country) => country.properties.name));
const visited = new Set<string>(visitedNames);
if (visited.size !== visitedNames.length) throw new Error("Visited countries must not contain duplicates.");
for (const name of visited) {
  if (!available.has(name)) throw new Error(`Unknown visited country: ${name}. Use a name from src/data/maps/map-units.json.`);
}

export const mapWidth = 1000;
export const mapHeight = 530;
const sphere = { type: "Sphere" } as const;
const projection = geoEqualEarth().fitExtent([[12, 12], [mapWidth - 12, mapHeight - 12]], sphere);
const path = geoPath(projection);
export const worldOutline = path(sphere);
export const graticule = path(geoGraticule10());
export const countryPaths = countries.map((country) => ({
  name: country.properties.name,
  path: path(country),
  visited: visited.has(country.properties.name),
}));
export const visitedCountries = [...visited].sort((a, b) => a.localeCompare(b, "en"));
