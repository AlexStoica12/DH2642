import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") | "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    login({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        fetch(
          "https://api.artsy.net/api/tokens/xapp_token?client_id=13d34ce7f1970b2cdb6c&client_secret=86fa3ab3fc163a22b49f3ec8944898b0",
          {
            method: "POST",
          }
        )
          .then((resp) => {
            resp.json().then((data) => {
              let token = data.token;
              localStorage.setItem("token", data);
              commit("auth_success", token);
              console.log(
                "I am now commiting a login. Your token is: ",
                data.token
              );
            });
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    currentToken: (state) => state.token,
  },
});
