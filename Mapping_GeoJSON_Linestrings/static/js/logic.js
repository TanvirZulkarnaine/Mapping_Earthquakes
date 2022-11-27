// Add console.log to check to see if our code is working.
console.log("working");

// We create the streets tile layer that will be the background of our map.
let light = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);

// This is base layer that hold both map layers (light and dark)
let baseMaps = {
  Light: light,
  Dark: dark,
};

// Creating map object that refers to mapid from index.
// Note this map object initially puts you in the displayed coordinates with selected layer which is "Light" in this case.
let map = L.map("mapid", {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [dark],
});

// Pass our map layers into our layers control and add the layers control to the map.
// Note: This is for selecting different layers on top right corner of your screen
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData =
  "https://raw.githubusercontent.com/TanvirZulkarnaine/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2,
};

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function (data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
      console.log(layer);
      layer.bindPopup(
        "<h2>" +
          "Airline: " +
          feature.properties.airline +
          "</h2>" +
          "<hr>" +
          "<h3> Destination: " +
          feature.properties.dst +
          "</h3>"
      );
    },
  }).addTo(map);
});
