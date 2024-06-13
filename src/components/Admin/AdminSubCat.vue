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
        <v-card style="height: 100vh;">
            <div>
            <v-breadcrumbs :items="items">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
            </v-breadcrumbs>
          </div>
            <v-row>
             
                
            <v-col v-for="subsubCategory in subsubCategories" :key="subsubCategory"  style="border:2px black">
              <v-card  class="mx-auto card1" max-width="344" max-height="300px">
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
            <v-col>
              <v-card @click="subsubDia=!subsubDia" class="card1 mx-auto"  max-width="344" max-height="300px">
              <v-img
              style="border-radius: 5px"
              height="250"
              class="align-end text-white"
              :src="require('@/assets/upload1.jpg')"
              cover   
              ></v-img>
              <v-card-item ><h5 class="multi-line-title">Add Sub Sub Category</h5> </v-card-item>
              
            </v-card>
            </v-col>
            <v-dialog v-model="subsubDia" style="width: 600px;height: 300px;background-color: black ;border-radius: 5px;">
              <v-text-field
        style="color:white"
                  v-model="subsubName"
                  label="Sub sub category Name"
                  variant="underlined"
                  
                ></v-text-field>
              <v-file-input
                ref="subsub"
                  style="color: white"
                  :label="uploadedsubsubFileName"
                  v-model="subsubFile"
                  accept="image/*"
                  outlined
                  @change="subsubPhoto"
                >
                </v-file-input>
                <v-btn @click="addSubsubcat">Add sub sub category</v-btn>
          </v-dialog>
            </v-row>
        </v-card></v-main></v-app>
</template>
<script>
export default {
    data(){
        return{
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
      { title: this.currentService.cat, href: "/adminservices" },
      { title: this.currentService.subCat },
    ];
    this.subsubCategories=this.categories[this.currentService.catIndex].subCategories[this.currentService.subIndex].subsubCategories
    console.log(this.subsubCategories)
    },
    computed:{
      uploadedsubsubFileName() {
      if (this.subsubFile) {
        return this.subsubFile.name;
      }
      return "Upload Subsubcategory Photo";
    },
        currentService(){
        const currentLabel = JSON.parse(sessionStorage.getItem("adminser"))
        return currentLabel
      },
      categories(){
        return this.$store.getters["getCategories"]
      }
    },
    methods:{
      subsubPhoto(){
      const imgInput = this.$refs.subsub.files[0];
       
       const reader = new Image();
 
       reader.onload = () => {
         this.picsubsubUrl = imgInput;
       }
 
       reader.src = URL.createObjectURL(imgInput);
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
