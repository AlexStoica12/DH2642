<template>
  <nav>
    <v-app-bar app class="rounded-xl mx-5 white">
      <!-- Logo -->
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Art</span>
        <span>Point</span>
      </v-toolbar-title>
      <v-divider class="mx-4" vertical></v-divider>
      <!-- For bigger screens, Explore and My Gallery Tab -->
      <v-toolbar-items>
        <v-btn
          plain
          v-for="item in links"
          :key="item.title"
          :to="item.route"
          class="white hidden-xs-only"
          style="width: 125px"
        >
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>

      <!-- On Right Side, Profile Tab -->
      <v-spacer></v-spacer>
      <v-divider class="mx-4" vertical></v-divider>
      <v-toolbar-items>
        <v-btn
          plain
          @click="dialog = !dialog"
          class="white hidden-xs-only"
          style="width: 100px"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-toolbar-items>

      <!-- Logic for the drawer (only visible on xs screens) -->
      <v-btn icon class="hidden-sm-and-up mr-3" @click="dialog = !dialog">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        class="grey--text hidden-sm-and-up"
        @click="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Navigation Drawer for Small Small Screens -->
    <v-navigation-drawer v-model="drawer" app temporary right>
      <v-list nav dense>
        <v-list-item> </v-list-item>
        <v-list-item-group>
          <!-- Explore and My Gallery Tab-->
          <v-list-item
            v-for="link in links"
            :key="link.text"
            @click="navigateTo(link.route)"
          >
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <SignIn v-bind:dialog.sync="dialog" />
  </nav>
</template>

<script>
import SignIn from "../components/Signin.vue";
export default {
  name: "Navbar",
  components: { SignIn },
  data() {
    return {
      drawer: false,
      dialog: false,
      links: [
        { icon: "mdi-home", text: "Explore", route: "/home" },
        { icon: "mdi-home", text: "My Gallery", route: "/profile" },
        // { icon: "mdi-account", text: "Sign In", route: "/signin" },
      ],
    };
  },
  methods: {
    // Helper function for navigation
    navigateTo: function (route) {
      this.$router.push(route);
    },
    changeDialog: function (val) {
      this.dialog = val;
    },
  },
};
</script>
<style></style>
