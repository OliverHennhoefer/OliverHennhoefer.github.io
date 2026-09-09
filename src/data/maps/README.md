# Map sources

World map: `world-atlas/countries-50m.json` from the locked npm package. Natural Earth 1:50m country boundaries, public domain; World Atlas distribution under ISC. https://github.com/topojson/world-atlas

UK constituent countries: geoBoundaries gbOpen GBR ADM1, boundary ID `GBR-ADM1-14339913`, representing 2021. Source: Eurostat / European Commission, distributed by William & Mary geoLab under CC BY 4.0: https://creativecommons.org/licenses/by/4.0/

Pinned source: https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/GBR/ADM1/geoBoundaries-GBR-ADM1_simplified.geojson

Metadata: https://www.geoboundaries.org/api/current/gbOpen/GBR/ADM1/

The vendored file has compacted JSON whitespace; coordinates are preserved. At build time, polygon winding is normalized for D3 and all geometries are projected using Equal Earth. These four features replace the World Atlas United Kingdom feature so England and Scotland can be highlighted without marking Wales or Northern Ireland.
