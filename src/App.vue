<script setup>
	import { computed } from 'vue';
	import { useHomeStore } from '@/stores/useHomeStore';
	import NavBar from '@/components/NavBar.vue';
	import Footer from '@/components/Footer.vue';

	import { Analytics } from '@vercel/analytics/vue';
	import { SpeedInsights } from '@vercel/speed-insights/vue';

	const homeStore = useHomeStore();

	const isDarkMode = computed(() => homeStore.isDarkMode);
	const backgroundClass = computed(() =>
		homeStore.isDarkMode ? 'noise-bg-dark' : 'noise-bg-light',
	);

	/**
	 * ✅ Only true when:
	 * - production build
	 * - deployed on Vercel
	 */
	const isVercelProd =
		import.meta.env.PROD && import.meta.env.VITE_VERCEL === '1';
</script>

<template>
	<div :class="backgroundClass">
		<img
			src="@/assets/images/header-gradient.svg"
			alt="Header Gradient"
			class="header-gradient"
			fetchpriority="high"
			loading="eager"
			decoding="async"
			width="1920"
			height="700" />

		<div class="content-container">
			<NavBar />

			<!-- ✅ Vercel only -->
			<Analytics v-if="isVercelProd" />
			<SpeedInsights v-if="isVercelProd" />

			<v-app :class="{ 'dark-mode': isDarkMode }">
				<router-view v-slot="{ Component }">
					<component :is="Component" />
				</router-view>
			</v-app>

			<Footer />
		</div>

		<img
			src="@/assets/images/footer-gradient.svg"
			alt="Footer Gradient"
			class="footer-gradient"
			decoding="async"
			loading="eager"
			fetchpriority="high"
			width="1920"
			height="700" />
	</div>
</template>

<style>
	/* ✅ EXACTLY your CSS (unchanged) */
	/* Light Mode */
	.noise-bg-light {
		width: 100%;
		min-height: 100vh; /* ✅ Allow content to extend */
		overflow-y: auto; /* ✅ Enable scrolling */
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.382),
			rgb(255, 255, 255),
			rgba(255, 255, 255, 0.956)
		);
	}

	.v-timeline-divider__after {
		background-color: rgba(var(--v-border-color), var(--v-border-opacity));
	}
	.dark-mode .v-timeline-divider__after {
		background-color: white !important;
	}
	/* Dark Mode */
	.noise-bg-dark {
		width: 100%;
		min-height: 100vh; /* ✅ Allow content to extend */
		overflow-y: auto; /* ✅ Enable scrolling */
		background: linear-gradient(to top, rgba(0, 0, 0, 0.918), rgb(0, 0, 0));
	}
	/* Light Mode Noise */
	.noise-bg-light::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		pointer-events: none;
		min-height: 100vh; /* Allow content to expand */
		overflow: auto; /* Allow scrolling */
		background: url('https://grainy-gradients.vercel.app/noise.svg');
		mix-blend-mode: multiply;
		filter: contrast(180%) brightness(120%);
		opacity: 0.2;
	}

	/* Dark Mode Noise */
	.noise-bg-dark::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		pointer-events: none;
		min-height: 100vh;
		overflow: auto;
		background: url('https://grainy-gradients.vercel.app/noise.svg');
		mix-blend-mode: screen;
		filter: contrast(250%) brightness(50%);
		opacity: 0.15;
	}

	.header-gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 700px;
		object-fit: cover;
		pointer-events: none;
	}
	.footer-gradient {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 700px;
		object-fit: cover;
		pointer-events: none;
	}
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		display: block;

		max-width: 740px;
		margin: 0 auto;
		min-height: 100vh;
		margin-top: 160px;
		padding: 20px;
	}
	.v-container {
		padding: 0px !important;
	}
</style>
