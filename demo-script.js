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
    initAnimations();
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
}

function initAnimations() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.transition = 'width 2s ease-in-out';
            progressFill.style.width = '95%';
        }, 500);
    }

    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    const buttons = document.querySelectorAll('.cyber-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}
