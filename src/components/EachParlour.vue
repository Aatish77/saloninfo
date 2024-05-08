<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        image="https://4kwallpapers.com/images/walls/thumbs_3t/10974.jpg"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
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
          >saloninfo</v-app-bar-title
        >

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn @click="navCart" icon>
        <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-card
          style="background-color: black; color: white"
          class="mx-auto"
          max-width="1200"
        >
          <v-container fluid>
            <v-row dense>
              <v-col :cols="12">
                <v-card style="background-color: black; color: white">
                  <v-img
                    :src="currentImage"
                    alt="Slideshow"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="500px"
                    cover
                  >
                    <v-card-title
                      class="text-white"
                      style="font-size: 30px"
                      v-text="card.parlourName"
                    ></v-card-title>
                    <v-card-subtitle
                      ><h6>{{ card.subTitle }}</h6></v-card-subtitle
                    >
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn>
                      <div>
                        <h6 class="text-end" style="margin-top: 0px">
                          {{ card.location }}
                          <i class="fas fa-map-marker-alt"></i>
                        </h6>
                       </div
                    ></v-btn>
                  </v-card-actions>

                  <h1>About</h1>
                  <v-row>
                    <v-col :cols="8">
                      <p>
                        {{ card.description }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <h1 class="mt-3">Services</h1>
            <v-row class="book" v-for="(service, index) in card.services" :key="service">
              <v-col :cols="6" md="6" v-if="index % 2 === 0">
                <v-img
                  class="round-img square-image"
                  :src="service.img"
                  height="300px"
                  width="300px"
                >
                </v-img>
              </v-col>
              <v-col :cols="6" md="6" v-else>
                <h1 class="hc1">{{ service.title }}</h1>
                <p class="pc">
                  {{ service.desc }}
                </p>

                <v-container
                  style="background-color: black !important; color: white">
                <!-- <v-btn class="btn1" @click="addToCart(service)">
  <template v-if="!service.quantity">Add to Cart</template>
  <template v-else>
    <v-btn class="btn2 mr-2" @click="decreaseQuantity(service)">-</v-btn>
    <span>{{ service.quantity }}</span>
    <v-btn class="btn2 ml-2" @click="increaseQuantity(service)">+</v-btn>
  </template>
</v-btn> -->
                <!-- <v-btn class="btn1" @click="toggleBookser(index)">
                    Book an Appointment
                  </v-btn> -->
                  <v-btn class="btn1" @click="currentService=service"><v-icon>mdi-arrow-down</v-icon></v-btn>
                  


            
                  <v-dialog v-model="dialogSer" max-width="500px">
                    <v-card>
                      <v-card-title> Book an Appointment </v-card-title>
                      <v-card-text>
                        <book-appointment :price="selectedService.price" :selected="selectedService">{{
                          selectedService.title
                        }}</book-appointment>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="toggleBookser(null)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  
                </v-container>
              </v-col>

              <v-col :cols="6" v-if="index % 2 !== 0">
                <v-img
                  class="round-img square-image"
                  :src="service.img"
                  height="300px"
                  width="300px"
                >
                </v-img>
              </v-col>
              <v-col :cols="6" v-else>
                <h1 class="hc1">{{ service.title }}</h1>
                <p class="pc">
                  {{ service.desc }}
                </p>
                <v-container>
                  <!-- <v-btn class="btn1" @click="addToCart(service)">
  <template v-if="!service.quantity">Add to Cart</template>
  <template v-else>
    <v-btn class="btn2 mr-2" @click="decreaseQuantity(service)">-</v-btn>
    <span>{{ service.quantity }}</span>
    <v-btn class="btn2 ml-2" @click="increaseQuantity(service)">+</v-btn>
  </template>
</v-btn> -->
                    <!-- <v-btn class="btn1" @click="toggleBookser(index)">
                      Book an Appointment
                    </v-btn> -->
                  <v-btn class="btn1" @click="cur(service)"><v-icon>mdi-arrow-down</v-icon></v-btn>
                  
                  <v-dialog v-model="dialogSer" max-width="500px">
                    <v-card>
                      <v-card-title> Book an Appointment </v-card-title>
                      <v-card-text>
                        <book-appointment :price="selectedService.price" :selected="selectedService">{{
                          selectedService.title
                        }}</book-appointment>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="toggleBookser(null)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  
                </v-container>
              </v-col>
              <v-row v-if="currentService===service"><v-col v-for="i in currentService.subsubCategories" :key="i">
                <v-card class="mx-auto card1" max-width="344" height="330px"  >
                
                  <v-img
                    style="border-radius: 5px"
                    class="align-end text-white "
                    height="200"
                    :src="i.img"
                    cover
                  >
                   
                  </v-img>
                  <v-card-title>{{i.title }}</v-card-title>
                  <v-card-subtitle class="">
                    Price:
                    <span 
                      >₹ {{ i.price }}</span
                    >
                  </v-card-subtitle>

                  

                  <v-card-actions class="pt">
                    <div>
                    <v-btn class="btn1" @click="addToCart(i,service.title)">
  <template v-if="!i.quantity">Add to Cart</template>
  <template v-else>
    <v-btn class="btn2 mr-2" @click="decreaseQuantity(i,service.title)"><v-icon>mdi-minus</v-icon></v-btn>
    <span>{{ i.quantity }}</span>
    <v-btn class="btn2 ml-2" @click="increaseQuantity(i,service.title)"><v-icon>mdi-plus</v-icon></v-btn>
  </template>
</v-btn></div><div>
                    </div>
                  </v-card-actions></v-card>


            </v-col></v-row>
            </v-row>
            <h1 class="mt-3">Offers</h1>
            <v-row class="mt-3">
              <v-col
      class="book"
      v-for="(offer, index) in card.offers"
      :key="offer"
      :cols="4"
    >
                <v-card
                  style="background-color: black; color: white"
                  class="mx-auto"
                  max-width="400"
                >
                  <v-img
                    style="border-radius: 5px"
                    class="align-end text-white mx-3"
                    height="300"
                    :src="offer.img"
                    cover
                  >
                    <v-card-title>{{ offer.title }}</v-card-title>
                  </v-img>

                  <v-card-subtitle class="pt-2 mb-0">
                    Price:
                    <span style="text-decoration: line-through"
                      >₹{{ offer.mrp }}</span
                    >
                  </v-card-subtitle>

                  <v-card-text class="pt-0">
                    <div>Offer Price: ₹{{ offer.price }}</div>
                  </v-card-text>

                  <v-card-actions class="pt">
                    <div>
                    <v-btn class="btn1" @click="addToCart(offer)">
  <template v-if="!offer.quantity">Add to Cart</template>
  <template v-else>
    <v-btn class="btn2 mr-2" @click="decreaseQuantity(offer)"><v-icon>mdi-minus</v-icon></v-btn>
    <span>{{ offer.quantity }}</span>
    <v-btn class="btn2 ml-2" @click="increaseQuantity(offer)"><v-icon>mdi-plus</v-icon></v-btn>
  </template>
</v-btn></div><div>
                    <v-btn class="btn1" @click="toggleBookoff(index)">
                      Book an Appointment
                    </v-btn></div>
                  </v-card-actions>
                  <v-dialog v-model="dialogOff" max-width="500px">
                    <v-card>
                      <v-card-title> Book an Appointment </v-card-title>
                      <v-card-text>
                        <book-appointment :price="selectedOffer.price" :selected="selectedOffer">{{
                          selectedOffer.title
                        }}</book-appointment>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="toggleBookoff(null)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogCart">
                    <v-card style="margin-left: 250px; margin-right: 300px">
  <CartPage :cart="cart" :parlour="card" @removeFromCart="removeFromCart" /></v-card>
</v-dialog>
                </v-card></v-col
              >
            </v-row>
          </v-container>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
  
</template>

<script>
import CartPage from "./CartPage.vue";
import BookAppointment from "./BookAppointment.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    CartPage,
    BookAppointment,
  },

  data: () => ({
  
    currentService:null,
    dialogCart:false,
    dialogSer: false,
    dialogOff: false,
    selectedService: {},
    selectedOffer: {},
    bookser: null,
    bookoff: null,
    card: {
      title: "The Garage",
      subTitle: "Gents Beauty Parlour",
      desc: "Excellent infrastructure facility with aesthetic interior designing and scientifically designed wellness furniture and fully air-conditioned service rooms is our unique feature. We provide all types of beauty services with an advanced bridal studio and a spa.",
      src: "https://lh3.googleusercontent.com/p/AF1QipMDDLemTXyX1So7OH68OPVnUsfRJeZkKqvoaoM6=s1360-w1360-h1020",
      rating: 4.7,
      location: "YMCA road, Alapuzha",
      flex: 3,
      services: [
        {
          title: "Hair Cutting",
          desc: "A new hair cut never goes out of style! You hair is not just hair but a crown you wear, Make heads whirl with our new customizable haircuts from the finest stylist in town. A classic faded look can never go wrong. Why look boring when you can make it interesting.",
          img: "https://larastyles.com/wp-content/uploads/2022/08/hair-cut-768x768.jpg",
          price: "200",
        },
        {
          title: "Hair Treatment",
          desc: "Come and get the best hair treatments from our professionals at Lara. We use premium products and are equally equipped and all set to help you obtain the hair you desire, and help you bring out the best of your hair at our care, say bye bye to dry and scanty hair .",
          img: "https://larastyles.com/wp-content/uploads/2022/08/hair-treatment-768x768.jpg",
          price: "400",
        },
        {
          title: "Hair Colour",
          desc: "Tired of the same old black hair? No worries we got you! Confused with what colour to choose? No problem you can consult our hairstylist to help you find your edge with exquisite and vibrant hair colours to Flair up your style, and make you look hip.",
          img: "https://larastyles.com/wp-content/uploads/2022/08/hair-colour-768x768.jpg",
          price: "200",
        },
      ],
      offers: [
        {
          name: "Smoothening Offers",
          price: "4999",
          offerPrice: "3999",
          img: "https://assets-mhd-com.s3.amazonaws.com/uploads/video/mobile_background/10585/M_R_470_MOB.jpg",
        },
        {
          name: "Haircut and Styling",
          price: "1200",
          offerPrice: "999",
          img: "https://www.beyoung.in/blog/wp-content/uploads/2020/04/general-min-1.jpg",
        },

        {
          name: "Beard Grooming",
          price: "800",
          offerPrice: "699",
          img: "https://cdn11.bigcommerce.com/s-h7l2pcerei/product_images/uploaded_images/trimming-beard.jpg",
        },
        {
          name: "Tattoo Offers",
          price: "3500",
          offerPrice: "2999",
          img: "https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F40-Best-Tattoo-Ideas-for-Men.jpg&w=1024&q=75",
        },
        {
          name: "Mud Mask Treatment",
          price: "2100",
          offerPrice: "1799",
          img: "https://wolfproject.co/cdn/shop/articles/for-men-only-5-reasons-why-a-muddier-skincare-routine-is-what-you-need-747265_1500x.jpeg?v=1637160032",
        },
      ],
    },
    images: [
      // "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // "https://getwallpapers.com/wallpaper/full/2/c/a/165944.jpg",
      "https://larastyles.com/wp-content/uploads/2022/09/Lara-Banner-06-copy.jpg",
      //   'https://larastyles.com/wp-content/uploads/2022/08/hair-cut-768x768.jpg',
      //   'https://images.unsplash.com/photo-1502126829571-83575bb53030?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    currentIndex: 0,
    intervalId: null,
    intervalDuration: 3000,
    cart:[]
  }),
  computed: {
    datas() {
      return this.$store.getters["getSalons"];
      // return this.$store.getters["getSalons"];
    },
    currentImage() {
      return this.card.coverImages[this.currentIndex];
    },
    commonServices(){
      return this.$store.getters["getServiceCategories"]
    }
  },

  mounted() {
    this.startSlideshow();
  },
  created() {
    console.log(this.datas);
    console.log(this.id);
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].id === this.id) {
        this.card = this.datas[i];
        console.log(this.card);
      }
    }
  },
  methods: {
    cur(service){
      this.currentService=service
    },
    removeFromCart(index) {
    this.cart.splice(index, 1);
  },
  addToCart(item,serTitle) {
      // Check if the item is already in the cart
      let existingItem = this.cart.find(cartItem => cartItem.title === item.title);
      
       if(!existingItem){
        // If item doesn't exist, add it with quantity 1
        if(serTitle){
          item.serTitle=serTitle
        }
        item.quantity = 1;  
        this.cart.push(item);
      }
    },
    // Add methods to increase and decrease quantity
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    toggleBookser(index) {
      if (index != null) {
        this.bookser = index;
        this.selectedService = this.card.services[index];
        this.dialogSer = !this.dialogSer;
      } else {
        this.dialogSer = !this.dialogSer;
      }
    },
    toggleBookoff(index) {
      if (index != null) {
        this.bookoff = index;
        this.selectedOffer = this.card.offers[index];
        this.dialogOff = !this.dialogOff;
      } else {
        this.dialogOff = !this.dialogOff;
      }
    },
    navCart(){
      this.dialogCart=!this.dialogCart
    },
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, this.intervalDuration);
    },
    stopSlideshow() {
      clearInterval(this.intervalId);
    },
    beforeDestroy() {
      this.stopSlideshow();
    },
  },
};
</script>
<style scoped>
.btn2{
  color:white;
  margin-left:2px;

  font-size: 20px;

}

.book:hover .slideshow {
  width: 100%;
  height: 770px;
  overflow: hidden;
  border-radius: 4px;
}
.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet .slideshow img {
  background-color: black;
  color: white;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h1 {
  margin-left: 15px;
  font-size: 50px;
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.card1 {
  margin-top:10px;
  color: white;
  background-color: rgb(41, 41, 41);
}
.card2{
  color:white;
  background-color: rgb(41, 41, 41);
}
.hc1 {
  font-size: 40px;
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-top: 80px;
  margin-left: 30px;
}

p {
  margin-left: 15px;
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;

  margin-right: 30px;
}
.btn1 {
  
  margin-left: 10px;
}

.pc {
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-top: 40px;
  margin-right: 30px;
  margin-left: 30px;
}
.round-img {
  border-radius: 50%;
  margin-top: 50px;
  /* margin-bottom: 50px; */
  margin-left: 120px;
  padding: 50px;
}

.pt {
  margin-top: -15px;
}
.pt {
  margin-top: 3px;
}
.btn2{
  color:white;
  margin-left:2px;
  background-color: rgb(0, 0, 0);
  font-size: 20px;

}.btn1 {
  color: white;
  background-color: rgb(0, 0, 0);
}
</style>
