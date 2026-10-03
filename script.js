/**
 * ============================================================================
 * MYOPAIN PHYSIOTHERAPY & WELLNESS CLINIC — JAVASCRIPT
 * ============================================================================
 * 
 * BEGINNER GUIDE FOR CLINIC OWNER:
 * Below is the configuration settings box. You can easily customize your clinic's
 * phone number, WhatsApp number, email, and address without breaking any code.
 */

const CLINIC_CONFIG = {
  // Clinic WhatsApp number
  whatsappNumber: "918979632503",

  // Clinic telephone desk number
  phoneNumber: "+91 8979632503",

  // Clinic email address
  email: "physiotherapistbu@gmail.com",

  // Clinic location address
  address: "Infront of Galaxy Tower, Near Emerald Grand Hotel, Sahastradhara Road, Dehradun (Uttarakhand) 248013"
};

/* ----------------------------------------------------------------------------
   INITIALIZATION WHEN DOM IS READY
   ---------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initCopyrightYear();
  initMobileNavigation();
  initHeroViewSwitcher();
  initFaqAccordion();
  initServicesCarousel();
  initDynamicServiceDetails();
  initServiceSelectLinks();
  initAppointmentForm();
  initDirectContactLinks();
  initBackToTop();
  initScrollSpy();
  initDateConstraints();
  initMobileCardSliders();
});

/* ----------------------------------------------------------------------------
   1. AUTO-UPDATE COPYRIGHT YEAR
   ---------------------------------------------------------------------------- */
function initCopyrightYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ----------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER & ACCESSIBLE TOGGLE
   ---------------------------------------------------------------------------- */
function initMobileNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navBackdrop = document.getElementById("navBackdrop");

  if (!menuToggle || !mainNav) return;

  function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    mainNav.classList.add("open");
    if (navBackdrop) navBackdrop.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
    if (navBackdrop) navBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking background backdrop
  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  // Close when pressing the ESC key for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close menu when clicking any nav link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

/* ----------------------------------------------------------------------------
   2B. HERO CLINIC PHOTO PERSPECTIVE SWITCHER
   ---------------------------------------------------------------------------- */
function initHeroViewSwitcher() {
  const switcher = document.querySelector(".hero-view-switcher");
  const heroImg = document.getElementById("heroMainImage");
  if (!switcher || !heroImg) return;

  const buttons = switcher.querySelectorAll(".hero-view-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      const newSrc = btn.getAttribute("data-img-src");
      const newAlt = btn.getAttribute("data-alt");
      if (!newSrc) return;

      // Update active state on buttons
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Smooth cross-fade transition
      heroImg.classList.add("image-fade");
      setTimeout(() => {
        heroImg.src = newSrc;
        if (newAlt) heroImg.alt = newAlt;
        heroImg.classList.remove("image-fade");
      }, 140);
    });
  });
}

/* ----------------------------------------------------------------------------
   3. FAQ ACCORDION COMPONENT
   ---------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question-btn");
    const panel = item.querySelector(".faq-answer-panel");

    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Optional: Collapse other open FAQ items for clean reading
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector(".faq-question-btn");
          const otherPanel = otherItem.querySelector(".faq-answer-panel");
          if (otherBtn && otherPanel) {
            otherBtn.setAttribute("aria-expanded", "false");
            otherPanel.hidden = true;
            otherItem.classList.remove("active");
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        button.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        item.classList.remove("active");
      } else {
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        item.classList.add("active");
      }
    });
  });
}

/* ----------------------------------------------------------------------------
   4. SERVICES CAROUSEL (ONE ROW, MAXIMUM 3 CARDS, RESPONSIVE ARROWS & DOTS)
   ---------------------------------------------------------------------------- */
