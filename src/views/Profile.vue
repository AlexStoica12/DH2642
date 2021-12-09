<template>
  <v-container class="background">
    <v-container v-if="favoritedArtworks.length === 0">
      <v-btn color="orange" text @click.stop="navigateHome()">
        There's nothing in your Gallery yet, click here to explore more
        paintings..
      </v-btn>
    </v-container>
    <v-container
      v-else
      v-for="(artwork, i) in favoritedArtworks"
      :key="artwork.title"
    >
      <v-col v-if="i % 2 === 0" class="images" align="right" contain>
        <v-btn
          color="orange"
          text
          @click.stop="removeArtworkFromGallery(artwork)"
        >
          Remove
        </v-btn>
        <v-img :src="artwork._links.thumbnail.href" width="750px" />
        <v-spacer></v-spacer>
        <span
          class="text-md-subtitle-2 black--text pl-4 pt-4 d-inline-block"
          v-text="artwork.title + ', ' + 'Artist Name'"
        ></span>
        <v-divider></v-divider>
      </v-col>
      <v-col v-else class="images">
        <v-btn
          color="orange"
          text
          @click.stop="removeArtworkFromGallery(artwork)"
        >
          Remove
        </v-btn>
        <v-img :src="artwork._links.thumbnail.href" width="500px" contain>
        </v-img>
        <span
          class="text-md-subtitle-2 black--text pl-0 pt-4 d-inline-block"
          v-text="artwork.title + ', ' + 'Artist Name'"
        ></span>
        <v-divider></v-divider>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
export default {
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
  },
};
</script>

<style scoped>
.background {
  background: #f5f2f2;
}
</style>
