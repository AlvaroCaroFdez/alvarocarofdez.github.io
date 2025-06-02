// Portfolio JavaScript - Cybersecurity Specialist

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Theme Toggle Functionality - Fixed
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    function setTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            // Update CSS variables for light theme
            root.style.setProperty('--dark-bg', '#ffffff');
            root.style.setProperty('--dark-surface', '#f8f9fa');
            root.style.setProperty('--darker-surface', '#e9ecef');
            root.style.setProperty('--text-light', '#1a1a1a');
            root.style.setProperty('--text-muted', '#6c757d');
            root.style.setProperty('--color-border', 'rgba(0, 0, 0, 0.1)');
            
            // Update body background
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#1a1a1a';
            
        } else {
            root.setAttribute('data-theme', 'dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Reset to dark theme variables
            root.style.setProperty('--dark-bg', '#1a1a1a');
            root.style.setProperty('--dark-surface', '#2a2a2a');
            root.style.setProperty('--darker-surface', '#1e1e1e');
            root.style.setProperty('--text-light', '#ffffff');
            root.style.setProperty('--text-muted', '#b0b0b0');
            root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');
            
            // Update body background
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#ffffff';
        }
        
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Force a repaint
        document.body.offsetHeight;
    }

    // Initialize theme
    setTheme(currentTheme);

    // Theme toggle event listener - Fixed
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            console.log('Theme changed to:', newTheme);
        });
    }

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation State
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Back to Top Button
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Event Listeners
    window.addEventListener('scroll', function() {
        setActiveNavLink();
        toggleBackToTop();
        animateOnScroll();
    });

    // Scroll Animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.subject-card, .skill-category, .social-card, .stat');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }

    // Form Validation and Submission - Fixed
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');

        // Real-time validation
        function validateField(field, validationFn) {
            field.addEventListener('blur', function() {
                if (!validationFn(this.value)) {
                    this.style.borderColor = '#ff4757';
                } else {
                    this.style.borderColor = '';
                }
            });

            field.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(255, 71, 87)') {
                    if (validationFn(this.value)) {
                        this.style.borderColor = '';
                    }
                }
            });
        }

        // Validation functions
        const validateName = (name) => name.trim().length >= 2;
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validateSubject = (subject) => subject.trim().length >= 5;
        const validateMessage = (message) => message.trim().length >= 10;

        // Apply validation
        if (nameInput) validateField(nameInput, validateName);
        if (emailInput) validateField(emailInput, validateEmail);
        if (subjectInput) validateField(subjectInput, validateSubject);
        if (messageInput) validateField(messageInput, validateMessage);

        // Form submission - Fixed
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            // Validate all fields
            const isValid = validateName(name) && 
                           validateEmail(email) && 
                           validateSubject(subject) && 
                           validateMessage(message);

            if (!isValid) {
                // Highlight invalid fields
                if (!validateName(name)) nameInput.style.borderColor = '#ff4757';
                if (!validateEmail(email)) emailInput.style.borderColor = '#ff4757';
                if (!validateSubject(subject)) subjectInput.style.borderColor = '#ff4757';
                if (!validateMessage(message)) messageInput.style.borderColor = '#ff4757';
                
                showNotification('Por favor, corrige los errores en el formulario.', 'error');
                return;
            }

            // Show loading state
            if (btnText) btnText.textContent = 'Enviando...';
            if (btnSpinner) btnSpinner.classList.remove('hidden');
            submitBtn.disabled = true;

            // Simulate form submission - Fixed timing and reset
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button state
                if (btnText) btnText.textContent = 'Enviar Mensaje';
                if (btnSpinner) btnSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                
                // Reset field styles
                [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
                    if (field) field.style.borderColor = '';
                });
                
                console.log('Form submitted successfully');
            }, 1500); // Reduced time for better UX
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00d4ff'};
            color: #1a1a1a;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;

        // Add animation styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .notification__content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification__close {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                }
                .notification__close:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
            `;
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        }
    });

    // Add loading animation to page
    function addPageLoadAnimation() {
        const elements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__description, .hero__buttons');
        elements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 150 + 300);
            }
        });
    }

    // Initialize page load animation
    addPageLoadAnimation();

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 800);
    }

    // Initialize typing animation for hero title
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.subject-card, .skill-category, .social-card, .stat');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Initialize everything
    setActiveNavLink();
    toggleBackToTop();

    console.log('Portfolio Ciberseguridad - Loaded successfully! 🛡️');
});