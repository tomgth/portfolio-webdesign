"use strict";

document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

const setMenuState = (open) => {
  if (!menuButton || !mobileNav) return;
  mobileNav.classList.toggle("open", open);
  mobileNav.hidden = !open;
  menuButton.textContent = open ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Fermer le menu" : "Ouvrir le menu"
  );
};

if (menuButton && mobileNav) {
  mobileNav.id ||= "navigation-mobile";
  menuButton.setAttribute("aria-controls", mobileNav.id);
  setMenuState(false);

  menuButton.addEventListener("click", () => {
    setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  document.addEventListener("click", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      !event.target.closest(".navbar") &&
      !event.target.closest(".mobile-nav")
    ) {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) setMenuState(false);
  });
}

let scrollFrame = 0;
const updateScrollEffects = () => {
  scrollFrame = 0;
  header?.classList.toggle("scrolled", window.scrollY > 18);
  const scrollable =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.documentElement.style.setProperty(
    "--scroll-progress",
    `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`
  );
};

const queueScrollEffects = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
};

updateScrollEffects();
window.addEventListener("scroll", queueScrollEffects, { passive: true });

const revealElements = document.querySelectorAll(".reveal, .process-line");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px" }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

document.querySelectorAll(
  ".hero-showcase .arrow, .hero-showcase .scroll, " +
    ".hero-showcase .scroll-down, .hero-showcase .scroll-indicator, " +
    ".hero .hero-arrow, .hero .scroll-indicator, .hero .scroll-down, " +
    ".hero-scroll-cue"
).forEach((element) => element.remove());

const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#status");
  if (!contactForm.reportValidity() || !status) return;
  status.textContent =
    "Merci ! Le formulaire est en démonstration : aucune donnée n’a été envoyée.";
  status.setAttribute("role", "status");
});

document.querySelectorAll(".faq-list details").forEach((details) => {
  const icon = details.querySelector("summary i");
  const syncIcon = () => {
    if (icon) icon.textContent = details.open ? "−" : "+";
  };
  syncIcon();
  details.addEventListener("toggle", syncIcon);
});

const pageThemes = {
  default: ["#8b5cf6", "#c4b5fd", "139,92,246", "#5b21b6"],
  warm: ["#ef5b3c", "#f6ad7b", "239,91,60", "#b83224"],
  amber: ["#d6a15b", "#f5d7a1", "214,161,91", "#9a6b2f"],
  blue: ["#3b82f6", "#93c5fd", "59,130,246", "#1d4ed8"],
  cyan: ["#06b6d4", "#67e8f9", "6,182,212", "#0e7490"],
  green: ["#10b981", "#6ee7b7", "16,185,129", "#047857"],
};

const path = window.location.pathname.toLowerCase();
let pageTheme = "default";
if (path.includes("/projets/restaurant")) pageTheme = "warm";
else if (path.includes("/projets/architecture")) pageTheme = "amber";
else if (path.endsWith("/services.html")) pageTheme = "blue";
else if (path.endsWith("/projets.html")) pageTheme = "warm";
else if (path.endsWith("/tarifs.html")) pageTheme = "green";
else if (path.endsWith("/a-propos.html")) pageTheme = "cyan";
else if (path.endsWith("/lab.html")) pageTheme = "blue";

const [accent, accent2, accentRgb, accentDeep] = pageThemes[pageTheme];
document.documentElement.style.setProperty("--accent", accent);
document.documentElement.style.setProperty("--accent-2", accent2);
document.documentElement.style.setProperty("--accent-rgb", accentRgb);
document.documentElement.style.setProperty("--accent-deep", accentDeep);

if (!document.querySelector(".color-ambient-v20")) {
  const ambient = document.createElement("div");
  ambient.className = "color-ambient-v20";
  ambient.setAttribute("aria-hidden", "true");
  document.body.prepend(ambient);
}

const responsiveTabs = [
  ...document.querySelectorAll(".device-tabs [data-device]"),
];
const responsiveStage = document.querySelector(".device-stage");

if (responsiveTabs.length && responsiveStage) {
  let activeTab = 0;
  let automaticPreview;

  const activateDevice = (index) => {
    activeTab = index;
    responsiveTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeTab;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });
    responsiveStage.dataset.activeDevice =
      responsiveTabs[activeTab].dataset.device;
  };

  const startAutomaticPreview = () => {
    if (prefersReducedMotion) return;
    window.clearInterval(automaticPreview);
    automaticPreview = window.setInterval(() => {
      activateDevice((activeTab + 1) % responsiveTabs.length);
    }, 2800);
  };

  responsiveTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateDevice(index);
      startAutomaticPreview();
    });
  });

  activateDevice(0);
  startAutomaticPreview();
}

document.querySelectorAll("[data-compare]").forEach((comparison) => {
  const range = comparison.querySelector(".compare-range");
  if (!range) return;

  const updateComparison = () => {
    const value = `${range.value}%`;
    comparison.style.setProperty("--compare", value);
    range.setAttribute("aria-valuetext", `${range.value} % de la version avant affichée`);
  };

  range.addEventListener("input", updateComparison);
  range.addEventListener("pointerdown", () => {
    comparison.classList.add("is-dragging");
  });
  const stopDragging = () => comparison.classList.remove("is-dragging");
  range.addEventListener("pointerup", stopDragging);
  range.addEventListener("pointercancel", stopDragging);
  range.addEventListener("blur", stopDragging);
  updateComparison();
});

if (!prefersReducedMotion && hasFinePointer) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--card-x", `${x * 100}%`);
      card.style.setProperty("--card-y", `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 2.5}deg) rotateY(${(x - 0.5) * 3.5}deg) translateY(-7px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  const heroShowcase = document.querySelector(".hero-showcase");
  document.querySelector(".hero")?.addEventListener("pointermove", (event) => {
    if (!heroShowcase) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroShowcase.style.transform = `translate3d(${x * 7}px,${y * 4}px,0)`;
  });
  document.querySelector(".hero")?.addEventListener("pointerleave", () => {
    if (heroShowcase) heroShowcase.style.transform = "";
  });

  responsiveStage?.addEventListener("pointermove", (event) => {
    const bounds = responsiveStage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    responsiveStage.style.transform = `perspective(1400px) rotateX(${
      y * -1.5
    }deg) rotateY(${x * 2.2}deg)`;
  });
  responsiveStage?.addEventListener("pointerleave", () => {
    responsiveStage.style.transform = "";
  });

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      button.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * 0.06}px,${(event.clientY - bounds.top - bounds.height / 2) * 0.08}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  const cursor = document.createElement("div");
  cursor.className = "site-cursor-v19";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);

  window.addEventListener(
    "pointermove",
    (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");
    },
    { passive: true }
  );

  const interactiveSelector =
    "a, button, summary, .project-card, .service, .sector-card, .offer";
  document.addEventListener("pointerover", (event) => {
    if (event.target.closest(interactiveSelector)) {
      cursor.classList.add("is-hovering");
    }
  });
  document.addEventListener("pointerout", (event) => {
    if (
      event.target.closest(interactiveSelector) &&
      !event.relatedTarget?.closest?.(interactiveSelector)
    ) {
      cursor.classList.remove("is-hovering");
    }
  });
  document.documentElement.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });
}

document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === "_blank" ||
      prefersReducedMotion
    ) {
      return;
    }
    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin) return;
    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 180);
  });
});
