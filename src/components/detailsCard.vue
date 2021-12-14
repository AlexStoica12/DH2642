<template>
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
      :src="getLinkImage(artwork)"
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
          activateSnackbarAddToGalleryEventFn();
          addArtworkToGallery(artwork);
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
  props: ["artwork"],
  inject: ["addArtworkToGallery", "navigateTo", "getLinkImage"],
  data: function () {
    return {};
  },
  methods: {
    activateSnackbarAddToGalleryEventFn: function () {
      this.$root.$emit("activateSnackbarAddToGalleryEvent");
    },
  },
};
</script>
