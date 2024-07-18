<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1600"> <!-- Increased max-width -->
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
    </v-layout>
    <v-app style="background-color: black;">
      <v-container fluid class="d-flex flex-column h-100 align-items-center">
        <v-card class="maintable" style="width: 90%; padding: 20px;"> <!-- Adjusted width and added padding -->
          <v-card-title class="d-flex justify-content-between align-items-center w-100 ms-4 mt-3 pt-4">
           <h5> Registration Status</h5>
           <!----Dropdown List-->
        <v-select variant="outlined"
        v-model="selectedPeriod"
        :items="['Daily', 'Weekly', 'Monthly']"
        label="Select Period"
        class=" select mb-3"
        width=""
        ></v-select>
        </v-card-title>
          <v-card-text>
            <hr>
            <div class="service-table">
              <div class="table-header">
                <div class="table-cell">Client Name</div>
                <div class="table-cell">Service</div>
                <div class="table-cell">Assistant</div>
                <div class="table-cell">Date</div>
                <div class="table-cell">Time</div>
                <div class="table-cell">Actions</div>
              </div>
              <div class="table-body">
                <div class="table-row" v-for="(service, index) in services" :key="index">
                  <div class="table-cell">{{ service.clientName }}</div>
                  <div class="table-cell">{{ service.service }}</div>
                  <div class="table-cell">{{ service.assistant }}</div>
                  <div class="table-cell">{{ service.date }}</div>
                  <div class="table-cell">{{ service.time }}</div>
                  <div class="table-cell">
                    <button class="btn btn-warning" @click="markInProgress(index)" v-if="service.status !== 'In Progress' && service.status !== 'Completed'">
                      InProgress
                    </button>
                    <button class="btn btn-primary" @click="markComplete(index)" v-if="service.status === 'In Progress'">
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-app>
  </v-card>
</template>

<script>
export default {
  name: 'ParlourTodo',
  data() {
    return {
      selectedPeriod: 'Daily',
      services: [
        {
          clientName: 'Maya',
          service: 'Spa',
          assistant: 'Anju',
          date:'12/07/2024',
          time: '09:00 AM',
          status: 'Waiting' // Possible statuses: Waiting, In Progress, Completed
        },
        {
          clientName: 'Vinu',
          service: 'Facial',
          assistant: 'Priya',
          date:'15/07/2024',
          time: '11:30 AM',
          status: 'Waiting' // Possible statuses: Waiting, In Progress, Completed
        }
      ],
    };
  },
  methods: {
    markComplete(index) {
      this.services.splice(index, 1);
    },
    markInProgress(index) {
      this.services[index].status = 'In Progress';
    },
  }
};
</script>

<style scoped>
.main-table {
  width: 100px;
  max-width: 650px;
  background-color: #125ac7;
}

.service-table {
  border: 1px solid #e02929;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
}

.table-header, .table-row {
  display: flex;
  padding: 10px;
}

.table-header .table-cell {
  background-color: #080808;
  color: white;
}

.table-cell {
  flex: 1;
  padding: 10px;
  font-size: 16px; /* Adjusted font size for better readability */
  color: #0f0101;
}

.table-body {
  display: flex;
  flex-direction: column;
  background-color: #ac7a1e;
}

.table-row {
  border-top: 1px solid #070707;
  background-color: white;
}

.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
}

.btn-warning {
  background-color: #070707;
  color: white;
  border: none;
}

.btn-primary {
  background-color: #059b14;
  color: white;
  border: none;
}

button {
  margin-right: 30px;
}
:deep(.select .v-input__control){
  width:150px;
  /* margin-left:975px;
  margin-bottom: 150px; */
}
:deep(.select.v-input){
  display: flex;
  justify-content: end;
}
</style>
