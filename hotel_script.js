// ===== Smooth Scrolling for Navigation Links =====
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

// ===== Service Card Expansion =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    // First card is expanded by default via CSS
    if (index !== 0) {
        card.addEventListener('click', function() {
            // Close other expanded cards
            serviceCards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('expanded');
                }
            });
            // Toggle current card
            this.classList.toggle('expanded');
        });
    }
});

// ===== Form Submission =====
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const checkIn = this.querySelector('input[type="date"]').value;
    const checkOut = this.querySelectorAll('input[type="date"]')[1].value;
    const roomType = this.querySelector('select').value;
    const guests = this.querySelectorAll('select')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Validate form
    if (!name || !email || !checkIn || !checkOut || !roomType || !guests) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
        alert('Check-out date must be after check-in date');
        return;
    }
    
    // Log booking data
    console.log('Booking Data:', {
        name,
        email,
        checkIn,
        checkOut,
        nights,
        roomType,
        guests,
        message
    });
    
    // Show success message
    const formButton = this.querySelector('button');
    const originalText = formButton.textContent;
    formButton.textContent = '✓ Reservation Request Sent!';
    formButton.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    // Reset form
    this.reset();
    
    // Restore button after 3 seconds
    setTimeout(() => {
        formButton.textContent = originalText;
        formButton.style.background = '';
    }, 3000);
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and team cards
document.querySelectorAll('.service-card, .team-card, .welcome-card, .concierge-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Navigation Active State =====
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Mobile Menu Toggle =====
function addMobileMenuToggle() {
    const navContainer = document.querySelector('.nav-container');
    if (window.innerWidth <= 768) {
        // Mobile menu logic would go here
    }
}

addMobileMenuToggle();

// ===== Booking Button Handler =====
document.querySelector('.book-btn')?.addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// ===== Service Cards Keyboard Navigation =====
serviceCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && index !== 0) {
            this.classList.toggle('expanded');
        }
    });
});

// ===== Scroll-to-Top Button =====
function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTop';
    btn.innerHTML = '↑';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #b8860b, #d4a574);
        color: #0a1929;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(184, 134, 11, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ===== Team Card Click Handler =====
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', function() {
        const name = this.querySelector('h3').textContent;
        const specialty = this.querySelector('.specialty').textContent;
        const bio = this.querySelector('.bio').textContent;
        
        console.log(`Selected: ${name} - ${specialty}`);
    });
});

// ===== Smooth Page Load Animation =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// ===== Dynamic Year in Footer =====
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');
    if (footer) {
        const year = new Date().getFullYear();
        const footerText = footer.textContent;
        footer.textContent = footerText.replace('2024', year);
    }
});

// ===== Room Rate Calculator =====
function calculateRoomRate(roomType, nights) {
    const rates = {
        'deluxe': { min: 25000, max: 45000 },
        'executive': { min: 55000, max: 95000 },
        'presidential': { min: 250000, max: 500000 },
        'penthouse': { min: 2000000, max: 3500000 }
    };
    
    if (!rates[roomType]) return null;
    
    const avgRate = (rates[roomType].min + rates[roomType].max) / 2;
    const totalCost = avgRate * nights;
    const discount = nights >= 7 ? 0.15 : nights >= 3 ? 0.08 : 0;
    const finalCost = totalCost * (1 - discount);
    
    return {
        nightlyRate: avgRate,
        totalNights: nights,
        subtotal: totalCost,
        discount: discount * 100,
        finalCost: finalCost
    };
}

// ===== Service Detail Toggle for Mobile =====
if (window.innerWidth <= 768) {
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const content = card.querySelector('.service-content');
        if (index !== 0) {
            content.style.display = 'none';
        }
        
        card.querySelector('.service-header').addEventListener('click', function() {
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            card.classList.toggle('expanded');
        });
    });
}

// ===== Feature Cards Hover Effect =====
document.querySelectorAll('.welcome-card, .concierge-card').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.borderTopColor = '#d4a574';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.borderTopColor = '#b8860b';
    });
});

// ===== Room Availability Check =====
function checkAvailability(roomType, checkIn, checkOut) {
    // In production, this would call an API
    const availabilityStatus = {
        'deluxe': Math.random() > 0.2,
        'executive': Math.random() > 0.3,
        'presidential': Math.random() > 0.5,
        'penthouse': Math.random() > 0.7
    };
    
    return availabilityStatus[roomType] || false;
}

