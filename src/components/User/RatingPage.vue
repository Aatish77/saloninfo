<template>
    <v-card style="background-color: black; height: 100vh">
    <div class="text-center a" >
        <div class="ar">
        <h1>We Value Your Feedback!</h1>
        <h4>Thank you for visiting {{parlourName}}! We hope you had a wonderful experience. Your feedback helps us improve and provide the best service possible.</h4>
    </div><v-rating 
      style="color:gold;font-size:120%"
      
        v-model="rating"
        clearable
      ></v-rating>
      <div>
      <v-btn @click="submit">
  Submit
</v-btn></div>
    </div>
</v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        rating: 0,
        parlourName:"The Garage"
      }),
      methods:{
        submit(){
            
        }
      }
    }
  </script>
  <style scoped>
  body{
    background-color: black;
  }
.a{ height: 100%;
    background-color: black;
}
.ar{
    margin-top:200px;
    margin-left:250px;
    width:1000px;
    color:white;
}
</style>