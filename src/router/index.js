import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../views/MainLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main-layout",
    component: MainLayout
  },
  {
    path: "/contact/:idx",
    name: "selected-contact",
    component: () => import("../views/ContactLayout.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
