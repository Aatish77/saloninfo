<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="100%">
    <v-layout>
      <v-app-bar
        style="z-index: 1;background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
        color="teal-darken-4"
        
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(255,255,255,.0), rgba(255,255,255,.2)"
          ></v-img>
        </template>
        

        <template v-slot:prepend>
          <img :src="require('@/assets/salonlog.jpg')" alt="Logo" height="50">
          <!-- <v-img :src="require('@/assets/logowhite.png')" alt="Logo" height="40"></v-img> -->
          <!-- <v-img src="@/assets/logowhite.png" alt="Logo" height="40"></v-img> -->
          <!-- <i class="fas fa-cut"></i> -->
        </template>

        <v-app-bar-title
          style="
            margin-left: 2px;
            font-size: 30px;
            font-weight: 800;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          "
          >saloninfo</v-app-bar-title
        >
       <v-slide-y-transition class="mx-3">
  <v-btn @click="dia=!dia" style="width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
    <v-icon style="font-size: 170%">mdi-map-marker-radius</v-icon>
    <span style="display: inline-block; max-width: 150px; overflow: hidden; text-overflow: ellipsis; vertical-align: middle;">
      {{ selectedPlace.name ? selectedPlace.name : "Location" }}
    </span>
  </v-btn>
</v-slide-y-transition>


        <v-slide-y-transition class="mx-3">
         
          <v-text-field
           v-model="searchText"
        
        append-inner-icon="mdi-magnify"
        density="compact"
        placeholder="Search"
       
        hide-details
        
        @click:append-inner="onClick"
      ></v-text-field>
        </v-slide-y-transition>

        <!-- Location Input -->
        <!-- <v-slide-y-transition class="mx-3 mt-3">
    <v-text-field
      v-model="location"
      placeholder="Enter your location"
      prepend-inner-icon="mdi-map-marker"
      solo-inverted
      hide-details
      @input="fetchNearbySalons"
    ></v-text-field>
  </v-slide-y-transition> -->
        <v-spacer></v-spacer>
        <!-- <v-card class="mx-auto" width="200">
          <v-list v-model:opened="open">
            <v-list-group value="Users">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                    prepend-icon="mdi-account-circle"
                  title="Users"
                ></v-list-item>
              </template>
              <v-list-item
                style="z-index: 100 !important"
                prepend-icon="mdi-home"
                title="Home"
              ></v-list-item>
            </v-list-group>
          </v-list>
        </v-card> -->
        <!-- <v-select 
  :items="['Logout']"
  v-model="selectedItem"
>
  <template #label>
    <div style="display: flex; align-items: center;">
      <h4 style="margin-left:80px; margin-right: 10px; margin-top: 15px;">{{currentUser.fullName}} </h4>
      
      <v-avatar style="margin-top: 5px;">
        <v-img src="https://img.freepik.com/free-photo/close-portrait-man-with-beard-all-face-snow-snowy-forest_343596-4609.jpg?w=996&t=st=1714026882~exp=1714027482~hmac=123975867a0075aee012ece59b12d3eabfa90f2e848983aec784d0d7750d3c7e"></v-img>
      </v-avatar>
    </div>
  </template>
