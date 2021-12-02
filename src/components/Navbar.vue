<template>
  <nav>
    <v-toolbar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Art</span>
        <span>Point</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item active-class="no-active">
            <h1 class="mb-5">Drawer</h1>
          </v-list-item>

          <v-list-item @click="navigateTo('/')">
            <v-list-item-icon>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('/home')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('/details')">
            <v-list-item-icon>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Details</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('/profile')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    navigateTo: function (route) {
      this.$router.push(route);
    },
  },
};
</script>

<style></style>
