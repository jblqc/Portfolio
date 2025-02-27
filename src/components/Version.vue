<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" align="center">
          <div v-for="version in versions" :key="version.id" class="version-box" @click="openModal(version)">
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
  
      <!-- Modal -->
      <v-dialog v-model="showModal" max-width="500" class="custom-dialog">
  <v-card class="modal-card rounded-xl">
    <!-- Close Button (X) in Top-Right Corner -->
    <Text
       text="✖"
      @click="showModal = false" 
      class="close-button"
      
    />
      
 <v-row align="center"> <v-col> <img src="/android-chrome-192x192.png" alt="Version Icon" class="floating-image" /></v-col>  
</v-row>


    <!-- Version Number -->
    <Text
      :text="selectedVersion?.version"
      variant="subtitle-1"
      fontWeight="600"
      class="modal-version-title"
    />

    <!-- Bullet Points for Details -->
        <div class="modal-details">
    <div v-for="(detail, index) in formattedDetails" :key="index" class="detail-item">
        <Text :text='" ⤿ " + detail' variant="subtitle-2" fontWeight="400" />
    </div>
    </div>

  </v-card>
</v-dialog>

    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import Text from "@/components/Reusable/Text.vue";
  
  const versions = ref([
    { id: 1, version: "v1.1", date: "2023-24", status: "active", details: "Added Version section, Added new Sun/Moon toggle, New side navigation for mobile" },
    { id: 2, version: "v1.0", date: "2023-24", status: "inactive", details: "Initial release, Complete profile section" },
  ]);
  
  const showModal = ref(false);
  const selectedVersion = ref(null);
  
  const openModal = (version) => {
    selectedVersion.value = version;
    showModal.value = true;
  };
  
  // Format details into bullet points
  const formattedDetails = computed(() => {
    return selectedVersion.value?.details.split(",").map((detail) => detail.trim()) || [];
  });
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
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;
    opacity: 0.7;
    width: 120px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  .version-box:hover {
    background: #c38df014;
  }
  .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent !important;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
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
  
  /* Modal Styling */
  .modal-card {
    color: white;
    padding: 20px;
    text-align: center;

    background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 20%;
border: 1px solid rgba( 255, 255, 255, 0.18 );
  
  }
  
  /* Floating Image */
  .floating-image {
    width: 60px;
    height: 60px;
    position: relative;
    animation: float 3s ease-in-out infinite;
    margin-bottom: 16px;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .custom-dialog::v-deep(.v-overlay__scrim) {
  background: transparent !important; /* Removes the dark gray overlay */
}

  /* Modal Content */
  .modal-version-title {
    margin-bottom: 10px;
  }
  
  .modal-details {
    list-style-type: disc;
    padding-left: 20px;
    text-align: left;
    margin-bottom: 20px;
  }
  </style>
  