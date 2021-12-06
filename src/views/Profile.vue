<template>
  <div class="gosh">
     
    <link rel="stylesheet" type="text/css" href="style.css">
    
    <div :key="image.url" v-for="(image, i) in images">

    <div v-if="i % 2 == 0" align = "right" class="cunt">
      <div>
        <span class="booo">      {{image.name}}  {{image.artist}}       

        
    
      <img :src="image.url" alt="artwork" align = "right" />
      
        </span>
      </div>
      
    </div>
    <div v-else class="cunt">
        <span class="booo">  {{image.name}} {{image.artist}}   


        
        
        <img :src="image.url" alt="artwork" align = "left" class="cunt"/>
        </span>
        
        <br/>
    </div>
    </div>
  <div class = "profileBox">
    <h1>Lilla my</h1>
    <img src="https://64.media.tumblr.com/93b723fdf0714f69af6694af3ab60ca2/5d0f364a2c95b0e0-39/s500x750/5d5e81c9ad4ac6b5317d22195f9e3d3b63e243de.jpg" alt="profile pic"/>

  </div>
    
  

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          url: "https://64.media.tumblr.com/14709159e19643734eaa79f7ff8ac06d/f317c58810f9ebc3-f8/s500x750/f4ce4c174c19f8dfaf5dbaefab512e1d9fe77c7b.jpg",
          name: "Watercolor",
          artist: "your mom",
        },
        {
          url: "https://64.media.tumblr.com/82712c483134d2090dfae4908863ba31/d74b2709f78683cb-d5/s1280x1920/e3dfec4b8a0e039fd1fbc5fa55f6d3ce425f40b9.jpg",
          name: "Godzilla anatomic drawing",
          artist: "my mom",
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
.cunt {
    line-height: 300px;
}
.br {
            display: inline-block;
           
        }

.booo {
  line-height: auto;
  
}
img {
    display: block;
    width: auto;
    height: 250px;
    margin: 20px;
}
</style>
