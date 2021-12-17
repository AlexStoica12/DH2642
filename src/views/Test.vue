<template>
  <!-- Page to test the model, api and vuex store -->
  <div>
    <v-btn color="success" @click="breakFunc">Break My Token</v-btn>
    <v-btn color="success" @click="test">Test my Api</v-btn>
    <v-btn color="success" @click="testModelFunc">Test my Model</v-btn>
    <br />
    <v-btn color="success" @click="addToFavorited">Add Artwork to Model</v-btn>
    <v-btn color="success" @click="removeFromFavorited"
      >Remove Artwork to Model</v-btn
    >
    <v-btn color="success" @click="setFavoritedArtworks"
      >Set Favorited Artworks in Model</v-btn
    >
    <v-btn color="success" @click="setCurrentArtwork"
      >Set Current Artworks in Model</v-btn
    >
    <span>{{ model }}</span>
  </div>
</template>

<script>
import artsySource from "../js/artsySource.js";
import ArtsyModel from "../js/artsyModel.js";

export default {
  name: "Test",
  data() {
    return {};
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    model: function () {
      return this.$store.getters.myModel;
    },
  },
  methods: {
    addToFavorited: async function () {
      this.$store.dispatch("addToFavorited", {
        id: "516dfb9ab31e2b2270000c45",
      });
      console.log(this.$store.getters.myModel);
    },
    removeFromFavorited: function () {
      this.$store.dispatch("removeFromFavorited", {
        id: "4eaf151bd2a582000100ba46",
      });
      console.log(this.$store.getters.myModel);
    },
    setFavoritedArtworks: function () {
      this.$store.dispatch("setFavoritedArtworks", [
        { id: "4eaf151bd2a582000100ba46" },
        { id: "4eb2ff37e9bbd9000100dd34" },
        { id: "5081754dc883d20002000dbf" },
        { id: "521e6c32c9dc2436800001b1" },
      ]);
      console.log(this.$store.getters.myModel);
    },
    setCurrentArtwork: function () {
      this.$store.dispatch("setCurrentArtwork", "4eaf151bd2a582000100ba46");
      console.log(this.$store.getters.myModel);
    },
    check: function () {
      console.log(this.$store.getters.currentToken);
    },
    breakFunc: function () {
      this.$store.state.token = "";
      console.log("I BROKE IT", this.$store.getters.currentToken);
    },
    test: function () {
      artsySource.testApi();
    },
    testModelFunc: () => {
      const test = new ArtsyModel();
      test.testModel();
    },
  },
};
</script>

<style></style>
