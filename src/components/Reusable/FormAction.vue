<template>
  <v-col cols="12" :class="`mt-n10 d-flex align-center ${justifyClass}`">
    <v-btn
      rounded="xs"
      variant="outlined"
      class="glassmorphic-button2 mr-6"
      text="Cancel"
      @click="handleCancel"
      :disabled="props.disabled"
    >
    </v-btn>
    <v-btn
      class="glassmorphic-button"
      :text="props.saveButtonText"
      @click="confirmSave"
      :disabled="props.disabled"
    >
    </v-btn>
  </v-col>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from "vue";
  import Swal from "sweetalert2";

  const emit = defineEmits(["cancel", "save"]);

  const props = defineProps({
    justify: {
      type: String,
      default: "end", // 'start', 'center', 'end', 'between', 'around'
    },
    saveButtonText: {
      type: String,
      default: "Save", // Default text for the save button
    },
    swalText: {
      type: String,
      default: "Are you sure you want to save this information?", // Default Swal text
    },
    disabled: {
      type: Boolean,
      default: false, // Disabled state for the buttons
    },
  });

  const handleCancel = () => {
    Swal.fire({
      title: "Cancel",
      text: "Are you sure you want to cancel?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      confirmButtonColor: "#D0B525",
      cancelButtonText: "Continue",
      cancelButtonColor: "#d33",
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        if (confirmButton) {
          confirmButton.style.backgroundColor = "#ffffff";
          confirmButton.style.color = "#000000";
          confirmButton.style.border = "0.5px solid #5b7fff";
          confirmButton.style.padding = "9px 25px";
          confirmButton.style.borderRadius = "5px";
        }
        if (cancelButton) {
          cancelButton.style.backgroundColor = "#5b7fff";
          cancelButton.style.color = "#ffffff";
          cancelButton.style.padding = "10px 40px";
          cancelButton.style.margin = "20px";
          cancelButton.style.borderRadius = "5px";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        emit("cancel");
      }
    });
  };

  const isSaving = ref(false); // ✅ New state to track saving status

  const confirmSave = async () => {
    try {
      if (isSaving.value) return; // Prevent multiple clicks

      const result = await Swal.fire({
        title: "Saving Information",
        text: props.swalText,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        didOpen: () => {
          const cancelButton = Swal.getCancelButton();
          if (cancelButton) {
            cancelButton.style.backgroundColor = "#ffffff";
            cancelButton.style.color = "#000000";
            cancelButton.style.border = "0.5px solid #5b7fff";
            cancelButton.style.padding = "9px 25px";
            cancelButton.style.borderRadius = "5px";
          }
          const confirmButton = Swal.getConfirmButton();
          if (confirmButton) {
            confirmButton.style.backgroundColor = "#5b7fff";
            confirmButton.style.color = "#ffffff";
            confirmButton.style.padding = "10px 40px";
            confirmButton.style.margin = "20px";
            confirmButton.style.borderRadius = "5px";
          }
        },
      });
      // if (result.isConfirmed) {
      // 	emit("save");
      // }
      if (result.isConfirmed) {
        isSaving.value = true; // ✅ Set saving state to disable button
        Swal.close(); // ✅ Close modal immediately after confirming

        // ✅ Show a loading UI (optional)
        Swal.fire({
          title: "Saving...",
          text: "Please wait while we process your request.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(); // Show loading spinner
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate saving process

        emit("save"); // ✅ Proceed with actual saving

        Swal.close(); // ✅ Close loading UI after saving
        isSaving.value = false; // ✅ Reset saving state after completion
      }
    } catch (error) {
      isSaving.value = false; // Ensure state resets on failure
      console.error("Error submitting data:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error saving the information.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D0B525",
      });
    }
  };

  const justifyClass = `justify-${props.justify}`;
</script>
<style scoped>
  .glassmorphic-button {
    font-size: 12px;
    font-weight: bold;
    color: rgb(255, 255, 255);
    padding: 5px 30px;
    box-shadow: none;
    border-radius: 10px; /* Rounded pill shape */
    background: #5b7fff;
  }
  .glassmorphic-button2 {
    font-size: 12px;
    font-weight: bold;
    color: rgb(60, 89, 255);
    padding: 5px 30px;
    box-shadow: none;
    border-radius: 10px; /* Rounded pill shape */
    border-color: #5b7fff;
    background: #ffffff;
  }
</style>
