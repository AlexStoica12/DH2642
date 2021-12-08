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
    error(state) {
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
    setCurrentArtwork(state, { id, artworkDetails, similarArtworks }) {
      state.model.setCurrentArtworkSync(id, artworkDetails, similarArtworks);
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
    async setCurrentArtwork({ commit }, id) {
      commit("request");
      try {
        const artwork = await artsySource.searchArtworks(id);
        const artworkDetails = {
          id: artwork.id,
          title: artwork.title,
          category: artwork.category,
          medium: artwork.medium,
          dimensions: artwork.dimensions,
          _links: artwork._links,
        };
        const artworks = await artsySource.searchArtworksParams({
          similar_to_artwork_id: id,
        });
        const similarArtworks = artworks._embedded.artworks;

        commit("setCurrentArtwork", { id, artworkDetails, similarArtworks });
      } catch (error) {
        commit("error");
      } finally {
        commit("complete");
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    status: (state) => state.status,
    currentToken: (state) => state.token,
    myModel: (state) => state.model,
    images(state) {
      return state.images;
    },
    favoritedArtworks: (state) => state.model.favoritedArtworks,
  },
});
