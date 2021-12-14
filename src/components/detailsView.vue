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
        <v-btn tile @click="navigateBack()">
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
          <v-sheet color="white" min-height="70vh" rounded="lg">
            <div
              :class="{
                'pt-0': $vuetify.breakpoint.smAndDown,
                'pt-16': $vuetify.breakpoint.mdAndUp,
              }"
            >
              <h1
                :class="{
                  'pl-4 pt-3': $vuetify.breakpoint.smAndDown,
                  'pl-4  pt-10': $vuetify.breakpoint.mdAndUp,
                }"
              >
                Dimensions
              </h1>
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
                activateSnackbarAddToGalleryEventFn();
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
                    this.$emit('activateSnackbarRemoveFromGalleryEvent');
                    removeCurrentAddedArtworkFromGallery();
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
          <v-sheet color="white" min-height="10vh" rounded="lg" class="pt-0">
            <h3 class="pa-4">Similar works</h3>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="artwork in currentSimilarArtworks"
                :key="artwork.id"
              >
                <DetailsCard v-bind:artwork="artwork" />
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
                <DetailsCard v-bind:artwork="artwork" />
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
  name: "DetailsView",
  components: { DetailsCard },
  props: ["value"],
  data: function () {
    return {};
  },
  methods: {
    activateSnackbarAddToGalleryEventFn: function () {
      this.$root.$emit("activateSnackbarAddToGalleryEvent");
    },
  },
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
  inject: [
    "getLinkImage",
    "addArtworkToGallery",
    "removeCurrentAddedArtworkFromGallery",
    "activateSnackbarAddToGallery",
    "navigateBack",
    "isLoading",
    "navigateTo",
    "snackbarCancelAddToGallery",
    "timeoutSnackbarCancelAddToGallery",
    "snackbarAddToGallery",
    "timeoutSnackbarAddToGallery",
  ],
};
</script>
