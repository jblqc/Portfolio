<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <v-card variant="tonal" color="indigo" class="pa-6">
          <v-card-title class="text-center mb-6">
            <h2 class=" font-bold">Story Management</h2>
          </v-card-title>

          <!-- Login Form (shown when not authenticated) -->
          <v-form v-if="!authenticated" @submit.prevent="login" ref="loginForm">
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[required]"
              variant="underlined"
              density="compact"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              :rules="[required]"
              type="password"
              variant="underlined"
              density="compact"
              class="mb-4"
            ></v-text-field>
            <div class="d-flex justify-center">
              <ButtonGradient
                text="Login"
                :iconSrc="linkedinIcon"
                gradient="linear-gradient(270deg, rgb(240, 214, 255) 0%, rgb(211, 205, 255) 100%)"
                textColor="#a060c4"
                :loading="loading"
                type="submit" class="px-10"
              />
            </div>
          </v-form>

          <!-- Story Form (shown when authenticated) -->
          <v-form v-else @submit.prevent="addStory" ref="storyForm">
            <v-text-field
              v-model="story.title"
              label="Title"
              :rules="[required]"
              density="compact"

              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="story.caption"
              label="Caption"
              :rules="[required]"
              density="compact"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="story.date"
              label="Date (YYYY-MM-DD)"
              :rules="[required, dateFormat]"
              density="compact"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="story.tag"
              label="Tag"
              :rules="[required]"
              density="compact"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="story.link"
              label="Link"
              :rules="[required, urlFormat]"
              density="compact"
              class="mb-2"
            ></v-text-field>

         
<div class="d-flex justify-center">
              <ButtonGradient
                text="              Add Story
"
                :iconSrc="linkedinIcon"
                gradient="linear-gradient(270deg, rgb(240, 214, 255) 0%, rgb(211, 205, 255) 100%)"
                textColor="#a060c4"
                :loading="loading"
                type="submit" class="px-10"
              />
            </div>
            <v-btn color="error"  class="mt-2" @click="confirmLogout">
              Logout
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import ButtonGradient from "../Reusable/ButtonGradient.vue";

// Authentication
const authenticated = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);

// Story form
const story = ref({
  title: "",
  caption: "",
  date: "",
  tag: "",
  link: "",
});

// Form validation rules
const required = (value) => !!value || "This field is required.";
const dateFormat = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(value) || "Date must be in YYYY-MM-DD format";
};
const urlFormat = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return "Please enter a valid URL";
  }
};

// Show success notification
const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 2000,
    showConfirmButton: false,
    background: "#f5f5f5",
    backdrop: `
      rgba(0,0,0,0.4)
      left top
      no-repeat
    `,
  });
};

// Show error notification
const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    background: "#f5f5f5",
    backdrop: `
      rgba(0,0,0,0.4)
      left top
      no-repeat
    `,
  });
};

// Login function
const login = async () => {
  loading.value = true;

  try {
    if (
      username.value === import.meta.env.VITE_ADMIN_USERNAME &&
      password.value === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      authenticated.value = true;
      showSuccess("Login successful!");
    } else {
      showError("Invalid credentials");
    }
  } catch (err) {
    showError("An error occurred during login");
  } finally {
    loading.value = false;
  }
};

// Confirm logout
const confirmLogout = () => {
  Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
    background: "#f5f5f5",
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
  });
};

// Logout function
const logout = () => {
  authenticated.value = false;
  username.value = "";
  password.value = "";
  showSuccess("Logged out successfully!");
};

// Add story function
const addStory = async () => {
  loading.value = true;

  try {
    const { data, error: supabaseError } = await supabase
      .from("stories")
      .insert([story.value])
      .select();

    if (supabaseError) throw supabaseError;

    showSuccess("Story added successfully!");
    story.value = {
      title: "",
      caption: "",
      date: "",
      tag: "",
      link: "",
    };
  } catch (err) {
    showError(err.message || "Failed to add story");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
