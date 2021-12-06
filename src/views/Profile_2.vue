/* eslint-disable */
<template>
  <v-card flat tile>
    <v-toolbar color="white" light>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-col>
      <v-spacer></v-spacer>
      <v-row
        v-for="artwork in artworks"
        :key="artwork.url"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card @click="navigateTo('/details')">
          <v-img :src="artwork.url" height="300px" contain="true">
            <span
              class="text-md-subtitle-2 white--text pl-4 pt-4 d-inline-block"
              v-text="artwork.name"
            ></span>
          </v-img>

          <v-card-actions class="white justify-center" line-height="200px">
            <v-row class="text-center">
              <span
                class="text-md-subtitle-2 black--text pl-4 pt-4 d-inline-block"
                v-text="artwork.artist"
              ></span>
              <!-- <br /> -->
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </v-card>
</template>
<script>
//import ArtsyModel from '../js/artsyModel';
// @ is an alias to /src
//import Results from "../components/Results.vue";
//import artsySource from "@/js/artsySource";
//import artsyModel from "@/js/artsyModel";

export default {
  name: "Home",
  mounted() {
    this.getArtworks();
  },
  data() {
    return {
      artworks: [],
      images: [
        {
          url: "https://64.media.tumblr.com/14709159e19643734eaa79f7ff8ac06d/f317c58810f9ebc3-f8/s500x750/f4ce4c174c19f8dfaf5dbaefab512e1d9fe77c7b.jpg",
          name: "Watercolor",
          artist: "Bello Cavello",
        },
        {
          url: "https://64.media.tumblr.com/27b6c18f4a8e04839708bc73ee5acc7f/67b7cb7a80422330-e1/s500x750/6662562dda7bc96774e1d11d2c19d26b16ef56fe.jpg",
          name: "Godzilla anatomic drawing",
          artist: "Heruka Medori",
        },
        {
          url: "https://64.media.tumblr.com/72d06e38a80b674619ed921f185cfbc4/6777aebfef58aa8e-3d/s500x750/5ea3ca6fe1dd8026a6fdd7af1935bb0e4dede37b.png",
          name: "Revenge Cagn",
          artist: "Lady Skollie"
        },
      ],
    };
  },
  methods: {
    async getArtworks() {
      //let favartworks = await artsyModel.getFavoritedArtworks();
      this.artworks = this.images
    },
    // Helper function for navigation
    navigateTo: function (route) {
      this.$router.push(route);
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
