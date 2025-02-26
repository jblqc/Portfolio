<template>
  <div v-if="isDataLoaded">
    <v-row justify="center" class="mb-5">
      <v-row justify="center">
        <v-col cols="7">
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <div
                class="project-logo-container"
                
              >
                <img
                  crossOrigin="anonymous"
                  ref="projectImage"
                  :src="project.image"
                  :alt="project.title"
                  class="project-logo"
                  :class="{
                    'project-logo2': project.id === 13,
                  }"
                  @load="extractShadowColor"
                  :style="{ boxShadow: `0px 10px 30px ${imageShadowColor}` }"
                />
              </div>

              <Text
                :text="project.title"
                variant="display-2"
                fontWeight="500"
                class="fraunces"
              />
            </v-col>
          </v-row>

          <v-row class="mb-n2">
            <v-col class="text-right d-none d-md-flex">
              <Text text="───────── ౨" variant="subtitle-1" :color="'gray'" />
            </v-col>
            <v-col class="text-center">
              <Text
                :text="project.caption"
                variant="subtitle-1"
                fontWeight="700"
                :color="'black'"
              />
            </v-col>
            <v-col class="text-left d-none d-md-flex">
              <Text text="ৎ ─────────" variant="subtitle-1" :color="'gray'" />
            </v-col>
          </v-row>
          <v-row class="justify-center"> <BackButton @click="goBack" /> </v-row>

          <v-row class="justify-center">
            <v-col cols="12" class="">
              <Text
                :text="projectDetails.long_description1"
                variant="subtitle-1"
                fontWeight="400"
                :color="'black'"
                class="description"
              />
              <Text
                :text="projectDetails.long_description2"
                variant="subtitle-1"
                fontWeight="400"
                :color="'black'"
                class="description"
              />
              <v-container class="details-card mt-3 mb-3"
              :class="{ 'details-card-black': isDarkMode }">
                <v-row no-gutters>
                  <v-col
                    v-for="(detail, index) in projectDetailsArray"
                    :key="index"
                    cols="4"
                    class="text-center"
                  >
                    <div class="detail">
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
              </v-container>
              <Text
                v-if="cleanProjectLinks.length > 0"
                text="LINKS"
                variant="caption"
                fontWeight="600"
                :color="'gray'"
                class="ml-3"
              />
              <div v-if="cleanProjectLinks.length > 0" class="mt-3">
                <v-col
                  v-for="(linkObj, index) in cleanProjectLinks"
                  :key="index"
                >
                  <div class="mt-n4" style="display: flex; align-items: center">
                    <Text
                      :text="linkObj.text"
                      variant="subtitle-1"
                      fontWeight="600"
                      :color="'black'"
                    />
                    <div
                    class="go-button mt-1 ml-2"
              :class="{ 'go-button-black': isDarkMode }"                      @click="openLink(linkObj.url)"
                      style="display: flex; align-items: center"
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
                </v-col>
              </div>
              <v-row
                class="mt-5"
                v-if="project.title === 'F4S: Fingerprint for Success'"
              >
                <img
                  src="@/assets/images/project-specific-image/f4s1.png"
                  alt="Project GIF"
                  class="styled-image2"
                />
              </v-row>
            </v-col>
          </v-row> </v-col
      ></v-row>

      <v-row
        justify="center"
        class="mt-5"
        v-if="project.id === 1 || project.id === 11"
      >
        <Text text="Watch the Video" variant="h5" fontWeight="600" />

        <v-col cols="12" class="text-center">
          <iframe
            width="560"
            height="315"
            :src="
              project.id === 1
                ? 'https://drive.google.com/file/d/10t7K4qqqmtNaUIH439ZJW35s2tDcK9s1/preview'
                : 'https://www.youtube.com/embed/4wkGtHNvngI'
            "
            frameborder="0"
            allowfullscreen
            class="design3"
          ></iframe>
        </v-col>
      </v-row>
      <v-row v-if="designOneImages.length > 0" justify="center ">
        <v-col cols="12">
          <v-row justify="center" class="design-row">
            <v-col
              v-for="(imageUrl, index) in designOneImages"
              :key="index"
              cols="5"
              class="d-flex justify-center design1"
            >
              <PictureCard :image="imageUrl" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="project.title === 'Good Food'">
        <img
          src="@/assets/images/project-specific-image/goodfoodbg.svg"
          alt="Loading..."
          class="my-n2"
        />
      </v-row>
      <v-row
        style="justify-content: space-evenly"
        v-if="designTwoImages.length > 0"
      >
        <div>
          <div
            v-for="(imageUrl, index) in designTwoImages"
            :key="index"
            class="design2"
            :class="{
              'dark-mode-card': isDarkMode,
              'no-box-shadow': project.id === 9,
            }"
          >
            <PictureCard :image="imageUrl" />
          </div>
        </div>
      </v-row>
    </v-row>

    <FlickingCarousel :images="images">
      <template v-slot:default="{ image }">
        <div v-for="(image, index) in images" :key="index" class="panel">
          <img :src="image" alt="Carousel Image" class="carousel-image" />
        </div>
      </template>
    </FlickingCarousel>
    <v-row class="mt-5" v-if="project.title === 'NecessiPick'">
      <img
        src="@/assets/images/project-specific-image/nes.png"
        alt="Project GIF"
        width="1100"
        height="285"
        class="styled-image"
      />
    </v-row>
  </div>
  <v-row justify="center" v-else>
    <img src="@/assets/images/loader.gif" alt="Loading..." class="loader-gif" />
  </v-row>
</template>

