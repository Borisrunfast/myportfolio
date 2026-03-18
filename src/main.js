import { initScrollAnimations } from "./util/scrollAnimation.js";
import router from "./router/router.js";

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

async function main() {
  await router(window.location.pathname);
  initScrollAnimations();
  initHeaderScroll();
}

// Run main when DOM is parsed
window.addEventListener("DOMContentLoaded", main);

// Handle back/forward navigation
window.addEventListener("popstate", async () => {
  await router(window.location.pathname);
  initScrollAnimations();
  initHeaderScroll();
});

