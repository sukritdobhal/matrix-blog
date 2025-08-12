// 3D Navigation Sphere Controller
class NavigationSphere {
    constructor() {
        this.sphere = document.getElementById('mainSphere');
        this.container = document.getElementById('sphereContainer');
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.isMouseOver = false;
        
        this.init();
    }
    
    init() {
        // Mouse move event for rotation
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Mouse enter/leave events for the sphere container
        this.container.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
            this.container.style.transform = 'scale(1.1)';
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
            this.container.style.transform = 'scale(1)';
            // Gradually return to center position
            this.targetRotationX = 0;
            this.targetRotationY = 0;
        });
        
        // Click events for navigation items
        const sphereItems = document.querySelectorAll('.sphere-item');
        sphereItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleItemClick(e));
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(0, 255, 0, 0.4)';
                item.style.transform = 'scale(1.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'rgba(0, 255, 0, 0.1)';
                item.style.transform = 'scale(1)';
            });
        });
        
        // Start animation loop
        this.animate();
        
        // Auto-rotation when not hovered
        this.startAutoRotation();
    }
    
    handleMouseMove(e) {
        if (this.isMouseOver) {
            const rect = this.container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate rotation based on mouse position relative to sphere center
            this.targetRotationY = (e.clientX - centerX) * 0.5;
            this.targetRotationX = -(e.clientY - centerY) * 0.5;
        }
    }
    
    handleItemClick(e) {
        e.preventDefault();
        const link = e.currentTarget.getAttribute('data-link');
        
        // Add click animation
        e.currentTarget.style.transform = 'scale(0.9)';
        setTimeout(() => {
            e.currentTarget.style.transform = 'scale(1)';
        }, 150);
        
        // Navigate after animation
        setTimeout(() => {
            if (link.startsWith('#')) {
                // Scroll to section or handle internal links
                const section = document.querySelector(link);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to page
                window.location.href = link;
            }
        }, 200);
    }
    
    animate() {
        // Smooth rotation interpolation
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.1;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.1;
        
        // Apply rotation to sphere
        this.sphere.style.transform = `rotateX(${this.currentRotationX}deg) rotateY(${this.currentRotationY}deg)`;
        
        requestAnimationFrame(() => this.animate());
    }
    
    startAutoRotation() {
        setInterval(() => {
            if (!this.isMouseOver) {
                // Gentle auto-rotation
                this.targetRotationY += 0.5;
                if (this.targetRotationY > 360) {
                    this.targetRotationY = 0;
                }
            }
        }, 50);
    }
}

// Initialize Navigation Sphere when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationSphere();
});
