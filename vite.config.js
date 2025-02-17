import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify"; // ✅ Import Vuetify plugin
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // ✅ Enables automatic Vuetify component imports
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensures '@/components' works correctly
    },
  },
});
