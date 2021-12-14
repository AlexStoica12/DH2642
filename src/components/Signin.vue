<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h1 v-if="mode === 'sign-up'" class="text-h5">Sign Up</h1>
          <h1 v-if="mode === 'sign-in'" class="text-h5">Sign In</h1>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="First name*"
                  v-model="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Last name*"
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text v-on:click="closeDialog(false)">
            Continue As Guest
          </v-btn>
          <v-btn v-if="mode === 'sign-in'" text @click="signin()">
            Login
          </v-btn>
          <v-btn v-if="mode === 'sign-up'" text @click="signup()">
            Sign Up
          </v-btn>
        </v-card-actions>
        <v-col class="d-flex align-end flex-column">
          <v-btn v-if="mode === 'sign-up'" text @click="mode = 'sign-in'"
            >Already have an account?</v-btn
          >
          <v-btn v-if="mode === 'sign-in'" text @click="mode = 'sign-up'"
            >Don't have an account?</v-btn
          >
        </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "Signin",
  props: ["dialog"],
  data() {
    return {
      firstName: "",
      lastName: "",
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
        this.$store
          .dispatch("signInAction", {
            email: this.email,
            password: this.password,
          })
          .then(() => this.$store.dispatch("loadUserData"))
          .then(this.closeDialog(false));
      }
    },
    signup() {
      if (this.isValidated) {
        this.$store
          .dispatch("signUpAction", {
            email: this.email,
            password: this.password,
          })
          .then(this.closeDialog(false));
      }
    },
    closeDialog: function () {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

<style scoped></style>
