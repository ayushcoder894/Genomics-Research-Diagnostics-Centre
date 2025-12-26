// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
const observerOptions = {
    threshold: 0.5
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

heroObserver.observe(heroSection);

// ===== Test Search Functionality =====
const testSearch = document.getElementById('testSearch');
const testCards = document.querySelectorAll('.test-card');
const filterBtns = document.querySelectorAll('.filter-btn');

// Search functionality
testSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    testCards.forEach(card => {
        const testName = card.getAttribute('data-name').toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        
        if (testName.includes(searchTerm) || category.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        testCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Clear search input
        testSearch.value = '';
    });
});

// ===== Book Now Button Click =====
const bookButtons = document.querySelectorAll('.btn-book');
const testSelect = document.getElementById('test');

bookButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const testName = btn.getAttribute('data-test');
        
        // Scroll to booking section
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // Select the test in the dropdown
        setTimeout(() => {
            for (let option of testSelect.options) {
                if (option.value === testName) {
                    option.selected = true;
                    break;
                }
            }
        }, 500);
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== Form Submission =====
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        test: formData.get('test'),
        date: formData.get('date'),
        message: formData.get('message'),
        homeCollection: formData.get('homeCollection') ? 'Yes' : 'No'
    };
    
    // Validate form
    if (!data.name || !data.phone || !data.email || !data.test) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate phone
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS or similar service
        // For now, we'll use a mailto fallback and formsubmit.co
        
        // Create email body
        const emailBody = `
New Appointment Request

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Test: ${data.test}
Preferred Date: ${data.date || 'Not specified'}
Home Collection: ${data.homeCollection}
Message: ${data.message || 'No additional message'}

---
This message was sent from the Genomics Research & Diagnostics Centre website.
        `.trim();
        
        // Option 1: Using FormSubmit.co (free service)
        const response = await fetch('https://formsubmit.co/ajax/Info.genomicscentre@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                email: data.email,
                test: data.test,
                preferredDate: data.date || 'Not specified',
                homeCollection: data.homeCollection,
                message: data.message || 'No additional message',
                _subject: `New Appointment Request: ${data.test}`,
                _template: 'table'
            })
        });
        
        if (response.ok) {
            // Show success modal
            successModal.classList.add('active');
            bookingForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        
        // Fallback: Open email client
        const mailtoLink = `mailto:Info.genomicscentre@gmail.com?subject=New Appointment Request: ${encodeURIComponent(data.test)}&body=${encodeURIComponent(`
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Test: ${data.test}
Preferred Date: ${data.date || 'Not specified'}
Home Collection: ${data.homeCollection}
Message: ${data.message || 'No additional message'}
        `)}`;
        
        window.location.href = mailtoLink;
        
        // Show success modal anyway
        setTimeout(() => {
            successModal.classList.add('active');
            bookingForm.reset();
        }, 1000);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ===== Close Modal =====
function closeModal() {
    successModal.classList.remove('active');
}

// Close modal on outside click
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll('.service-card, .test-card, .why-card, .faq-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Set minimum date for appointment =====
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ===== Dynamic Year in Footer =====
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Genomics Research & Diagnostics Centre. All Rights Reserved.`;

// ===== Lazy Load Images (if any are added later) =====
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Console Welcome Message =====
console.log('%c Genomics Research & Diagnostics Centre ', 
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Website developed with ❤️', 'color: #667eea; font-size: 14px;');
