document.addEventListener("DOMContentLoaded", () => {
  // Dynamic WhatsApp link constructor targeting WHATSAPP_NUMBER
  document.querySelectorAll(".wa-link").forEach((link) => {
    const msg = encodeURIComponent(link.dataset.msg || "Hi, I'd like to ask about your mangrove tours");
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Accessible mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isActive = links.classList.toggle("is-active");
      toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    links.querySelectorAll("a").forEach((navAnchor) => {
      navAnchor.addEventListener("click", () => {
        links.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Dynamic footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});