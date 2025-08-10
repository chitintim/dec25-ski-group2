// Progress indicator functionality with skier animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const progressDots = document.querySelectorAll('.progress-dot');
    const progressSkier = document.querySelector('.progress-skier');
    
    // Calculate scroll percentage
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Update progress bar height
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.height = scrollPercent + '%';
    }
    
    // Update skier position
    if (progressSkier) {
        const trackHeight = 250; // Match CSS track height
        const skierPosition = (scrollPercent / 100) * (trackHeight - 30); // Adjust for skier size
        progressSkier.style.top = skierPosition + 'px';
    }
    
    // Update active section
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update progress dots
    progressDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });
});

// Click on progress dots to navigate
document.querySelectorAll('.progress-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const targetId = this.getAttribute('data-section');
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Ski animation on scroll - FIXED to go downhill
let lastScrollY = window.scrollY;
let ticking = false;
let skiAnimationTimeout;

function createSkiAnimation() {
    const ski = document.createElement('div');
    ski.className = 'ski-animation';
    ski.innerHTML = '⛷️';
    ski.style.top = Math.random() * (window.innerHeight / 2) + 'px';
    document.body.appendChild(ski);
    
    setTimeout(() => {
        ski.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        ski.remove();
    }, 3000);
}

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Trigger ski animation on significant scroll
    if (Math.abs(currentScrollY - lastScrollY) > 300) {
        clearTimeout(skiAnimationTimeout);
        skiAnimationTimeout = setTimeout(() => {
            createSkiAnimation();
        }, 100);
        lastScrollY = currentScrollY;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// Snowflake animation
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄️';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Create snowflakes periodically
setInterval(createSnowflake, 1000);

// Gallery lightbox functionality
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-nav">
            <span class="lightbox-prev">‹</span>
            <span class="lightbox-next">›</span>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const images = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = 0;
    
    function showImage(index) {
        currentIndex = index;
        const img = images[index];
        lightbox.querySelector('.lightbox-image').src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLight() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightbox.querySelector('.lightbox-image').src = images[currentIndex].src;
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightbox.querySelector('.lightbox-image').src = images[currentIndex].src;
    }
    
    // Event listeners
    images.forEach((img, index) => {
        img.addEventListener('click', () => showImage(index));
    });
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLight);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLight();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLight();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLightbox);
} else {
    createLightbox();
}

// Parallax effect for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and location cards
document.querySelectorAll('.feature-card, .highlight').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

// Add fade in up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Lightbox styles */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
        pointer-events: all;
    }
    
    .lightbox-image {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 40px;
        font-size: 40px;
        color: white;
        cursor: pointer;
        transition: transform 0.3s;
    }
    
    .lightbox-close:hover {
        transform: scale(1.2);
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 40px;
        transform: translateY(-50%);
    }
    
    .lightbox-prev,
    .lightbox-next {
        font-size: 60px;
        color: white;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
        user-select: none;
    }
    
    .lightbox-prev:hover,
    .lightbox-next:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Mountain peak animation on hover
document.querySelectorAll('.cost-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    });
});

// Add transition to cost categories
document.querySelectorAll('.cost-category').forEach(category => {
    category.style.transition = 'all 0.3s ease';
});

// Easter egg: Konami code for extra snow
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Snow storm!
            for (let i = 0; i < 50; i++) {
                setTimeout(createSnowflake, i * 100);
            }
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});