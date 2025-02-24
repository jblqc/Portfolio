<template>
    <v-text-field
        :reverse="reverseInput"
        v-model="inputValue"
       
        variant="outlined"
        :density="density"
        single-line
        hide-details
        clearable
        placeholder="0.00"
        @input="validateInput"
        @blur="formatOnBlur"
        @click:clear="clearInput"
        type="text"
        :disabled="disabled"
        :error="error"
    >
        <template v-if="showCurrency" v-slot:prepend-inner>
            <span class="peso-sign">₱</span>
        </template>
    </v-text-field>
    <p v-if="error" class="text-red-500 text-sm">
        {{ errorMessages }}
    </p>
</template>

<script>
export default {
    name: "CnumberField",
    props: {
        modelValue: [String, Number],
        decimal: {
            type: Boolean,
            default: true, // By default, format to two decimal places
        },
        reverseInput: {
            type: Boolean,
            default: true, // Default to reverse input (accounting format)
        },
        showCurrency: {
            type: Boolean,
            default: true, // Default to show peso sign (₱)
        },
        applyClass: {
            type: Boolean,
            default: true, // Default is true, so the class is applied by default
        },
        density: {
            type: String,
            default: "compact", // Default density is "compact"
        },
        addCommas: {
            type: Boolean,
            default: true, // Default is to add commas
        },
        disabled: {
            type: Boolean,
            default: false, // Default is not disabled
        },
        error: {
            type: Boolean,
            default: false,
        },
        errorMessages: {
            type: [String, Array],
            default: "",
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            cursorPosition: null, // To store cursor position
        };
    },
    computed: {
        inputValue: {
            get() {
                // When the field is empty or zero, show an empty string for the placeholder
                if (
                    this.modelValue === null ||
                    this.modelValue === undefined ||
                    this.modelValue === "" ||
                    this.modelValue === 0
                ) {
                    return ""; // Display empty string for empty values
                } else {
                    // Format the value with commas for display
                    return this.addCommas
                        ? this.formatWithCommas(String(this.modelValue))
                        : String(this.modelValue);
                }
            },

            set(value) {
                // Prevent the error by checking if value is not null
                if (value === null) {
                    this.$emit("update:modelValue", null);
                } else {
                    // Remove commas before emitting the raw value
                    const rawValue = value.replace(/,/g, "");
                    this.$emit("update:modelValue", rawValue);
                }
            },
        },
    },
    methods: {
        saveCursorPosition(event) {
            this.cursorPosition = event.target.selectionStart; // Save the current cursor position
        },

        restoreCursorPosition(event) {
            this.$nextTick(() => {
                event.target.setSelectionRange(
                    this.cursorPosition,
                    this.cursorPosition
                ); // Restore the cursor position
            });
        },

        validateInput(event) {
            this.saveCursorPosition(event); // Save the cursor position before processing

            let value = event.target.value;
            // Allow only digits and a single decimal point
            let numericValue = value.replace(/[^0-9.]/g, "");

            // If restrictToRange is true, allow only values between 1 and 99
            // if (this.restrictToRange) {
            //  // Convert to integer and restrict to 1-99
            //  const intValue = parseInt(numericValue, 10);
            //  if (intValue > 99) {
            //      numericValue = "99";
            //  } else if (intValue < 1 || isNaN(intValue)) {
            //      numericValue = ""; // Reset if value is below 1
            //  }
            // }

            // Ensure only one decimal point is allowed
            const parts = numericValue.split(".");

            if (parts.length > 2) {
                value = parts[0] + "." + parts.slice(1).join("");
            } else {
                value = numericValue;
            }

            // Emit the raw numeric value without commas while typing
            this.$emit("update:modelValue", value === "" ? null : value);

            this.restoreCursorPosition(event); // Restore the cursor position after processing
        },

        formatOnBlur() {
            // Check if the input is empty or invalid and prevent NaN
            if (
                this.modelValue === "" ||
                this.modelValue === null ||
                isNaN(this.modelValue)
            ) {
                this.$emit("update:modelValue", null); // Reset to null for empty or invalid input
            } else if (this.decimal && !isNaN(this.modelValue)) {
                // Format to two decimal places only when the user leaves the field
                const formattedValue = parseFloat(this.modelValue).toFixed(2);
                this.$emit("update:modelValue", formattedValue);
            }
        },

        // Function to format the number with commas
        formatWithCommas(value) {
            // Add commas to the number for display purposes
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        clearInput() {
            this.$emit("update:modelValue", null); // Clear the input value
        },
    },
};
</script>

<style scoped>
.peso-sign {
    font-size: 16px;
    color: #333; /* Adjust the color as needed */
}
.text-red-500 {
    color: #ef4444;
}
.text-sm {
    font-size: 0.75rem;
}
</style>