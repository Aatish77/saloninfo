<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <v-app-bar
        style="z-index: 1"
        color="teal-darken-4"
        image="https://4kwallpapers.com/images/walls/thumbs_3t/10974.jpg"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>
        

        <template v-slot:prepend>
          <i class="fas fa-cut"></i>
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
          <v-text-field
            class="search"
            v-model="searchText"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
            hide-details
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

      <v-main>
        <v-card
          style=" color: white"
          class="mx-auto bgcolor"
          max-width="1500"
        >
          <v-container fluid v-if="filteredCards.length !== 0">
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

                  <v-img height="250" :src="card.src" cover></v-img>

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
            <h1 align="center" class="mt-5">No search results found.</h1>
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
            <v-col cols="9">
              <v-list-item
            lines="two"
            :prepend-avatar='currentUser.image'
            subtitle="Logged in"
            :title="currentUser.fullName"
          >
          </v-list-item>
  </v-col><v-col cols="3">
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
          <v-list-item
            :prepend-avatar= 'require("@/assets/man2.png")'
            title="Men"
            value="account"
          ></v-list-item>
          <v-list-item
            :prepend-avatar='require("@/assets/woman.png")'
            title="Women"
            value="account"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
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

<style>
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
/* .v-select{
  background-color: rgba(245, 245, 220, 0) !important;
} */
</style>

<script>
export default {
  data: () => ({
    drawer: null,
    selectedItem: null,
    show: false,
    searchText: "",
    open: ["Users"],
    
  }),
  created(){
    sessionStorage.removeItem('currentLabel');
  },
  computed: {
    currentUser() {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      return currentUser;
    },
    cards() {
      return this.$store.getters["getSalons"];
    },
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
  watch: {
    selectedItem(newValue) {
      console.log(newValue)
      if (newValue === 'Logout') {
        this.logout();
      }
    }
  },
  methods: {
    clickProfile(){
      this.$router.push("/userpage")
    },
    serviceClick(){
      this.$router.push("/services")
    },
    offerClick(){
      this.$router.push("/offer")
    },
    logout(){
      
      console.log("logout")
      this.$router.push("/")
    },
    navigateToEach(id) {
      this.$router.push({ name: "EachParlour", params: { id: id } });
    },
    toggleSearch() {
      this.show = !this.show;
    },
  },
};
</script>
<style scoped>
.card1:hover {
  scale: 101%;
}

</style>
