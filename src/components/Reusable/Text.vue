<template>
  <span :class="[variant]" :style="computedStyle">
    {{ text }}
  </span>
</template>

<script setup>
  import { computed } from "vue";
  import { useHomeStore } from "@/stores/useHomeStore";

  const homeStore = useHomeStore(); // Pinia store

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },

    variant: {
      type: String,
      default: "body-1",
      validator: (value) =>
        [          "display-5",

          "display-4",
          "display-3",
          "display-2",
          "display-1",
          "headline",
          "title",
          "subtitle-1",
          "subtitle-2",
          "body-1",
          "body-2",
          "caption",
          "overline",
        ].includes(value),
    },
    fontStyle: {
      type: String,
      default: "normal",
      validator: (value) => ["normal", "italic", "oblique"].includes(value),
    },
    fontWeight: {
      type: String,
      default: "normal",
      validator: (value) =>
        [
          "normal",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
          "light",
          "regular",
          "medium",
          "semi-bold",
          "bold",
        ].includes(value),
    },
    color: {
      type: String,
      default: "black",
      validator: (value) =>
        [
          "navy-blue",
          "navy-blue-light",
          "yellow-gold",
          "gray","dark-gray",
          "white",
          "black",
        ].includes(value),
    },
    gradient: {
      type: String,
      default: "",
    },
  });

  // ✅ Compute styles dynamically
  const computedStyle = computed(() => {
    const hasGradient = props.gradient.trim() !== "";
    return {
      fontStyle: props.fontStyle,
      fontWeight: props.fontWeight,
      background: hasGradient ? props.gradient : "transparent",
      "-webkit-background-clip": hasGradient ? "text" : "unset",
      "-webkit-text-fill-color": hasGradient ? "transparent" : "inherit",
      color: hasGradient ? "inherit" : getTextColor(),
    };
  });

  // ✅ Check theme mode from Pinia
  const isDarkMode = computed(() => homeStore.isDarkMode);

  // ✅ Dynamic text color based on theme
  const getTextColor = () => {
    if (isDarkMode.value) {
      return props.color === "black"
        ? "#ffffff" // Convert black to white in dark mode
        : props.color === "navy-blue"
        ? "#A0C4FF"
        : props.color === "navy-blue-light"
        ? "#BBD3FF"
        : props.color === "yellow-gold"
        ? "#FFD700"
        : props.color === "gray"
        ? "#4f5d76a8"
        : props.color === "dark-gray"
        ? "#b0b3b8"
        : props.color === "white"
        ? "#ffffff"
        : "#ffffff"; // Default fallback for dark mode
    } else {
      return props.color === "black"
        ? "#22242c"
        : props.color === "navy-blue"
        ? "#1f4761"
        : props.color === "navy-blue-light"
        ? "#275676"
        : props.color === "yellow-gold"
        ? "#FFD700"
        : props.color === "gray"
        ? "#4a576fa8"
        : props.color === "dark-gray"
        ? "#444e5c"
        : props.color === "white"
        ? "#ffffff"
        : "#000000"; // Default fallback for light mode
    }
  };
</script>

<style scoped>
  /* Define text sizes for each variant */
  .display-5 {
    font-size: 5rem;
    line-height: 1.2;
  }
  .display-4 {
    font-size: 3.5rem;
    line-height: 1.2;
  }
  .display-3 {
    font-size: 2.75rem;
    line-height: 1.2;
  }
  .display-2 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  .display-1 {
    font-size: 2rem;
    line-height: 1.2;
  }
  .headline {
    font-size: 1.5rem;
    line-height: 1.2;
  }
  .title {
    font-size: 1.25rem;
    line-height: 1.2;
  }
  .subtitle-1 {
    font-size: 1rem;
    line-height: 1.5;
  }
  .subtitle-2 {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .body-1 {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  .body-2 {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .caption {
    font-size: 0.75rem;
    line-height: 1.5;
  }
  .overline {
    font-size: 0.625rem;
    line-height: 1.5;
  }

  /* Example custom color classes if needed */
  .navy-blue {
    color: #1f4761;
  }
  .navy-blue-light {
    color: #275676;
  }

  .black {
    color: rgb(34, 36, 44);
  }
  .dark-gray {
    color: #444e5c !important;
  }
  .gray {
    color: #4f5d76a8 !important;
  }
  .light-gray {
    color: #ccd1db !important;
  }
  .white {
    color: #ffffff;
  }
  .black {
    color: #000000;
  }
  .link {
    color: #25578f;
  }
</style>
