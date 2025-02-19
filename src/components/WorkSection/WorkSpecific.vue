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
          class="fraunces"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-right" cols="">
        <Text text="───────── ౨" variant="subtitle-1" :color="'gray'" />
      </v-col>
      <v-col class="text-center" cols="4">
        <Text
          :text="project.caption"
          variant="subtitle-1"
          fontWeight="600"
          :color="'black'"
        />
      </v-col>
      <v-col class="text-left" cols="">
        <Text text="ৎ ─────────" variant="subtitle-1" :color="'gray'" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <Text
          :text="projectDetails.long_description1"
          variant="subtitle-1"
          fontWeight="500"
          :color="'black'"
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
          <Text
            :text="detail.label"
            variant="caption"
            fontWeight="600"
            :color="'gray'"
            class="detail-label"
          />
          <Text
            :text="detail.text"
            variant="caption"
            fontWeight="600"
            :color="'black'"
            class="detail-text"
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
    <v-row style="justify-content: space-evenly">
      <div class="image-row">
        <div
          v-for="(imageUrl, index) in designOneImages"
          :key="index"
          class="design1"
        >
          <PictureCard :image="imageUrl" />
        </div>
      </div>
    </v-row>
    <v-row style="justify-content: space-evenly">
      <div class="">
        <div
          v-for="(imageUrl, index) in designTwoImages"
          :key="index"
          class="design2"
        >
          <PictureCard :image="imageUrl" />
        </div>
      </div>
    </v-row>

    <FlickingCarousel :images="images">
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
  import sizeOf from "image-size"; // Import the image-size library

  import Text from "../Reusable/Text.vue";
  import ColorThief from "colorthief";
  import FlickingCarousel from "../Reusable/Carousel.vue";
  import PictureCard from "../Reusable/PictureCard.vue";
  const route = useRoute();
  const workStore = useWorkStore();
  const projectImage = ref(null);
  const homeStore = useHomeStore();

  const imageShadowColor = ref("rgba(0, 0, 0, 0.15)"); // Default shadow
  const currentProjectID = computed(() => parseInt(route.params.id));
  const images = ref([]);
  const excludedImages = ref([]);
  const designOneImages = ref([]);
  const designTwoImages = ref([]);
  const isDataLoaded = ref(false);
  const isDarkMode = computed(() => homeStore.isDarkMode);
  const openLink = (url) => window.open(url, "_blank");
  const exclusionList = [
    "nes1.png",
    "nes2.png",
    "nes3.png",
    "np3.png",
    "np4.png",
  ];

  const project = computed(() =>
    workStore.projects.find((p) => p.id === parseInt(route.params.id))
  );

  // Fetch project details from workSpecific
  const projectDetails = computed(() =>
    workStore.workSpecific.find((w) => w.project_id === project.value?.id)
  );
  const projectDetailsArray = computed(() => [
    { label: "TYPE", text: projectDetails.value?.type },
    { label: "ROLE", text: projectDetails.value?.role },
    { label: "TIMELINE", text: projectDetails.value?.timeline },
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
    const initialImages = workStore.projectImages[parseInt(route.params.id)];

    if (initialImages && initialImages.length > 0) {
      const flattenedImages = initialImages.flat();

      // Filter out excluded images for images.value
      images.value = flattenedImages.filter((imageUrl) => {
        const imageName = imageUrl.split("/").pop(); // Extracts the filename from the URL
        return !exclusionList.includes(imageName);
      });

      // Load images and get their intrinsic dimensions for sorting
      const imagePromises = images.value.map((imageUrl) => {
        return new Promise((resolve) => {
          fetch(imageUrl)
            .then((response) => response.arrayBuffer()) // Get the response as an ArrayBuffer
            .then((buffer) => {
              const dimensions = sizeOf(new Uint8Array(buffer)); // Use Uint8Array for image-size
              console.log(
                `Loaded image: ${imageUrl}, Width: ${dimensions.width}, Height: ${dimensions.height}`
              ); // Log dimensions
              resolve({
                url: imageUrl,
                width: dimensions.width,
                height: dimensions.height,
              });
            })
            .catch((error) => {
              console.error(`Error loading image: ${imageUrl}`, error);
              resolve({ url: imageUrl, width: 0, height: 0 }); // Handle error case
            });
        });
      });

      const loadedImages = await Promise.all(imagePromises);

      // Sort main images into design categories based on maximum dimensions
      loadedImages.forEach(({ url, width, height }) => {
        if (width <= 1000 && height <= 600) {
          designOneImages.value.push(url); // Design 1
        }
      });

      // Now handle excluded images based on the exclusionList
      const excludedImagePromises = flattenedImages.map((imageUrl) => {
        const imageName = imageUrl.split("/").pop(); // Extracts the filename from the URL
        if (exclusionList.includes(imageName)) {
          return new Promise((resolve) => {
            fetch(imageUrl)
              .then((response) => response.arrayBuffer()) // Get the response as an ArrayBuffer
              .then((buffer) => {
                const dimensions = sizeOf(new Uint8Array(buffer)); // Use Uint8Array for image-size
                console.log(
                  `Loaded excluded image: ${imageUrl}, Width: ${dimensions.width}, Height: ${dimensions.height}`
                ); // Log dimensions
                resolve({
                  url: imageUrl,
                  width: dimensions.width,
                  height: dimensions.height,
                });
              })
              .catch((error) => {
                console.error(
                  `Error loading excluded image: ${imageUrl}`,
                  error
                );
                resolve({ url: imageUrl, width: 0, height: 0 }); // Handle error case
              });
          });
        } else {
          return Promise.resolve(null); // Not in exclusion list
        }
      });

      const excludedLoadedImages = await Promise.all(excludedImagePromises);

      // Sort excluded images into design categories based on their dimensions
      excludedLoadedImages.forEach((image) => {
        if (image) {
          const { url, width, height } = image; // Destructure only if image is valid
          if (height > 430 && width > 855) {
            designTwoImages.value.push(url); // Design 2
          } else {
            designOneImages.value.push(url); // Optionally categorize excluded images into Design 1 if needed
          }
          excludedImages.value.push(url); // Add to excluded images
        }
      });

      // Log the final fetched images after sorting
      console.log("Design 1 Images:", designOneImages.value);
      console.log("Design 2 Images:", designTwoImages.value);
      console.log("Excluded Images:", excludedImages.value);
    } else {
      console.warn(
        "No initial images found for project ID",
        parseInt(route.params.id)
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
  .image-row {
    display: flex;
    flex-wrap: wrap;
    width: 75%;
    gap: 60px; /* Adjust spacing as needed */
  }

  .design1 img,
  .design2 img {
    width: 100%; /* Make the image take the full width of the container */
    height: auto; /* Maintain aspect ratio */
    object-fit: cover;
  }
  .design1 {
    box-shadow: 6px 6px 12px -6px rgb(0, 0, 0, 0.1),
      24px 24px 30px -6px rgb(0, 0, 0, 0.2);
    width: 55%; /* Set the width of the container */
    height: 500px; /* Set a fixed height or use a percentage */
    overflow: hidden; /* Hide any overflow */
    position: relative;
    border-radius: 20px;
    flex: 1;
  }

  .design2 {
    box-shadow: 6px 6px 12px -6px rgb(0, 0, 0, 0.1),
      24px 24px 30px -6px rgb(0, 0, 0, 0.2);
    width: 100%; /* Set the width of the container */
    height: 30%; /* Set a fixed height or use a percentage */
    overflow: hidden; /* Hide any overflow */
    position: relative;
    border-radius: 20px;
    flex: 1;
    margin-top: 5%;
  }
  .project-logo {
    max-width: 120px;
    border-radius: 18px;
    transition: all 0.3s ease-in-out;
    background-color: #fff;
  }
  .project-title {
    font-family: "Fraunces", serif;
    font-size: 50px;
    font-weight: 300;
    line-height: 50px;
  }

  .project-caption {
    font-size: 18px;
    font-weight: 500;
    color: gray;
  }

  .details-card {
    background: linear-gradient(
      90deg,
      rgba(255, 233, 244, 0.4) 0%,
      rgba(234, 243, 255, 0.7) 100%
    );
    padding: 20px;
    border-radius: 10px;
  }

  .detail {
    font-size: 16px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column; /* Ensures label is always above text */
    gap: 4px;
  }

  .label {
    font-weight: bold;
    margin-right: 8px;
  }
</style>
