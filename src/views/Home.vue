/* eslint-disable */
<template>
  <v-card flat tile>
    <v-toolbar span class="rounded-xl mx-5 my-2 white">

      <v-text-field
        hide-details
        label="Type art name"
        v-model="searchString"
        placeholder="Search"
        filled
        rounded
        dense
        single-line
        append-icon="mdi-magnify"
      >
      </v-text-field>
    </v-toolbar>
    <v-container v-if="isLoading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="50"
        ></v-progress-circular>
      </div>
    </v-container>
    <v-row v-else>
      <v-spacer></v-spacer>
      <v-col
        v-for="artwork in artworks"
        :key="artwork.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card @click="navigateTo(artwork)">
          <v-img :src="artwork._links.thumbnail.href" height="300px">
            <span
              class="text-md-subtitle-2 white--text pl-4 pt-4 d-inline-block"
              v-text="artwork.title"
            ></span>
          </v-img>

          <v-card-actions class="white justify-center">
            <v-col class="text-center">
              <span
                class="text-md-subtitle-2 black--text pl-4 pt-4 d-inline-block"
                v-text="artwork.collecting_institution"
              ></span>
              <br />
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
// @ is an alias to /src
//import Results from "../components/Results.vue";
import artsySource from "@/js/artsySource";

export default {
  name: "Home",
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
      socials: [
        {
          icon: "mdi-facebook",
          color: "indigo",
        },
        {
          icon: "mdi-instagram",
          color: "red lighten-3",
        },
      ],
    };
  },
  computed: {
    token: function () {
      return this.$store.getters.currentToken;
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
  },
};
</script>
<style lang="scss" scoped>
.md-card {
  width: 30vw;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.home {
  margin: 0 auto;
}
.subheading {
  /*Google fonts: Archivo*/
  font-family: "Archivo", sans-serif, Helvetica;
  font-size: 16px !important;
  font-weight: 400;
  cursor: pointer;
  color: #616161;
  line-height: 1.8;
}
</style>
