<template>
  <div>
    <v-btn color="success" @click="check">Did I really log in?</v-btn>
  </div>
</template>

<script>
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
  },
};
</script>

<style></style>
