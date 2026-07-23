"use strict";

/* ===============================
        DOM ELEMENTS
================================== */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");
const faqItems = document.querySelectorAll(".faq-item");
const counterNumbers = document.querySelectorAll(".counter");
const contactForm = document.querySelector("form");

/* ===============================
        STICKY NAVBAR
================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("sticky");

    } else {

        navbar.classList.remove("sticky");

    }

});


/* ===============================
        MOBILE MENU
================================== */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuBtn.classList.toggle("active");

    });

}


/* ===============================
    CLOSE MOBILE MENU
================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

        if (menuBtn) {

            menuBtn.classList.remove("active");

        }

    });

});


/* ===============================
        SMOOTH SCROLL
================================== */

navLinks.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* ===============================
    ACTIVE NAVIGATION LINK
================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ===============================
        FAQ ACCORDION
================================== */

faqItems.forEach(item => {

    const question = item.querySelector("h3");

    if (question) {

        question.addEventListener("click", () => {

            item.classList.toggle("open");

        });

    }

});


/* ===============================
        SCROLL REVEAL
================================== */

const revealElements = document.querySelectorAll(

    ".hero-content, .hero-image, .card, .price-card, .faq-item"

);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.2

    }

);

revealElements.forEach(el => observer.observe(el));


/* ===============================
        COUNTER ANIMATION
================================== */

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let count = 0;

        const increment = target / 100;

        const updateCounter = () => {

            count += increment;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

});

counterNumbers.forEach(counter => {

    counterObserver.observe(counter);

});


/* ===============================
        BACK TO TOP
================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "top-btn";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ===============================
    CONTACT FORM VALIDATION
================================== */

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = this.querySelectorAll("input, textarea");

        let valid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                valid = false;

                input.style.border = "2px solid red";

            } else {

                input.style.border = "2px solid #10B981";

            }

        });

        if (valid) {

            alert("Message Sent Successfully!");

            this.reset();

        }

    });

}


/* ===============================
        LOADING EFFECT
================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ===============================
        CONSOLE MESSAGE
================================== */

console.log(

`
========================================

      NovaAI Landing Page

      Developed by Patan Hussain Khan

========================================
`

);