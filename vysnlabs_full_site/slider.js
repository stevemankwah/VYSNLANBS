document.querySelectorAll(".slider").forEach(slider => {
  const track = slider.querySelector(".slider-track");
  const cards = track.children;

  // Fade-in using IntersectionObserver
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  Array.from(cards).forEach(card => observer.observe(card));

  // Touch swipe support
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener("mousedown", e => {
    isDown = true;
    track.classList.add("active");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => (isDown = false));
  track.addEventListener("mouseup", () => (isDown = false));
  track.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1; // scroll-fast
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch events
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("touchmove", e => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1;
    track.scrollLeft = scrollLeft - walk;
  });

  // Buttons
  const prev = slider.querySelector(".slider-btn.prev");
  const next = slider.querySelector(".slider-btn.next");

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -(cards[0].offsetWidth + 24), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: cards[0].offsetWidth + 24, behavior: "smooth" });
  });
});
