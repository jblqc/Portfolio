<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12"  align="center">
          <div v-for="version in versions" :key="version.id" class="version-box">
            <!-- Active Version Pulse Indicator -->
            <span v-if="version.status === 'active'" class="pulse"></span>
  
            <!-- Version Number -->
            <Text
              :text="version.version"
              variant="subtitle-1"
              fontWeight="600"
              class="version-number"
            />
  
             <!-- Show Date if not Active, Otherwise Show "Live" -->
          <Text
            v-if="version.status !== 'active'"
            :text="version.date"
            variant="body-2"
            fontWeight="400"
            class="version-date"
          />
          <Text
            v-else
            text="live"
            variant="body-2"
            fontWeight="700"
            :gradient="'linear-gradient(90deg,#1C45A6 0%,#44B5A2 50%,#a7c68f 100%)'"
          />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Text from "@/components/Reusable/Text.vue";
  
  // Version Data
  const versions = ref([
    { id: 1, version: "v1.1", date: "2023-24", status: "active" },
    { id: 2, version: "v1.0", date: "2023-24", status: "inactive" },


  ]);
  </script>
  
  <style scoped>
  /* Version Box */
  .version-box {
    position: relative;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #ccc;
    text-align: center;
    display: flex;
    flex-direction: column; /* Stack contents vertically */
    align-items: center;
    gap: 4px; /* Space between elements */
    margin-bottom: 12px; /* Space between version boxes */
    opacity: 0.7;
    width: 120px;
  }
  .version-box:hover {
  background: #c38df014;  transition: 0.3s ease-in-out;

}
  /* Pulse Indicator */
  .pulse {
    position: absolute;
    top: 7px;
    right: 6px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(27, 240, 27, 0.674);
    box-shadow: 0 0 0 rgba(0, 255, 0, 0.4);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(2, 255, 2, 0.591);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(0, 255, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
    }
  }
  
  /* Text Styling */
  .version-number {
    color: black;
  }
  
  .version-date {
    color: gray;
  }
  
  .live-status {
    color: green;
  }
  </style>
  