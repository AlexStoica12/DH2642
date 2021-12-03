<template>
  <v-container class="fill-height pa-0 ma-0" fluid>
    <v-row class="fill-height wrap">
      <!-- Left Side -->
      <v-col id="left" cols="12" md="5" class="rounded-xl">
        <h3 class="my-10 mx-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          totam quisquam nam ea velit consectetur ipsum fugiat cum illo hic
          laboriosam quasi molestias id sequi inventore sed aliquid magnam
          cumque.
        </h3>
      </v-col>
      <!-- Right Side -->
      <v-col id="right" cols="12" md="7" align="center">
        <v-row align="center" justify="center" class="mx-8 mx-md-16">
          <v-col class="px-16">
            <!-- Title -->
            <h1 class="my-5">Sign In</h1>
            <!-- Username Text Field -->
            <v-text-field
              v-model="username"
              solo
              label="Username..."
              clearable
            ></v-text-field>
            <!-- Password Text Field -->
            <v-text-field
              v-model="password"
              solo
              label="Password..."
              clearable
            ></v-text-field>
            <!-- Buttons -->
            <v-btn block> Sign In </v-btn>
            <p>Already have an account?</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style scoped>
#left {
  background: url("../assets/green-leaf.jpg");
  background-position: left;
  background-size: cover;
}
</style>
