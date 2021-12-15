<template>
  <v-row justify="center">
    <v-dialog v-model="signinDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h1 class="text-h5">Sign In</h1>
          <v-spacer></v-spacer>
          <v-btn large icon v-on:click="closeDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="emailForm">
                  <v-text-field
                    label="Email*"
                    required
                    v-model="email"
                    :rules="[rules.empty, rules.email]"
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="12">
                <v-form ref="passwordForm">
                  <v-text-field
                    label="Password*"
                    required
                    v-model="password"
                    type="password"
                    :rules="[rules.empty, rules.password]"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
          <p>*indicates required field</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-3" text @click="signin()"> Sign in </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import firebaseModel from "../js/firebaseModel.js";
export default {
  name: "Signin",
  props: ["signinDialog"],
  data() {
    return {
      email: "",
      password: "",
      mode: "sign-in",
      rules: {
        empty: (v) => !!v || "Required.",
        email: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
        password: (v) => v.length >= 6 || "Minimum length is 6 letters",
      },
    };
  },
  computed: {
    isValidated: function () {
      const emailFormValid = this.$refs.emailForm.validate();
      const passwordFormValid = this.$refs.passwordForm.validate();
      return emailFormValid && passwordFormValid;
    },
  },
  methods: {
    signin() {
      if (this.isValidated) {
        // Sign Into Firebase
        firebaseModel
          .signInAction({
            email: this.email,
            password: this.password,
          })
          .then(this.closeDialog(false));
      }
    },
    closeDialog: function () {
      this.clearForm();
      this.$emit("update:signinDialog", false);
    },
    clearForm: function () {
      this.email = "";
      this.password = "";
      this.$refs.emailForm.resetValidation();
      this.$refs.passwordForm.resetValidation();
    },
  },
};
</script>

<style scoped></style>
