<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <!-- App Bar -->
      <v-app-bar
        color="teal-darken-4"
        style="background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
      >
        <template v-slot:image>
          <v-img gradient="to top right, rgba(255,255,255,.0), rgba(255,255,255,.2)"></v-img>
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
        >
          saloninfo
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </v-app-bar>
      
      <!-- Main Content -->
      <v-main>
        <v-card style="background-color: black; color: white;" class="mx-auto" max-width="1200">
          <v-container fluid>
            <v-row dense>
              <v-col :cols="12">
                <v-card style="background-color: black; color: white;">
                  <!-- Image Section -->
                  <v-img
                    :src="`data:image/png;base64,${parlourcard.coverImage}`"
                    alt="Slideshow"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="500px"
                    cover
                  >
                    <v-img
                      :src="`data:image/png;base64,${parlourcard.image}`"
                      alt="Profile Photo"
                      height="auto"
                      width="170"
                      class="profile-photo"
                    ></v-img>
                    <v-card-title class="text-white" style="font-size: 30px" v-text="parlourcard.parlourName"></v-card-title>
                  </v-img>
                  
                  <!-- Card Actions -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="text-end" @click="toggleEditDialog">
                      <i class="fas fa-edit"></i> Edit
                    </v-btn>
                  </v-card-actions>
                  
                  <!-- About Section -->
                  <h1>About</h1>
                  <v-row>
                    <v-col :cols="8">
                      <p>{{ parlourcard.description }}</p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            
            <!-- Services Section -->
            <h1 class="mt-3">Services</h1>
            <v-row class="book" v-for="(service, index) in services" :key="index">
              <v-col :cols="12" md="6" v-if="index % 2 === 0">
                <v-img class="round-img square-image" :src="service.img" height="300px" width="300px"></v-img>
              </v-col>
              <v-col :cols="12" md="6" v-else>
                <h1 class="hc1">{{ service.title }}</h1>
                <p class="pc">{{ service.desc }}</p>
              </v-col>
              <v-col :cols="6" v-if="index % 2 !== 0">
                <v-img class="round-img square-image" :src="service.img" height="300px" width="300px"></v-img>
              </v-col>
              <v-col :cols="6" v-else>
                <h1 class="hc1">{{ service.title }}</h1>
                <p class="pc">{{ service.desc }}</p>
              </v-col>
            </v-row>
            
            <!-- Offers Section -->
            <h1 class="mt-3">Offers</h1>
            <v-row class="mt-3">
              <v-col class="book" v-for="offer in parlourcard.offers" :key="offer.title" :cols="4">
                <v-card style="background-color: black; color: white;" class="mx-auto" max-width="400">
                  <v-img
                    style="border-radius: 5px"
                    class="align-end text-white mx-3"
                    height="300"
                    :src="offer.img"
                    cover
                  >
                    <v-card-title>{{ offer.title }}</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pt-2 mb-0">
                    Price: <span style="text-decoration: line-through">₹{{ offer.mrp }}</span>
                  </v-card-subtitle>
                  <v-card-text class="pt-0">
                    <div>Offer Price: ₹{{ offer.price }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        
        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="800px">
          <v-card style="color:white; background-color: black;">
            <v-card-title>Edit Salon Information</v-card-title>
            <v-card-text>
              <v-text-field v-model="editedCard.parlourName" label="Title" required></v-text-field>
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    v-model="coverImage"
                    @change="previewCoverImage"
                    label="Change Cover Image"
                    prepend-icon="mdi-camera"
                    variant="filled"
                  ></v-file-input>
                  <v-img v-if="coverImage" :src="coverImage" width="100px" height="100px" class="my-2"></v-img>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="editedCard.src"
                    @change="previewProfileImage"
                    label="Change Profile Photo"
                    prepend-icon="mdi-camera"
                    variant="filled"
                  ></v-file-input>
                  <v-img v-if="editedCard.src" :src="editedCard.src" width="100px" height="100px" class="my-2"></v-img>
                </v-col>
              </v-row>
              <v-textarea v-model="editedCard.description" label="About" required auto-grow></v-textarea>
              <v-text-field v-model="editedCard.location" label="Location" required></v-text-field>
              <v-text-field v-model="editedCard.phone" label="Phone" required></v-text-field>
              <v-text-field v-model="editedCard.email" label="Email" required></v-text-field>
              
              <!-- Services Edit -->
              <v-card-text>
                <h3>Services</h3>
                <v-row v-for="(service, index) in editedCard.services" :key="index">
                  <v-col cols="6">
                    <v-text-field v-model="service.title" label="Service Title" required></v-text-field>
                    <v-textarea v-model="service.desc" label="Description" required></v-textarea>
                  </v-col>
                  <v-col cols="6">
                    <v-file-input v-model="service.img" label="Service Image" prepend-icon="mdi-camera" variant="filled"></v-file-input>
                  </v-col>
                </v-row>
                <v-btn @click="addService">Add New Service</v-btn>
              </v-card-text>
              
              <!-- Offers Edit -->
              <v-card-text>
                <h3>Offers</h3>
                <v-row v-for="(offer, index) in editedCard.offers" :key="index">
                  <v-col cols="6">
                    <v-text-field v-model="offer.title" label="Offer Title" required></v-text-field>
                    <v-textarea v-model="offer.desc" label="Description" required></v-textarea>
                  </v-col>
                  <v-col cols="6">
                    <v-file-input v-model="offer.img" label="Offer Image" prepend-icon="mdi-camera" variant="filled"></v-file-input>
                  </v-col>
                </v-row>
                <v-btn @click="addOffer">Add New Offer</v-btn>
              </v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="editDialog = false">Cancel</v-btn>
              <v-btn @click="saveChanges">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      editDialog: false,
      coverImage: null,
      editedCard: {
        parlourName: '',
        src: '',
        description: '',
        location: '',
        phone: '',
        email: '',
        services: [],
        offers: [],

      },
     
    };
  },
  computed:{
   services(){
    return this.$store.getters.getServiceList;
   },
   parlourcard(){
          return this.$store.getters["getCurrentSalon"];
  
        },
  },
  async mounted(){
    try{
   
      await this.$store.dispatch('serviceList',this.parlourcard.id)
    }
    catch(error){
      console.error(error);
    }
    console.log('servicelist',this.services)
  },
  methods: {
    toggleEditDialog() {
      this.editDialog = !this.editDialog;
    },
    previewCoverImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => (this.coverImage = e.target.result);
        reader.readAsDataURL(file);
      }
    },
    previewProfileImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => (this.editedCard.src = e.target.result);
        reader.readAsDataURL(file);
      }
    },
    addService() {
      this.editedCard.services.push({
        title: '',
        desc: '',
        img: ''
      });
    },
    addOffer() {
      this.editedCard.offers.push({
        title: '',
        desc: '',
        img: '',
        price: 0,
        mrp: 0
      });
    },
    saveChanges() {
      // Logic to save changes
      this.parlourcard = { ...this.editedCard };
      this.parlourcard.image = this.coverImage || this.parlourcard.image; // Update the cover image if changed
      this.editDialog = false;
    }
  }
};
</script>

<style scoped>
.profile-photo {
  border-radius: 50%;
  border: 2px solid white;
}
.round-img {
  border-radius: 10px;
}
.square-image {
  border-radius: 5px;
}
</style>
