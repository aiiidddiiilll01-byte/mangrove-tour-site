/**
 * Langkawi Expedition V2 — Dynamic WhatsApp Routing, Navigation & Carousel
 */
document.addEventListener("DOMContentLoaded", () => {
// 1. Dynamic WhatsApp Routing dengan template Date, Time & Pax
const waLinks = document.querySelectorAll(".wa-link");
const isBM = window.location.pathname.includes("/bm") || window.location.pathname.endsWith("bm");
const phone = "60199739836";

waLinks.forEach((link) => {
  const pkg = link.dataset.package || (isBM ? "Mangrove Tour" : "Mangrove Tour");
  const pkgLower = pkg.toLowerCase();
  let defaultMsg = "";

  if (isBM) {
    if (pkgLower.includes("fun fishing") || pkgLower.includes("fishing")) {
      defaultMsg = `Hai Langkawi Expedition, saya ingin menempah Fun Fishing Tour:\n• Date: \n• Time: `;
    } else if (pkgLower.includes("pakej a") || pkgLower.includes("pakej b") || pkgLower.includes("pakej c") || pkgLower.includes("private")) {
      defaultMsg = `Salam Langkawi Expedition, saya ingin menempah ${pkg}:\n• Date: \n• Time: \n• Total Pax: `;
    } else if (pkgLower.includes("sharing") || pkgLower.includes("berkongsi")) {
      defaultMsg = `Salam Langkawi Expedition, saya ingin menempah ${pkg}:\n• Date: \n• Dewasa: \n• Kanak-kanak: `;
    } else {
      // Tombol umum (Hero, Navigasi, Sticky Bar)
      defaultMsg = `Salam Langkawi Expedition, saya ingin membuat tempahan:\n• Package: \n• Date: \n• Time: \n• Total Pax: `;
    }
  } else {
    if (pkgLower.includes("fun fishing") || pkgLower.includes("fishing")) {
      defaultMsg = `Hi Langkawi Expedition, I would like to book the Fun Fishing Tour:\n• Date: \n• Time: `;
    } else if (pkgLower.includes("package a") || pkgLower.includes("package b") || pkgLower.includes("package c") || pkgLower.includes("private")) {
      defaultMsg = `Hi Langkawi Expedition, I would like to book ${pkg}:\n• Date: \n• Time: \n• Total Pax: `;
    } else if (pkgLower.includes("sharing")) {
      defaultMsg = `Hi Langkawi Expedition, I would like to book the Sharing Mangrove Tour:\n• Date: \n• No. of Adults: \n• No. of Children: `;
    } else {
      // General Inquiry / Header / Hero buttons
      defaultMsg = `Hi Langkawi Expedition, I would like to make a booking:\n• Package: \n• Date: \n• Time: \n• Total Pax: `;
    }
  }

  const encoded = encodeURIComponent(defaultMsg);
  link.href = `https://wa.me/${phone}?text=${encoded}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  // Google Analytics Event Tracking
  link.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "whatsapp_click", {
        package_name: pkg,
        language: isBM ? "ms" : "en",
        page_path: window.location.pathname
      });
    }
  });
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
      navLinks.classList.toggle("is-open");
    });

    // Close menu when a navigation anchor is tapped
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
      });
    });
  }

  // 4. Photo Gallery Carousel Controller
  const track = document.getElementById("carouselTrack");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("carouselDots");
  const container = document.querySelector(".carousel-container");

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

    // Auto-slide setiap 5 saat
    let slideInterval = setInterval(nextSlide, 5000);

    function resetAutoSlide() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    // Navigasi Butang (Klik sekali sahaja bersama reset auto-slide)
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    // Hentikan seketika auto-slide bila cursor berada atas gambar
    if (container) {
      container.addEventListener("mouseenter", () => clearInterval(slideInterval));
      container.addEventListener("mouseleave", () => resetAutoSlide());
    }

    // Touch Swipe untuk Skrin Telefon
    let startX = 0;
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 50) {
        nextSlide();
        resetAutoSlide();
      } else if (diff < -50) {
        prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });
  }
});