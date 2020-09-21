import Vue from "vue";
import VueRouter from "vue-router";
import RepsPage from "../views/RepsPage";
import BranchesPage from "../views/BranchesPage";
import CommitsPage from "../views/CommitsPage";
import IssuesPage from "../views/IssuesPage";
import AboutPage from "../views/AboutPage";
import NotFoundPage from "../views/NotFoundPage";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RepsPage",
    component: RepsPage,
  },
  {
    path: "/:id/commits",
    name: "CommitsPage",
    component: CommitsPage,
    beforeEnter(to, from, next) {
      if (store.state.repName != "") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/:id/branches",
    name: "BranchesPage",
    component: BranchesPage,
    beforeEnter(to, from, next) {
      if (store.state.repName != "") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/:id/issues",
    name: "IssuesPage",
    component: IssuesPage,
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
  {
    path: "*",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