</v-select> -->

        <!-- Search bar -->

        <!-- <h6 class="user mx-2">Hi, {{ currentUser.fullName }}</h6> -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>

      <v-main > 
      <v-dialog v-model="dia">
        <button class="close-btn" @click="dia = false">
                      X
                    </button>
        <location-search @child-value-updated="handleChildValueChange"></location-search></v-dialog>
        <v-card
          style=" color: white;background-color:black;"
          class="mx-auto bgcolor"
          max-width="100%"
          min-height="100vh"
        >
          <v-container fluid v-if="filteredCards.length !== 0" >
            <h4 class="text-center" v-if="searchText">
              Showing results of: {{ searchText }}
            </h4>
            <v-row class="d-flex flex-wrap gap-2" dense>
              <v-col class="a"
                @click="navigateToEach(card.id)"
                v-for="card in filteredCards"
                :key="card.title"
              >
                <v-card
                  style="background-color: black; color: white"
                  :loading="loading"
                  class="mx-auto my-0 card1"
                  max-width="374"
                >
                  <template v-slot:loader="{ isActive }">
                    <v-progress-linear
                      :active="isActive"
                      color="deep-purple"
                      height="4"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img height="250" :src="`data:image/png;base64,${card.image}`" cover>
                    <v-tooltip  location="top">

                      <template v-slot:activator="{ props }">
                        <div class="overlay-text" v-bind="props" @mouseenter="showTooltip(card.id)"
                        @mouseleave="hideTooltip">
                          <svg-icon type="mdi" :path="iconPath(card.type)"></svg-icon>
                        </div>
                      </template>
                      <span v-if="visibleTooltip === card.id">{{ getTooltipMessage(card.type) }}</span>
                    </v-tooltip>
                  </v-img>


                  <v-card-item>
                    <h5 class="multi-line-title">{{ card.parlourName }}</h5>
                  </v-card-item>

                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :model-value="card.rating"
                        color="amber"
                        density="compact"
                        size="small"
                        half-increments
                        readonly
                      ></v-rating>

                      <div class="text-grey ms-4">{{ card.rating }} (413)</div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                      <i class="fas fa-map-marker-alt"></i> {{ card.location }}
                    </div>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid v-else>
            <h1 align="center" class="mt-5">No search results found</h1>
          </v-container>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary location="right" style="background-color: black; color:white;">
        <template v-slot:prepend>
          <v-row>
            <!-- <v-col cols="9">
              <v-list-item
            lines="two"
            :prepend-avatar='currentUser.image'
            subtitle="Logged in"
            :title="currentUser.fullName"
          >
          </v-list-item>
  </v-col> -->
  <v-col cols="3">
    <v-btn icon @click="drawer = false" style="background-color: black; color: white; ">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    
          
        </v-col>
        </v-row>
          
        </template>


        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
            @click="clickProfile"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-briefcase"
            title="Services"
            value="account"
            @click="serviceClick"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-tags"
            title="Offers"
            value="account"
            @click="offerClick"
          ></v-list-item>
          
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout"> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      
    </v-layout>
  </v-card>
</template>

<style scoped>

