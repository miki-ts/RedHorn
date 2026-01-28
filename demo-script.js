document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: window.innerWidth < 768 ? 40 : 60,
                    density: { 
                        enable: true, 
                        value_area: window.innerWidth < 768 ? 600 : 800 
                    }
                },
                color: { value: "#ff003c" },
                shape: { type: "circle" },
                opacity: { 
                    value: window.innerWidth < 768 ? 0.4 : 0.5,
                    random: true 
               },
                size: { 
                    value: window.innerWidth < 768 ? 2 : 3,
                    random: true 
                },
                line_linked: {
                    enable: window.innerWidth > 768,
                    distance: 150,
                    color: "#ff003c",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: window.innerWidth < 768 ? 1.5 : 2,
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
                    onhover: { 
                        enable: window.innerWidth > 768,
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    initCountdown();

    initNotifyForm();

    initAnimations();

    window.addEventListener('resize', handleResize);
});

function handleResize() {
    if (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroy();
        setTimeout(() => {
            particlesJS('particles-js', getParticlesConfig());
        }, 100);
    }
}

function getParticlesConfig() {
    return {
        particles: {
            number: { 
                value: window.innerWidth < 768 ? 40 : 60,
                density: { 
                    enable: true, 
                    value_area: window.innerWidth < 768 ? 600 : 800 
                } 
            },
            color: { value: "#ff003c" },
            shape: { type: "circle" },
            opacity: { 
                value: window.innerWidth < 768 ? 0.4 : 0.5,
                random: true 
            },
            size: { 
                value: window.innerWidth < 768 ? 2 : 3,
                random: true 
            },
            line_linked: {
                enable: window.innerWidth > 768,
                distance: 150,
                color: "#ff003c",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: window.innerWidth < 768 ? 1.5 : 2,
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
                onhover: { 
                    enable: window.innerWidth > 768,
                    mode: "repulse" 
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                },
                resize: true
            }
        },
        retina_detect: true
    };
}

function initCountdown() {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    launchDate.setHours(12, 0, 0, 0);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownTimer);
            const countdownTimerEl = document.querySelector('.countdown-timer');
            if (countdownTimerEl) {
                countdownTimerEl.innerHTML = '<div class="launched-message">Demo Launched!</div>';
            }
        }
    }
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
}

function initNotifyForm() {
    const notifyForm = document.querySelector('.notify-form');
    if (!notifyForm) return;

    const emailInput = notifyForm.querySelector('.cyber-input');
    const submitBtn = notifyForm.querySelector('.cyber-btn');

    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'SUBSCRIBING...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'SUBSCRIBED!';
            submitBtn.style.background = 'var(--secondary)';
            showNotification('Thank you! We\'ll notify you when the demo launches.', 'success');
            emailInput.value = '';

            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
    emailInput.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });

    emailInput.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    const isMobile = window.innerWidth < 768;
    
    notification.style.cssText = `
        position: fixed;
        top: ${isMobile ? '80px' : '100px'};
        ${isMobile ? 'left: 1rem; right: 1rem;' : 'right: 20px;'}
        background: ${type === 'success' ? 'rgba(0, 240, 255, 0.95)' : 'rgba(255, 0, 60, 0.95)'};
        color: white;
        padding: ${isMobile ? '0.875rem 1.5rem' : '1rem 2rem'};
        border-radius: 8px;
        z-index: 10000;
        transform: ${isMobile ? 'translateY(-100px)' : 'translateX(100%)'};
        transition: transform 0.3s ease;
        text-align: center;
        font-size: ${isMobile ? '0.9rem' : '1rem'};
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 0, 60, 0.3)'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = isMobile ? 'translateY(0)' : 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = isMobile ? 'translateY(-100px)' : 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initAnimations() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.transition = 'width 2s ease-in-out';
            progressFill.style.width = '70%';
        }, 500);
    }
    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
            }
        });
        item.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        }, { passive: true });

        item.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        }, { passive: true });
    });
    const buttons = document.querySelectorAll('.cyber-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    buttons.forEach(btn => {
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, { passive: false });
    });
    document.body.style.webkitOverflowScrolling = 'touch';
}
const viewportMeta = document.createElement('meta');
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
document.head.appendChild(viewportMeta);

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500); 
        });

        setTimeout(() => {
            if (loadingScreen.style.display !== 'none') {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 5000); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    
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
    const duplicateLoading = document.querySelector('.loading:not(#loading-screen)');
    if (duplicateLoading) {
        duplicateLoading.remove();
    }
});

if (window.location.pathname.includes('demo.html')) {
    window.history.replaceState(null, null, '/');
}
