<template>
  <div class="inquiry-container">
    <Text
      :text="'Inquiry Form'"
      variant="display-2"
      fontWeight="bold"
      :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
      class="tracking-wider custom-font"
    /><br />
    <Text
      text="Fill out the form and I'll get back to you soon."
      variant="subtitle-1"
      fontWeight="500"
      color="gray"
    />

    <v-form @submit.prevent="submitForm" class="pt-10 w-100">
      <!-- Name & Email -->
      <Text
        text="Tell me about yourself"
        variant="subtitle-1"
        fontWeight="600"
        class="mb-2"
      /><br />
      <Text :text="'Name'" variant="subtitle-2" fontWeight="500" class="" />
      <TextField
        v-model="inquiryStore.name"
        label="Name"
        required
        clearable
        class="mb-5"
      ></TextField>
      <Text :text="'Email'" variant="subtitle-2" fontWeight="500" />
      <TextField
        v-model="inquiryStore.email"
        label="Email"
        type="email"
        required
        clearable
        class="mb-10"
      ></TextField>

      <!-- What are you looking for? -->

      <Text
        text="What are you looking for?"
        variant="subtitle-1"
        fontWeight="600"
        class="mb-2"
      />
      <v-radio-group v-model="inquiryStore.lookingFor">
        <v-radio
          v-for="option in lookingForOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></v-radio>
      </v-radio-group>
      <Text
        text="What type of project do you have?"
        variant="subtitle-1"
        fontWeight="600"
        class="mb-2"
      /><br />
      <Text
        text="Note: I usually work as a contractor"
        variant="subtitle-2"
        fontWeight="600"
        class="mb-2"
        color="gray"
      />
      <v-checkbox
        v-for="option in projectTypes"
        :key="option.value"
        v-model="inquiryStore.selectedProjects"
        :label="option.label"
        :value="option.value"
        density="compact"
      ></v-checkbox>

      <!-- Conditional Section: Show when a project type is selected -->
      <div v-if="inquiryStore.selectedProjects.length > 0">
        <!-- Do you have project documents? -->

        <Text
          text="Do you have project documents?"
          variant="subtitle-1"
          fontWeight="600"
          class="mb-2"
        /><br />
        <Text
          text="Wireframe, PRD, Reference, Old Design, etc."
          variant="subtitle-2"
          fontWeight="600"
          class="mb-2"
          color="gray"
        />
        <v-radio-group v-model="inquiryStore.hasDocuments">
          <v-radio label="Yes" value="yes" class="custom-radio"></v-radio>
          <v-radio label="No" value="no" class="custom-radio"></v-radio>
        </v-radio-group>
        <Text text="Timeline" variant="subtitle-1" fontWeight="600" /><br />
        <Text
          text="Do you have any timeline?"
          variant="subtitle-2"
          fontWeight="600"
          class="mb-2"
          color="gray"
        /><br />

        <v-btn-toggle
          v-model="inquiryStore.timeline"
          color="primary"
          variant="outlined"
          group
          class="mb-10 mt-5"
        >
          <v-btn
            v-for="option in timelineOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </v-btn>
        </v-btn-toggle>
        <br />
        <!-- Budget Estimate -->
        <Text
          text="Budget Estimate"
          variant="subtitle-1"
          fontWeight="600"
          class="mb-2 mt-5"
        />

        <TextField
          v-model="inquiryStore.budget"
          label="Enter your budget"
          required
          clearable
        ></TextField>
        <v-textarea
          v-model="inquiryStore.message"
          label="Anything else you want to share?"
          outlined
          required
          density="compact"
          variant="outlined"
          class="mt-10"
        ></v-textarea>
      </div>
      <!-- Message -->

      <!-- Submit -->
      <FormAction @click="submitForm" />
    </v-form>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useInquiryStore } from "@/stores/useInquiryStore"; // Pinia store
  import { VRadioGroup, VRadio } from "vuetify/components";
  import TextField from "@/components/Reusable/TextField.vue";
  import Text from "../components/Reusable/Text.vue";
  import FormAction from "../components/Reusable/FormAction.vue";
  import emailjs from "emailjs-com";

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
    const emailParams = {
      from_name: inquiryStore.name, // Name from form
      from_email: inquiryStore.email, // User's email
      to_email: inquiryStore.email,
      message: inquiryStore.message, // Message from form
    };

    emailjs
      .send(
        "service_4bfymg9", // Your EmailJS service ID
        "template_fjn7gld", // Your EmailJS template ID
        emailParams,
        "1wdlImapTLSAmtGns" // Your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Inquiry submitted successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Something went wrong. Please try again.");
        }
      );
  };
</script>

<style scoped></style>
