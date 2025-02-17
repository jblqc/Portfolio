<template>
  <v-footer class="footer">
    <v-container class="text-center">
      <!-- Copyright & Name -->

      <Text
        text=" @2025,  ✦ jennefer lee "
        variant="subtitle-1"
        fontWeight="500"
        :color="'gray'"
      />
      <!-- Navigation Links -->
      <div class="footer-links">
        <a
          v-for="(link, index) in links"
          :key="index"
          href="#"
          class="footer-link"
        >
          {{ link }}
        </a>
      </div>

      <!-- Quote with Decorative Lines -->
      <div class="footer-quote">
        <span class="decor">❧</span>
        <span>dream big, work hard, stay focused</span>
        <span class="decor">☙</span>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
  import { ref } from "vue";
  import Text from "./Reusable/Text.vue";

  // Footer links
  const links = ref([
    "links",
    "works",
    "stories",
    "tech stack",
    "version",
    "connect",
  ]);
</script>

<style scoped>
  /* Footer Container */
  .footer {
    padding-top: 30px;
    color: rgba(90, 90, 90, 0.8);
    text-align: center;
    bottom: 1rem;
    transform: translateY(50%);
  }

  /* Footer Links */
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .footer-link {
    text-decoration: none;
    color: #787a7d7c;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
  }

  .footer-link:hover {
    color: rgba(90, 90, 90, 1);
  }

  /* Footer Quote */
</style>
