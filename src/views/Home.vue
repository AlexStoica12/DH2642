<template>
  <v-btn color="success" @click="test">text</v-btn>
</template>

<script>
import artsySource from "../js/artsySource.js";

export default {
  name: "Home",
  components: {},
  methods: {
    test: function () {
      console.log("Entering Test");
      artsySource.test();
    },
  },
};
</script>
