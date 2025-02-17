<template>
  <section class="contact-card">
    <v-container>
      <v-row align="center" class="d-flex flex-column-reverse flex-md-row">
        <!-- Left Section -->
        <v-col cols="12" md="5" class="text-left">
          <Text
            :text="'Say hi!'"
            variant="display-4"
            fontWeight="bold"
            :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
            class="tracking-wider"
          />
          <div class="mt-2 mb-5 contact-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="url(#gradient)"
              fill="none"
              width="20"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#0072FF" />
                  <stop offset="100%" stop-color="#DE00FF" />
                </linearGradient>
              </defs>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <Text
              :text="'@jenneferlee23'"
              variant="title"
              fontWeight="500"
              :gradient="'linear-gradient(90deg, #5b7fff, #f44f8a)'"
              class="tracking-wider ml-2"
            />
          </div>
          <Text
            :text="'Want to create something awesome? Or, do you have any query? Drop an email.'"
            variant="headline"
            fontWeight="400"
            :color="'gray'"
          />
          <router-link to="/inquiry">
            <v-btn class="mt-6 gradient-btn px-6 py-2 rounded-pill shadow-lg">
              Send Inquiry
            </v-btn>
          </router-link>
        </v-col>

        <!-- Right Section: Chat Image -->
        <v-col cols="12" md="6" class="d-flex justify-center">
          <div class="chat-image">
            <img
              :src="chatImage"
              alt="Chat Icon"
              class="rounded-lg shadow-lg"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
  import { ref } from "vue";
  import Text from "../Reusable/Text.vue";

  // Image path
  const chatImage = new URL("@/assets/images/chat.png", import.meta.url).href;
</script>

<style scoped>
  /* Main Container */
  .contact-card {
    background: linear-gradient(
      90deg,
      rgba(255, 233, 244, 0.4) 0%,
      rgba(234, 243, 255, 0.7) 100%
    );
    padding: 2rem;
    border-radius: 15px;
  }

  /* Contact Links */
  .contact-links {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }

  /* Inquiry Button Gradient */
  .gradient-btn {
    background: linear-gradient(
      90deg,
      rgba(0, 114, 255, 0.8),
      rgba(222, 0, 255, 0.8)
    );
    color: white;
  }

  /* Chat Image */
  .chat-image {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  }

  .chat-image img {
    width: 100%;
    max-width: 370px;
    height: auto;
    object-fit: contain;
  } /* Medium Screens (Tablets) */
  @media (max-width: 960px) {
    .chat-image img {
      width: 300px;
    }
  }

  /* Small Screens (Phones) */
  @media (max-width: 600px) {
    .chat-image img {
      width: 200px;
    }
  }
</style>
