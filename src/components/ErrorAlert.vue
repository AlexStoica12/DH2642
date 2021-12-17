<template>
  <!-- Error Alert if problems with Sign in or Sign up
Accepts the error message as a prop -->
  <v-alert
    v-if="error !== ''"
    outlined
    dense
    prominent
    type="error"
    class="mx-2 text-caption text-center"
  >
    {{ error }}
  </v-alert>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style></style>
