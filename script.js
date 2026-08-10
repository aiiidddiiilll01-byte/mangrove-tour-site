document.addEventListener("DOMContentLoaded", () => {
  // Build every WhatsApp link from WHATSAPP_NUMBER + each button's data-msg
  document.querySelectorAll(".wa-link").forEach((link) => {
    const msg = encodeURIComponent(link.dataset.msg || "Hi, I'd like to ask about your mangrove tours");
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Mobile nav toggle using accessible class toggling
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isActive = links.classList.toggle("is-active");
      toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    // Close menu when clicking nav items on mobile
    links.querySelectorAll("a").forEach((navAnchor) => {
      navAnchor.addEventListener("click", () => {
        links.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Set current year dynamically in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});