import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useStoriesStore = defineStore("stories", {
  state: () => ({
    stories: [],
    loading: false,
  }),

  actions: {
    async fetchStories() {
      this.loading = true;
      const { data, error } = await supabase.from("stories").select("*").order("date", { ascending: false });
      if (!error) this.stories = data;
      this.loading = false;
    },

    async fetchAllData() {
      if (this.stories.length) return;
      this.loading = true;
      await this.fetchStories();
      this.loading = false;
    },
    
    async addStory(storyData) {
    this.loading = true;
    const { data, error } = await supabase
      .from('stories')
      .insert([storyData])
      .select();
    
    if (!error) {
      this.stories.unshift(data[0]); // Add to beginning of array
    }
    this.loading = false;
    return { data, error };
  }
  },
});
