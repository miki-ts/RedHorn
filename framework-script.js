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

    initFrameworkAnimations();
    initTreeInteractions();
});

function initFrameworkAnimations() {
    const componentCards = document.querySelectorAll('.component-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    componentCards.forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });

    // Animate tree nodes sequentially
    const treeNodes = document.querySelectorAll('.tree-node');
    treeNodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translateX(-10px)';
        node.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateX(0)';
        }, 100 + index * 30);
    });
}

function initTreeInteractions() {
    const treeNodes = document.querySelectorAll('.tree-node.directory');
    
    treeNodes.forEach(node => {
        const branch = node.querySelector('.tree-branch');
        if (branch) {
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








