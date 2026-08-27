/**
 * Langkawi Expedition V2 — Dynamic WhatsApp Routing & UI Interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic WhatsApp Routing with context-aware prefilled messaging
  const waLinks = document.querySelectorAll(".wa-link");
  
  waLinks.forEach((link) => {
    const pkg = link.dataset.package || "Langkawi Mangrove Tour";
    const defaultMsg = `Hi Langkawi Expedition, I would like to check availability for ${pkg}.`;
    const encoded = encodeURIComponent(defaultMsg);
    
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // 2. Dynamic Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Mobile Navigation Drawer Controller
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isVisible = window.getComputedStyle(navLinks).display !== "none";
      navLinks.style.display = isVisible ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "80px";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "#00293F";
      navLinks.style.padding = "24px";
      navLinks.style.gap = "18px";
    });
  }
});