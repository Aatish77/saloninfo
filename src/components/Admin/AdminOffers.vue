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
          <!-- <v-list-item
            prepend-icon="mdi-account"
            title="Pending Requests"
            value="account"
            @click="clickProfile"
          ></v-list-item> -->
          <v-list-item
            prepend-icon="fas fa-tags"
            title="Parlours"
            value="account"
            @click="parlourClick"
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
        <!--  -->
      </v-navigation-drawer>
<!--   
      <v-main class="bg-grey-lighten-2">
        <v-card>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
     
      <v-tab :value="2">Men</v-tab>
      <v-tab :value="1">Women</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                height="205"
                cover
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
      </v-main> -->
      
      <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">Elegant Contact Form</h1>
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6"  offset-md="2" class="custom-margin">
              <v-text-field
                v-model="name"
                label="Name"
                outlined
                dense
                required
              ></v-text-field>
              <v-textarea
                v-model="description"
                label="Description"
                outlined
                dense
                required
                rows="5"
              ></v-textarea>
              <v-file-input
                v-model="image"
                label="Image"
                outlined
                dense
                required
                @change="imageChange"
              ></v-file-input>
            </v-col>
            <!-- <v-col cols="12" md="6">
              
            </v-col> -->
          </v-row>
          <v-btn type="submit" color="black" class="white--text mt-3" style="width: 400px; border-radius: 16px;">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>


</v-app>
</template>
  
<!-- <script setup>

  </script> -->
  
  <script>
  
    export default {
      data: () => ({ drawer: null,
        tab: null,
        name: '',
       description: '',
      image: '',
      picUrl:''
      
       }),
       methods: {
        handleSubmit() {
      // Handle form submission logic
      console.log({
        name: this.name,
        description: this.description,
        image: this.image,
        
        
      });
      const formData = new FormData(); 
      // newblob in it json new blob application/json
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('image', this.picUrl);
    },
    overviewClick(){
      this.$router.push("/overview")
    },
    serviceClick(){
      this.$router.push("/adminservices")
    },
    parlourClick(){
      this.$router.push("/adminparlours")
    },
    offerClick(){
    this.router.push("/adminoffers")
    },
    logout(){
      
      console.log("logout")
      this.$router.push("/")
    },
    imageChange(event){
        this.picUrl = event.target.files[0];
    }
  }
    }
  </script>

<style scoped>

h1 {
    margin-top: 54px;
    text-align: center;
    color: black;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 1);
}

 .v-form {
  max-width: 600px;
  text-align: center;
  margin: 20px auto;
}

.v-text-field, .v-textarea, .v-file-input {
  margin-top: 1em;
  width: 400px;
}
.custom-margin {
  margin-left: 90px; /* Adjust this value to move the fields to the right */
}
</style>