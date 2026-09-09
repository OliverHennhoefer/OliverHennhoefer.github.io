# Map source

`map-units.json` contains Natural Earth 1:50m Admin 0 map units, version 5.1.2 (public domain).

Pinned source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_0_map_units.geojson

Dataset documentation: https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-details/

The 265 source features and their coordinates are preserved. Only metadata and whitespace are reduced: `GU_A3` becomes the feature `id`, and `GEOUNIT` becomes `properties.name`; other properties are omitted. No polygon cutting or winding corrections are applied.

Map units distinguish overseas territories (including French Guiana, Svalbard, and Jan Mayen) and the four UK constituent countries. All geometries use the same Equal Earth projection at build time.
