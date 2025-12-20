const toggle = document.querySelector(".theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
});
