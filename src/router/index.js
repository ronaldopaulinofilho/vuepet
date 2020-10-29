import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchDog from "../views/SearchDog.vue";
import FormDog from "../views/FormDog.vue";
import SearchVet from "../views/SearchVet.vue";
import FormVet from "../views/FormVet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/search-dog",
    name: "SearchDog",
    component: SearchDog,
  },
 
  {
    path: "/search-vet",
    name: "SearchVet",
    component: SearchVet,
  },
 
  {
    path: "/form-dog/:id?",
    name: "FormDog",
    component: FormDog,
  },
  {
    path:"/form-vet/:id?",
    name:"FormVet",
    component: FormVet,
  }
  
 
];

const router = new VueRouter({
  routes,
});

export default router;
