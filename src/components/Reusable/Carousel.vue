<script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css";
  import "swiper/css/effect-coverflow";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
  import { defineProps, computed } from "vue";

  const props = defineProps({
    images: {
      type: Array,
      required: true,
    },
  });
  const safeImages = computed(() => props.images || []);
</script>

<template>
  <div>
    <div class="carousel-wrapper">
      <Swiper
        :modules="[EffectCoverflow, Navigation, Pagination]"
        effect="coverflow"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="1"
        :initialSlide="
          safeImages.length === 2 ? 0 : Math.floor(safeImages.length / 2)
        "
        :coverflowEffect="{
          rotate: 30, // Rotation angle (3D perspective)
          stretch: 500, // Space between slides (set to 0 for auto-spacing)
          depth: 200, // Depth of effect (controls 3D perspective)
          modifier: 1, // Effect strength
          slideShadows: true, // Shadows for more depth effect
        }"
        :navigation="true"
        :pagination="{ clickable: true }"
        class="swiper-container"
      >
        <SwiperSlide
          v-for="(image, index) in safeImages"
          :key="index"
          class="swiper-slide"
        >
          <img :src="image" class="carousel-image" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
  .carousel-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: visible; /* Ensures slides are visible */
  }

  .swiper-container {
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    overflow: visible !important; /* Ensures the side images show */
  }

  .swiper-slide {
    width: 100%; /* Adjust size of each slide */
    transform: perspective(120px); /* 3D effect */
  }

  .carousel-image {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
</style>
