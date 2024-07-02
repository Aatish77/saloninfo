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
.bgimage{
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
.bgimage::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(0px);
  z-index: 0;
}
</style>
