<template>
  <v-container>
    <v-container v-if="favoritedArtworks.length === 0">
      <v-btn
        color="black"
        class="pa-4 mt-16 white--text"
        rounded
        elevation="2"
        x-large 
        @click.stop="navigateHome()">
        There's nothing in your Gallery yet, click here to explore more
        paintings..
      </v-btn>
    </v-container>
    <v-container
      v-else
      v-for="(artwork, i) in favoritedArtworks"
      :key="artwork.id"
    >
      <v-col v-if="i % 2 === 0" class="images" align="right" contain>
       <v-card
        class="pa-2 flex-column"
        outlined
        tile
        > 
        <v-btn
         color="black"
         class="pa-4 mt-12 white--text"
         rounded
         elevation="2" 
         @click.stop="removeArtworkFromGallery(artwork)"
        >
        Remove
        </v-btn>
        <v-img :src="artwork._links.thumbnail.href" width="750px" contain/>
        <v-spacer></v-spacer>
        <br>
        <span
          class="text-md-subtitle-2 black--text pl-2 pt-2 d-inline-block"
          v-text="artwork.title + ' located at '+ artwork.collecting_institution"
        ></span>
        <v-divider></v-divider>
       </v-card> 
      </v-col>

      <v-col v-else class="images">
        <v-card
        class="pa-2 flex-column"
        outlined
        tile
        > 
        <v-btn
         color="black"
         class="pa-4 mt-16 white--text"
         rounded
         elevation="2"
         @click.stop="removeArtworkFromGallery(artwork)"
        >
        Remove
        </v-btn>
        <v-img :src="artwork._links.thumbnail.href" width="500px" contain />
        <v-spacer></v-spacer>
        <br>
        <span
          class="text-md-subtitle-2 black--text pl-0 pt-4 d-inline-block"
          v-text="artwork.title + ' located at '+ artwork.collecting_institution"
        ></span>
        <v-divider></v-divider>
       </v-card> 
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
