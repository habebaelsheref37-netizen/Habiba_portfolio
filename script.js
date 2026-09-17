// =========================
// SMOOTH SCROLL
// =========================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const sectionId = link.getAttribute("href");

        const section = document.querySelector(sectionId);

        section.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    ".about-content, .skill-card, .project-card, .education-card, .contact"
);

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(function (element) {

    element.classList.add("hidden");

    observer.observe(element);

});


// =========================
// CURRENT YEAR
// =========================

const footerText = document.querySelector(".footer p");

const currentYear = new Date().getFullYear();

footerText.textContent =
    `© ${currentYear} Habiba. All rights reserved.`;