<template>
  <div class="marquee-container">
    <!-- "Featured by" Title (Only appears on hover) -->
    <div class="marquee-title">Featured by</div>

    <!-- Logos Section (Blurs on Hover) -->
    <div
      class="marquee"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="marquee-inner">
        <div
          v-for="(tech, index) in repeatedTechnologies"
          :key="index"
          class="logo-wrapper"
        >
          <img
            :src="tech.logo"
            :alt="tech.name"
            class="logo"
            :class="{
              'tailwind-logo': tech.name === 'Tailwind',
              'pinia-logo': tech.name === 'Pinia',
              'figma-logo': tech.name === 'Figma',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const technologies = [
    {
      name: "Vue.js",
      logo: new URL("@/assets/images/vue.png", import.meta.url).href,
    },
    {
      name: "Laravel",
      logo: new URL("@/assets/images/laravel.png", import.meta.url).href,
    },
    {
      name: "Tailwind",
      logo: new URL("@/assets/images/tailwind.png", import.meta.url).href,
    },
    {
      name: "Figma",
      logo: new URL("@/assets/images/figma.png", import.meta.url).href,
    },
    {
      name: "GitHub",
      logo: new URL("@/assets/images/git.png", import.meta.url).href,
    },
    {
      name: "Adobe",
      logo: new URL("@/assets/images/adobe.png", import.meta.url).href,
    },
    {
      name: "MongoDB",
      logo: new URL("@/assets/images/mongodb.png", import.meta.url).href,
    },
    {
      name: "Pinia",
      logo: new URL("@/assets/images/pinia.png", import.meta.url).href,
    },
  ];

  // Repeat technologies multiple times for seamless looping
  const repeatedTechnologies = [
    ...technologies,
    ...technologies,
    ...technologies,
  ];

  const isHovered = ref(false); // Track hover state
</script>

<style scoped>
  /* 📌 MARQUEE CONTAINER */
  .marquee-container {
    position: relative;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* 📌 "Featured by" TITLE */
  .marquee-title {
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: rem;
    font-weight: bold;
    background: linear-gradient(90deg, #00c6ff, #0072ff); /* Gradient Color */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: 10;
    opacity: 0;
  }

  /* 📌 Show "Featured by" text only on hover */
  .marquee-container:hover .marquee-title {
    opacity: 1;
    transition: filter 0.3s ease-in-out;
  }

  /* 📌 MARQUEE (Logos Section) */
  .marquee {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 2rem;
    transition: filter 0.3s ease-in-out;
  }

  /* 📌 Blur Effect (STRONGER BLUR to match reference) */
  .marquee-container:hover .marquee {
    filter: blur(6px) brightness(0.9);
  }

  /* 📌 SCROLLING ANIMATION */
  .marquee-inner {
    display: flex;
    gap: 40px;
    width: max-content;
    animation: scroll 35s linear infinite;
  }

  /* 📌 LOGO STYLING */
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 80px;
    width: 80px;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.8;
    transition: opacity 0.3s ease-in-out;
  }

  /* Smaller Logo Fixes */
  .pinia-logo {
    height: 30px;
    width: auto;
  }
  .figma-logo {
    height: 18px;
  }
  .tailwind-logo {
    height: 50px;
    width: 90px;
  }

  /* Brighten logos slightly when hovered */
  .logo-wrapper:hover .logo {
    opacity: 1;
  }

  /* 📌 Smooth Scrolling Effect */
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
</style>
