<template>
  <nav>
    <v-app-bar app class="rounded-xl mx-5 my-2 white">
      <!-- Logo -->
      <v-toolbar-title class="text-uppercase" @click="navigateTo('/home')">
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

      <!-- On Right Side, Sign In and Sign Up Button -->
      <v-spacer></v-spacer>
      <v-divider class="mx-4" vertical></v-divider>
      <v-toolbar-items v-if="!isUserLoggedIn">
        <v-btn
          plain
          @click="signinDialog = !signinDialog"
          class="white hidden-xs-only"
          style="width: 100px"
        >
          Sign In
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="!isUserLoggedIn">
        <v-btn
          plain
          @click="signupDialog = !signupDialog"
          class="white hidden-xs-only"
          style="width: 100px"
        >
          Sign Up
        </v-btn>
      </v-toolbar-items>

      <!-- Account Logout Large Screens Only -->
      <v-btn
        v-if="isUserLoggedIn"
        plain
        @click="signOut()"
        class="hidden-xs-only mr-3"
      >
        Logout
      </v-btn>
      <!-- Drawer (only visible on xs screens) -->
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
          <!-- Sign in -->
          <v-list-item
            v-if="!isUserLoggedIn"
            @click="signinDialog = !signinDialog"
          >
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign in</v-list-item-title>
          </v-list-item>
          <!-- Sign Up -->
          <v-list-item
            v-if="!isUserLoggedIn"
            @click="signupDialog = !signupDialog"
          >
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
          <!-- Logout -->
          <v-list-item v-if="isUserLoggedIn" @click="signOut()">
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <SignIn v-bind:signinDialog.sync="signinDialog" />
    <Signup v-bind:signupDialog.sync="signupDialog" />
  </nav>
</template>

<script>
import firebaseModel from "../js/firebaseModel.js";
import SignIn from "../components/Signin.vue";
import Signup from "../components/Signup.vue";
export default {
  name: "Navbar",
  components: { SignIn, Signup },
  computed: {
    isUserLoggedIn: function () {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  data() {
    return {
      drawer: false,
      signinDialog: false,
      signupDialog: false,
      links: [
        { icon: "mdi-home", text: "Explore", route: "/home" },
        { icon: "mdi-home", text: "My Gallery", route: "/profile" },
      ],
    };
  },
  methods: {
    // Helper function for navigation
    navigateTo: function (route) {
      if (this.$route.path !== route) this.$router.push(route);
    },
    signOut: function () {
      firebaseModel.signOutAction().then(() => {
        this.drawer = false;
      });
    },
  },
};
</script>
<style></style>
