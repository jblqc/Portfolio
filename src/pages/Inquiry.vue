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
      <div class="mb-5">
        <Text
          text="Tell me about yourself"
          variant="subtitle-1"
          fontWeight="600"
        />
      </div>

      <Text :text="'Name'" variant="subtitle-2" fontWeight="500" class="" />
      <TextField
        v-model="inquiryStore.name"
        clearable
        label="Name"
        hide-details
        :error="!!errors.name"
        :error-messages="errors.name"  

      ></TextField>
      <Text :text="'Email'" variant="subtitle-2" fontWeight="500" />
      <TextField
        v-model="inquiryStore.email"
        clearable
        label="Email"
        hide-details
        :error="!!errors.email"
        :error-messages="errors.email"
        @blur="validateEmail"
      ></TextField>
      <!-- What are you looking for? -->
      <div class="mt-5">
        <Text
          text="What are you looking for?"
          variant="subtitle-1"
          fontWeight="600"
        />
      </div>
      <br />
      <span v-if="errors.lookingFor" class="text-red-500 text-sm">
        {{ errors.lookingFor }}
      </span>

      <v-radio-group v-model="inquiryStore.lookingFor">
        <v-radio
          v-for="option in lookingForOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </v-radio-group>
      <div class="mt-5">
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
      </div>
      <br />
      <span v-if="errors.selectedProjects" class="text-red-500 text-sm">
        {{ errors.selectedProjects }}
      </span>
      <v-checkbox
        v-for="option in projectTypes"
        :key="option.value"
        v-model="inquiryStore.selectedProjects"
        :label="option.label"
        :value="option.value"
        density="compact"
      />

      <!-- Conditional Section: Show when a project type is selected -->
      <div v-if="inquiryStore.selectedProjects.length > 0" class="mt-5">
        <!-- Do you have project documents? -->
        <div class="mt-5">
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
        </div>
        <br />
        <span v-if="errors.hasDocuments" class="text-red-500 text-sm">
          {{ errors.hasDocuments }}
        </span>

        <v-radio-group v-model="inquiryStore.hasDocuments">
          <v-radio label="Yes" value="yes" class="custom-radio"></v-radio>
          <v-radio label="No" value="no" class="custom-radio"></v-radio>
        </v-radio-group>

        <!-- Timeline Selection -->
        <Text text="Timeline" variant="subtitle-1" fontWeight="600" /><br />
        <Text
          text="Do you have any timeline?"
          variant="subtitle-2"
          fontWeight="600"
          class="mb-2"
          color="gray"
        /><br />
        <span v-if="errors.timeline" class="text-red-500 text-sm">
          {{ errors.timeline }} </span
        ><br />
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


        <!-- Budget Estimate -->
        <div>
          <Text
            text="Budget Estimate"
            variant="subtitle-1"
            fontWeight="600"
            class="mb-2 mt-5"
          />
        </div>
        <TextFieldNumber
          v-model="inquiryStore.budget" 
          label="Enter your budget" 
         
          :error="!!errors.budget"
          :error-messages="errors.budget"
          />

        <!-- Message -->
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
    </v-form>
    <div class="mt-10">
      <FormAction @save="submitForm" />
    </div>
  </div>
</template>

<script setup>
// Import necessary modules
import { ref } from "vue";
import { useInquiryStore } from "@/stores/useInquiryStore";
import { VRadioGroup, VRadio } from "vuetify/components";
import TextField from "@/components/Reusable/TextField.vue";
import TextFieldNumber from "@/components/Reusable/TextFieldNumber.vue";
import Text from "../components/Reusable/Text.vue";
import FormAction from "../components/Reusable/FormAction.vue";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
// Access environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const REPLY_TO_EMAIL = import.meta.env.VITE_REPLY_TO_EMAIL;

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
const errors = ref({
  name: "",
  email: "",
  selectedProjects: "",
  hasDocuments: "",
  timeline: "",
  budget: "",
  message: "",
});
const validateEmail = () => {
  const email = inquiryStore.email;

  if (!email) {
    errors.value.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.value.email = "This doesn't seem to be a valid email. Please check and try again.";
  } else {
    errors.value.email = ""; // Clear the error if valid
  }
};


const validateForm = () => {
  errors.value = {
    name: inquiryStore.name ? "" : "Name is required",
    email: inquiryStore.email
        ? "" : "Email is required",
    lookingFor: inquiryStore.lookingFor ? "" : "Please select one option",
    selectedProjects:
      inquiryStore.selectedProjects.length > 0
        ? ""
        : "Please select at least one project type",
    hasDocuments: inquiryStore.hasDocuments ? "" : "Please select an option",
    timeline: inquiryStore.timeline ? "" : "Please select a timeline",
    budget: inquiryStore.budget
    ? "" : "Budget is required",
    message: inquiryStore.message ? "" : "Message is required",
  };

  return Object.values(errors.value).every((error) => error === "");
};

const submitForm = () => {
  if (!validateForm()) {
    console.log("Validation failed! Showing Swal error."); // Debugging line
    Swal.fire({
      title: "Error",
      text: "Please fill out all required fields correctly.",
      icon: "error",
    });
    return;
  }

  const emailParams = {
    from_name: inquiryStore.name,
    from_email: inquiryStore.email,
    reply_to: REPLY_TO_EMAIL,
    message: inquiryStore.message || "No additional message",
    looking_for: inquiryStore.lookingFor || "Not specified",
    selected_projects:
      inquiryStore.selectedProjects.length > 0
        ? inquiryStore.selectedProjects.join(", ")
        : "None",
    has_documents: inquiryStore.hasDocuments || "No",
    timeline: inquiryStore.timeline || "Not specified",
    budget: inquiryStore.budget || "Not provided",
  };

  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailParams,
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      Swal.fire({
  title: "Success",
  text: "Your inquiry has been sent successfully!",
  icon: "success",
  didOpen: () => {
    const confirmButton = Swal.getConfirmButton();
    if (confirmButton) {
      confirmButton.style.backgroundColor = "#5b7fff";
      confirmButton.style.color = "#ffffff";
      confirmButton.style.padding = "10px 40px";
      confirmButton.style.margin = "20px";
      confirmButton.style.borderRadius = "5px";
    }
  }
});

    })
    .catch((error) => {
      console.error("Email sending failed:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error sending your inquiry.",
        icon: "error",
      });
    });
};
</script>

<style scoped></style>
<style scoped>
.text-red-500 {
  color: #ef4444;
}
.text-sm {
  font-size: 0.75rem;
}
</style>
