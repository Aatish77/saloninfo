<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <!-- <v-app-bar
        color="teal-darken-4"
        image="https://4kwallpapers.com/images/walls/thumbs_3t/10974.jpg"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <i class="fas fa-cut" style="font-size: 25px;"></i>
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
        <v-btn class="signup" @click="signup">Signup</v-btn>
      </v-app-bar> -->
      <v-main class="bgimage">
        <v-card class="content">
          <h1 class="overlay-title animate11">
            <i class="fas fa-cut" style="font-size: 25px"></i>saloninfo
          </h1>
          <v-row v-if="!showSignup" :class="{'flip-animation':flip}" class="content-inner">
            <v-col align="center" style="width: 350px">
              <img
              :class="{'fade':!showSignup}"
                class="slideshow "
                :src="currentImage"
                alt="Slideshow"
              />
            </v-col>
            <v-form ref="form" >
              <v-col style="width: 350px">
                <v-sheet class="mx-auto login" width="200">
                  <h2 class="title text-center animate11">Login</h2>

                  <v-text-field
                    class="mb-2 cl animate11"
                    v-model="phone"
                    :rules="phoneRules"
                    label=""
                    variant="outlined"
                    placeholder="Phone Number"
                  ></v-text-field>

                  <v-text-field
                    class="mb-3 cl animate11"
                    variant="outlined"
                    v-model="password"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="Password"
                    name="input-10-1"
                    counter
                    @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  <v-alert
                    v-if="error"
                    type="error"
                    transition="scale-transition"
                    dismissible
                  >
                    {{ error }}
                  </v-alert>
                  <v-btn elevation="6" rounded="xl" class="mt-0 login-btn animate11 " type="submit" block @click="submitLogin">Login</v-btn>
                <v-btn elevation="6" rounded="xl" class="mt-0 signup-btn animate11 " block    @click="toggleShow">Register</v-btn>
                </v-sheet>
              </v-col>
              
            </v-form>
          </v-row>
          
            
            <v-row v-if="showSignup" :class="{'flip-animation':flip}" style="font-size: smaller;" class="content-inner ">            
              <v-col style="width: 350px">
          <v-form style="width:350px" ref="signup">
            <h2 class="title1 text-center animate1">Sign Up</h2>
            <v-text-field
            class="animate2 custom-field"
            
              v-model="reg.fullName"
              placeholder="Full Name"
              variant="underlined"
              :rules="fullNameRules"
            ></v-text-field>

            <v-text-field
            class="animate3 custom-field"
              v-model="reg.phone"
              placeholder="Phone Number"
              variant="underlined"
              :rules="phoneRules"
            ></v-text-field>

            <v-text-field
            
              v-model="reg.email"
              
              placeholder="Email"
              variant="underlined"
              :rules="emailRules"
               class="custom-field animate4"
            ></v-text-field>

            <v-text-field
            class="animate5 custom-field"
              placeholder="Password"
              variant="underlined"
              v-model="reg.password"
              :rules="passwordRules"
              :append-inner-icon="reg.show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="reg.show1 ? 'text' : 'password'"
              name="input-10-1"
              counter
              @click:append-inner="reg.show1 = !reg.show1"
            ></v-text-field>

            <v-text-field
            class="animate6 custom-field mb-4"
              placeholder="Confirm Password"
              variant="underlined"
              v-model="reg.cpassword"
              :rules="confirmPasswordRules"
              :append-inner-icon="reg.show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="reg.show2 ? 'text' : 'password'"
              name="input-10-1"
              counter
              @click:append-inner="reg.show2 = !reg.show2"
            ></v-text-field> 
            <v-btn type="submit" class="custom-btn reg animate7 mt-3 mx-1" @click="submit">Sign up</v-btn>
            <v-btn class=" log animate7 mt-3"  @click="toggleShow">Login</v-btn>
          </v-form>
        </v-col>
          <v-col align="center" style="width: 350px">
              <img
                :class="{'fade':showSignup}"
                class="slideshow "
                :src="currentImage"
                alt="Slideshow"
              />
            </v-col>
        </v-row>

              
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialogVis: false,
      
      reg:{
        show1:false,
        show2:false,
      fullName: "",
      phone: "",
      password: "",
      email: "",
      cpassword: "",},
      parlour: {},
    flip:false,
    showSignup:false,
    isRotating: false,
    window: true,
    dialog: true,
    show1: false,
    show2: true,
    error: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },

    images: [
      "https://wallpapercave.com/wp/wp11627912.jpg",
      "https://getwallpapers.com/wallpaper/full/2/3/d/1510850-new-hair-salon-wallpaper-2100x1400-samsung-galaxy.jpg",
      "https://getwallpapers.com/wallpaper/full/1/f/7/1510836-hair-salon-wallpaper-1920x1080-for-mobile-hd.jpg",
      "https://getwallpapers.com/wallpaper/full/1/0/e/1510826-cool-hair-salon-wallpaper-2560x1600.jpg",
    ],
    currentIndex: 0,
    intervalId: null,
    intervalDuration: 3000,
    phone: "",
    password: "",
  }),
  created() {
    this.viewUsers();
  },
  computed: {
    
    fullNameRules() {
      return [
        (v) => !!v || "Full Name is required.",
        (v) => !/^\s/.test(v) || "Enter valid Full Name",
        (v) => !/[^a-zA-Z\s]/.test(v) || "Enter valid Full Name",
        (v) => /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(v) || "Enter valid Full Name",
      ];
    },
    phoneRules() {
      return [
        (v) => !!v || "Phone Number is required.",
        (v) => /^[0-9]{10}$/.test(v) || "Enter a valid phone number",
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
    passwordRules() {
      return [
        (v) => !!v || "Password is required.",
        (v) =>
          v.length >= 8 ||
          "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        (v) =>
          /[a-z]/.test(v) ||
          "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        (v) =>
          /[0-9]/.test(v) ||
          "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        (v) =>
          /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
          "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ];
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || "Confirm Password is required.",
        (v) =>
          v === this.password || "Confirm Password must match the Password.",
      ];
    },

    currentImage() {
      return this.images[this.currentIndex];
    },
    users() {
      return this.$store.getters["getUsers"];
    },
  },
  mounted() {
    this.windowSize();
    this.startSlideshow();
  },
  watch: {
    currentImage() {
      this.rotateImage();
    }
  },
  methods: {
    submit() {
      // Check if the form is valid
      this.$refs.signup.validate().then((valid) => {
        if (valid.valid) {
          this.dialogVis = true;
          const data = {"fullName":this.reg.fullName,"phone":this.reg.phone,"email":this.reg.email,"password":this.reg.password}
          

          this.$store
            .dispatch("addTheUser", data)
            .then(() => {
              // Reset form data after successful dispatch
              this.resetFormData();
              this.$router.push("/userlogin")
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });
        } else {
          console.warn("Form validation failed");
        }
      });
    },
    resetFormData() {
      this.reg.fullName = "";
      this.reg.phone = "";
      this.reg.email = "";
      this.reg.password = "";
      this.reg.cpassword = "";
    },

    toggleShow(){
      this.showSignup=!this.showSignup
      this.flip=true
    },
    rotateImage() {
      this.isRotating = true;
      setTimeout(() => {
        this.isRotating = false;
      }, 500); // Stop the animation after 0.5 seconds
    },
    windowSize() {
      if (window.innerWidth >= 1191) {
        this.window = true;
      } else {
        this.window = false;
      }
    },
    signup() {
      this.$router.push("/usersignup");
    },
    async viewUsers() {
      try {
        await this.$store.dispatch("viewUsers");
      } catch (error) {
        console.error(error);
      }
    },
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, this.intervalDuration);
    },
    stopSlideshow() {
      clearInterval(this.intervalId);
    },
    beforeDestroy() {
      this.stopSlideshow();
    },
    submitLogin() {
      this.$refs.form.validate().then((valid) => {
        console.log(valid.valid)
        if (valid.valid) {
          console.log("Login");
          this.error = "";
          let found = false;
          for (const user of this.users) {
            if (this.phone === user.phone && this.password === user.password) {
              sessionStorage.setItem("currentUser", JSON.stringify(user));
              this.$router.push("/viewparlours");
              found = true;
              break;
            }
          }
          if (!found) {
            this.error = "The phone number and password don't match";
          }
        }
        // else {
        //   this.error = 'Form validation failed';
        // }
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.custom-btn {
  margin-left: 40px !important; /* Adjust this value as needed to move the buttons to the right */
}
@keyframes slide-up {
  from {
    opacity: 0.3;
    transform: translate(0%, 100vh);
  }
  to {
    opacity: 1;
    transform: translate(0%, 0%);
  }
}
@keyframes fade {
  from {
    opacity: 0;
    
  }
  to {
    opacity: 1;
    
  }
}
.fade{
  opacity:0;
  animation: fade 0.2s ease-in-out forwards;
  animation-delay:1s;
}
.animate1 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 1s;
}

.animate2 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 1.4s;
}

.animate3 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 1.7s;
}

.animate4 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 2s;
}

