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
export const visitedCountries = [...visited].sort((a, b) => a.localeCompare(b, "en"));
