<template>
  <div class="gosh">
     
    <link rel="stylesheet" type="text/css" href="style.css">
    
    <v-container :key="image.url" v-for="(image, i) in images">

    <v-container v-if="i % 2 == 0" align = "right" class="images">
      <v-col>
      
        <v-row class="sub-image">      {{image.name}}  {{image.artist}}       

        
    
      <img :src="image.url" alt="artwork" align = "right" />
      
        </v-row>
      </v-col>
      
      
    </v-container>
    <v-container v-else class="images">
      <v-col>
          


        
        
        <img :src="image.url" alt="artwork" align = "left" class="images" @click="directImage"/>
        <v-row class="sub-image">  {{image.name}} {{image.artist}} 
        </v-row>
        
      </v-col>
    </v-container>
    </v-container>
  <div class = "profileBox">
    <h1>Lilla my</h1>
    

  </div>
    
  

    
  </div>
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
          artist: "artist1",
        },
        {
          url: "https://64.media.tumblr.com/82712c483134d2090dfae4908863ba31/d74b2709f78683cb-d5/s1280x1920/e3dfec4b8a0e039fd1fbc5fa55f6d3ce425f40b9.jpg",
          name: "Godzilla anatomic drawing",
          artist: "artist2",
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
.gosh {
  background: #F5F2F2;
}
.profileBox {
  align-items: right;
  display: flex;
}
.images {
    line-height: 300px;
}
.br {
            display: inline-block;
           
        }

.sub-images {
  line-height: auto;
  
}
img {
    display: block;
    width: auto;
    height: 250px;
    margin: 20px;
}
</style>
