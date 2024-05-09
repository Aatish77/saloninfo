import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "./components/UserLogin.vue";
import ViewParlours from "./components/ViewParlours.vue";
import EachParlour from "./components/EachParlour.vue";
import UserSignup from "./components/UserSignup.vue";
import ParlourLogin from "./components/ParlourLogin.vue";
import ParlourProfile from "./components/ParlourProfile.vue";
import ParlourReg from "./components/ParlourReg.vue";
import AdminLogin from "./components/AdminLogin.vue";
import AdminHome from "./components/AdminHome.vue";
import ServicesPage from "./components/ServicesPage.vue";
import ServiceParlour from "./components/ServiceParlour.vue";
import EachService from "./components/EachService.vue";
// import AdminEachRequest from "./components/AdminEachRequest.vue"
import UserProfile from "./components/UserProfile.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/userlogin" },
    { path: "/userlogin", component: UserLogin },
    { path: "/viewparlours", component: ViewParlours },
    {
      path: "/eachparlour/:id",
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
    {
      path: "/serviceparlour",
      component: ServiceParlour,
      
    },
    {path:"/eachservice",component: EachService},
    {
      path:"/userprofile",
      component:UserProfile
    },
  ],
});
export default router;
