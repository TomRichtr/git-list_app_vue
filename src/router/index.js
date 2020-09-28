import Vue from "vue";
import VueRouter from "vue-router";
import RepositoriesPage from "../views/RepositoriesPage";
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
    name: "RepositoriesPage",
    component: RepositoriesPage,
  },
  {
    path: "/:repositoryId/commits",
    name: "CommitsPage",
    component: CommitsPage,
  },
  {
    path: "/:repositoryId/branches",
    name: "BranchesPage",
    component: BranchesPage,
    beforeEnter(to, from, next) {
      if (store.state.repositoryName != "") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/:repositoryId/issues",
    name: "IssuesPage",
    component: IssuesPage,
    beforeEnter(to, from, next) {
      if (store.state.repositoryName != "") {
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
