<template>
  <div style="background-color: black;color:white;">
    <v-text-field
     max-width="400"
     style="margin-left:50px;margin-top:7px;margin-bottom:7px"
        :loading="loading"
        append-inner-icon="mdi-map-marker-radius"
        density="compact"
        label="Search templates"
        v-model="query" 
      @input="fetchSuggestions" 
      placeholder="Enter a location" 
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
    
    <ul v-if="suggestions.length" style="position: absolute; z-index: 1000; background-color: black; margin-left: 50px;">
      <li 
        v-for="suggestion in suggestions" 
        :key="suggestion.place_id" 
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.display_name }}
      </li>
    </ul>
    <div ref="mapContainer" style="width: 100%; height: 500px"></div>
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
      nearbyPlaces: [],
      selectedPlace: null,
      map: null,
      mapContainer: null,
      userMarker: null,
      nearbyRadius: 10,
      nearbySalons: [],
     
    };
  },
  watch: {
    nearbySalons(value) {
      this.$emit('child-value-updated', { salons: value, place: this.selectedPlace });
      
    }
  },
  methods: {
    
    fetchSuggestions() {
      if (this.query.length > 2) {
        axios
          .get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.query}`)
          .then(response => {
            this.suggestions = response.data;
          })
          .catch(error => {
            console.error('Error fetching suggestions:', error);
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
        longitude: selectedLon
      };

      this.map.setView([selectedLat, selectedLon], 10);
      this.userMarker.setLatLng([selectedLat, selectedLon]);
      this.userMarker.setTooltipContent(this.selectedPlace.name);

      this.saveSelectedPlace();

      this.displayNearbyPlaces(selectedLat, selectedLon, this.nearbyRadius);
      this.suggestions = [];
    },
    saveSelectedPlace() {
      localStorage.setItem('selectedPlace', JSON.stringify(this.selectedPlace));
      localStorage.setItem('savedSalons', JSON.stringify(this.nearbySalons));
    },
    loadSelectedPlace() {
      const savedPlace = localStorage.getItem('selectedPlace');
      // const savedSalons =localStorage.getItem('savedSalons')
      if (savedPlace) {
        this.selectedPlace = JSON.parse(savedPlace);
        this.query=this.selectedPlace.name
        return true;
      }
      return false;
    },
    displayNearbyPlaces(lat, lng, radius) {
    this.nearbyPlaces.forEach(place => {
      this.map.removeLayer(place.marker);
    });
    this.nearbyPlaces = [];
    this.nearbySalons = [];

    this.salons.forEach(place => {
      const distance = this.calculateDistance(lat, lng, place.latitude, place.longitude);
      if (distance <= radius) {
        const marker = L.marker(
          [place.latitude, place.longitude], 
          { 
            icon: L.icon({ 
              iconUrl: require("@/assets/redmarker.png"), 
              iconSize: [25, 41], 
            }) 
          }
        )
        .addTo(this.map)
        .bindTooltip(place.parlourName, { 
          permanent: true, 
          direction: 'top',
          offset: [0, -20]
        })
        .bindPopup(place.name);

        marker.on('click', () => {
          this.navigateToEach(place.id);
        });

        this.nearbyPlaces.push({ ...place, marker });

        if (distance <= 10) {
          this.nearbySalons.push(place);
        }
      }
    });
  },
  navigateToEach(id) {
    this.$router.push({ name: "EachParlour", params: { id: id } });
  },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  },
  computed: {
    salons() {
      return this.$store.getters["getSalons"];
    }
  },
  mounted() {
    this.mapContainer = this.$refs.mapContainer;

    if (this.mapContainer) {
      this.map = L.map(this.mapContainer).setView([10.8505, 76.2711], 7);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      this.userMarker = L.marker([10.8505, 76.2711], { draggable: true })
        .addTo(this.map)
        .bindTooltip("Drag to select location", {
          permanent: true,
          direction: "top",
        })
        .on("dragend", (event) => {
          const latlng = event.target.getLatLng();
          this.selectedPlace = {
            name: 'Selected Location',
            latitude: latlng.lat,
            longitude: latlng.lng,
          };
          this.map.setView(latlng, 10);
          this.userMarker.setLatLng([latlng.lat, latlng.lng]);
          this.userMarker.setTooltipContent(this.selectedPlace.name);

          this.saveSelectedPlace();
          this.displayNearbyPlaces(this.selectedPlace.latitude, this.selectedPlace.longitude, this.nearbyRadius);
        });

      if (this.loadSelectedPlace()) {
        const { latitude, longitude } = this.selectedPlace;
        this.map.setView([latitude, longitude], 10);
        this.userMarker.setLatLng([latitude, longitude]);
        this.userMarker.setTooltipContent(this.selectedPlace.name);
        this.displayNearbyPlaces(latitude, longitude, this.nearbyRadius);
      }
    }
  }
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
  background-color: #282828;
}
</style>
