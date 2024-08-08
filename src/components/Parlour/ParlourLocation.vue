<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-btn @click="getLocation" class="mb-3">Get My Location</v-btn>
      </v-col>
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

<script>

import L from "leaflet";
import axios from "axios";

export default {
  data() {
    return {
      query: "",
      suggestions: [],
      selectedPlace: null,
      map: null,
      mapContainer: null,
      userMarker: null,
    };
  },
  methods: {
    fetchSuggestions() {
      if (this.query.length > 2) {
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${this.query}`
          )
          .then((response) => {
            this.suggestions = response.data;
          })
          .catch((error) => {
            console.error("Error fetching suggestions:", error);
          });
      } else {
        this.suggestions = [];
      }
    },
    selectSuggestion(suggestion) {
      if (!this.map) return;

      const selectedLat = parseFloat(suggestion.lat);
      const selectedLon = parseFloat(suggestion.lon);
      this.selectedPlace = {
        name: suggestion.display_name,
        latitude: selectedLat,
        longitude: selectedLon,
      };

      this.map.setView([selectedLat, selectedLon], 10);

      // Move the marker to the selected place
      this.userMarker.setLatLng([selectedLat, selectedLon]);
      this.userMarker.setTooltipContent(this.selectedPlace.name);
    },
    getLocation() {
      if (navigator.geolocation && this.map) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.map.setView([lat, lng], 13);

            this.userMarker.setLatLng([lat, lng]);
            this.userMarker.setTooltipContent("Your Location");

            this.selectedPlace = {
              name: "Current Location",
              latitude: lat,
              longitude: lng,
            };
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    },
    submit() {
      console.log(this.selectedPlace);
      this.$emit('childValues', { lat: this.selectedPlace.latitude, lng: this.selectedPlace.longitude })
      // sessionStorage.setItem("parlourlocation", JSON.stringify(this.selectedPlace));
    },
  },
  mounted() {
    this.mapContainer = this.$refs.mapContainer;
    if (this.mapContainer) {
      this.map = L.map(this.mapContainer).setView([10.8505, 76.2711], 7);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      // Add a draggable marker for manual selection
      this.userMarker = L.marker([10.8505, 76.2711], { draggable: true })
        .addTo(this.map)
        .bindTooltip("Drag to select location", {
          permanent: true,
          direction: "top",
        })
        .on("dragend", (event) => {
          const latlng = event.target.getLatLng();
          this.selectedPlace = {
            name: `Lat: ${latlng.lat.toFixed(5)}, Lon: ${latlng.lng.toFixed(5)}`,
            latitude: latlng.lat,
            longitude: latlng.lng,
          };
          this.userMarker.setLatLng([latlng.lat, latlng.lng]);
          this.userMarker.setTooltipContent(this.selectedPlace.name);
          this.map.setView(latlng, 10);
        });
    }
  },
};
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
