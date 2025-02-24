<template>
  <v-text-field
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Enter"
    variant="outlined"
    density="compact"
    single-line
    hide-details
    clearable
    :error="error"
  />
  <p v-if="error" class="text-red-500 text-sm">
    {{ errorMessages }}
  </p>
</template>

<script setup>
  const props = defineProps({
    modelValue: [String, Number],
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: [String, Array],
      default: "",
    },
  });
</script>

<style scoped>
  .text-red-500 {
    color: #ef4444;
  }
  .text-sm {
    font-size: 0.75rem;
  }
</style>
