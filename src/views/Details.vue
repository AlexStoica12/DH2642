<template>
  <DetailsView
    @activateSnackbarRemoveFromGalleryEvent="activateSnackbarRemoveFromGallery"
    @activateSnackbarAddToGalleryEvent="activateSnackbarAddToGallery"
    v-model="snackbarAddToGallery"
  />
</template>

<script>
import DetailsView from "../components/detailsView.vue";
// import Vue from "vue";
export default {
  name: "Details",
  components: { DetailsView },
  provide() {
    return {
      getLinkImage: this.getLinkImage,
      addArtworkToGallery: this.addArtworkToGallery,
      removeCurrentAddedArtworkFromGallery:
        this.removeCurrentAddedArtworkFromGallery,
      activateSnackbarAddToGallery: this.activateSnackbarAddToGallery,
      navigateBack: this.navigateBack,
      isLoading: this.isLoading,
      navigateTo: this.navigateTo,
      // snackbarCancelAddToGallery: Vue.computed(
      //   () => this.snackbarCancelAddToGallery
      // ),
      // timeoutSnackbarCancelAddToGallery: Vue.computed(
      //   () => this.timeoutSnackbarCancelAddToGallery
      // ),
      // snackbarAddToGallery: Vue.computed(() => this.snackbarAddToGallery),
      // timeoutSnackbarAddToGallery: Vue.computed(
      //   () => this.timeoutSnackbarAddToGallery
      // ),
      snackbarCancelAddToGallery: this.snackbarCancelAddToGallery,
      timeoutSnackbarCancelAddToGallery: this.timeoutSnackbarCancelAddToGallery,
      snackbarAddToGallery: this.snackbarAddToGallery,
      timeoutSnackbarAddToGallery: this.timeoutSnackbarAddToGallery,
    };
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
      console.log("Changing snackbar add to gallery var..");
      this.snackbarAddToGallery = true;
    },
    activateSnackbarRemoveFromGallery: function () {
      this.snackbarCancelAddToGallery = true;
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
  data: function () {
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
