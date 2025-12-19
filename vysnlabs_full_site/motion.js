// motion.js

// Intersection Observer for scroll-based fade-in animations
const fadeObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // stop observing once visible
      }
    });
  },
  {
    threshold: 0.15 // trigger when 15% of the element is visible
  }
);

// Apply observer to all elements with the 'fade-in' class
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(el => fadeObserver.observe(el));
});
