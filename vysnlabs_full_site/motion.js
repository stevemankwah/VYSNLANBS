// ================= Fade-in on scroll =================
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

// ================= Slider setup =================
document.querySelectorAll(".slider").forEach(slider => {
  const track = slider.querySelector(".slider-track");
  const cards = Array.from(track.children);
  let autoplayInterval = 4000;
  let autoplayTimer;

  // ================= Touch & Drag =================
  let isDown = false, startX, scrollLeft;

  track.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    stopAutoplay();
  });

  track.addEventListener("mouseleave", () => isDown = false);
  track.addEventListener("mouseup", () => isDown = false);
  track.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX);
  });

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    stopAutoplay();
  });

  track.addEventListener("touchmove", e => {
    const x = e.touches[0].pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX);
  });

  // ================= Buttons =================
  const prev = slider.querySelector(".slider-btn.prev");
  const next = slider.querySelector(".slider-btn.next");

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -(cards[0].offsetWidth + 24), behavior: "smooth" });
    stopAutoplay();
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: cards[0].offsetWidth + 24, behavior: "smooth" });
    stopAutoplay();
  });

  // ================= Autoplay =================
  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      const firstCard = cards[0];
      track.scrollBy({ left: firstCard.offsetWidth + 24, behavior: "smooth" });
      setTimeout(() => {
        track.appendChild(firstCard);
        track.scrollLeft -= firstCard.offsetWidth + 24;
      }, 500);
    }, autoplayInterval);
  };

  const stopAutoplay = () => clearInterval(autoplayTimer);

  startAutoplay();

  // ================= Card Hover Effect =================
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => card.style.transform = "scale(1.03)");
    card.addEventListener("mouseleave", () => card.style.transform = "scale(1)");
  });

  // ================= Fade-in for slider cards =================
  const sliderObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => sliderObserver.observe(card));
});
