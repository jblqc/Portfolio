<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { defineProps, computed, ref, onMounted } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const safeImages = computed(() => props.images || []);
const isMobile = ref(false);

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};
</script>

<template>
  <div>
    <!-- Desktop Coverflow Carousel (hidden on mobile) -->
    <div class="carousel-wrapper" v-if="!isMobile">
      <Swiper
        :modules="[EffectCoverflow, Navigation, Pagination]"
        effect="coverflow"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="1"
        :initialSlide="safeImages.length === 2 ? 0 : Math.floor(safeImages.length / 2)"
        :coverflowEffect="{
          rotate: 30,
          stretch: 500,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }"
        :navigation="true"
        :pagination="{ clickable: true }"
        class="swiper-container"
      >
        <SwiperSlide v-for="(image, index) in safeImages" :key="index" class="swiper-slide">
          <img :src="image" class="carousel-image" />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Mobile Simple Carousel (hidden on desktop) -->
    <div class="mobile-carousel" v-if="isMobile">
      <Swiper
        :modules="[Navigation, Pagination]"
        effect="slide"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="1"
        :spaceBetween="20"
        :navigation="true"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide v-for="(image, index) in safeImages" :key="'mobile-'+index">
          <img :src="image" class="mobile-carousel-image" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
/* Desktop Styles */
.carousel-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: visible;
}

.swiper-container {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow: visible !important;
}

.swiper-slide {
  width: 100%;
}

.carousel-image {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Mobile Styles */
.mobile-carousel {
  width: 100%;
  padding: 0 1px;
}

.mobile-carousel-image {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (min-width: 769px) {
  .mobile-carousel {
    display: none;
  }
}

@media (max-width: 768px) {
  .carousel-wrapper {
    display: none;
  }
  
  .mobile-carousel {
    display: block;
  }
}
</style>