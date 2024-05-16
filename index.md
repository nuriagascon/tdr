---
layout: home
---

# Mapa del patrimoni cultural immoble de la Seu

{% leaflet_map { "center" : [42.356834705844484, 1.45456943339023], "zoom" : 16, "providerBasemap": "GeoserveiTopo" } %}
    {% for collection in site.collections %}
        {% for place in site[collection.label] %}
            {% leaflet_geojson {
                "type": "Feature",
                "properties": { "popupContent": "{{ place.title }}",
                                "href": "{{ place.url }}",
                                "pane": "{{ place.collection }}" },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [{{ place.coordinates }}] } } %}
        {% endfor %}
    {%endfor%}
{% endleaflet_map %}
