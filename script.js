document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after initialization
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 800);

    initNavigation();
    initScrollEffects();
});

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    function openMobileMenu() {
        if (!navLinksContainer.classList.contains('mobile')) {
            navLinksContainer.classList.add('mobile');
            navToggle.setAttribute('aria-expanded', 'true');
            navLinksContainer.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '0'));
            setTimeout(() => document.addEventListener('click', outsideClickClose), 10);
        }
    }

    function closeMobileMenu() {
        if (navLinksContainer.classList.contains('mobile')) {
            navLinksContainer.classList.remove('mobile');
            navToggle.setAttribute('aria-expanded', 'false');
            navLinksContainer.querySelectorAll('a').forEach(a => a.removeAttribute('tabindex'));
            document.removeEventListener('click', outsideClickClose);
        }
    }

    function outsideClickClose(e) {
        if (!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMobileMenu();
            else openMobileMenu();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's a link to another page
            if (href && (href.includes('.html') || href.startsWith('http'))) {
                // Let the default behavior happen for external links
                return;
            }
            
            // For anchor links, prevent default and scroll smoothly
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                closeMobileMenu();
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
                current = section.id || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

function initScrollEffects() {
    const animatedElements = document.querySelectorAll('.feature-card, .workflow-step, .team-member');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

function initForm() {
    const contactForm = document.querySelector('.form-content');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.cyber-btn');
        if (!btn) return;
        const original = btn.querySelector('.btn-text') ? btn.querySelector('.btn-text').textContent : btn.textContent;
        btn.querySelector('.btn-text').textContent = 'SENDING...';
        btn.disabled = true;

        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = 'MESSAGE SENT!';
            btn.style.background = 'var(--accent-secondary)';
            
            setTimeout(() => {
                btn.querySelector('.btn-text').textContent = original;
                btn.disabled = false;
                btn.style.background = '';
                contactForm.reset();
            }, 1600);
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', initForm);

