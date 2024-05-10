<template>
    
    <v-card style="background-color: black; color: white;" :loading="loading" class="mx-auto my-1 py-0" max-width="474">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-card-item>
        <v-card-title><slot></slot></v-card-title>
        <v-card-subtitle>
          <span class="me-1">Price: ₹{{ cart[index].price }} </span>
        </v-card-subtitle>
      </v-card-item>
  
      
        <v-container style="background-color: black;">
          <v-row justify="space-around">
            <div>
    <v-date-picker v-model="selectedDate" color="primary" format="YYYY-MM-DD"></v-date-picker>
    <p style="color: white">Selected Date: {{ formattedDate }}</p>
  </div>
          </v-row>
        </v-container>
        <v-checkbox label="Do you prefer an employee?" v-model="customemp"></v-checkbox>
        <div v-if="customemp">
        <v-card-title>Available employees</v-card-title>
        <v-row class="mt-3">
        <v-col @click="select(index1)" :class="se===index1?'t':''"  v-for="(emp,index1) in cart[index].employees" :key="emp">
          <div class="d-flex flex-column align-center" @click="employee=emp">
    <v-avatar :image="emp.img" size="73"></v-avatar>
    
    <h6 class="mt-2">{{ emp.name }}</h6>
  </div>
    </v-col></v-row>
  </div>
      
      <v-divider class="mx-4 mb-1 mt-0" ></v-divider>
  
      <v-card-title>Availability</v-card-title>
  
      <div class="px-4">
        <v-row v-if="employee" v-model="selection" class="chip-group">
          <v-chip v-for="slot in employee.slots" :key="slot" :class="selection===slot?'te':'s'" @click="selection=slot" >{{ slot }}</v-chip>
        </v-row>
        <v-row v-else v-model="selection" class="chip-group">
          <v-chip v-for="slot in cart[index].slots" :key="slot" :class="selection===slot?'te':'s'" @click="selection=slot">{{ slot }}</v-chip>
        </v-row>
      </div>
  
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import moment from 'moment';
    export default {
        props:['cart','index'],
      data: () => ({
        customemp:false,
        loading: false,
        selection: null,
        se:null,
        selectedDate:null,
        employee:null,
        cartFinal:[]
      }),
  
      methods: {
        select(index){
          this.se=index
        },
        reserve() {
          console.log("slots",this.employee.slots)
          for ( let i=0;i<this.cart.length;++i){
            if(this.index!=i){
              this.cartFinal[i]=this.cart[i]
            }
            else{
              this.cartFinal[this.index]=this.cart[this.index]
              this.cartFinal[this.index].date=this.formattedDate
              this.cartFinal[this.index].employee=this.employee
              this.cartFinal[this.index].slot=this.selection
            }
          }
          this.$emit('child-value-updated', this.cartFinal);
          console.log(this.cartFinal)
          // this.loading = true
          
          // setTimeout(() => (this.loading = false), 2000)
        },
      },
      computed: {
    formattedDate() {
      // Check if selectedDate is not null or undefined
      if (this.selectedDate) {
        // Format selectedDate to dd/mm/yyyy using moment.js
        return moment(this.selectedDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
      } else {
        return ''; // Return empty string if selectedDate is null or undefined
      }
    }
  }
    }
  </script>
  <style scoped>
  .te{
    background-color: rgb(0, 85, 160);
    color:white;
  }
  .t{
    background-color: rgba(240, 248, 255, 0.324);
    border-radius:  0%;
    border:2px; 
  }
  .chip-group {
    flex-wrap: wrap;
    color:white;
  }
  .slot-chip {
    color:white;
    white-space: normal;
  }
  .v-chip {
    margin-top: 7px;
    margin-right: 15px;
  }
  .s{
    background-color: white;
    color:black;
  }
  </style>