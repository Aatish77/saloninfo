<template>
  <v-app style="background-color: black; color: white;">
    <v-app-bar app fixed style="z-index: 10;background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
     color="teal-darken-4">
      <template v-slot:image>
        <v-img gradient="to top right, rgba(255,255,255,.0), rgba(255,255,255,.2)"></v-img>
      </template>
      <template v-slot:prepend>
        <i class="fas fa-cut"></i>
      </template>
      <v-app-bar-title
        style="
          margin-left: 2px;
          font-size: 30px;
          font-weight: 800;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        "
      >saloninfo</v-app-bar-title>
      <v-slide-y-transition class="mx-3">
        <!-- <v-text-field
          class="search"
          v-model="searchText"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          hide-details
        ></v-text-field> -->
      </v-slide-y-transition>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-carousel cycle interval="2500" hide-delimiters :show-arrows="false" style="height: 600px;">
      <v-carousel-item v-for="(item, i) in carouselItems" :key="i" :src="item.src" cover>
        <v-container class="fill-height d-flex" fluid>
          <h1 :class="[getTitleClass(i), 'carousel-title', getFontClass(i)]" v-html="formatTitle(item.title)"></h1>
        </v-container>
      </v-carousel-item>
    </v-carousel>

    <v-main>
      <v-container class="d-flex justify-center align-center" fluid style="height: 80px; margin-left: 500px;">
        <v-radio-group v-model="switchLabel" @change="handleSwitchChange" inline style="color:white;">
          <v-radio label="Men" value="Men" color="primary"></v-radio>
          <v-radio label="Women" value="Women" color="red"></v-radio>
        </v-radio-group>
      </v-container>
      <h1 class="mt-3" style="color:white;">Offers</h1>
      <v-row class="mt-3">
        <v-col
          class="book"
          v-for="(offer, index) in filteredOffers"
          :key="index"
          :cols="4"
        >
          <v-card @click="offernav(offer.title,switchLabel)" style="background-color: black; color: white" class="mx-auto" max-width="400">
            <v-img style="border-radius: 5px" class="align-end text-white mx-3" height="300" :src="offer.img" cover>
              <v-card-title>{{ offer.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-2 mb-0">
              Price:
              <span style="text-decoration: line-through">₹{{ offer.mrp }}</span>
            </v-card-subtitle>
            <v-card-text class="pt-0">
              <div>Offer Price: ₹{{ offer.price }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>





<script>
export default {
  data() {
    return {
      drawer: null,
      searchText: '',
      switchLabel: 'Men',
      switchColor: 'blue',
      carouselItems: [
        { src: 'https://www.stryx.com/cdn/shop/articles/how-often-men-should-get-haircuts.jpg?v=1644630261', title: 'Hair cut 50% OFF' },
        { src: 'https://houseofdearhairsalon.com/wp-content/uploads/2022/04/5-Salon-Hair-Treatments-to-Fix-Your-Hair-From-Root-to-Tip-1024x576.jpg', title: 'Hair Treatment 25% OFF' },
        { src: 'https://media.istockphoto.com/id/980122828/photo/young-man-applying-anti-aging-lotion-fot-skin-care.jpg?s=612x612&w=0&k=20&c=wyfFgr-9DuZcbRh-0DHD8elICDYE-mlNk92YSTXCzaw=', title: 'Skin Care 30% OFF' },
        { src: 'https://media.istockphoto.com/id/980122828/photo/young-man-applying-anti-aging-lotion-fot-skin-care.jpg?s=612x612&w=0&k=20&c=wyfFgr-9DuZcbRh-0DHD8elICDYE-mlNk92YSTXCzaw=', title: 'Bridal Makeup 20% OFF' },
        { src: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/02/02132521/shutterstock_420858511.jpg?tr=w-1200,q-60', title: 'Tattoo 20% OFF' }
      ]
    };
  },
  created() {
    if (this.currentOffer) {
      this.switchLabel = this.currentOffer.label;
    }
  },
  methods: {
    offernav(offer,label){
        const t={offer:offer,label:label}
        sessionStorage.setItem("currentOffer",JSON.stringify(t))
        this.$router.push("/offerparlour")
    },
    handleSwitchChange() {
      console.log(this.switchLabel);
    },
    getTitleClass(index) {
      return index % 2 === 0 ? 'left-align' : 'right-align';
    },
    getFontClass(index) {
      const fontClasses = ['font-style-1', 'font-style-2', 'font-style-3'];
      return fontClasses[index % fontClasses.length];
    },
    formatTitle(title) {
      return title.replace(/(\d+%?)/g, '<span class="large-digits" style="font-size:1.5em">$1</span>');
    }
  },
  computed: {
    currentOffer() {
      const currentOffer = JSON.parse(sessionStorage.getItem('currentOffer'));
      return currentOffer;
    },
    filteredOffers() {
      return this.$store.getters.getoffers.filter(offer => offer.category === this.switchLabel);
    },
  },
};
</script>



<style scoped>
body {
  background-color: black;
  color: white;
  margin: 0; /* Remove default margin */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}

.v-carousel-item img {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover; /* Ensure the image covers the container without distortion */
}

.left-align {
  justify-content: flex-start;
  text-align: left;
  padding-left: 20px; /* Add some padding for better positioning */
}

.right-align {
  justify-content: flex-end;
  text-align: right;
  padding-right: 20px; /* Add some padding for better positioning */
}

.carousel-title {
  width: 100%; /* Ensure the title takes up the full width of the container */
}

/* Define different font styles */
.font-style-1 {
  font-family: 'Arial', sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: white; /* Gold color */
}

.font-style-2 {
  font-family: 'Arial', sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: white; /* Aqua color */
}

.font-style-3 {
  font-family: 'Arial', sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: white;  /* HotPink color */
}

.large-digits {
  
  font-size: 1.5em !important; /* Increase digit size */
  
}
</style>

