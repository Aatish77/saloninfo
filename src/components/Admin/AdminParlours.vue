<template>
  <v-app id="inspire">
    <v-app-bar
      style="z-index: 1;background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
      color="teal-darken-4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>saloninfo</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer style="background-color: black; color:white;" v-model="drawer" temporary>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Overview" value="overview"></v-list-item>
        <v-list-item prepend-icon="fas fa-briefcase" title="Services" value="account" @click="serviceClick"></v-list-item>
        <v-list-item prepend-icon="fas fa-tags" title="Parlours" value="account" @click="offerClick"></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
          <v-tab :value="2">Pending</v-tab>
          <v-tab :value="1">Approved</v-tab>
        </v-tabs>
      </v-card>

      <v-container v-if="tab===2">
        <v-data-table :headers="headings" :items="items" class="elevation-1">
<template v-slot:item="{ item }">
  <tr>
    <td>{{ item.sl_no }}</td>
    <td>{{ item.parlour_id }}</td>
    <td>
      <img :src="item.parlour_image" alt="Parlour Image" class="qr">
    </td>
    <td>{{ item.name }}</td>
    <td>{{ item.phone }}</td>
    <td>{{ item.email }}</td>
    <td>
      <v-icon small @click="viewDetails(item)">mdi-eye</v-icon>
    </td>
    <td>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </td>
  </tr>
</template>

</v-data-table>
      </v-container>
      <v-container v-if="tab===1">
        <v-data-table :headers="headings1" :items="items1" class="elevation-1">
<template v-slot:item="{ item }">
  <tr>
    <td>{{ item.sl_no }}</td>
    <td>{{ item.parlour_id }}</td>
    <td>
      <img :src="item.parlour_image" alt="Parlour Image" class="qr">
    </td>
    <td>{{ item.name }}</td>
    <td>{{ item.phone }}</td>
    <td>{{ item.email }}</td>
    <td>
      <v-icon small @click="viewDetails(item)">mdi-eye</v-icon>
    </td>
    <td>
      <v-icon small @click="deleteItem(item)">mdi-pencil</v-icon>/
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </td>
  </tr>
</template>

</v-data-table>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    tab: null,
    items: [
      {
        sl_no: 1,
        parlour_id: 'P001',
        parlour_image: "https://antdisplay.com/pub/media/wysiwyg/5_18__1.JPG",
        name: 'Classic Cuts',
        phone: '9846766214',
        email: 'classichair@gmail.com',
      },
      {
        sl_no: 2,
        parlour_id: 'P002',
        parlour_image: "https://www.designersarch.in/wp-content/uploads/2023/07/Low-Budget-Beauty-Salon-Interior-Design-2.jpg",
        name: 'Orchid Beauty Studio',
        phone: '9745362890',
        email: 'Orchidbeauty@gmail.com',
        
      },
      // Add more items here
    ],
    headings: [
      { title: 'Sl.no', key: 'sl_no' },
      { title: 'Parlour ID', key: 'parlour_id' },
      { title: 'Parlour Image', key: 'parlour_image' },
      { title: 'Name', key: 'name' },
      { title: 'Phone', key: 'phone' },
      { title: 'Email', key: 'email' },
      { title: 'Details', sortable: false },
      { title: 'Delete', sortable: false },

    ],
    items1: [
      {
        sl_no: 1,
        parlour_id: 'P001',
        parlour_image: "https://cdn.tapetender70er.de/media/image/6c/3d/af/Hair-Salon-Wallpaper-Design_944x944@2x.webp",
        name: 'Amaze Beauty Parlour',
        phone: '9846766214',
        email: 'classichair@gmail.com',
      },
      {
        sl_no: 2,
        parlour_id: 'P002',
        parlour_image: "https://lh3.googleusercontent.com/p/AF1QipMDDLemTXyX1So7OH68OPVnUsfRJeZkKqvoaoM6=s1360-w1360-h1020",
        name: 'The Garage Men Salon',
        phone: '9745362890',
        email: 'garage@gmail.com',
        
      },
      // Add more items here
    ],
    headings1: [
      { title: 'Sl.no', key: 'sl_no' },
      { title: 'Parlour ID', key: 'parlour_id' },
      { title: 'Parlour Image', key: 'parlour_image' },
      { title: 'Name', key: 'name' },
      { title: 'Phone', key: 'phone' },
      { title: 'Email', key: 'email' },
      { title: 'Details', sortable: false },
      {title:'Edit/Delete',sortable:false},
      // { title: ' ', sortable: false },

    ],
  }),
  // ...
}
</script>

<style scoped>
.qr {
  height: 50px;
  width: 50px;
}

</style>
