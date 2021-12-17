<template>
  <!-- A card with an image of an artwork, the artwork title, and remove button -->
  <!-- If artwork clicked, emit navigate to details page with new artwork -->
  <v-card class="pa-0 flex-column" outlined tile @click="$emit('navigateTo')">
    <v-img
      height="300px"
      :cover="true"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="imageURL"
    >
      <span
        class="text-md-subtitle-2 white--text pl-1 pt-4 d-inline-block"
        v-text="artworkTitle"
      ></span>
    </v-img>
    <v-card-actions class="white justify-center">
      <v-col class="text-center">
        <span
          class="text-md-subtitle-2 black--text pl-4 pt-4 d-inline-block"
          v-text="artworkGallery"
        ></span>
      </v-col>
    </v-card-actions>
    <v-row class="mb-3 mr-3">
      <v-spacer></v-spacer>
      <v-btn color="orange" text @click.stop="$emit('removeArtwork')">
        Remove
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ProfileCard",
  props: ["imageURL", "artworkTitle", "artworkGallery"],
  emits: ["navigateTo", "removeArtwork"],
};
</script>
f