function initServicesCarousel() {
  const track = document.getElementById("servicesCarouselTrack");
  const viewport = document.getElementById("servicesCarouselViewport");
  const prevBtn = document.getElementById("servicesPrevBtn");
  const nextBtn = document.getElementById("servicesNextBtn");
  const counter = document.getElementById("servicesCounter");
  const pagination = document.getElementById("servicesPagination");

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll(".service-card");
  const totalCards = cards.length; // 12 services
  if (totalCards === 0) return;

  let currentPage = 0;

  // Calculate visible cards per row: 3 on desktop, 2 on tablet, 1 on mobile
  function getCardsPerPage() {
    if (window.innerWidth > 992) return 3;
    if (window.innerWidth > 640) return 2;
    return 1;
  }

  function getTotalPages() {
    const cardsPerPage = getCardsPerPage();
    return Math.ceil(totalCards / cardsPerPage);
  }

  function updateCarousel() {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages();

    // Clamp current page
    if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);
    if (currentPage < 0) currentPage = 0;

    const startIndex = currentPage * cardsPerPage;

    // Calculate translation offset based on the exact start card position
    const targetCard = cards[startIndex];
    const offset = targetCard ? targetCard.offsetLeft : 0;
    track.style.transform = `translateX(-${offset}px)`;

    // Update Counter Text (e.g. "1–3 of 12", "4–6 of 12", or "1 of 12")
    const startNum = startIndex + 1;
    const endNum = Math.min(startIndex + cardsPerPage, totalCards);
    if (counter) {
      if (startNum === endNum) {
        counter.textContent = `${startNum} of ${totalCards}`;
      } else {
        counter.textContent = `${startNum}–${endNum} of ${totalCards}`;
      }
    }

    // Update Button Disabled States
    prevBtn.disabled = (currentPage === 0);
    nextBtn.disabled = (currentPage >= totalPages - 1);

    // Update Accessibility attributes
    prevBtn.setAttribute("aria-disabled", String(prevBtn.disabled));
    nextBtn.setAttribute("aria-disabled", String(nextBtn.disabled));

    // Update Dots Active State
    if (pagination) {
      const dots = pagination.querySelectorAll(".carousel-dot");
      dots.forEach((dot, idx) => {
        const isActive = (idx === currentPage);
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });
    }

    // Ensure selected card and details below remain valid and visible for this group
    const visibleStart = startIndex + 1;
    const visibleEnd = Math.min(startIndex + cardsPerPage, totalCards);
    if (currentSelectedServiceIndex < visibleStart || currentSelectedServiceIndex > visibleEnd) {
      renderServiceDetails(visibleStart, false);
    }
  }

  function renderDots() {
    if (!pagination) return;
    pagination.innerHTML = "";
    const totalPages = getTotalPages();

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === currentPage ? " active" : "");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to services slide ${i + 1} of ${totalPages}`);
      dot.setAttribute("aria-selected", String(i === currentPage));

      dot.addEventListener("click", () => {
        currentPage = i;
        updateCarousel();
      });

      pagination.appendChild(dot);
    }
  }

  // Next and Previous Button Listeners
  nextBtn.addEventListener("click", () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateCarousel();
    }
  });

  // Touch Swipe Support for Mobile/Tablet
  if (viewport) {
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance < -45) {
        // Swiped Left -> Next
        if (currentPage < getTotalPages() - 1) {
          currentPage++;
          updateCarousel();
        }
      } else if (swipeDistance > 45) {
        // Swiped Right -> Previous
        if (currentPage > 0) {
          currentPage--;
          updateCarousel();
        }
      }
    }
  }

  // Debounced Window Resize Recalculation
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderDots();
      updateCarousel();
    }, 120);
  });

  // Initial setup
  renderDots();
  updateCarousel();
}

/* ----------------------------------------------------------------------------
   5. COMPREHENSIVE 12-SERVICES DETAILS CLINICAL DATASET
   ---------------------------------------------------------------------------- */
const SERVICES_DETAILS_DATA = {
  1: {
    id: "musculoskeletal-pain-care",
    title: "Musculoskeletal Pain Care",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Targeted clinical care for acute and persistent discomfort in the back, neck, shoulder, hip, and joints. We focus on identifying underlying biomechanical dysfunction, relieving discomfort, and restoring comfortable motion and daily functional ease.",
    conditions: [
      {
        title: "Spine & Neck",
        icon: "🦴",
        items: [
          "Persistent lower back discomfort",
          "Neck tightness & postural ache",
          "Sciatica & radiating nerve symptoms",
          "Thoracic & upper back stiffness"
        ]
      },
      {
        title: "Shoulder & Arm",
        icon: "💪",
        items: [
          "Rotator cuff irritation & weakness",
          "Frozen shoulder (adhesive capsulitis)",
          "Tennis & golfer's elbow",
          "Repetitive strain & wrist tension"
        ]
      },
      {
        title: "Hip, Knee & Ankle",
        icon: "🦵",
        items: [
          "Knee joint discomfort & runner's knee",
          "Hip impingement & groin strain",
          "Ankle sprains & instability",
          "Plantar fascia & Achilles strain"
        ]
      },
      {
        title: "Sports & Active Life",
        icon: "🏃",
        items: [
          "Muscle pulls (hamstrings, calves)",
          "Overuse and training overload",
          "Joint stiffness after workouts",
          "Post-injury movement confidence"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Biomechanical Assessment",
        desc: "Comprehensive joint mobility, muscle length-tension, and postural movement screening to isolate root dysfunction."
      },
      {
        num: "02",
        title: "Manual Therapy & Mobilization",
        desc: "Gentle joint mobilization, myofascial easing, and targeted soft tissue release to reduce stiffness and ease guarded motion."
      },
      {
        num: "03",
        title: "Targeted Active Rehabilitation",
        desc: "Progressive corrective exercise therapy to restore muscle balance, motor control, and joint stability under load."
      },
      {
        num: "04",
        title: "Self-Care & Ergonomic Guidance",
        desc: "Clear home exercise prescriptions, movement pacing, and workstation adjustments to sustain long-term relief."
      }
    ],
    ctaHeading: "Ready to consult for Musculoskeletal Pain Care?",
    ctaSubtext: "Reserve a dedicated one-on-one clinical evaluation with our registered physiotherapy team.",
    ctaBtnText: "Request Assessment for Musculoskeletal Care"
  },
  2: {
    id: "post-injury-sports-rehab",
    title: "Post-Injury & Sports Rehab",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Structured, progressive rehabilitation protocols for ligament sprains, muscle tears, tendon strains, and athletic injuries. Our phased recovery bridges the gap between acute tissue healing and confident return to full sport or physical training.",
    conditions: [
      {
        title: "Ligament & Joint Sprains",
        icon: "⚡",
        items: [
          "ACL, MCL & meniscus knee sprains",
          "Acute and recurrent lateral ankle sprains",
          "Shoulder labral and AC joint injuries",
          "Wrist and finger joint sprains"
        ]
      },
      {
        title: "Muscle Tears & Strains",
        icon: "🏃",
        items: [
          "Hamstring and quadriceps muscle tears",
          "Groin and adductor strains",
          "Calf muscle strains (tennis leg)",
          "Rotator cuff muscle strains"
        ]
      },
      {
        title: "Tendon Overload & Tendinopathy",
        icon: "🩹",
        items: [
          "Patellar tendinopathy (jumper's knee)",
          "Achilles tendon irritation & thickening",
          "Tennis & golfer's elbow tendonitis",
          "Rotator cuff tendinopathy"
        ]
      },
      {
        title: "Athletic Performance & Return",
        icon: "🏆",
        items: [
          "Post-injury agility & speed deficits",
          "Sport-specific movement retraining",
          "Deceleration and landing mechanics",
          "Return-to-competition clearance testing"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Phased Acute Management",
        desc: "Tissue protection, gentle protected loading, and localized swelling management without premature immobilization."
      },
      {
        num: "02",
        title: "Tendon & Muscle Loading",
        desc: "Isometric, eccentric, and heavy slow-resistance loading protocols tailored strictly to current biological healing stage."
      },
      {
        num: "03",
        title: "Neuromuscular & Agility Retraining",
        desc: "Dynamic balance, multi-directional plyometrics, and sport-specific motor pattern conditioning."
      },
      {
        num: "04",
        title: "Objective Return-to-Play Testing",
        desc: "Limb symmetry testing, hop tests, and load monitoring guidelines to safeguard against re-injury risk."
      }
    ],
    ctaHeading: "Ready to accelerate your sports injury recovery?",
    ctaSubtext: "Book an evidence-based sports rehabilitation consultation tailored to your training goals.",
    ctaBtnText: "Request Assessment for Sports Rehab"
  },
  3: {
    id: "spinal-health-posture-care",
    title: "Spinal Health & Posture Care",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Practical posture retraining, spinal mobility techniques, and ergonomic advice designed for desk workers, drivers, and individuals experiencing persistent postural strain, spinal stiffness, or cervical-lumbar tension.",
    conditions: [
      {
        title: "Cervical Spine & Desk Neck",
        icon: "💻",
        items: [
          "Forward head posture & tech-neck tension",
          "Cervicogenic headaches & temple tightness",
          "Trapezius and shoulder blade knots",
          "Cervical facet joint stiffness"
        ]
      },
      {
        title: "Thoracic Spine & Ribcage",
        icon: "🫁",
        items: [
          "Rounded shoulders & kyphotic stiffness",
          "Mid-back burning ache during desk sitting",
          "Ribcage tightness & shallow breathing",
          "Thoracic rotational limitations"
        ]
      },
      {
        title: "Lumbar Spine & Pelvis",
        icon: "🪑",
        items: [
          "Prolonged sitting lower back ache",
          "Pelvic tilt imbalance & gluteal fatigue",
          "Postural lumbar disc compression",
          "Morning spinal stiffness on waking"
        ]
      },
      {
        title: "Postural Stamina Deficits",
        icon: "🧘",
        items: [
          "End-of-day whole-spine fatigue",
          "Heavy laptop / backpack strain",
          "Driving-induced postural discomfort",
          "Compensatory habitual asymmetries"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Postural & Ergonomic Screen",
        desc: "Evaluation of habitual static postures, spinal curves, workstation setup, and spinal segment mobility."
      },
      {
        num: "02",
        title: "Segmental Mobilization",
        desc: "Gentle manual therapy to restore mobility in stiff thoracic and lumbar vertebrae and decompress surrounding muscles."
      },
      {
        num: "03",
        title: "Core & Scapular Stabilization",
        desc: "Targeted conditioning of deep cervical flexors, transverse abdominis, multifidus, and lower trapezius."
      },
      {
        num: "04",
        title: "Workday Posture Habits",
        desc: "Micro-break movement strategies, desk ergonomics, and sustainable movement habits to prevent daily postural collapse."
      }
    ],
    ctaHeading: "Ready to relieve desk strain and improve your posture?",
    ctaSubtext: "Get an individualized spinal assessment and actionable posture plan from our therapists.",
    ctaBtnText: "Request Assessment for Posture Care"
  },
  4: {
    id: "therapeutic-exercise-strength",
    title: "Therapeutic Exercise & Strength",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Supervised exercise regimens to rebuild muscular endurance, coordination, balance, and joint stability under the direct guidance of a trained physiotherapist. Exercises are calibrated to your current baseline and progressively advanced.",
    conditions: [
      {
        title: "Muscle Deconditioning",
        icon: "🏋️",
        items: [
          "Generalized weakness after illness or injury",
          "Muscle atrophy following limb immobilization",
          "Rapid physical fatigue during routine tasks",
          "Core and pelvic stabilizer weakness"
        ]
      },
      {
        title: "Functional Movement Limits",
        icon: "🪜",
        items: [
          "Difficulty rising from low chairs or cars",
          "Restricted squatting, bending, or lifting",
          "Reduced walking stamina and speed",
          "Asymmetric movement compensations"
        ]
      },
      {
        title: "Joint Laxity & Instability",
        icon: "⚖️",
        items: [
          "Generalized joint hypermobility syndrome",
          "Recurrent feeling of shoulder slipping",
          "Knee giving way during dynamic moves",
          "Chronic ankle instability on uneven ground"
        ]
      },
      {
        title: "Post-Rehab Conditioning",
        icon: "🎯",
        items: [
          "Safe transition from therapy to gym workouts",
          "Progressive resistance training guidance",
          "Age-appropriate bone-loading routines",
          "Long-term physical movement confidence"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Baseline Capacity Testing",
        desc: "Objective testing of functional strength, joint range, muscular endurance, and movement control quality."
      },
      {
        num: "02",
        title: "Calibrated Prescription",
        desc: "Exercise dosing matched to tissue tolerance using resistance bands, bodyweight, and controlled loading."
      },
      {
        num: "03",
        title: "1-on-1 Form Coaching",
        desc: "Direct physiotherapist supervision ensuring pristine movement mechanics, safety, and proper muscle recruitment."
      },
      {
        num: "04",
        title: "Measurable Progression",
        desc: "Gradual overload milestones and clear home exercise video guidance to track functional gains over time."
      }
    ],
    ctaHeading: "Ready to rebuild your strength and functional stamina?",
    ctaSubtext: "Consult with a physiotherapist to establish a safe, customized exercise conditioning program.",
    ctaBtnText: "Request Assessment for Strength Conditioning"
  },
  5: {
    id: "post-operative-recovery",
    title: "Post-Operative Recovery",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Gentle, phased post-surgical rehabilitation following orthopedic procedures (such as ACL reconstruction, arthroscopy, or joint replacement) per surgical protocol. We coordinate with your surgical guidelines to ensure safe, milestone-driven recovery.",
    conditions: [
      {
        title: "Joint Replacement Recovery",
        icon: "🏥",
        items: [
          "Total Knee Arthroplasty (TKA) rehabilitation",
          "Total Hip Arthroplasty (THA) mobility",
          "Shoulder hemiarthroplasty or reverse surgery",
          "Post-surgical gait and weight-bearing"
        ]
      },
      {
        title: "Arthroscopic Repairs",
        icon: "🩺",
        items: [
          "ACL / PCL / meniscus repair recovery",
          "Rotator cuff surgical reconditioning",
          "Labral repair and shoulder stabilization",
          "Achilles tendon rupture surgery rehab"
        ]
      },
      {
        title: "Spinal Surgery Re-Education",
        icon: "🧬",
        items: [
          "Lumbar microdiscectomy post-care",
          "Spinal fusion (TLIF/PLIF) core rehab",
          "Cervical disc replacement or laminectomy",
          "Safe spinal movement and nerve gliding"
        ]
      },
      {
        title: "Fracture & Soft Tissue Trauma",
        icon: "🩹",
        items: [
          "Post-ORIF internal fixation mobility",
          "Joint stiffness following cast removal",
          "Post-operative swelling and edema",
          "Surgical scar tissue tightness and adhesions"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Surgical Protocol Alignment",
        desc: "Strict adherence to your surgeon's specific timeframes, weight-bearing limits, and motion restrictions."
      },
      {
        num: "02",
        title: "Early Swelling & Scar Care",
        desc: "Gentle lymphatic drainage, cryotherapy advice, and careful scar desensitization to reduce internal adhesions."
      },
      {
        num: "03",
        title: "Protected Range Restoration",
        desc: "Carefully calibrated passive, active-assisted, and active exercises to regain joint angles safely."
      },
      {
        num: "04",
        title: "Daily Independence Training",
        desc: "Bed transfers, confident stair climbing, walking aid tapering, and regaining full daily functional autonomy."
      }
    ],
    ctaHeading: "Planning or recovering from orthopedic surgery?",
    ctaSubtext: "Book your structured post-operative rehabilitation session to support your surgeon's protocol.",
    ctaBtnText: "Request Assessment for Post-Op Recovery"
  },
  6: {
    id: "preventive-wellness-ergonomics",
    title: "Preventive Wellness & Ergonomics",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Long-term mobility maintenance and proactive movement strategies to help you stay physically active, minimize recurrence of injury, and optimize workplace ergonomics before minor aches escalate into chronic conditions.",
    conditions: [
      {
        title: "Repetitive Strain Risks",
        icon: "🖱️",
        items: [
          "Early wrist/forearm strain & typing fatigue",
          "Neck stiffness from dual-monitor work",
          "Repetitive lifting or packaging fatigue",
          "Mouse-hand shoulder tightness"
        ]
      },
      {
        title: "Sedentary Desk Risks",
        icon: "🪑",
        items: [
          "Hip flexor tightness from long sitting",
          "Gluteal inactivation & lower back vulnerability",
          "Sluggish circulation and joint tightness",
          "Midday energy slumps linked to posture"
        ]
      },
      {
        title: "Workstation Layout Mismatch",
        icon: "🖥️",
        items: [
          "Incorrect chair height & missing lumbar support",
          "Non-ergonomic laptop & keyboard setups",
          "Work-from-home dining table setups",
          "Screen glare and awkward viewing angles"
        ]
      },
      {
        title: "Active Aging & Mobility Preservation",
        icon: "🌱",
        items: [
          "Proactive joint mobility maintenance",
          "Spinal flexibility and balance upkeep",
          "Recreational sports injury prevention",
          "Lifelong joint health habits"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Ergonomic Workstation Audit",
        desc: "Detailed evaluation of chair ergonomics, monitor height, desk clearances, and input device placements."
      },
      {
        num: "02",
        title: "Daily Mobility Sequences",
        desc: "Personalized 5-minute movement micro-breaks designed to reset posture and stimulate spinal circulation."
      },
      {
        num: "03",
        title: "Manual Handling Coaching",
        desc: "Practical instruction on safe bending, lifting, carrying, and reaching techniques to protect spinal discs."
      },
      {
        num: "04",
        title: "Wellness Maintenance Plan",
        desc: "Customized long-term roadmap with periodic functional tune-ups to stay healthy and injury-free."
      }
    ],
    ctaHeading: "Take proactive control of your physical wellness today",
    ctaSubtext: "Schedule an ergonomic and preventive mobility assessment tailored to your work and lifestyle.",
    ctaBtnText: "Request Assessment for Preventive Wellness"
  },
  7: {
    id: "neurological-physiotherapy",
    title: "Neurological Physiotherapy",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Dedicated neuro-rehabilitation focused on neuroplasticity, movement re-education, balance restoration, and functional independence for individuals living with neurological conditions, stroke, or movement disorders.",
    conditions: [
      {
        title: "Stroke & Hemiplegia Care",
        icon: "🧠",
        items: [
          "One-sided weakness or paralysis (hemiparesis)",
          "Upper limb reach, grasp, and hand dexterity",
          "Altered muscle tone (spasticity or flaccidity)",
          "Asymmetric walking pattern & foot drop"
        ]
      },
      {
        title: "Balance & Vestibular Issues",
        icon: "⚖️",
        items: [
          "Disequilibrium and unsteadiness while walking",
          "Sensory ataxia and proprioceptive deficits",
          "Loss of spatial confidence and fear of falling",
          "Vestibular motion sensitivity"
        ]
      },
      {
        title: "Parkinson's & Movement Care",
        icon: "🚶",
        items: [
          "Shuffling gait, freezing, and small steps",
          "Bradykinesia (slowed voluntary movements)",
          "Postural instability and trunk rigidity",
          "Coordination and transfer challenges"
        ]
      },
      {
        title: "Nerve & Spinal Cord Conditions",
        icon: "🧬",
        items: [
          "Peripheral neuropathy and sensory loss",
          "Guillain-Barré syndrome recovery phases",
          "Incomplete spinal cord injury mobility",
          "Multiple sclerosis fatigue & motor weakness"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Neuro-Functional Evaluation",
        desc: "Comprehensive assessment of muscle tone, voluntary motor control, sensation, reflexes, and gait kinematics."
      },
      {
        num: "02",
        title: "Neuroplasticity Retraining",
        desc: "High-repetition, task-specific movement practice designed to stimulate neural pathway reorganization."
      },
      {
        num: "03",
        title: "Gait & Dynamic Balance Drills",
        desc: "Stepping reactions, sensory integration exercises, and obstacle navigation for confident mobility."
      },
      {
        num: "04",
        title: "Assistive Device & Carer Guidance",
        desc: "Walking aid selection, splinting/AFO recommendations, and safe transfer training for family members."
      }
    ],
    ctaHeading: "Seeking neurological rehabilitation support?",
    ctaSubtext: "Consult with our physiotherapists for a detailed neuro-functional assessment and care plan.",
    ctaBtnText: "Request Assessment for Neurological Care"
  },
  8: {
    id: "geriatric-physiotherapy-fall-prevention",
    title: "Geriatric Physiotherapy & Fall Prevention",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Gentle, compassionate physiotherapy tailored to older adults to improve balance, rebuild muscle strength, enhance joint flexibility, reduce fall risks, and preserve dignity, confidence, and functional independence at home.",
    conditions: [
      {
        title: "Balance & Fall Vulnerability",
        icon: "🛡️",
        items: [
          "History of trips, stumbles, or near-falls",
          "Unsteadiness when turning or stepping over curbs",
          "Slow reaction time and hesitant gait",
          "Fear of falling leading to reduced physical activity"
        ]
      },
      {
        title: "Age-Related Muscle Sarcopenia",
        icon: "🦵",
        items: [
          "Generalized muscle weakness and loss of tone",
          "Difficulty rising from low armchairs or bed",
          "Fatigue and shortness of breath when walking",
          "Trouble climbing household stairs comfortably"
        ]
      },
      {
        title: "Multi-Joint Osteoarthritis",
        icon: "🦴",
        items: [
          "Morning stiffness in hips, knees, and lumbar spine",
          "Aching joints aggravated by damp or cold weather",
          "Foot and ankle stiffness affecting stability",
          "Limited reach and difficulty dressing"
        ]
      },
      {
        title: "Bone Density & Posture",
        icon: "🦯",
        items: [
          "Osteoporosis safe-movement precautions",
          "Kyphotic spinal curvature & stooped stance",
          "Safe weight-bearing routines to support bones",
          "Safe transfer mechanics to avoid fractures"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Standardized Fall Screening",
        desc: "Timed Up and Go (TUG), 30-second chair stand, and Berg Balance screening to pinpoint fall risks."
      },
      {
        num: "02",
        title: "Supported Balance Training",
        desc: "Progressive static and dynamic balance challenges in a secure, reassuring clinical setting."
      },
      {
        num: "03",
        title: "Functional Strength Building",
        desc: "Gentle sit-to-stand drills, calf raises, and resistance band routines calibrated to older adult tolerance."
      },
      {
        num: "04",
        title: "Walking Aid & Home Safety Tips",
        desc: "Proper adjustment of walking canes or walkers, lighting tips, and simple home hazard avoidance."
      }
    ],
    ctaHeading: "Help yourself or an older loved one move with confidence",
    ctaSubtext: "Schedule a gentle geriatric balance and mobility consultation with our caring team.",
    ctaBtnText: "Request Assessment for Geriatric Care"
  },
  9: {
    id: "home-visit-physiotherapy",
    title: "Home Visit Physiotherapy",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Professional, individualized physiotherapy delivered in the comfort and safety of your home. Ideal for post-surgical patients, individuals with acute mobility restrictions, or elderly family members unable to travel easily to the clinic.",
    conditions: [
      {
        title: "Post-Surgical Bedside Care",
        icon: "🏠",
        items: [
          "Early mobilization following knee or hip surgery",
          "Post-operative stair climbing evaluation at home",
          "Safe transfer from bed to chair and commode",
          "Deep vein thrombosis prevention exercises"
        ]
      },
      {
        title: "Acute Mobility Restrictions",
        icon: "🛏️",
        items: [
          "Severe acute sciatica or disc herniation flare-up",
          "Severe arthritis flare-ups limiting transport",
          "Patients where traveling causes intense pain",
          "Palliative comfort positioning and gentle mobility"
        ]
      },
      {
        title: "Home Neuro-Rehabilitation",
        icon: "🚪",
        items: [
          "Stroke survivors practicing real home navigation",
          "Doorway, carpet, and bathroom threshold practice",
          "Independent kitchen and room mobility drills",
          "Bed mobility and caregiver transfer coaching"
        ]
      },
      {
        title: "Home Environmental Barriers",
        icon: "🔍",
        items: [
          "Steep entrance steps and lack of handrails",
          "Tripping hazards (loose rugs, cables, clutter)",
          "Inadequate bathroom seating or high bed transfers",
          "Dim lighting in hallways and stairwells"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Real-World Home Evaluation",
        desc: "Assessing the patient's actual living environment, stairs, bed height, and bathroom setup."
      },
      {
        num: "02",
        title: "Portable Clinical Equipment",
        desc: "Physiotherapist brings specialized assessment tools, resistance bands, and treatment supplies to your door."
      },
      {
        num: "03",
        title: "Task-Specific Living Drills",
        desc: "Direct practice with patient's own furniture, armchairs, and domestic movement challenges."
      },
      {
        num: "04",
        title: "Family & Carer Training",
        desc: "Hands-on instruction for family members on safe assisting, positioning, and routine daily exercises."
      }
    ],
    ctaHeading: "Prefer personalized care delivered to your doorstep?",
    ctaSubtext: "Inquire about our professional home visit physiotherapy availability in your local neighborhood.",
    ctaBtnText: "Request Assessment for Home Visit Care"
  },
  10: {
    id: "joint-arthritis-rehabilitation",
    title: "Joint & Arthritis Rehabilitation",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Evidence-based conservative care for degenerative joint conditions, cartilage wear, and inflammatory joint issues. We help preserve cartilage health, strengthen surrounding supportive muscles, relieve joint stiffness, and protect long-term mobility.",
    conditions: [
      {
        title: "Knee Osteoarthritis",
        icon: "🦵",
        items: [
          "Joint line tenderness and crepitus (grinding)",
          "Morning stiffness easing after moving around",
          "Knee pain while negotiating stairs or squatting",
          "Inward or outward joint alignment fatigue"
        ]
      },
      {
        title: "Hip Osteoarthritis",
        icon: "🦴",
        items: [
          "Deep groin or buttock aching during weight-bearing",
          "Restricted hip internal rotation and flexibility",
          "Difficulty putting on shoes, socks, or cutting nails",
          "Limping and reduced walking stamina"
        ]
      },
      {
        title: "Hand & Finger Arthritis",
        icon: "🖐️",
        items: [
          "Morning stiffness in small joints of fingers",
          "Thumb base (CMC joint) aching when opening jars",
          "Heberden's and Bouchard's joint nodes discomfort",
          "Loss of fine grip strength and pinch agility"
        ]
      },
      {
        title: "Inflammatory Joint Concerns",
        icon: "🩹",
        items: [
          "Non-flare phase rheumatoid arthritis mobility",
          "Ankylosing spondylitis spinal flexibility",
          "Joint swelling and temperature sensitivity",
          "Protection of joint alignment and tendon health"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Low-Impact Joint Conditioning",
        desc: "Closed-chain and non-impact exercises that nourish joint cartilage through regular fluid exchange."
      },
      {
        num: "02",
        title: "Peri-Articular Strengthening",
        desc: "Targeted conditioning of quadriceps, hamstrings, gluteals, and rotator muscles to offload worn joint surfaces."
      },
      {
        num: "03",
        title: "Joint Distraction & Mobilization",
        desc: "Gentle manual passive gliding to relieve intracapsular pressure and ease end-range stiffness."
      },
      {
        num: "04",
        title: "Joint Protection & Pacing",
        desc: "Practical strategies for energy pacing, load distribution, ergonomic tools, and supportive joint taping."
      }
    ],
    ctaHeading: "Looking for sustainable relief from joint stiffness?",
    ctaSubtext: "Schedule an individualized joint mobility and arthritis care consultation with our team.",
    ctaBtnText: "Request Assessment for Joint & Arthritis Care"
  },
  11: {
    id: "chronic-pain-myofascial-therapy",
    title: "Chronic Pain & Myofascial Therapy",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Comprehensive pain neuroscience education, hands-on myofascial release, trigger point therapy, and graded movement re-exposure for persistent discomfort lasting more than 3 months. We address central sensitivity and muscular bracing.",
    conditions: [
      {
        title: "Myofascial Pain Syndrome",
        icon: "💆",
        items: [
          "Taut muscle bands and hyperirritable trigger points",
          "Referred pain patterns (e.g. neck tension causing head ache)",
          "Muscle twitch responses and persistent tightness",
          "Secondary muscle bracing driven by stress"
        ]
      },
      {
        title: "Persistent Non-Specific Back Pain",
        icon: "🧬",
        items: [
          "Lumbar discomfort lasting beyond normal tissue healing",
          "Widespread spinal hypersensitivity and guarding",
          "Movement apprehension and fear of bending",
          "Persistent dull ache in lower and mid back"
        ]
      },
      {
        title: "Central Sensitization & Fatigue",
        icon: "⚡",
        items: [
          "Heightened nervous system sensitivity (allodynia)",
          "Widespread tenderness and morning fatigue",
          "Musculoskeletal discomfort affecting sleep quality",
          "Activity flare-ups following physical overexertion"
        ]
      },
      {
        title: "Tension Headaches & TMJ",
        icon: "🤕",
        items: [
          "Chronic tension radiating from jaw (TMJ) to temples",
          "Teeth clenching and masticatory muscle soreness",
          "Occipital nerve pressure and scalp tenderness",
          "Postural bracing across neck and upper shoulders"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Pain Neuroscience Education",
        desc: "Understanding pain biology, nervous system sensitivity, and how to safely retrain pain signaling."
      },
      {
        num: "02",
        title: "Myofascial Release Techniques",
        desc: "Gentle sustained soft tissue decompression and trigger point release to reduce involuntary muscle guarding."
      },
      {
        num: "03",
        title: "Graded Movement Re-Exposure",
        desc: "Gentle, non-threatening movement progressions to build movement confidence and reduce fear-avoidance."
      },
      {
        num: "04",
        title: "Pacing & Self-Regulation",
        desc: "Diaphragmatic breathing drills, activity pacing strategies, and self-myofascial release routines."
      }
    ],
    ctaHeading: "Ready to break the cycle of persistent pain and tension?",
    ctaSubtext: "Consult with our therapists for a supportive, multi-faceted chronic pain assessment.",
    ctaBtnText: "Request Assessment for Chronic Pain Care"
  },
  12: {
    id: "ergonomic-workplace-health",
    title: "Ergonomic & Workplace Health",
    eyebrow: "SERVICE DETAILS & CLINICAL FOCUS",
    intro: "Comprehensive workstation evaluations, occupational postural risk mitigation, and corporate wellness physiotherapy. We help professionals and organizations eradicate desk-related strain and foster high-performing, pain-free workdays.",
    conditions: [
      {
        title: "Desk-Bound Postural Strain",
        icon: "💻",
        items: [
          "Upper crossed syndrome (rounded shoulders, forward chin)",
          "Lower crossed syndrome (anterior pelvic tilt, tight hip flexors)",
          "Cervical compression from prolonged laptop use",
          "Chronic trapezius and shoulder shrug tension"
        ]
      },
      {
        title: "Screen Setup & Neck Tension",
        icon: "🖥️",
        items: [
          "Eyestrain prompting subconscious forward leaning",
          "Dual-monitor rotational neck strain",
          "Screen height mismatch causing cervical hyperextension",
          "Glare and lighting reflections causing awkward postures"
        ]
      },
      {
        title: "Upper Limb Repetitive Strain",
        icon: "🖱️",
        items: [
          "Mouse-hand forearm tightness and extensor strain",
          "Carpal tunnel wrist compression symptoms",
          "Elbow desk-edge contact pressure irritation",
          "Keyboard typing fatigue in wrists and fingers"
        ]
      },
      {
        title: "Workday Fatigue & Inactivity",
        icon: "🏢",
        items: [
          "Circulatory sluggishness and heavy legs after sitting",
          "Shallow diaphragmatic breathing from slumped seating",
          "Afternoon physical fatigue and productivity slump",
          "Postural burnout during intensive work sprints"
        ]
      }
    ],
    approachTitle: "Assessment & Treatment Approach",
    approachSubtitle: "Example evidence-based modalities that may be considered following an individualized clinical assessment:",
    pillars: [
      {
        num: "01",
        title: "Scientific Ergonomic Audit",
        desc: "Anthropometric evaluation of chair mechanics, lumbar support, desk height, monitor angle, and reach zones."
      },
      {
        num: "02",
        title: "Equipment Calibration",
        desc: "Custom setup of vertical mice, ergonomic keyboards, monitor risers, footrests, and document stands."
      },
      {
        num: "03",
        title: "Active Workday Scheduling",
        desc: "Structured micro-break protocols, sit-to-stand intervals, and desk-side postural reset routines."
      },
      {
        num: "04",
        title: "Corporate & Team Workshops",
        desc: "Injury prevention seminars, manual handling workshops, and team mobility challenges for healthier workplaces."
      }
    ],
    ctaHeading: "Elevate comfort and productivity across your workday",
    ctaSubtext: "Book an individual workplace ergonomic consultation or corporate wellness assessment.",
    ctaBtnText: "Request Assessment for Workplace Health"
  }
};

/* ----------------------------------------------------------------------------
   6. DYNAMIC DETAILS PANEL CONTROLLER & CARD HOVER/SELECTION
   ---------------------------------------------------------------------------- */
let currentSelectedServiceIndex = 1;

function renderServiceDetails(serviceIndex, immediate = false) {
  const data = SERVICES_DETAILS_DATA[serviceIndex];
  if (!data) return;

  currentSelectedServiceIndex = Number(serviceIndex);

  // Update active state on all service cards in carousel
  const allCards = document.querySelectorAll(".services-carousel-track .service-card");
  allCards.forEach((card) => {
    const cardIdx = Number(card.getAttribute("data-service-index"));
    const isSelected = (cardIdx === currentSelectedServiceIndex);
    card.classList.toggle("active-service-card", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
  });

  const panel = document.getElementById("serviceDetailsPanel");
  if (!panel) return;

  const titleEl = document.getElementById("conditions-title");
  const eyebrowEl = document.getElementById("detailsEyebrow");
  const introEl = document.getElementById("detailsIntro");
  const gridEl = document.getElementById("detailsConditionsGrid");
  const pillarsGridEl = document.getElementById("detailsPillarsGrid");
  const ctaHeadingEl = document.getElementById("detailsCtaHeading");
  const ctaSubtextEl = document.getElementById("detailsCtaSubtext");
  const ctaBtn = document.getElementById("detailsCtaBtn");

  function applyContent() {
    if (titleEl) titleEl.textContent = data.title;
    if (eyebrowEl && data.eyebrow) eyebrowEl.textContent = data.eyebrow;
    if (introEl) introEl.textContent = data.intro;

    if (gridEl && Array.isArray(data.conditions)) {
      gridEl.innerHTML = data.conditions.map((group) => `
        <div class="condition-card">
          <h3><span aria-hidden="true">${group.icon}</span> ${group.title}</h3>
          <ul class="condition-list">
            ${group.items.map((item) => `<li><span class="condition-bullet" aria-hidden="true">▪</span> ${item}</li>`).join("")}
          </ul>
        </div>
      `).join("");
    }

    if (pillarsGridEl && Array.isArray(data.pillars)) {
      pillarsGridEl.innerHTML = data.pillars.map((pillar) => `
        <div class="approach-pillar-card">
          <div class="pillar-num">${pillar.num}</div>
          <h4>${pillar.title}</h4>
          <p>${pillar.desc}</p>
        </div>
      `).join("");
    }

    if (ctaHeadingEl) ctaHeadingEl.textContent = data.ctaHeading;
    if (ctaSubtextEl) ctaSubtextEl.textContent = data.ctaSubtext;
    if (ctaBtn) {
      ctaBtn.setAttribute("data-service-select", data.title);
      ctaBtn.innerHTML = `<span>${data.ctaBtnText || "Request Assessment"}</span> <span aria-hidden="true">→</span>`;
    }

    resetMobileSliders();
  }

  if (immediate) {
    applyContent();
  } else {
    panel.classList.add("details-updating");
    setTimeout(() => {
      applyContent();
      panel.classList.remove("details-updating");
    }, 120);
  }
}

function initDynamicServiceDetails() {
  const cards = document.querySelectorAll(".services-carousel-track .service-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    const serviceIndex = Number(card.getAttribute("data-service-index"));

    // Desktop hover: smoothly displays associated details without page jump
    card.addEventListener("mouseenter", () => {
      if (currentSelectedServiceIndex !== serviceIndex) {
        renderServiceDetails(serviceIndex);
      }
    });

    // Click / Touch tap: selects card and keeps details visible
    card.addEventListener("click", (e) => {
      // Don't intercept clicks if clicking directly on link
      if (e.target.closest("a")) return;
      renderServiceDetails(serviceIndex);
    });

    // Keyboard accessibility: Enter or Space selects card
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        renderServiceDetails(serviceIndex);
      }
    });
  });

  // Ensure first service details are initialized
  renderServiceDetails(1, true);
}

/* ----------------------------------------------------------------------------
   7. SERVICE SELECTION PRE-FILL LINK (AUTO-SELECT SERVICE IN APPOINTMENT FORM)
   ---------------------------------------------------------------------------- */
function initServiceSelectLinks() {
  const serviceDropdown = document.getElementById("patientService");

  // Event delegation to capture both static links and dynamic CTA buttons
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-service-select]");
    if (!link || !serviceDropdown) return;

    const serviceName = link.getAttribute("data-service-select");
    if (!serviceName) return;

    // Match exact or closest option in the appointment select dropdown
    for (let i = 0; i < serviceDropdown.options.length; i++) {
      const optVal = serviceDropdown.options[i].value.toLowerCase();
      const target = serviceName.toLowerCase();
      if (optVal.includes(target) || target.includes(optVal)) {
        serviceDropdown.selectedIndex = i;
        break;
      }
    }
  });
}

/* ----------------------------------------------------------------------------
   5. DATE INPUT RESTRICTIONS (No Past Dates)
   ---------------------------------------------------------------------------- */
function initDateConstraints() {
  const dateInput = document.getElementById("preferredDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    dateInput.addEventListener("change", () => {
      if (!dateInput.value) return;
      const selected = new Date(dateInput.value + "T00:00:00");
      if (selected.getDay() === 0) { // 0 = Sunday
        alert("Please note: MyoPain Physiotherapy & Wellness Clinic is closed on Sundays.\n\nOur consultation hours are Monday through Saturday:\n• Morning: 10:00 AM – 2:00 PM\n• Evening: 4:00 PM – 8:00 PM\n\nPlease select any date from Monday to Saturday.");
        dateInput.value = "";
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   6. APPOINTMENT FORM VALIDATION & WHATSAPP DRAFT GENERATOR
   ---------------------------------------------------------------------------- */
function initAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  const feedbackBox = document.getElementById("formFeedback");

  if (!form) return;

  const nameInput = document.getElementById("patientName");
  const phoneInput = document.getElementById("patientPhone");
  const serviceSelect = document.getElementById("patientService");
  const emailInput = document.getElementById("patientEmail");
  const dateInput = document.getElementById("preferredDate");
  const timeSelect = document.getElementById("preferredTime");
  const messageInput = document.getElementById("patientMessage");

  // Inline live error clearance on input
  [nameInput, phoneInput, serviceSelect].forEach((input) => {
    if (input) {
      input.addEventListener("input", () => {
        input.classList.remove("invalid");
        const errorEl = document.getElementById(input.id.replace("patient", "").toLowerCase() + "Error");
        if (errorEl) errorEl.classList.remove("visible");
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidInput = null;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : "";
    const nameError = document.getElementById("nameError");
    if (!nameVal || nameVal.length < 2) {
      isValid = false;
      nameInput.classList.add("invalid");
      if (nameError) nameError.classList.add("visible");
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else {
      nameInput.classList.remove("invalid");
      if (nameError) nameError.classList.remove("visible");
    }

    // Validate Phone (At least 10 digits)
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const phoneDigits = phoneVal.replace(/[^0-9]/g, "");
    const phoneError = document.getElementById("phoneError");
    if (!phoneVal || phoneDigits.length < 10) {
      isValid = false;
      phoneInput.classList.add("invalid");
      if (phoneError) phoneError.classList.add("visible");
      if (!firstInvalidInput) firstInvalidInput = phoneInput;
    } else {
      phoneInput.classList.remove("invalid");
      if (phoneError) phoneError.classList.remove("visible");
    }

    // Validate Service
    const serviceVal = serviceSelect ? serviceSelect.value : "";
    const serviceError = document.getElementById("serviceError");
    if (!serviceVal) {
      isValid = false;
      serviceSelect.classList.add("invalid");
      if (serviceError) serviceError.classList.add("visible");
      if (!firstInvalidInput) firstInvalidInput = serviceSelect;
    } else {
      serviceSelect.classList.remove("invalid");
      if (serviceError) serviceError.classList.remove("visible");
    }

    // If invalid, focus first error field
    if (!isValid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    // Gather Form Values
    const emailVal = emailInput && emailInput.value.trim() ? emailInput.value.trim() : "Not provided";
    const dateVal = dateInput && dateInput.value ? dateInput.value : "Earliest convenient date";
    const timeVal = timeSelect ? timeSelect.value : "Any Available Time";
    const msgVal = messageInput && messageInput.value.trim() ? messageInput.value.trim() : "Initial consultation inquiry";

    // Format Draft Message for WhatsApp
    const draftMessage = `*Appointment Request — MyoPain Physiotherapy*\n` +
      `--------------------------------\n` +
      `• Patient Name: ${nameVal}\n` +
      `• Phone Number: ${phoneVal}\n` +
      `• Email: ${emailVal}\n` +
      `• Care Needed: ${serviceVal}\n` +
      `• Preferred Date: ${dateVal}\n` +
      `• Preferred Slot: ${timeVal}\n` +
      `• Message / Symptoms: ${msgVal}\n` +
      `--------------------------------\n` +
      `Please let me know available slots. Thank you!`;

    // Check if Clinic WhatsApp is Still Default Placeholder
    const isPlaceholder = CLINIC_CONFIG.whatsappNumber.includes("X") || CLINIC_CONFIG.whatsappNumber === "91XXXXXXXXXX";

    if (feedbackBox) {
      feedbackBox.classList.remove("warning", "success");

      if (isPlaceholder) {
        // Friendly notice for Clinic Owner / User during development
        feedbackBox.className = "form-feedback-box visible warning";
        feedbackBox.innerHTML = `
          <strong>⚙️ Clinic WhatsApp Setup Needed</strong>
          <p style="margin: 6px 0 10px;">
            The clinic's real WhatsApp number has not been configured yet (currently <code>91XXXXXXXXXX</code> in <code>script.js</code>).
          </p>
          <p style="margin: 0 0 6px;"><strong>Here is your formatted appointment draft:</strong></p>
          <div class="feedback-preview-draft">${escapeHtml(draftMessage)}</div>
          <button type="button" class="btn-copy-draft" id="btnCopyDraft">📋 Copy Message to Clipboard</button>
        `;

        const copyBtn = document.getElementById("btnCopyDraft");
        if (copyBtn) {
          copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(draftMessage).then(() => {
              copyBtn.textContent = "✓ Message Copied!";
              setTimeout(() => { copyBtn.textContent = "📋 Copy Message to Clipboard"; }, 3000);
            }).catch(() => {
              alert("Draft text ready to select and copy above.");
            });
          });
        }
      } else {
        // Real number is configured: build valid URL and open WhatsApp
        const encodedText = encodeURIComponent(draftMessage);
        const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodedText}`;

        feedbackBox.className = "form-feedback-box visible success";
        feedbackBox.innerHTML = `
          <strong>✓ Appointment Draft Ready</strong>
          <p style="margin: 6px 0;">
            WhatsApp has been opened in a new tab with your pre-filled request. Please review the message and click <strong>Send</strong> in WhatsApp.
          </p>
          <p style="margin: 0; font-size: 0.85rem;">
            If WhatsApp did not open automatically, <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="font-weight: 700; text-decoration: underline;">click here to launch WhatsApp</a>.
          </p>
        `;

        // Safely open in new tab
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }

      feedbackBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

