<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <Text
        :text="'About'"
        variant="display-2"
        fontWeight="bold"
        :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
        class="tracking-wider custom-font"
      />
    </v-col>
  </v-row>
  <v-row class="footer-quote mt-10 mb-5">
    <span class="decor">❧</span>
    <span class="dot">ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐</span>
    <span class="decor">☙</span>
  </v-row>
  <v-row justify="center">
    <img src="@/assets/images/grad.jpg" alt="Loading..." class="grad-image" />
  </v-row>

  <v-row justify="center">
    <v-col cols="11" md="9" lg="8" class="text-left d-flex flex-column">
      <Text
        text="As a developer, I believe that learning never stops—and that should always reflect in the projects I build. Since graduating, I’ve continuously worked on different projects to expand my skills, constantly striving to improve and explore new technologies. Currently, I’m mastering Vue.js, focusing on state management, API integrations, and optimization techniques to build efficient and scalable applications. Beyond development, I have a deep appreciation for graphic design, often browsing platforms for inspiration and taking on digital art commissions."
        variant="subtitle-1"
        fontWeight="400"
        :color="'black'"
        class="description mb-4"
      />
      <Text
        text="CURRENT"
        variant="caption"
        fontWeight="600"
        :color="'gray'"
      /><Text
        text="I am currently working as a Front-End Engineer at Simplevia Technologies, where I collaborate daily with my team to complete tasks and achieve project goals. My role involves developing and optimizing web applications using Vue.js and Pinia, integrating APIs to ensure smooth data flow, and working closely with cross-functional teams to improve user experiences and solve technical challenges.
"
        variant="subtitle-1"
        fontWeight="400"
        :color="'black'"
        class="description mb-4"
      />
      <v-row class="mb-6">
        <img src="@/assets/images/bpi.jpeg" alt="Loading..." class="design2" />
      </v-row>
      <Text
        text="I graduated Magna Cum Laude from the Technological Institute of the Philippines and, along with my team, had the opportunity to present our project at an international conference (Springer 2024). We also showcased our work, NecessiPick, as a finalist at the BPI DOST Innovation Awards.
"
        variant="subtitle-1"
        fontWeight="400"
        :color="'black'"
        class="description mb-4"
      />
      <Text
        text="I’m always open to new opportunities—whether it's collaborating on exciting projects or simply exchanging ideas.
"
        variant="subtitle-1"
        fontWeight="400"
        :color="'black'"
        class="description"
      />
      <div class="mt-4" style="display: flex; align-items: center">
        <Text
          text="Let’s connect!"
          variant="subtitle-1"
          fontWeight="600"
          :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
        />
        <div
          class="go-button mt-1 ml-2 cursor"
          :class="{ 'go-button-black': isDarkMode }"
          @click="openInquiry"
          style="display: flex; align-items: center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="20"
            :fill="isDarkMode ? 'white' : 'black'"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </v-col>
  </v-row>
  <ImageGallery />
  <TechLogos />
</template>
<script setup>
  import { useHomeStore } from "@/stores/useHomeStore";
  import { useRouter } from "vue-router";
  import { computed } from "vue";

  import Text from "../Reusable/Text.vue";
  import ImageGallery from "../Reusable/ImageGallery.vue";
  import TechLogos from "../HeroSection/TechLogos.vue";
  const homeStore = useHomeStore();
  const router = useRouter(); // Initialize router
  const isDarkMode = computed(() => homeStore.isDarkMode);

  const openInquiry = () => {
    router.push("/inquiry"); // Navigate to /work
  };
</script>
<style scoped>
  .grad-image {
    max-width: 300px;
    height: auto;
    border-radius: 10px; /* Optional: Adds rounded corners */
  }
  .image {
    max-width: 450px;
    height: auto;
    border-radius: 10px;
  }
</style>
