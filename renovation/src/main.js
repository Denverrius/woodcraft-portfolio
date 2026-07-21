// JS Logic for Premium Renovation Studio ART.RENOVATE

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile navigation menu toggle
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  
  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener("click", () => {
      mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
      burgerBtn.classList.toggle("active");
      
      const spans = burgerBtn.querySelectorAll("span");
      if (burgerBtn.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    const mobileLinks = mobileNav.querySelectorAll(".mobile-link");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.style.display = "none";
        burgerBtn.classList.remove("active");
        const spans = burgerBtn.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }

  // 2. Interactive Multi-Step Quiz & Price Calculator
  let currentStep = 1;
  const totalSteps = 4;
  
  const steps = document.querySelectorAll(".quiz-step");
  const currentStepSpan = document.getElementById("currentStep");
  const progressFill = document.getElementById("progressFill");
  
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const estimatedPriceSpan = document.getElementById("estimatedPrice");
  
  function calculatePrice() {
    const selectedProperty = document.querySelector('input[name="propertyType"]:checked');
    const selectedArea = document.querySelector('input[name="propertyArea"]:checked');
    const selectedStyle = document.querySelector('input[name="interiorStyle"]:checked');
    
    if (!selectedProperty || !selectedArea || !selectedStyle) return;
    
    const basePricePerMeter = parseFloat(selectedProperty.dataset.base);
    const sqMeters = parseFloat(selectedArea.dataset.factor);
    const styleMultiplier = parseFloat(selectedStyle.dataset.mult);
    
    // Formula: base_price * sq_meters * style_mult
    const finalPrice = Math.round(basePricePerMeter * sqMeters * styleMultiplier);
    
    if (estimatedPriceSpan) {
      estimatedPriceSpan.textContent = finalPrice.toLocaleString('ru-RU');
    }
  }

  function updateQuizUI() {
    steps.forEach(step => {
      step.classList.remove("active");
      if (parseInt(step.dataset.step) === currentStep) {
        step.classList.add("active");
      }
    });

    if (currentStepSpan) currentStepSpan.textContent = currentStep;
    if (progressFill) progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

    if (prevBtn) prevBtn.disabled = currentStep === 1;
    
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "inline-flex";
        nextBtn.textContent = "Далее";
      }
    }
    
    if (currentStep === 4) {
      calculatePrice();
    }
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateQuizUI();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizUI();
      }
    });
  }

  // Recalculate price on radio selection changes
  const quizInputs = document.querySelectorAll('input[type="radio"]');
  quizInputs.forEach(input => {
    input.addEventListener("change", () => {
      if (currentStep === 4) {
        calculatePrice();
      }
    });
  });

  // 3. Portfolio category filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.dataset.filter;

      portfolioItems.forEach(item => {
        item.style.opacity = "0";
        setTimeout(() => {
          if (filterVal === "all" || item.dataset.category === filterVal) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
            }, 50);
          } else {
            item.style.display = "none";
          }
        }, 300);
      });
    });
  });

  // 4. Form Submissions & Modals
  const successModal = document.getElementById("successModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  
  const quizContactForm = document.getElementById("quizContactForm");
  const consultationForm = document.getElementById("consultationForm");

  function showSuccessPopup(event) {
    event.preventDefault();
    if (successModal) {
      successModal.classList.add("active");
    }
    if (quizContactForm) quizContactForm.reset();
    if (consultationForm) consultationForm.reset();
    currentStep = 1;
    updateQuizUI();
  }

  if (quizContactForm) {
    quizContactForm.addEventListener("submit", showSuccessPopup);
  }
  
  if (consultationForm) {
    consultationForm.addEventListener("submit", showSuccessPopup);
  }

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener("click", () => {
      successModal.classList.remove("active");
    });
    
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.classList.remove("active");
      }
    });
  }

  // 5. Lightbox for Zooming Images
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxImg = document.getElementById("lightboxImg");
  const zoomIcons = document.querySelectorAll(".item-hover-overlay");

  zoomIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      const item = e.target.closest(".portfolio-item");
      const img = item.querySelector(".item-img");
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxModal.classList.add("active");
      }
    });
  });

  if (lightboxCloseBtn && lightboxModal) {
    lightboxCloseBtn.addEventListener("click", () => {
      lightboxModal.classList.remove("active");
    });
    
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("active");
      }
    });
  }
});
