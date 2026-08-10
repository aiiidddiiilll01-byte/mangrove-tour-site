document.addEventListener("DOMContentLoaded", () => {
  // Build every WhatsApp link from WHATSAPP_NUMBER + each button's data-msg
  document.querySelectorAll(".wa-link").forEach((link) => {
    const msg = encodeURIComponent(link.dataset.msg || "Hi, I'd like to ask about your mangrove tours");
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Mobile nav toggle: reveal a simple stacked menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.style.display === "flex";
      links.style.display = open ? "none" : "flex";
      links.style.flexDirection = "column";
      links.style.position = "absolute";
      links.style.top = "68px";
      links.style.left = "0";
      links.style.right = "0";
      links.style.background = "#132920";
      links.style.padding = "20px 28px";
      links.style.gap = "16px";
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
