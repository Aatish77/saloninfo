<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        style="background-image: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(159, 159, 159, 0.07) 50%, rgba(159, 159, 159, 0.07) 77%, transparent 77%, transparent 100%), linear-gradient(90deg, transparent 0%, transparent 91%, rgba(159, 159, 159, 0.07) 91%, rgba(159, 159, 159, 0.07) 99%, transparent 99%, transparent 100%), linear-gradient(135deg, transparent 0%, transparent 24%, rgba(159, 159, 159, 0.07) 24%, rgba(159, 159, 159, 0.07) 63%, transparent 63%, transparent 100%), linear-gradient(0deg, transparent 0%, transparent 49%, rgba(159, 159, 159, 0.07) 49%, rgba(159, 159, 159, 0.07) 63%, transparent 63%, transparent 100%), linear-gradient(90deg, rgb(0,0,0), rgb(0,0,0));"
      >
        <template v-slot:prepend>
          <i class="fas fa-cut"></i>
        </template>
        <v-app-bar-title
          style="
            margin-left: 2px;
            font-size: 30px;
            font-weight: 800;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          "
        >
          saloninfo
        </v-app-bar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-app style="background-color: black;">
        <v-container fluid class="d-flex flex-column justify-content-center h-100 align-items-center">
          <v-card class="w-100" max-width="650">
            <v-card-title>Registration Status</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="18 mt-5">
                  <v-img :src="parlourPhoto" alt="Parlour Photo"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Parlour Name:</v-list-item-title>
                      <v-list-item-subtitle>{{ registrationDetails.parlourName }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Location:</v-list-item-title>
                      <v-list-item-subtitle>{{ registrationDetails.location }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Phone:</v-list-item-title>
                      <v-list-item-subtitle>{{ registrationDetails.phone }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Email:</v-list-item-title>
                      <v-list-item-subtitle>{{ registrationDetails.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>License No:</v-list-item-title>
                      <v-list-item-subtitle>{{ registrationDetails.licenseNo }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item> 
                    <v-list-item-content>
                      <v-list-item-title class="mb-1">Status:</v-list-item-title>
                      <v-btn :class="statusClass" @click="showStatusMessage">{{ statusText }}</v-btn>
                      
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
              <v-btn prepend-icon="mdi mdi-arrow-left" @click="goBack">Back</v-btn>
              <v-btn prepend-icon="mdi mdi-arrow-right" @click="nav">GOTO</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-app>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      parlourPhoto: require('@/assets/bridal.jpg'), // Update with the correct path to your parlour image
      registrationDetails: {
        parlourName: 'Amaze Beauty Parlour',
        location: 'Main Street, City',
        phone: '0987654321',
        email: 'contact@amaze.com',
        licenseNo: 'ABC12345',
        status: 0, // 0 = Denied, 1 = Approved, 2 = Waiting
      },
      statusText: '',
      statusClass: '',
    };
  },
  created() {
    this.updateStatus(this.registrationDetails.status);
  },
  methods: {
    updateStatus(status) {
      if (status === 0) {
        this.statusText = 'Denied';
        this.statusClass = 'status-denied';
      } else if (status === 1) {
        this.statusText = 'Approved';
        this.statusClass = 'status-approved';
      } else if (status === 2) {
        this.statusText = 'Waiting';
        this.statusClass = 'status-waiting';
      } else {
        this.statusText = 'Unknown';
        this.statusClass = 'status-unknown';
      }
    },
    
    goBack() {
      this.$router.push('/home'); // Adjust the route as necessary
    },
    nav(){
      this.$router.push('/parlourprofile')
    }
  },
};
</script>

<style scoped>
.v-img {
  width: 100%;
  height: auto;
}

.status-denied {
  background-color: red;
  color: white;
}

.status-approved {
  background-color: green;
  color: white;
}

.status-waiting {
  background-color: orange;
  color: white;
}

.status-unknown {
  background-color: gray;
  color: white;
}
</style>
