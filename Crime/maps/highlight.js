// Initialize the map object
        
        // Create an empty layer where we will load the polygons
        var featureLayer = new L.GeoJSON();
        
        var defaultStyle = {
            color: "#FF0000",
            weight: 2,
            opacity: 0.6,
            fillOpacity: 0.1,
            fillColor: "#FF00FF"
        };
        var highlightStyle = {
            color: '#2262CC', 
            weight: 3,
            opacity: 0.6,
            fillOpacity: 0.65,
            fillColor: '#2262CC'
        };

        var onEachFeature = function(feature, layer) {
            
            layer.setStyle(defaultStyle);

            (function(layer, properties) {
              layer.on("mouseover", function (e) {
                layer.setStyle(highlightStyle);
                var popup = $("<div></div>", {
                    id: "popup-" + properties.DISTRICT,
                    css: {
                        position: "absolute",
                        bottom: "85px",
                        left: "50px",
                        zIndex: 1002,
                        backgroundColor: "aqua",
                        padding: "8px",
                        border: "0px solid #ccc"
                    }
                });
                // Insert a headline into that popup
                var hed = $("<div></div>", {
                    text: "Police Station Name: " + properties.DISTRICT,
                    css: {fontSize: "20px", marginBottom: "3px"}
                }).appendTo(popup);
                popup.appendTo("#map");
              });
              // Create a mouseout event that undoes the mouseover changes
              layer.on("mouseout", function (e) {
                // Start by reverting the style back
                layer.setStyle(defaultStyle); 
                $("#popup-" + properties.name).remove();
              });
            })(layer, feature.properties);
        };
		
		
        var featureLayer = L.geoJson(boundaries, {
            onEachFeature: onEachFeature
        });
        map.addLayer(featureLayer);