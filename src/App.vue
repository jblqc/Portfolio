<template>
  <div :class="backgroundClass">
    <img src="@/assets/images/header-gradient.svg" alt="Header Gradient" class="header-gradient" />
    <div class="content-container">
      <NavBar />
      <v-app :class="{ 'dark-mode': isDarkMode }">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </v-app>
      <Footer />
    </div>
    <svg id="texture">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
      </filter>
    </svg>
    <img src="@/assets/images/footer-gradient.svg" alt="Footer Gradient" class="footer-gradient" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useHomeStore } from "@/stores/useHomeStore";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

const homeStore = useHomeStore();
const isDarkMode = computed(() => homeStore.isDarkMode);
const backgroundClass = computed(() => 
  homeStore.isDarkMode ? 'noise-bg-dark' : 'noise-bg-light'
);

onMounted(() => {
  // Script loading remains the same
  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = () => callback();
    script.onerror = () => console.error(`Failed to load: ${src}`);
    document.head.appendChild(script);
  };

  loadScript("/speed-insight.js", () => console.log("Speed Insights loaded"));
  loadScript("/analytics.js", () => console.log("Analytics loaded"));
});
</script>
<style>
  /* Light Mode */
  .noise-bg-light {
    width: 100%;
    min-height: 100vh; /* ✅ Allow content to extend */
    overflow-y: auto; /* ✅ Enable scrolling */
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.382),
      rgb(255, 255, 255),
      rgba(255, 255, 255, 0.956)
    );
  }

  .v-timeline-divider__after {
    background-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }
  .dark-mode .v-timeline-divider__after {
    background-color: white !important;
  }
  /* Dark Mode */
  .noise-bg-dark {
    width: 100%;
    min-height: 100vh; /* ✅ Allow content to extend */
    overflow-y: auto; /* ✅ Enable scrolling */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.918), rgb(0, 0, 0));
  }
  /* Light Mode Noise */
  .noise-bg-light::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
    min-height: 100vh; /* Allow content to expand */
    overflow: auto; /* Allow scrolling */
    /* Load noise as a background */
    background: url("https://grainy-gradients.vercel.app/noise.svg"); /* External Noise */

    /* Blend the noise with the background */
    mix-blend-mode: multiply;

    /* Adjust contrast and brightness */
    filter: contrast(180%) brightness(120%);
    opacity: 0.2; /* Ensure visibility */
    z-index: -1;
  }

  /* Dark Mode Noise */
  .noise-bg-dark::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
    min-height: 100vh; /* Allow content to expand */
    overflow: auto; /* Allow scrolling */
    /* Load noise as a background */
    background: url("https://grainy-gradients.vercel.app/noise.svg"); /* External Noise */

    /* Darker noise effect */
    mix-blend-mode: screen;

    /* Adjust contrast and brightness */
    filter: contrast(250%) brightness(50%);
    opacity: 0.15; /* Adjust opacity for subtle effect */
    z-index: -1;
  }

  .header-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 700px; /* Adjust height */
    object-fit: cover;
    pointer-events: none;
  }
  .footer-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 700px; /* Adjust height */
    object-fit: cover;
    pointer-events: none;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizonta7y */
    display: block; /* ✅ Allow normal flow */

    max-width: 740px; /* Prevent it from stretching too much */
    margin: 0 auto; /* Center with left and right margin */
    min-height: 100vh; /* ✅ Ensure it can grow */
    margin-top: 160px;
    padding: 20px; /* Optional padding */
  }
  /* OVERRIDE */
  /* Remove all: unset and replace with specific overrides */
  .v-container {
    padding: 0px !important;
  }
</style>
