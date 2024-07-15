<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="1208">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        style="background-image: linear-gradient(135deg, transparent 0%, transparent 50%,rgba(159, 159, 159,0.07) 50%, rgba(159, 159, 159,0.07) 77%,transparent 77%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 91%,rgba(159, 159, 159,0.07) 91%, rgba(159, 159, 159,0.07) 99%,transparent 99%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(159, 159, 159,0.07) 24%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 49%,rgba(159, 159, 159,0.07) 49%, rgba(159, 159, 159,0.07) 63%,transparent 63%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(255,255,255,.0), rgba(255,255,255,.2)"
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
        >saloninfo</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-card style="background-color: black; color: white;" class="mx-auto" max-width="1200">
          <v-container fluid>
            <v-row dense>
              <v-col :cols="12">
                <v-card style="background-color: black; color: white;">
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

                    <v-btn class="text-end">
                      <div>
                        <h6 class="text-end" style="margin-top: 0px">
                          {{ card.location }} <i class="fas fa-map-marker-alt"></i>
                        </h6>
                        <h6 class="text-end" style="margin-top: 0px">
                          {{ card.phone }} <i class="fas fa-phone"></i>
                        </h6>
                        <h6  class="text-end" style="text-transform: lowercase; margin-top: 0px">
                          {{ card.email }} <i class="fas fa-envelope"></i>
                        </h6>
                        <v-btn @click="toggleEditDialog"><i class="fas fa-edit"></i> Edit</v-btn>
                      </div>
                    </v-btn>
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
            <v-row
              class="book"
              v-for="(service, index) in card.services"
              :key="service"
            >
              <v-col :cols="12" md="6" v-if="index % 2 === 0">
                <v-img
                  class="round-img square-image"
                  :src="service.img"
                  height="300px"
                  width="300px"
                >
                </v-img>
              </v-col>
              <v-col :cols="12" md="6" v-else>
                <h1 class="hc1">{{ service.title }}</h1>
                <p class="pc">
                  {{ service.desc }}
                </p>
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
              </v-col>
              <v-row 
              ><v-col v-for="i in service.subsubCategories" :key="i" :id="i.title">
                <v-card  class="mx-auto card1 animate11" max-width="344" max-height="350px">
                  <v-img
                    style="border-radius: 5px"
                    class="align-end text-white"
                    height="250"
                    :src="i.img"
                    cover
                  >
                  </v-img>
                  <v-card-item ><h5 class="multi-line-title">{{ i.title }}</h5> </v-card-item>
                  <v-card-subtitle class="">
                    Price:
                    <span>₹ {{ i.price }}</span>
                  </v-card-subtitle></v-card></v-col></v-row>
            </v-row>
            <h1 class="mt-3">Offers</h1>
            <v-row class="mt-3">
              <v-col
                class="book"
                v-for="offer in card.offers"
                :key="offer"
                :cols="4"
              >
                <v-card style="background-color: black; color: white;" class="mx-auto" max-width="400">
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

                  <v-dialog  v-model="editDialog" max-width="800px">
                    <v-card style="color:white; background-color: black;">
                      <v-card-title>Edit Salon Information</v-card-title>
                      <v-card-text>
                        <v-text-field
                          v-model="editedCard.parlourName"
                          label="Title"
                          required
                        ></v-text-field>
                        <v-row>
                          <v-col cols="12">
                            <v-file-input
                              v-model="coverImage"
                              @change="previewCoverImage"
                              label="Change Cover Image"
                              prepend-icon="mdi-camera"
                              variant="filled"
                            ></v-file-input>
                            <v-img v-if="previewCover || editedCard.coverImages[0]" :src="previewCover?previewCover: editedCard.coverImages[0]" width="100%" height="200px" class="my-2"></v-img>
                          </v-col>
                        </v-row>
                        <v-textarea
                          v-model="editedCard.description"
                          label="About"
                          required
                          auto-grow
                        ></v-textarea>
                        <v-text-field
                          v-model="editedCard.location"
                          label="Location"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="editedCard.phone"
                          label="Phone"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="editedCard.email"
                          label="Email"
                          required
                        ></v-text-field>

                        <!-- Services -->
                        <v-card-text>
                          <h3>Services</h3>
                          <v-row v-for="(service, index) in editedCard.services" :key="index">
                            <v-col cols="9" sm="9" md="9">
                               <v-text-field
                                style="font-weight:800;font-size: 500px ;"
                                v-model="service.title"
                                label="Service Title"
                                required
                              ></v-text-field>
                              <v-textarea
                                v-model="service.desc"
                                label="Service Description"
                                required
                                auto-grow
                              ></v-textarea>
                              </v-col><v-col cols="3" sm="3" md="3">
                              <v-file-input
                                v-model="service.img"
                                @change="previewServiceImage(index)"
                                label="Service Image"
                                prepend-icon="mdi-camera"
                                variant="filled"
                              ></v-file-input>
                              <v-img v-if="service.previewImage || service.img" :src="service.previewImage?service.previewImage:service.img" width="100%" height="150px" class="my-2"></v-img>
                              
                              </v-col><v-col cols="12" sm="12" md="12" >
                                <h5>Sub Services of {{ service.title }}</h5>
                              <v-row v-for="(subsubCategory, subIndex) in service.subsubCategories" :key="subIndex">
                                <v-col cols="6" sm="6" md="6">
                                  <v-text-field
                                    v-model="subsubCategory.title"
                                    label="subsubCategory Title"
                                    required
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="subsubCategory.price"
                                    label="subsubCategory Price"
                                    required
                                  ></v-text-field>
                                  </v-col><v-col cols="6" sm="6" md="6 ">
                                  <v-file-input
                                    v-model="subsubCategory.img"
                                    @change="previewsubsubCategoryImage(index, subIndex)"
                                    label="subsubCategory Image"
                                    prepend-icon="mdi-camera"
                                    variant="filled"
                                  ></v-file-input>
                                  <v-img v-if="subsubCategory.previewImage || subsubCategory.img" :src="subsubCategory.previewImage?subsubCategory.previewImage:subsubCategory.img" width="100%" height="150px" class="my-2"></v-img>
                                </v-col>
                              </v-row>
                              <v-btn @click="addsubsubCategory(index)">Add Sub Service</v-btn>
                            </v-col>
                            <v-divider style="color:white"></v-divider>
                          </v-row>
                        </v-card-text>
                        <v-card-text>
          <h3>Offers</h3>
          <v-row v-for="(offer,index) in editedCard.offers" :key="index">
            <v-col cols="3">
              <v-text-field
                v-model="offer.title"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="offer.mrp"
                label="Price"
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="offer.price"
                label="Offer Price"
                required
                type="number"
              ></v-text-field>
              
            </v-col>
            <v-col cols="4"><v-file-input
                v-model="offer.file"
                label="Change Image"
                @change="previewOfferImage(index,$event)"
                accept="image/*"
                prepend-icon="mdi-camera"
                variant="filled"
              ></v-file-input>

              <v-img  :src="offer.preview?offer.preview:offer.img" width="100%" height="150px" class="my-2"></v-img></v-col>
            
            <v-col cols="1">
              <v-btn style="color: white; background-color: black;" icon @click="removeOffer(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-btn @click="addOffer">Add Offer</v-btn>
        </v-card-text>

      

                        <v-btn @click="saveChanges">Save</v-btn>
                        <v-btn @click="cancelChanges">Cancel</v-btn>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>
  
  <script>
  
  export default {
    
    
      
    data: () => ({
      editDialog: false,
    editedCard: {},
    
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
      previewCover: null,
    }),
    computed: {
      datas() {
        return this.$store.getters["getSalons"];
      },
      currentImage() {
        return this.card.coverImages[this.currentIndex];
      },
      currentParlour(){
        
      const currentParlour = JSON.parse(sessionStorage.getItem('currentParlour'));
      return currentParlour
    },
    },
    mounted() {
      this.startSlideshow();
    },
    created() {
      this.editedCard = this.currentParlour;
      this.card=this.currentParlour
    },
    methods: {
      toggleEditDialog() {
      this.editDialog = !this.editDialog;
    },
    
    saveChanges() {
      this.card = { ...this.editedCard };
      this.editDialog = false;
    },
    cancelChanges() {
      this.editDialog = false;
    },
    
    closeEditDialog() {
      this.editDialog = false;
    },

    addService() {
      this.editedCard.services.push({
        title: '',
        desc: '',
        img: '',
        preview: null,
        price: '',
      });
    },

    removeService(index) {
      this.editedCard.services.splice(index, 1);
    },

    addOffer() {
      this.editedCard.offers.push({
        name: '',
        price: '',
        offerPrice: '',
        file: null,
        preview: null,
      });
    },
    previewCoverImage(event) {
      console.log(event)
      const file = event.target.files[0];
      this.previewCover = URL.createObjectURL(file);
      this.editedCard.coverImages[0]=this.previewCover
      // if (this.coverImage) {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     this.previewCover = e.target.result;
      //   };
      //   reader.readAsDataURL(this.coverImage);
      // }
    }, previewServiceImage(index,event) {
      console.log(event)
      const file = event.target.files[0];
      this.editedCard.services[index].preview = URL.createObjectURL(file);
      this.editedCard.services[index].img=this.editedCard.services[index].preview
    },previewOfferImage(index,event) {
      console.log(event)
      const file = event.target.files[0];
      this.editedCard.offers[index].preview = URL.createObjectURL(file);
      this.editedCard.offers[index].img=this.editedCard.offers[index].preview
    },
    previewsubsubCategoryImage(serviceIndex, subIndex) {
      const file = this.editedCard.services[serviceIndex].subsubCategories[subIndex].img;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editedCard.services[serviceIndex].subsubCategories[subIndex].previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addsubsubCategory(serviceIndex) {
      this.editedCard.services[serviceIndex].subsubCategories.push({
        title: '',
        price: 0,
        img: '',
        previewImage: '',
      });
    },

    removeOffer(index) {
      this.editedCard.offers.splice(index, 1);
    },
      toggleBookser(index) {
        if(index!=null){
        this.bookser = index;
        this.selectedService = this.card.services[index];
        this.dialogSer = !this.dialogSer;}
        else{
          this.dialogSer=!this.dialogSer
        }
      },
      toggleBookoff(index) {
        if(index!=null){
        this.bookoff = index;
        this.selectedOffer = this.card.offers[index];
        this.dialogOff = !this.dialogOff;}
        else{
          this.dialogOff=!this.dialogOff
        }
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
  .align-end {
  align-items: flex-end;
}
.text-end {
  text-align: end;
}
.book {
  margin-bottom: 20px;
}
  .card1 {
  margin-top: 10px;
  color: white;
  background-color: rgb(41, 41, 41);
}
  .btn1 {
    color:white;
    visibility: hidden;
  }
  .book:hover .btn1 {
    visibility: visible;
  }
  .book:hover .slideshow {
    width: 100%;
    height: 770px;
    overflow: hidden;
    border-radius: 4px;
  }
  
  .slideshow img {
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
  .square-image {
    width: 100%; /* Set the width to 100% */
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative;
    overflow: hidden;
  }

  .square-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
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
    background-color: rgb(111, 105, 105);
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
  </style>
  