.bgcolor{
  background-color: rgb(0, 0, 0);
}
.multi-line-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* number of lines to show */
  overflow: hidden;
}
.a :hover{
 cursor: pointer;
}
.search {
  background-color: rgba(240, 248, 255, 0) !important;
}
.user {
  margin-left: 2px;
}
.card1 {
  width: 250px !important;
  height: 400px;
}
.overlay-text {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5); /* Optional: Add a semi-transparent background for better visibility */
  padding: 5px;
  border-radius: 5px;
}
/* .v-select{
  background-color: rgba(245, 245, 220, 0) !important;
} */
</style>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHumanFemaleGirl } from '@mdi/js';
import { mdiHumanMaleChild } from '@mdi/js';
import { mdiHumanMaleFemale } from '@mdi/js';
import LocationSearch from "./LocationSearch.vue"
// import L from 'leaflet';
export default {
  name: "my-component",
  components: {
  LocationSearch,
    SvgIcon
  },
  data: () => ({
    selectedPlace: {},
    salons: [],
    dia: false,
    drawer: null,
    selectedItem: null,
    show: false,
    path: mdiHumanFemaleGirl,
    searchText: "",
    open: ["Users"],
    visibleTooltip: '',
    nearbyPlaces: [],
    map: null,
    userMarker: null,
    nearbyRadius: 10,
  }),

  created(){
    sessionStorage.removeItem('currentOffer')
    sessionStorage.removeItem('currentLabel');
    this.loadSelectedPlace()
    
  },
  computed: {
    cards(){
      return this.$store.getters.getAllParlours;
    },
    
    currentUser() {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      return currentUser;
    },
    // cards() {
    //   if(this.salons.length===0){
    //     return this.$store.getters["getSalons"];
    //   }
    //   else{
    //   return this.salons}
    // },
    filteredCards() {
      if (!this.searchText) {
        return this.cards;
      }

      const regex = new RegExp(this.searchText.trim(), "i");
      return this.cards.filter((card) => {
        // Check if parlourName or location matches searchText
        if (
          regex.test(card.parlourName) ||
          regex.test(card.location) ||
          regex.test(card.type)
        ) {
          return true;
        }

        // Check if any service.title or offer.name matches searchText
        for (const service of card.services) {
          if (regex.test(service.title)) {
            return true;
          }
          if(service.subsubCategories){
          for(const subsub of service.subsubCategories){
            if(regex.test(subsub.title)){
              return true
            }
          }}
        }

        for (const offer of card.offers) {
          if (regex.test(offer.name)) {
            return true;
          }
        }

        return false;
      });
    },
  },
  // watch: {
  //   selectedItem(newValue) {
  //     console.log(newValue)
  //     if (newValue === 'Logout') {
  //       this.logout();
  //     }
  //   }
  // },
mounted(){
this.getparlours();
console.log(this.cards);
// this.$store.dispatch('eachParlours')
},

  methods: {
    async getparlours(){
    await this.$store.dispatch('parlourList')
    },

    loadSelectedPlace() {
      const savedPlace = localStorage.getItem('selectedPlace');
      
      if (savedPlace) {
        this.selectedPlace = JSON.parse(savedPlace);
        if (this.selectedPlace.latitude && this.selectedPlace.longitude) {
          console.log("place",this.selectedPlace)
          // this.displayNearbyPlaces(this.selectedPlace.latitude, this.selectedPlace.longitude, this.nearbyRadius);
        }
        return true;
      }
      return false;
    },
    // displayNearbyPlaces(lat, lng, radius) {
    //   console.log("salons",this.salons)
      // if (!this.map) return;

      // this.nearbyPlaces.forEach(place => {
      //   this.map.removeLayer(place.marker);
      // });
      // this.nearbyPlaces = [];

      // this.allsalons.forEach(place => {
      //   const distance = this.calculateDistance(lat, lng, place.latitude, place.longitude);
      //   if (distance <= radius) {
          // const marker = L.marker(
          //   [place.latitude, place.longitude],
          //   {
          //     icon: L.icon({
          //       iconUrl: require("@/assets/redmarker.png"),
          //       iconSize: [25, 41],
          //     })
          //   }
          // ).addTo(this.map)
          //   .bindTooltip(place.parlourName, {
          //     permanent: true,
          //     direction: 'top',
          //     offset: [0, -20]
          //   })
          //   .bindPopup(place.name);

          // marker.on('click', () => {
          //   this.navigateToEach(place.id);
          // });

          // this.nearbyPlaces.push({ ...place, marker });
      //     if (distance <= 10) {
      //       this.salons.push(place);
      //   }
        
      //   }
      // });},
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    // navigateToEach(id) {
    //   this.$router.push({ name: "EachParlour", params: { id: id } });
    // },
    handleChildValueChange(value) {
      this.salons = value.salons;
      this.selectedPlace = value.place;
    },
    iconPath(type) {
      if (type === 'Men') {
        return mdiHumanMaleChild;
      } else if (type === 'Women') {
        return mdiHumanFemaleGirl;
      } else if (type === 'Unisex') {
        return mdiHumanMaleFemale;
      }
    },
    getTooltipMessage(type) {
      if (type === 'Men') {
        return 'Men Services';
      } else if (type === 'Women') {
        return 'Women Services';
      } else if (type === 'Unisex') {
        return 'Unisex Services';
      }
      return 'Services';
    },
    clickProfile() {
      this.$router.push("/userpage");
    },
    serviceClick() {
      this.$router.push("/services");
    },
    offerClick() {
      this.$router.push("/offer");
    },
    logout(){
      
      console.log("logout")
      this.$router.push("/")
    },
   async navigateToEach(id) {
    console.log('navigating.....')
    console.log(id)
    try{
      const response= await this.$store.dispatch('eachParlours',id);
   if(response){
    console.log(response)
    this.$router.push({ name: "EachParlour", params: { id: id }});
   }
    }
   catch(error){
    console.error(error)
   }
      // this.$router.push({ name: "EachParlour", params: { id: id } });
    },
    toggleSearch() {
      this.show = !this.show;
    },
    showTooltip(id) {
      this.visibleTooltip = id;
    },
    hideTooltip() {
      this.visibleTooltip = null;
    },
  },
};
</script>
<style scoped>
.card1:hover {
  scale: 101%;
}
img{
  border-radius: 50%;
}
.close-btn {
  position: relative;
  margin-left:1440px;
  margin-bottom:5px;
  height: 40px;
  width: 40px;
 
  background-color: transparent;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  color: #fffcfc;
  font-size: 20px;
  cursor: pointer;
}

</style>
