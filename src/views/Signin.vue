<template>
  <v-container class="fill-height pa-0 ma-0">
    <v-row class="fill-height wrap">
      <v-col id="left" cols="12" md="6" class="rounded-xl">
        <h3 class="my-10 mx-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          totam quisquam nam ea velit consectetur ipsum fugiat cum illo hic
          laboriosam quasi molestias id sequi inventore sed aliquid magnam
          cumque.
        </h3>
      </v-col>
      <v-col id="right" cols="12" md="6">
        <p>Right Column</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signin",
};
</script>

<style scoped>
#left {
  background: url("../assets/green-leaf.jpg");
  background-size: cover;
}
</style>
