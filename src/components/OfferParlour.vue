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
          style="background-color: black; color: white"
          class="mx-auto"
          max-width="1200"
          max-height="2000"
        >
        <div>
    <!-- <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs> -->
  </div>
          <v-container fluid >
            
            <v-row class="d-flex flex-wrap gap-2" dense>
              <v-col
                @click="navigateToEach(card.id)"
                v-for="card in filteredCards"
                :key="card.title"
              >
                
                <v-card 
                style="background-color: black; color: white"
                  
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-2 card1"
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

    <v-img
      height="250"
      :src="card.src"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title >{{card.parlourName}}</v-card-title>

      <v-card-subtitle>
        <span class="me-1"><i class="fas fa-map-marker-alt"></i> {{ card.location }}</span>
      </v-card-subtitle>
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

        <div class="text-grey ms-4">{{card.rating}} (413)</div>
      </v-row>
      <div class="mt-2 text-subtitle-1">{{card.offerTitle}}</div>

      

      <div>₹ {{card.offerPrice}}</div>
    </v-card-text>

    

    
  </v-card>


              </v-col>
            </v-row>
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
<script>
export default {
  data(){
    return{
      items: [
        {
          title: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          title: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          title: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      drawer: null,
    }
  },
    created(){
    //   this.items=[{title:this.currentLabel.label,href:"/services"},{title:this.currentLabel.category,href:"/eachservice"},{title:this.currentLabel.subCategory,href:"/eachservice"},{title:this.currentLabel.subsubCategory}]
        console.log(this.currentOffer)
        console.log('f',this.cards[2])
    },
    computed:{
      currentOffer(){
        const currentOffer = JSON.parse(sessionStorage.getItem("currentOffer"))
        return currentOffer
      },
        cards() {
      return this.$store.getters["getSalons"];
    },
    filteredCards() {
  return this.cards.filter(card => {
    // Filter cards based on type and services category
    return (card.type === this.currentOffer.label ||  card.type ==="Unisex" ) ;
  }).map(card => {
    // Modify the filtered cards to include service information
    let matchingOffer
    if(card.type==="Unisex"){
      
      for(let i of card.serviceCategories){
        if(i.title === this.currentOffer.label){
      matchingOffer = i.offers.find(offer => {
      return offer.title === this.currentOffer.offer ;
    });}}
    }
    else{ matchingOffer = card.offers.find(offer => {
      return offer.title === this.currentOffer.offer
    });}
    console.log("g",matchingOffer)
    if (matchingOffer) {
      
        return {
          ...card,
          offerTitle: this.currentOffer.offer,
          offerPrice: matchingOffer.price
        };
      
    } else {
      // If no matching service is found, return null
      return null;
    }
  }).filter(Boolean); // Remove any null values from the mapped array
},


    
    },
    methods: {
      navigateToEach(id){
        this.$router.push({name:"EachParlour",params:{id:id}})
      },
      offersMatchCategory(offers) {
      // Check if any service's category matches the currentLabel.title
      return offers.some(offer => offer.title === this.currentLabel.offer);
    }
  }
    
}
</script>
<style scoped>
.card1 {
  width: 250px !important;
  height: 400px;
}
</style>