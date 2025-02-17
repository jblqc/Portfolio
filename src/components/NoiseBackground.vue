<template>
  <canvas ref="canvas" class="noise-canvas"></canvas>
</template>

<script setup>
  import { onMounted, ref } from "vue";

  const canvas = ref(null);
  const noiseCanvas = document.createElement("canvas");

  const generateNoise = () => {
    const ctx = noiseCanvas.getContext("2d");
    noiseCanvas.width = window.innerWidth;
    noiseCanvas.height = window.innerHeight;

    const noiseData = ctx.createImageData(
      noiseCanvas.width,
      noiseCanvas.height
    );
    const buffer32 = new Uint32Array(noiseData.data.buffer);

    for (let i = buffer32.length - 1; i >= 0; i--) {
      buffer32[i] = Math.random() < 0.5 ? 0 : 0xffffffff;
    }

    ctx.putImageData(noiseData, 0, 0);
  };

  const moveNoise = () => {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext("2d");
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    const x = Math.random() * canvas.value.width;
    const y = Math.random() * canvas.value.height;
    ctx.drawImage(noiseCanvas, -x, -y);

    requestAnimationFrame(moveNoise);
  };

  onMounted(() => {
    if (!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    generateNoise();
    requestAnimationFrame(moveNoise);
    window.addEventListener("resize", generateNoise);
  });
</script>

<style scoped>
  .noise-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.2;
    mix-blend-mode: soft-light;
    z-index: 100000;
  }
</style>
