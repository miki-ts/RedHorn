document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) loading.remove();
    }, 1000);
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ff003c" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff003c",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    initAnimations();
    initNavigation();
    initCounters();
    initScrollEffects();
});
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}
function initScrollEffects() {
    const animatedElements = document.querySelectorAll('.feature-card, .tech-card, .workflow-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
function initAnimations() {
    const buttons = document.querySelectorAll('.cyber-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalTitle = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        const titleLines = [
            'SECURITY',
            'TESTING', 
            '<span class="title-line accent">FRAMEWORK</span>'
        ];
        
        let currentLine = 0;
        let currentChar = 0;
        const typingSpeed = 100;
        const lineDelay = 500;
        
        function typeWriter() {
            if (currentLine < titleLines.length) {
                if (currentChar === 0) {
                    const lineElement = document.createElement('span');
                    lineElement.className = 'title-line';
                    if (currentLine === 2) {
                        lineElement.className = 'title-line accent';
                    }
                    heroTitle.appendChild(lineElement);
                }
                
                const currentLineElement = heroTitle.lastElementChild;
                const currentText = titleLines[currentLine].replace(/<[^>]*>/g, '');
                
                if (currentChar < currentText.length) {
                    if (currentLine === 2 && currentChar === 0) {
                        currentLineElement.innerHTML = '<span class="accent">' + currentText.charAt(currentChar) + '</span>';
                    } else if (currentLine === 2) {
                        currentLineElement.innerHTML += '<span class="accent">' + currentText.charAt(currentChar) + '</span>';
                    } else {
                        currentLineElement.textContent += currentText.charAt(currentChar);
                    }
                    currentChar++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeWriter, lineDelay);
                }
            }
        }
        setTimeout(typeWriter, 1000);
    }t
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
}
function initForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.cyber-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = 'MESSAGE SENT!';
                submitBtn.style.background = 'var(--secondary)';
                
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
}
document.addEventListener('DOMContentLoaded', initForm);
document.addEventListener('mousemove', (e) => {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        const speed = 0.02;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
});

function initLogoAnimations() {
    const gridLogo = document.querySelector('.grid-logo');
    const cyberGrid = document.querySelector('.cyber-grid');
    
    if (gridLogo && cyberGrid) {
        cyberGrid.addEventListener('mousemove', (e) => {
            const rect = cyberGrid.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
            
            gridLogo.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
        });
        cyberGrid.addEventListener('mouseleave', () => {
            gridLogo.style.transform = 'translateY(0) scale(1)';
        });
        cyberGrid.addEventListener('click', () => {
            gridLogo.style.transform = 'scale(1.2)';
            setTimeout(() => {
                gridLogo.style.transform = 'scale(1)';
            }, 300);
        });
    }
}
function initAnimations() {
    initLogoAnimations();
}
function initTeamAnimations() {
    const teamMembers = document.querySelectorAll('.team-member');
    const valueCards = document.querySelectorAll('.value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    [...teamMembers, ...valueCards].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initMemberInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
            }, 150);
        });s
        const socialLinks = member.querySelectorAll('.member-social a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}
function initAnimations() {
    initTeamAnimations();
    initMemberInteractions();
}
















/* script.js - cleaned, fixed, mobile-friendly nav & preserved effects */

document.addEventListener('DOMContentLoaded', () => {
    // remove potential preloader after DOM ready
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) loading.remove();
    }, 800);

    // initialize features
    initParticlesSafe();
    initNavigation();
    initCounters();
    initScrollEffects();
    initHeroTyping();
    initButtonsHover();
    initForm();
    initLogoInteractions();
    initTeamAnimations();
    initCursorTrail();
    initLoadingScreen();
});

/* --- Particles: only if library loaded --- */
function initParticlesSafe(){
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ff003c" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ff003c", opacity: 0.2, width: 1 },
                    move: { enable: true, speed: 2, random: true, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true }
                },
                retina_detect: true
            });
        } catch(e) { console.warn('particlesJS failed to init', e); }
    }
}

/* --- Navigation & mobile toggle --- */
function initNavigation(){
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // create mobile instance container when opening
    function openMobileMenu(){
        if (!navLinksContainer.classList.contains('mobile')) {
            navLinksContainer.classList.add('mobile');
            navToggle.setAttribute('aria-expanded', 'true');
            // make focusable and trap focus if needed (basic)
            navLinksContainer.querySelectorAll('a').forEach(a => a.setAttribute('tabindex','0'));
            // close on outside click
            setTimeout(() => document.addEventListener('click', outsideClickClose), 10);
        }
    }
    function closeMobileMenu(){
        if (navLinksContainer.classList.contains('mobile')) {
            navLinksContainer.classList.remove('mobile');
            navToggle.setAttribute('aria-expanded', 'false');
            navLinksContainer.querySelectorAll('a').forEach(a => a.removeAttribute('tabindex'));
            document.removeEventListener('click', outsideClickClose);
        }
    }
    function outsideClickClose(e){
        if (!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }

    // hamburger toggle
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMobileMenu(); else openMobileMenu();
        });
    }

    // smooth scroll and close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // close mobile after navigation
            closeMobileMenu();
        });
    });

    // highlight active section on scroll
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
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }, { passive: true });
}

/* --- Counters --- */
function initCounters(){
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count') || '0', 10);
                const duration = 1800;
                const start = performance.now();
                const step = (timestamp) => {
                    const progress = Math.min((timestamp - start) / duration, 1);
                    el.textContent = Math.floor(progress * target);
                    if (progress < 1) requestAnimationFrame(step); else el.textContent = String(target);
                };
                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* --- Scroll-based reveal animations --- */
function initScrollEffects(){
    const animatedElements = document.querySelectorAll('.feature-card, .tech-card, .workflow-step, .team-member, .value-card');
    if (!animatedElements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        observer.observe(el);
    });
}

