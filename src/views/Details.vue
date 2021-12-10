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
    <v-container v-else>
      <v-row>
        <v-col align-self="start">
          <v-btn class="ma-1" @click="navigateBack()"
            >back to search results.</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="8">
          <v-sheet color="white" min-height="70vh" rounded="lg">
            <h1 class="pa-3">{{ currentArtworkDetails.title }}</h1>
            <h2 class="pa-3 pt-0">
              {{ currentArtists._embedded.artists[0].name }}
            </h2>
            <v-img
              contain
              class="pa-10"
              max-height="55vh"
              :src="currentArtworkDetails._links.thumbnail.href"
              position="center center"
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="4" class="pl-0">
          <v-sheet color="white" min-height="70vh" rounded="lg">
            <div class="pt-16">
              <h1 class="pl-4 pt-10">Dimensions</h1>
              <h2 class="pl-4">
                {{ currentArtworkDetails.dimensions.cm.text }}
              </h2>
            </div>
            <div>
              <h1 class="pl-4 pt-5">Price</h1>
              <h2 class="pl-4">{{ currentArtwork.price }}</h2>
            </div>
            <div>
              <h1 class="pl-4 pt-5">Gallery</h1>
              <h2 class="pl-4">{{ currentArtworkDetails.collecting_institution }}</h2>
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
                <v-card
                  class="ma-2 mb-5 d-flex flex-column"
                  height="325"
                  width="300"
                  hover
                  @click="navigateTo(artwork)"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="artwork._links.thumbnail.href"
                  >
                  </v-img>
                  <v-card-text class="pb-0">
                    <div style="width: 200px">
                      <p class="overflow-x-auto font-weight-medium">
                        {{ artwork.title }}
                      </p>
                    </div>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn
                      color="orange"
                      text
                      @click.stop="
                        snackbarAddToGallery = true;
                        addArtworkToGallery(artwork);
                      "
                    >
                      Add to My Gallery
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col>
          <v-sheet color="white" min-height="20vh" rounded="lg" class="pt-0">
            <h3 class="pa-4">Other works from the artis</h3>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="artwork in artworksCurrentArtist"
                :key="artwork.id"
              >
                <v-card
                  v-if="
                    artwork._links.thumbnail.href !==
                    currentArtworkDetails._links.thumbnail.href
                  "
                  class="ma-2 mb-5 d-flex flex-column"
                  height="325"
                  width="300"
                  hover
                  @click="navigateTo(artwork)"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="artwork._links.thumbnail.href"
                  >
                  </v-img>
                  <v-card-text class="pb-0">
                    <div style="width: 200px">
                      <p class="overflow-x-auto font-weight-medium">
                        {{ artwork.title }}
                      </p>
                    </div>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn
                      color="orange"
                      text
                      @click.stop="
                        snackbarAddToGallery = true;
                        addArtworkToGallery(artwork);
                      "
                    >
                      Add to My Gallery
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Details",
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
    addArtworkToGallery: function (artwork) {
      this.currentArtworkAdded = artwork;
      this.$store.dispatch("addToFavorited", artwork);
    },
    removeCurrentAddedArtworkFromGallery: function () {
      this.$store.dispatch("removeFromFavorited", this.currentArtworkAdded);
      this.currentArtworkAdded = null;
    },
    // Helper function for navigation
    navigateBack: function () {
      this.$router.push("/home");
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
      currentArtwork: {
        price: "Price",
        gallery: "Name of the gallery",
      },
    };
  },
};
</script>
