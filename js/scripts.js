/*!
* Enhanced Portfolio - Modern Professional Design
* Enhanced version with animations and modern interactions
*/

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Enhanced Navigation Active States
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.resume-section');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Trigger animations for child elements
                const animatedElements = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections with loading class
    const loadingSections = document.querySelectorAll('.loading');
    loadingSections.forEach(section => {
        observer.observe(section);
    });

    // Initialize animations for elements
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        if (el.classList.contains('fade-in-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('fade-in-left')) {
            el.style.transform = 'translateX(-30px)';
        } else if (el.classList.contains('fade-in-right')) {
            el.style.transform = 'translateX(30px)';
        }
        el.style.transition = 'all 0.8s ease-out';
    });

    // Enhanced scroll listener
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Enhanced typing effect for name animation
    function enhancedNameAnimation() {
        const letters = document.querySelectorAll('#name-animation .color-animate');
        const colors = [
            'var(--bs-primary)',
            'var(--bs-success)',
            'var(--bs-info)',
            'var(--bs-warning)',
            'var(--bs-danger)'
        ];
        
        let currentColorIndex = 0;
        
        function animateLetters() {
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.color = colors[currentColorIndex];
                    letter.style.transform = 'scale(1.1)';
                    
                    setTimeout(() => {
                        letter.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
            
            currentColorIndex = (currentColorIndex + 1) % colors.length;
        }
        
        // Start animation
        animateLetters();
        
        // Repeat animation
        setInterval(animateLetters, 3000);
    }

    // Initialize enhanced name animation
    setTimeout(enhancedNameAnimation, 1000);

    // Add loading states for better UX
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        const initialElements = document.querySelectorAll('#about .fade-in-up');
        initialElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill icons hover effects
    const skillIcons = document.querySelectorAll('.dev-icons li');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add CSS for ripple effect
    const rippleCSS = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.6);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);

    console.log('Enhanced Portfolio loaded successfully! 🚀');
});
