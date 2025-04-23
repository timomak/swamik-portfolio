// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initProjectFilters();
    initCustomCursor();
    initContactForm();
    initScrollToTop();
    initProgressBars();
    updateCopyrightYear();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    
    // Check for stored theme preference or system preference
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add scroll class to header when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Animate elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe section titles and other key elements
    document.querySelectorAll('.section-title, .skill-category, .project-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.classList.remove('hide');
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.classList.add('hide');
                    }, 300);
                }
            });
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 70);
    });
    
    // Change cursor style on different elements
    const links = document.querySelectorAll('a, button, .skill-item, .project-card, .filter-btn');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            cursorFollower.classList.add('link-hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
            cursorFollower.classList.remove('link-hover');
        });
    });
    
    // Hide cursor when leaving browser window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Normally we would send the form data to a server here
        // For demo purposes, we'll just show a success message
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Create success notification
        const notification = document.createElement('div');
        notification.classList.add('notification', 'success');
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>Thank you, ${name}! Your message has been sent successfully.</p>
            </div>
            <button class="close-btn"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Reset form
        contactForm.reset();
        
        // Close button functionality
        const closeBtn = notification.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate Progress Bars
function initProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Configure intersection observer for progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.style.width || '0%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each skill item
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Add CSS-based animations for text typing effect
function addTypingEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Konami code complete!
            document.body.classList.add('konami-mode');
            
            // Create a fun animation
            const emoji = document.createElement('div');
            emoji.textContent = '🚀';
            emoji.classList.add('konami-emoji');
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
                document.body.classList.remove('konami-mode');
            }, 5000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Update Copyright Year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
} 