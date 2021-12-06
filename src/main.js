import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Viewer from "v-viewer";
//import infiniteScroll from "vue-infinite-scroll";

//Vue.use(infiniteScroll);
Vue.use(Viewer);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