/* ----------------------------------------------------------------------------
   7. DIRECT WHATSAPP & PHONE LINKS INITIALIZATION
   ---------------------------------------------------------------------------- */
function initDirectContactLinks() {
  const directLink = document.getElementById("directWhatsAppLink");
  const quickBtn = document.getElementById("quickWhatsAppBtn");
  const isPlaceholder = CLINIC_CONFIG.whatsappNumber.includes("X");

  const defaultGreeting = encodeURIComponent("Hello MyoPain Clinic, I would like to inquire about physiotherapy consultation services.");
  const targetUrl = isPlaceholder ? "#appointment" : `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${defaultGreeting}`;

  [directLink, quickBtn].forEach((el) => {
    if (el) {
      if (isPlaceholder) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const appointmentSection = document.getElementById("appointment");
          if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: "smooth" });
          }
          const feedbackBox = document.getElementById("formFeedback");
          if (feedbackBox) {
            feedbackBox.className = "form-feedback-box visible warning";
            feedbackBox.innerHTML = `
              <strong>ℹ️ Clinic WhatsApp Number Setup</strong>
              <p style="margin: 4px 0 0;">
                To enable 1-click WhatsApp chat, open <code>script.js</code> and replace <code>91XXXXXXXXXX</code> with your clinic's mobile number.
              </p>
            `;
          }
        });
      } else {
        el.href = targetUrl;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    }
  });
}

