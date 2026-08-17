'use strict';

/* =========================================================
   Informations centralisées du portfolio.
   Modifie uniquement cet objet pour mettre à jour tes liens
   partout sur le site (hero, footer, section contact...).
   ========================================================= */
const portfolioData = {
    name: 'MISSIKPODE Mahugnon Cosme',
    github: 'https://github.com/missikpodecosme109',
    linkedin: 'https://bj.linkedin.com/in/mahugnon-cosme-missikpode-49b5ab392',
    whatsapp: 'https://wa.me/2290163881159',
    email: 'missikpodecosme@gmail.com',
    cv: 'assets/CV_MISSIKPODE_COSME.pdf'
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    wireCentralLinks();
    initHeaderScroll();
    initMobileNav();
    initThemeToggle();
    initActiveNavOnScroll();
    initRevealAnimations();
    initTypedRoles();
    initBackToTop();
    initProjectFilters();
    initContactForm();
    initFooterYear();
});

/* ---------- Liens centralisés ---------- */
function wireCentralLinks() {
    document.querySelectorAll('[data-link="github"]').forEach(el => el.href = portfolioData.github);
    document.querySelectorAll('[data-link="linkedin"]').forEach(el => el.href = portfolioData.linkedin);
    document.querySelectorAll('[data-link="whatsapp"]').forEach(el => el.href = portfolioData.whatsapp);
    document.querySelectorAll('[data-link="email"]').forEach(el => el.href = `mailto:${portfolioData.email}`);
    document.querySelectorAll('[data-link="email-text"]').forEach(el => el.textContent = portfolioData.email);
    document.querySelectorAll('[data-link="cv"]').forEach(el => el.href = portfolioData.cv);
}

/* ---------- Header : fond + ombre au scroll ---------- */
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const update = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Menu mobile ---------- */
function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const links = document.querySelectorAll('.mobile-nav-panel a');
    if (!toggle || !nav) return;

    const closeMenu = () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        nav.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('is-open');
        isOpen ? closeMenu() : openMenu();
    });

    backdrop?.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

/* ---------- Mode sombre / clair ---------- */
function initThemeToggle() {
    const root = document.documentElement;
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    const STORAGE_KEY = 'portfolio-theme';

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        root.setAttribute('data-theme', stored);
    }

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem(STORAGE_KEY, next);
        });
    });
}

/* ---------- Lien actif dans la navigation au scroll ---------- */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-panel a');
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}

/* ---------- Apparition progressive au scroll ---------- */
function initRevealAnimations() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.08}s`;
        observer.observe(el);
    });
}

/* ---------- Animation du rôle dans le hero ---------- */
function initTypedRoles() {
    const el = document.querySelector('.role-text');
    const cursor = document.querySelector('.role-cursor');
    if (!el) return;

    const roles = [
        'Réseaux informatiques',
        'Cybersécurité',
        'Développement Web',
        'Technologies numériques'
    ];

    if (reduceMotion) {
        el.textContent = roles[0];
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const current = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1400);
                return;
            }
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(tick, deleting ? 45 : 75);
    };

    tick();
}

/* ---------- Bouton retour en haut ---------- */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
}

/* ---------- Filtres de projets ---------- */
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('is-hidden', !match);
            });
        });
    });
}

/* ---------- Formulaire de contact (ouvre le client email, sans backend) ---------- */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#contact-name')?.value.trim() || '';
        const subject = form.querySelector('#contact-subject')?.value.trim() || 'Contact depuis le portfolio';
        const message = form.querySelector('#contact-message')?.value.trim() || '';

        const body = encodeURIComponent(`${message}\n\n— ${name}`);
        const mailSubject = encodeURIComponent(subject);

        window.location.href = `mailto:${portfolioData.email}?subject=${mailSubject}&body=${body}`;
    });
}

/* ---------- Année du footer ---------- */
function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}
