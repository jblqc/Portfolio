<template>
  <v-row justify="center">
    <v-col cols="11" md="9" lg="8" class="text-center d-flex flex-column">
      <Text
        text="Journey"
        variant="display-2"
        fontWeight="bold"
        :gradient="'linear-gradient(90deg,#DC36FA 0%,#A167EF 35%,#609FE4 45%,#3ABFDE 55%,#04D18E 66%)'"
        class="tracking-wider custom-font mb-5"
      />
      <Text
        text="The linear view of some milestones and notable moments that happened so far."
        variant="title"
        fontWeight="400"
        :color="'black'"
        class="description mb-4"
      />
    </v-col>
  </v-row>
  <v-row class="footer-quote mt-10 mb-5">
    <span class="decor">❧</span>
    <span class="dot">ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐</span>
    <span class="decor">☙</span>
  </v-row>

  <v-row justify="center">
    <v-col cols="12" md="9" lg="10">
      <v-timeline align="start" side="end"  >
        <v-timeline-item
          v-for="event in [...timelineItems].reverse()"
          :key="event.id"
          :dot-color="isDarkMode ? 'purple-lighten-4' : getDotColor(event.labels)"
          size="x-small"
          class="timeline-item"
        >
          <template v-slot:opposite>
            <!-- Left Side: Date -->
            <Text
              :text="event.date"
              variant="subtitle-1"
              fontWeight="600"
              class="tracking-wider"
            />
            <p class="text-grey text-caption font-weight-bold"></p>
          </template>
          <div class="timeline-content"     :class="{ 'timeline-content-black': isDarkMode }"     
>
<v-chip
  v-for="(badge, i) in event.labels"
  :key="i"
  :color="getBadgeColor(badge)"
  class="text-caption mr-3 mb-2"
  size="x-small"
  v-if="!isDarkMode"
>
  {{ badge }}
</v-chip>

<v-chip
  v-for="(badge, i) in event.labels"
  :key="'dark-' + i"
  :color="getBadgeColor(badge)"
  class="text-caption mr-3 mb-2 dark-mode-chip"
  size="x-small"
  :style="{ backgroundColor: getBadgeColor(badge) + ' !important' }"
  v-else
>
  {{ badge }}
</v-chip>


            <div class="d-flex align-center">
              <Text
                :text="event.title"
                variant="title"
                fontWeight="600"
                class="tracking-wider"
              />
            </div>
            <Text
              :text="event.description"
              variant="subtitle-2"
              color="dark-gray"
              class="tracking-wider"
            />

            <v-img
              v-if="event.image"
              :src="event.image"
              class="mt-2 rounded-lg"
              max-height="350"
              max-width="350"
              cover
            />
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>

  <TechLogos />
</template>

<script setup>
import { ref, computed } from "vue";
import Text from "../Reusable/Text.vue";
import TechLogos from "../HeroSection/TechLogos.vue";
import { useHomeStore } from "@/stores/useHomeStore";
import { useRouter } from "vue-router";

const homeStore = useHomeStore();
const isDarkMode = computed(() => homeStore.isDarkMode);

