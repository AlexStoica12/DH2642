<template>
  <div>
    <v-btn color="success" @click="breakFunc">Break My Token</v-btn>
    <v-btn color="success" @click="test">Test my Api</v-btn>
  </div>
</template>

<script>
import artsySource from "../js/artsySource.js";

export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    check: function () {
      console.log(this.$store.getters.currentToken);
    },
    breakFunc: function () {
      this.$store.state.token = "";
      console.log("I BROKE IT", this.$store.getters.currentToken);
    },
    test: function () {
      console.log("Entering Test");
      artsySource.test();
    },
  },
};
</script>

<style></style>
