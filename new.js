// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Intersection Observer for scroll animations with different effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            } else if (entry.target.classList.contains('skill')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        }
    });
}, observerOptions);

// Initialize elements with starting animations
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = 'all 0.8s ease';
    observer.observe(card);
});

document.querySelectorAll('.skill').forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'scale(0.8)';
    skill.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(skill);
});

// Add hover effect for cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});
