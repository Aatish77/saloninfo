<template>
    <v-app id="inspire" >
      
  
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
   
      <v-main >
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
          <v-tab :value="1">Add offers</v-tab>
          <v-tab :value="2">Seasonal offers</v-tab>
        </v-tabs>
      </v-card>
      
      
      <v-container v-if="tab === 1" >
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">Add Offers</h1>
        <v-form  ref="form" @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6"  offset-md="2" class="custom-margin">
              <v-text-field
                v-model="name"
                 :rules="nameRules"
                label="Name"
                outlined
                dense
                required
              ></v-text-field>
              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                label="Description"
                outlined
                dense
                required
                rows="5"
              ></v-textarea>
              <!-- <v-file-input
                v-model="image"
                :rules="imageRules"
                label="Image"
                :error="error"
                :error-messages="errormessage"
                outlined
                dense
                required
                @change="imageChange"
              ></v-file-input> -->
            </v-col>
            <!-- <v-col cols="12" md="6">
              
            </v-col> -->
          </v-row>
          <v-btn type="submit" color="black" class="white--text mt-3" style="width: 404px; height: 40px; border-radius: 16px;">
           Add
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

    
  <v-container v-if="tab === 2" >
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">SeasonalOffers</h1>
        <v-form  ref="form" @submit.prevent="seasonalSubmit">
          <v-row>
            <v-col cols="12" md="6"  offset-md="2" class="custom-margin">
              <v-select
                 v-model=" seasonal.categoryId"
                :items="seasonal.items"
                label="CategoryId"
                 required
      ></v-select>

              <v-text-field
                v-model=" seasonal.name"
                label="Name"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field type="date"
                v-model="seasonal.startDate"
                
                label="StartDate"
                outlined
                dense
                required
                rows="5"
              ></v-text-field>
              <v-text-field type="date"
                v-model="seasonal.endDate"
                
                label="EndDate"
                outlined
                dense
                required
                rows="5"
              ></v-text-field>
              <v-text-field
                v-model=" seasonal.offerPrice"
                label="OfferPrice"
                outlined
                dense
                required
              ></v-text-field>
              <v-textarea
                v-model=" seasonal.description"
                label="Description"
                outlined
                dense
                required
                rows="5"
              ></v-textarea>
              <v-file-input
                v-model=" seasonal.image"
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
          <v-btn type="submit" color="black" class="white--text mt-3" style="width: 404px; height: 40px; border-radius: 16px;">
           Add seasonal
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</v-main>


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
      picUrl:'',
      error:false,
      errormessage:'',
      seasonal:{
        categoryId:'',
        name:'',
        startDate:null,
        endDate:null,
        offerPrice:'',
        description:'',
        image:null,
        select: null,
      items: [
        '1',
        '2',
        ' 3',
        '4',
      ],

      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 3 || 'Name must be at least 3 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => v.length >= 10 || 'Description must be at least 10 characters'
      ],
      imageRules: [
        v => !!v || 'Image is required',
      
        ],
      
       }),
       methods: {
       async handleSubmit(){
          await this.$store.dispatch("addOffers", {'name':this.name,'description':this.description})
        
        },
        async handleSubmit1() {
            const {valid}=await this.$refs.form .validate();
            console.log(valid)
            if(valid && this.image !==null ){
  const formData = new FormData();
  formData.append('name', this.name);
  formData.append('description', this.description);
  formData.append('image', this.picUrl);

  this.$store.dispatch("addOffers", formData)
    .then(() => {
    
        alert('Offer added successfully');
        // Alert message shown immediately after successful submission
      // Optionally, you can reset form fields or perform other actions here
    })
    .catch(error => {
      console.error('Error adding offer:', error);
    });
}
else{
    if(this.image===null){
        this.error=true;
        this.errormessage="Please select an image";
    }
    console.warn("validation failed")
}
},

 async seasonalSubmit(){
  const formData = new FormData();
  // formData.append('categoryId', this.seasonal.categoryId);
  formData.append('name', this.seasonal.name);
  formData.append('startDate', this.seasonal.startDate);
  formData.append('endDate', this.seasonal.endDate);
  formData.append('offerPrice', this.seasonal.offerPrice);
  formData.append('description', this.seasonal.description);
  formData.append('image', this.seasonal.PicUrl);
   await this.$store.dispatch("addseasonaloffer", { form:formData,id:this.seasonal.categoryId})

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
  },
  watch:{
    image(){
        this.error=false,
        this.errormessage=''
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
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

.v-text-field, .v-textarea, .v-file-input {
  margin-top: 1em;
  width: 400px;
}
.custom-margin {
  margin-left: 90px; /* Adjust this value to move the fields to the right */
}
</style>