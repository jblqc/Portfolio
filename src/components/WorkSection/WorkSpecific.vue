<template>
	<div v-if="isDataLoaded">
		<container class="mb-5">
			<v-row justify="center">
				<v-col cols="7">
					<v-row justify="center">
						<v-col
							cols="12"
							class="text-center">
							<div class="project-logo-container">
								<img
									crossorigin="anonymous"
									loading="eager"
									decoding="async"
									ref="projectImage"
									:src="project.image"
									:alt="project.title"
									class="project-logo"
									:class="{ 'project-logo2': project.id === 13 }"
									@load="extractShadowColor"
									:style="{ boxShadow: `0px 10px 30px ${imageShadowColor}` }" />
							</div>

							<Text
								:text="project.title"
								variant="display-2"
								fontWeight="500"
								class="fraunces"
						/></v-col>
					</v-row>

					<v-row class="mb-n2">
						<v-col class="text-right d-none d-md-flex">
							<Text
								text="── ౨"
								variant="subtitle-1"
								:color="'gray'" />
						</v-col>
						<v-col class="text-center">
							<Text
								:text="project.caption"
								variant="subtitle-1"
								fontWeight="700"
								:color="'black'" />
						</v-col>
						<v-col class="text-left d-none d-md-flex">
							<Text
								text="ৎ ──"
								variant="subtitle-1"
								:color="'gray'" />
						</v-col>
					</v-row>

					<v-row class="justify-center">
						<BackButton @click="goBack" />
					</v-row>

					<v-row class="justify-center">
						<v-col cols="12">
							<v-row
								><Text
									:text="projectDetails.long_description1"
									variant="subtitle-1"
									fontWeight="400"
									:color="'black'"
									class="my-5 description"
							/></v-row>
							<v-row>
								<Text
									:text="projectDetails.long_description2"
									variant="subtitle-1"
									fontWeight="400"
									:color="'black'"
									class="mb-5 description"
							/></v-row>

							<v-container
								class="mt-3 mb-3 details-card"
								:class="{ 'details-card-black': isDarkMode }">
								<v-row no-gutters>
									<v-col
										v-for="(detail, index) in projectDetailsArray"
										:key="index"
										cols="4"
										class="text-center">
										<div class="detail">
											<Text
												:text="detail.label"
												variant="caption"
												fontWeight="600"
												:color="'gray'"
												class="detail-label" />
											<Text
												:text="detail.text"
												variant="caption"
												fontWeight="600"
												:color="'black'"
												class="detail-text" />
										</div>
									</v-col>
								</v-row>
							</v-container>

							<Text
								v-if="cleanProjectLinks.length > 0"
								text="LINKS"
								variant="caption"
								fontWeight="600"
								:color="'gray'"
								class="ml-3" />

							<div
								v-if="cleanProjectLinks.length > 0"
								class="mt-3">
								<v-col
									v-for="(linkObj, index) in cleanProjectLinks"
									:key="index">
									<div
										class="mt-n4"
										style="display: flex; align-items: center">
										<Text
											:text="linkObj.text"
											variant="subtitle-1"
											fontWeight="600"
											:color="'black'" />
										<div
											class="mt-1 ml-2 go-button"
											:class="{ 'go-button-black': isDarkMode }"
											@click="openLink(linkObj.url)"
											style="display: flex; align-items: center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												:fill="isDarkMode ? 'white' : 'black'"
												width="20">
												<path
													fill-rule="evenodd"
													d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
													clip-rule="evenodd" />
											</svg>
										</div>
									</div>
								</v-col>
							</div>

							<v-row
								class="mt-5"
								v-if="project.title === 'F4S: Fingerprint for Success'">
								<img
									src="@/assets/images/project-specific-image/f4s1.png"
									alt="Project GIF"
									class="styled-image2" />
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>

			<v-row
				justify="center"
				v-if="project.id === 1 || project.id === 11">
				<Text
					text="Watch the Video"
					variant="subtitle-1"
					fontWeight="600" />
				<v-col
					cols="12"
					class="text-center">
					<div class="video-container">
						<iframe
							:src="
								project.id === 1
									? 'https://drive.google.com/file/d/10t7K4qqqmtNaUIH439ZJW35s2tDcK9s1/preview'
									: 'https://www.youtube.com/embed/4wkGtHNvngI'
							"
							frameborder="0"
							allowfullscreen
							class="responsive-iframe design3"></iframe>
					</div>
				</v-col>
			</v-row>

			<v-row
				v-if="designOneImages.length > 0"
				justify="center"
				class="justify-center d-flex">
				<div
					v-for="(imageUrl, index) in designOneImages"
					:key="index"
					class="mt-4">
					<PictureCard
						:image="imageUrl"
						class="design2" />
				</div>
			</v-row>

			<v-row
				justify="center"
				v-if="project.title === 'Good Food'">
				<img
					src="@/assets/images/project-specific-image/goodfoodbg.svg"
					alt="Loading..."
					class="my-n2 responsive-goodfood-image" />
			</v-row>

			<v-row
				style="justify-content: space-evenly"
				v-if="designTwoImages.length > 0">
				<v-col
					v-for="(imageUrl, index) in designTwoImages"
					:key="index"
					cols="4"
					:class="{
						'dark-mode-card': isDarkMode,
						'no-box-shadow': project.id === 9,
					}">
					<PictureCard
						:image="imageUrl"
						class="design2" />
				</v-col>
			</v-row>
		</container>

		<FlickingCarousel :images="images">
			<template #default="{ image, index }">
				<div
					:key="index"
					class="panel">
					<img
						:src="image"
						alt="Carousel Image"
						class="carousel-image"
						loading="lazy"
						decoding="async" />
				</div>
			</template>
		</FlickingCarousel>

		<v-row
			class="mt-5"
			v-if="project.title === 'NecessiPick'">
			<img
				src="@/assets/images/project-specific-image/nes.png"
				alt="Project GIF"
				class="styled-image" />
		</v-row>
	</div>

	<v-row
		justify="center"
		v-else>
		<img
			src="@/assets/images/loader.gif"
			alt="Loading..."
			class="loader-gif" />
	</v-row>
