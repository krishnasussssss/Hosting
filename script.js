// Pricing Configuration
const PRICING = {
    RAM_PER_GB: 60,
    CORE_PER_UNIT: 100,
    DISK_FIXED: 50,
    DISK_AMOUNT: 10
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initializePreloader();
    initializeNavbar();
    initializeScrollAnimations();
    initializeMobileNav();
    initializeStatCounters();
    calculatePrice();
});

// Preloader
function initializePreloader() {
    window.addEventListener('load', function () {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });
}

// Navbar scroll effect
function initializeNavbar() {
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile nav toggle
function initializeMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    if (toggle) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Calculate price in real-time
function calculatePrice() {
    const ram = parseInt(document.getElementById('ram').value) || 1;
    const cores = parseInt(document.getElementById('cores').value) || 1;

    const ramCost = ram * PRICING.RAM_PER_GB;
    const coreCost = cores * PRICING.CORE_PER_UNIT;
    const totalCost = ramCost + coreCost + PRICING.DISK_FIXED;

    // Update range value displays
    document.getElementById('ramValue').textContent = ram;
    document.getElementById('coreValue').textContent = cores;

    // Update summary
    document.getElementById('summaryRam').textContent = ram + ' GB';
    document.getElementById('summaryCores').textContent = cores + ' Cores';
    document.getElementById('ramCost').textContent = '₹' + ramCost;
    document.getElementById('coreCost').textContent = '₹' + coreCost;

    // Animate total price
    animatePrice('totalPrice', '₹' + totalCost);
}

// Animate price change
function animatePrice(elementId, newText) {
    const el = document.getElementById(elementId);
    el.style.transform = 'scale(1.1)';
    el.style.transition = 'transform 0.3s ease';
    el.textContent = newText;
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
}

// Stat counter animation
function initializeStatCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.getAttribute('data-target'));
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const isDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 20);
}

// Scroll reveal animations
function initializeScrollAnimations() {
    const reveals = document.querySelectorAll('.plan-card, .feature-card, .contact-card, .calc-card, .calc-summary');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// Range input live update
document.addEventListener('DOMContentLoaded', function () {
    const ramSlider = document.getElementById('ram');
    const coreSlider = document.getElementById('cores');

    if (ramSlider) {
        ramSlider.addEventListener('input', function () {
            calculatePrice();
        });
    }

    if (coreSlider) {
        coreSlider.addEventListener('input', function () {
            calculatePrice();
        });
    }
});

// Smooth scroll for all anchor links
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Parallax effect on hero
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});