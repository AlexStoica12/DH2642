<template>
  <div>
    <v-btn color="success" @click="check">text</v-btn>
    <span>Successfully Logged In!</span>
    <v-btn color="success" @click="back">Go Back!</v-btn>
  </div>
</template>

<script>
import artsySource from "../js/artsySource.js";

export default {
  name: "Home",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    test: function () {
      console.log("Entering Test");
      artsySource.test();
    },
    back: function () {
      this.$router.push("/");
    },
    check: function () {
      console.log(this.$store.getters.currentToken);
    },
  },
};
</script>
