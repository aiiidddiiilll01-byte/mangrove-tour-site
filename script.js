/**
 * Langkawi Expedition V2 — Dynamic WhatsApp Routing, Navigation & Carousel
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic WhatsApp Routing with context-aware prefilled messaging
  const waLinks = document.querySelectorAll(".wa-link");
  
  waLinks.forEach((link) => {
    const pkg = link.dataset.package || "Langkawi Mangrove Tour";
    const defaultMsg = `Hi Langkawi Expedition, I would like to check availability for ${pkg}.`;
    const encoded = encodeURIComponent(defaultMsg);
    
    if (typeof WHATSAPP_NUMBER !== "undefined") {
      link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    }
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

  // 4. Photo Gallery Carousel Controller
  const track = document.getElementById("carouselTrack");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("carouselDots");

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Bina titik navigasi (dots) secara dinamik
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = document.querySelectorAll(".dot");

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Auto-slide setiap 5 saat
    let slideInterval = setInterval(nextSlide, 5000);

    // Hentikan seketika auto-slide bila cursor berada atas gambar
    const container = document.querySelector(".carousel-container");
    if (container) {
      container.addEventListener("mouseenter", () => clearInterval(slideInterval));
      container.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
  }
});