<script setup>
  import Flicking, { EVENTS } from "@egjs/vue3-flicking";
  import "@egjs/vue3-flicking/dist/flicking.css";
  import { defineProps, onMounted, ref } from "vue";

  const props = defineProps({
    images: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        align: "center",
        circular: true,
        bound: true,
        moveType: { type: "snap", count: 1 }, // Ensures snapping to each panel
      }),
    },
  });

  const flickingRef = ref(null);

  onMounted(() => {
    flickingRef.value.on(EVENTS.MOVE_END, () => {
      console.log("Carousel moved");
    });
  });
</script>

<template>
  <Flicking ref="flickingRef" :options="options">
    <div v-for="(image, index) in images" :key="index" class="panel">
      <img :src="image" alt="Carousel Image" class="carousel-image" />
    </div>
  </Flicking>
</template>

<style scoped>
  .panel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* Ensure this matches the carousel's width */
    height: 300px; /* Set a fixed height for all panels */
  }

  .carousel-image {
    width: auto; /* Adjust width automatically */
    max-width: 100%; /* Ensure image does not exceed panel width */
    height: 100%; /* Fixed height to match panel */
    object-fit: cover; /* Cover ensures the image covers the panel, might crop */
  }
</style>
