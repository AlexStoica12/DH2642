<template>
  <nav>
    <v-app-bar app class="rounded-xl px-5 mx-5 white">
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Art</span>
        <span>Point</span>
      </v-toolbar-title>
      <v-divider class="mx-4" vertical></v-divider>
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
      <v-spacer></v-spacer>
      <v-divider class="mx-4" vertical></v-divider>

      <v-toolbar-items>
        <v-btn
          plain
          @click="navigateTo('/')"
          class="white hidden-xs-only"
          style="width: 100px"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="grey--text hidden-sm-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <v-list-item> </v-list-item>
        <v-list-item-group>
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
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Explore", route: "/home" },
        { icon: "mdi-home", text: "My Gallery", route: "/profile" },
        // { icon: "mdi-account", text: "Sign In", route: "/signin" },
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
