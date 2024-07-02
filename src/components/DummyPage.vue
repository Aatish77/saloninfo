<template>
  <v-app>
    <v-main>
      <v-container>
       

        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12" md="8">
              <v-card class="elevation-12">
                <!-- <v-card-title class="headline">Register</v-card-title>
                <br><br> -->
                <v-card-text>
                  <v-form @submit.prevent="submit" ref="form">
                    <v-row>
                      <v-col cols="12">
                <h2 class="text-center" style="color: white;">User Registration</h2>
              </v-col>
                    </v-row>
                    <v-text-field
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
                    <v-btn  type="submit" class="reg">signup</v-btn>

                    <v-btn type="submit" class="log" @click="navLogin"> Login</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

       
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialogVis: false,
      show1: false,
      show2: false,
      fullName: "",
      phone: "",
      password: "",
      email: "",
      cpassword: "",
      parlour: {},
    };
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
  },
  methods: {
    navLogin() {
      this.$router.push("/userlogin");
    },
    submit() {
      this.$refs.form.validate().then((valid) => {
        if (valid.valid) {
          this.dialogVis = true;
          const data = {"fullName":this.fullName,"phone":this.phone,"email":this.email,"password":this.password}
          

          this.$store
            .dispatch("addTheUser", data)
            .then(() => {
            
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
      this.fullName = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.cpassword = "";
    },
  },
  
};
</script>

<style scoped>

.v-main {
  background-color: #9f9999;
  background-image:  url('@/assets/background2.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(0px); 
}


.v-application--wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-card {
  background-color:  rgba(63, 63, 62, 0.75);
  backdrop-filter: blur(2px); 
}

.v-btn {
  margin: 20px 0;
}
.v-text-field{
  color:white
}
.log{
  margin-left: 20px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0);
  color:white;
  border:1px solid white
}
.log:hover{
  background-color: rgb(255, 255, 255)!important;
  color: black;
}
.reg{
  margin-left: 60px;
  border-radius: 24px;
}
</style>
