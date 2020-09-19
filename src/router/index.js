import Vue from "vue";
import VueRouter from "vue-router";
import RepsPage from "../views/RepsPage";
import DetailPage from "../views/DetailPage";
import AboutPage from "../views/AboutPage";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RepsPage",
    component: RepsPage,
  },
  {
    path: "/:id",
    name: "DetailPage",
    component: DetailPage,
    beforeEnter(to, from, next) {
      if (store.state.repName != "") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
