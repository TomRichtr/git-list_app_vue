import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "../scss/custom.scss";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMouse,
  faBars,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(faMouse, faBars, faEllipsisH);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
