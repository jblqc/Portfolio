<template>
  <div class="picture-card">
    <img :src="image" alt="Excluded Image" />
  </div>
</template>

<script setup>
  defineProps({
    image: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .picture-card img {
    width: 100%;
    height: auto;
  }
</style>
