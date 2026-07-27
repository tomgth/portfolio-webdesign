"use strict";

/* ===============================
   NAVBAR
================================ */

const header = document.querySelector(".header");

window.addEventListener(
    "scroll",
    () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    },
    { passive: true }
);


/* ===============================
   MENU MOBILE
================================ */

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileNav.style.display === "flex";

        mobileNav.style.display =
            isOpen ? "none" : "flex";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuButton.textContent =
            isOpen ? "☰" : "✕";
    });


    document
        .querySelectorAll(".mobile-nav a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.style.display = "none";

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
}


/* ===============================
   ANIMATIONS AU SCROLL
================================ */

const revealElements =
    document.querySelectorAll(".reveal");

if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );
                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(
        (element) => {

            observer.observe(element);

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* ===============================
   SMOOTH ANCHORS
================================ */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* ===============================
   PETIT EFFET PARALLAX HERO
================================ */

const browser =
    document.querySelector(".browser");

if (
    browser &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    const visual =
        document.querySelector(
            ".hero-visual"
        );

    visual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                visual.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                (x - centerX) / 60;

            const rotateX =
                (centerY - y) / 80;

            browser.style.transform =
                `rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        }
    );

    visual.addEventListener(
        "mouseleave",
        () => {

            browser.style.transform =
                "rotateY(-5deg) rotateX(2deg)";

        }
    );

}