/* ----------------------------------------------------------------------------
   8. FLOATING BACK TO TOP BUTTON
   ---------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ----------------------------------------------------------------------------
   9. SCROLLSPY / ACTIVE NAVIGATION HIGHLIGHTING
   ---------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-list a[href^='#']");

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ----------------------------------------------------------------------------
   HELPER UTILITY: ESCAPE HTML STRINGS
   ---------------------------------------------------------------------------- */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ----------------------------------------------------------------------------
   12. MOBILE CARD SLIDERS (1-CARD SWIPEABLE CAROUSEL ON PHONES)
   ---------------------------------------------------------------------------- */
function initMobileCardSliders() {
  setupSlider(
    document.getElementById("detailsConditionsGrid"),
    document.getElementById("conditionsPrevBtn"),
    document.getElementById("conditionsNextBtn"),
    document.getElementById("conditionsCounter")
  );

  setupSlider(
    document.getElementById("detailsPillarsGrid"),
    document.getElementById("pillarsPrevBtn"),
    document.getElementById("pillarsNextBtn"),
    document.getElementById("pillarsCounter")
  );

  setupSlider(
    document.getElementById("journeyTimelineTrack"),
    document.getElementById("journeyPrevBtn"),
    document.getElementById("journeyNextBtn"),
    document.getElementById("journeyCounter")
  );

  setupSlider(
    document.getElementById("reviewsGridTrack"),
    document.getElementById("reviewsPrevBtn"),
    document.getElementById("reviewsNextBtn"),
    document.getElementById("reviewsCounter")
  );

  function setupSlider(track, prevBtn, nextBtn, counter) {
    if (!track) return;
    const dots = counter ? counter.querySelectorAll(".current-dot") : [];

    function updateDots() {
      if (!dots.length) return;
      const cardWidth = track.clientWidth || track.offsetWidth;
      if (!cardWidth) return;
      const index = Math.round(track.scrollLeft / cardWidth);
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const cardWidth = track.clientWidth || track.offsetWidth;
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const cardWidth = track.clientWidth || track.offsetWidth;
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      });
    }

    let scrollTimeout;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 50);
    }, { passive: true });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        const cardWidth = track.clientWidth || track.offsetWidth;
        track.scrollTo({ left: i * cardWidth, behavior: "smooth" });
      });
    });
  }
}

function resetMobileSliders() {
  const condGrid = document.getElementById("detailsConditionsGrid");
  const pillGrid = document.getElementById("detailsPillarsGrid");
  if (condGrid) condGrid.scrollTo({ left: 0, behavior: "smooth" });
  if (pillGrid) pillGrid.scrollTo({ left: 0, behavior: "smooth" });
  document.querySelectorAll("#conditionsCounter .current-dot").forEach((d, i) => d.classList.toggle("active", i === 0));
  document.querySelectorAll("#pillarsCounter .current-dot").forEach((d, i) => d.classList.toggle("active", i === 0));
}