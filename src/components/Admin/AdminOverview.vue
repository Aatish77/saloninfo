
<template>
  <v-app id="inspire">
    <v-app-bar
      style="z-index: 1;background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
      color="teal-darken-4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>saloninfo</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      style="background-color: black; color:white;"
      v-model="drawer"
      temporary
    >
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Overview"
          value="overview"
          @click="overviewClick"
        ></v-list-item>
        <v-list-item
          prepend-icon="fas fa-scissors"
          title="Services"
          value="services"
          @click="serviceClick"
        ></v-list-item>
        <v-list-item
          prepend-icon="fas fa-store"
          title="Parlours"
          value="parlours"
          @click="parlourClick"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-offer"
          title="Offers"
          value="offers"
          @click="offerClick"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <section id="wrapper">
      <div class="p-4">
        <div class="welcome">
          <div class="content rounded-3 p-3">
            <h1 class="fs-3" style="margin-top: 40px;">Welcome to Saloninfo</h1>
          </div>
        </div>

        <section class="statistics mt-4">
          <div class="row">
            <v-card class="bg" :style="{ width: '280px', marginRight: '16px', marginBottom: '20px',height:'120px' }" v-for="(stat, index) in statistics" :key="index">
              <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                <i :class="stat.icon + ' fs-2 text-center rounded-circle'" :style="stat.iconStyle"></i>
                <div class="ms-3">
                  <div class="d-flex align-items-center">
                    <h3 class="mb-0">{{ getStatisticValue(stat, selectedTimeframe[index]) }}</h3> <span class="d-block ms-2">{{ stat.label }}</span>
                  </div>
                  <p class="fs-normal mb-0">{{ stat.description }}</p>
                </div>
              </div>
              <div class="dropdown" style="position: absolute; top: 80px; right: 5px;width: 130px; height: 40px;">
                <v-select v-if="index>1" density="compact" v-model="selectedTimeframe[index]" :items="timeframes"></v-select>
              </div>
            </v-card>
          </div>
        </section>

        <section class="charts mt-4">
          <div class="row">
            <v-card :style="{ width: '578px', marginRight: '16px', marginBottom: '20px' }">
              <div class="chart-container rounded-2 p-3">
                <h3 class="fs-6 mb-3">Total Income : 4,45784</h3>
                <bar-chart />
              </div>
            </v-card>
            <v-card :style="{ width: '582px', marginBottom: '20px' }">
              <div class="chart-container rounded-2 p-3">
                <h3 class="fs-6 mb-3">Parlour categories</h3>
                <doughnut-chart />
              </div>
            </v-card>
          </div>
        </section>

        <!-- <v-card class="charts mt-4">
          <h3 class="fs-6 mb-3">Today's Booking: 75</h3>
          <div class="chart-container" style="height: 250px; overflow-y: auto;">
            <v-data-table
              :headers="headings"
              :items="bookings"
              :items-per-page="10"
              class="elevation-1"
              :header-props="{ style: 'background-color: #000000; color: #FFFFFF;' }"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.slNo }}</td>
                  <td>{{ item.bookingId }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.bookingDate }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.status }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </v-card> -->
      </div>
    </section>
  </v-app>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import '@iconscout/unicons/css/line.css';
import { ref } from 'vue';
import BarChart from './BarChart.vue';
import DoughnutChart from './DoughnutChart.vue';

export default {
  name: 'AdminOverview',
  components: {
    BarChart,
    DoughnutChart
  },
  setup() {
    const drawer = ref(false);
    const selectedTimeframe = ref(['today', 'today', 'today', 'today']);
    const timeframes = ['today', 'monthly', 'yearly'];

    // const headings = [
    //   { title: 'Sl No', value: 'slNo' },
    //   { title: 'Booking ID', value: 'bookingId' },
    //   { title: 'Phone', value: 'phone' },
    //   { title: 'Booking Date', value: 'bookingDate' },
    //   { title: 'Category', value: 'category' },
    //   { title: 'Price', value: 'price' },
    //   { title: 'Status', value: 'status' },
    // ];

    // const bookings = [
    //   { slNo: 1, bookingId: 'BK001', phone: '9246700932', bookingDate: '2-07-2024', category: 'Haircut', price: '150', status: 'Confirmed' },
    //   { slNo: 2, bookingId: 'BK002', phone: '9653245741', bookingDate: '4-07-2024', category: 'Manicure', price: '130', status: 'confirmed' },
    //   { slNo: 3, bookingId: 'BK003', phone: '9876431674', bookingDate: '5-07-2024', category: 'facial', price: '300', status: 'Pending' },
    //   { slNo: 4, bookingId: 'BK004', phone: '7643279012', bookingDate: '10-07-2024', category: 'Haircut', price: '230', status: 'Pending' },
    //   { slNo: 5, bookingId: 'BK005', phone: '8734127659', bookingDate: '11-07-2024', category: 'pedicure', price: '130', status: 'Pending' },
    //   { slNo: 6, bookingId: 'BK006', phone: '9086542445', bookingDate: '12-07-2024', category: 'spa', price: '400', status: 'Pending' },
    //   { slNo: 7, bookingId: 'BK007', phone: '7642688567', bookingDate: '13-07-2024', category: 'Haircut', price: '150', status: 'Pending' },
    //   { slNo: 8, bookingId: 'BK008', phone: '9345522178', bookingDate: '14-07-2024', category: 'facial', price: '430', status: 'Pending' },
    //   { slNo: 9, bookingId: 'BK009', phone: '9748553621', bookingDate: '18-07-2024', category: 'Manicure', price: '230', status: 'Pending' },
    //   { slNo: 10, bookingId: 'BK010', phone: '9822567823', bookingDate: '25-07-2024', category: 'spa', price: '500', status: 'Pending' }
    // ];

    const statistics = [
      { icon: 'fas fa-store',  value: 108, description: 'Total Parlours' },
      { icon: 'fas fa-users', value: 112, description: 'Total Users' },
      { icon: 'fas fa-calendar-check', values: [80, 2400, 864000], description: 'Total Booking' },
      { icon: 'uil-rupee-sign', values: [15000, 450000, 4457084], description: 'Total Income' }
    ];
    const getStatisticValue = (stat, timeframe) => {
      if (Array.isArray(stat.values)) {
        switch (timeframe) {
          case 'today':
            return stat.values[0];
          case 'monthly':
            return stat.values[1];
          case 'yearly':
            return stat.values[2];
        }
      }
      return stat.value;
    };

    return {
      drawer,
      selectedTimeframe,
      timeframes,
      // headings,
      // bookings,
      statistics,
      // overviewClick,
      // serviceClick,
      // parlourClick,
      // offerClick,
      // logout,
      getStatisticValue
    };
  },
  methods:{
    overviewClick() {
      this.$router.push("/overview");
    },
    serviceClick() {
      this.$router.push("/adminservices");
    },
    parlourClick() {
      this.$router.push("/adminparlours");
    },
    offerClick(){
      this.$router.push("/adminoffers")
    },
    logout() {
      console.log("logout");
      this.$router.push("/");
    },
  }
};
</script>
<style scoped>
.bg {
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%);
  color: white;
}
</style>