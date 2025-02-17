<template>
  <div>
    <!-- Navbar at the very top -->
    <v-container class="custom-navbar">
      <v-toolbar-items class="d-flex">
        <router-link to="/">
          <img src="@/assets/images/jenny.svg" alt="Logo" class="w-28" />
        </router-link>

        <v-row class="mt-n10">
          <v-btn to="/work" class="nav-link" text>work</v-btn>
          <v-btn to="/about" class="nav-link" text>about</v-btn>
          <v-btn to="/contact" class="nav-link" text>journey</v-btn>
          <v-btn to="/contact" class="nav-link" text>contact</v-btn>

          <v-spacer></v-spacer>
          <!-- Dark Mode Toggle -->
          <v-btn icon @click="themeStore.toggleTheme()"
            >|
            <img
              :src="themeStore.isDarkMode ? moonIcon : sunIcon"
              alt="Theme Toggle"
              width="28"
              height="28"
              class="mr-8"
            />
          </v-btn>
        </v-row>
      </v-toolbar-items>
    </v-container>

    <!-- Page content will be rendered here -->
    <slot />
  </div>
</template>

<script setup>
  import sunIcon from "@/assets/sun.svg";
  import moonIcon from "@/assets/moon.svg";
  import { useHomeStore } from "@/stores/useHomeStore";

  const themeStore = useHomeStore();
</script>

<style scoped>
  /* Custom Styling for the Navbar */
  .custom-navbar {
    background: rgba(255, 255, 255, 0.359);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    height: 80px; /* Fixed Height */
    min-height: 80px;
    max-height: 80px;
    position: absolute; /* ✅ Fixed at the top but DOES NOT scroll */
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 710px;
    z-index: 50;
    box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.455),
      inset 0 -2px 6px rgba(255, 255, 255, 0.3);
  }

  /* Navigation Links */
  .nav-link {
    font-size: 0.93rem;
    font-weight: 500;
    color: rgb(34, 36, 44);
    text-transform: none;
  }
  .nav-link:hover {
    color: rgb(0, 0, 0);
  }
</style>
