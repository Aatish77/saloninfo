<template>
    <v-card style="background-color: black; height: 100vh">
    <div class="a" >
        <div class="ar">
        <h1>We Value Your Feedback!</h1>
        <h4>Thank you for visiting {{parlourName}}! We hope you had a wonderful experience. Your feedback helps us improve and provide the best service possible.</h4>
    </div><v-rating 
      style="color:gold;font-size:120%"
      
        v-model="rating"
        clearable
      ></v-rating>
      <div style="color:white;width: 700px;">
      <v-textarea
      
      v-model="review"
      label="Write a review"
      maxlength="120"
      counter
      single-line
    ></v-textarea></div>
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
        parlourId:2,
        parlourName:"The Garage",
        customerName :"Rakesh",
        review:""

      }),
      methods:{
        submit(){
          const data={"id":32,"customerName":this.customerName,"customerRating":this.rating,"review":this.review, "ratingValue": 5
          }
            
            this.$store
              .dispatch("addRating", {"parlourId":this.parlourId,"pay":data})
              .then(() => {
                
                // Reset form data after successful dispatch
                alert("Thank you for the feedback")
                // this.$router.push("/adminlogin")
              })
              .catch((error) => {
                console.error("Error adding user:", error);
              }); 
        }
      }
    }
  </script>
  <style scoped>
  body{
    background-color: black;
  }
.v-card{
   
  display: flex;
            justify-content: center;
            /* Optional: Centers vertically as well */
            align-items: center; 
    background-color: black;
}

.ar{
    
    width:1000px;
    color:white;
}
</style>