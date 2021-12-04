<template>
  <div>
    <v-container>
      <v-row>
        <v-col align-self="start" class="pl-0">
          <v-btn class="ma-1">back to search results.</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="8" class="pl-0">
          <v-sheet color="grey lighten-3" min-height="70vh" rounded="lg">
            <h1 class="pa-3">{{ currentArtwork.artworkName }}</h1>
            <h2 class="pa-3 pt-0">{{ currentArtwork.artist }}</h2>
                        <v-img
                          class="pl-3 prtb-5"
                          :src="currentArtwork.image"
                          max-height="300"
                          max-width="1000"
                        ></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="4" class="pl-0">
          <v-sheet
            color="grey lighten-3"
            min-height="70vh"
            rounded="lg"
          ></v-sheet>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col>
          <v-sheet
            color="grey lighten-3"
            min-height="20vh"
            rounded="lg"
            class="pt-0"
          >
            <h3 class="pa-4">Similar works</h3>
            <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows
            >
              <v-slide-item v-for="n in 15" :key="n">
                <v-card class="ma-2" height="300" width="300">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  >
                    <v-card-title>Top 10 Australian beaches</v-card-title>
                  </v-img>

                  <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div>Whitehaven Beach</div>

                    <div>Whitsunday Island, Whitsunday Islands</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn color="orange" text> Share </v-btn>

                    <v-btn color="orange" text> Explore </v-btn>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet
            color="grey lighten-3"
            min-height="20vh"
            rounded="lg"
            class="pt-0"
          >
            <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows
            >
              <v-slide-item
                v-for="n in 15"
                :key="n"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : 'grey lighten-1'"
                  class="m-4"
                  height="200"
                  width="100"
                  @click="toggle"
                >
                  <v-row class="fill-height" align="center" justify="center">
                    <v-scale-transition>
                      <v-icon
                        v-if="active"
                        color="white"
                        size="48"
                        v-text="'mdi-close-circle-outline'"
                      ></v-icon>
                    </v-scale-transition>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet
            color="grey lighten-3"
            min-height="20vh"
            rounded="lg"
            class="mt-0"
          >
            <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows
            >
              <v-slide-item
                v-for="n in 15"
                :key="n"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : 'grey lighten-1'"
                  class="ma-4"
                  height="200"
                  width="100"
                  @click="toggle"
                >
                  <v-row class="fill-height" align="center" justify="center">
                    <v-scale-transition>
                      <v-icon
                        v-if="active"
                        color="white"
                        size="48"
                        v-text="'mdi-close-circle-outline'"
                      ></v-icon>
                    </v-scale-transition>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      currentArtwork: {
        image:
          "https://d32dm0rphc51dk.cloudfront.net/dTGcd0Xx0aEp_MDFdHIUIw/larger.jpg",
        artworkName: "Name of the artwork",
        artist: "Name of the artist",
        price: "Price",
        gallery: "Name of the gallery",
        galleryAddress: "Gallery address",
        dimensions: "",
      },
      similarWorks: [{}, {}],
      otherWorkFromArtist: [{}, {}],
      similarArtists: [{}, {}],
    };
  },
};
</script>
