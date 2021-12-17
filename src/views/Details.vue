<template>
  <div>
    <v-main v-if="isLoading()">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col align="center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-container v-else class="pt-5">
      <v-row>
        <v-btn text @click="navigateBack()">
          <v-icon left>mdi-keyboard-backspace</v-icon>
          Go back
        </v-btn>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" md="8">
          <v-sheet color="white" min-height="30vh" rounded="lg">
            <h1 class="pa-3">{{ currentArtworkDetails.title }}</h1>
            <h2 class="pa-3 pt-0">
              {{ currentArtists._embedded.artists[0].name }}
            </h2>
            <v-img
              contain
              class="pa-10"
              max-height="55vh"
              :src="getLinkImage(currentArtworkDetails)"
              position="center center"
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="4" class="pl-0">
          <v-sheet color="white" min-height="30vh" rounded="lg">
            <div
              :class="{
                'pt-0': $vuetify.breakpoint.smAndDown,
                'pt-16': $vuetify.breakpoint.mdAndUp,
              }"
              v-if="currentArtworkDetails.dimensions"
            >
              <h1
                :class="{
                  'pl-4 pt-3': $vuetify.breakpoint.smAndDown,
                  'pl-4  pt-10': $vuetify.breakpoint.mdAndUp,
                }"
                v-if="currentArtworkDetails.dimensions.cm.text"
              >
                Dimensions
              </h1>
              <h1 v-else></h1>
              <h2 class="pl-4">
                {{ currentArtworkDetails.dimensions.cm.text }}
              </h2>
            </div>
            <div>
              <h1 class="pl-4 pt-5">Gallery</h1>
              <h2 class="pl-4">
                {{ currentArtworkDetails.collecting_institution }}
              </h2>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              block
              color="black"
              class="pa-4 mt-16 white--text"
              rounded
              elevation="2"
              x-large
              @click="
                snackbarAddToGallery = true;
                addArtworkToGallery(currentArtworkDetails);
              "
            >
              Add to My Gallery
            </v-btn>
            <v-snackbar
              v-model="snackbarAddToGallery"
              :timeout="timeoutSnackbarAddToGallery"
            >
              Artwork added to My Gallery
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="
                    removeCurrentAddedArtworkFromGallery();
                    snackbarCancelAddToGallery = true;
                    snackbarAddToGallery = false;
                  "
                >
                  Undo
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar
              v-model="snackbarCancelAddToGallery"
              :timeout="timeoutSnackbarCancelAddToGallery"
            >
              Removed artwork from gallery
            </v-snackbar>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col>
          <v-sheet color="white" min-height="20vh" rounded="lg" class="pt-0">
            <h3 class="pa-4">Similar works</h3>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="artwork in currentSimilarArtworks"
                :key="artwork.id"
              >
                <DetailsCard
                  v-bind:image-u-r-l="getLinkImage(artwork)"
                  v-bind:artwork-title="artwork.title"
                  @addArtworkToGalleryEvent="addArtworkToGallery(artwork)"
                  @navigateToEvent="navigateTo(artwork)"
                  @activateSnackbarAddToGalleryEvent="
                    activateSnackbarAddToGallery()
                  "
                />
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col>
          <v-sheet color="white" min-height="20vh" rounded="lg" class="pt-0">
            <h3 class="pa-4">Other works from the artist</h3>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="artwork in artworksCurrentArtist"
                :key="artwork.id"
              >
                <DetailsCard
                  v-bind:image-u-r-l="getLinkImage(artwork)"
                  v-bind:artwork-title="artwork.title"
                  @addArtworkToGalleryEvent="addArtworkToGallery(artwork)"
                  @navigateToEvent="navigateTo(artwork)"
                  @activateSnackbarAddToGalleryEvent="
                    activateSnackbarAddToGallery()
                  "
                />
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DetailsCard from "../components/detailsCard.vue";
export default {
  name: "Details",
  components: { DetailsCard },
  computed: {
    currentArtworkDetails: function () {
      return this.$store.getters.myModel.currentArtworkDetails;
    },
    currentSimilarArtworks: function () {
      return this.$store.getters.myModel.currentSimilarArtworks;
    },
    currentArtists: function () {
      return this.$store.getters.myModel.currentArtists;
    },
    artworksCurrentArtist: function () {
      return this.$store.getters.myModel.artworksCurrentArtist;
    },
  },
  methods: {
    getLinkImage: function (artwork) {
      if (artwork._links.thumbnail) {
        return artwork._links.thumbnail.href;
      } else {
        return "https://demechanica.com/wp-content/uploads/2018/07/placeholder.png";
      }
    },
    addArtworkToGallery: function (artwork) {
      this.currentArtworkAdded = artwork;
      this.$store.dispatch("addToFavorited", artwork);
    },
    removeCurrentAddedArtworkFromGallery: function () {
      this.$store.dispatch("removeFromFavorited", this.currentArtworkAdded);
      this.currentArtworkAdded = null;
    },
    activateSnackbarAddToGallery: function () {
      this.snackbarAddToGallery = true;
    },
    // Helper function for navigation
    navigateBack: function () {
      this.$router.go(-1);
    },
    isLoading: function () {
      let status = this.$store.getters.status;
      return status === "loading" || status === "error";
    },
    navigateTo: function (artwork) {
      this.$store.dispatch("setCurrentArtwork", artwork.id);
      if (this.$router.currentRoute.path !== "/details") {
        this.$router.push("/details");
      }
    },
  },
  data() {
    return {
      loading: true,
      snackbarAddToGallery: false,
      snackbarCancelAddToGallery: false,
      currentArtworkAdded: null,
      timeoutSnackbarAddToGallery: 2000,
      timeoutSnackbarCancelAddToGallery: 1000,
    };
  },
};
</script>
