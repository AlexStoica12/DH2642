<template>
  <v-container class="background">
     
    
    
    <v-container :key="image.url" v-for="(image, i) in images">

    <!-- <v-container v-if="i % 2 == 0" align = "right" class="images"> -->
      <v-col  v-if="i % 2 == 0" class="images" align="right">
      
        <!-- <v-row class="sub-image">      {{image.name}}  {{image.artist}}        -->

        
    
      <v-img :src="image.url" width="750px" contain="true"/>
      <v-spacer></v-spacer>
      
            <span
              class="text-md-subtitle-2 black--text pl-4 pt-4 d-inline-block"
              v-text="image.name + ', ' + image.artist"
            ></span>
            <v-divider></v-divider>

          <!-- </v-img> -->
          
      
        <!-- </v-row> -->
      </v-col>
      
      
    <!-- </v-container> -->
    <!-- <v-container v-else class="images"> -->
      <v-col v-else class="images" >
          


        
        
        <!-- <img :src="image.url" alt="artwork" align = "left" class="images" @click="directImage"/> -->
        <v-img   :src="image.url" width="500px" contain="true">
          </v-img>
          
            <span
              class="text-md-subtitle-2 black--text pl-0 pt-4 d-inline-block"
              v-text="image.name + ', ' + image.artist"
            ></span>
            <v-divider></v-divider>
          
        <!-- <v-row class="sub-image">  {{image.name}} {{image.artist}} 
        </v-row> -->
        
      </v-col>
    <!-- </v-container> -->
    </v-container>
  
    


    
  

    
  </v-container>
</template>

<script>
export default {
  methods: {
    directImage() {
        //redirect to detailspage
  }
},

  data() {
    return {
      images: [
        {
          url: "https://64.media.tumblr.com/14709159e19643734eaa79f7ff8ac06d/f317c58810f9ebc3-f8/s500x750/f4ce4c174c19f8dfaf5dbaefab512e1d9fe77c7b.jpg",
          name: "Watercolor",
          artist: "Bellicio Gambari",
        },
        {
          url: "https://64.media.tumblr.com/27b6c18f4a8e04839708bc73ee5acc7f/67b7cb7a80422330-e1/s500x750/6662562dda7bc96774e1d11d2c19d26b16ef56fe.jpg",
          name: "Godzilla anatomic drawing",
          artist: "Harakuro Mitni",
        },
        {
          url: "https://64.media.tumblr.com/72d06e38a80b674619ed921f185cfbc4/6777aebfef58aa8e-3d/s500x750/5ea3ca6fe1dd8026a6fdd7af1935bb0e4dede37b.png",
          name: "Revenge Cagn",
          artist: "Lady Skollie"
        },
      ],
    };
  },
};
</script>


<style scoped>
.background {
  background: #F5F2F2;
}

/* .images {
    line-height: 300px;
} */
.br {
            display: inline-block;
           
        }

.sub-images {
  line-height: auto;
  
}

</style>
