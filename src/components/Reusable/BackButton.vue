<template>
  <button class="glassmorphic-button">Back</button>
</template>

<style scoped>
  .glassmorphic-button {
    font-size: 12px;
    font-weight: bold;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 50px; /* Rounded pill shape */
    background: linear-gradient(
      135deg,
      rgba(255, 100, 100, 0.4),
      rgba(255, 200, 150, 0.2)
    );
    backdrop-filter: blur(10px); /* Glass effect */
    box-shadow: 0px 4px 10px rgba(255, 100, 100, 0.3),
      0px -4px 10px rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .glassmorphic-button::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 30%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50px;
    filter: blur(10px);
    opacity: 0.8;
  }

  .glassmorphic-button:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(255, 100, 100, 0.5),
      0px -6px 15px rgba(255, 255, 255, 0.3);
  }
</style>
