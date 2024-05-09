<template>
    <div class="user-profile">
      <h2>User Profile</h2>
      <div>
        <label>Name:</label>
        <input type="text" v-model="user.fullName">
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="user.email">
      </div>
      <div>
        <label>Mobile:</label>
        <input type="number" v-model.number="user.phone">
      </div>
      <div> 
      </div>
      <button @click="saveProfile">Save</button>
    </div>
    <div>
    <label class="label">Booking:</label>
        
        <table class="table table-dark table-striped">
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
        user: {
          fullName: 'aaa',
          email: '',
          phone:'',
          booking:'',
         
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
      saveProfile() {
        // Logic to save user profile data
        console.log('Saving user profile:', this.user);
      }
    }
  };
  </script>
  
  <style>
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
  .user-profile button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  .label{
    color: #ccc;
  }
  input{
    color: white;
  }
  </style>
  