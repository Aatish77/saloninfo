<template>
    <div style="background-color: black; color: white;">
      <div ref="mapContainer" style="width: 100%; height: 500px"></div>
    </div>
  </template>
  
  <script>
  import L from "leaflet";
  import redMarkerIcon from "@/assets/redmarker.png"; // Ensure you have a red marker image in your assets
  
  export default {
    props: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        map: null,
        userMarker: null
      };
    },
    mounted() {
      this.mapContainer = this.$refs.mapContainer;
  
      if (this.mapContainer) {
        this.map = L.map(this.mapContainer).setView([this.latitude, this.longitude], 15); // Increased zoom level to 15
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 25,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
  
        const redIcon = L.icon({
          iconUrl: redMarkerIcon,
          iconSize: [25, 41],
          iconAnchor: [2, 30],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });
  
        this.userMarker = L.marker([this.latitude, this.longitude], { icon: redIcon })
          .addTo(this.map)
          .bindTooltip(this.name, {
            permanent: true,
            direction: "top",
          });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  