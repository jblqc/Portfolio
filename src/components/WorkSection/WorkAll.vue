<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <Text
        :text="'Works'"
        variant="display-2"
        fontWeight="bold"
        :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
        class="tracking-wider custom-font"
      />
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col cols="11" md="9" lg="7" class="text-center">
      <Text
        :text="'It has been an absolute pleasure to put my heart and soul into these projects. While you\'re here, browse these projects.'"
        variant="title"
        fontWeight="400"
        :color="'black'"
      />
    </v-col>
  </v-row>
  <v-row class="footer-quote mt-10">
    <span class="decor">❧</span>
    <span class="dot">ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐</span>
    <span class="decor">☙</span>
  </v-row>
  <!-- Category Tabs -->
  <v-row class="mt-10">
    <v-col cols="12" class="text-center">
      <div class="category-toggle">
        <div class="tab-slider" :style="sliderStyle"></div>

        <button
          v-for="(category, index) in workStore.categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          class="category-tab"
          v-html="category.name"
          :class="{ 'active-tab': selectedCategory === category.id }"
        ></button>
      </div>
    </v-col>
  </v-row>

  <!-- Projects Grid -->
  <div class="projects-grid mt-10">
    <div
      v-for="project in filteredProjects"
      :key="project.id"
      class="project-card relative group"
      :class="{ 'dark-mode-card': isDarkMode }"
      @click="navigateToProject(project.id)"
    >
      <div class="project-content">
        <div class="project-logo">
          <img
            :src="project.image"
            :alt="project.title"
            class="logo-img"
            :class="{
              'logo-img-kimchi': project.id === 6,
              'logo-img-cat': project.id === 4,
              'logo-img-fade': project.id === 13,
              'logo-img-f4s': project.id === 10,
              'logo-img-black': project.id === 6,
            }"
          />
        </div>
        <div class="mt-9 d-flex flex-column align-center text-center">
          <Text
            :text="project.title"
            variant="subtitle-1"
            fontWeight="700"
            :color="'black'"
          />
          <Text
            :text="project.caption"
            variant="caption"
            fontWeight="500"
            :color="'gray'"
          />
        </div>
      </div>

      <!-- Hover Effect: Blur + Details -->
      <div class="hover-overlay">
        <div class="hover-content">
          <Text
            :text="project.title"
            variant="subtitle-1"
            fontWeight="700"
            :color="'black'"
          />
          <Text
            :text="project.description"
            variant="caption"
            fontWeight="500"
            :color="'gray'"
          />
          <Text
            :text="project.caption"
            variant="overline"
            fontWeight="500"
            :color="'gray'"
            class="mt-2"
          />

          <div
            class="go-button"
            :class="{ 'go-button-black': isDarkMode }"
            @click="navigateToProject(project.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              :fill="isDarkMode ? 'white' : 'black'"
              width="20"
            >
              <path
                fill-rule="evenodd"
                d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useHomeStore } from "@/stores/useHomeStore";
  import { useWorkStore } from "@/stores/useWorkStore";
  import Text from "../Reusable/Text.vue";

  const router = useRouter();
  const homeStore = useHomeStore();
  const workStore = useWorkStore();

  // Selected category (default to "All" with id 0)
  const selectedCategory = ref(0);

  // Computed property for filtered projects
  const filteredProjects = computed(() => {
    const getYear = (timeline) => {
      const match = timeline?.match(/\d{4}/); // Extract first 4-digit year
      return match ? parseInt(match[0]) : 0; // Convert to number
    };

    // Map projects with their timeline from workSpecific
    const projectsWithTimeline = workStore.projects.map((project) => {
      const workDetail = workStore.workSpecific.find(
        (work) => work.project_id === project.id
      );
      return {
        ...project,
        timeline: workDetail ? workDetail.timeline : "0000", // Default if missing
      };
    });

    // Sort projects by extracted year (latest first)
    const sortedProjects = projectsWithTimeline.sort(
      (a, b) => getYear(b.timeline) - getYear(a.timeline)
    );

    return selectedCategory.value === 0
      ? sortedProjects
      : sortedProjects.filter(
          (project) => project.category_id === selectedCategory.value
        );
  });

  // Sliding tab indicator
  const sliderStyle = computed(() => ({
    transform: `translateX(${selectedCategory.value * 100}%)`,
  }));
  const navigateToProject = (projectId) => {
    router.push(`/work/${projectId}`);
  };
  const isDarkMode = computed(() => homeStore.isDarkMode);
</script>

<style scoped>
  /* Category Tabs */
  .category-toggle {
    background: #e7e5e5;
    border-radius: 20px;
    display: inline-flex;
    height: 35px;
    position: relative;
    overflow: hidden;
    width: fit-content;
    padding-bottom: 3px;
  }

  /* Sliding Effect */
  .tab-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 33.33%; /* Adjust for tab width */
    height: 100%;
    background: linear-gradient(90deg, #5b7fff, #f44f8a, #ff6a00);
    border-radius: 18px;
    transition: transform 0.3s ease-in-out;
  }

  /* Tab Buttons */
  .category-tab {
    font-size: 12px;
    font-weight: 600;
    color: gray;
    border-radius: 18px;
    padding: 2px 27px;
    flex: 1;
    position: relative;
    z-index: 2;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Active Tab */
  .active-tab {
    color: white !important;
    font-weight: bold;
  } /* Section Background */

  /* Decorative Divider */
  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: black;
  }
</style>
