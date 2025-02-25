<template>
  <router-view>
    <template v-slot:default="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.name !== 'work-specific'" />
      </keep-alive>
      <component :is="Component" v-if="$route.name === 'work-specific'" />
    </template>
  </router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useWorkStore } from "@/stores/useWorkStore";

const workStore = useWorkStore();

onMounted(async () => {
  await workStore.fetchAllData();
});
</script>
