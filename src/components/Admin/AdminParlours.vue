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
        <v-list-item prepend-icon="mdi-home-city" title="Overview" value="overview" @click="overviewClick"></v-list-item>
        <v-list-item prepend-icon="fas fa-briefcase" title="Services" value="account" @click="serviceClick"></v-list-item>
        <v-list-item prepend-icon="fas fa-tags" title="Parlours" value="account" @click="parlourClick"></v-list-item>
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
          <v-tab :value="2">Pending Requests</v-tab>
          <v-tab :value="1">Approved Requests</v-tab>
        </v-tabs>
      </v-card>
      <v-container v-if="tab === 2">
        <v-data-table :headers="headings" :items="items" class="elevation-1"
        :header-props="{ style: 'background-color: #000000; color: #FFFFFF;' }">
          <template v-slot:item="{ item, index }">
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
                <v-icon small @click="viewDetails(index)" color="black darken-4">mdi-eye</v-icon>
              </td>
              <td>
                <v-icon small @click="confirmDelete(item)" color="red darken-4">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
      <v-container v-if="tab === 1">
        <v-data-table :headers="headings1" :items="items1" class="elevation-1"
        :header-props="{ style: 'background-color: #000000; color: #FFFFFF;' }">
          <template v-slot:item="{ item,index }">
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
                <v-icon small @click="viewApprove(index)">mdi-eye</v-icon>
              </td>
              <td>
                <v-icon small>mdi-pencil</v-icon>/
                <v-icon small @click="confirmDelete(item)" color="red darken-4">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" width="290" style="border-radius: 32px;">
      <v-card>
        <v-card-title class="headline">
          <v-container class="delete-icon-container" align-center justify-center>
            <v-icon color="red darken-4" class="delete">mdi-delete</v-icon>
          </v-container>
        </v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteItem">
            OK
          </v-btn>
          <v-btn color="grey darken-1" text @click="cancelDelete">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Detail View Dialog -->
    <v-dialog v-model="viewDialog" max-width="800px" style="border-radius: 32px;">
      <v-card style="background-color: black; color:white">
        <v-btn
          icon
          @click="viewDialog = false"
          class="close-btn"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="headline">{{ selectedSalon.name }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-img :src="selectedSalon.parlour_image" aspect-ratio="1"></v-img>
              </v-col>
              <v-col cols="12" md="8">
                <p><strong>Phone:</strong> {{ selectedSalon.phone }}</p>
                <p><strong>Email:</strong> {{ selectedSalon.email }}</p>
                <p><strong>Location:</strong> {{ selectedSalon.location }}</p>
                <p><strong>Description:</strong> {{ selectedSalon.description }}</p>
                <p><strong>License No:</strong> {{ selectedSalon.licenseNo }}</p>
                <p><strong>License:</strong> <a :href="selectedSalon.license" target="_blank">View License</a></p>
                <div v-if="tab === 2">
                <v-btn
                  style="background-color: white; color: black !important; margin-right: 8px;"
                  variant="text"
                  @click="acceptDialog=true"
                >Accept</v-btn>
                
                <v-btn
                  style="background-color: white; color: black !important"
                  variant="text"
                  @click="reject"
                >Reject</v-btn>
              </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="acceptDialog" max-width="350px" style="border-radius: 21px;">
    <v-card>
      <v-card-title>Accept Confirmation</v-card-title>
      <v-card-text style="color:green;font-size: small;">
        Are you sure you want to accept this request?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="acceptRequest">Yes</v-btn>
        <v-btn color="grey darken-2" text @click="acceptDialog = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Detail View Dialog -->
  <!-- <v-dialog v-model="viewDialog" max-width="800px" style="border-radius: 32px;">
      <v-card style="background-color: black; color:white">
        <v-btn
          icon
          @click="viewDialog = false"
          class="close-btn"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="headline">{{ selectedSalon.name }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-img :src="selectedSalon.parlour_image" aspect-ratio="1"></v-img>
              </v-col>
              <v-col cols="12" md="8">
                <p><strong>Phone:</strong> {{ selectedSalon.phone }}</p>
                <p><strong>Email:</strong> {{ selectedSalon.email }}</p>
                <p><strong>Location:</strong> {{ selectedSalon.location }}</p>
                <p><strong>Description:</strong> {{ selectedSalon.description }}</p>
                <p><strong>License No:</strong> {{ selectedSalon.licenseNo }}</p>
                <p><strong>License:</strong> <a :href="selectedSalon.license" target="_blank">View License</a></p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    tab: null,
    dialog: false,
    viewDialog: false,
    selectedIndex: null,
    acceptDialog: false,
    items: [
      {
        sl_no: 1,
        parlour_id: 'P001',
        parlour_image: "https://antdisplay.com/pub/media/wysiwyg/5_18__1.JPG",
        name: 'Classic Cuts',
        phone: '9846766214',
        email: 'classichair@gmail.com',
        location: '123 Main St, City',
        description: 'A classic salon with modern amenities.',
        licenseNo: 'LIC123456',
        license: '#'
      },
      {
        sl_no: 2,
        parlour_id: 'P002',
        parlour_image: "https://www.designersarch.in/wp-content/uploads/2023/07/Low-Budget-Beauty-Salon-Interior-Design-2.jpg",
        name: 'Orchid Beauty Studio',
        phone: '9745362890',
        email: 'Orchidbeauty@gmail.com',
        location: '456 High St, City',
        description: 'Your beauty, our duty.',
        licenseNo: 'LIC654321',
        license: '#'
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
      { title: 'View', sortable: false },
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
        location: '789 High St, City',
        description: 'Your beauty, our duty.',
        licenseNo: 'LIC654321',
        license: '#'
      },
      {
        sl_no: 2,
        parlour_id: 'P002',
        parlour_image: "https://lh3.googleusercontent.com/p/AF1QipMDDLemTXyX1So7OH68OPVnUsfRJeZkKqvoaoM6=s1360-w1360-h1020",
        name: 'The Garage Men Salon',
        phone: '9745362890',
        email: 'garage@gmail.com',
        location: '910 High St, City',
        description: 'Your beauty, our duty.',
        licenseNo: 'LIC654321',
        license: '#'
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
      { title: 'Edit/Delete', sortable: false },
    ],
    itemToDelete: null,
    selectedSalon: {
      parlour_image: '',
      name: '',
      phone: '',
      email: '',
      location: '',
      description: '',
      licenseNo: '',
      license: ''
    }
  }),
  methods: {
    overviewClick() {
      this.$router.push("/overview");
    },
    serviceClick() {
      this.$router.push("/adminservices");
    },
    parlourClick() {
      this.$router.push("/adminparlours");
    },
    logout() {
      console.log("logout");
      this.$router.push("/");
    },
    confirmDelete(item) {
      this.itemToDelete = item;
      this.dialog = true;
    },
    cancelDelete() {
      this.dialog = false;
      this.itemToDelete = null;
    },
    deleteItem() {
      if (this.tab === 2) {
        this.items = this.items.filter(i => i.parlour_id !== this.itemToDelete.parlour_id);
      } else if (this.tab === 1) {
        this.items1 = this.items1.filter(i => i.parlour_id !== this.itemToDelete.parlour_id);
      }
      this.dialog = false;
      this.itemToDelete = null;
    },
    viewDetails(index) {
      this.selectedIndex = index;
      this.selectedSalon = this.items[index];
      this.viewDialog = true;
    },
    reject() {
      this.viewDialog = false;
    },
    
    acceptRequest() {
      // Move the selected item from items to items1
      const acceptedItem = this.items.splice(this.selectedIndex, 1)[0];
      this.items1.push(acceptedItem);

      // Close the dialog
      this.acceptDialog = false;
      this.viewDialog = false;
    },
    viewApprove(index) {
      this.selectedSalon = this.items1[index];
      this.viewDialog = true;

    },


  }
}
</script>

<style scoped>
.qr {
  height: 50px;
  width: 50px;
}
.delete{
  font-size: 50px;
}
.delete-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}


</style>
