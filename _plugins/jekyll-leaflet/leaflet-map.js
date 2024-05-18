(() => {
// Specify configuration variables, setup any elements and styling
    var leafletCdn = "https://unpkg.com/leaflet@1.6.0/dist/";
    var esriLeafletCdn = "https://unpkg.com/esri-leaflet/dist/";

    // Get tag input arguments & inside block object list
    var tagInputArg = %{tag_input_arg_json};
    var blockLeafletItems = [%{inside_block_leaflet_items}];

    // Override the map div id if specified, apply default CSS
    var defaultMapElId = "leaflet-map-%{id}";
    var defaultMapElStyle = "height:300px; margin-top:15px; margin-bottom:15px";
    var mapEl = document.getElementById(defaultMapElId);
    if ('divId' in tagInputArg) {
        mapEl.id = tagInputArg['divId'];
    }
    var defaultMapCssEl = document.createElement("style");
    defaultMapCssEl.innerHTML =
        "#" + defaultMapElId + "{" + defaultMapElStyle + "}";
    document.head.appendChild(defaultMapCssEl);

    var newWindowImgSrcBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4wUVFzAHq2j99AAAAV9JREFUSMdjYKAxYCRHk5ubG9+1a9fm/v//H6cadnb2G/fu3atlIceC379/c3z9+jUEn5q/f/8eYWBgYECxQE5OroqA2Y8ePXq0hJWV9Qc3N/caZB8wMjJKff361QpvEAkKCv4nYMGh9+/f26MLamhoyLx9+3b/nz9/VJCC6MiLFy9sWXCE3xlGRsZvWKQu4DOciYnpCzc396HPnz97weRxWRD/8OHDa4TiAt1wfn5+z79//zoxMDDALWAiN/lhM/zevXtH0NUx0dJwsiwgxXCccUCJ4dzc3DP+//+/gZ2d/duLFy9Is+Djx4+rCbn82rVrrxgYGF6RFUR8fHyZbGxsD7AZLiEhUSAiIrJSUlIyjOw4uHnz5gVHR0d1bC7/8+eP5d+/f8P+/PmjS1Ekr1ix4hcp6ploXVwPfQuwJlMmJiYBLS0tIVIMev36NRvRFnz48OHohw8fhkYQjQKCAAChiL6Pj/LM2QAAAABJRU5ErkJggg==";

    var bcil_existents, bcil_previstos_cbp, bcin_existents, bcin_previstos_cbp, patrimoni_arqueologic_i_paleontologic,
        patrimoni_arquitectonic;

// Actual mapping section; Specify a function to be called later that
// assembles the correct JS components based on what the user specified in the
// tag input arg, the block section of features, etc. Actually creates the map
// that is visible on the page

    function _getCenter() {
        var defaultCenter = [0, 0];
        if ("center" in tagInputArg) {
            return tagInputArg.center;
        } else {
            return defaultCenter;
        }
    }

    function _needsLayers() {
        var defaultNeeds = false;
        if ("needsLayers" in tagInputArg) {
            return tagInputArg.needsLayers;
        } else {
            return defaultNeeds;
        }
    }

    function _getZoom() {
        var defaultZoom = 1;
        if ("zoom" in tagInputArg) {
            return tagInputArg.zoom
        } else {
            return defaultZoom;
        }
    }


    function _addMarkerToMap(leafletItem, map) {
        var m = leafletItem.value;
        var result = L.marker([m.latitude, m.longitude]).addTo(map);
        var potentialPopup = "";
        if ('popupContent' in m) {
            potentialPopup += m.popupContent;
        }
        if ('href' in m) {
            potentialPopup += '<a href="' + m.href + '">' +
                '<img src="' + newWindowImgSrcBase64 + '"></img></a>';
        }
        if (potentialPopup) {
            result.bindPopup(potentialPopup);
        }
        if (!('center' in tagInputArg)) {
            // If the user didn't specify a center, infer from marker
            map.panTo(new L.LatLng(m.latitude, m.longitude));
        }
    }

    function _onEachFeature(feature, layer) {
        var potentialPopup = ""
        if (feature.properties && feature.properties.popupContent) {
            potentialPopup += feature.properties.popupContent;
        }
        if (feature.properties && feature.properties.href) {
            potentialPopup =
                `<p class="popup">${potentialPopup}<a href="${feature.properties.href}">` +
                '<span class="material-symbols-outlined">open_in_new</span></a></p>';
        }
        if (potentialPopup) {
            layer.bindPopup(potentialPopup);
        }
    }

    function _addGeoJSONToMap(leafletItem, map) {
        if (typeof leafletItem.value === "string") {
            fetch(leafletItem.value).then((resp) => {
                return resp.json();
            }).then((data) => {
                leafletItem.value = data;
                _addGeoJSONObjToMap(leafletItem, map);
            }).catch((err) => {
                console.log("Encountered err w/ geojson, attempting to fix..");
                console.log(err);
                _addGeoJSONObjToMap(leafletItem, map);
            });
        } else {
            _addGeoJSONObjToMap(leafletItem, map);
        }
    }

    function _createPane(map, name) {
        const zIndexMap = {
            "bcil-existents": 408,
            "bcil-previstos-cbp": 405,
            "bcin-existents": 408,
            "bcin-previstos-cbp": 407,
            "patrimoni-arqueologic-i-paleontologic": 403,
            "patrimoni-arquitectonic": 404
        };

        if (!(name in zIndexMap)) {
            throw `Pane with name: ${name} is not supported`;
        }

        map.createPane(name);
        map.getPane(name).style.zIndex = zIndexMap[name];
    }

    function _style(name) {
        const baseStyle = {
            pane: name,
            opacity: 1,
            color: "rgba(35,35,35,1.0)",
            dashArray: "",
            lineCap: "butt",
            lineJoin: "miter",
            weight: 1.0,
            fill: true,
            interactive: true
        };

        const styles = {
            "bcil-existents": { fillOpacity: 1, fillColor: "rgb(219,35,127)" },
            "bcil-previstos-cbp": { fillOpacity: 1, fillColor: "rgb(233,135,219)" },
            "bcin-existents": { fillOpacity: 1, fillColor: "rgb(103,88,150)" },
            "bcin-previstos-cbp": { fillOpacity: 1, fillColor: "rgb(151,124,184)" },
            "patrimoni-arqueologic-i-paleontologic": { fillOpacity: 0.5, fillColor: "rgb(241,253,6)" },
            "patrimoni-arquitectonic": { fillOpacity: 0.7, fillColor: "rgb(171,138,20)" }
        };

        return { ...baseStyle, ...styles[name] };
    }

    function _overlayLayer(name){
        switch(name){
            case "bcil-existents": return bcil_existents;
            case "bcil-previstos-cbp": return bcil_previstos_cbp;
            case "bcin-existents": return bcin_existents;
            case "bcin-previstos-cbp": return bcin_previstos_cbp;
            case "patrimoni-arqueologic-i-paleontologic": return patrimoni_arqueologic_i_paleontologic;
            case "patrimoni-arquitectonic": return patrimoni_arquitectonic;
        }
    }

    function _addGeoJSONObjToMap(leafletItem, map) {
        var geojson;
        if(leafletItem.value.properties != null && leafletItem.value.properties.pane != null){
            geojson = L.geoJSON(leafletItem.value, {
                onEachFeature: _onEachFeature,
                style: _style(leafletItem.value.properties.pane)
            });

            if(map.getPane(leafletItem.value.properties.pane) == null){
                _createPane(map, leafletItem.value.properties.pane);
            }
        }else{
            geojson = L.geoJSON(leafletItem.value, {
                onEachFeature: _onEachFeature
            });
        }
        layers = geojson.getLayers();
        for (var i = 0; i < layers.length; i++) {
            var geom = layers[i].feature.geometry;
            if (!('center' in tagInputArg)) {
                // If the user didn't specify a center, infer from geojson
                //console.log("panning to " + geom.coordinates);
                map.panTo(new L.LatLng(geom.coordinates[1],
                    geom.coordinates[0]));
            }
        }

        if(leafletItem.value.properties != null && leafletItem.value.properties.pane != null)
            geojson.addTo(_overlayLayer(leafletItem.value.properties.pane));
        else
            geojson.addTo(map);

    }

    function _processLeafletItem(leafletItem, map) {
        switch (leafletItem.type) {
            case "LeafletMarker":
                _addMarkerToMap(leafletItem, map);
                break;
            case "LeafletGeoJSON":
                _addGeoJSONToMap(leafletItem, map);
                break;
            case undefined:
                break;
            default:
                console.log("Couldn't add item " + leafletItem.id);
                break;
        }
    }

    function calculateCombinedBounds(map) {
        // Initialize a bounds object
        var combinedBounds = null;

        // Loop through each layer in the map
        map.eachLayer(function (layer) {
            if (layer instanceof L.GeoJSON) {
                // Get the bounds of the current GeoJSON layer
                var layerBounds = layer.getBounds();

                // Initialize combinedBounds if it's the first layer
                if (!combinedBounds) {
                    combinedBounds = L.latLngBounds(layerBounds);
                } else {
                    // Extend the combined bounds to include the current layer's bounds
                    combinedBounds.extend(layerBounds);
                }
            }
        });

        return combinedBounds;
    }


//The actual section that is called that creates a map
    function createMap() {
        //Initialize Map with the correct input arguments
        var map = L.map(mapEl.id,
            {worldCopyJump: true}).setView(_getCenter(), _getZoom());
        if ("esriBasemap" in tagInputArg) {
            L.esri.basemapLayer(tagInputArg.esriBasemap).addTo(map);
        }

        var topographic = L.tileLayer.provider("Geoservei.Topo").addTo(map);
        var topographicGray = L.tileLayer.provider("Geoservei.TopoGris");
        var orthographic = L.tileLayer.provider("Geoservei.Orto");
        var orthographicGray = L.tileLayer.provider("Geoservei.OrtoGris");

        bcil_existents = L.layerGroup();
        bcil_previstos_cbp = L.layerGroup();
        bcin_existents = L.layerGroup();
        bcin_previstos_cbp = L.layerGroup();
        patrimoni_arqueologic_i_paleontologic = L.layerGroup().addTo(map);
        patrimoni_arquitectonic = L.layerGroup().addTo(map);

        //process each Leaflet Item passed in between the block tag middle
        for (var i = 0; i < blockLeafletItems.length; i++) {
            var leafletItem = blockLeafletItems[i];
            _processLeafletItem(leafletItem, map);
        }

        var baseLayers = {
            "Topogràfic": topographic,
            "Topogràfic Gris": topographicGray,
            "Ortofoto": orthographic,
            "Ortofoto Gris": orthographicGray,
        };

        var overlayMaps = {
            "Patrimoni Arqueològic i Paleontològic": patrimoni_arqueologic_i_paleontologic,
            "Patrimoni Arquitectònic": patrimoni_arquitectonic,
            "BCIL Existents": bcil_existents,
            "BCIL Previstos CBP": bcil_previstos_cbp,
            "BCIN Existents": bcin_existents,
            "BCIN Previstos CBP": bcin_previstos_cbp,
        };

        if(_needsLayers()){
            L.control.layers(baseLayers, overlayMaps).addTo(map);
        }else{
            L.control.layers(baseLayers, null).addTo(map);
        }

        var combinedBounds = calculateCombinedBounds(map);
        map.fitBounds(combinedBounds);
        map.setMaxBounds(combinedBounds.pad(.1));

        /*map.on('drag', function() {
            map.panInsideBounds(combinedBounds, { animate: false });
        });*/
    }

// Load the correct JS libraries/CSS by adding to head:
// When ready, call createMap() to create the map on the page

    function _createMap() {
        // helper function to draw the map only when everything is loaded,
        // safeguards against multiple calls to window.onload
        var prevOnLoad;
        if (window.onload) {
            prevOnLoad = window.onload;
        }
        window.onload = () => {
            createMap();
            if (prevOnLoad) {
                prevOnLoad();
            }
        }
    }

    var leafletCssId = "leaflet-css-head";
    var leafletJsId = "leaflet-js-head";
    var esriLeafletJsId = "esri-leaflet-js-head";
    var leafletProvidersJsId = "leaflet-providers-js-head";

    // Add the leaflet CSS first, don't worry about when it loads
    var leafletCssEl = document.createElement("link");
    leafletCssEl.id = leafletCssId;
    leafletCssEl.rel = "stylesheet";
    leafletCssEl.href = leafletCdn + "leaflet.css";
    if (!document.getElementById(leafletCssEl.id)) {
        document.head.appendChild(leafletCssEl);
    }

    function addToHeadIfNotLoaded(el) {
        //Add the el to the head if it doesn't exist already. If it does,
        //everything we need is already loaded, so draw the map
        if (!document.getElementById(el.id)) {
            document.head.appendChild(el);
        } else {
            _createMap();
        }
    }

    // Load the main leaflet.js code, wait for it to load
    var leafletJsEl = document.createElement("script");
    leafletJsEl.id = leafletJsId;
    leafletJsEl.onload = () => {
        //After loaded, load the esri-leaflet.js code, wait for it to load
        var esriEl = document.createElement("script");
        esriEl.id = esriLeafletJsId;
        esriEl.onload = () => {
            //After loaded, add the inline leaflet-providers <script>
            provEl = document.createElement("script");
            provEl.id = leafletProvidersJsId;
            provEl.innerHTML = `%{leaflet_providers_js_content}`;
            if (!document.getElementById(provEl.id)) {
                document.head.appendChild(provEl);
            }
            _createMap();
        }
        esriEl.src = esriLeafletCdn + "esri-leaflet.js";
        addToHeadIfNotLoaded(esriEl);
    };
    leafletJsEl.src = leafletCdn + "leaflet.js";
    addToHeadIfNotLoaded(leafletJsEl);
})();
