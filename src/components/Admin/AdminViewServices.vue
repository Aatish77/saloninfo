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
            title="Offers"
            value="account"
            @click="offerClick"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-tags"
            title="Parlours"
            value="account"
            @click="parlourClick"
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
        <v-card style="height: 100%;">
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
     
      <v-tab v-for="(category,index) in categories" :key="category" :value="index">{{ category.name }}  <v-icon
            v-if="index===tab"
            small
            @click.stop="confirmDelete(index)"
            class="ml-2 delete"
          >
            mdi-delete
          </v-icon> </v-tab>
      <v-tab value="add">+ Add category</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tab-window-item v-if="tab==='add'" >
        <v-form>
        <v-col>
        <v-text-field
        class="text"
        style="color:black"
                  v-model="catName"
                  label="Category Name"
                  variant="underlined"
                  
                ></v-text-field></v-col>
                <v-col >
        <v-file-input
                class="input"
                ref="cat"
                  style="color: black"
                  :label="uploadedCatFileName"
                  v-model="catFile"
                  accept="image/*"
                  outlined
                  @change="catPhoto"
                >
                </v-file-input></v-col>
                <v-col >
                <v-btn @click="addCat" color="black" style="margin-left: 100px; width: 400px; height: 40px; border-radius: 16px; ">Add category</v-btn></v-col></v-form>
      </v-tab-window-item>
      <v-tabs-window-item v-for="(category,index) in categories" :key="category" :value="index">
        <v-container fluid>
          <v-row v-if="category.subCategories">
            <v-col v-for="(subCategory,subIndex) in category.subCategories" :key="subCategory" @click="nav(category,subCategory,index,subIndex)" md="3">
              <v-card  class="mx-auto card1 a" max-width="344" max-height="280px">
                <v-img
              style="border-radius: 5px"
              class="align-end text-white"
              height="220"
              :src="subCategory.image ? getImageUrl(subCategory.image) : subCategory.image1"
              cover
            >
              <v-icon
              

                small
                @click.stop="confirmDeleteSub(index)"
                class="delete-icon"
              >
                mdi-delete
              </v-icon>
            </v-img>
                    <v-card-item ><h5 class="multi-line-title">{{ subCategory.name }} </h5></v-card-item></v-card>
              
            </v-col>
            <v-col md="3">
              <v-card @click="subDia=!subDia" class="mx-auto card2 "  max-width="344" max-height="280px">
              <v-img
              style="border-radius: 5px"
              height="220"
              class="align-end text-white"
              :src="require('@/assets/upload1.jpg')"
              cover
                
                
              ></v-img>
              <v-card-item ><h5 class="multi-line-title">Add Sub Category</h5> </v-card-item>
              
            </v-card>
            </v-col>
            
          </v-row>
          <v-row v-else>
            <v-col>
              <v-card @click="subDia=!subDia" class="card2 mx-auto"  max-width="344" max-height="280px">
              <v-img
              style="border-radius: 5px"
              height="220"
              class="align-end text-white"
              :src="require('@/assets/upload1.jpg')"
              cover 
              ></v-img>
              <v-card-item ><h5 class="multi-line-title">Add Sub Category</h5> </v-card-item>
              
            </v-card>
            </v-col>
          </v-row>
          <v-dialog v-model="subDia" style="width: 400px;height: 300px;background-color: black ;border-radius: 5px;">
            
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
      created(){
        this.$store.dispatch("viewCategories")
        if(this.currentService){
        this.tab = this.currentService.catIndex}
      },
      computed:{
        currentService(){
        const currentLabel = JSON.parse(sessionStorage.getItem("adminser"))
        return currentLabel
      },
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
          if(value!="add"){
          this.$store.dispatch("viewSubCategories",value)}

        }
      },
      data: () => ({ drawer: null,
        tab: 0,
        catName:"",
        subName:"",
        picUrl:"",
        subFile:null,
        piccatUrl:"",
        catFile:null,
        subDia:false,
       }),
       methods:{
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
    this.$router.push("/adminoffers")
    },
        confirmDeleteSub(index) {
      // Show a confirmation alert
      if (window.confirm("Are you sure you want to delete this Sub Category?")) {
        this.deleteSub(index);
      }
    }, deleteSub(index) {
      // Remove the tab at the specified index
      this.tabs.splice(index, 1);

      // Adjust the active tab if necessary
      if (this.activeTab >= index) {
        this.activeTab = Math.max(0, this.activeTab - 1);
      }
    },
        confirmDelete(index) {
      // Show a confirmation alert
      if (window.confirm("Are you sure you want to delete this tab?")) {
        this.deleteTab(index);
      }
    }, deleteTab(index) {
      // Remove the tab at the specified index
      this.tabs.splice(index, 1);

      // Adjust the active tab if necessary
      if (this.activeTab >= index) {
        this.activeTab = Math.max(0, this.activeTab - 1);
      }
    },
        nav(cat,subCat,index,subIndex){
          sessionStorage.setItem("adminser",JSON.stringify({cat:cat.name,subCat:subCat.name,catIndex:index,subIndex:subIndex}))
          this.$router.push("/adminsubcat")
        },
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
      // const jsonBlob = new Blob([JSON.stringify({"name":this.subName})], { type: 'application/json' })
      const formData = new FormData();
      formData.append("name",this.subName);
      formData.append("categoryId",id);
          // formData.append("data", jsonBlob);
          formData.append("image",this.picUrl)
          this.$store.dispatch("addSubcategory", formData)
            .then(() => {
              // Reset form data after successful dispatch
              this.subDia=false
              this.$router.push("/adminservices")

              // this.$router.push("/adminservices")
              alert("Successfully added")
              console.log("Success")
              // this.resetFormData();
              
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });
    },addCat(){
      // const jsonBlob = new Blob([JSON.stringify({"name":this.catName})], { type: 'application/json' })
      const formData = new FormData(); 
      // newblob in it json new blob application/json
      // formData.append('data', jsonBlob);
      // formData.append("data",JSON.stringify({"name": this.catName}));
          formData.append("name", this.catName);
          formData.append("image",this.piccatUrl)

        this.$store.dispatch("addCategories",formData)
        .then(() => {
              // Reset form data after successful dispatch
              this.$router.push("/adminservices")
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
  <style scoped>
  .v-form{
    margin-top: 50px;
    margin-left: 300px;
    max-width:600px;
    box-shadow: 2px 12px 16px rgba(0, 0, 0, 0.1);
    
  }
  .text , .input {
  margin-top: 1em;
  width: 400px;
  margin-left: 90px;

}
  .card1 {
  margin-top: 10px;
  color: white;
  background-color: rgb(41, 41, 41);
}.card2  {
  margin-top: 10px;
  color: white;
  background-color: rgb(41, 41, 41);
}
.card1 :hover .delete-icon{
  visibility: visible;
}
.delete-icon {
  visibility: hidden;
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: rgb(255, 255, 255);
  background: rgba(255, 255, 255, 0);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
}
.delete-icon :hover{
color:red
}
  </style>
