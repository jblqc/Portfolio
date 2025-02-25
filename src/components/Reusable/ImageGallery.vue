<template>
    <v-container class="photo-album">
      <h1><span>Journey</span></h1>
      
      <a
        v-for="(photo, index) in photos"
        :key="index"
        :href="photo.link"
        class="polaroid"
        :class="photo.size"
        :style="isMobile ? mobileStyles[index] : photo.position"
      >
        <img :src="photo.image" :alt="photo.alt" />
        {{ photo.description }}
      </a>
    </v-container>
  </template>
  
  <script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
  // Import local images
  import gallery1 from "@/assets/images/gallery1.jpeg";
  import gallery2 from "@/assets/images/gallery2.jpeg";
  import gallery3 from "@/assets/images/gallery3.jpeg";
  import gallery4 from "@/assets/images/gallery4.jpeg";
  import gallery5 from "@/assets/images/gallery5.jpeg";
  import gallery6 from "@/assets/images/gallery6.jpeg";
  import gallery7 from "@/assets/images/gallery7.jpeg";
  import gallery8 from "@/assets/images/gallery8.jpeg";
  const photos = ref([
    {
      link: "#",
      image: gallery1,
      alt: "Gallery Image 1",
      description: "8th International Conferenceon Inventive Communication and Computational Technologies (ICICCT - 2024)",
      size: "medium-long",
      position: { top: "10px", left: "-100px", transform: "rotate(-10deg)" },
    },
    {
      link: "#",
      image: gallery2,
      alt: "Gallery Image 2",
      description: "Science and Technology Fair 2024",
      size: "medium",
      position: { top: "80px", left: "100px", transform: "rotate(5deg)" },
    },{
      link: "#",
      image: gallery7,
      alt: "Gallery Image 7",
      description: "NecessiPick Presentation for the Interdepartmental in TIP",
      size: "medium",
      position: { top: "-80px", left: "250px", transform: "rotate(10deg)" },
    },
    {
      link: "#",
      image: gallery3,
      alt: "Gallery Image 3",
      description: "System Presentation",
      size: "small",
      position: { top: "150px", left: "300px", transform: "rotate(-7deg)" },
    },
    {
      link: "#",
      image: gallery4,
      alt: "Gallery Image 4",
      description: "BPI DOST Award Finalist and Presentor",
      size: "large",
      position: { top: "50px", left: "400px", transform: "rotate(8deg)" },
    },
    {
      link: "#",
      image: gallery5,
      alt: "Gallery Image 5",
      description: "System Presentation for NecessiPick",
      size: "medium",
      position: { top: "200px", left: "500px", transform: "rotate(-5deg)" },
    },
    {
      link: "#",
      image: gallery6,
      alt: "Gallery Image 6",
      description: "TIP Sikat Award",
      size: "medium",
      position: { top: "240px", left: "10px", transform: "rotate(-22deg)" },
    },{
      link: "#",
      image: gallery8,
      alt: "Gallery Image 8",
      description: "System demonstration for the students of TIP",
      size: "small",
      position: { top: "310px", left: "350px", transform: "rotate(10deg)" },
    },
  ]);// Mobile-friendly styles (images will be stacked)
const mobileStyles = ref([
  { top: "-20px", left: "-10%", transform: "rotate(0deg)" },
  { top: "10px", left: "35%", transform: "rotate(10deg)" },
  { top: "140px", left: "-10%", transform: "rotate(0deg)" },
  { top: "120px", left: "25%", transform: "rotate(0deg)" },
  { top: "220px", left: "30%", transform: "rotate(-10deg)" },
  { top: "320px", left: "-10%", transform: "rotate(0deg)" },
  { top: "360px", left: "40%", transform: "rotate(0deg)" },
  { top: "420px", left: "30%", transform: "rotate(13deg)" },
]);

// Detect screen size
const isMobile = ref(window.innerWidth <= 768);

const updateScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
  </script>
  
  <style scoped>
  /* Center the album */
  .photo-album {
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-width: 500px;
    height: 500px;
    margin-top: 5em;
    min-width: 500px;margin-left: -10px;
  }
  
  /* Title styling */
  .photo-album h1 {
    position: absolute;
    z-index: 5;
    top: 20px;
    text-align: center;
    width: 100%;
    line-height: 1.9;margin-left: 80px;margin-top: 40px;
  }
  @media (max-width: 768px) {
    .photo-album h1 {
    z-index: 5;
    top: -40px;
    width: 50%;
    line-height: 1.9;;margin-right:;
  }
}
  .photo-album h1 span {
    background-color: rgba(255, 255, 255, 0.811);
    padding: 10px;
    color:#fff4f4;
    font-family: "Fraunces", serif;
    border-radius: 10px; /* Rounded pill shape */
    background: linear-gradient(
      135deg,
      rgba(255, 100, 100, 0.648),
      rgba(255, 200, 150, 0.2)
    );
    backdrop-filter: blur(10px); /* Glass effect */
    box-shadow: 0px 4px 10px rgba(255, 100, 100, 0.3),
      0px -4px 10px rgba(255, 255, 255, 0.2);
  }
  
  /* Polaroid Styling */
  a.polaroid {
    position: absolute;
    display: block;
    text-decoration: none;
    color: #333;
    padding: 10px 10px 20px 10px;
    border: 1px solid #bfbfbf;
    border-radius: 10px; /* Rounded pill shape */
    background: linear-gradient(
      135deg,
      rgb(255, 255, 255),
      rgba(164, 173, 255, 0.746)
    );
    backdrop-filter: blur(10px); /* Glass effect */
    box-shadow: 0px 4px 10px rgba(27, 40, 82, 0.276),
      0px -4px 10px rgba(255, 255, 255, 0.2);    z-index: 2;
    font-size: 0.7em;
    transition: transform 0.3s ease-in-out;
  }
  
  a.polaroid:hover {
    z-index: 5;
    transform: scale(1.1) rotate(0deg);
  }
  
  /* Image Sizes */
  a.polaroid img {
    margin: 0 0 15px;
    display: block;
  }
  
  a.small {
    width: 95px;
    padding: 6px 6px 12px 6px;
    font-size: 0.6em;
  }
  
  a.small img {
    width: 95px;
    height: 75px;
  }
  
  a.medium {
    width: 230px;
    padding: 13px 13px 26px 13px;
    font-size: 0.8em;
  }
  
  a.medium img {
    width: 230px;
    height: 200px;
  }  
  a.medium-long  {
    width: 340px;
  }
  a.medium-long img {
    width: 340px;
    height: 170px;
  }
  
  a.large {
    width: 250px;
    padding: 20px 20px 30px 20px;
    font-size: 1em;
  }
  
  a.large img {
    width: 250px;
    height: 230px;
  }
  </style>
  