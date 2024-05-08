import { createStore } from "vuex";

import rootGetters from './getters.js'
import rootMutations from './mutations.js'
import rootActions from './actions.js'
const store = createStore({
  state() {
    return {
      baseUrl: `http://192.168.1.14:8080`,
      users: [
        {
          fullName: "Rakesh S",
          username: "user1",
          phone: "9846766214",
          email: "rakesh@gmail.com",
          password: "Pass123@1",
          bookings: [],
        },
        {
          fullName: "Rejina C",
          username: "user2",
          phone: "9495193392",
          email: "rejina@gmail.com",
          password: "Pass123@2",
          bookings: [],
        },
        {
          fullName: "Reshma",
          username: "user3",
          phone: "9876543210",
          email: "reshma@gmail.com",
          password: "Pass123@3",
          bookings: [],
        },
      ],
      validUser: null,
      isUserLoggedin: false,
      // admin: { email: "admin@gmail.com", password: "Pass123@" },
      admin: "",
      validAdmin: null,
      isAdminLoggedin: false,
      serviceCategories: {
        men: [
          {
            title: "Hair Cut and Style",
            img: "https://www.zhairacademy.com/wp-content/uploads/fly-images/1921/Z-Hair-Academy-Mens-Cuts-Intro-1280x1200-c.jpg",
          },
          {
            title: "Beard",
            img: "https://assets-global.website-files.com/5cb569e54ca2fddd5451cbb2/5f8e7707ad6d75eda371136b_Cannington-120.jpg",
          },
          {
            title: "Hair Color",
            img: "https://img.mensxp.com/media/content/2022/Sep/googledocmediakix32gfazpq6691_63294b909933b.jpeg?w=1210&h=818&cc=1",
          },
          {
            title: "Hair Chemical",
            img: "https://www.nicholasmark.co.uk/mens-hair-straightening-newcastle-upon-tyne.jpg",
          },
          {
            title: "Mani and Pedi Hygiene",
            img: "https://d2zdpiztbgorvt.cloudfront.net/us/cms_content/425/df5bd406e950478fac0be143a96c175d.jpg",
          },
          {
            title: "Spa and Massage",
            img: "https://www.elitestudio.co.in/images/bg-image/m14.jpg",
          },
          {
            title: "Hair Treatments",
            img: "https://assets-global.website-files.com/621fc5da26683b662359a48d/626998459e85648971269164_menshaircolorred-p-800.jpeg",
          },
          {
            title: "Skin Care",
            img: "https://www.rd.com/wp-content/uploads/2017/04/04-Grooming-Treatments-Every-Man-Should-Be-Getting.jpg?fit=700,700",
          },
          {
            title: "Make up",
            img: "https://static.tnn.in/thumb/msid-109600205,thumbsize-35372,width-1280,height-720,resizemode-75/109600205.jpg",
          },
          {
            title: "Pre Groom",
            img: "https://www.vasuhealthcare.com/wp-content/uploads/2022/02/Best-Pre-wedding-Grooming-Manual-for-a-Man-Banner.jpg",
          },
        ],
        women: [
          {
            title: "Hair Cut and Style",
            img: "https://stylecaster.com/wp-content/uploads/2015/04/haircut-salon-visit.jpg?w=650&h=432&crop=1",
            subCategories: [
              {
                title: "Hair Cut",
                img: require("@/assets/servicewomen1.jpg"),
                subsubCategories: [
                  {
                    title: "Straight Cut",
                    img: "https://i.pinimg.com/564x/4b/51/91/4b51914cb00c9e35241ea4115bf04578.jpg",
                  },
                  { title: "U cut",
                    img:"https://i.pinimg.com/564x/22/e7/ba/22e7ba72f411acf8207fd85897f4dd8c.jpg",
                   },
                  { title: "V  cut",
                    img:"https://i.pinimg.com/564x/1d/21/f4/1d21f4df81811310664e5730f5045961.jpg"
                   },
                ],
              },
              { title: "Hair Spa" },
            ],
          },
          
          
          {
            title: "Mani and Pedi Hygiene",
            img: "https://media.self.com/photos/57d8938724fe9dae32831885/4:3/w_1920,c_limit/nail-salon-hygiene_feat.jpg",
          },
          {
            title: "Spa and Massage",
            img: "https://5.imimg.com/data5/QM/SA/MY-11130624/hair-spa-services-for-women-and-men-1000x1000.jpg",
          },
          {
            title: "Hair Treatments",
            img: "https://naturals.in/wp-content/uploads/2022/04/hc-2.jpg",
            subCategories:[{
              title: "Hair Color",
              img: "https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kaousa/www-johnfrieda-com/uk/en/blog-images/Happy%20woman%20smiling%20at%20her%20hairdresser%20.jpg?fmt=jpeg&qlt=85&wid=2000",
              subsubCategories: [
                { title: "Blonde", 
                  img:"https://i0.wp.com/therighthairstyles.com/wp-content/uploads/2014/07/48-beautiful-california-blonde-balayage.jpg?w=500&ssl=1" },
                {title: "Brown",
                 img: "https://i.pinimg.com/736x/43/b5/77/43b5774db8b4cd3fa36d150277c5d0ba.jpg" },
                {title: "black",
                 img: "https://i.pinimg.com/564x/58/4b/ee/584beedb919d991dc9bd961ce4f092d7.jpg" },
               
              ],
            },
            {
              title: "Hair Chemical",
              img: "https://c.ndtvimg.com/2022-10/b5oj98hg_new-study-says-hairstraightening-products-linked-with-risk-of-uterine-cancer_625x300_19_October_22.jpg",
              subsubCategories:[
                { title: "Keratin Hair Treatment", 
                  img:"https://salonveritas.com/wp-content/uploads/2020/08/22424491_1464326743682362_2833995149517310956_o.jpg" },
                {title: "Protein Hair Treatment.",
                 img: "https://i.pinimg.com/564x/eb/59/47/eb594728d03b690a25f458c3a6299243.jpg" },
                {title: "Scalp Treatment", 
                 img:"https://i.pinimg.com/564x/d8/e2/74/d8e274f5ef23d0ce794d6a1c8e1f11d7.jpg" },
              ]
            },]
          },
          {
            title: "Skin Care",
            img: "https://naturals.in/wp-content/uploads/2022/04/sc-1.jpg",
            subCategories: [
              {
                title: "Threading",
                img: "https://images.squarespace-cdn.com/content/v1/567031dfa128e649ae552de0/1552569263231-Y9H79B1LFIA64KA4T2X4/salon-thread-eyebrow-threading-image.jpg?format=750w",
                subsubCategories: [
                  {
                    title: "Eye Brows",
                    img: "https://waxingqueen.com.au/wp-content/uploads/2022/05/eyebrow-threading-epilation-procedure-brow-shape-correction-1.jpg",
                  },
                  {
                    title: "Fore Head",
                    img: "https://cdn.shreebeautybrowart.com/wp-content/uploads/2019/12/24143857/forehead_threading-1080x675.jpg",
                  },
                  {
                    title: "Full Face",
                    img: "https://beautylook.in/wp-content/uploads/2022/09/Full-Face-Threading-1024x683.png",
                  },
                ],
              },
              {
                title: "Waxing",
                img: "https://images.herzindagi.info/image/2022/Mar/things-to-avoid-after-waxing.jpg",
                subsubCategories: [
                  {
                    title: "Full Arms",
                    img: "https://fabulicious.ae/wp-content/uploads/2022/04/full-arm-wax.jpg",
                  },{
                    title:"Half Arms",
                    img:"https://atthemarc.com/media/Half-Arm-Wax-1.jpg"
                  }
                ],
              },
            ],
          },
          {
            title: "Pre Bridal",
            img: "https://blog.kamaayurveda.in/wp-content/uploads/2021/06/KAMA_July2019_Bridal1_Bridal-Skin-Care_1050X600px.jpg",
          },
          {
            title: "Makeup",
            img: "https://www.kapilssalon.com/wp-content/uploads/2021/03/Makeup-Course-720x480-1.jpg",
          },
          {
            title: "Nail Art",
            img: "https://img.freepik.com/free-photo/close-up-manicurist-using-nail-polish_23-2149171334.jpg?w=360&t=st=1714632103~exp=1714632703~hmac=7f6ac87ae28158784dad535f47948ad43965a703a0642662bb5920ffee4b6821",
          },
        ],
      },
      salonsPending: [
        {
          parlourPic:
            "https://cdn.tapetender70er.de/media/image/6c/3d/af/Hair-Salon-Wallpaper-Design_944x944@2x.webp",
          parlourName: "Classic Cuts Hair Salon",
          location: "Chandanakkavu road, Alappuzha",
          phone: "9846766214",
          email: "classichair@gmail.com",
          description:
            "Men's Square Hair & Skin Studio offers a variety of men's grooming services including haircuts, hair coloring, and skincare treatments.",
          licenseNo: "L7654321",
          license:
            "https://www.cityofboston.gov/images_documents/AV%20Salon%20Printable%20updated_tcm3-27760.pdf",
        },
        {
          parlourPic:
            "https://lh3.googleusercontent.com/p/AF1QipMDDLemTXyX1So7OH68OPVnUsfRJeZkKqvoaoM6=s1360-w1360-h1020",
          parlourName: "Elegant Styles Salon",
          location: "MG Road, Alappuzha",
          phone: "9745362890",
          email: "elegantstyles@gmail.com",
          description:
            "Elegant Styles Salon offers a wide range of beauty services including haircuts, hair treatments, and bridal makeovers.",
          licenseNo: "E1234567",
          license: "https://www.example.com/license1.pdf",
        },
        {
          parlourPic:
            "https://cdn2.hubspot.net/hubfs/541205/Blog_Media/What-Makes-a-Good-Hair-Salon-Interior-Design-1.jpg",
          parlourName: "Urban Chic Hair Studio",
          location: "Alappuzha",
          phone: "9897654321",
          email: "urbanchic@gmail.com",
          description:
            "Urban Chic Hair Studio specializes in modern haircuts, coloring, and hair styling services for both men and women.",
          licenseNo: "U2345678",
          license: "https://www.example.com/license2.pdf",
        },
        {
          parlourPic:
            "https://cdn.citymapia.com/kottayam/golden-style-gents-salon-and-beauty-parlour/14164/Portfolio.jpg?width=700&biz=2578&v=20210324065607",
          parlourName: "Glamour World Beauty Lounge",
          location: "Park Avenue, Alappuzha",
          phone: "9543216789",
          email: "glamourworld@gmail.com",
          description:
            "Glamour World Beauty Lounge offers luxurious beauty treatments, including facials, manicures, and pedicures.",
          licenseNo: "G3456789",
          license: "https://www.example.com/license3.pdf",
        },
        {
          parlourPic:
            "https://www.designersarch.in/wp-content/uploads/2023/07/Low-Budget-Beauty-Salon-Interior-Design-2.jpg",
          parlourName: "Trendy Tresses Hair Spa",
          location: "Saphalyam Complex, Alappuzha",
          phone: "9678901234",
          email: "trendytresses@gmail.com",
          description:
            "Trendy Tresses Hair Spa provides specialized hair treatments, scalp treatments, and hair styling services.",
          licenseNo: "T4567890",
          license: "https://www.example.com/license4.pdf",
        },
        {
          parlourPic: "https://antdisplay.com/pub/media/wysiwyg/5_18__1.JPG",
          parlourName: "Divine Beauty Parlour",
          location: "Main Road, Alappuzha",
          phone: "9789012345",
          email: "divinebeauty@gmail.com",
          description:
            "Divine Beauty Parlour offers holistic beauty services, including skincare, haircare, and makeup services.",
          licenseNo: "D5678901",
          license: "https://www.example.com/license5.pdf",
        },
        {
          parlourName: "Mystique Hair and Beauty",
          location: "Infopark, Alappuzha",
          phone: "9654321098",
          email: "mystiquebeauty@gmail.com",
          description:
            "Mystique Hair and Beauty specializes in innovative haircuts, hair coloring, and advanced skincare treatments.",
          licenseNo: "M6789012",
          license: "https://www.example.com/license6.pdf",
        },
        {
          parlourName: "Charmzone Salon",
          location: "Pallimukku, Alappuzha",
          phone: "9723456789",
          email: "charmzone@gmail.com",
          description:
            "Charmzone Salon offers a variety of beauty and grooming services for men and women, including haircuts and facials.",
          licenseNo: "C7890123",
          license: "https://www.example.com/license7.pdf",
        },
        {
          parlourName: "Radiant Looks Hair Studio",
          location: "Jawahar Nagar, Alappuzha",
          phone: "9612345678",
          email: "radiantlooks@gmail.com",
          description:
            "Radiant Looks Hair Studio provides expert haircare services, hair coloring, and hair treatments.",
          licenseNo: "R8901234",
          license: "https://www.example.com/license8.pdf",
        },
        {
          parlourName: "Vogue Beauty Lounge",
          location: "Panampilly Nagar, Alappuzha",
          phone: "9587654321",
          email: "voguebeauty@gmail.com",
          description:
            "Vogue Beauty Lounge offers trendy beauty services, including makeup, skincare, and hair styling.",
          licenseNo: "V9012345",
          license: "https://www.example.com/license9.pdf",
        },
        {
          parlourName: "Graceful Glow Spa",
          location: "Kowdiar, Alappuzha",
          phone: "9732109876",
          email: "gracefulglow@gmail.com",
          description:
            "Graceful Glow Spa provides relaxing spa treatments, massages, and skincare services.",
          licenseNo: "G0123456",
          license: "https://www.example.com/license10.pdf",
        },
      ],
      salons: [
        {
          parlourName: "Amaze Beauty Parlour & Bridal Makeup Studio",
          type: "Women",
          phone: "9495193392",
          email: "amazebeauty@email.com",
          username: "amaze",
          password: "Pass123@1",
          src: "https://cdn.tapetender70er.de/media/image/6c/3d/af/Hair-Salon-Wallpaper-Design_944x944@2x.webp",
          rating: 4.5,
          location: "Nadakkavu, Alappuzha",
          flex: 3,
          id: "salon1",
          description:
            "Amaze Beauty Parlour & Bridal Makeup Studio offers a range of beauty services including bridal makeup, hair styling, and skincare treatments.",
          coverImages: [
            "https://facts.net/wp-content/uploads/2023/06/46-facts-about-ana-de-armas-1688124598.jpg",
          ],
          services: [
            {
              category: "Hair Cut and Style",
              title: "Hair Cutting",
              subCategory:' Hair Cut',
              desc: "Transform your look with a fresh haircut! Our expert stylists are here to give you a trendy and personalized haircut that complements your face shape and style.",
              img: require("@/assets/servicewomen1.jpg"),
              price: "300",
              employees: [
                {
                  name: "Harish",
                  img: "https://st.depositphotos.com/1008939/2240/i/950/depositphotos_22408839-stock-photo-serious.jpg",
                },
                {
                  name: "Deepthi",
                  img: "https://images.statusfacebook.com/profile_pictures/cute_girls/cute_girls_dps_profile_pictures_fb_whatsapp_02.jpg",
                },
                {
                  name: "Ranjitha",
                  img: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*xFuo_UNWchLZ8bqS.jpeg",
                },
              ],
              subsubCategories: [
                { title: "Straight Cut", 
                  price: 150,
                  img:"https://i.pinimg.com/564x/4b/51/91/4b51914cb00c9e35241ea4115bf04578.jpg" },
                {title: "U cut",
                 price: 200,
                 img:"https://i.pinimg.com/564x/22/e7/ba/22e7ba72f411acf8207fd85897f4dd8c.jpg" },
                {title: "V cut", 
                 price: 250,
                 img:"https://i.pinimg.com/564x/1d/21/f4/1d21f4df81811310664e5730f5045961.jpg" },
               
              ],
            },
            {
              title: "Hair Chemcial",
              category: "Hair Treatment",
              desc: "Revitalize your hair with our professional hair treatments. We use top-quality products to nourish and repair your hair, leaving it silky, shiny, and healthy.",
              img: require("@/assets/servicewomen2.png"),
              price: "500",
              employees: [
                { name: "Amit", img: "amit.jpg" },
                { name: "Vikram", img: "vikram.jpg" },
              ],
              subsubCategories: [
                { title: "Keratin Hair Treatment", 
                  price: 150,
                  img:"https://salonveritas.com/wp-content/uploads/2020/08/22424491_1464326743682362_2833995149517310956_o.jpg" },
                {title: "Protein Hair Treatment.",
                 price: 200,
                 img:"https://i.pinimg.com/564x/eb/59/47/eb594728d03b690a25f458c3a6299243.jpg" },
                {title: "Scalp Treatment",
                 price: 250,
                 img:"https://i.pinimg.com/564x/d8/e2/74/d8e274f5ef23d0ce794d6a1c8e1f11d7.jpg" },
               
              ],
            },
            {
              category: "Hair Treatement",
              title: "Hair Colour",
              desc: "Change up your style with a vibrant hair colour! Consult our hairstylists to find the perfect shade that suits your skin tone and personality.",
              img: require("@/assets/servicewomen3.png"),
              price: "300",
              employees: [
                { name: "Arjun", img: "arjun.jpg" },
                { name: "Kiran", img: "kiran.jpg" },
                { name: "Prakash", img: "prakash.jpg" },
              ],
              subsubCategories: [
                { title: "Blonde",
                 price: 150,
                 img:"https://i0.wp.com/therighthairstyles.com/wp-content/uploads/2014/07/48-beautiful-california-blonde-balayage.jpg?w=500&ssl=1" },
                {title: "Brown", 
                 price: 200,
                 img:"https://i.pinimg.com/736x/43/b5/77/43b5774db8b4cd3fa36d150277c5d0ba.jpg" },
                {title: "black",
                 price: 250,
                 img:"https://i.pinimg.com/564x/58/4b/ee/584beedb919d991dc9bd961ce4f092d7.jpg" },
               
              ],
            },
            {
              category: "Skin Care",
              title: "Facial Treatment",
              desc: "Pamper your skin with our rejuvenating facial treatments. Our experienced estheticians will customize a facial to target your specific skin concerns and leave you with a radiant complexion.",
              img: require("@/assets/servicewomen4.png"),
              price: "600",
              employees: [
                { name: "Rakesh", img: "rakesh.jpg" },
                { name: "Sunil", img: "sunil.jpg" },
              ],
              subsubCategories: [
                { title: "Classic facial", price: 150 },
                {title: "Microneedling facial", price: 200 },
                {title: "Brightening facial", price: 250 },
               
              ],
            },
          ],
          offers: [
            {
              title: "Smoothening Offers",
              mrp: "5499",
              price: "4499",
              img: "https://www.myglamm.com/_next/image?url=https%3A%2F%2Ffiles.myglamm.com%2Fsite-images%2F768x432%2FBenefits-of-Hair-Straightening_1.jpg&w=1920&q=75",
              employees: [
                { name: "Manoj", img: "manoj.jpg" },
                { name: "Sanjay", img: "sanjay.jpg" },
              ],
            },
            {
              title: "Haircut and Styling",
              mrp: "1400",
              price: "1199",
              img: "https://lh6.googleusercontent.com/DIL-VBWpAC65rQJre94Xk-oqcfqgehMrSZLD5idZZqerpjWWgbPEhT6dxjJyBsbXOzv6hhJLfWZBiu30pYQSXwwo5g4I4FncUFe7zQWe2BuODzSiporvBjJ8_c5Alu22oVyEGmkWtDEAD3Qxh-P3NOYj5y2bQdVSGTQ7orpAnZFwW0QKJzJhk3_Np2tEEg",
              employees: [
                { name: "Vinay", img: "vinay.jpg" },
                { name: "Deepak", img: "deepak.jpg" },
              ],
            },
            {
              title: "Facial & Hair Spa Combo",
              mrp: "2500",
              price: "1999",
              img: "https://images.herzindagi.info/image/2019/Jul/hair-spa-benefits.jpg",
              employees: [
                { name: "Manoj", img: "manoj.jpg" },
                { name: "Sanjay", img: "sanjay.jpg" },
              ],
            },

            {
              title: "Bridal Package",
              mrp: "10000",
              price: "7999",
              img: "https://shaadiwish.com/blog/wp-content/uploads/2020/12/best-south-indian-brides.jpg",
              employees: [
                {
                  name: "Manoj",
                  img: "https://img.freepik.com/free-photo/close-up-portrait-young-man-isolated-black-studio-background-photoshot-real-emotions-male-model-smiling-feeling-happy-facial-expression-pure-clear-human-emotions-concept_155003-25751.jpg?w=996&t=st=1713519692~exp=1713520292~hmac=738048c98c9cb8100f54be36e26a7ab6f9c644c8dcade7c2b2d4ffdab417a467",
                },
                {
                  name: "Sanjay",
                  img: "https://wallpapers.com/images/high/professional-profile-pictures-5472-x-3648-fnzog91drg7fwyv1.webp",
                },
              ],
            },
          ],
        },
        {
          parlourName: "The Garage Men's Salon",
          type: "Men",
          username: "thegarage",
          password: "Pass123@2",
          src: "https://lh3.googleusercontent.com/p/AF1QipMDDLemTXyX1So7OH68OPVnUsfRJeZkKqvoaoM6=s1360-w1360-h1020",
          rating: 4.7,
          location: "YMCA road, Alappuzha",
          flex: 3,
          id: "salon2",
          description:
            "Excellent infrastructure facility with aesthetic interior designing and scientifically designed wellness furniture and fully air-conditioned service rooms is our unique feature.",
          coverImages: [
            "https://larastyles.com/wp-content/uploads/2022/09/Lara-Banner-06-copy.jpg",
          ],
          services: [
            {
              category: "Hair Cut and Style",
              title: "Hair Cutting",
              desc: "A new hair cut never goes out of style! You hair is not just hair but a crown you wear, Make heads whirl with our new customizable haircuts from the finest stylist in town. A classic faded look can never go wrong. Why look boring when you can make it interesting.",
              img: "https://larastyles.com/wp-content/uploads/2022/08/hair-cut-768x768.jpg",
              price: "200",
              employees: [
                {
                  name: "Manoj",
                  img: "https://img.freepik.com/free-photo/close-up-portrait-young-man-isolated-black-studio-background-photoshot-real-emotions-male-model-smiling-feeling-happy-facial-expression-pure-clear-human-emotions-concept_155003-25751.jpg?w=996&t=st=1713519692~exp=1713520292~hmac=738048c98c9cb8100f54be36e26a7ab6f9c644c8dcade7c2b2d4ffdab417a467",
                },
                {
                  name: "Sanjay",
                  img: "https://wallpapers.com/images/high/professional-profile-pictures-5472-x-3648-fnzog91drg7fwyv1.webp",
                },
              ],
            },
            {
              category: "Hair Treatments",
              title: "Hair Treatment",
              desc: "Come and get the best hair treatments from our professionals at Lara. We use premium products and are equally equipped and all set to help you obtain the hair you desire, and help you bring out the best of your hair at our care, say bye bye to dry and scanty hair .",
              img: "https://larastyles.com/wp-content/uploads/2022/08/hair-treatment-768x768.jpg",
              price: "400",
            },
            {
              category: "Hair Color",
              title: "Hair Color",
              desc: "Tired of the same old black hair? No worries we got you! Confused with what colour to choose? No problem you can consult our hairstylist to help you find your edge with exquisite and vibrant hair colours to Flair up your style, and make you look hip.",
              img: "https://larastyles.com/wp-content/uploads/2022/08/hair-colour-768x768.jpg",
              price: "200",
            },
          ],
          offers: [
            {
              title: "Smoothening Offers",
              mrp: "4999",
              price: "3999",
              img: "https://assets-mhd-com.s3.amazonaws.com/uploads/video/mobile_background/10585/M_R_470_MOB.jpg",
            },
            {
              title: "Haircut and Styling",
              mrp: "1200",
              price: "999",
              img: "https://www.beyoung.in/blog/wp-content/uploads/2020/04/general-min-1.jpg",
            },

            {
              title: "Beard Grooming",
              mrp: "800",
              price: "699",
              img: "https://cdn11.bigcommerce.com/s-h7l2pcerei/product_images/uploaded_images/trimming-beard.jpg",
            },
            {
              title: "Tattoo Offers",
              mrp: "3500",
              price: "2999",
              img: "https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F40-Best-Tattoo-Ideas-for-Men.jpg&w=1024&q=75",
            },
            {
              title: "Mud Mask Treatment",
              mrp: "2100",
              price: "1799",
              img: "https://wolfproject.co/cdn/shop/articles/for-men-only-5-reasons-why-a-muddier-skincare-routine-is-what-you-need-747265_1500x.jpeg?v=1637160032",
            },
          ],
          phone: "9846766214",
          email: "thegarage@email.com",
        },
        {
          parlourName: "Men's Square Hair & Skin Studio",
          type: "Men",
          src: "https://cdn2.hubspot.net/hubfs/541205/Blog_Media/What-Makes-a-Good-Hair-Salon-Interior-Design-1.jpg",
          rating: 4.0,
          location: "Chandanakkavu road, Alappuzha",
          flex: 3,
          id: "salon3",
          description:
            "Men's Square Hair & Skin Studio offers a variety of men's grooming services including haircuts, hair coloring, and skincare treatments.",
          services: [
            {
              title: "Men's Haircuts",
              category: "Hair Cut and Style",
              price: "100",
            },
            { title: "Hair Coloring", price: "250", category: "Hair Color" },
            {
              title: "Skincare Treatments",
              price: "200",
              category: "Skin care",
            },
          ],
          offers: [
            { title: "Hair Cutting" },
            { title: "Skin Treatment Offers" },
          ],
          phone: "+91 1234567892",
          email: "menssquare@email.com",
          website: "https://www.menssquare.com",
        },

        {
          parlourName: "Gents Touch Men's Salon",
          type: "Men",
          src: "https://cdn.citymapia.com/kottayam/golden-style-gents-salon-and-beauty-parlour/14164/Portfolio.jpg?width=700&biz=2578&v=20210324065607",
          rating: 4.8,
          location: "Kalarcode, Alappuzha",
          flex: 3,
          id: "salon4",
          description:
            "Gents Touch Men's Salon offers a variety of men's grooming services including haircuts, beard grooming, and skincare treatments.",
          services: [
            {
              title: "Men's Haircuts",
              category: "Hair Cut and Style",
              price: "200",
            },
            {
              title: "Beard Grooming",
              category: "Hair Cut and Style",
              price: "100",
            },
            {
              title: "Skincare Treatments",
              category: "Skin Care",
              price: "400",
            },
          ],
          offers: [{ title: "Beard Trimming Offers" }],
          phone: "+91 1234567894",
          email: "gentstouch@email.com",
          website: "https://www.gentstouchmensalon.com",
        },
        {
          parlourName: "Orchid Beauty Studio",
          type: "Women",
          src: "https://www.designersarch.in/wp-content/uploads/2023/07/Low-Budget-Beauty-Salon-Interior-Design-2.jpg",
          rating: 4.6,
          location: "Mannancherry, Alappuzha",
          flex: 3,
          id: "salon5",
          description:
            "Orchid Beauty Studio offers a variety of beauty services including facial treatments, waxing, and nail services.",
          services: [
            { title: "Facial Treatments", category: "Skin care", price: "500" },
            { title: "Waxing", category: "Skin Care", price: "300" },
            { title: "Nail Services", category: "Nail Art", price: "800" },
          ],
          offers: [{ title: "Facial Offers" }],
          phone: "+91 1234567895",
          email: "orchidbeauty@email.com",
          website: "https://www.orchidbeautystudio.com",
        },
        {
          parlourName: "Classic Cuts Hair Salon",
          type: "Men",
          src: "https://antdisplay.com/pub/media/wysiwyg/5_18__1.JPG",
          rating: 4.2,
          location: "Punnapra, Alappuzha",
          flex: 3,
          id: "salon6",
          description:
            "Classic Cuts Hair Salon offers professional hair cutting, styling, and coloring services for men and women.",
          services: [
            {
              title: "Hair Cutting",
              category: "Hair Cut and Style",
              price: "200",
            },
            {
              title: "Hair Styling",
              category: "Hair Cut and Style",
              price: "300",
            },
            { title: "Hair Coloring", category: "Hair Color", price: "400" },
          ],
          offers: [{ title: "Hair Cutting Offers" }],
          phone: "+91 1234567896",
          email: "classiccuts@email.com",
          website: "https://www.classiccutssalon.com",
        },
        {
          parlourName: "Blossom Beauty Centre",
          type: "Women",
          src: "https://www.trade4asia.com/ProductImg/beat.jpg",
          rating: 4.4,
          location: "Cherthala, Alappuzha",
          flex: 3,
          id: "salon7",
          description:
            "Blossom Beauty Centre provides a variety of beauty and wellness services including massages, facials, and makeup services.",
          services: [
            { title: "Massages", category: "Spa and Massage", price: "1000" },
            { title: "Facials", category: "Skin Care", price: "500" },
            { title: "Makeup Services", category: "Makeup", price: "600" },
          ],
          offers: [{ title: "Facial Offers" }],
          phone: "+91 1234567897",
          email: "blossombeauty@email.com",
          website: "https://www.blossombeautycentre.com",
        },
        {
          parlourName: "Menspace Grooming Lounge",
          type: "Men",
          src: "https://www.swagmee.com/media/wysiwyg/blog/Men-Grooming--2.jpg",
          rating: 4.9,
          location: "Aryad South, Alappuzha",
          flex: 3,
          id: "salon8",
          description:
            "Menspace Grooming Lounge offers premium grooming services exclusively for men including haircuts, shaves, and skincare treatments.",
          services: [
            { title: "Haircuts", category: "Hair Cut and Style", price: "200" },
            { title: "Shaves", category: "Hair Cut and Style", price: "200" },
            {
              title: "Skincare Treatments",
              category: "Skin Care",
              price: "300",
            },
          ],
          offers: [{ title: "Hair Cutting Offers" }],
          phone: "+91 1234567898",
          email: "menspace@email.com",
          website: "https://www.menspacegrooming.com",
        },
      ],
    };
  },
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions,
});
export default store;
