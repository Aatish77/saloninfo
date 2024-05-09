<template>
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
          <label for="fullName">Name:</label>
          <input type="text"  id="fullName" v-model="user.fullName">
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="user.email">
        </div>
        <div>
          <label>Mobile:</label>
          <input type="number" v-model.number="user.phone">
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
  </template>
  
  <script>
  export default {
    data() {
      return {
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
        // Add logic to save user profile
      }
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
  margin-right: 320px;
  background-color: transparent;
  border: 2px solid #ffffff; /* Add border styling */
  border-radius: 50%;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}
  .profile {
	margin: auto;
	height: 520px;
	width: 400px;
	background: #ffffff;
    margin-top: 20px;
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