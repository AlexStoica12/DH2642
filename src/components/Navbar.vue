<template>
  <nav>
    <v-app-bar app flat>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Art</span>
        <span>Point</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item> </v-list-item>
        <v-list-item-group>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            @click="navigateTo(link.route)"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
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
      links: [
        { icon: "mdi-login-variant", text: "Sign In", route: "/" },
        { icon: "mdi-home", text: "Home", route: "/home" },
        { icon: "mdi-account-details", text: "Details", route: "/details" },
        { icon: "mdi-account", text: "Profile", route: "/profile" },
      ],
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
