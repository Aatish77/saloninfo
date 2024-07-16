<template>
  <div>
    <input 
      type="text" 
      v-model="query" 
      @input="fetchSuggestions" 
      placeholder="Enter a location" 
    />
    <ul v-if="suggestions.length">
      <li 
        v-for="suggestion in suggestions" 
        :key="suggestion.place_id" 
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.display_name }}
      </li>
    </ul>
    <button @click="getLocation()">Get My Location</button>
    <div ref="mapContainer" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import axios from "axios";

const query = ref("");
const suggestions = ref([]);
const nearbyPlaces = ref([]);
const selectedPlace = ref(null);
const map = ref(null);
const mapContainer = ref(null);
const userMarker = ref(null);

const placesInKerala = [
  { name: "Thiruvananthapuram", latitude: 8.5241, longitude: 76.9366 },
  { name: "Kochi", latitude: 9.9312, longitude: 76.2673 },
  { name: "Kozhikode", latitude: 11.2588, longitude: 75.7804 },
  { name: "Thrissur", latitude: 10.5276, longitude: 76.2144 },
  { name: "Alappuzha", latitude: 9.4981, longitude: 76.3388 },
  { name: "Palakkad", latitude: 10.7867, longitude: 76.6548 },
  { name: "Kollam", latitude: 8.8932, longitude: 76.6141 },
  { name: "Kannur", latitude: 11.8745, longitude: 75.3704 },
  { name: "Kottayam", latitude: 9.5916, longitude: 76.5222 },
  { name: "Malappuram", latitude: 11.0735, longitude: 76.0745 },
  { name: "Pathanamthitta", latitude: 9.2646, longitude: 76.7870 },
  { name: "Idukki", latitude: 9.8503, longitude: 76.9747 },
  { name: "Varkala", latitude: 8.7379, longitude: 76.7163 },
  { name: "Guruvayur", latitude: 10.5943, longitude: 76.0410 },
  { name: "Munnar", latitude: 10.0892, longitude: 77.0595 },
  { name: "Kumarakom", latitude: 9.6174, longitude: 76.4294 },
  { name: "Wayanad", latitude: 11.6854, longitude: 76.1319 },
  { name: "Bekal", latitude: 12.3660, longitude: 75.0466 },
  { name: "Vagamon", latitude: 9.6855, longitude: 76.9183 },
  { name: "Sabarimala", latitude: 9.4420, longitude: 77.0694 }
];

onMounted(() => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([10.8505, 76.2711], 7);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.value);
  }
});

function fetchSuggestions() {
  if (query.value.length > 2) {
    axios
      .get(`https://nominatim.openstreetmap.org/search?format=json&q=${query.value}`)
      .then(response => {
        suggestions.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
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
    longitude: selectedLon
  };

  map.value.setView([selectedLat, selectedLon], 10);

  // Remove existing markers
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer);
    }
  });

  // Add selected place marker
  L.marker([selectedLat, selectedLon], { icon: L.icon({ iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }) })
    .addTo(map.value)
    .bindTooltip(selectedPlace.value.name, { permanent: true, direction: 'top' })
    .bindPopup(selectedPlace.value.name);

  // Find and display nearby places within 100 km
  nearbyPlaces.value = placesInKerala.filter(place => {
    const distance = calculateDistance(
      selectedLat,
      selectedLon,
      place.latitude,
      place.longitude
    );
    return distance <= 50; // 100 km radius
  });

  // Add nearby places markers
  nearbyPlaces.value.forEach(place => {
    L.marker([place.latitude, place.longitude], { icon: L.icon({ iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }) })
      .addTo(map.value)
      .bindTooltip(place.name, { permanent: true, direction: 'top' })
      .bindPopup(place.name);
  });

  suggestions.value = [];
}

function getLocation() {
  if (navigator.geolocation && map.value) {
    navigator.geolocation.watchPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map.value.setView([lat, lng], 13);

      if (userMarker.value) {
        userMarker.value.setLatLng([lat, lng]);
      } else {
        userMarker.value = L.marker([lat, lng], { draggable: true })
          .addTo(map.value)
          .bindTooltip("Your Location", { permanent: true, direction: 'top' })
          .on("dragend", (event) => {
            console.log(event.target.getLatLng());
          });
      }
    });
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
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
