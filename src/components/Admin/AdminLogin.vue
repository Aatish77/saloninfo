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
          <h4 class="mx-3">
          Admin
          </h4>
          
        </v-app-bar> -->
      <v-main class="bgimage">
        <v-row class="content">
          <h1 class="overlay-title">
            <i class="fas fa-cut" style="font-size: 25px"></i>saloninfo
          </h1>
          <v-row class="content-inner">
            <v-col align="center" style="width: 350px">
              <img class="slideshow" :src="currentImage" alt="Slideshow" />
            </v-col>
            <v-form @submit.prevent="login" ref="form">
              <v-col style="width: 350px">
                <v-sheet class="mx-auto login" width="200">
                  <h2 class="title text-center">Login</h2>
                  
                    <v-text-field
                      class="mb-2"
                      v-model="email"
                      :rules="[rules.required]"
                      variant="outlined"
                      placeholder="Email"
                    ></v-text-field>
                    <v-text-field
                      class="mb-1"
                      v-model="password"
                      variant="outlined"
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
                    <v-btn elevation="6" rounded="xl" class="mt-0 login-btn" type="submit" block 
                      >Login</v-btn
                    >
                  
                </v-sheet>
              </v-col>
            </v-form>
          </v-row>
        </v-row>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  
  data: () => ({
    show1: false,
    show2: true,
    error: "",
    images: [
      "https://wallpapercave.com/wp/wp11627912.jpg",
      "https://getwallpapers.com/wallpaper/full/2/3/d/1510850-new-hair-salon-wallpaper-2100x1400-samsung-galaxy.jpg",
      "https://getwallpapers.com/wallpaper/full/1/f/7/1510836-hair-salon-wallpaper-1920x1080-for-mobile-hd.jpg",
      "https://getwallpapers.com/wallpaper/full/1/0/e/1510826-cool-hair-salon-wallpaper-2560x1600.jpg",
    ],
    currentIndex: 0,
    intervalId: null,
    intervalDuration: 3000,

    email: "",
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
    admin() {
      return this.$store.getters["getAdmin"];
    },
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    async login(){
      
      try {
        const res = await this.$store.dispatch("adminLogin", {
          "email":this.email,
          "password":this.password
        })
        if(res){
          this.$router.push("/adminhome")
        }
        else{
          this.error = "The email id and password don't match";
        }
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
      this.$refs.form.validate().then(valid => {
        if (valid.valid) {
          this.error = '';
          

          if (this.email === this.admin.email && this.password === this.admin.password) {
            sessionStorage.setItem('currentAdmin', JSON.stringify(this.admin));
            this.$router.push('/adminhome');
             
          }
          else {
            this.error = "The email id and password don't match";
          }
        }
      });
    }
  },
};
</script>
<style scoped>
.cl{
   color: #612800;
}
.login {
  /* border-radius: 20px; */
  margin-top: 20px;
  margin-bottom: 20px;
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
  font-size: 40px;
  font-weight: 1000 !important;
  margin-bottom: 30px;
}
.slideshow {
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-right: 5px ; */
  border-radius: 50% 50% 50% 50%;
  width: 350px;
  height: 350px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.content {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.496); /* Adjust the opacity as needed */
  padding: 220px;
  padding-top: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.561);
  border-radius: 10px;
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
  /* background-image: radial-gradient(
    circle at center center,
    rgb(0, 15, 121),
    rgb(2, 2, 98)
  ); */
  box-shadow:  black 2px;
  /* background-color: rgb(198, 130, 87); */
  /* background-color: #a0522d; */
  background-color: #67351E;
  /* color: #cd853f; */
  /* color:#f4a460 */
  color: #DBDBDB;
}
/* :deep(.v-field__field ){
  border-bottom: 2px solid brown;
} */
:deep(.v-field){
  border-bottom:3px solid brown;
}
:deep(.v-text-field .v-field--no-label input, .v-text-field .v-field--active input) {
    opacity: 1;
    font-weight: 900;
    color: #400000;
}
.overlay-title {
  padding-bottom: 10px;
  font-size: 40px;
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: white; /* Background color with opacity */
  /* Adjust padding as needed */
  border-radius: 10px; /* Rounded corners */
}
</style>
