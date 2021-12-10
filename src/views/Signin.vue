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
                  required
                  v-model="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Last name*"
                  required
                  v-model="lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <p>*indicates required field</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Continue As Guest </v-btn>
          <v-btn v-if="mode === 'sign-in'" text @click="dialog = false">
            Login
          </v-btn>
          <v-btn v-if="mode === 'sign-up'" text @click="dialog = false">
            Sign Up
          </v-btn>
        </v-card-actions>
        <v-col class="d-flex align-end flex-column">
          <v-btn v-if="mode === 'sign-up'" text @click="dialog = false"
            >Already have an account?</v-btn
          >
          <v-btn v-if="mode === 'sign-in'" text @click="dialog = false"
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
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dialog: true,
      mode: "sign-in",
    };
  },
  computed: {},
  methods: {
    signin() {
      this.$store
        .dispatch("signInAction", {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$store.dispatch("loadUserData"));
    },
    addToDatabase() {
      this.$store.dispatch("saveUserData");
    },
    getDatabase() {
      this.$store.dispatch("loadUserData");
    },
  },
};
</script>

<style scoped></style>
