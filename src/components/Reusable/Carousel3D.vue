<template>
  <carousel-3d :autoplay="autoplay" :display="displayCount">
    <slide v-for="(item, index) in slides" :key="index" :index="index">
      <div class="carousel-slide">
        <img
          :src="item.image"
          :alt="'Slide ' + (index + 1)"
          class="carousel-image"
        />
        <div class="caption">{{ item.caption }}</div>
      </div>
    </slide>
  </carousel-3d>
</template>

<script setup>
  import { defineProps } from "vue";
  import { Carousel3d, Slide } from "vue-carousel-3d";

  defineProps({
    slides: {
      type: Array,
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    displayCount: {
      type: Number,
      default: 3, // Number of slides visible
    },
  });
</script>

<style scoped>
  .carousel-slide {
    text-align: center;
    padding: 10px;
  }

  .carousel-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .caption {
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
