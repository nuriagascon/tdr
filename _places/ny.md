---
layout: test
title:  "New York"
published: true
long: -76.5510
lat: 43.5641
coordinates:
  - [-79.7624, 42.2702]
  - [-79.0458, 42.4441]
  - [-76.1474, 43.0481]
  - [-75.5095, 43.1988]
  - [-73.3432, 44.5186]
  - [-73.6574, 45.0161]
  - [-74.6690, 44.9896]
  - [-75.0672, 44.8528]
  - [-76.2189, 43.6319]
  - [-78.8784, 42.9654]
  - [-79.7624, 42.2702]
---

{% leaflet_map { "center" : [{{ page.lat }}, {{ page.long }}], "zoom" : 6, "providerBasemap": "OpenStreetMap" } %}
    {% leaflet_geojson {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [{{ page.coordinates }}] } } %}
{% endleaflet_map %}