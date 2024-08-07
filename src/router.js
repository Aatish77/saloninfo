import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "./components/User/UserLogin.vue";
import ViewParlours from "./components/User/ViewParlours.vue";
import EachParlour from "./components/User/EachParlour.vue";
import UserSignup from "./components/User/UserSignup.vue";
import ParlourLogin from "./components/Parlour/ParlourLogin.vue";
import ParlourProfile from "./components/Parlour/ParlourProfile.vue";
import ParlourReg from "./components/Parlour/ParlourReg.vue";
import AdminLogin from "./components/Admin/AdminLogin.vue";
import AdminHome from "./components/Admin/AdminHome.vue";
import ServicesPage from "./components/User/Services/ServicesPage.vue";
import ServiceParlour from "./components/User/Services/ServiceParlour.vue";
import EachService from "./components/User/Services/EachService.vue";
import OfferPage from "./components/User/Offers/OfferPage.vue";
import OfferParlour from "./components/User/Offers/OfferParlour.vue"
// import AdminEachRequest from "./components/AdminEachRequest.vue"
import UserPage from "./components/User/UserPage.vue";
import AdminReg from "./components/Admin/AdminReg.vue"
import AdminViewServices from "./components/Admin/AdminViewServices.vue"
import AdminParlours from "./components/Admin/AdminParlours.vue";
import AdminOverview from "./components/Admin/AdminOverview.vue";
import AdminSubCat from "./components/Admin/AdminSubCat.vue";
import AdminOffers from "./components/Admin/AdminOffers.vue";
import DummyPage from "./components/DummyPage.vue";
import HomePage from "./components/User/HomePage.vue";
import PayMent from "./components/User/Cart/PayMent.vue";
import ParlourView from "./components/Parlour/ParlourView.vue";
import ParlourTodo from"./components/Parlour/ParlourTodo.vue"

import DummyPage2 from "./components/User/DummyPage2.vue";
import BarChart from "./components/Admin/BarChart.vue";
import DoughnutChart from "./components/Admin/DoughnutChart.vue";

import RatingPage from "./components/User/RatingPage.vue";
import LocationSearch from "./components/User/LocationSearch.vue";
import ParlourLocation from "./components/Parlour/ParlourLocation.vue"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/userlogin", component: UserLogin },
    { path: "/viewparlours", component: ViewParlours },
    {
      path: "/eachparlour",
      component: EachParlour,
      name: "EachParlour",
      props: true,
    },
    { path: "/usersignup", component: UserSignup },
    { path: "/adminlogin", component: AdminLogin },
    { path: "/parlourlogin", component: ParlourLogin },
    { path: "/parlourprofile", component: ParlourProfile },
    { path: "/parlourreg", component: ParlourReg },
    { path: "/adminhome", component: AdminHome },
    { path: "/services", component: ServicesPage },
    {path: "/serviceparlour",component: ServiceParlour,},
    {path:"/eachservice",component: EachService},
    {path:"/userpage",component:UserPage},
    { path:"/offer",component:OfferPage},
    {path:"/offerparlour",component:OfferParlour},
    {path:"/adminreg", component:AdminReg},
    {path:"/adminservices",component: AdminViewServices},
    {path:"/adminparlours",component:AdminParlours},
    {path:"/overview",component:AdminOverview},
    {path:"/adminsubcat",component: AdminSubCat},
    {path:"/adminoffers",component:AdminOffers},
    {path:"/dummy",component: DummyPage},
    {path:"/home",component:HomePage},
    {path:"/dummy2",component:DummyPage2},
    {path:"/payMent",component:PayMent},
    {path:"/parlourView",component:ParlourView},
    {path:"/parlourTodo",component:ParlourTodo},
    {path:"/barChart",component:BarChart},
    {path:"/doughnut",component:DoughnutChart},
    {path:"/rating",component: RatingPage},
   {path:"/location",component: LocationSearch},
   {path:"/parlourlocation", component: ParlourLocation},
   
  ],
});
export default router;
