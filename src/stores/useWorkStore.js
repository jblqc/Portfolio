import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;

export const useWorkStore = defineStore("work", {
  state: () => ({
    categories: [],
    projects: [],
    workSpecific: [],
    projectImages: [],
    loading: false,
  }),

  actions: {
    async fetchCategories() {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error) this.categories = data;
    },

    async fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (!error) {
        this.projects = data.map((project) => ({
          ...project,
          image: project.image.startsWith("http")
            ? project.image
            : `${SUPABASE_STORAGE_URL}/specific-project-logo/${project.image}`,
        }));
      }
    },

    async fetchWorkSpecific() {
      const { data, error } = await supabase
        .from("work_specific")
        .select("*")
        .order("id", { ascending: true });

      if (!error) this.workSpecific = data;
    },
    async fetchProjectImages() {
      const { data, error } = await supabase
        .from("project_images")
        .select("project_id, image")
        .order("project_id", { ascending: true });

      if (!error) {
        // Organize images by project_id
        this.projectImages = data.reduce((acc, item) => {
          const { project_id, image } = item;
          if (!acc[project_id]) {
            acc[project_id] = [];
          }
          acc[project_id].push(image);
          return acc;
        }, {});
      }
    },
    // ✅ Fetch all data in parallel for faster performance
    async fetchAllData() {
      if (
        this.projects.length &&
        this.workSpecific.length &&
        this.categories.length &&
        this.projectImages.length
      ) {
        return; // ✅ Skip fetching if data is already available
      }
      this.loading = true;
      await Promise.all([
        this.fetchCategories(),
        this.fetchProjects(),
        this.fetchWorkSpecific(),
        this.fetchProjectImages(),
      ]);
      this.loading = false;
    },
  },
});

// ✅ Fetch data in advance before app loads
