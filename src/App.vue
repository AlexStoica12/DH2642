<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-alert
        v-if="$store.getters.getError"
        outlined
        type="warning"
        prominent
        border="left"
      >
        App does not work.
      </v-alert>
      <v-container v-else fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },

  data: () => ({
    //
  }),
  created: function () {
    console.log("I created the app. Getting a token!");
    this.$store.dispatch("login").catch((err) => console.log(err));
  },
};
</script>
