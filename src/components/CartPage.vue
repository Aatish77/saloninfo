<template>
    <v-card max-width="674" class="a">
      <v-card-title>Cart</v-card-title>
      <v-card-text>
        
        <div style="display: flex; align-items: center;">
        <v-img :src="parlour.src" style="height: 150px; width: 150px;"></v-img>
        <div style="margin-left: 20px;">
          <h5>{{ parlour.parlourName }}</h5>
          <p><i class="fas fa-map-marker-alt"></i> {{ parlour.location }}</p>
        </div>
      </div>
      <v-table>
    
    <tbody>
      <tr
        v-for="(item,index) in cart "
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
        
        <td><v-btn @click="removeFromCart(index)">Remove</v-btn></td>
      </tr>
      <tr><td></td>
    <td></td>
<td>Total: ₹ {{total}}</td> </tr>
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

  export default {
    
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
    methods: {
        
        increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
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