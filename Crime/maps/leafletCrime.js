// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

	var map = L.map( 'map', {
	  center: [22.3072,73.1812],
	  minZoom: 12,
	  zoom: 12
	});


		 
		var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);


		var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
			maxZoom: 20,
			attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
		});

	var Original=L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
			 attribution:
			 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
			 maxZoom: 18
		 });
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		});

		

		var HikeBike_HikeBike = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		});

	var stamenLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		});
			
			

		var overlay={
		
		"OpenStreetMap_France":OpenStreetMap_France,
		"Hiker's Bike":HikeBike_HikeBike,
		"Original":Original,
		"Esri's World":Esri_WorldImagery,
		"Stamen shdkasj Layer":stamenLayer
		};
		L.control.layers(overlay).addTo(map);
		

	var Pop = L.tileLayer.wms("http://localhost:8081/geoserver/CrimeMap/wms", {
		layers: 'CrimeMap:vadodara_crime_T',
		format: 'image/png',
		transparent:true	
	});


	Pop.addTo(map);
	console.log(Pop);
		 

var myURL = jQuery( 'script[src$="leafletCrime.js"]' ).attr( 'src' ).replace( 'leafletCrime.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < markers.length; ++i )
{
  var popup = '<u><b>Crime Location</b></u> '+markers[i].Place +
              '<br/>Latitude ' + markers[i].lat +
              '<br/>Longitude ' + markers[i].lng +
              '<br/><b>People Involved</b> ' + markers[i].People +
			  '<br/><b>Crime Type (assigned by IPC)<b> ' + markers[i].CrimeType +
              '<br/><b>Subcategory of crime:</b> ' + markers[i].Subcategory;

  var m = L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
                  .bindPopup( popup );


  markerClusters.addLayer( m );
}



map.addLayer( markerClusters );