const timelineItems = ref([
  {
    id: 1,
    date: "2018",
    title: "Gerry Roxas Leadership Award",
    labels: ["award", "leadership"],
    description:
      "Recipient of the Gerry Roxas Leadership Award and President of Perpetual Help College of Manila SC.",
    image: "/src/assets/images/timeline/gerry.png",
  },
  {
    id: 2,
    date: "2022 - Early 2023",
    title: "Freelance Graphic Artist",
    labels: ["freelance", "design"],
    description: "Worked as a self-employed freelance graphic artist.",
    image: "/src/assets/images/timeline/digital.png",
  },
  {
    id: 3,
    date: "2023",
    title: "Developed Multiple Systems",
    labels: ["development", "projects"],
    description:
      "Developed various systems including an NFT Marketplace, Recipe Management System, Veterinary Clinic Appointment System, Voting Management System, and Chatbot Assistance System.",
    image: "/src/assets/images/timeline/projects.png",
  },
  {
    id: 4,
    date: "Feb - May 2024",
    title: "Internship at Simplevia Technologies Inc.",
    labels: ["internship", "frontend"],
    description:
      "Worked as a frontend developer intern at Simplevia Technologies Inc.",
    image: "/src/assets/images/timeline/ojt.png",
  },
  {
    id: 5,
    date: "May 2024 - Present",
    title: "Frontend Software Engineer",
    labels: ["career", "job"],
    description:
      "Currently working as a Frontend Software Engineer at Simplevia Technologies Inc.",
    image: "/src/assets/images/timeline/simplevia.png",
  },
  {
    id: 6,
    date: "June 14-15, 2024",
    title: "Presented Research Paper at 8th ICICCT Conference",
    labels: ["conference", "research"],
    description:
      "Presented the research paper 'NecessiPick' at the 8th International Conference on Inventive Communication and Computational Technologies (ICICCT).",
    image: "/src/assets/images/timeline/icicct.png",
  },
  {
    id: 7,
    date: "December 11, 2024",
    title: "Finalist - BPI-DOST Innovations Award",
    labels: ["award", "competition"],
    description:
      "Recognized as a finalist in the BPI-DOST Innovations Award 2024.",
    image: "/src/assets/images/timeline/BPI.png",
  },
  {
    id: 8,
    date: "December 15, 2024",
    title: "Springer Nature Publication",
    labels: ["publication", "research"],
    description:
      "Your eBook contribution has been officially published on Springer Nature Link.",
    image: "/src/assets/images/timeline/publish.png",
  },
]);

const reversedTimeline = computed(() => [...timelineItems.value].reverse());

const getBadgeColor = (type) => {
  const colors = {
    award: "blue",
    leadership: "blue-darken-2",
    freelance: "purple",
    design: "pink",
    development: "teal",
    projects: "indigo",
    internship: "deep-purple-accent-2",
    frontend: "deep-purple-accent-1",
    career: "green",
    job: "green-darken-1",
    conference: "red",
    research: "orange",
    competition: "cyan",
    publication: "lime",
  };
  return colors[type] || "grey";
};
const getDotColor = (labels) => {
  const colors = {
    award: "#C8E7FF", // Soft pastel blue (matches "blue")
    leadership: "#A2D2FF", // Muted blue (matches "blue-darken-2")
    freelance: "#D8BBFF", // Soft purple (matches "purple")
    design: "#FFC8DD", // Pastel pink (matches "pink")
    development: "#BDE0FE", // Light teal-blue (matches "teal")
    projects: "#C0C8FF", // Soft indigo (matches "indigo")
    internship: "#9f86c0", // Muted grey (matches "grey")
    frontend: "#C8E7FF", // Light sky blue (matches "blue-lighten-1")
    career: "#B5EAD7", // Soft green (matches "green")
    job: "#A0C4A7", // Muted green (matches "green-darken-1")
    conference: "#FFAFCF", // Soft red-pink (matches "red")
    research: "#FFCB91", // Warm orange (matches "orange")
    competition: "#BDE0FE", // Light cyan (matches "cyan")
    publication: "#D4F8B3", // Soft lime green (matches "lime")
  };

  return labels.find((label) => colors[label])
    ? colors[labels.find((label) => colors[label])]
    : "#D0D1FF";
};
</script>

<style scoped>
/* ✨ Smooth Hover Effect */
.timeline-item .timeline-content {
  padding: 15px;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
}
.dark-mode-chip {
  background-color: var(--chip-bg) !important;
  opacity: 0.7 !important;
}

.timeline-item:hover .timeline-content {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 150, 0.1),
    rgba(0, 150, 255, 0.1)
  );  transition: 0.3s ease-in-out;

}

.timeline-item:hover .timeline-content-black {
  backdrop-filter: blur(20px) brightness(1.2); /* Stronger blur & brightness */
  background: linear-gradient(
      135deg,
      rgba(251, 153, 210, 0.7),
      rgba(64, 154, 218, 0.3)
    ),
    radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.4) 10%,
      transparent 50%
    ); /* Adds a glossy highlight */
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.109),
    0 4px 10px rgba(0, 0, 0, 0.2); /* Inner & outer shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Adds glassy border */
}

</style>
