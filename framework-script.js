// Framework Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initFrameworkAnimations();
    initTreeInteractions();
    initFrameworkParticles();
});

function initFrameworkParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 60, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { value: "#ff003c" },
                shape: { type: "circle" },
                opacity: { 
                    value: 0.3, 
                    random: true 
                },
                size: { 
                    value: 2, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff003c",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
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
                        enable: true, 
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
}

function initFrameworkAnimations() {
    // Animate component cards on scroll
    const componentCards = document.querySelectorAll('.component-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    componentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Animate tree nodes sequentially
    const treeNodes = document.querySelectorAll('.tree-node');
    treeNodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translateX(-20px)';
        node.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateX(0)';
        }, 100 + index * 50);
    });
}

function initTreeInteractions() {
    const treeNodes = document.querySelectorAll('.tree-node.directory');
    
    treeNodes.forEach(node => {
        const branch = node.querySelector('.tree-branch');
        if (branch) {
            // Initially collapse all branches
            branch.style.display = 'none';
            
            node.addEventListener('click', function(e) {
                e.stopPropagation();
                const isVisible = branch.style.display !== 'none';
                
                if (isVisible) {
                    branch.style.display = 'none';
                    node.classList.remove('expanded');
                } else {
                    branch.style.display = 'block';
                    node.classList.add('expanded');
                }
            });
            
            // Add expand/collapse indicator
            const icon = node.querySelector('.node-content i');
            if (icon) {
                icon.classList.add('fa-folder');
                icon.classList.remove('fa-folder-open');
                
                node.addEventListener('click', function() {
                    if (node.classList.contains('expanded')) {
                        icon.classList.remove('fa-folder');
                        icon.classList.add('fa-folder-open');
                    } else {
                        icon.classList.remove('fa-folder-open');
                        icon.classList.add('fa-folder');
                    }
                });
            }
        }
    });

    // Expand root node by default
    const rootNode = document.querySelector('.tree-node.root');
    if (rootNode) {
        const rootBranch = rootNode.querySelector('.tree-branch');
        if (rootBranch) {
            rootBranch.style.display = 'block';
            rootNode.classList.add('expanded');
            const rootIcon = rootNode.querySelector('.node-content i');
            if (rootIcon) {
                rootIcon.classList.remove('fa-folder');
                rootIcon.classList.add('fa-folder-open');
            }
        }
    }
}

// Add keyboard navigation for tree
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const focused = document.activeElement;
        if (focused.classList.contains('tree-node')) {
            e.preventDefault();
            if (e.key === 'ArrowRight') {
                // Expand
                focused.click();
            } else if (e.key === 'ArrowLeft') {
                // Collapse
                const branch = focused.querySelector('.tree-branch');
                if (branch && branch.style.display !== 'none') {
                    focused.click();
                }
            }
        }
    }
});

// Loading screen functionality for framework page
function initFrameworkLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Fallback
        setTimeout(() => {
            if (loadingScreen.style.display !== 'none') {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 4000);
    }
}

// Initialize loading screen
initFrameworkLoading();












