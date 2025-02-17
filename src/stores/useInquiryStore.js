import { defineStore } from "pinia";

export const useInquiryStore = defineStore("inquiry", {
  state: () => ({
    name: "",
    email: "",
    lookingFor: "",
    selectedProjects: [],
    hasDocuments: "",
    timeline: "",
    budget: "",
    message: "",
  }),
  actions: {
    resetForm() {
      this.name = "";
      this.email = "";
      this.lookingFor = "";
      this.selectedProjects = [];
      this.hasDocuments = "";
      this.timeline = "";
      this.budget = "";
      this.message = "";
    },
  },
});
