---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
---

# Hello

{% leaflet_map { "center" : [48.7596,  -113.787], "zoom" : 4, "providerBasemap": "OpenTopoMap" } %}
    {% for place in site.places %}
        {% leaflet_geojson {
            "type": "Feature",
            "properties": { "popupContent": "{{ place.title }}",
                            "href": "{{ place.url }}" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [{{ place.coordinates }}] } } %}
    {% endfor %}
{% endleaflet_map %}
