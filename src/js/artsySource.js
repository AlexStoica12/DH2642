import store from "../store";

const artsySource = {
  // How to perform an api call
  // Gets token from store
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
  }, //Get data based on the artist id
  searchArtistID(id) {
    return artsySource.apiCall("artists/" + id).then((data) => {
      return data;
    });
  }, //Get artist where query params are given
  searchArtistParams(params) {
    return artsySource
      .apiCall("artists?" + new URLSearchParams(params))
      .then((data) => {
        return data;
      });
  },
  // Search for any artwork, artist, collection, etc
  searchQuery(query) {
    return artsySource.apiCall("search?q=" + query).then((data) => {
      return data;
    });
  },
  // Get specific artwork from ID
  searchArtworks(id) {
    return artsySource.apiCall("artworks/" + id).then((data) => {
      return data;
    });
  },
  // Get artworks where query parameters are given
  searchArtworksParams(params) {
    return artsySource
      .apiCall("artworks?" + new URLSearchParams(params))
      .then((data) => {
        return data;
      });
  },
  // Gets 100 random artworks
  searchAllArtworks() {
    const randInt = Math.floor(Math.random() * 10000) + 1;

    return artsySource
      .apiCall("artworks?size=100&offset=" + randInt.toString())
      .then((data) => {
        return data;
      });
  },
  // Call to API in order to get a new X-App Token
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

  // Test Functions
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
