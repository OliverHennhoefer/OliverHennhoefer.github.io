import { geoArea, geoEqualEarth, geoGraticule10, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import type { FeatureCollection, MultiPolygon } from "geojson";
import ukData from "../data/maps/uk-countries.json";
import visitedNames from "../data/visited-countries.json";

const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const worldCountries = feature(topology, topology.objects.countries).features;
const ukCountries = (ukData as unknown as FeatureCollection<MultiPolygon, { shapeName: string }>).features.map((country) => ({
  ...country,
  properties: { name: country.properties.shapeName },
  geometry: {
    ...country.geometry,
    // D3 uses clockwise exterior rings; normalize the GeoJSON source per polygon.
    coordinates: country.geometry.coordinates.map((polygon) =>
      geoArea({ type: "Polygon", coordinates: polygon }) > 2 * Math.PI
        ? polygon.map((ring) => [...ring].reverse()) : polygon),
  },
}));
const countries = [...worldCountries.filter((country) => country.properties.name !== "United Kingdom"), ...ukCountries];
const available = new Set(countries.map((country) => country.properties.name));
const visited = new Set<string>(visitedNames);
if (visited.size !== visitedNames.length) throw new Error("Visited countries must not contain duplicates.");
for (const name of visited) {
  if (!available.has(name)) throw new Error(`Unknown visited country: ${name}. Use a World Atlas country name or England, Scotland, Wales, or Northern Ireland.`);
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
