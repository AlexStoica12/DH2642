<template>
  <!-- Home Presenter. Sends data from Vuex store to View. 
  Checks events from View, tells model how to change -->
  <HomeView
    v-bind:searchString="searchString"
    v-bind:filteredArtworks="filteredArtworks"
    v-bind:isLoading="isLoading"
    @navigateTo="navigateTo"
    @onChange="onChange"
  />
</template>

<script>
import artsySource from "@/js/artsySource";
import HomeView from "./HomeView.vue";

export default {
  name: "Home",
  components: { HomeView },
  // On load, get all the artworks if token not null
  mounted() {
    if (this.token !== null) {
      this.searchArtworks();
    }
  },
  data() {
    return {
      // Artworks
      artworks: [],
      isLoading: true,
      // Search String for filtering artworks
      searchString: "",
    };
  },
  computed: {
    // Get token from Store
    token: function () {
      return this.$store.getters.currentToken;
    },
    // Filters artworks based on search string, returns filterArtworks
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
    // If token is null and becomes not null, get artworks
    token() {
      this.searchArtworks();
    },
  },
  methods: {
    // Get the artworks from artsty
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
