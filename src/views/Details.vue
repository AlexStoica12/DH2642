<template>
  <div>
    <v-container>
      <v-row>
        <v-col align-self="start">
          <v-btn class="ma-1">back to search results.</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="8">
          <v-sheet color="white" min-height="70vh" rounded="lg">
            <h1 class="pa-3">{{ currentArtwork.artworkName }}</h1>
            <h2 class="pa-3 pt-0">{{ currentArtwork.artist }}</h2>
            <v-img
              contain
              class="pa-10"
              max-height="55vh"
              :src="currentArtwork.image"
              position="center center"
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="4" class="pl-0">
          <v-sheet color="white" min-height="70vh" rounded="lg">
            <div class="pt-16">
              <h1 class="pl-4 pt-10">Dimensions</h1>
              <h2 class="pl-4">{{ currentArtwork.dimensions }}</h2>
            </div>
            <div>
              <h1 class="pl-4 pt-5">Price</h1>
              <h2 class="pl-4">{{ currentArtwork.price }}</h2>
            </div>
            <div>
              <h1 class="pl-4 pt-5">Gallery</h1>
              <h2 class="pl-4">{{ currentArtwork.gallery }}</h2>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              block
              color="black"
              class="pa-4 mt-16 white--text"
              rounded
              elevation="2"
              x-large
              @click="snackbarAddToGallery = true"
            >
              Add to My Gallery
            </v-btn>
            <v-snackbar
              v-model="snackbarAddToGallery"
              :timeout="timeoutSnackbarAddToGallery"
            >
              Artwork added to My Gallery
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbarAddToGallery = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col>
          <v-sheet color="white" min-height="20vh" rounded="lg" class="pt-0">
            <h3 class="pa-4">Similar works</h3>
            <v-slide-group show-arrows>
              <v-slide-item v-for="n in similarWorks" :key="n.title">
                <v-card
                  class="ma-2 mb-5 d-flex flex-column"
                  height="325"
                  width="300"
                  hover
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="n.thumbnail"
                  >
                  </v-img>
                  <v-card-text class="pb-0">
                    <div style="width: 200px">
                      <p class="overflow-x-auto font-weight-medium">
                        {{ n.title }}
                      </p>
                    </div>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn
                      color="orange"
                      text
                      @click="snackbarAddToGallery = true"
                    >
                      Add to My Gallery
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col>
          <v-sheet color="white" min-height="20vh" rounded="lg" class="pt-0">
            <h3 class="pa-4">Similar works</h3>
            <v-slide-group show-arrows>
              <v-slide-item v-for="n in similarWorks" :key="n.title">
                <v-card
                  class="ma-2 mb-5 d-flex flex-column"
                  height="325"
                  width="300"
                  hover
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="n.thumbnail"
                  >
                  </v-img>
                  <v-card-text class="pb-0">
                    <div style="width: 200px">
                      <p class="overflow-x-auto font-weight-medium">
                        {{ n.title }}
                      </p>
                    </div>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn
                      color="orange"
                      text
                      @click="snackbarAddToGallery = true"
                    >
                      Add to My Gallery
                    </v-btn>
                  </v-card-actions>
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
  methods: {
    addArtworkToGallery: function () {},
  },
  data() {
    return {
      snackbarAddToGallery: false,
      timeoutSnackbarAddToGallery: 2000,
      currentArtwork: {
        image:
          "https://d32dm0rphc51dk.cloudfront.net/dTGcd0Xx0aEp_MDFdHIUIw/larger.jpg",
        artworkName: "The Old Violin",
        artist: "William Michael Harnett",
        price: "Price",
        gallery: "Name of the gallery",
        galleryAddress: "National Gallery of Art, Washington D.C.",
        dimensions: "96.5 × 60 cm",
      },
      similarWorks: [
        {
          title: "Green River Cliffs, Wyoming",
          thumbnail:
            "https://d32dm0rphc51dk.cloudfront.net/ajqWTqyPas0pM7BosKMgUA/medium.jpg",
        },
        {
          title: "U.S. Thread Company Mills, Willimantic, Connecticut",
          thumbnail:
            "https://d32dm0rphc51dk.cloudfront.net/67ssKdY1utPgRnTky40Q9Q/medium.jpg",
        },
        {
          title: "View of the Tiber near Perugia",
          thumbnail:
            "https://d32dm0rphc51dk.cloudfront.net/_E0H6k-BlFE81xPuMiNjyg/medium.jpg",
        },
        {
          title: "Breakfast",
          thumbnail:
            "https://d32dm0rphc51dk.cloudfront.net/MoR7cUheG5Iv4cM1HeR3CQ/medium.jpg",
        },
        {
          title: "Cattleya Orchid and Three Hummingbirds",
          thumbnail:
            "https://d32dm0rphc51dk.cloudfront.net/sRcWwNuubf6I6XKZeAVLuA/medium.jpg",
        },
      ],
      otherWorkFromArtist: [{}, {}],
      similarArtists: [{}, {}],
    };
  },
};
</script>
