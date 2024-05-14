---
layout: test
title:  "The whole state of North Dakota"
published: true
long: -100.72
lat: 47.4625
coordinates:
  - [-104.05, 48.99]
  - [-97.22, 48.98]
  - [-96.58, 45.94]
  - [-104.03, 45.94]
  - [-104.05, 48.99]
---

{% leaflet_map { "center" : [{{ page.lat }}, {{ page.long }}], "zoom" : 6, "providerBasemap": "OpenTopoMap" } %}
    {% leaflet_geojson {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [{{ page.coordinates }}] } } %}
{% endleaflet_map %}