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
    return artsySource.apiCall("artworks?size=100").then((data) => {
      return data;
    });
  },

  async test() {
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
  },
};
export default artsySource;
