import store from "../store";

const artsySource = {
  apiCall(params) {
    return fetch("https://api.artsy.net/api/" + params, {
      method: "GET",
      headers: {
        "X-Xapp-Token": store.getters.currentToken,
      },
    }).then((response) => {
      if (response.status === 400) {
        store.dispatch("login").catch((err) => console.log(err));
      } else if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  },
  searchArtistID(id) {
    return artsySource.apiCall("artists/" + id).then((data) => {
      return data;
    });
  },
  searchArtistParams(params) {
    return artsySource
      .apiCall("artists?" + new URLSearchParams(params))
      .then((data) => {
        return data;
      });
  },
  searchQuery(query) {
    return artsySource.apiCall("search?q=" + query).then((data) => {
      return data;
    });
  },
  searchArtworks(id) {
    return artsySource.apiCall("artworks/" + id).then((data) => {
      return data;
    });
  },
  searchArtworksParams(params) {
    return artsySource
      .apiCall("artworks?" + new URLSearchParams(params))
      .then((data) => {
        return data;
      });
  },
  searchAllArtworks() {
    return artsySource.apiCall("artworks?size=50").then((data) => {
      return data;
    });
  },
  refreshToken() {
    return fetch(
      "https://api.artsy.net/api/tokens/xapp_token?client_id=13d34ce7f1970b2cdb6c&client_secret=86fa3ab3fc163a22b49f3ec8944898b0",
      {
        method: "POST",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  async testApi() {
    console.log("Entering API Test");
    artsySource.searchArtistID("4d8b92b34eb68a1b2c0003f4").then((artist) => {
      console.log("The artist is", artist);
    });
    artsySource.searchArtworks("516dfb9ab31e2b2270000c45").then((artwork) => {
      console.log("The artwork is", artwork);
    });
    artsySource.searchAllArtworks().then((artworks) => {
      console.log(
        "The number of artworks found are: ",
        artworks._embedded.artworks.length
      );
    });
    artsySource.refreshToken().then((data) => {
      console.log("Your token is", data);
    });
  },
};
export default artsySource;
