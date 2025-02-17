<template>
  <div v-if="isDataLoaded">
    <!-- Simplified structure by removing redundant divs and ensuring proper Vue component usage -->
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <div
          class="project-logo-container"
          :class="{ 'dark-mode-card': isDarkMode }"
        >
          <img
            crossOrigin="anonymous"
            ref="projectImage"
            :src="project.image"
            :alt="project.title"
            class="project-logo"
            @load="extractShadowColor"
            :style="{ boxShadow: `0px 10px 30px ${imageShadowColor}` }"
          />
        </div>
        <Text
          :text="project.title"
          variant="display-2"
          fontWeight="bold"
          :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
          class="tracking-wider project-title"
        />
        <Text
          :text="project.caption"
          variant="subtitle-1"
          fontWeight="600"
          :color="'gray'"
          class="project-caption"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8">
        <Text
          :text="projectDetails.longDescription1"
          variant="caption"
          fontWeight="500"
          :color="'gray'"
          class="description"
        />
        <Text
          :text="projectDetails.longDescription2"
          variant="caption"
          fontWeight="500"
          :color="'gray'"
          class="description"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8" class="details-card">
        <div
          class="detail"
          v-for="detail in projectDetailsArray"
          :key="detail.label"
        >
          <span class="label">{{ detail.label }}:</span>
          <Text
            :text="detail.text"
            variant="caption"
            fontWeight="600"
            :color="'black'"
          />
        </div>
      </v-col>
    </v-row>

    <div v-if="cleanProjectLinks.length > 0">
      <div v-for="(linkObj, index) in cleanProjectLinks" :key="index">
        <Text
          :text="linkObj.text"
          variant="caption"
          fontWeight="600"
          :color="'black'"
        />
        <div class="go-button" @click="openLink(linkObj.url)">
          <!-- SVG code omitted for brevity -->
        </div>
      </div>
    </div>

    <FlickingCarousel
      :images="images"
      :options="{ align: 'center', circular: true, passive: true }"
    >
      <template v-slot:default="{ image }">
        <div v-for="(image, index) in images" :key="index" class="panel">
          <img :src="image" alt="Carousel Image" class="carousel-image" />
        </div>
      </template>
    </FlickingCarousel>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
  import { computed, ref, onMounted, watch } from "vue";
  import { useRoute } from "vue-router";
  import { useWorkStore } from "@/stores/useWorkStore";
  import { useHomeStore } from "@/stores/useHomeStore";

  import Text from "../Reusable/Text.vue";
  import ColorThief from "colorthief";
  import FlickingCarousel from "../Reusable/Carousel.vue";

  const route = useRoute();
  const workStore = useWorkStore();
  const projectImage = ref(null);
  const homeStore = useHomeStore();

  const imageShadowColor = ref("rgba(0, 0, 0, 0.15)"); // Default shadow
  const currentProjectID = computed(() => parseInt(route.params.id));
  const images = ref([]);
  const isDataLoaded = ref(false);
  const isDarkMode = computed(() => homeStore.isDarkMode);

  const project = computed(() =>
    workStore.projects.find((p) => p.id === parseInt(route.params.id))
  );

  // Fetch project details from workSpecific
  const projectDetails = computed(() =>
    workStore.workSpecific.find((w) => w.project_id === project.value?.id)
  );
  const projectDetailsArray = computed(() => [
    { label: "Type", text: projectDetails.value?.type },
    { label: "Role", text: projectDetails.value?.role },
    { label: "Timeline", text: projectDetails.value?.timeline },
  ]);

  // Extract dominant color from the image and set it as shadow color
  const extractShadowColor = () => {
    const img = projectImage.value;
    if (!img) return;

    const colorThief = new ColorThief();

    if (img.complete && img.naturalHeight !== 0) {
      try {
        const palette = colorThief.getPalette(img, 8); // Get 8 most dominant colors

        if (palette && Array.isArray(palette) && palette.length > 0) {
          // Find the brightest color
          const brightestColor = palette.reduce(
            (brightest, color) => {
              const brightness =
                0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
              return brightness > brightest.brightness
                ? { color, brightness }
                : brightest;
            },
            { color: [0, 0, 0], brightness: 0 }
          ).color;

          imageShadowColor.value = `rgba(${brightestColor[0]}, ${brightestColor[1]}, ${brightestColor[2]}, 0.5)`;
        } else {
          console.warn("No valid color extracted, using fallback.");
          imageShadowColor.value = "rgba(255, 255, 255, 0.5)"; // Fallback to white shadow
        }
      } catch (error) {
        console.error("Error extracting color:", error);
        imageShadowColor.value = "rgba(255, 255, 255, 0.5)";
      }
    } else {
      img.crossOrigin = "Anonymous"; // Prevent CORS issues

      img.onload = () => {
        try {
          const palette = colorThief.getPalette(img, 8);
          if (palette && Array.isArray(palette) && palette.length > 0) {
            const brightestColor = palette.reduce(
              (brightest, color) => {
                const brightness =
                  0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
                return brightness > brightest.brightness
                  ? { color, brightness }
                  : brightest;
              },
              { color: [0, 0, 0], brightness: 0 }
            ).color;

            imageShadowColor.value = `rgba(${brightestColor[0]}, ${brightestColor[1]}, ${brightestColor[2]}, 0.5)`;
          } else {
            console.warn("No valid color extracted, using fallback.");
            imageShadowColor.value = "rgba(255, 255, 255, 0.5)";
          }
        } catch (error) {
          console.error("Error extracting color:", error);
          imageShadowColor.value = "rgba(255, 255, 255, 0.5)";
        }
      };

      img.onerror = () => {
        console.error("Image failed to load or cross-origin issue.");
        imageShadowColor.value = "rgba(255, 255, 255, 0.5)";
      };
    }
  };
  const projectLinkTexts = {
    1: ["Springer - Our Published Paper", "NecessiPick - Compare Products"],
    2: ["Custom Link 1 for Project 2", "Custom Link 2 for Project 2"],
  };

  const cleanProjectLinks = computed(() => {
    if (!project.value?.link) return [];
    const links = project.value.link.replace(/[()]/g, "").split(",");
    return links.map((link, index) => ({
      url: link.trim(),
      text: projectLinkTexts[project.value.id][index] || link.trim(),
    }));
  });
  const openLink = (url) => window.open(url, "_blank");
  const exclusionList = [
    "nes1.png",
    "nes2.png",
    "nes3.png",
    "np3.png",
    "np4.png",
  ];
  watch(currentProjectID, (newProjectID) => {
    const projectImages = workStore.projectImages[newProjectID];
    if (projectImages && projectImages.length > 0) {
      // Flatten the array of arrays and filter out excluded images
      images.value = projectImages.flat().filter((imageUrl) => {
        const imageName = imageUrl.split("/").pop(); // Extracts the filename from the URL
        return !exclusionList.includes(imageName);
      });
      if (images.value.length === 0) {
        console.warn("No images found for project ID", newProjectID);
      }
    } else {
      console.warn("No images found for project ID", newProjectID);
      images.value = [];
    }
  }); // Watch for changes in isDataLoaded
  watch(isDataLoaded, (newValue) => {
    if (newValue === true) {
      extractShadowColor(); // Call the function when data is loaded
    }
  });
  onMounted(async () => {
    await workStore.fetchAllData();
    const initialImages = workStore.projectImages[currentProjectID.value];

    if (initialImages && initialImages.length > 0) {
      // Flatten the array of arrays and filter out excluded images
      images.value = initialImages.flat().filter((imageUrl) => {
        const imageName = imageUrl.split("/").pop(); // Extracts the filename from the URL
        return !exclusionList.includes(imageName);
      });

      // Log the final fetched images after filtering
      console.log(
        "Fetched and filtered images for project ID",
        currentProjectID.value,
        images.value
      );
    } else {
      console.warn(
        "No initial images found for project ID",
        currentProjectID.value
      );
    }
    isDataLoaded.value = true; // Set the loading state to true after data is fetched
  });
</script>

<style scoped>
  .work-details {
    padding: 20px;
  }

  .project-logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 15px;
    /* background-color: #ffff; */
  }

  .project-logo {
    max-width: 120px;
    border-radius: 18px;
    transition: all 0.3s ease-in-out;
  }
  .project-title {
    font-size: 36px;
    font-weight: bold;
  }

  .project-caption {
    font-size: 18px;
    font-weight: 500;
    color: gray;
  }

  .details-card {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .detail {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .label {
    font-weight: bold;
    margin-right: 8px;
  }
</style>
