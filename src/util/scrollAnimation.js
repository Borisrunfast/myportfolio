// src/util/scrollAnimation.js

// Initializes scroll-triggered animations for elements marked with data-animate
export function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0');
        entry.target.classList.add(
          'animate-in',
          'fade-in',
          'slide-in-from-bottom',
          'duration-700'
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate]').forEach(el => {
    // ensure initial hidden state
    el.classList.add('opacity-0');
    observer.observe(el);
  });
}
