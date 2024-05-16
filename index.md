---
layout: home
---

# Mapa del patrimoni cultural immoble de la Seu

{% leaflet_map { "center" : [42.356834705844484, 1.45456943339023], "zoom" : 16, "providerBasemap": "GeoserveiTopo" } %}
    {% for place in site.patrimoni %}
        {% capture geojson %}
            {% for group in place.coordinates %}
                [
                {% for key in group %}
                    {% for coord in key[1] %}
                        [{{ coord[0] }}, {{ coord[1] }}],
                    {% endfor %}
                {% endfor %}
                ],
            {% endfor %}
        {% endcapture %}

        {% for collect in place.collections %}
            {% leaflet_geojson {
                "type": "Feature",
                "properties": { "popupContent": "{{ place.title }}",
                                "href": "{{ place.url }}",
                                "pane": "{{ collect }}" },
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [[
                        {{ geojson }}
                    ]] } } %}
        {% endfor %}
    {% endfor %}
{% endleaflet_map %}