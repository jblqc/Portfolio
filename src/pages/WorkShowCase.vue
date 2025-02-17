<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useWorkStore } from "@/stores/useWorkStore";

  const workStore = useWorkStore();

  // Fetch data before rendering
  onMounted(async () => {
    await workStore.fetchAllData();
  });
</script>

<style scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
