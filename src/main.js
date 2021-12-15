import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/plugins/firebaseConfig";
import firebaseModel from "./js/firebaseModel.js";

firebaseModel
  .signInAction({
    email: "taco5@gmail.com",
    password: "123456",
  })
  .then((result) => console.log(result));

firebaseModel
  .loadUserData({
    _delegate: { uid: "vM2c9TUd5sN4CdjvJmB6N20ueIh1" },
  })
  .then((result) => console.log(result));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
