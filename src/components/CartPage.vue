<template>
    <v-card max-width="874" class="a">
      <v-card-title>Cart</v-card-title>
      <v-card-text>
        
        <div style="display: flex; align-items: center; margin-right: 300px;">
        <v-img :src="parlour.src" style="height: 150px; width: 150px;"></v-img>
        <div style="margin-left: 10px;">
          <h5>{{ parlour.parlourName }}</h5>
          <p><i class="fas fa-map-marker-alt"></i> {{ parlour.location }}</p>
        </div>
      </div>
      <v-table v-if="!cartFinal">
    
    <tbody>
      <tr
        v-for="(item,index) in cart "
        :key="item.title"
      >
      
      <td>{{item.serTitle}}</td>
        <td><h6> {{ item.title }} </h6></td>
        <td><v-btn class="btn1" >
  <v-btn class="btn2 "  @click="decreaseQuantity(item,index)"> - </v-btn>
  <span>{{ item.quantity }}</span>
  <v-btn class="btn2 " @click="increaseQuantity(item)">+</v-btn>

</v-btn></td>
        <td style="width: 200px;" >₹ {{ item.price*item.quantity }}</td>
        <td><v-btn @click="toggleBookoff(index)">{{item.date?item.date:"Select date and time"}} {{ item.slot?item.slot:"" }} {{ item.employee?item.employee.name:"" }}</v-btn></td>
        <td><v-btn @click="removeFromCart(index)">Remove</v-btn></td>   
        <v-dialog v-model="dialogOff" max-width="500px">
                    <v-card>
                      <v-card-title> Book an Appointment </v-card-title>
                      <v-card-text>
                        <book-appointment :cart="cart" :index="bookser" @child-value-updated="handleChildValueChange">{{
                          item.title
                        }}</book-appointment>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="toggleBookoff(null)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
      </tr>
      <tr><td></td>
    <td></td><td align="end">Total: </td>
<td >₹ {{total}}</td> </tr>
    </tbody>
  </v-table>
  <v-table v-else>
    
    <tbody>
      <tr
        v-for="(item,index) in cartFinal "
        :key="item.title"
      >
      <td>{{item.serTitle}}</td>
        <td><h6> {{ item.title }} </h6></td>
        <td><v-btn class="btn1" >
  <v-btn class="btn2 "  @click="decreaseQuantity(item)"> - </v-btn>
  <span>{{ item.quantity }}</span>
  <v-btn class="btn2 " @click="increaseQuantity(item)">+</v-btn>

</v-btn></td>
        <td>₹ {{ item.price*item.quantity }}</td>
        <td><v-btn @click="toggleBookoff(index)">{{item.date?item.date:'Select date and time'}} {{ item.slot?item.slot:"" }} {{ item.employee?item.employee.name:"" }}</v-btn></td>
        <td><v-btn @click="removeFromCart(index)">Remove</v-btn></td>   
        <v-dialog v-model="dialogOff" max-width="500px">
                    <v-card>
                      <v-card-title> Book an Appointment </v-card-title>
                      <v-card-text>
                        <book-appointment :cart="cart" :index="bookser" @child-value-updated="handleChildValueChange">{{
                          item.title
                        }}</book-appointment>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="toggleBookoff(null)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
      </tr>
      <tr><td></td>
    <td></td><td>Total: </td>
<td>₹ {{total}}</td><td></td> </tr>
    </tbody>
  </v-table>
              
      </v-card-text>
      <v-card-actions>
        <v-btn color="black" variant="text" @click="reserve">
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
    
  </template>
  
  <script>
import BookAppointment from "./BookAppointment.vue";
  export default {
    components:{
      BookAppointment
    },
    
    props: {
      cart: {
        type: Array,
        required: true,
      },
      parlour:{
        type: Object,
        required:true
      }
    },
    data(){
      return{
        dialogOff: false,
        cartFinal:null,
        bookser:null,
      }
    },
    watch:{
      cartFinal(){
        this.$emit('child-value-updated', this.cartFinal);
      }
    },
    methods: {
      toggleBookoff(index) {
      if (index != null) {
        this.bookser = index;
        
        this.dialogOff = !this.dialogOff;
      } else {
        this.dialogOff = !this.dialogOff;
      }
    },
      handleChildValueChange(value) {
      // Handle the value passed from the child component
      this.cartFinal = value;
    },
        increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item,index) {
      if (item.quantity > 1) {
        item.quantity--;
      }
      else{
        this.removeFromCart(index)
      }
    },
      removeFromCart(index) {
        this.$emit("removeFromCart", index);
      },
    },
    computed: {
        total(){
            let total=0
            for (let i of this.cart){
                total = total + i.price*i.quantity
            }
            return total
        }
  
},
  };
  </script>
  <style scoped>
  .btn2{
  color:white;
  margin-left:2px;
  background-color: rgb(0, 0, 0);
  font-size: 20px;

}.btn1 {
  color: white;
  background-color: black;
}
.a{
  background-color: white;
  color: black;
}
  </style>