.animate5 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 2.3s;
}

.animate6 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 2.6s;
}

.animate7 {
  opacity: 0;
  animation: slide-up 0.4s ease-in-out forwards;
  animation-delay: 2.9s;
}
.custom-field {
  font-weight: 900;
  color: #612800;
  margin-bottom: 15px; /* Reduce the space between fields */
  height: 40px; /* Adjust the height of the fields */
}
.title1 {
  color:#612800;
  font-size: 40px;
  font-weight: 1000 !important;
  margin-bottom: 0px;
}
.log {
  font-size: 90%;
  height:20px !important;
  margin-left: 20px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 1px solid white;
}

.log:hover {
  background-color: rgb(255, 255, 255) !important;
  color: black;
}

.reg {
  margin-left: 50%;
  
  font-size: 90%;
  height:20px !important;
  margin-left: 60px;
  border-radius: 24px;
}
.cl{
   color: #612800;
}
.link{
  color:#612800;
  margin-left: 200px;

}
.login {
  /* border-radius: 20px; */
  margin-top: 20px;
  /* margin-bottom: px; */
  /* margin-right:100px; */
  padding: 20px;
  width: 300px !important;
  /* background-color: rgb(62, 35, 183); */
  border-radius: 7px;
  /* background-image: radial-gradient(circle at 85% 1%, hsla(190,0%,93%,0.05) 0%, hsla(190,0%,93%,0.05) 96%,transparent 96%, transparent 100%),radial-gradient(circle at 14% 15%, hsla(190,0%,93%,0.05) 0%, hsla(190,0%,93%,0.05) 1%,transparent 1%, transparent 100%),radial-gradient(circle at 60% 90%, hsla(190,0%,93%,0.05) 0%, hsla(190,0%,93%,0.05) 20%,transparent 20%, transparent 100%),radial-gradient(circle at 79% 7%, hsla(190,0%,93%,0.05) 0%, hsla(190,0%,93%,0.05) 78%,transparent 78%, transparent 100%),radial-gradient(circle at 55% 65%, hsla(190,0%,93%,0.05) 0%, hsla(190,0%,93%,0.05) 52%,transparent 52%, transparent 100%),linear-gradient(135deg, rgb(37, 56, 222),rgb(96, 189, 244)); */
  /* background-image: linear-gradient(135deg, rgba(234, 234, 234,0.06) 0%, rgba(234, 234, 234,0.06) 50%,rgba(169, 169, 169,0.06) 50%, rgba(169, 169, 169,0.06) 100%),linear-gradient(90deg, rgb(20,20,20),rgb(20,20,20)); background-size: 72px 72px; */
  /* background-image: linear-gradient(135deg, rgba(234, 234, 234,0.06) 0%, rgba(234, 234, 234,0.06) 50%,rgba(169, 169, 169,0.06) 50%, rgba(169, 169, 169,0.06) 100%),linear-gradient(90deg, rgb(5,13,79),rgb(5,13,79)); background-size: 72px 72px; */
  /* background-image: radial-gradient(circle at center center, transparent 0%,rgb(0,5,71) 85%),linear-gradient(78deg, rgba(192, 192, 192,0.05) 0%, rgba(192, 192, 192,0.05) 50%,rgba(60, 60, 60,0.05) 50%, rgba(60, 60, 60,0.05) 100%),linear-gradient(227deg, rgba(97, 97, 97,0.05) 0%, rgba(97, 97, 97,0.05) 50%,rgba(52, 52, 52,0.05) 50%, rgba(52, 52, 52,0.05) 100%),linear-gradient(240deg, rgba(98, 98, 98,0.05) 0%, rgba(98, 98, 98,0.05) 50%,rgba(249, 249, 249,0.05) 50%, rgba(249, 249, 249,0.05) 100%),linear-gradient(187deg, rgba(1, 1, 1,0.05) 0%, rgba(1, 1, 1,0.05) 50%,rgba(202, 202, 202,0.05) 50%, rgba(202, 202, 202,0.05) 100%),linear-gradient(101deg, rgba(61, 61, 61,0.05) 0%, rgba(61, 61, 61,0.05) 50%,rgba(254, 254, 254,0.05) 50%, rgba(254, 254, 254,0.05) 100%),linear-gradient(176deg, rgba(237, 237, 237,0.05) 0%, rgba(237, 237, 237,0.05) 50%,rgba(147, 147, 147,0.05) 50%, rgba(147, 147, 147,0.05) 100%),linear-gradient(304deg, rgba(183, 183, 183,0.05) 0%, rgba(183, 183, 183,0.05) 50%,rgba(57, 57, 57,0.05) 50%, rgba(57, 57, 57,0.05) 100%),radial-gradient(circle at center center, rgb(0,60,136),rgb(0,60,136)); */
  background-color: #ffffff00;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.561); */
  /* color: rgb(224, 48, 48); */
  /* color:#a0522d; */
  color: #8b4513;


}

