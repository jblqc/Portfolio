<template>
  <div>
    <v-container class="custom-navbar">
      <v-toolbar-items class="d-flex">
        <router-link to="/">
          <img src="@/assets/images/jenny.svg" alt="Logo" class="w-28" />
        </router-link>

        <v-row class="mt-3">
          <div class="nav-links" v-show="!isMobile">
            <v-btn to="/work" class="nav-link" text>work</v-btn>
            <v-btn to="/about" class="nav-link" text>about</v-btn>
            <v-btn to="/journey" class="nav-link" text>journey</v-btn>
            <v-btn to="/contact" class="nav-link" text>contact</v-btn>
          </div>
          <v-spacer></v-spacer>
          <div class="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="21"
              height="21"
              viewBox="0 0 17 14"
            >
              <path
                d="M 4.773438 1 C 2.695313 1 1 2.695313 1 4.773438 L 1 10.230469 C 1 12.304688 2.695313 14 4.773438 14 L 10.230469 14 C 12.304688 14 14 12.304688 14 10.226563 L 14 4.773438 C 14 2.695313 12.304688 1 10.226563 1 Z M 4.773438 2 L 10.226563 2 C 11.765625 2 13 3.234375 13 4.773438 L 13 10.226563 C 13 11.765625 11.765625 13 10.230469 13 L 4.773438 13 C 3.234375 13 2 11.765625 2 10.230469 L 2 4.773438 C 2 3.234375 3.234375 2 4.773438 2 Z M 11.5 3 C 11.222656 3 11 3.222656 11 3.5 C 11 3.777344 11.222656 4 11.5 4 C 11.777344 4 12 3.777344 12 3.5 C 12 3.222656 11.777344 3 11.5 3 Z M 7.5 4 C 5.574219 4 4 5.574219 4 7.5 C 4 9.425781 5.574219 11 7.5 11 C 9.425781 11 11 9.425781 11 7.5 C 11 5.574219 9.425781 4 7.5 4 Z M 7.5 5 C 8.886719 5 10 6.113281 10 7.5 C 10 8.886719 8.886719 10 7.5 10 C 6.113281 10 5 8.886719 5 7.5 C 5 6.113281 6.113281 5 7.5 5 Z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 25 24"
              width="19"
              height="19"
              id="linkedin"
            >
              <path
                d="M3 6.002c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zM5.5 24.002h-5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5zm-4.5-1h4v-14H1v14zM23.5 24.002h-5a.5.5 0 0 1-.5-.5v-9c0-1.135-.473-1.987-1.299-2.336-.853-.362-1.894-.14-2.701.556v10.78a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .484.375c1.604-1.154 4.276-1.796 6.413-1.064 1.613.553 3.546 2.073 3.603 6.183v10.007a.5.5 0 0 1-.5.499zm-4.5-1h4v-9.5c-.038-2.785-1.051-4.601-2.927-5.243-2.33-.798-5.266.407-6.183 1.555a.501.501 0 0 1-.89-.312v-.5H9v14h4v-10.5a.5.5 0 0 1 .151-.358c1.118-1.086 2.667-1.436 3.939-.899 1.214.514 1.91 1.701 1.909 3.257v8.5z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#000"
              fill="none"
              width="21"
              height="21"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span class="decor">|</span>
            <v-btn
              icon
              @click="themeStore.toggleTheme()"
              class="mt-n15 ml-n3 mr-8"
            >
              <img
                :src="themeStore.isDarkMode ? moonIcon : sunIcon"
                alt="Theme Toggle"
                width="28"
                height="28"
              />
            </v-btn>
          </div>
          <div
            v-show="isMobile"
            class="menu-wrapper"
            @click="toggleMenu"
            :class="{ active: isMenuOpen }"
            role="button"
          >
            <div class="menu-bar one"></div>
            <div class="menu-bar two"></div>
          </div>
        </v-row>
      </v-toolbar-items>
    </v-container>

    <!-- Sidebar Navigation -->
    <div class="sidebar" :class="{ active: isMenuOpen }">
      <div @click="toggleMenu" class="menu-wrapper2" role="button">
        <div class="menu-bar2 one"></div>
        <div class="menu-bar2 two"></div>
      </div>
      <div class="sidebar-content">
        <ul class="nav-links">
          <li>
            <router-link to="/work" class="nav-link">work</router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-link">about</router-link>
          </li>
          <li>
            <router-link to="/journey" class="nav-link">journey</router-link>
          </li>
          <li>
            <router-link to="/contact" class="nav-link">contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import sunIcon from "@/assets/sun.svg";
  import moonIcon from "@/assets/moon.svg";
  import { useHomeStore } from "@/stores/useHomeStore";

  const themeStore = useHomeStore();
  const isMenuOpen = ref(false);
  const isMobile = ref(window.innerWidth <= 768);

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  // Function to check screen width
  const checkScreenWidth = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  // Attach event listener for screen resizing
  onMounted(() => {
    window.addEventListener("resize", checkScreenWidth);
  });

  // Cleanup event listener
  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenWidth);
  });