</template>

<script setup>
	import { computed, ref, onMounted, watch, nextTick } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useWorkStore } from '@/stores/useWorkStore';
	import { useHomeStore } from '@/stores/useHomeStore';

	import BackButton from '../Reusable/BackButton.vue';
	import Text from '../Reusable/Text.vue';
	import ColorThief from 'colorthief';
	import FlickingCarousel from '../Reusable/Carousel.vue';
	import PictureCard from '../Reusable/PictureCard.vue';

	const route = useRoute();
	const router = useRouter();

	const workStore = useWorkStore();
	const homeStore = useHomeStore();

	const projectImage = ref(null);
	const imageShadowColor = ref('rgba(0, 0, 0, 0.15)');

	const currentProjectID = computed(() => Number(route.params.id));
	const isDarkMode = computed(() => homeStore.isDarkMode);

	const images = ref([]);
	const designOneImages = ref([]);
	const designTwoImages = ref([]);
	const isDataLoaded = ref(false);

	const openLink = url => window.open(url, '_blank');
	const goBack = () => router.push('/work');

	// ✅ fix duplicate key "2" bug: keep only one mapping
	const projectLinkTexts = {
		1: ['Springer - Our Published Paper', 'NecessiPick - Compare Products'],
		2: ['Vincafe - A modern take on branding'],
		3: ['NEON - All about Modernity', ' View the Concept'],
		4: [' View on Behance'],
		5: ['Good Food - Create your own Recipe'],
		6: ['Promotional Post - View the Template'],
		9: [' View on Behance'],
		10: [' View on Behance'],
		11: [
			'MakaTurismo - View the City of Makati',
			"Makati LGU kicks off 'Visit a Better Makati' tourism campaign",
		],
		13: [' View on Behance'],
		14: ['Love Laguna - View the City of Laguna'],
	};

	const exclusionList = [
		'cjp1.png',
		'cjp2.png',
		'cjp3.png',
		'cjp5.png',

		'nes1.png',
		'nes2.png',
		'nes3.png',

		// UPDATED portrait names
		'np3_v.png',
		'np4_v.png',

		'll1.png',
		'll10.png',
		'll9.png',

		// UPDATED portrait names
		'll5_v.png',
		'll6_v.png',
		'll7_v.png',
		'll8_v.png',

		'gf1.png',
		'gf2.png',

		// UPDATED portrait names
		'gf7_v.png',
		'gf5_v.png',
		'gf6_v.png',

		'sp1.png',
		'sp2.png',
		'sp3.png',

		'mak1.png',
		'mak2.png',
		'tourapp1.png',
		'tourapp2.png',

		// UPDATED portrait names
		'mak6_v.png',
		'mak9_v.png',
		'mak7_v.png',
		'mak8_v.png',
		'mak10_v.png',
		'mak11_v.png',

		'fid1.png',
		'e1.png',
		'e4.png',
		'e6.png',
		'sm1.png',
		'sm2.png',
		'fl1.png',
		'fl2.png',
		'neon1.png',
		'neon2.png',
		'neon3.png',
		'neon4.png',
		'neon5.png',
		'mabuhay1.png',
		'mabuhay2.png',
		'mabuhay4.png',
		'mabuhay3.png',
		'mabuhay8.png',
	];

	const project = computed(() =>
		workStore.projects.find(p => p.id === currentProjectID.value),
	);

	const projectDetails = computed(() =>
		workStore.workSpecific.find(w => w.project_id === project.value?.id),
	);

	const projectDetailsArray = computed(() => [
		{ label: 'TYPE', text: projectDetails.value?.type },
		{ label: 'ROLE', text: projectDetails.value?.role },
		{ label: 'TIMELINE', text: projectDetails.value?.timeline },
	]);

	const cleanProjectLinks = computed(() => {
		if (!project.value?.link) return [];
		const links = project.value.link.replace(/[()]/g, '').split(',');
		const texts = projectLinkTexts[project.value.id] || [];
		return links.map((link, index) => ({
			url: link.trim(),
			text: texts[index] || link.trim(),
		}));
	});
	const fileNameOf = url => {
		const clean = decodeURIComponent(url || '');
		const last = clean.split('/').pop() || '';
		return last.split('?')[0].split('#')[0].toLowerCase(); // ✅ normalize
	};

	// ✅ fast + reliable lookups
	const excludedSet = new Set(exclusionList.map(x => x.toLowerCase()));

	// ✅ portrait = excluded files that end with _v.png
	const isPortrait = url => {
		const name = fileNameOf(url);
		return excludedSet.has(name) && name.includes('_v');
	};

	// ✅ excluded = anything in the excluded list (portrait OR not)
	const isExcluded = url => excludedSet.has(fileNameOf(url));

	function hydrateImages(projectId) {
		const all = workStore.projectImages[projectId] ?? [];

		const excluded = all.filter(isExcluded);
		const carousel = all.filter(u => !isExcluded(u));

		const verticals = excluded.filter(isPortrait); // excluded + _v
		const excludedLandscapes = excluded.filter(u => !isPortrait(u)); // excluded but not _v

		images.value = carousel; // ✅ only non-excluded
		designTwoImages.value = verticals; // ✅ portrait outside
		designOneImages.value = excludedLandscapes; // ✅ excluded landscape outside

		console.log('ALL:', all.map(fileNameOf));
		console.log('EXCLUDED:', excluded.map(fileNameOf));
		console.log('VERTICAL:', verticals.map(fileNameOf));
		console.log('CAROUSEL:', carousel.map(fileNameOf));
	}

	function extractShadowColor() {
		const img = projectImage.value;
		if (!img) return;

		try {
			const colorThief = new ColorThief();
			const palette = colorThief.getPalette(img, 8);
			if (!palette?.length) return;

			const brightest = palette.reduce(
				(best, c) => {
					const b = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
					return b > best.b ? { c, b } : best;
				},
				{ c: [0, 0, 0], b: 0 },
			).c;

			imageShadowColor.value = `rgba(${brightest[0]}, ${brightest[1]}, ${brightest[2]}, 0.5)`;
		} catch (e) {
			// CORS-tainted canvas can throw
			imageShadowColor.value = 'rgba(255, 255, 255, 0.35)';
		}
	}

	async function init() {
		isDataLoaded.value = false;
		await workStore.fetchAllData();
		hydrateImages(currentProjectID.value);
		await nextTick();
		isDataLoaded.value = true;
	}

	onMounted(init);
	watch(currentProjectID, init);
