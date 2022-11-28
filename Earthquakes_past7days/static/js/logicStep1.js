// Add console.log to check to see if our code is working.
console.log("working");

// We create the streets tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);
// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);

// This is base layer that hold both map layers (light and dark)
let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets,
};

// Creating map object that refers to mapid from index.
// Note this map object initially puts you in the displayed coordinates with selected layer which is "streets" in this case.
let map = L.map("mapid", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets],
});

// Pass our map layers into our layers control and add the layers control to the map.
// Note: This is for selecting different layers on top right corner of your screen
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
// Retrieve the earthquake GeoJSON data.
d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});



// -------------------- End of Logic Step 1 Code --------------------



// // Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods =
//   "https://raw.githubusercontent.com/TanvirZulkarnaine/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// // Create a style for the lines.
// let myStyle = {
//   color: "#FFFF00",
//   weight: 1,
// };

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function (data) {
//   console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data, {
//     style: myStyle,
//     onEachFeature: function (feature, layer) {
//       console.log(layer);
//       layer.bindPopup(
//         "<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>"
//       );
//     },
//   }).addTo(map);
// });
