// =========================
// PROJECT DATA (edit text here)
// =========================
const PROJECTS = {
  marlow: {
    title: "Marlow, E-Commerce Website",
    img: "assets/marlow.jpg",
    overview: "A responsive e-commerce website with product sections and interactive features.",
    features: ["Product sections and categories", "Cart counter in the navigation", "Responsive layout across devices"],
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://habebaelsheref37-netizen.github.io/ecommerce-website/",
    git: "https://github.com/habebaelsheref37-netizen/ecommerce-website"
  },
  steady: {
    title: "Steady, Time-Blocking Landing Page",
    img: "assets/steady.jpg",
    overview: "A responsive one-page landing website for Steady, a time-blocking planner designed for freelancers.",
    features: ["Clean, focused UI", "Responsive design", "Accessibility-minded markup", "Smooth interactions"],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    live: "https://habebaelsheref37-netizen.github.io/One-page-landing-page1/",
    git: "https://github.com/habebaelsheref37-netizen/One-Page-Landing-Website"
  },
  quiz: {
    title: "QuizTrack, Student Quiz & Progress Tracker",
    img: "assets/quiztrack.jpg",
    overview: "An interactive quiz and progress tracking web app for students.",
    features: ["Take quizzes", "View results", "Review answers", "Track previous attempts"],
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://habebaelsheref37-netizen.github.io/Student-Quiz-Progress-Tracker-Web-App/",
    git: "https://github.com/habebaelsheref37-netizen/Student-Quiz-Progress-Tracker-Web-App"
  }
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// =========================
// NAVBAR: scroll state, mobile menu, active link
// =========================
const header = $(".header");
const menuBtn = $(".menu-btn");
const navList = $(".nav-links");

addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 30), { passive: true });

menuBtn.addEventListener("click", () => {
  const open = navList.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
$$(".nav-links a").forEach(a => a.addEventListener("click", () => {
  navList.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
}));

const navLinks = $$(".nav-links a");
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

// =========================
// SCROLL REVEAL (staggered per group)
// =========================
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("show");
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });

$$(".cards4, .highlights, .timeline").forEach(group =>
  $$(".reveal, li", group).forEach((el, i) => el.style.setProperty("--stagger", i * 90 + "ms")));
$$(".reveal").forEach(el => io.observe(el));

// =========================
// SKILL FILTERS
// =========================
const filterBtns = $$(".filters button");
const skills = $$(".skill");

filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.toggle("active", b === btn));
  const f = btn.dataset.f;
  let i = 0;
  skills.forEach(s => {
    const match = f === "all" || s.dataset.c === f;
    s.classList.toggle("hide", !match);
    s.classList.remove("pop");
    if (match) {
      s.style.setProperty("--i", i++);
      void s.offsetWidth; // restart animation
      s.classList.add("pop");
    }
  });
}));

// =========================
// PROJECT DETAILS MODAL
// =========================
const modal = $("#modal");

function openProject(id) {
  const p = PROJECTS[id];
  if (!p) return;
  $("#m-img").src = p.img;
  $("#m-img").alt = p.title + " preview";
  $("#m-title").textContent = p.title;
  $("#m-over").textContent = p.overview;
  $("#m-feat").replaceChildren(...p.features.map(t => Object.assign(document.createElement("li"), { textContent: t })));
  $("#m-tech").replaceChildren(...p.tech.map(t => Object.assign(document.createElement("li"), { textContent: t })));
  $("#m-live").href = p.live;
  $("#m-git").href = p.git;
  modal.showModal();
}

$$("[data-open]").forEach(b => b.addEventListener("click", () => openProject(b.dataset.open)));
$(".close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// =========================
// SUBTLE 3D TILT ON PROJECT CARDS (desktop only)
// =========================
if (!reduceMotion && matchMedia("(hover: hover) and (min-width: 961px)").matches) {
  $$(".project").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "border-color .4s, box-shadow .4s";
      card.style.transform = `perspective(1100px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform .6s cubic-bezier(.2,.7,.2,1), border-color .4s, box-shadow .4s";
      card.style.transform = "";
    });
  });
}

// =========================
// CURRENT YEAR
// =========================
$("#year").textContent = new Date().getFullYear();