.title {
  color:#612800;
  font-size: 40px;
  font-weight: 1000 !important;
  margin-bottom: 20px;
}
.slideshow {
  display: inline-block;
  backface-visibility: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-right: 5px ; */
  border-radius: 50% 50% 50% 50%;
  width: 350px;
  height: 350px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
@keyframes flip {
  0% {
    transform: perspective(1000px) rotateY(0deg);
    opacity: 1;
  }
  50% {
    transform: perspective(1000px) rotateY(90deg);
    opacity: 0.5;
  }
  100% {
    transform: perspective(1000px) rotateY(180deg);
    opacity: 1;
  }
}
.flip-animation {
  animation: flip 1s ease-in-out;
}
@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translate(0%, -50%);
  }
  to {
    opacity: 1;
    transform: translate(0%, 0%);
  }
}
.animate11 {
  opacity: 0;
  animation: slide-fade 1s ease-out forwards;
  animation-delay: 1s;
}
.content {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.3); /* Adjust the opacity as needed */
  padding: 220px;
  padding-top: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.561);
  border-radius: 10px;
}

.content-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0px);
  
}
.content-inner {
  /* background-image: radial-gradient(circle at center center, rgb(0,15,121),rgb(2,2,98)); */
  /* background-color: rgba(6, 0, 40, 0.371);;  */
  /* background-color: rgb(250, 232, 185); */
  background-image: url("@/assets/contentbg.jpg");
  border-radius: 10px;
  padding: 20px;
  width: 800px;

  /* You can adjust the padding inside the white background */
}
.login-btn {
 height:25px !important;
 width:10px !important;
  box-shadow:  black 2px;
 
  background-color: #67351E;
 
  color: #DBDBDB;
  margin-bottom: 10px;
}
.signup-btn {
  height:25px !important; 
 box-shadow:  black 2px;

 background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 1px solid white;
 margin-bottom: 10px;
}
.signup-btn:hover{
  background-color: white;
  color:  #67351E;
}
/* :deep(.v-field__field ){
  border-bottom: 2px solid brown;
} */
:deep(.v-field){
  border-bottom:3px solid #612800;
}
:deep(.v-text-field .v-field--no-label input, .v-text-field .v-field--active input) {
    opacity: 1;
    font-weight: 900;
    color: #400000;
}
.overlay-title {
  background-color: rgba(0, 0, 0, 0) !important;
  padding-bottom: 10px;
  font-size: 40px;
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: white; /* Background color with opacity */
  /* Adjust padding as needed */
  border-radius: 10px; /* Rounded corners */
}.bgimage{
  position: relative;
  width: 100%;
  height: 100vh;
  
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: linear-gradient(225deg, rgba(195, 195, 195, 0.04) 0%, rgba(195, 195, 195, 0.04) 25%,rgba(234, 234, 234, 0.04) 25%, rgba(234, 234, 234, 0.04) 50%,rgba(107, 107, 107, 0.04) 50%, rgba(107, 107, 107, 0.04) 75%,rgba(132, 132, 132, 0.04) 75%, rgba(132, 132, 132, 0.04) 100%),linear-gradient(65deg, rgba(116, 116, 116, 0.04) 0%, rgba(116, 116, 116, 0.04) 25%,rgba(219, 219, 219, 0.04) 25%, rgba(219, 219, 219, 0.04) 50%,rgba(33, 33, 33, 0.04) 50%, rgba(33, 33, 33, 0.04) 75%,rgba(165, 165, 165, 0.04) 75%, rgba(165, 165, 165, 0.04) 100%),linear-gradient(251deg, rgba(38, 38, 38, 0.04) 0%, rgba(38, 38, 38, 0.04) 25%,rgba(223, 223, 223, 0.04) 25%, rgba(223, 223, 223, 0.04) 50%,rgba(35, 35, 35, 0.04) 50%, rgba(35, 35, 35, 0.04) 75%,rgba(203, 203, 203, 0.04) 75%, rgba(203, 203, 203, 0.04) 100%),linear-gradient(236deg, rgba(206, 206, 206, 0.04) 0%, rgba(206, 206, 206, 0.04) 25%,rgba(13, 13, 13, 0.04) 25%, rgba(13, 13, 13, 0.04) 50%,rgba(151, 151, 151, 0.04) 50%, rgba(151, 151, 151, 0.04) 75%,rgba(255, 255, 255, 0.04) 75%, rgba(255, 255, 255, 0.04) 100%),linear-gradient(260deg, rgba(133, 133, 133, 0.04) 0%, rgba(133, 133, 133, 0.04) 25%,rgba(169, 169, 169, 0.04) 25%, rgba(169, 169, 169, 0.04) 50%,rgba(91, 91, 91, 0.04) 50%, rgba(91, 91, 91, 0.04) 75%,rgba(74, 74, 74, 0.04) 75%, rgba(74, 74, 74, 0.04) 100%),linear-gradient(90deg, rgb(8, 35, 191),rgb(1,66,124)); */
  /* background-image: linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%,rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%,rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%),linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%,rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%,rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%),linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%,rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%,rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%),linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%,rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%,rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%),linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%,rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%,rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%),linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%,rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%,rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.89999999999999%),linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%,rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%,rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.89999999999999%),linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%,rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%,rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%),linear-gradient(0deg, rgb(0,0,0),rgb(0,0,0)); */
  /* background-image: linear-gradient(224deg, rgba(63, 63, 63, 0.1) 0%, rgba(63, 63, 63, 0.1) 50%,rgba(155, 155, 155, 0.1) 50%, rgba(155, 155, 155, 0.1) 100%),linear-gradient(89deg, rgba(75, 75, 75, 0.02) 0%, rgba(75, 75, 75, 0.02) 50%,rgba(99, 99, 99, 0.02) 50%, rgba(99, 99, 99, 0.02) 100%),linear-gradient(151deg, rgba(14, 14, 14, 0.02) 0%, rgba(14, 14, 14, 0.02) 50%,rgba(74, 74, 74, 0.02) 50%, rgba(74, 74, 74, 0.02) 100%),linear-gradient(7deg, rgba(31, 31, 31, 0.04) 0%, rgba(31, 31, 31, 0.04) 50%,rgba(210, 210, 210, 0.04) 50%, rgba(210, 210, 210, 0.04) 100%),linear-gradient(291deg, rgba(153, 153, 153, 0.07) 0%, rgba(153, 153, 153, 0.07) 50%,rgba(32, 32, 32, 0.07) 50%, rgba(32, 32, 32, 0.07) 100%),linear-gradient(90deg, rgb(4, 164, 188),rgb(9, 51, 170)); */
  background-image:url('../../assets/background2.jpg');
}
</style>
