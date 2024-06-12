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
  
      <v-main class="bg-grey-lighten-2">
        <v-card>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
     
      <v-tab v-for="category in categories" :key="category" :value="category.id">{{ category.name }}</v-tab>
      <v-tab value="add">+ Add category</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tab-window-item v-if="tab==='add'" style="width:600px">
        <v-col style="width:600px;margin-left: 300px;" >
        <v-text-field
        style="color:black"
                  v-model="catName"
                  label="Category Name"
                  variant="underlined"
                  
                ></v-text-field></v-col>
                <v-col style="width:600px;margin-left: 300px;">
        <v-file-input
                ref="cat"
                  style="color: black"
                  :label="uploadedCatFileName"
                  v-model="catFile"
                  accept="image/*"
                  outlined
                  @change="catPhoto"
                >
                </v-file-input></v-col>
                <v-col style="width:600px;margin-left: 300px;">
                <v-btn @click="addCat">Add category</v-btn></v-col>
      </v-tab-window-item>
      <v-tabs-window-item v-for="category in categories" :key="category" :value="category.id">
        <v-container fluid>
          <v-row v-if="category.subCategories">
            <v-col v-for="subCategory in category.subCategories" :key="subCategory" cols="12" md="4">
              <v-img
                
                :src="getImageUrl(subCategory.image)"
                height="205"
                cover
              ></v-img>
              <h6>{{ subCategory.name }}</h6>
            </v-col>
            <v-col cols="12" md="4" @click="subDia=!subDia">
              <v-img
              
                height="205"
                
              ></v-img>
              <h6 align="center">Add Sub Category</h6>
            </v-col>
            
          </v-row>
          <v-row v-else>
            <v-col cols="12" md="4" @click="subDia=!subDia">
              <v-img
                :src="require('@/assets/upload.jpg')"
                height="205"
                
              ></v-img>
              <h6 align="center">Add a Sub Category</h6>
            </v-col>
          </v-row>
          <v-dialog v-model="subDia" style="width: 600px;height: 300px;background-color: black ;border-radius: 5px;">
            
        <v-text-field
        style="color:white"
                  v-model="subName"
                  label="Sub category Name"
                  variant="underlined"
                  
                ></v-text-field>
        <v-file-input
                ref="sub"
                  style="color: white"
                  :label="uploadedFileName"
                  v-model="subFile"
                  accept="image/*"
                  outlined
                  @change="subPhoto"
                >
                </v-file-input>
                <v-btn @click="addSubcat(category.id)">Add sub category</v-btn>
          </v-dialog>
          
          
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const drawer = ref(null)
  </script>
  
  <script>
    export default {
      mounted(){
        this.$store.dispatch("viewCategories")
        this.tab= this.categories[0].id
      },
      computed:{
        categories(){
          return this.$store.getters["getCategories"]
        },
        uploadedCatFileName() {
      if (this.catFile) {
        return this.catFile.name;
      }
      return "Upload Category Photo";
    },
    uploadedFileName() {
      if (this.subFile) {
        return this.subFile.name;
      }
      return "Upload Subcategory Photo";
    },
      },
      watch:{
        tab(value){
          this.$store.dispatch("viewSubCategories",value)
        }
      },
      data: () => ({ drawer: null,
        tab: null,
        catName:"",
        subName:"",
        picUrl:"",
        subFile:null,
        piccatUrl:"",
        catFile:null,
        subDia:false,
       }),
       methods:{
        catPhoto(){
      const imgInput = this.$refs.cat.files[0];
       
       const reader = new Image();
 
       reader.onload = () => {
         this.piccatUrl = imgInput;
       }
 
       reader.src = URL.createObjectURL(imgInput);
    },
    subPhoto(event){
      
       
      this.picUrl = event.target.files[0];
    },
    // subPhoto(){
    //   const imgInput = this.$refs.sub.files[0];
       
    //    const reader = new Image();
 
    //    reader.onload = () => {
    //      this.picUrl = imgInput;
    //    }
 
    //    reader.src = URL.createObjectURL(imgInput);
    // },
    addSubcat(id){
      const jsonBlob = new Blob([JSON.stringify({"name":this.subName})], { type: 'application/json' })
      const formData = new FormData();
          formData.append("data", jsonBlob);
          formData.append("image",this.picUrl)
          this.$store.dispatch("addSubcategory", {"form":formData,"catId":id})
            .then(() => {
              // Reset form data after successful dispatch
              this.$router.push("/adminservices")
              console.log("Success")
              // this.resetFormData();
              
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });
    },addCat(){
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
        getImageUrl(base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    },
    
       }
    }
  </script>
