/* =====================================================
   PORTFOLIO WEBSITE SCRIPT
===================================================== */

let currentWorks = [...works];
let visibleCount = 6;
let currentFilter = "all";

const portfolioGrid = document.getElementById("portfolioGrid");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("loadMore");

/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 0.4,
        onComplete: () => {
            loader.style.display = "none";
        }
    });
});

/* =====================================================
   HERO VIDEO CAROUSEL
===================================================== */

const heroVideos = works.filter(w => w.type === "video");
let currentHeroIndex = 0;

const cards = {
    left: document.querySelector(".carousel-card.left"),
    center: document.querySelector(".carousel-card.center"),
    right: document.querySelector(".carousel-card.right")
};

const dotsContainer = document.querySelector(".carousel-dots");
const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");

function getVideoSrc(index) {
    const i = ((index % heroVideos.length) + heroVideos.length) % heroVideos.length;
    return heroVideos[i];
}

function setCardVideo(card, work, shouldPlay = false) {
    const video = card.querySelector("video");
    if (!video || !work) return;

    if (video.dataset.src === work.video) {
        if (shouldPlay) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
        return;
    }

    video.pause();
    video.src = work.video;
    video.dataset.src = work.video;
    video.load();

    if (shouldPlay) {
        video.play().catch(() => {});
    }
}

function updateCarousel() {
    const prev = getVideoSrc(currentHeroIndex - 1);
    const current = getVideoSrc(currentHeroIndex);
    const next = getVideoSrc(currentHeroIndex + 1);

    setCardVideo(cards.left, prev, false);
    setCardVideo(cards.center, current, true);
    setCardVideo(cards.right, next, false);

    document.querySelectorAll(".carousel-dots button").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentHeroIndex);
    });
}

function createDots() {
    dotsContainer.innerHTML = "";
    heroVideos.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.setAttribute("aria-label", `Видео ${i + 1}`);
        if (i === 0) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentHeroIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(btn);
    });
}

function nextSlide() {
    currentHeroIndex = (currentHeroIndex + 1) % heroVideos.length;
    updateCarousel();
}

function prevSlide() {
    currentHeroIndex = (currentHeroIndex - 1 + heroVideos.length) % heroVideos.length;
    updateCarousel();
}

if (heroVideos.length > 0) {
    createDots();
    updateCarousel();

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    cards.left.addEventListener("click", prevSlide);
    cards.right.addEventListener("click", nextSlide);

    setInterval(nextSlide, 8000);
}

/* =====================================================
   RENDER PORTFOLIO
===================================================== */

function renderWorks() {
    portfolioGrid.innerHTML = "";

    const items = currentWorks.slice(0, visibleCount);

    items.forEach(work => {
        const card = document.createElement("div");
        card.className = "work-card";

        let media = "";

        if (work.type === "video") {
            media = `
                <video muted loop playsinline preload="metadata"
                    src="${work.video}"
                    poster="${work.thumbnail || ''}">
                </video>
                <div class="video-indicator">▶</div>
            `;
        } else {
            media = `
                <img loading="lazy" src="${work.thumbnail || work.image}" alt="${work.title}">
            `;
        }

        card.innerHTML = `
            ${media}
            <div class="work-info">
                <h3>${work.title}</h3>
                <p>${work.year} • ${work.description}</p>
                <div class="work-tags">
                    ${work.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
            </div>
        `;

        card.addEventListener("click", () => openModal(work));
        portfolioGrid.appendChild(card);
    });

    animateCards();
    updateLoadButton();
}

function updateLoadButton() {
    if (visibleCount >= currentWorks.length) {
        loadMoreBtn.style.display = "none";
    } else {
        loadMoreBtn.style.display = "block";
    }
}

loadMoreBtn.addEventListener("click", () => {
    visibleCount += 3;
    renderWorks();
});

/* =====================================================
   FILTERS + SEARCH
===================================================== */

document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        applyFilters();
    });
});

function applyFilters() {
    const search = searchInput.value.toLowerCase();

    currentWorks = works.filter(work => {
        const categoryMatch =
            currentFilter === "all" ||
            work.type === currentFilter ||
            work.category === currentFilter;

        const searchMatch =
            work.title.toLowerCase().includes(search) ||
            work.tags.join(" ").toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });

    visibleCount = 6;
    renderWorks();
}

searchInput.addEventListener("input", applyFilters);

/* =====================================================
   INIT PORTFOLIO
===================================================== */

renderWorks();

/* =====================================================
   MODAL
===================================================== */

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openModal(work) {
    modalBody.innerHTML = "";

    if (work.type === "video") {
        modalBody.innerHTML = `
            <video controls autoplay playsinline src="${work.video}"></video>
        `;
    } else {
        modalBody.innerHTML = `
            <img src="${work.image || work.thumbnail}" alt="${work.title}">
        `;
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function hideModal() {
    modal.classList.remove("active");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideModal);
document.querySelector(".modal-overlay").addEventListener("click", hideModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideModal();
});

/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});

/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2
    });
});

document.querySelectorAll("a, button, .work-card, input, textarea, .carousel-card, .carousel-arrow").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
});

/* =====================================================
   VIDEO HOVER IN PORTFOLIO
===================================================== */

document.addEventListener("mouseenter", (e) => {
    if (e.target.tagName === "VIDEO" && e.target.closest(".work-card")) {
        e.target.play().catch(() => {});
    }
}, true);

document.addEventListener("mouseleave", (e) => {
    if (e.target.tagName === "VIDEO" && e.target.closest(".work-card")) {
        e.target.pause();
    }
}, true);

/* =====================================================
   GSAP ANIMATIONS
===================================================== */

gsap.registerPlugin(ScrollTrigger);

const heroTimeline = gsap.timeline();

heroTimeline
    .to(".subtitle", { opacity: 1, y: -15, duration: 1, ease: "power3.out" })
    .to(".hero h1", { opacity: 1, y: -15, duration: 1.1, ease: "power4.out" }, "-=.6")
    .to(".hero p", { opacity: 1, y: -15, duration: 0.9, ease: "power3.out" }, "-=.7")
    .to(".hero-buttons", { opacity: 1, y: -15, duration: 0.9, ease: "power3.out" }, "-=.6");

gsap.utils.toArray("section:not(.hero)").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%"
        }
    });
});

gsap.to(".about-left img", {
    y: -60,
    ease: "none",
    scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

function animateCards() {
    gsap.from(".work-card", {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out"
    });
}

gsap.utils.toArray(".service-card").forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        scrollTrigger: {
            trigger: card,
            start: "top 88%"
        }
    });
});

gsap.from(".cta-content", {
    scale: 0.92,
    opacity: 0,
    duration: 1.1,
    scrollTrigger: {
        trigger: ".cta",
        start: "top 75%"
    }
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.style.background = "rgba(5,5,5,.75)";
    } else {
        nav.style.background = "transparent";
    }
});

document.querySelectorAll(".primary, .secondary").forEach(button => {
    button.addEventListener("mousemove", e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * 0.12, y: y * 0.12, duration: 0.3 });
    });

    button.addEventListener("mouseleave", () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.5 });
    });
});

document.querySelector(".contact-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Спасибо! Сообщение подготовлено.");
});