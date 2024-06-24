<template>
  <div :class="showSignupForm?'banner-area':'banner-area1'">
    <header>
      <div class="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </header>
    <div v-if="!showSignupForm" class="banner-text">
      <h1>Salon Info</h1>
      <p>
        Transform your beauty routine with seamless scheduling and exclusive offers from top salons. Enjoy expert services at your convenience no waiting, just beauty on demand. Your perfect look is just a click away!
      </p>
      <a href="userlogin">Login</a>
      <a href="#" @click="showSignupForm = true">Sign up</a>
    </div>
    <transition name="form-slide-up" mode="out-in">
    <div v-if="showSignupForm" class="form-container">
      
      <v-card >
        <v-card-text>
          <v-form @submit.prevent="submit" ref="form">
            <v-row>
              <v-col cols="12">
                <h2 class="text-center" style="color: white;">User Registration</h2>
              </v-col>
            </v-row>
            <v-text-field
            style="color:white"
              v-model="fullName"
              label="Full Name"
              variant="underlined"
              :rules="fullNameRules"
            ></v-text-field>

            <v-text-field
              v-model="phone"
              label="Phone Number"
              variant="underlined"
              :rules="phoneRules"
            ></v-text-field>

            <v-text-field
              v-model="email"
              placeholder="example@gmail.com"
              label="Email"
              variant="underlined"
              :rules="emailRules"
               class="custom-label"
            ></v-text-field>

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
            <v-btn type="submit" class="reg">Sign up</v-btn>
            <v-btn class="log" @click="navLogin">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </transition> 
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      showSignupForm: false,
      fullName: '',
      phone: '',
      email: '',
      password: '',
      cpassword: '',
      show1: false,
      show2: false,
      fullNameRules: [
        v => !!v || 'Full name is required',
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /^[0-9]*$/.test(v) || 'Phone number must be numeric',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.password || 'Passwords must match',
      ],
    };
  },
  methods: {
    submit() {
      // Handle form submission
      console.log('Form submitted');
    },
    navLogin() {
      // Navigate to login
      console.log('Navigating to login');
    },
  },
};
</script>
<style scoped>
.v-application--wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-card {
  background-color: rgba(63, 63, 62, 0);
  backdrop-filter: blur(0px);
}

.v-btn {
  margin: 20px;
}

.v-text-field {
  color: white;
}

.custom-label >>> .v-label,
.custom-label >>> .v-label.v-label--active,
.custom-label >>> .v-label.v-label--is-dirty,
.custom-label >>> .v-label.v-label--has-placeholder {
  color: white !important;
}
.log {
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
  margin-left: 60px;
  border-radius: 24px;
}

* {
  margin: 0;
  padding: 0;
}

.banner-area {
  background-image: url('../../assets/background2.jpg');
  background-position: center center;
  background-size: cover;
  height: 100vh;
  width: auto;
  margin: auto;
  position: relative;
}

.banner-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(0px);
  z-index: 1;
}
.banner-area1 {
  background-image: url('../../assets/background2.jpg');
  background-position: center center;
  background-size: cover;
  height: 100vh;
  width: auto;
  margin: auto;
  position: relative;
}

.banner-area1::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0px);
  z-index: 1;
}

.menu {
  float: right;
  list-style: none;
  margin-top: 30px;
  position: relative;
  z-index: 2;
}

.menu ul li {
  display: inline-block;
}

.menu ul li a {
  color: #fff;
  text-decoration: none;
  padding: 5px 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.menu ul li a:hover {
  color: rgb(199, 139, 255);
}

.banner-text {
  position: absolute;
  width: 600px;
  height: 300px;
  margin: 20% 30%;
  text-align: center;
  z-index: 2;
}

.banner-text h1 {
  text-align: center;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-size: 60px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.banner-text p {
  color: #fff;
  font-size: 18px;
}

.banner-text a {
  border: 1px solid #fff;
  padding: 10px 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;
  margin-top: 20px;
  display: inline-block;
  color: #fff;
}

.banner-text a:hover {
  background-color: white;
  color: rgba(68, 25, 109, 0.623);
  font-weight: bold;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width:400px;
}
.log{
  margin-left: 20px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0);
  color:white;
  border:1px solid white;
  width:100px;
}
.log:hover{
  background-color: rgb(255, 255, 255)!important;
  color: black;
}
.reg{
  margin-left: 60px;
  border-radius: 24px;
  width: 100px;
}
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translate(-50%, 50%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
.form-slide-up-enter-active {
  animation: slide-up 1.5s ease-out forwards;
}

.form-slide-up-leave-active {
  animation: slide-up 1.5s ease-in reverse forwards;
}
</style>
