<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        style="background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
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

        <v-spacer></v-spacer>
<!-- offers id ,name ,description -->
 <!-- categoryid , categoryName -->
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main class="card"><v-row>
        <v-col :cols="3"><v-btn @click="allCats">All cats</v-btn></v-col>
        <v-col :cols="3"><v-btn @click="viewCat">View cats</v-btn></v-col>
        <v-col :cols="3"><v-btn @click="viewSubCat">View sub cats</v-btn></v-col>
        <v-col :cols="3"><v-btn @click="viewSubsubCat">View sub sub cats</v-btn></v-col>
      
      </v-row><v-row>        <v-col :cols="3">
        <v-text-field
        style="color:white"
                  v-model="catName"
                  label="Category Name"
                  variant="underlined"
                  
                ></v-text-field></v-col>
                <v-col :cols="3">
        <v-file-input
                ref="cat"
                  style="color: white"
                  :label="uploadedCatFileName"
                  v-model="catFile"
                  accept="image/*"
                  outlined
                  @change="catPhoto"
                >
                </v-file-input></v-col>
                <v-col :cols="3">
                <v-btn @click="addCat">Add category</v-btn></v-col></v-row><v-row> 
                  <v-col :cols="3">
        <v-text-field
        style="color:white"
                  v-model="subName"
                  label="Sub category Name"
                  variant="underlined"
                  
                ></v-text-field></v-col>
                <v-col :cols="3">
        <v-file-input
                ref="sub"
                  style="color: white"
                  :label="uploadedFileName"
                  v-model="subFile"
                  accept="image/*"
                  outlined
                  @change="subPhoto"
                >
                </v-file-input></v-col>
                <v-col :cols="3">
                <v-btn @click="addSubcat">Add sub category</v-btn></v-col></v-row>
                <v-row>        <v-col :cols="3">
        <v-text-field
        style="color:white"
                  v-model="subsubName"
                  label="Sub sub category Name"
                  variant="underlined"
                  
                ></v-text-field></v-col>
                <v-col :cols="3">
        <v-file-input
                ref="subsub"
                  style="color: white"
                  :label="uploadedsubsubFileName"
                  v-model="subsubFile"
                  accept="image/*"
                  outlined
                  @change="subsubPhoto"
                >
                </v-file-input></v-col>
                <v-col :cols="3">
                <v-btn @click="addSubsubcat">Add sub sub category</v-btn></v-col></v-row>
        <v-card class="mx-auto" max-width="600">
          <v-toolbar color="secondary">
            <v-toolbar-title>Pending Requests</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon="mdi-magnify" variant="text"></v-btn>

            <v-btn icon="mdi-view-module" variant="text"></v-btn>
          </v-toolbar>

          <v-list class="lists" lines="two">
            <v-list-item
              class="list"
              v-for="(salon, index) in salonsPending"
              :key="salon"
              :subtitle="salon.location"
              :title="salon.parlourName"
              ><v-dialog v-model="viewDialog" max-width="800px">
                <v-card class="card12">
                  <v-btn
                    class="align-self-end"
                    icon
                    @click="viewDialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <div class="image-container">
                    <v-img
                      :src="salonsPending[selectedSalon].parlourPic"
                      class="align-end"
                      height="200px"
                      ><v-card-title>{{
                        salonsPending[selectedSalon].parlourName
                      }}</v-card-title></v-img
                    >

                    <v-card-text>
                      <h6>
                        <i class="fas fa-map-marker-alt"></i>
                        {{ salonsPending[selectedSalon].location }}
                      </h6>
                      <h6>
                        <i class="fas fa-phone"></i>
                        {{ salonsPending[selectedSalon].phone }}
                      </h6>
                      <h6>
                        <i class="fas fa-envelope"></i>
                        {{ salonsPending[selectedSalon].email }}
                      </h6>
                    </v-card-text>
                  </div>

                  <v-card-text>
                    <h6>Description:</h6>
                    <p>{{ salonsPending[selectedSalon].description }}</p>
                    <h6>
                      License Number:
                      {{ salonsPending[selectedSalon].licenseNo }}
                    </h6>
                    <h6>
                      License:
                      <a :href="salonsPending[selectedSalon].license"
                        >View License</a
                      >
                    </h6>
                  </v-card-text>

                  <v-card-actions class="button-container">
                    <v-btn
                      class="prev-button"
                      style="background-color: black; color: white !important"
                      variant="text"
                      @click="prevSalon"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn
                      style="background-color: white; color: black !important"
                      variant="text"
                      @click="accept(selectedSalon)"
                      >Accept</v-btn
                    >
                    <v-btn
                      style="background-color: white; color: black !important"
                      variant="text"
                      @click="reject"
                      >Reject</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      class="next-button"
                      style="background-color: black; color: white !important"
                      variant="text"
                      @click="nextSalon"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <template v-slot:prepend>
                <v-avatar color="grey-lighten-1">
                  <!-- <v-icon color="white">mdi-account</v-icon> -->
                  <v-img :src="salon.parlourPic"></v-img>
                </v-avatar>
              </template>

              <template v-slot:append>
                <v-btn
                  class="btn1"
                  color="grey-lighten-1"
                  variant="text"
                  @click="toggleViewDialog(index)"
                  >View</v-btn
                >
                <v-btn
                  class="btn1"
                  color="grey-lighten-1"
                  variant="text"
                  @click="accept(index)"
                  >Accept</v-btn
                >
              </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <!-- Additional fields to display when a list item is clicked -->
          </v-list>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      subName:"",
      catName:"",
      subsubName:"",
      picUrl:"",
      piccatUrl:"",
      picsubsubUrl:"",
      catFile:null,
      subFile:null,
      subsubFile:null,
      viewDialog: false,
      selectedSalon: null,
    };
  },
  computed: {
    uploadedFileName() {
      if (this.subFile) {
        return this.subFile.name;
      }
      return "Upload Subcategory Photo";
    },
    uploadedCatFileName() {
      if (this.catFile) {
        return this.catFile.name;
      }
      return "Upload Category Photo";
    },
    uploadedsubsubFileName() {
      if (this.subsubFile) {
        return this.subsubFile.name;
      }
      return "Upload Subsubcategory Photo";
    },
    salonsPending() {
      return this.$store.getters["getSalonsPending"];
    },
  },
  methods: {
    allCats(){
      console.log(this.$store.getters["getCategories"])
    },
    subsubPhoto(){
      const imgInput = this.$refs.subsub.files[0];
       
       const reader = new Image();
 
       reader.onload = () => {
         this.picsubsubUrl = imgInput;
       }
 
       reader.src = URL.createObjectURL(imgInput);
    },
    subPhoto(){
      const imgInput = this.$refs.sub.files[0];
       
       const reader = new Image();
 
       reader.onload = () => {
         this.picUrl = imgInput;
       }
 
       reader.src = URL.createObjectURL(imgInput);
    },
    catPhoto(){
      const imgInput = this.$refs.cat.files[0];
       
       const reader = new Image();
 
       reader.onload = () => {
         this.piccatUrl = imgInput;
       }
 
       reader.src = URL.createObjectURL(imgInput);
    },
    nextSalon() {
      if (this.selectedSalon < this.salonsPending.length - 1) {
        this.selectedSalon++;
      }
    },
    prevSalon() {
      if (this.selectedSalon > 0) {
        this.selectedSalon--;
      }
    },
    toggleViewDialog(index) {
      this.selectedSalon = index;
      this.viewDialog = !this.viewDialog;
    },
    view(index) {
      if (this.selectedSalon === index) {
        this.selectedSalon = null;
      } else {
        this.selectedSalon = index;
        console.log(this.selectedSalon);
      }
    },
      addCat(){
        const jsonBlob = new Blob([JSON.stringify({"name":this.catName})], { type: 'application/json' })
        const formData = new FormData(); 
        // newblob in it json new blob application/json
        formData.append('data', jsonBlob);
        // formData.append("data",JSON.stringify({"name": this.catName}));
            // formData.append("name", this.catName);
            formData.append("image",this.piccatUrl)

          this.$store.dispatch("addCategories",formData)
          .then(() => {
                // Reset form data after successful dispatch
                console.log("Success at home")
                
                
              })
              .catch((error) => {
                console.error("Error adding user:", error);
              });
      },
    viewCat(){
      this.$store.dispatch("viewCategories")
    },
    viewSubCat(){
      this.$store.dispatch("viewSubCategories")
    },
    viewSubsubCat(){
      this.$store.dispatch("viewSubSubCategories")
    },
    addSubcat(){
      const jsonBlob = new Blob([JSON.stringify({"name":this.subName})], { type: 'application/json' })
      const formData = new FormData();
          formData.append("data", jsonBlob);
          formData.append("image",this.picUrl)
          this.$store.dispatch("addSubcategory", formData)
            .then(() => {
              // Reset form data after successful dispatch
              console.log("Success")
              // this.resetFormData();
              
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });
    },
    addsubsubCat(){
      const formData = new FormData();
          formData.append("name", this.subsubName);
          formData.append("image",this.picsubsubUrl)
          this.$store.dispatch("addSubsubcategory", formData)
            .then(() => {
              // Reset form data after successful dispatch
              console.log("Success")
              // this.resetFormData();
              
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });

    },
    accept(index) {
      
      this.salonsPending.splice(index, 1);
    },
    reject(){
      this.$store.dispatch("checkParlourStatus","5")
    }
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.prev-button,
.next-button {
  margin-top: auto;
  margin-bottom: auto;
}
.btn1 {
  visibility: hidden;
}

.list:hover .btn1 {
  visibility: visible;
}
.card {
  margin-top: 25px;
  background-color: black;
}
.lists {
  background-color: rgb(59, 59, 59);
  color: white;
}
.card12 {
  background-color: rgba(47, 46, 46, 0.331);
  color: white;
}
.image-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px; /* spacing between the image and text */
}
</style>
