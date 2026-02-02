<template>
	<div class="picture-card">
		<img
			:src="image"
			alt="Excluded Image" />
	</div>
</template>

<script setup>
	defineProps({
		image: {
			type: String,
			required: true,
		},
	});
</script>

<style scoped>
	.picture-card {
		margin: 0;
		padding: 0; /* Remove any padding */
	}

	.picture-card img {
		width: 100%; /* Make the image take the full width of the container */
		height: auto; /* Maintain aspect ratio */
		object-fit: cover;
		display: block; /* Prevents bottom whitespace */
	}
</style>
