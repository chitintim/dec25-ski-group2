// Progress indicator functionality
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const progressBar = document.querySelector('.progress-bar::after');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    // Calculate scroll percentage
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Update progress bar
    if (progressBar) {
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
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

// Ski animation on scroll
let lastScrollY = window.scrollY;
let ticking = false;
let skiAnimationTimeout;

function createSkiAnimation() {
    const ski = document.createElement('div');
    ski.className = 'ski-animation';
    ski.innerHTML = '⛷️';
    ski.style.top = Math.random() * window.innerHeight + 'px';
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
document.querySelectorAll('.feature-card, .location-card').forEach(card => {
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
    
    .progress-bar::after {
        height: var(--scroll-percent, 0%) !important;
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