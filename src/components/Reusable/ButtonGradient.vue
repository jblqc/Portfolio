<template>
    <button class="button" :style="{ background: gradient, color: textColor }">
      <img v-if="iconSrc" :src="iconSrc" alt="icon" class="icon" />
      {{ text }}
    </button>
  </template>
  
  <script setup>
  defineProps({
    text: String,
    iconSrc: String, // Must pass resolved asset path
    gradient: String, // Linear gradient for background
    textColor: String, // Text color
  });
  </script>
  
  <style scoped>
  .button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 9999px;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  </style>
  