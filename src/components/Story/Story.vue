<template>
  <v-row justify="center">
    <v-col cols="11" md="9" lg="8" class="text-center d-flex flex-column">
      <Text
        text="Story"
        variant="display-2"
        fontWeight="bold"
        :gradient="'linear-gradient(90deg,#FF4E9C 40%,#EA29DE 46.93%,#B723D8 53.03%,#5606EF 60%)'"
        class="tracking-wider custom-font mb-5"
      />
      <Text
        text="I share my process and lessons in this portfolio and on Medium. Hope you find something useful!"
        variant="title"
        fontWeight="400"
        :color="'black'"
        class="description"
      />
      <v-row class="footer-quote">
        <span class="decor">❧</span>
        <span class="dot">ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐</span>
        <span class="decor">☙</span>
      </v-row>
    </v-col>
  </v-row>

  <v-row justify="center" class="d-flex align-center">
    <ButtonGradient
      text="LinkedIn"
      :iconSrc="linkedinIcon"
      gradient="linear-gradient(270deg, rgb(240, 214, 255) 0%, rgb(211, 205, 255) 100%)"
      textColor="#a060c4"
      class="mr-4"
    />

    <ButtonGradient
      text="Medium"
      :iconSrc="mediumIcon"
      gradient="linear-gradient(270deg, rgb(251, 206, 255) 0%, rgb(255, 209, 209) 100%)"
      textColor="#d000a6cc"
    />
  </v-row>

  <v-row class="d-flex align-center">
    <div class="story-banner">
      <div class="story-content">
        <span class="story-title">
          <Text
            text="story"
            :variant="isMobile ? 'display-3' : 'display-5'"
            fontWeight="500"
            class="custom-font"
          />
          <span class="dot-story">.</span></span
        >
        <div class="story-text">
          <Text
            text="check more"
            :variant="isMobile ? 'title' : 'headline'"
            fontWeight="300"
            color="dark-gray"
            class="custom-font"
          /><br />
          <Text
            text="stories here"
            :variant="isMobile ? 'title' : 'headline'"
            fontWeight="300"
            color="dark-gray"
            class="custom-font"
          /><br />
          <Text
            text="MEDIUM@JENNEFER.LEE"
            variant="caption"
            fontWeight="600"
            color="dark-gray"
            class="cursor"
            @click="openLink('https://medium.com/@jenneferlee23')"
          />
        </div>
      </div>
    </div>
  </v-row>
  <v-row justify="center" class="mb-5">
    <v-col :cols="isMobile ? 12 : 8">
      <div
        v-for="story in stories"
        :key="story.id"
        class="story-card cursor"
        @click="openLink(story.link)"
      >
        <Text
          :text="story.title"
          variant="body-1"
          fontWeight="600"
          class="mb-2"
        />
        <Text
          :text="story.caption"
          variant="subtitle-1"
          color="dark-gray"
          class="mb-2"
        />
        <Text
          :text="`${story.date} • ${story.tag}`"
          variant="caption"
          color="gray"
          class="mb-2"
        /></div
    ></v-col>
  </v-row>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import Text from "../Reusable/Text.vue";
  import ButtonGradient from "../Reusable/ButtonGradient.vue";
  import mediumIcon from "@/assets/medium.svg";
  import linkedinIcon from "@/assets/linkedin.svg";

  const isMobile = ref(false); // Initialize as false to prevent SSR errors
  const updateScreenSize = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    isMobile.value = window.innerWidth <= 768; // Set initial value
    window.addEventListener("resize", updateScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateScreenSize);
  });

  const stories = ref([
    {
      id: 1,
      title:
        "The Journey of NecessiPick: From Capstone to International Conference",
      caption: "How refining our student project led to global recognition.",
      date: "Feb 26, 2025",
      tag: "Research & Innovation",
      link: "https://medium.com/@jenneferlee23/from-capstone-to-conference-how-refining-our-project-led-to-icicct-2024-af230b5ecc36",
    },
  ]);
  const openLink = (url) => {
    if (url) {
      window.open(url, "_blank"); // Opens link in a new tab
    }
  };
</script>

<style scoped>
  .story-card {
    padding: 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  .story-card:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 0, 150, 0.1),
      rgba(0, 150, 255, 0.1)
    );
    transition: 0.3s ease-in-out;
  }

  .story-card:hover .story-card-black {
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
  .story-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 250;
    height: 120px;
    background: url("@/assets/story-bg.svg") no-repeat center;
    background-size: cover;
    border-radius: 12px;
    padding: 20px;
    filter: blur(0.4px); /* Apply initial blur */
    opacity: 0.8; /* Make it slightly faded */
    transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 430px) {
  }
  .story-banner:hover {
    filter: blur(0px); /* Remove blur on hover */
    opacity: 1; /* Make it fully visible */
    transform: scale(1.05); /* Slightly enlarge */
  }
  .story-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .dot-story {
    color: black;
    font-size: 50px;
    font-weight: bold;
  }
</style>
