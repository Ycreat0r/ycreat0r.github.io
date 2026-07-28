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
        onComplete: () => { loader.style.display = "none"; }
    });
});

/* =====================================================
   HERO CAROUSEL — Luma-style, без пропадания + свайп
===================================================== */

const heroVideos = works.filter(w => w.type === "video");
let currentHeroIndex = 0;
let isAnimating = false;
let autoplayTimer = null;
const AUTOPLAY_MS = 8000; // сколько держится один ролик

const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");

function buildCarousel() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    heroVideos.forEach((work, i) => {
        // card
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.dataset.index = i;
        card.innerHTML = `
            <video muted loop playsinline preload="metadata" src="${work.video}"></video>
            <div class="card-overlay"></div>
        `;
        card.addEventListener("click", () => {
            if (i !== currentHeroIndex) goTo(i);
        });
        track.appendChild(card);

        // dot
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Видео ${i + 1}`);
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
    });
}

function getOffset() {
    const w = window.innerWidth;
    if (w < 600) return Math.round(w * 0.55);
    if (w < 900) return Math.round(w * 0.48);
    if (w < 1200) return Math.round(w * 0.42);
    return Math.round(Math.min(980, w * 0.72) * 0.72);
}

function layoutCards(animate = true) {
    const cards = [...track.querySelectorAll(".carousel-card")];
    const n = cards.length;
    if (n === 0) return;

    const offset = getOffset();
    const duration = animate ? 0.7 : 0;

    cards.forEach((card, i) => {
        // кратчайшая разница индексов (циклическая)
        let diff = i - currentHeroIndex;
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;

        const video = card.querySelector("video");

        if (diff === 0) {
            // центр
            card.classList.add("is-center");
            card.classList.remove("is-side");
            gsap.to(card, {
                x: 0,
                y: "-50%",
                xPercent: -50,
                scale: 1,
                opacity: 1,
                filter: "brightness(1)",
                zIndex: 5,
                duration,
                ease: "power2.inOut"
            });
            video.play().catch(() => {});
        } else if (Math.abs(diff) === 1) {
            // сосед слева / справа
            card.classList.add("is-side");
            card.classList.remove("is-center");
            gsap.to(card, {
                x: diff * offset,
                y: "-50%",
                xPercent: -50,
                scale: 0.78,
                opacity: 0.55,
                filter: "brightness(0.6)",
                zIndex: 2,
                duration,
                ease: "power2.inOut"
            });
            video.pause();
        } else {
            // дальние — чуть дальше и тусклее, но НЕ пропадают
            card.classList.add("is-side");
            card.classList.remove("is-center");
            gsap.to(card, {
                x: Math.sign(diff) * offset * 1.55,
                y: "-50%",
                xPercent: -50,
                scale: 0.65,
                opacity: 0.3,
                filter: "brightness(0.45)",
                zIndex: 1,
                duration,
                ease: "power2.inOut"
            });
            video.pause();
        }
    });

    // dots
    dotsContainer.querySelectorAll("button").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentHeroIndex);
    });
}

function resetAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = setTimeout(() => {
        if (!isAnimating) goTo(currentHeroIndex + 1);
    }, AUTOPLAY_MS);
}

function goTo(index) {
    if (isAnimating || heroVideos.length === 0) return;

    const n = heroVideos.length;
    const next = ((index % n) + n) % n;
    if (next === currentHeroIndex) {
        resetAutoplay();
        return;
    }

    isAnimating = true;
    currentHeroIndex = next;
    layoutCards(true);
    resetAutoplay();

    setTimeout(() => {
        isAnimating = false;
    }, 720);
}

function nextSlide() { goTo(currentHeroIndex + 1); }
function prevSlide() { goTo(currentHeroIndex - 1); }

/* Свайп */
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    const dx = touchEndX - touchStartX;
    if (Math.abs(dx) > 50) {
        if (dx < 0) nextSlide();
        else prevSlide();
    }
}, { passive: true });

/* мышь-drag (опционально) */
let dragStartX = 0;
let isDragging = false;

track.addEventListener("mousedown", e => {
    isDragging = true;
    dragStartX = e.clientX;
});

window.addEventListener("mouseup", e => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 60) {
        if (dx < 0) nextSlide();
        else prevSlide();
    }
});

if (heroVideos.length > 0) {
    buildCarousel();
    // начальная раскладка без анимации
    layoutCards(false);
    // чуть подождать размеры
    requestAnimationFrame(() => layoutCards(false));
    resetAutoplay();

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    window.addEventListener("resize", () => {
        if (!isAnimating) layoutCards(false);
    });
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
                    src="${work.video}" poster="${work.thumbnail || ''}">
                </video>
                <div class="video-indicator">▶</div>
            `;
        } else {
            media = `<img loading="lazy" src="${work.thumbnail || work.image}" alt="${work.title}">`;
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
    loadMoreBtn.style.display = visibleCount >= currentWorks.length ? "none" : "block";
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
        modalBody.innerHTML = `<video controls autoplay playsinline src="${work.video}"></video>`;
    } else {
        modalBody.innerHTML = `<img src="${work.image || work.thumbnail}" alt="${work.title}">`;
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
document.addEventListener("keydown", e => {
    if (e.key === "Escape") hideModal();
});

/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("active"));
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});

/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2 });
});

document.querySelectorAll("a, button, .work-card, input, textarea, .carousel-arrow").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
});

/* =====================================================
   VIDEO HOVER IN PORTFOLIO
===================================================== */

document.addEventListener("mouseenter", e => {
    if (e.target.tagName === "VIDEO" && e.target.closest(".work-card")) {
        e.target.play().catch(() => {});
    }
}, true);

document.addEventListener("mouseleave", e => {
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
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" }
    });
});

gsap.to(".about-left img", {
    y: -60, ease: "none",
    scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true }
});

function animateCards() {
    gsap.from(".work-card", {
        opacity: 0, y: 40, scale: 0.96, stagger: 0.07, duration: 0.7, ease: "power3.out"
    });
}

gsap.utils.toArray(".service-card").forEach(card => {
    gsap.from(card, {
        opacity: 0, y: 50, duration: 0.9,
        scrollTrigger: { trigger: card, start: "top 88%" }
    });
});

gsap.from(".cta-content", {
    scale: 0.92, opacity: 0, duration: 1.1,
    scrollTrigger: { trigger: ".cta", start: "top 75%" }
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    nav.style.background = window.scrollY > 50 ? "rgba(5,5,5,.75)" : "transparent";
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