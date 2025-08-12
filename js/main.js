// Main Application Logic
class MatrixBlog {
    constructor() {
        this.articles = [
            {
                title: "Welcome to the Matrix",
                excerpt: "Diving deep into the digital realm where reality meets code. Explore the fundamental concepts of web development and digital consciousness.",
                date: "2024-01-15",
                slug: "welcome-to-matrix",
                readTime: "5 min read"
            },
            {
                title: "The Art of Digital Creation",
                excerpt: "Understanding the balance between functionality and aesthetics in modern web design. Creating immersive experiences that captivate users.",
                date: "2024-01-10",
                slug: "digital-creation",
                readTime: "8 min read"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderArticles();
        this.initializeStats();
        this.initializeTypewriter();
        this.handleScrollEffects();
        
        // Initialize terminal cursor blinking
        this.initializeCursor();
        
        // Add glitch effects occasionally
        this.addGlitchEffects();
    }
    
    renderArticles() {
        const articlesGrid = document.getElementById('articlesGrid');
        if (!articlesGrid) return;
        
        articlesGrid.innerHTML = '';
        
        this.articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            
            articleCard.innerHTML = `
                <h3><a href="articles/${article.slug}.html" class="article-title">${article.title}</a></h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="article-date">${this.formatDate(article.date)}</span>
                    <a href="articles/${article.slug}.html" class="read-more">${article.readTime} →</a>
                </div>
            `;
            
            articlesGrid.appendChild(articleCard);
        });
    }
    
    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    initializeStats() {
        const articleCount = document.getElementById('articleCount');
        const viewCount = document.getElementById('viewCount');
        
        if (articleCount) {
            this.animateNumber(articleCount, this.articles.length, 2000);
        }
        
        if (viewCount) {
            this.animateNumber(viewCount, Math.floor(Math.random() * 9999) + 1000, 3000);
        }
    }
    
    animateNumber(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toString().padStart(2, '0');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toString().padStart(2, '0');
            }
        }, 16);
    }
    
    initializeTypewriter() {
        const typingTexts = document.querySelectorAll('.typing-text');
        typingTexts.forEach((text, index) => {
            setTimeout(() => {
                text.style.animationPlayState = 'running';
            }, index * 500);
        });
    }
    
    initializeCursor() {
        const cursors = document.querySelectorAll('.terminal-cursor, .cursor-blink');
        cursors.forEach(cursor => {
            cursor.style.animation = 'blink 1s infinite';
        });
    }
    
    addGlitchEffects() {
        setInterval(() => {
            if (Math.random() > 0.95) {
                const title = document.querySelector('.site-title');
                if (title) {
                    title.classList.add('glitch');
                    setTimeout(() => {
                        title.classList.remove('glitch');
                    }, 300);
                }
            }
        }, 5000);
    }
    
    handleScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sphere = document.getElementById('sphereContainer');
            
            if (sphere) {
                // Subtle parallax effect for the sphere
                sphere.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixBlog();
});

// Add some utility functions
function addMatrixEffect(element) {
    element.classList.add('matrix-text');
    setTimeout(() => {
        element.classList.remove('matrix-text');
    }, 2000);
}

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
