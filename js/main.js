// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu on link click
nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.numero-valor');
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * target);
            counter.textContent = current.toLocaleString('pt-BR');
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString('pt-BR');
                counter.dataset.animated = 'true';
            }
        }
        requestAnimationFrame(update);
    });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger counter animation when numbers section is visible
            if (entry.target.closest('.numeros')) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.15 });

// Apply fade-in to sections
document.querySelectorAll('.servico-card, .diferencial-item, .sobre-text, .contato-info, .contato-mapa, .cta-box, .numeros-grid').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Hero keywords bold animation
setTimeout(() => {
    const keywords = document.querySelectorAll('.hero-keyword');
    keywords.forEach((kw, i) => {
        setTimeout(() => kw.classList.add('active'), i * 300);
    });
}, 200);

// Smooth scroll for anchor links (fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
