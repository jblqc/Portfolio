import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';

const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;
const PROJECT_IMAGES_BASE = `${SUPABASE_STORAGE_URL}/project-image/project-specific/`;

export const useWorkStore = defineStore('work', {
	state: () => ({
		categories: [],
		projects: [],
		workSpecific: [],
		projectImages: {},
		loading: false,
		loaded: false,
	}),

	actions: {
		async fetchCategories() {
			const { data, error } = await supabase.from('categories').select('*');
			if (error) console.error(error);
			else this.categories = data ?? [];
		},

		async fetchProjects() {
			const { data, error } = await supabase
				.from('projects')
				.select('*')
				.order('id', { ascending: true });

			if (error) {
				console.error(error);
				return;
			}

			this.projects = (data ?? []).map(project => ({
				...project,
				image: project.image?.startsWith('http')
					? project.image
					: `${SUPABASE_STORAGE_URL}/specific-project-logo/${project.image}`,
			}));
		},

		async fetchWorkSpecific() {
			const { data, error } = await supabase
				.from('work_specific')
				.select('*')
				.order('id', { ascending: true });

			if (error) console.error(error);
			else this.workSpecific = data ?? [];
		},

		async fetchProjectImages() {
			const { data, error } = await supabase
				.from('project_images')
				.select('project_id, image') // image is text[]
				.order('project_id', { ascending: true });

			if (error) {
				console.error(error);
				return;
			}

			const map = {};

			for (const row of data ?? []) {
				const projectId = row.project_id;
				const images = Array.isArray(row.image) ? row.image : [];

				const urls = images
					.filter(Boolean)
					.map(filename =>
						filename.startsWith('http')
							? filename
							: `${PROJECT_IMAGES_BASE}${filename}`,
					);

				if (!map[projectId]) map[projectId] = [];
				map[projectId].push(...urls); // ✅ flatten ONCE
			}

			this.projectImages = map;
		},

		async fetchAllData() {
			if (this.loaded) return;

			this.loading = true;
			try {
				await Promise.all([
					this.fetchCategories(),
					this.fetchProjects(),
					this.fetchWorkSpecific(),
					this.fetchProjectImages(),
				]);
				this.loaded = true;
			} finally {
				this.loading = false;
			}
		},
	},
});
