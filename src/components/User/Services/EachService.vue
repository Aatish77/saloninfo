<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
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
        <v-app-bar-nav-icon @click.stop = "drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>

      <v-main class="bg-grey-lighten-2">
      <v-card style="height: 100vh; background-color: black;">
          <div>
          <v-breadcrumbs :items="items" style="color:white">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>
          <v-row>
           
              
          <v-col v-for="subsubCategory in subsubCategories" :key="subsubCategory"  style="border:2px black" md="3">
            <v-card  class="mx-auto card1 a" @click="navigateToEach(currentService.cat,currentService.subCat,subsubCategory.name)" max-width="344" max-height="300px">
                  <v-img
                    style="border-radius: 5px"
                    class="align-end text-white"
                    height="250"
                    :src="subsubCategory.image1"
                    cover
                  >
                  </v-img>
                  <v-card-item ><h5 class="multi-line-title">{{ subsubCategory.name }}</h5> </v-card-item></v-card>
            <!-- <v-img
              :src="subsubCategory.image1"
              height="205"
              
            ></v-img>
            <h6 align="center">{{subsubCategory.name}}</h6> -->
          </v-col>
         
         
          </v-row>
      </v-card></v-main></v-layout
  ></v-card>
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
        drawer: null,
          subsubDia:false,
          items:[],
          subsubCategories:[],
          subsubName:"",
          picsubsubUrl:"",
          subsubFile:null,
      }
  },
  created(){
      this.items = [
    { title: this.currentService.cat, href: "/services" },
    { title: this.currentService.subCat },
  ];
  this.subsubCategories=this.categories[this.currentService.catIndex].subCategories[this.currentService.subIndex].subsubCategories
  console.log(this.subsubCategories)
  },
  computed:{
    currentUser() {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      return currentUser;
    },
      currentService(){
      const currentService = JSON.parse(sessionStorage.getItem("currentService"))
      return currentService
    },
    categories(){
      return this.$store.getters["getCategories"]
    }
  },
  methods:{
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
    navigateToEach(category,subCategory,subsubCategory){
        const t={cat:category,subCat:subCategory,catIndex:this.currentService.catIndex,subIndex:this.currentService.subIndex,subsubCat:subsubCategory}
        sessionStorage.setItem("currentService",JSON.stringify(t))
        this.$router.push("/serviceparlour")
    },
  }

}
</script>
<style scoped>
.card1 {
margin-top: 10px;
color: white;
background-color: rgb(41, 41, 41);
}

</style>