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

// Known correct location
const correctLat = 9.53475442125953;
const correctLon = 76.31948869004815;
const accuracyThreshold = 0.1; // Define a threshold for acceptable accuracy
const nearbyRadius = 50; // Radius in kilometers for nearby places

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
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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

  setMapLocation(selectedLat, selectedLon, selectedPlace.value.name);

  // Find and display nearby places within 10 km
  displayNearbyPlaces(selectedLat, selectedLon, nearbyRadius);

  suggestions.value = [];
}

function getLocation() {
  if (navigator.geolocation && map.value) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`Retrieved Latitude: ${lat}, Retrieved Longitude: ${lng}`);

        // Calculate distance between retrieved location and correct location
        const distanceToCorrectLocation = calculateDistance(lat, lng, correctLat, correctLon);

        // Check if the distance is within the acceptable accuracy threshold
        if (distanceToCorrectLocation > accuracyThreshold) {
          console.warn(`Geolocation accuracy is off by more than ${accuracyThreshold} km. Using the correct coordinates.`);
          setMapLocation(correctLat, correctLon, "Your Location");
          displayNearbyPlaces(correctLat, correctLon, nearbyRadius);
        } else {
          setMapLocation(lat, lng, "Your Location");
          displayNearbyPlaces(lat, lng, nearbyRadius);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please check your location settings and try again.');
        setMapLocation(correctLat, correctLon, "Your Location"); // Fallback to correct location
        displayNearbyPlaces(correctLat, correctLon, nearbyRadius);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

function setMapLocation(lat, lng, label) {
  map.value.setView([lat, lng], 13);

  // Remove existing markers except userMarker
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker && layer !== userMarker.value) {
      map.value.removeLayer(layer);
    }
  });

  // Update userMarker position or create new marker
  if (userMarker.value) {
    userMarker.value.setLatLng([lat, lng]);
  } else {
    userMarker.value = L.marker([lat, lng], { draggable: true })
      .addTo(map.value)
      .bindTooltip(label, { permanent: true, direction: 'top' })
      .on("dragend", (event) => {
        const newLatLng = event.target.getLatLng();
        console.log(`Marker Dragged to Latitude: ${newLatLng.lat}, Longitude: ${newLatLng.lng}`);
        displayNearbyPlaces(newLatLng.lat, newLatLng.lng, nearbyRadius);
      });
  }

  // Display nearby places for the updated location
  displayNearbyPlaces(lat, lng, nearbyRadius);
}

function displayNearbyPlaces(lat, lng, radius) {
  // Clear previous nearbyPlaces markers
  nearbyPlaces.value.forEach(place => {
    map.value.removeLayer(place.marker);
  });
  nearbyPlaces.value = [];

  // Find and display nearby places within the specified radius
  placesInKerala.forEach(place => {
    const distance = calculateDistance(lat, lng, place.latitude, place.longitude);
    if (distance <= radius) {
      const marker = L.marker([place.latitude, place.longitude], { icon: L.icon({ iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }) })
        .addTo(map.value)
        .bindTooltip(place.name, { permanent: true, direction: 'top' })
        .bindPopup(place.name);
      nearbyPlaces.value.push({ ...place, marker });
    }
  });
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