// ===== Guest Preferences Manager =====
class GuestPreferences {
    constructor() {
        this.preferences = {
            roomType: 'deluxe',
            bedType: 'king',
            floorPreference: 'high',
            dietaryRestrictions: [],
            specialRequests: ''
        };
    }
    
    setPreference(key, value) {
        if (this.preferences.hasOwnProperty(key)) {
            this.preferences[key] = value;
            console.log(`Preference updated: ${key} = ${value}`);
        }
    }
    
    getPreferences() {
        return this.preferences;
    }
    
    saveToLocalStorage() {
        localStorage.setItem('guestPreferences', JSON.stringify(this.preferences));
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('guestPreferences');
        if (saved) {
            this.preferences = JSON.parse(saved);
        }
    }
}

// ===== Analytics Tracking (Placeholder) =====
function trackPageView(pageName) {
    console.log(`Page view: ${pageName}`);
    // In production, send to analytics service
}

function trackServiceView(serviceName) {
    console.log(`Service viewed: ${serviceName}`);
}

function trackBooking(bookingData) {
    console.log(`Booking initiated:`, bookingData);
}

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('.service-header h3').textContent;
        trackServiceView(serviceName);
    });
});

// ===== Concierge Request Handler =====
function requestConciergeService(serviceType) {
    const contact = document.querySelector('#contact');
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill form if needed
        const form = document.querySelector('.contact-form');
        if (form) {
            const textarea = form.querySelector('textarea');
            textarea.value = `Service requested: ${serviceType}`;
        }
    }
}

window.requestConciergeService = requestConciergeService;

// ===== Experience Finder =====
function findExperience(userPreferences) {
    // Based on preferences, recommend experiences
    const experiences = {
        'luxury': ['Presidential Suite', 'Private Chef Dining', 'Spa Rituals'],
        'business': ['Executive Suite', 'Conference Facilities', 'Business Center'],
        'family': ['Deluxe Room', 'Children\'s Programs', 'Family Activities'],
        'wellness': ['Spa & Wellness', 'Fitness Programs', 'Wellness Consultation'],
        'adventure': ['Concierge Services', 'Adventure Planning', 'Outdoor Activities']
    };
    
    return experiences[userPreferences.type] || experiences['luxury'];
}

// ===== Special Occasion Coordinator =====
class SpecialOccasionCoordinator {
    constructor() {
        this.occasions = [
            'Anniversary',
            'Birthday',
            'Proposal',
            'Wedding',
            'Corporate Event',
            'Milestone'
        ];
    }
    
    planOccasion(type, details) {
        console.log(`Planning ${type}:`, details);
        
        const packages = {
            'Anniversary': 'Romantic dinner, flowers, champagne, room upgrade',
            'Birthday': 'Custom cake, decorations, champagne, special amenities',
            'Proposal': 'Romantic setup, photographer, champagne service',
            'Wedding': 'Full coordination, catering, venue, entertainment',
            'Corporate Event': 'Meeting space, catering, AV equipment, coordination',
            'Milestone': 'Customized package based on celebration'
        };
        
        return packages[type] || 'Custom package available';
    }
}

// ===== Performance Optimization =====
// Lazy load images (if added in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Accessibility Improvements =====
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '3px solid #b8860b';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ===== Hotel-Specific Functions =====

// Check room availability
function isRoomAvailable(roomType, checkInDate, checkOutDate) {
    // In real application, query availability system
    return true;
}

// Calculate stay duration
function calculateStayDuration(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

// Get room recommendations
function getRoomRecommendations(guestCount, budget, preferences) {
    const recommendations = [];
    
    if (guestCount <= 2 && budget < 50000) {
        recommendations.push('Deluxe Room');
    }
    if (guestCount <= 4 && budget >= 50000 && budget < 250000) {
        recommendations.push('Executive Suite');
    }
    if (guestCount <= 6 && budget >= 250000) {
        recommendations.push('Presidential Suite');
    }
    if (budget >= 2000000) {
        recommendations.push('Penthouse Residence');
    }
    
    return recommendations;
}

console.log('Horizon Luxury Hotel Website - Interactive Features Loaded');
