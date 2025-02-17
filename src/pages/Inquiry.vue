<template>
  <div class="not-prose">
    <v-container class="inquiry-container">
      <h1 class="text-2xl font-bold mb-4">Enquiry Form</h1>
      <p class="text-gray-600 mb-6">
        Fill out the form and I'll get back to you soon.
      </p>

      <v-form @submit.prevent="submitForm">
        <!-- Name & Email -->
        <v-text-field
          v-model="inquiryStore.name"
          label="Name"
          outlined
          required
          class="custom-input"
        ></v-text-field>
        <v-text-field
          v-model="inquiryStore.email"
          label="Email"
          type="email"
          outlined
          required
          class="custom-input"
        ></v-text-field>

        <!-- What are you looking for? -->
        <h3 class="font-semibold text-lg mt-6">What are you looking for?</h3>
        <v-radio-group v-model="inquiryStore.lookingFor">
          <v-radio
            v-for="option in lookingForOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></v-radio>
        </v-radio-group>

        <!-- What type of project? -->
        <h3 class="font-semibold text-lg mt-6">
          What type of project do you have?
        </h3>
        <p class="text-sm text-gray-500">
          Note: I usually work as a contractor
        </p>
        <v-checkbox
          v-for="option in projectTypes"
          :key="option.value"
          v-model="inquiryStore.selectedProjects"
          :label="option.label"
          :value="option.value"
        ></v-checkbox>

        <!-- Conditional Section: Show when a project type is selected -->
        <div v-if="inquiryStore.selectedProjects.length > 0">
          <!-- Do you have project documents? -->
          <h3 class="font-semibold text-lg mt-6">
            Do you have project documents?
          </h3>
          <p class="text-sm text-gray-500">
            Wireframe, PRD, Reference, Old Design, etc.
          </p>
          <v-radio-group v-model="inquiryStore.hasDocuments">
            <v-radio label="Yes" value="yes" class="custom-radio"></v-radio>
            <v-radio label="No" value="no" class="custom-radio"></v-radio>
          </v-radio-group>

          <!-- Timeline -->
          <h3 class="font-semibold text-lg mt-6">Timeline</h3>
          <p class="text-sm text-gray-500">Do you have any timeline?</p>

          <v-btn-toggle v-model="inquiryStore.timeline" color="primary" group>
            <v-btn
              v-for="option in timelineOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </v-btn>
          </v-btn-toggle>

          <!-- Budget Estimate -->
          <h3 class="font-semibold text-lg mt-6">Budget Estimate</h3>
          <p class="text-sm text-gray-500">Minimum $2500 project required</p>
          <v-text-field
            v-model="inquiryStore.budget"
            label="Enter your budget"
            outlined
            required
            class="custom-input"
          ></v-text-field>
        </div>

        <!-- Message -->
        <v-textarea
          v-model="inquiryStore.message"
          label="Anything else you want to share?"
          outlined
          required
          class="custom-input"
        ></v-textarea>

        <!-- Submit -->
        <v-btn color="pink" type="submit" block class="mt-4">Submit</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useInquiryStore } from "@/stores/useInquiryStore"; // Pinia store

  const inquiryStore = useInquiryStore();

  // Options
  const lookingForOptions = [
    { label: "Project", value: "project" },
    { label: "As Guest/Speaker", value: "guest" },
  ];

  const projectTypes = [
    { label: "Consultant/Contract", value: "consultant" },
    { label: "Design System", value: "design_system" },
    { label: "Product Design", value: "product_design" },
    { label: "Visual Design", value: "visual_design" },
    { label: "Branding", value: "branding" },
    { label: "3D Icons/Illustration", value: "3d_icons" },
    { label: "Icon / Illustration", value: "icon_illustration" },
    { label: "Landing Page", value: "landing_page" },
    { label: "Other", value: "other" },
  ];

  const timelineOptions = [
    { label: "1 Week", value: "1_week" },
    { label: "1 Month", value: "1_month" },
    { label: "3-4 Months", value: "3_4_months" },
    { label: "1 Year", value: "1_year" },
  ];

  const submitForm = () => {
    alert(`Form submitted: ${JSON.stringify(inquiryStore.$state, null, 2)}`);
  };
</script>

<style scoped></style>
