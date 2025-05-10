<template>
  <div class="hero-section-wrapper">
    <Introduction />
    <CurrentProjects />
    <SayHi />
    <ProjectLogos />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Introduction from "@/components/HeroSection/Introduction.vue";
import CurrentProjects from "@/components/HeroSection/CurrentProjects.vue";
import SayHi from "@/components/HeroSection/SayHi.vue";
import ProjectLogos from "@/components/HeroSection/ProjectLogos.vue"; // Fixed path

const router = useRouter();

onMounted(() => {
  // This ensures the component properly mounts on initial load
  if (router.currentRoute.value.name === 'home') {
    console.log('HeroSection mounted as home route');
  }
});
</script>

<style scoped>
.hero-section-wrapper {
  width: 100%;
  overflow-x: hidden;
}
</style>