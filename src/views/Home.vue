/* eslint-disable */
<template>
  <HomeView
    v-bind:searchString="searchString"
    v-bind:filteredArtworks="filteredArtworks"
    v-bind:isLoading="isLoading"
    @navigateTo="navigateTo"
    @onChange="onChange"
  />
</template>
<script>
// @ is an alias to /src
import artsySource from "@/js/artsySource";
import HomeView from "./HomeView.vue";

export default {
  name: "Home",
  components: { HomeView },
  mounted() {
    if (this.token !== null) {
      this.searchArtworks();
    }
  },
  data() {
    return {
      artworks: [],
      isLoading: true,
      searchString: "",
    };
  },
  computed: {
    token: function () {
      return this.$store.getters.currentToken;
    },
    filteredArtworks: function () {
      var filteredArtworks = this.artworks;
      var searchString = this.searchString;
      if (!searchString) {
        return filteredArtworks;
      }
      searchString = searchString.trim().toLowerCase();
      filteredArtworks = filteredArtworks.filter(function (item) {
        if (item.title.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      return filteredArtworks;
    },
  },
  watch: {
    token() {
      this.searchArtworks();
    },
  },
  methods: {
    async searchArtworks() {
      let artworks = await artsySource.searchAllArtworks();
      this.artworks = artworks._embedded.artworks;
      this.isLoading = false;
    },
    // Helper function for navigation
    navigateTo: function (artwork) {
      this.$store.dispatch("setCurrentArtwork", artwork.id);
      this.$router.push("/details");
    },
    onChange: function (query) {
      this.searchString = query;
    },
  },
};
</script>
<style lang="scss" scoped></style>
