<template>
  <ProfileView v-bind:favorited-artworks="favoritedArtworks" />
</template>

<script>
import ProfileView from "./ProfileView.vue";

export default {
  name: "Profile",
  components: { ProfileView },
  data: function () {
    return {};
  },
  computed: {
    favoritedArtworks: function () {
      return this.$store.getters.favoritedArtworks;
    },
  },
  methods: {
    removeArtworkFromGallery: function (artwork) {
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