<script setup>
  import { computed, ref, onMounted, watch ,onUnmounted, nextTick} from "vue";
  import { useRoute } from "vue-router";
  import { useWorkStore } from "@/stores/useWorkStore";
  import { useHomeStore } from "@/stores/useHomeStore";
  import { useRouter } from "vue-router";
  import BackButton from "../Reusable/BackButton.vue";
  import sizeOf from "image-size"; 

  import Text from "../Reusable/Text.vue";
  import ColorThief from "colorthief";
  import FlickingCarousel from "../Reusable/Carousel.vue";
  import PictureCard from "../Reusable/PictureCard.vue";
  const route = useRoute();
  const workStore = useWorkStore();
  const projectImage = ref(null);
  const homeStore = useHomeStore();
  const router = useRouter(); // Initialize router
  const imageShadowColor = ref("rgba(0, 0, 0, 0.15)"); // Default shadow
  const currentProjectID = computed(() => parseInt(route.params.id));
  const images = ref([]);
  const excludedImages = ref([]);
  const designOneImages = ref([]);
  const designTwoImages = ref([]);
  const isDataLoaded = ref(false);
  const isDarkMode = computed(() => homeStore.isDarkMode);
  const openLink = (url) => window.open(url, "_blank");
  const projectLinkTexts = {
    1: ["Springer - Our Published Paper", "NecessiPick - Compare Products"],
    2: ["Custom Link 1 for Project 2", "Custom Link 2 for Project 2"],
    5: ["Good Food - Create your own Recipe"],
    6: ["Promotional Post - View the Template"],
    11: [
      "MakaTurismo - View the City of Makati",
      "Makati LGU kicks off 'Visit a Better Makati' tourism campaign",
    ],
    14: ["Love Laguna - View the City of Laguna"],
    2: ["Vincafe - A modern take on branding"],
    3: ["NEON - All about Modernity", " View the Concept"],
    4: [" View on Behance"],
    9: [" View on Behance"],
    10: [" View on Behance"],
    13: [" View on Behance"],
  };

  const exclusionList = [
    "cjp1.png",
    "cjp2.png",
    "cjp3.png",
    "cjp5.png",

    "nes1.png",
    "nes2.png",
    "nes3.png",
    "np3.png",
    "ll1.png",
    "ll10.png",
    "ll9.png",
    "ll5.png",
    "ll6.png",
    "ll7.png",
    "ll8.png",
    "np3.png",
    "gf1.png",
    "gf2.png",
    "gf7.png",
    "gf5.png",
    "gf6.png",
    "np3.png",
    "np4.png",
    "sp1.png",
    "sp2.png",
    "sp3.png",
    "mak1.png",
    "mak2.png",
    "mak6.png",
    "mak9.png",
    "mak7.png",
    "mak8.png",
    "mak10.png",
    "mak11.png",
    "fid1.png",
    "e1.png",
    "e4.png",
    "e6.png",
    "sm1.png",
    "sm2.png",
    "fl1.png",
    "fl2.png",
    "neon1.png",
    "neon2.png",
    "neon3.png",
    "neon4.png",
    "neon5.png",
    "mabuhay1.png",
    "mabuhay2.png",
    "mabuhay4.png",
    "mabuhay3.png",
    "mabuhay8.png",
  ];

  const project = computed(() =>
    workStore.projects.find((p) => p.id === parseInt(route.params.id))
  );
  const goBack = () => {
    router.push("/work"); // Navigate to /work
  };
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

  // ... existing code ...
  const cleanProjectLinks = computed(() => {
    if (!project.value?.link) return [];
    const links = project.value.link.replace(/[()]/g, "").split(",");

    // Ensure the project ID is valid and exists in projectLinkTexts
    const projectId = project.value.id;
    const projectTexts = projectLinkTexts[projectId] || []; // Default to empty array if ID not found

    return links.map((link, index) => ({
      url: link.trim(),
      text: projectTexts[index] || link.trim(), // Use the corresponding text or fallback to the link
    }));
  });
  // ... existing code ...
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
  watch(() => route.params.id, (newId) => {
  console.log("Project changed:", newId);
});
  onUnmounted(() => {
  nextTick(() => {
    console.log("WorkSpecific.vue unmounted safely");
  });
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
    padding: 25px;
    /* background-color: #ffff; */
  }
  .project-logo {
    border-radius: 15px;
    transition: all 0.3s ease-in-out;
    background-color: #fff;
    max-height: 110px;
    max-width: 190px;
  }
  .project-logo2 {
    border-radius: 15px;
    transition: all 0.3s ease-in-out;
    background-color: #000000;
    max-height: 110px;
    max-width: 190px;
  }
  .image-row {
    display: flex;
    flex-wrap: wrap;
    width: 75%;
    gap: 60px; /* Adjust spacing as needed */
  }

  .design3 {
    overflow: hidden; /* Hide any overflow */
    position: relative;
    border-radius: 20px;
    flex: 1;
    margin-top: 5%;
  }

  .project-title {
    font-family: "Fraunces", serif;
    font-size: 50px;
    font-weight: 300;
    line-height: 50px;
  }
  .no-box-shadow {
    box-shadow: none; /* Remove box shadow */
  }
  .project-caption {
    font-size: 18px;
    font-weight: 500;
    color: gray;
  }
  .detail {
    display: grid;
    grid-template-rows: auto auto; /* Two rows for label and text */
  }
  .details-card {
    background: linear-gradient(
      90deg,
      rgba(255, 233, 244, 0.4) 0%,
      rgba(234, 243, 255, 0.7) 100%
    );
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
  .styled-image {
    width: 1100px;
    height: 285px;
    filter: drop-shadow(
      0px -10px 15px rgba(9, 255, 9, 0.7)
    ); /* Green shadow on upper part */
  }
  .styled-image2 {
    width: 1100px;
    height: 585px;
    filter: drop-shadow(0px -10px 15px rgba(165, 9, 255, 0.13));
  }
</style>
