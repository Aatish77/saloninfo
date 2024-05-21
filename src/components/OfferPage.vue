<template>
  <v-app style="background-color: black; color: white;">
    <v-app-bar app fixed style="z-index: 10;" color="teal-darken-4" dark image="https://4kwallpapers.com/images/walls/thumbs_3t/10974.jpg">
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
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
          ">saloninfo</v-app-bar-title>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      
        <v-container class="d-flex justify-center align-center" fluid style="height: 80px; margin-left: 500px;">
          <v-radio-group v-model="switchLabel" @change="handleSwitchChange" inline style="color:white;">
            <v-radio label="Men" value="Men" color="primary"></v-radio>
            <v-radio label="Women" value="Women" color="red"></v-radio>
          </v-radio-group>
        </v-container>
        <h1 class="mt-3" style="color:white;">Offers</h1>
        <v-row class="mt-3">
          <v-col
            class="book"
            v-for="(offer, index) in filteredOffers"
            :key="index"
            :cols="4"
          >
            <v-card style="background-color: black; color: white" class="mx-auto" max-width="400">
              <v-img style="border-radius: 5px" class="align-end text-white mx-3" height="300" :src="offer.img" cover>
                <v-card-title>{{ offer.title }}</v-card-title>
              </v-img>
              <v-card-subtitle class="pt-2 mb-0">
                Price:
                <span style="text-decoration: line-through">₹{{ offer.mrp }}</span>
              </v-card-subtitle>
              <v-card-text class="pt-0">
                <div>Offer Price: ₹{{ offer.price }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
     
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      searchText: '',
      switchLabel: 'Men',
      switchColor: 'blue',
    };
  },
  created() {
    if (this.currentLabel) {
      this.switchLabel = this.currentLabel.label;
    }
  },
  methods: {
    handleSwitchChange() {
      console.log(this.switchLabel);
    },
  },
  computed: {
    currentLabel() {
      const currentLabel = JSON.parse(sessionStorage.getItem('currentLabel'));
      return currentLabel;
    },
    filteredOffers() {
      return this.$store.getters.getoffers.filter(offer => offer.category === this.switchLabel);
    },
  },
};
</script>

<style scoped>
body {
  background-color: black;
  color: white;
  margin: 0; /* Remove default margin */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
</style>
