<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container fluid>
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
