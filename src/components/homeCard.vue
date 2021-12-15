<template>
    <v-card
        class="pa-2 flex-column"
        outlined
        tile
        @click="navigateTo()"
    >
        <v-img 
          height="300px" 
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          :src="imageURL">
            <span
              class="text-md-subtitle-2 white--text pl-1 pt-4 d-inline-block"
              v-text="artworkTitle"
            ></span>
        </v-img>
        <v-card-actions class="white justify-center">
            <v-col class="text-center">
              <span
                class="text-md-subtitle-2 black--text pl-4 pt-4 d-inline-block"
                v-text="artworkGallery"
              ></span>
            </v-col>
        </v-card-actions>
    </v-card>    
</template>

<script>
export default {
    name:"HomeCard",
    props: ["imageURL","artworkTitle","artworkGallery"],
    emits: [
        "navigateToEvent"
    ],
    data: function (){
        return {};
    },
    methods: {
        navigateTo: function () {
            this.$emit("navigateToEvent");
        },
    },
};
</script>
