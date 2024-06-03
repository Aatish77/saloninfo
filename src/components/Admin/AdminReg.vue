<template>
    <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
      <v-layout>
        <v-app-bar
          color="teal-darken-4"
        style="background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(255,255,255,.0), rgba(255,255,255,.2)"
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
          <v-btn style="background-color: blue" @click="navLogin">Login</v-btn>
  
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
            <v-form @submit.prevent="submit" ref="form">
              <v-row>
                <v-col cols="12">
                  <h2 class="text-center">Admin Registration</h2>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="adminName"
                    label="Full Name"
                    variant="underlined"
                    :rules="fullNameRules"
                  ></v-text-field>
                </v-col>
  
               
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="email"
                    placeholder="example@gmail.com"
                    label="Email"
                    variant="underlined"
                    :rules="emailRules"
                  ></v-text-field>
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
                    <h3 class="mb-5">You have been Registered Successfully</h3>
                    <v-btn
                      @click="dialogVis = false"
                      style="width: 150px; margin-bottom: 5px"
                      >Ok</v-btn
                    >
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
  export default {
    data() {
      return {
        dialogVis: false,
        show1: false,
        show2: false,
        adminName: "",
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
        this.$router.push("/");
      },
      submit() {
        // Check if the form is valid
        this.$refs.form.validate().then((valid) => {
          if (valid.valid) {
            this.dialogVis = true;
            const data={"adminName":this.adminName,"email":this.email,"password":this.password}
            
            this.$store
              .dispatch("addTheAdmin", data)
              .then(() => {
                
                // Reset form data after successful dispatch
                this.resetFormData();
                this.$router.push("/adminlogin")
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
        this.adminName = "";
       
        this.email = "";
        this.password = "";
        this.cpassword = "";
      },
    },
  };
  </script>
  <style scoped>
  :root {
    background-color: black;
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
  </style>
  