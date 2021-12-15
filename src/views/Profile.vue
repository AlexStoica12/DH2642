<template>
  <v-row>
    <v-col
      v-for="artwork in favoritedArtworks"
      v-bind:key="artwork.id"
      :cols="artwork.flex"
      sm="6"
      md="4"
    >
      <HomeCard
        v-bind:image-u-r-l="getLinkImage(artwork)"
        v-bind:artwork-title="artwork.title"
        v-bind:artwork-gallery="artwork.collecting_institution"
        @navigateToEvent="navigateTo(artwork)"
      />
    </v-col>
  </v-row>
</template>

<script>
import HomeCard from "../components/homeCard.vue";

export default {
  name: "Profile",
  components: { HomeCard },
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
    getLinkImage: function (artwork) {
      if (artwork._links.thumbnail) {
        return artwork._links.thumbnail.href;
      } else {
        return "https://demechanica.com/wp-content/uploads/2018/07/placeholder.png";
      }
    },
  },
};
</script>

<style scoped>
.background {
  background: #f5f2f2;
}
</style>
