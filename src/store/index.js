import Vue from "vue";
import Vuex from "vuex";
import ArtsyModel from "../js/artsyModel.js";
import artsySource from "../js/artsySource.js";
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Api Request Status
    status: "",
    token: null,
    model: new ArtsyModel(),
    // Firebase
    user: null,
    error: null,
    // If persisting data, watch changes
    watch: null,
  },
  mutations: {
    // Api Requests
    request(state) {
      state.status = "loading";
    },
    error(state) {
      state.status = "error";
    },
    complete(state) {
      state.status = "success";
    },
    // Token
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
    // Model
    addToFavorited(state, artwork) {
      state.model.addToFavorited(artwork);
    },
    removeFromFavorited(state, artwork) {
      state.model.removeFromFavorited(artwork);
    },
    setFavoritedArtworks(state, artwork) {
      state.model.setFavoritedArtworks(artwork);
    },
    setCurrentArtwork(
      state,
      { id, artworkDetails, similarArtworks, artists, artworksArtist }
    ) {
      state.model.setCurrentArtworkSync(
        id,
        artworkDetails,
        similarArtworks,
        artists,
        artworksArtist
      );
    },
    // Firebase
    setUser(state, payload) {
      state.user = payload;
    },
    signOut(state) {
      state.user = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
    // Watcher
    setWatch(state, payload) {
      state.watch = payload;
    },
  },
  actions: {
    // Refresh Token
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
    // Model
    addToFavorited({ commit, dispatch }, artwork) {
      commit("addToFavorited", artwork);
    },
    removeFromFavorited({ commit, dispatch }, artwork) {
      commit("removeFromFavorited", artwork);
    },
    setFavoritedArtworks({ commit }, artworks) {
      commit("setFavoritedArtworks", artworks);
    },
    setUser({ commit }, user) {
      commit("setUser", user.user._delegate.uid);
    },
    signOut({ commit, state, dispatch }) {
      commit("signOut");
      state.watch();
      dispatch("setWatch", null);
      commit("setFavoritedArtworks", []);
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
          collecting_institution: artwork.collecting_institution,
          _links: artwork._links,
        };

        const artworks = await artsySource.searchArtworksParams({
          similar_to_artwork_id: id,
          size: 10,
        });
        const artists = await artsySource.searchArtistParams({
          artwork_id: artwork.id,
        });
        const similarArtworks = artworks._embedded.artworks;
        const artistID = artists._embedded.artists[0].id;
        const artworksArtistResult = await artsySource.searchArtworksParams({
          artist_id: artistID,
          size: 10,
        });
        const artworksArtist = artworksArtistResult._embedded.artworks;

        commit("setCurrentArtwork", {
          id,
          artworkDetails,
          similarArtworks,
          artists,
          artworksArtist,
        });
      } catch (error) {
        commit("error");
      } finally {
        commit("complete");
      }
    },
    // Watcher
    setWatch({ commit }, watch) {
      commit("setWatch", watch);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isUserLoggedIn: (state) => !!state.user,
    status: (state) => state.status,
    currentToken: (state) => state.token,
    myModel: (state) => state.model,
    images(state) {
      return state.images;
    },
    favoritedArtworks: (state) => state.model.favoritedArtworks,
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    },
  },
});