/* --- Typing effect for hero title --- */
function initHeroTyping(){
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    heroTitle.innerHTML = '';
    const titleLines = ['SECURITY', 'TESTING', '<span class="title-line accent">FRAMEWORK</span>'];
    let currentLine = 0, charIndex = 0;
    const typingSpeed = 70, lineDelay = 500;

    function typeWriter(){
        if (currentLine >= titleLines.length) return;
        const raw = titleLines[currentLine];
        const text = raw.replace(/<[^>]*>/g, '');
        if (charIndex === 0) {
            const span = document.createElement('span');
            span.className = (currentLine === 2) ? 'title-line accent' : 'title-line';
            heroTitle.appendChild(span);
        }
        const currentSpan = heroTitle.lastElementChild;
        if (charIndex < text.length) {
            if (currentLine === 2) {
                currentSpan.innerHTML += `<span class="accent">${text.charAt(charIndex)}</span>`;
            } else {
                currentSpan.textContent += text.charAt(charIndex);
            }
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            currentLine++; charIndex = 0;
            setTimeout(typeWriter, lineDelay);
        }
    }
    setTimeout(typeWriter, 500);
}

/* --- Button micro animations --- */
function initButtonsHover(){
    const buttons = document.querySelectorAll('.cyber-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-2px)');
        btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });
}

/* --- Contact form micro UX (no network) --- */
function initForm(){
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const btn = this.querySelector('.cyber-btn');
        if (!btn) return;
        const original = btn.querySelector('.btn-text') ? btn.querySelector('.btn-text').textContent : btn.textContent;
        btn.querySelector('.btn-text').textContent = 'SENDING...';
        btn.disabled = true;
        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = 'MESSAGE SENT!';
            btn.style.background = 'var(--secondary)';
            setTimeout(() => {
                btn.querySelector('.btn-text').textContent = original;
                btn.disabled = false;
                btn.style.background = '';
                contactForm.reset();
            }, 1600);
        }, 1000);
    });
}

/* --- Logo parallax & interactions --- */
function initLogoInteractions(){
    const cyberGrid = document.querySelector('.cyber-grid');
    const gridLogo = document.querySelector('.grid-logo');
    if (!cyberGrid || !gridLogo) return;

    cyberGrid.addEventListener('mousemove', (e) => {
        const rect = cyberGrid.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        gridLogo.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
    });
    cyberGrid.addEventListener('mouseleave', () => gridLogo.style.transform = 'translateY(0) scale(1)');
    cyberGrid.addEventListener('click', () => {
        gridLogo.style.transform = 'scale(1.12)';
        setTimeout(() => gridLogo.style.transform = 'scale(1)', 260);
    });
}

/* --- Cursor trail (subtle) --- */
function initCursorTrail(){
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.borderRadius = '50%';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.background = 'radial-gradient(circle, rgba(255,0,60,0.9) 0%, transparent 60%)';
    cursor.style.zIndex = '1200';
    cursor.style.mixBlendMode = 'screen';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top  = `${e.pageY}px`;
    });
}

/* --- Team card interactions & reveal --- */
function initTeamAnimations(){
    const members = document.querySelectorAll('.team-member');
    if (!members.length) return;
    members.forEach(mem => {
        mem.addEventListener('click', () => {
            mem.style.transform = 'translateY(-12px) scale(1.02)';
            setTimeout(() => mem.style.transform = '', 220);
        });
        const socials = mem.querySelectorAll('.member-social a');
        socials.forEach(s => {
            s.addEventListener('mouseenter', () => s.style.transform = 'translateY(-3px) scale(1.06)');
            s.addEventListener('mouseleave', () => s.style.transform = '');
        });
    });
}

/* --- Loading screen fallback for fast/slow load --- */
function initLoadingScreen(){
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.inset = '0';
    loadingScreen.style.background = 'var(--darker)';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.zIndex = '1300';
    loadingScreen.innerHTML = '<div class="loading-spinner" style="width:56px;height:56px;border:4px solid rgba(255,0,60,0.2);border-top:4px solid var(--primary);border-radius:50%;animation:spin 1s linear infinite"></div>';
    document.body.appendChild(loadingScreen);
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
        }, 900);
    });
}

/* --- small helper key scrolls --- */
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    if (e.key === 'ArrowUp')   window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
}, { passive: true });

/* spin animation keyframes backup (in case CSS missing) */
(function addSpinKeyframe(){
    const style = document.createElement('style');
    style.textContent = '@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}';
    document.head.appendChild(style);
})();














// Loading Screen Functionality
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Show loading screen
        loadingScreen.style.display = 'flex';
        
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500); // Minimum show time for smooth UX
        });

        // Fallback: if page takes too long to load, hide loading screen anyway
        setTimeout(() => {
            if (loadingScreen.style.display !== 'none') {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 5000); // Maximum 5 seconds
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    
    // Your other initialization code here...
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ff003c" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff003c",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Remove any duplicate loading elements
    const duplicateLoading = document.querySelector('.loading:not(#loading-screen)');
    if (duplicateLoading) {
        duplicateLoading.remove();
    }
});


















// Update navigation to include framework page
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetHref = link.getAttribute('href');
        
        // Handle internal page navigation
        if (targetHref.includes('.html')) {
            e.preventDefault();
            window.location.href = targetHref;
        } else {
            // Handle anchor links on same page
            e.preventDefault();
            const targetSection = document.querySelector(targetHref);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});