</script>

<style scoped>
	.work-details {
		padding: 20px;
	}
	.video-container {
		position: relative;
		height: 300px;
		overflow: hidden;
	}
	.responsive-goodfood-image {
		max-width: 900px; /* Default desktop size */
		width: 100%;
		height: auto;
	}

	@media (max-width: 768px) {
		.responsive-goodfood-image {
			max-width: 450px; /* Mobile size */
		}
	}
	.responsive-iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}
	.project-logo-container {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
		padding: 25px;
		/* background-color: #ffff; */
	}
	.project-logo {
		border-radius: 15px;
		transition: all 0.3s ease-in-out;
		background-color: #fff;
		max-height: 110px;
		max-width: 190px;
	}
	.project-logo2 {
		border-radius: 15px;
		transition: all 0.3s ease-in-out;
		background-color: #000000;
		max-height: 110px;
		max-width: 190px;
	}
	.image-row {
		display: flex;
		flex-wrap: wrap;
		width: 75%;
		gap: 60px; /* Adjust spacing as needed */
	}

	.design3 {
		overflow: hidden; /* Hide any overflow */
		position: relative;
		border-radius: 20px;
	}

	.project-title {
		font-family: 'Fraunces', serif;
		font-size: 50px;
		font-weight: 300;
		line-height: 50px;
	}
	.no-box-shadow {
		box-shadow: none; /* Remove box shadow */
	}
	.project-caption {
		font-size: 18px;
		font-weight: 500;
		color: gray;
	}
	.detail {
		display: grid;
		grid-template-rows: auto auto; /* Two rows for label and text */
	}
	.details-card {
		background: linear-gradient(
			90deg,
			rgba(255, 233, 244, 0.4) 0%,
			rgba(234, 243, 255, 0.7) 100%
		);
		border-radius: 10px;
	}

	.detail {
		font-size: 16px;
		margin-bottom: 8px;
		display: flex;
		flex-direction: column; /* Ensures label is always above text */
		gap: 4px;
	}

	.label {
		font-weight: bold;
		margin-right: 8px;
	}
	.styled-image {
		width: 100%;
		height: 100%;
		filter: drop-shadow(
			0px -10px 15px rgba(9, 255, 9, 0.7)
		); /* Green shadow on upper part */
	}
	.styled-image2 {
		width: 100%;
		height: 100%;
		filter: drop-shadow(0px -10px 15px rgba(165, 9, 255, 0.13));
	}
</style>
