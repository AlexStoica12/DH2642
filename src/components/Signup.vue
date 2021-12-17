<template>
  <!-- Sign Up Dialog to allow the user to sign up
    First Name and Last Name is optional
    Email: Required, Must be valid format
    Password: Required, Must be valid format
 -->
  <v-row justify="center">
    <v-dialog v-model="signupDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h1 class="text-h5">Sign Up</h1>
          <v-spacer></v-spacer>
          <v-btn large icon v-on:click="closeDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="First name"
                  v-model="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Last name"
                  v-model="lastName"
                ></v-text-field>
              </v-col>
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
        <!-- Error Message -->
        <ErrorAlert :error="error" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-3" text @click="signup()"> Sign Up </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import firebaseModel from "../js/firebaseModel.js";
import ErrorAlert from "./ErrorAlert.vue";

export default {
  name: "Signup",
  props: ["signupDialog"],
  components: { ErrorAlert },

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
      // Rules for textform
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
    // Checks email and password to see if a rule is broken
    // Both must pass in order to submit the form
    isValidated: function () {
      const emailFormValid = this.$refs.emailForm.validate();
      const passwordFormValid = this.$refs.passwordForm.validate();
      return emailFormValid && passwordFormValid;
    },
  },
  methods: {
    signup() {
      // Rules passed

      if (this.isValidated) {
        // Sign Up to Firebase
        firebaseModel
          .signUpAction({
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.closeDialog();
          })
          // If error occurs, show ErrorAlert
          .catch((err) => {
            this.error = err;
          });
      }
    },
    // On close dialog, close form and emit up to close the signinDialog

    closeDialog: function () {
      this.clearForm();
      this.$emit("update:signupDialog", false);
    },
    // Clears validation errors and text
    clearForm: function () {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.error = "";
      this.$refs.emailForm.resetValidation();
      this.$refs.passwordForm.resetValidation();
    },
  },
};
</script>

<style scoped></style>
