<template>
  <v-app style="background-color: black;">
      <v-app-bar app fixed style="z-index: 10;background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
     color="teal-darken-4">
      <template v-slot:image>
        <v-img gradient="to top right, rgba(255,255,255,.0), rgba(255,255,255,.2)"></v-img>
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
      >saloninfo</v-app-bar-title>
      <v-slide-y-transition class="mx-3">
        <!-- <v-text-field
          class="search"
          v-model="searchText"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          hide-details
        ></v-text-field> -->
      </v-slide-y-transition>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
  
    <div class="profile created-by-anniedotexe">
    <div class="profile-pic">
      <div class="header-color"></div>
      <img :src="user.image" alt="Profile Picture">
    </div>
    <div class="title">
      <h1>{{ user.fullName }}</h1>
      <h5>{{ user.email }}</h5>
      <p>{{ user.phone }}</p>
    </div>
    
    <div class="description">
      
    </div>
    <button class="follow button1" @click="dialog=!dialog">Edit</button>
    <div class="images-container">
    </div>
  </div>
    <v-dialog v-model="dialog">
    <div class="profile created-by-anniedotexe">
        <button class="close-btn" @click="dialog = false">X</button>
      <div class="title">
        <h1>Edit Profile</h1>
      </div>
      
      <div class="user-profile">

        <div>
          
          <v-text-field style="color:black;width: 300px;" type="text"  id="fullName" label="Name" :rules="nameRules" v-model="user.fullName"></v-text-field>
        </div>
        <div>
          
          <v-text-field label="Email" style="color:black;width: 300px;" type="email" v-model="user.email" :rules="emailRules"></v-text-field>
        </div>
        <div>
          
          <v-text-field label="Phone Number" style="color:black;width: 300px;" type="text" v-model.number="user.phone" :rules="phoneRules"></v-text-field>
        </div>
        <button class="button1" @click="saveProfile">Save</button>
        
      </div>
    </div>
</v-dialog>

    <div class="c1">
    <label class="bk" style="margin-left: 250px;">Booking details:</label>
        
        <table class="table table-dark table-striped" style="width: 700px; align-items: center;margin-left: 250px;">
  <thead>
    <tr>
      <th scope="col">parlourName</th>
      <th scope="col">Services</th>
      <th scope="col">Service Category</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Amaze Beauty parlour</th>
      <td>Hair cut</td>
      <td>U cut</td>
      <td>10/02/2024</td>
      <td>4:00pm</td>
      <td>250/-</td>
    </tr>
    <tr>
      <th scope="row">Classic cut and Hair salon</th>
      <td>Hair Treatment</td>
      <td>keratin treatment</td>
      <td>20/02/2024</td>
      <td>10:00am</td>
      <td>500/-</td>
    </tr>
  </tbody>
</table>
</div>
</v-app>
<v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary location="right" style="background-color: black; color:white;">
        <template v-slot:prepend>

          <v-row class="no-gutters" align="center">

            <v-col cols="10">
              <v-list-item
              v-if="currentUser"
            lines="two"
            :prepend-avatar='currentUser.image'
            subtitle="Logged in"
            :title="currentUser.fullName"
          >
          </v-list-item>
   </v-col><v-col cols="2" class="d-flex justify-end">
    <v-btn icon @click="drawer = false" style="background-color: black; color: white; ">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    
          
        </v-col>
        </v-row>
          
        </template>


        <v-list dense >
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
             @click="navigateToHome"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
            @click="clickProfile"
          ></v-list-item>
          <v-list-item
            prepend-icon="fas fa-briefcase"
            title="Services"
            value="account"
            @click="serviceClick"
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
      </v-navigation-drawer>
      
    </v-layout>
  </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer:false,
        fullName: 'Reshma',
        email: '',
        phone:'',
        booking:'',
        profilePicSrc: "",
        dialog:false,
        user: {
          fullName: "",
          email: "",
          phone: "",
          booking:"",
        }
      };
    },
    computed:{
      nameRules() {
      return [
        (v) => !!v || "Name is required.",
        (v) =>
          !/^\s/.test(v) || "Name should not start with a blank space.",
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
    currentUser(){
        return JSON.parse(sessionStorage.getItem("currentUser"));
     }
    },
    created(){
       this.user=this.currentUser; 
       console.log(this.user)
    },
    methods: {
      toggleFollow() {
        this.isFollowing = !this.isFollowing;
      },
      saveProfile() {
        this.dialog=false
        // Add logic to save user profile
      },
      clickProfile(){
      this.$router.push("/userpage")
    },
    serviceClick(){
      this.$router.push("/services")
    },
    offerClick(){
      this.$router.push("/offer")
    },
    logout(){
      
      console.log("logout")
      this.$router.push("/")
    },
    }
  };
  </script>
  
  
  <style scoped>
  label{
    color:#000000
  }
  .bk{
    color:white;
  }
  .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 40px;
  width:40px;
  margin-right: 300px;
  background-color: transparent;
  border: 2px solid #ffffff; /* Add border styling */
  border-radius: 50%;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}
  .profile {
	margin: auto;
	height: 480px;
	width: 400px;
	background: #ffffff;
  margin-top: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	border-radius: 20px;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	-ms-overflow-style: none; /* for Internet Explorer, Edge */
	scrollbar-width: none; /* for Firefox */
	overflow-y: scroll;
}

::-webkit-scrollbar {
	display: none; /* for Chrome, Safari, and Opera */
}

.header-color {
	border-radius: 20px 20px 0 0;
	padding-bottom: 150px;
	width: 400px;
	background: #33658a;
}

.profile-pic img {
	height: 200px;
	width: 200px;
	border-radius: 50%;
	border: 10px solid #ffffff;
	margin-top: -100px;
}

.title {
	margin-bottom: 25px;
}

h1 {
	font-size: 32px;
	font-weight: 700;
	color: #0c120c;
	margin-bottom: 10px;
	letter-spacing: 0.025em;
}



.button1 {
	font-family: "Open Sans", sans-serif;
	color: #ffffff;
	background: #33658a;
	font-size: 18px;
	font-weight: 600;
	letter-spacing: 0.025em;
	border: none;
	border-radius: 15px;
	min-height: 35px;
	width: 100px;
	margin-bottom: 25px;
	transition: all 0.2s ease;
	cursor: pointer;
}

.button1:hover {
	width: 115px;
	background: #4f759be0;
}

.images-container {
	width: 350px;
}

.images-container .image {
	margin-bottom: 25px;
}

.images-container .image img {
	width: 100%;
	border-radius: 5px;
	margin-bottom: 5px;
}

.images-container .image i {
	color: #9b1d20;
	display: flex;
	align-items: center;
	margin-left: 10px;
}

.images-container .image i span {
	margin-left: 5px;
	font-family: "Open Sans", sans-serif;
	font-size: 14px;
	font-weight: 400;
	color: #000000;
}
input{
 color:#000000
}
.user-profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color:white;
  }
  .user-profile div {
    margin-bottom: 10px;
  }
  .user-profile label {
    display: inline-block;
    width: 100px;
    font-weight: bold;
  }
  .user-profile input,
  .user-profile textarea {
    width: calc(100% - 100px);
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  
 
 
  
  /* Rest of your CSS styles here */
  </style>