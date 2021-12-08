import Vue from "vue";
import Vuex from "vuex";
import ArtsyModel from "../js/artsyModel.js";
import artsySource from "../js/artsySource.js";
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") | "",
    model: new ArtsyModel(),
  },
  mutations: {
    request(state) {
      state.status = "loading";
    },
    auth_request(state) {
      state.status = "loading";
    },
    complete(state) {
      state.status = "success";
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
    addToFavorited(state, artwork) {
      state.model.addToFavorited(artwork);
    },
    removeFromFavorited(state, artwork) {
      state.model.removeFromFavorited(artwork);
    },
    setFavoritedArtworks(state, artwork) {
      state.model.setFavoritedArtworks(artwork);
    },
    setCurrentArtwork(state, artwork) {
      state.model.setCurrentArtwork(artwork);
    },
  },
  actions: {
    login({ commit }) {
      commit("auth_request");
      artsySource
        .refreshToken()
        .then((data) => {
          let token = data.token;
          console.log("Committing Login, your token is:", token);
          localStorage.setItem("token", token);
          commit("auth_success", token);
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
        });
    },
    addToFavorited({ commit }, artwork) {
      commit("addToFavorited", artwork);
    },
    removeFromFavorited({ commit }, artwork) {
      commit("removeFromFavorited", artwork);
    },
    setFavoritedArtworks({ commit }, artworks) {
      commit("setFavoritedArtworks", artworks);
    },
    async setCurrentArtwork({ commit }, artwork) {
      commit("request");
      commit("setCurrentArtwork", artwork);
      commit("complete");
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    currentToken: (state) => state.token,
    myModel: (state) => state.model,
    images(state) {
      return state.images;
    },
  },
});
