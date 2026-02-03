import { defineStore } from 'pinia';

const env = {
	jobStatus: import.meta.env.VITE_JOB_STATUS === 'true',
	company: import.meta.env.VITE_COMPANY || 'Freelance',
	position: import.meta.env.VITE_POSITION || 'Software Engineer',
	companyLink: import.meta.env.VITE_COMPANY_LINK || '#',
};

export const useHomeStore = defineStore('home', {
	state: () => ({
		jobStatus: env.jobStatus,
		company: env.company,
		position: env.position,
		companyLink: env.companyLink,
		isDarkMode: localStorage.getItem('theme') === 'dark' || false,
	}),
	actions: {
		toggleTheme() {
			this.isDarkMode = !this.isDarkMode;
			const newTheme = this.isDarkMode ? 'dark' : 'light';

			document.documentElement.setAttribute('data-theme', newTheme);
			localStorage.setItem('theme', newTheme);

			theme.global.name.value = newTheme;
		},
	},
});
