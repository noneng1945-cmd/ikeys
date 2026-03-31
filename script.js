// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.getElementById('loader');
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // Navigation
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const count = +counter.innerText.replace(/\+|,/g, '');
            const increment = target / 100;
            
            const updateCounter = () => {
                if (count < target) {
                    counter.innerText = Math.floor(count + increment) + (target > 1000 ? 'k' : '');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + (target > 1000 ? 'k' : '') + '+';
                }
            };
            updateCounter();
        });
    }

    // Skills progress animation
    function animateSkills() {
        const progresses = document.querySelectorAll('.skill-progress');
        progresses.forEach(progress => {
            const width = progress.dataset.width;
            progress.style.width = width;
        });
    }

    // Observe animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.querySelector('.stat-number')) {
                    animateCounters();
                }
                if (entry.target.querySelector('.skill-progress')) {
                    animateSkills();
                }
                animationObserver.unobserve(entry.target);
            }
        });
    });

    // Observe animation sections
    const aboutSection = document.getElementById('about');
    const skillsSection = document.getElementById('skills');
    if (aboutSection) animationObserver.observe(aboutSection);
    if (skillsSection) animationObserver.observe(skillsSection);

    // Portfolio hover effect
    document.querySelectorAll('.portfolio-card').forEach(card => {
        const overlay = card.querySelector('.portfolio-overlay');
        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(-20px)';
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you! Your message has been sent. I\'ll get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Scroll progress
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        // You can add scroll progress bar here if needed
    });
});

// Window load event
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Sending...
        `;
        submitBtn.style.opacity = '0.8';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success message
            alert('✅ Thank you! Your message has been sent successfully. I will reply within 24 hours.');
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Force show section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '1';
    title.style.transform = 'none';
    title.style.visibility = 'visible';
});

// Skills animation akan otomatis detect semua .skill-progress
function animateSkills() {
    const progresses = document.querySelectorAll('.skill-progress');
    progresses.forEach((progress, index) => {
        const width = progress.getAttribute('data-width');
        setTimeout(() => {
            progress.style.width = width;
        }, index * 250); // Delay bertingkat
    });
}

// SKILLS ANIMATION - 100% WORK
function initSkills() {
    const progresses = document.querySelectorAll('.skill-progress');
    
    progresses.forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        progress.style.width = '0%';
        
        // Trigger animation
        setTimeout(() => {
            progress.style.width = percent + '%';
        }, 500);
    });
}

// Multiple trigger methods
document.addEventListener('DOMContentLoaded', initSkills);
window.addEventListener('load', initSkills);

// Scroll trigger
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Manual trigger button (untuk test)
window.triggerSkills = initSkills;

// Mobile Menu Toggle
document.getElementById('hamburger')?.addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
    this.classList.toggle('active');
});

// Close on outside click
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-container')) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
});