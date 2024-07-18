<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="100%">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        style="background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right,rgba(255,255,255,.0), rgba(255,255,255,.2)"
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
        <v-btn style="background-color: blue" @click="navparlourlogin"
          >Parlour Login</v-btn
        >

        <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
  
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
  
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn> -->
      </v-app-bar>
      <v-main style="background-color: black">
        <v-container fluid>
          <v-form @submit.prevent="submit" ref="form" enctype="multipart/form-data">
            <v-row>
              <v-col cols="12">
                <h2 class="text-center">Parlour Registration</h2>
              </v-col>
              <v-col cols="12" sm="6" >
    <v-file-input
      ref="photo"
      style="color: white"
      :error="errorp"
      :error-messages="errorMessagep"
      :label="uploadedPhotoName"
      v-model="parlourPhoto"
      :rules="parlourPhotoRules"
      accept="image/*"
      outlined
      @change="previewParlourPhoto"
    >
    </v-file-input>
  </v-col>
              <v-col cols="12" sm="6" v-if="previewUrl" >
                <v-card style="background-color: black; color: white">
                  <v-img
                    :src="previewUrl" contain
                    
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    
                    
                  >
                    <v-card-title
                      class="text-white"
                      style="font-size: 20px"
                      
                    >Parlour Photo</v-card-title>
                  </v-img>
                  </v-card>
  </v-col>
    
  
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="parlourName"
                  label="Parlour Name"
                  variant="underlined"
                  :rules="parlourNameRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="location"
                  label="Location"
                  variant="underlined"
                  :rules="locationRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn class="btn1" @click="diaLoc=!diaLoc">Select Location</v-btn>
              </v-col>
              <v-dialog v-model="diaLoc">
                <button class="close-btn" @click="diaLoc = false">
                      X
                    </button>
                <parlour-location></parlour-location>
              </v-dialog>
              <v-col cols="12" sm="6" >
                <v-text-field
                  v-model="latitude"
                  label="Latitude"
                  variant="underlined"
                  :rules="locationRules"
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-text-field
                  v-model="longitude"
                  label="Longitude"
                  variant="underlined"
                  :rules="locationRules"
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="phone"
                  label="Phone Number"
                  variant="underlined"
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email"
                  placeholder="example@gmail.com"
                  variant="underlined"
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="Description"
                  variant="underlined"
                  v-model="description"
                  :rules="descriptionRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="License Number"
                  variant="underlined"
                  v-model="licenseNo"
                  :rules="licenseRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input
              
                ref="license"
                  style="color: white"
                  :label="uploadedFileName"
                  :error="errorl"
                  :error-messages="errorMessagel"
                  v-model="licenseFile"
                  :rules="licenseFileRules"
                  accept="image/*"
                  outlined
                  @change="licensePhoto"
                >
                </v-file-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Password"
                  variant="underlined"
                  v-model="password"
                  :rules="passwordRules"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  counter
                  @click:append-inner="show1 = !show1"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Confirm Password"
                  variant="underlined"
                  v-model="cpassword"
                  :rules="confirmPasswordRules"
                  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-1"
                  counter
                  @click:append-inner="show2 = !show2"
                ></v-text-field>
              </v-col>

              <v-col align="center" cols="12" sm="12">
                <v-btn class="btn1" type="submit">Submit</v-btn>
              </v-col>
              <v-dialog v-model="dialogVis" max-width="450px">
                <v-col align="center" class="dia">
                  <h3 class="mb-5">Palour Registered Successfully</h3>
                  <v-btn @click="dialogVis=false" style="width: 150px; margin-bottom: 5px">Ok</v-btn>
                </v-col>
              </v-dialog>
            </v-row>
          </v-form>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
