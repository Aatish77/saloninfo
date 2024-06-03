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

      <v-main>
        <v-card
          style="background-color: black; color: white"
          class="mx-auto"
          max-width="1200"
        >
          <div>
            <v-breadcrumbs :items="items">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
            </v-breadcrumbs>
          </div>
          <v-container fluid v-for="item in datas.subCategories" :key="item">
             <v-row >
                
                    <!-- <v-avatar image="smirk.png" size="100"><v-img
                    :src="item.img"></v-img></v-avatar> -->
                    
                    <h1>{{ item.title }}</h1></v-row> 
            <v-row><v-col v-for="i in item.subsubCategories" :key="i">
                <v-card class="mx-auto card1" max-width="344" max-height="260px" @click="navigateToEach(datas.title,item.title,i.title,currentLabel.label)">
                  <v-img height="200px" :src="i.img" cover></v-img>

                  <v-card-item ><h5 class="multi-line-title">{{ i.title }}</h5>
                    
                  </v-card-item>
                </v-card>

            </v-col></v-row>
               
        </v-container>
        </v-card></v-main></v-layout
  ></v-card>
</template>
<script>
export default {
  data() {
    return {
      datas: {},
    };
  },
  created() {
    this.items = [
      { title: this.currentLabel.label, href: "/services" },
      { title: this.currentLabel.category },
    ];
    if(this.currentLabel.label==="Women"){
    for (let i of this.currentService.women){
        if(i.title===this.currentLabel.category){
            this.datas=i
        }
    }
  }
  else if(this.currentLabel.label==="Men"){
    for (let i of this.currentService.men){
        if(i.title===this.currentLabel.category){
            this.datas=i
        }
    }
  }
  },
  methods:{
    navigateToEach(category,subCategory,subsubCategory,label){
        const t={category:category,subCategory:subCategory,subsubCategory:subsubCategory,label:label}
        sessionStorage.setItem("currentLabel",JSON.stringify(t))
        this.$router.push("/serviceparlour")
    },
  },
  computed: {
    currentService(){
        return this.$store.getters["getServiceCategories"]
    },
    currentLabel() {
      const currentLabel = JSON.parse(sessionStorage.getItem("currentLabel"));
      return currentLabel;
    },
  },
};
</script>
<style scoped>
.multi-line-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* number of lines to show */
  overflow: hidden;
}
body {
  background-color: black;
  color: white;
}
.card1 {
  color: white;
  background-color: rgb(41, 41, 41);
}
.round-img {
  border-radius: 50%;
  
  /* margin-bottom: 50px; */
  margin-left: 120px;
  padding: 50px;
}
.square-image {
  width: 100%; /* Set the width to 100% */
   /* 1:1 Aspect Ratio */
  position: relative;
  overflow: hidden;
}

.square-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}</style>