</script>

<style scoped>
  .custom-navbar {
    background: rgba(255, 255, 255, 0.359);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    height: 80px;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 710px;
    z-index: 50;
    box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.455),
      inset 0 -2px 6px rgba(255, 255, 255, 0.3);
  }

  .nav-link {
    font-size: 0.93rem;
    font-weight: 500;
    color: rgb(34, 36, 44);
    text-transform: none;
  }

  .nav-link:hover {
    color: rgb(0, 0, 0);
  }

  .menu-wrapper {
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: fixed; /* Ensure it stays fixed */
    top: 36px; /* Adjust as needed */
    right: 6px; /* Align to the right */
    z-index: 200; /* Higher than the sidebar */
  }
  .menu-wrapper2 {
    width: 40px;
    height: 30px;
    top: 39px; /* Adjust as needed */
    cursor: pointer;
    position: fixed; /* Ensure it stays fixed */
    right: 30px; /* Align to the right */
    z-index: 200; /* Higher than the sidebar */
  }
  .menu-bar {
    position: absolute;
    width: 60%;
    height: 1px;
    background: #000000;
    left: 0;
    transition: all 0.3s;
  }

  .menu-bar2 {
    position: absolute;
    width: 3%;
    height: 21px;
    background: #000000;
    right: 0;
    transition: all 0.3s;
  }

  .active .one2 {
    transform: rotate(45deg);
  }

  .active .two2 {
    transform: rotate(-45deg);
  }
  .one {
    top: 0;
  }

  .two {
    top: 8px;
  }

  .active .one {
    top: 50%;
    transform: rotate(45deg);
  }

  .active .two {
    top: 50%;
    transform: rotate(-45deg);
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    padding: 20px;
    backdrop-filter: blur(74px); /* Apply blur effect */
    transition: transform 0.3s ease;
    transform: translateX(100%);
    z-index: 100;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 60px;
    margin-right: 10px;
  }

  .close-btn {
    margin-top: 20px;
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .svg-container {
    margin-right: 5px;
    display: flex;
    gap: 20px; /* Adjust the gap size as needed */
  }
  @media (max-width: 768px) {
    .hamburger {
      display: flex; /* Show hamburger on
        mobile */
    }
    .custom-navbar {
      width: 95%; /* Adjust width for smaller screens */
      border-radius: 20px; /* Optional: Adjust border radius for mobile */
    }
    .v-toolbar-items {
      display: none; /* Hide the regular navbar items on mobile */
    }
    .nav-links {
      text-align: right;
      text-decoration: none;
      list-style-type: none;
    }
    .mobile-menu {
      display: flex; /* Show mobile menu when open */
    }
  }
</style>
