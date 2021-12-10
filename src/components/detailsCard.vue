<template>
  <v-card
    class="ma-2 mb-5 d-flex flex-column"
    height="325"
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
