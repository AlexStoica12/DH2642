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
      ></v-text-field>
    </v-toolbar>
    <v-container v-if="isLoading">
      <v-row align="center" justify="center">
       <v-col align="center">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="50"
        ></v-progress-circular>
       </v-col>
     </v-row>
    </v-container>
    <v-row v-else>
      <v-spacer></v-spacer>
      <v-col
        v-for="artwork in filterArtworkFeed"
        v-bind:key="artwork.id"
        :align-self="artwork"
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
  </v-card>
</template>
<script>
// @ is an alias to /src
import artsySource from "@/js/artsySource";
import HomeCard from "../components/homeCard.vue";
export default {
  name: "Home",
  components: {HomeCard},
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
    filterArtworkFeed : function (){

      var artworksFeed = this.artworks;
      var searchString = this.searchString;

      if(!searchString){
        return artworksFeed;
      }
      searchString = searchString.trim().toLowerCase();

      artworksFeed = artworksFeed.filter(function (item){
        if(item.title.toLowerCase().indexOf(searchString)!== -1){
          return item;
        }
      })
      return artworksFeed;
    }
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
