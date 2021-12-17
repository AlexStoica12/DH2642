<template>
  <!-- Profile Presenter. Sends data from Vuex store to View. 
  Checks events from View, tells model how to change -->
  <ProfileView
    v-bind:favorited-artworks="favoritedArtworks"
    @navigateTo="navigateTo"
    @navigateHome="navigateHome"
    @removeArtwork="removeArtwork"
  />
</template>

<script>
import ProfileView from "./ProfileView.vue";

export default {
  name: "Profile",
  components: { ProfileView },
  computed: {
    favoritedArtworks: function () {
      return this.$store.getters.favoritedArtworks;
    },
  },
  methods: {
    removeArtwork: function (artwork) {
      this.$store.dispatch("removeFromFavorited", artwork);
    },
    navigateHome: function () {
      this.$router.push("/home");
    },
    // Helper function for navigation
    navigateTo: function (artwork) {
      this.$store.dispatch("setCurrentArtwork", artwork.id);
      this.$router.push("/details");
    },
  },
};
</script>

<style scoped>
.background {
  background: #f5f2f2;
}
</style>
