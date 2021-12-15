<template>
  <div>
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
      <v-col
        v-for="artwork in filteredArtworks"
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
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HomeCard from "../components/homeCard.vue";

export default {
  name: "HomeView",
  props: ["searchString", "filteredArtworks", "isLoading"],
  components: { HomeCard },

  methods: {
    navigateTo: function (artwork) {
      this.$emit("navigateTo", artwork);
    },
    navigateHome: function () {
      this.$emit("navigateHome");
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
