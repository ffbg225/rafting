// Main Script for Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert(`Thank you, ${name}! We've received your message and will contact you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Subscription form submission
    const subscriptionForms = document.querySelectorAll('.subscription-form');
    subscriptionForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validate email
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            console.log('Subscription submitted:', email);
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Language switching functionality (if implemented)
    const languageSwitchers = document.querySelectorAll('.language-switcher');
    languageSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = switcher.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            alert('Language preference saved. Page will refresh.');
            window.location.reload();
        });
    });

    // Cart functionality (if implemented)
    let cartCount = 0;
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            const itemPrice = event.target.getAttribute('data-price');
            
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            
            // Show feedback
            const feedback = document.createElement('div');
            feedback.className = 'cart-feedback';
            feedback.textContent = `${itemName} added to cart!`;
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                feedback.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 300);
            }, 2000);
        });
    });
});

// Text animation for welcome message
const text = document.querySelector(".sec-text");
const textLoad = () => {
    setTimeout(() => {
        text.textContent = "ආයුබෝවන්...";
    }, 0);
    setTimeout(() => {
        text.textContent = "AURBORWAN..";
    }, 4000);
    setTimeout(() => {
        text.textContent = "வணக்கம்..";
    }, 8000);
}
textLoad();
setInterval(textLoad, 12000);

// Initialize carousel with auto-rotation
document.addEventListener('DOMContentLoaded', function() {
    const myCarousel = document.querySelector('#raftingCarousel');
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });
    }
});