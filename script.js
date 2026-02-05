/* ===================================
   Egemen Ünlü Portfolio - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Set default language to Turkish
    document.documentElement.lang = 'tr';

    // ===================================
    // DOM Elements
    // ===================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const topbar = document.querySelector('.topbar');

    const drawingsPopup = document.getElementById('drawingsPopup');
    const basabanPopup = document.getElementById('basabanPopup');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');

    const openDrawingsBtn = document.getElementById('openDrawingsPopup');
    const openBasabanBtn = document.getElementById('openBasabanPopup');

    const allPopupCloses = document.querySelectorAll('.popup-close');
    const lightboxClose = document.querySelector('.lightbox-close');

    const emailTooltip = document.getElementById('emailTooltip');

    const galleryCards = document.querySelectorAll('.gallery-card');
    const folderItems = document.querySelectorAll('.folder-item');
    const carouselImages = document.querySelectorAll('.carousel-track img');

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // ===================================
    // Smooth Scroll for Navigation
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const topbarHeight = topbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - topbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Topbar Background on Scroll
    // ===================================
    function updateTopbarBackground() {
        const theme = document.documentElement.getAttribute('data-theme');
        if (window.scrollY > 50) {
            topbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--topbar-bg-scroll');
            topbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            topbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--topbar-bg');
            topbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateTopbarBackground);

    // ===================================
    // Theme Toggle (Day/Night Mode)
    // ===================================
    const themeSwitch = document.getElementById('themeSwitch');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on load
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeSwitch) themeSwitch.checked = true;
    }
    updateTopbarBackground();

    if (themeSwitch) {
        themeSwitch.addEventListener('change', function () {
            const newTheme = this.checked ? 'light' : 'dark';

            if (newTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }

            localStorage.setItem('theme', newTheme);
            updateTopbarBackground();
        });
    }

    // ===================================
    // Popup Functions
    // ===================================
    function openPopup(popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeAllPopups() {
        document.querySelectorAll('.popup-overlay').forEach(popup => {
            closePopup(popup);
        });
    }

    // Open Drawings Popup
    if (openDrawingsBtn) {
        openDrawingsBtn.addEventListener('click', function () {
            openPopup(drawingsPopup);
        });
    }

    // Open Basaban Popup
    if (openBasabanBtn) {
        openBasabanBtn.addEventListener('click', function () {
            openPopup(basabanPopup);
        });
    }

    // Close Popups
    allPopupCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const popup = this.closest('.popup-overlay');
            closePopup(popup);
        });
    });

    // Close popup when clicking outside content
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', function (e) {
            if (e.target === this) {
                closePopup(this);
            }
        });
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllPopups();
            closeLightbox();
            if (emailTooltip) emailTooltip.classList.remove('active');
        }
    });

    // ===================================
    // Email Tooltip Toggle
    // ===================================
    if (emailTooltip) {
        emailTooltip.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        // Close tooltip when clicking elsewhere
        document.addEventListener('click', function (e) {
            if (!emailTooltip.contains(e.target)) {
                emailTooltip.classList.remove('active');
            }
        });
    }

    // ===================================
    // Lightbox Functions
    // ===================================
    function openLightbox(imageSrc) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Gallery Cards - Open Lightbox
    galleryCards.forEach(card => {
        card.addEventListener('click', function () {
            const imageSrc = this.dataset.image || this.querySelector('img').src;
            openLightbox(imageSrc);
        });
    });

    // Folder Items - Open Lightbox
    folderItems.forEach(item => {
        item.addEventListener('click', function () {
            const imageSrc = this.dataset.image || this.querySelector('img').src;
            openLightbox(imageSrc);
        });
    });

    // Carousel Images - Open Lightbox
    carouselImages.forEach(img => {
        img.addEventListener('click', function () {
            const imageSrc = this.dataset.image || this.src;
            openLightbox(imageSrc);
        });
    });

    // Close Lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }

    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.gallery-card, .project-card, .glass-card, .nav-button').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class style
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .nav-links a.active {
            color: var(--primary) !important;
        }
        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize - trigger scroll event once
    highlightActiveLink();
});
