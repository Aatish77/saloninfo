<template>
    <v-app id="inspire">
      
  
      <v-app-bar style="z-index: 1;background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
      color="teal-darken-4">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-app-bar-title>saloninfo</v-app-bar-title>
      </v-app-bar>
  
      <v-navigation-drawer
      style="background-color: black; color:white;"
        v-model="drawer"
        temporary
      > <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Overview"
            value="overview"
            @click="overviewClick"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-briefcase"
            title="Services"
            value="account"
            @click="serviceClick"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-tags"
            title="Parlours"
            value="account"
            @click="parlourClick"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-tags"
            title="offers"
            value="account"
            @click="offerClick"
          ></v-list-item>


         
          
          
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout"> Logout </v-btn>
          </div>
        </template>
        <!--  -->
      </v-navigation-drawer>
      <h1>OVER VIEW PAGE</h1>

    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const drawer = ref(null)
  </script>
  
  <script>
    export default {
      data: () => ({ drawer: null,
        tab: null
       }),
       methods: {
    OverviewClick(){
      this.$router.push("/overview")
    },
    serviceClick(){
      this.$router.push("/adminservices")
    },
    parlourClick(){
      this.$router.push("/adminparlours")
    },
    offerClick(){
      this.$router.push("/adminoffers")
    },
    logout(){
      
      console.log("logout")
      this.$router.push("/")
    },
  }
    }
  </script>
