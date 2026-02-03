<template>
	<section class="py-16">
		<v-container class="mx-auto text-center">
			<v-row
				align="center"
				justify="space-between">
				<v-col cols="auto">
					<Text
						:text="'CURRENT PROJECTS'"
						variant="subtitle-2"
						fontWeight="bold"
						:color="'gray'"
						class="tracking-wider" />
				</v-col>
				<v-col
					cols="auto"
					class="text-right">
					<Text
						:text="'All Works ▸'"
						variant="caption"
						fontWeight="bold"
						:gradient="'linear-gradient(90deg, rgba(0,198,255,0.5466561624649859) 0%, rgba(0,114,255,0.8379726890756303) 51%, rgba(222,0,255,0.3085609243697479) 100%)'"
						class="tracking-wider cursor"
						@click="goToWork" />
				</v-col>
			</v-row>

			<!-- Grid Layout with 3 columns, 2 rows -->
			<div class="projects-grid">
				<div
					v-for="project in workStore.projects.slice(0, 6)"
					:key="project.id"
					class="relative project-card group"
					:class="{ 'dark-mode-card': isDarkMode }">
					<!-- Normal Card Content -->
					<div class="project-content">
						<div class="project-logo">
							<img
								:src="project.image"
								:alt="project.title"
								class="logo-img"
								:class="{
									'logo-img-kimchi': project.id === 6,
									'logo-img-cat': project.id === 4,
								}" />
						</div>
						<div class="mt-9">
							<Text
								:text="project.title"
								variant="subtitle-1"
								fontWeight="700"
								:color="'black'" />
						</div>
						<Text
							:text="project.caption"
							variant="caption"
							fontWeight="500"
							:color="'gray'" />
					</div>

					<!-- Hover Effect: Blur + Details -->
					<div class="hover-overlay">
						<div class="hover-content">
							<Text
								:text="project.title"
								variant="subtitle-1"
								fontWeight="700"
								:color="'black'" />
							<Text
								:text="project.description"
								variant="caption"
								fontWeight="500"
								:color="'gray'" />
							<Text
								:text="project.caption"
								variant="overline"
								fontWeight="500"
								:color="'gray'"
								class="mt-2" />

							<div
								class="go-button"
								:class="{ 'go-button-black': isDarkMode }"
								@click="navigateToProject(project.id)">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									width="20"
									:fill="isDarkMode ? 'white' : 'black'">
									<path
										fill-rule="evenodd"
										d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
										clip-rule="evenodd" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</v-container>
	</section>
</template>

<script setup>
	import { computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useHomeStore } from '@/stores/useHomeStore';
	import { useWorkStore } from '@/stores/useWorkStore'; // Import store
	import Text from '../Reusable/Text.vue';

	const router = useRouter();
	const homeStore = useHomeStore();
	const workStore = useWorkStore(); // Use work store

	const goToWork = () => {
		router.push('/work');
	};
	const navigateToProject = projectId => {
		router.push(`/work/${projectId}`);
	};
	const isDarkMode = computed(() => homeStore.isDarkMode);
	onMounted(async () => {
		await workStore.fetchProjects();
	});
</script>
