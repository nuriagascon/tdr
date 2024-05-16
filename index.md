---
layout: home
---

# Hello

{% leaflet_map { "center" : [42.356834705844484, 1.45456943339023], "zoom" : 16, "providerBasemap": "GeoserveiTopo" } %}
    {% for place in site.bcil-existents %}
        {% leaflet_geojson {
            "type": "Feature",
            "properties": { "popupContent": "{{ place.title }}",
                            "href": "{{ place.url }}",
                            "pane": "{{ place.collection }}" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [{{ place.coordinates }}] } } %}
    {% endfor %}
    {% for place in site.bcil-previstos-cbp %}
        {% leaflet_geojson {
            "type": "Feature",
            "properties": { "popupContent": "{{ place.title }}",
                            "href": "{{ place.url }}",
                            "pane": "{{ place.collection }}" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [{{ place.coordinates }}] } } %}
    {% endfor %}
{% endleaflet_map %}
