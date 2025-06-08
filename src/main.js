// src/main.js
import "./styles.css";
import { initScrollAnimations } from "./util/scrollAnimation.js";
import router from "./router/router.js";


async function main() {
  await router(window.location.pathname);
  initScrollAnimations();
}

// Run main when DOM is parsed
window.addEventListener("DOMContentLoaded", main);

// Handle back/forward navigation
window.addEventListener("popstate", async () => {
  await router(window.location.pathname);
  initScrollAnimations();
});

