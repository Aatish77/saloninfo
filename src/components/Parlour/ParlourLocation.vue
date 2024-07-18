<template>
    <div>
      <v-row>
        <!-- <v-col cols="6">
          <v-btn @click="getLocation" class="mb-3">Get My Location</v-btn>
        </v-col> -->
        <v-col cols="6">
          <input
            style="background-color: white; margin-left: 420px;"
            type="text"
            v-model="query"
            @input="fetchSuggestions"
            placeholder="Enter a location"
          />
          <ul
            style="position: absolute; z-index: 1000; background-color: white; right: 0;"
            v-if="suggestions.length"
          >
            <li
              v-for="suggestion in suggestions"
              :key="suggestion.place_id"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion.display_name }}
            </li>
          </ul>
        </v-col>
      </v-row>
      <div ref="mapContainer" style="width: 100%; height: 500px"></div>
      <v-btn @click="submit" class="mt-3">Submit</v-btn>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import L from "leaflet";
  import axios from "axios";
  
  const query = ref("");
  const suggestions = ref([]);
  const selectedPlace = ref(null);
  const map = ref(null);
  const mapContainer = ref(null);
  const userMarker = ref(null);
  
  onMounted(() => {
    if (mapContainer.value) {
      map.value = L.map(mapContainer.value).setView([10.8505, 76.2711], 7);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value);
  
      // Add a draggable marker for manual selection
      userMarker.value = L.marker([10.8505, 76.2711], { draggable: true })
        .addTo(map.value)
        .bindTooltip("Drag to select location", {
          permanent: true,
          direction: "top",
        })
        .on("dragend", (event) => {
          const latlng = event.target.getLatLng();
          selectedPlace.value = {
            name: `Lat: ${latlng.lat.toFixed(5)}, Lon: ${latlng.lng.toFixed(5)}`,
            latitude: latlng.lat,
            longitude: latlng.lng,
          };
          userMarker.value.setLatLng([latlng.lat, latlng.lng]);
    userMarker.value.setTooltipContent(selectedPlace.value.name);
          map.value.setView(latlng, 10);
        });
    }
  });
  
  function fetchSuggestions() {
    if (query.value.length > 2) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query.value}`
        )
        .then((response) => {
          suggestions.value = response.data;
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      suggestions.value = [];
    }
  }
  
  function selectSuggestion(suggestion) {
    if (!map.value) return;
  
    const selectedLat = parseFloat(suggestion.lat);
    const selectedLon = parseFloat(suggestion.lon);
    selectedPlace.value = {
      name: suggestion.display_name,
      latitude: selectedLat,
      longitude: selectedLon,
    };
  
    map.value.setView([selectedLat, selectedLon], 10);
  
    // Move the marker to the selected place
    userMarker.value.setLatLng([selectedLat, selectedLon]);
    userMarker.value.setTooltipContent(selectedPlace.value.name);
  }
  
  // function getLocation() {
  //   if (navigator.geolocation && map.value) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         map.value.setView([lat, lng], 13);
  
  //         userMarker.value.setLatLng([lat, lng]);
  //         userMarker.value.setTooltipContent("Your Location");
  
  //         selectedPlace.value = {
  //           name: "Current Location",
  //           latitude: lat,
  //           longitude: lng,
  //         };
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       },
  //       { enableHighAccuracy: true }
  //     );
  //   }
  // }
  
  function submit() {
    console.log(selectedPlace.value);
    sessionStorage.setItem("parlourlocation",JSON.stringify(selectedPlace.value))
  }
  </script>
  
  <style scoped>
    input {
      width: 300px;
      padding: 8px;
      margin-bottom: 10px;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ccc;
      max-width: 300px;
    }
    
    li {
      padding: 8px;
      cursor: pointer;
    }
    
    li:hover {
      background-color: #f0f0f0;
    }
  </style>
  