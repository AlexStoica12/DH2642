<template>
  <row v-if="favoritedArtworks.length === 0">
    <v-row align="center" justify="center">
      <v-col align="center" sm="6" md="4">
        <v-btn
          color="black"
          class="pa-4 mt-16 white--text"
          rounded
          elevation="2"
          x-large
          @click.stop="$emit('navigateHome')"
        >
          There's nothing in your Gallery yet, click here to explore more
          paintings..
        </v-btn>
      </v-col>
    </v-row>
  </row>
  <v-row v-else>
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
        @navigateTo="$emit('navigateTo', artwork)"
      />
    </v-col>
  </v-row>
</template>

<script>
import HomeCard from "../components/homeCard.vue";

export default {
  name: "ProfileView",
  props: ["favoritedArtworks"],
  components: { HomeCard },

  methods: {
    // Render image from artwork
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

<style></style>
