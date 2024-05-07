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
          <span class="me-1">Price: ₹{{ price }} </span>
        </v-card-subtitle>
      </v-card-item>
  
      
        <v-container style="background-color: black;">
          <v-row justify="space-around">
            <v-date-picker color="primary" ></v-date-picker>
          </v-row>
        </v-container>
        <v-checkbox label="Do you prefer an employee?" v-model="customemp"></v-checkbox>
        <div v-if="customemp">
        <v-card-title>Available employees</v-card-title>
        <v-row class="mt-3">
        <v-col @click="select(index)" :class="se===index?'t':''"  v-for="(emp,index) in selected.employees" :key="emp">
          <div class="d-flex flex-column align-center">
    <v-avatar :image="emp.img" size="73"></v-avatar>
    
    <h6 class="mt-2">{{ emp.name }}</h6>
  </div>
    </v-col></v-row>
  </div>
      
      <v-divider class="mx-4 mb-1 mt-0" ></v-divider>
  
      <v-card-title>Availability</v-card-title>
  
      <div class="px-4">
        <v-chip-group v-model="selection">
          <v-chip>10:30AM</v-chip>
  
          <v-chip>1:30PM</v-chip>
  
          <v-chip>3:00PM</v-chip>
  
          <v-chip>7:00PM</v-chip>
        </v-chip-group>
      </div>
  
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
    export default {
        props:['price','selected'],
      data: () => ({
        customemp:false,
        loading: false,
        selection: 1,
        se:null
      }),
  
      methods: {
        select(index){
          this.se=index
        },
        reserve() {
          this.loading = true
          
          setTimeout(() => (this.loading = false), 2000)
        },
      },
    }
  </script>
  <style scoped>
  .t{
    background-color: rgba(240, 248, 255, 0.324);
    border-radius:  0%;
    border:2px; 
  }
  </style>