<template>
  <v-row v-if="favoritedArtworks.length === 0">
    <v-row align="center" justify="center">
      <v-col align="center" sm="6" md="4">
        <v-btn
          v-bind="size"
          color="black"
          class="pa-4 mt-16 white--text"
          rounded
          elevation="2"
          :x-small="$vuetify.breakpoint.smAndDown"
          @click.stop="navigateHome()"
        >
          There's nothing in your Gallery yet, click here to explore more
          paintings..
        </v-btn>
      </v-col>
    </v-row>
  </v-row>
  <v-row v-else>
    <v-col
      v-for="artwork in favoritedArtworks"
      v-bind:key="artwork.id"
      :cols="artwork.flex"
      sm="6"
      md="4"
    >
      <HomeCard
        v-bind:image-u-r-l="getLinkImage(artwork)"
        v-bind:artwork-title="artwork.title"
        v-bind:artwork-gallery="artwork.collecting_institution"
        @navigateTo="navigateTo(artwork)"
        @removeFrom="removeFrom(artwork)"
      />
    </v-col>
  </v-row>
</template>

<script>
import HomeCard from "../components/homeCard.vue";

export default {
  name: "ProfileView",
  props: ["favoritedArtworks"],
  components: { HomeCard },
  methods: {
    navigateTo: function (artwork) {
      this.$emit("navigateTo", artwork);
    },
    navigateHome: function () {
      this.$emit("navigateHome");
    },
    removeFrom: function (artwork) {
      this.$emit("removeFrom", artwork);
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

<style></style>
