<template>
  <!-- A card with an image of an artwork, the artwork title and "Add To Gallery" -->
  <!-- If artwork clicked, emit navigate to details page with new artwork -->
  <v-card
    class="ma-2 mb-5 d-flex flex-column"
    height="350"
    width="300"
    hover
    @click="navigateTo()"
  >
    <v-img class="white--text align-end" height="200px" :src="imageURL">
    </v-img>
    <v-card-text class="pb-0">
      <div style="width: 200px">
        <p class="overflow-x-auto font-weight-medium">
          {{ artworkTitle }}
        </p>
      </div>
    </v-card-text>
    <v-spacer></v-spacer>
    <!-- On Add to Gallery, Emit Open Snackbar and emit addArtworkToGallery -->
    <v-card-actions>
      <v-btn
        color="orange"
        text
        @click.stop="
          activateSnackbarAddToGallery();
          addArtworkToGallery();
        "
      >
        Add to My Gallery
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DetailsCard",
  props: ["imageURL", "artworkTitle"],
  emits: [
    "addArtworkToGalleryEvent",
    "navigateToEvent",
    "activateSnackbarAddToGalleryEvent",
  ],
  data: function () {
    return {};
  },
  // Emit event up tree
  methods: {
    addArtworkToGallery: function () {
      this.$emit("addArtworkToGalleryEvent");
    },
    navigateTo: function () {
      this.$emit("navigateToEvent");
    },
    activateSnackbarAddToGallery: function () {
      this.$emit("activateSnackbarAddToGalleryEvent");
    },
  },
};
</script>