import ParlourLocation from "./ParlourLocation.vue"
export default {
  components:{
    ParlourLocation
  },
  data() {
    return {
      diaLoc:false,
      parlourPhoto: null,
      imageUrl:null,
      previewUrl: null,
      dialogVis: false,
      licenseFile: null,
      show1: false,
      show2: false,
      parlour: {},
      parlourName: "",
      location: "",
      phone: "",
      email: "",
      description: "",
      password: "",
      cpassword: "",
      licenseNo: "",
      licenseUrl:null,
      rating:5,
      errorl: false,
      errorMessagel:'',
      errorp:false,
      errorMessagep:"",
      latitude:null,
      longitude:null,
      licenseFileRules: [v => {
          return !!v || "License file is required."},]
    };
  },
  methods: {
    licensePhoto(){
      const imgInput = this.$refs.license.files[0];
       
       const reader = new Image();
 
       reader.onload = () => {
         this.licenseUrl = imgInput;
       }
 
       reader.src = URL.createObjectURL(imgInput);
    },
    previewParlourPhoto() {
      const imgInput = this.$refs.photo.files[0];
       
      const reader = new Image();

      reader.onload = () => {
        this.imageUrl = imgInput;
      }

      reader.src = URL.createObjectURL(imgInput);
      if (this.parlourPhoto) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.parlourPhoto);
      } else {
        this.previewUrl = null;
      }
    },
    navparlourlogin() {
      this.$router.push("/parlourlogin");
    },
    async submit() {
      // Check if the form is valid
      // this.$refs.form.validate().then((valid) => {
        const {valid} = await this.$refs.form.validate();
        console.log(valid)
        if (valid && this.licenseFile !== null && this.parlourPhoto!== null) {
          this.dialogVis = true;
          const formData = new FormData();
          formData.append("parlourName", this.parlourName);
          formData.append("image",this.imageUrl)
          formData.append("location", this.location);
          formData.append("phoneNumber", this.phone);
          formData.append("email", this.email);
          formData.append("description", this.description);
          formData.append("password", this.password);
          formData.append("licenseNumber", this.licenseNo); // License Number
          formData.append("licenseImage", this.licenseUrl);
          formData.append("ratings", this.rating); // License File
          formData.append("latitude", parseFloat(this.latitude));
          formData.append("longitude", parseFloat(this.longitude));

          this.$store.dispatch("addTheParlour", formData)
            .then(() => {
              // Reset form data after successful dispatch
             // this.resetFormData();
              // this.$router.push("/parlourlogin")
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });
        } else {
          if(this.licenseFile===null){
          this.errorl= true
          this.errorMessagel='File needed'}
          if(this.parlourPhoto===null){
            this.errorp=true
            this.errorMessagep='Parlour photo required'
          }
          console.warn("Form validation failed");
        }
      
    },
    resetFormData() {
      this.parlourName = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.cpassword = "";
      this.location = "";
      this.description = "";
    },
  },
  watch:{
    licenseFile(value){
      if(value){
      this.errorl=false
      this.errorMessagel=""}
      
    },
    parlourPhoto(value){
      if(value){
      this.errorp=false 
      this.errorMessagep=""}
    },
    diaLoc(value){
      if(value===false && this.parlourLoc.latitude){
      this.latitude=this.parlourLoc.latitude
      this.longitude=this.parlourLoc.longitude}
      }
  },
  created(){
    sessionStorage.removeItem('parlourlocation');
  },
  computed: {
    parlourLoc(){
      return JSON.parse(sessionStorage.getItem("parlourlocation"))
    },
    uploadedPhotoName() {
      if (this.parlourPhoto) {
        return this.parlourPhoto.name;
      }
      return "Upload Parlour Photo";
    },
    parlourPhotoRules() {
      return [(v) => !!v || "Parlour photo is required."];
    },
    uploadedFileName() {
      if (this.licenseFile) {
        return this.licenseFile.name;
      }
      return "Upload License (Photo)";
    },
    // licenseFileRules() {
    //   return [(v) => !!v || "License file is required."];
    // },
    parlourNameRules() {
      return [
        (v) => !!v || "Parlour Name is required.",
        (v) =>
          !/^\s/.test(v) || "Parlour Name should not start with a blank space.",
      ];
    },
    locationRules() {
      return [
        (v) => !!v || "Location is required.",
        (v) =>
          !/^\s/.test(v) || "Location should not start with a blank space.",
      ];
    },
      phoneRules() {
        return [
          (v) => !!v || "Phone Number is required.",
          (v) =>
            /^[0-9]{10}$/.test(v) ||
            "Phone Number should contain exactly 10 digits and only numbers.",
        ];
      },
      emailRules() {
        return [
          (v) => !!v || "Email is required.",
          (v) =>
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) ||
            "Email must be a valid email address.",
        ];
      },
    descriptionRules() {
      return [
        (v) => !!v || "Description is required.",
        (v) =>
          !/^\s/.test(v) || "Description should not start with a blank space.",
      ];
    },
    licenseRules() {
      return [
        (v) => !!v || "License Number is required.",
        (v) =>
          !/^\s/.test(v) ||
          "License Number should not start with a blank space.",
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "Password is required.",
        (v) => v.length >= 8 || "Password must be at least 8 characters long.",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase letter.",
        (v) =>
          /[a-z]/.test(v) ||
          "Password must contain at least one lowercase letter.",
        (v) => /[0-9]/.test(v) || "Password must contain at least one number.",
        (v) =>
          /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
          "Password must contain at least one special character.",
      ];
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || "Confirm Password is required.",
        (v) =>
          v === this.password || "Confirm Password must match the Password.",
      ];
    },
  },
};
</script>
<style scoped>
.close-btn {
  position: relative;
  margin-left:1440px;
  margin-bottom:5px;
  height: 40px;
  width: 40px;
 
  background-color: transparent;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  color: #fffcfc;
  font-size: 20px;
  cursor: pointer;
}
.v-text-field {
  color: white;
}
.v-container {
  width: 1000px;
}
h2,
h3 {
  color: white;
}
.btn1 {
  width: 400px;
}
.dia {
  border-radius: 5px;
  background-color: rgb(0, 7, 54);
  padding-top: 15px;
}
.v-img {
    max-width: 100%;
    height: 100px;
  }
</style>
