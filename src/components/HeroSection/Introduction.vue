<template>
  <v-container>
    <v-row>
      <v-col
        ><p class="custom-font flex mb-n4">
          Hi, I'm
          <img
            src="@/assets/images/jen.png"
            alt="Profile Picture"
            width="100"
            height="100"
            contain
            class="mb-n6 w-4 h-5"
          />Jennefer Lee,
          <!-- <span class="text-blue-500">Jennefer Lee,</span> -->
        </p>

        <p class="custom-font mt-4">
          a dreamer, coder & designer crafting digital
          <span class="font-weight-medium"> Magic</span>
        </p></v-col
      >
    </v-row>
    <v-row class="mt-2 mb-2">
      <v-col cols="auto" class="d-flex align-center">
        <a
          href="https://www.behance.net/jennferlee"
          target="_blank"
          class="d-flex align-center gap-2 link-style"
        >
          <img
            src="@/assets/behance.svg"
            alt="Behance"
            width="18"
            height="20"
            class="icon"
          />
          <span class="ml-1">Behance</span>
        </a>
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <a
          href="https://github.com/yourgithub"
          target="_blank"
          class="d-flex align-center gap-2 text-decoration-none link-style"
        >
          <img
            src="@/assets/github.svg"
            alt="GitHub"
            width="22"
            height="30"
            class="icon"
          />
          <span class="ml-1">Github</span>
        </a>
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <a
          href="https://www.instagram.com/yourinstagram"
          target="_blank"
          class="d-flex align-center gap-2 text-decoration-none link-style"
        >
          <img
            src="@/assets/instagram.svg"
            alt="Instagram"
            width="16"
            height="20"
            class="icon"
          />
          <span class="ml-1">Instagram</span>
        </a>
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <a
          href="https://www.linkedin.com/in/yourlinkedin"
          target="_blank"
          class="d-flex align-center gap-2 text-decoration-none link-style"
        >
          <img
            src="@/assets/linkedin.svg"
            alt="LinkedIn"
            width="18"
            height="20"
            class="icon"
          />
          <span class="ml-1">LinkedIn</span>
        </a>
      </v-col>
    </v-row>

    <p class="text-h6 text-inter font-weight-regular mt-4">
      A software engineer and digital artist , when I’m not coding, you’ll find
      me creating digital art—storytelling through illustrations or baking.
      Whether in tech, design, or the kitchen, every project is a chance to
      create, innovate, and bring ideas to life.
    </p>
    <v-row v-if="homeStore.jobStatus" style="color: #4a576f99">
      <v-col class="mt-5">
        <p class="text-h6 text-inter font-weight-medium">
          Currently working as {{ homeStore.position }} at<br />
          <a
            :href="homeStore.companyLink"
            target="_blank"
            class="gradient-text"
          >
            @{{ homeStore.company }}
          </a>
        </p>
      </v-col>
    </v-row>

    <TechLogos />
  </v-container>
</template>
<script setup>
  import { useHomeStore } from "@/stores/useHomeStore";
  import TechLogos from "./TechLogos.vue";

  const homeStore = useHomeStore();
</script>
<style scoped>
  @import url("https://db.onlinewebfonts.com/c/aad646fe2902d9b4927e14513160239e?family=Fraunces");

  .custom-font {
    font-family: "Fraunces", serif;
    font-optical-sizing: auto;
    font-size: 56px;
    letter-spacing: -2.2px; /* Reduce spacing between letters */
    font-stretch: 90%; /* Compress width of characters */
    font-weight: 300;
    color: var(--text-color);
    line-height: 50px;
  }
  .gradient-text {
    background: linear-gradient(90deg, #4a90e2, #f551a6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
  .link-style {
    font-size: 14px;
    font-weight: 600;
    color: #4a576f99;
    text-decoration: none;
  }
</style>
