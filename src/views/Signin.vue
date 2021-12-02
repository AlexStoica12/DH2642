<template>
  <div>
    <v-btn color="success" @click="breakFunc">Break My Token</v-btn>
    <v-btn color="success" @click="test">Test my Api</v-btn>
    <v-btn color="success" @click="testModelFunc">Test my Model</v-btn>
  </div>
</template>

<script>
import artsySource from "../js/artsySource.js";
import ArtsyModel from "../js/artsyModel.js";

export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    check: function () {
      console.log(this.$store.getters.currentToken);
    },
    breakFunc: function () {
      this.$store.state.token = "";
      console.log("I BROKE IT", this.$store.getters.currentToken);
    },
    test: function () {
      console.log("Entering Test");
      artsySource.test();
    },
    testModelFunc: async () => {
      console.log("Entering Model Test");
      const myModel = new ArtsyModel();
      let artworks = await artsySource.searchAllArtworks();
      artworks = artworks._embedded.artworks;
      const five_artworks = artworks.slice(10, 15);
      const artwork = artworks[7];
      myModel.addToFavorited(artwork);
      console.log("Added an artwork to favorited", myModel);
      myModel.removeFromFavorited(artwork);
      console.log("Removed an artwork from favorited", myModel);
      myModel.setFavoritedArtworks(five_artworks);
      console.log("Set all the favorited artworks from an array", myModel);
      myModel.setCurrentArtwork(five_artworks[2].id);
      console.log("Set the current artwork", myModel);
    },
  },
};
</script>

<style></style>
