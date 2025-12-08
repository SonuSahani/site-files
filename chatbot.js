// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Dynamic Booking Modal Handler - Populates modal from data attributes
// Dynamic Booking Modal Handler - Populates modal from direct DOM scraping
// Dynamic Booking Modal Handler - Populates modal from data attributes or DOM
document.addEventListener('DOMContentLoaded', function () {
    const bookButtons = document.querySelectorAll('.book-tour-btn, .book-service-btn, .btn-book-outline');

    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const isService = this.classList.contains('book-service-btn');

            // Try to find a parent card, but it's optional if we have data attributes
            const card = this.closest('.tour-card, .service-box, .event-card-horizontal');

            // 1. Get data from attributes (High Priority)
            let title = this.dataset.title;
            let image = this.dataset.image;
            let price = this.dataset.price;
            let duration = this.dataset.duration;
            let desc = this.dataset.desc;
            let inclusions = this.dataset.inclusions;
            let original = this.dataset.original || '';
            let discount = this.dataset.discount || '';

            // 2. Fallback to DOM scraping if data is missing AND we have a card
            if (card) {
                // Common Elements
                if (!title) {
                    const titleEl = card.querySelector('h4, h5, h3'); // added h3 for event cards
                    title = titleEl ? titleEl.textContent.trim() : '';
                }
                if (!image) {
                    const imageEl = card.querySelector('img');
                    image = imageEl ? imageEl.src : '';
                }

                if (isService) {
                    // Service logic
                    if (!price) {
                        const priceBlock = card.querySelector('.tour-price')?.parentElement;
                        if (priceBlock) price = priceBlock.textContent.trim().replace(/\s+/g, ' ');
                    }
                    if (!desc) {
                        const descEl = card.querySelector('p');
                        desc = descEl ? descEl.textContent.trim() : '';
                    }
                } else {
                    // Tour/Event logic
                    if (!duration) {
                        const durationEl = card.querySelector('.text-muted, .event-meta');
                        duration = durationEl ? durationEl.textContent.trim() : '';
                    }
                    if (!desc) {
                        const contentContainer = card.querySelector('.p-4, .event-body');
                        // Try to find description paragraph
                        let descEl = null;
                        if (contentContainer) {
                            descEl = Array.from(contentContainer.querySelectorAll('p')).find(p => !p.className || p.className.includes('text-muted'));
                        }
                        desc = descEl ? descEl.textContent.trim() : '';
                    }
                    if (!price) {
                        const priceEl = card.querySelector('.tour-price, .event-price-badge');
                        price = priceEl ? priceEl.textContent.trim() : '';
                    }
                    if (!original) {
                        const originalPriceEl = card.querySelector('small[style*="line-through"]');
                        original = originalPriceEl ? originalPriceEl.textContent.trim() : '';
                    }
                    if (!discount) {
                        const discountEl = card.querySelector('.discount-badge');
                        discount = discountEl ? discountEl.textContent.trim() : '';
                    }
                    if (!inclusions) {
                        const highlightsEl = card.querySelector('.highlights');
                        inclusions = highlightsEl ? highlightsEl.textContent.trim() : '';
                    }
                }
            }

            // Dynamic Label Logic
            let label = 'Inclusions';
            if (isService) {
                if (card && card.closest('#hotel-booking')) label = 'Amenities';
                else if (card && (card.closest('#car-rental') || card.closest('#ticket-service') || card.closest('#visa-insurance'))) label = 'Features';
            }

            const labelEl = document.querySelector('#dynamicBookingModal .alert-info strong');
            if (labelEl) labelEl.textContent = label + ':';

            // Populate Modal
            const setText = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val || '';
            };

            setText('modalTourTitle', title);
            setText('modalTourDuration', duration);
            setText('modalTourPrice', price);
            setText('modalTourOriginal', original);
            setText('modalTourDiscount', discount);
            setText('modalTourDesc', desc);
            setText('modalTourInclusions', inclusions);
            setText('dynamicBookingModalLabel', 'Book ' + (title || 'Service'));

            const modalImage = document.getElementById('modalTourImage');
            if (modalImage) {
                modalImage.src = image || '';
                modalImage.alt = title || 'Service Image';
                // Show/Hide image based on availability
                modalImage.style.display = image ? 'block' : 'none';
            }

            const hiddenPackage = document.getElementById('modalHiddenPackage');
            if (hiddenPackage) hiddenPackage.value = title || 'Unknown Package';
        });
    });
});


// Enhanced Carousel - Ensured proper centering and added fade transition
const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
    interval: 6000,
    wrap: true,
    keyboard: true,
    pause: 'hover',
    touch: true,
    ride: 'carousel'
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Navbar scroll effects
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Testimonial Auto Slider
document.addEventListener('DOMContentLoaded', function () {
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    const totalTestimonials = 10;

    // Function to update the testimonial position
    function updateTestimonial(index) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

        // Update active dot
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        testimonialDots[index].classList.add('active');

        currentIndex = index;
    }

    // Function to move to the next testimonial
    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % totalTestimonials;
        updateTestimonial(nextIndex);
    }

    // Function to move to a specific testimonial
    function goToTestimonial(index) {
        updateTestimonial(index);
    }

    // Auto-advance testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Add click event listeners to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });

    // Handle form submissions for all booking forms
    const bookingForms = document.querySelectorAll('[id^="bookingForm"]');

    // Handle back button for modals
    let modalOpen = false;

    // Add event listeners to all modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('show.bs.modal', function () {
            modalOpen = true;
            // Push state to history when modal opens
            history.pushState({ modalOpen: true }, '');
        });

        modal.addEventListener('hidden.bs.modal', function () {
            modalOpen = false;
            // Remove the state when modal closes
            if (history.state && history.state.modalOpen) {
                history.back();
            }
        });
    });

    // Listen for popstate event (back button)
    window.addEventListener('popstate', function (event) {
        if (modalOpen) {
            // Close any open modal
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modalInstance = bootstrap.Modal.getInstance(openModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        }
    });

    bookingForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Show success message and close modal
                        const successAlert = new bootstrap.Toast(document.getElementById('bookingSuccessAlert'));
                        successAlert.show();

                        // Close the modal
                        const modalId = this.closest('.modal').id;
                        bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();

                        // Reset form
                        this.reset();
                    } else {
                        response.json().then(data => {
                            if (data.errors) {
                                alert(data.errors.map(error => error.message).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form');
                            }
                        });
                    }
                })
                .catch(error => {
                    alert('Oops! There was a problem submitting your form');
                });
        });
    });

    // Handle form submissions for car rental forms
    const carRentalForms = document.querySelectorAll('[id^="carRentalForm"]');

    carRentalForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Show success message and close modal
                        const successAlert = new bootstrap.Toast(document.getElementById('bookingSuccessAlert'));
                        successAlert.show();

                        // Close the modal
                        const modalId = this.closest('.modal').id;
                        bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();

                        // Reset form
                        this.reset();
                    } else {
                        response.json().then(data => {
                            if (data.errors) {
                                alert(data.errors.map(error => error.message).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form');
                            }
                        });
                    }
                })
                .catch(error => {
                    alert('Oops! There was a problem submitting your form');
                });
        });
    });

    // Handle form submissions for hotel booking forms
    const hotelBookingForms = document.querySelectorAll('[id^="hotelBookingForm"]');

    hotelBookingForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Show success message and close modal
                        const successAlert = new bootstrap.Toast(document.getElementById('bookingSuccessAlert'));
                        successAlert.show();

                        // Close the modal
                        const modalId = this.closest('.modal').id;
                        bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();

                        // Reset form
                        this.reset();
                    } else {
                        response.json().then(data => {
                            if (data.errors) {
                                alert(data.errors.map(error => error.message).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form');
                            }
                        });
                    }
                })
                .catch(error => {
                    alert('Oops! There was a problem submitting your form');
                });
        });
    });

    // Handle form submissions for ticket service forms
    const ticketServiceForms = document.querySelectorAll('[id^="ticketServiceForm"]');

    ticketServiceForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Show success message and close modal
                        const successAlert = new bootstrap.Toast(document.getElementById('bookingSuccessAlert'));
                        successAlert.show();

                        // Close the modal
                        const modalId = this.closest('.modal').id;
                        bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();

                        // Reset form
                        this.reset();
                    } else {
                        response.json().then(data => {
                            if (data.errors) {
                                alert(data.errors.map(error => error.message).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form');
                            }
                        });
                    }
                })
                .catch(error => {
                    alert('Oops! There was a problem submitting your form');
                });
        });
    });

    // Handle mobile touch events for tour cards
    const tourCards = document.querySelectorAll('.tour-card');

    tourCards.forEach(card => {
        card.addEventListener('click', function () {
            // Toggle active class for mobile
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
    });

    // Close overlay when clicking outside on mobile
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 768) {
            if (!event.target.closest('.tour-card')) {
                tourCards.forEach(card => {
                    card.classList.remove('active');
                });
            }
        }
    });

    // Handle download itinerary button clicks
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the tour name from the modal title
            const modalTitle = this.closest('.modal-body').querySelector('h4').textContent;

            // Create a temporary notification
            const toast = document.createElement('div');
            toast.className = 'position-fixed bottom-0 end-0 p-3';
            toast.style.zIndex = '11';
            toast.innerHTML = `
                        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="d-flex">
                                <div class="toast-body">
                                    <i class="fas fa-download me-2"></i>
                                    Downloading itinerary for ${modalTitle}...
                                </div>
                                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    `;

            document.body.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast.querySelector('.toast'));
            bsToast.show();

            // Remove the toast after it's hidden
            toast.addEventListener('hidden.bs.toast', function () {
                document.body.removeChild(toast);
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const vnAvatar = document.getElementById('vnAvatar');
    const vnOverlay = document.getElementById('vnOverlay');
    const vnDialogue = document.getElementById('vnDialogue');
    const vnClose = document.getElementById('vnClose');
    const vnDialogueText = document.getElementById('vnDialogueText');
    const vnChoices = document.getElementById('vnChoices');
    const vnCharacterSprite = document.getElementById('vnCharacterSprite');
    const typeSound = document.getElementById('typeSound');
    const clickSound = document.getElementById('clickSound');
    const vnWhatsappBtn = document.getElementById('vnWhatsappBtn');
    const vnAIChatBtn = document.getElementById('vnAIChatBtn'); // Changed from vnAIPageBtn
    const vnBackBtn = document.getElementById('vnBackBtn');
    const vnFixedActions = document.querySelector('.vn-fixed-actions');

    // AI Chat Elements
    const vnChoicesBar = document.getElementById('vnChoicesBar');
    const vnAIChatContainer = document.getElementById('vnAIChatContainer');
    const vnAIInput = document.getElementById('vnAIInput');
    const vnAISendBtn = document.getElementById('vnAISendBtn');
    const vnAISuggestions = document.getElementById('vnAISuggestions');

    // Check if all elements exist
    if (!vnAvatar || !vnOverlay || !vnDialogue || !vnClose || !vnDialogueText ||
        !vnChoices || !vnCharacterSprite || !vnCallBtn || !vnWhatsappBtn ||
        !vnAIChatBtn || !vnBackBtn || !vnFixedActions) {
        console.error('One or more chatbot elements not found');
        return;
    }

    // ============ GEMINI API CONFIGURATION ============
    // IMPORTANT: Replace with your actual API key and restrict it in Google Cloud Console!
    // Note: 'AIzaSyDY...' is the WORKING key. The other one (AIzaSyB4...) returns 403 Forbidden (API not enabled).
    const GEMINI_API_KEY = 'AIzaSyDYiN_sXnoR0vL3drW6GyVXNrIJ24xEguo'; // <-- WORKING KEY
    // Using gemini-1.5-flash for verified performance
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // System Prompt with Company Info, Personality, Duties, and Limitations
    const SAHELI_SYSTEM_PROMPT = `You are Saheli, the friendly and knowledgeable virtual travel assistant for Seven Destination Tour & Travel.

## About Seven Destination:
- **Company Name:** Seven Destination Tour & Travel
- **Location:** 13/29A Mohanlal Bahalwala Road, Bally, Howrah, West Bengal 711201, India
- **Phone:** +91 8585858400
- **Email:** info@sevendestination.com
- **Website:** sevendestination.com
- **Founded:** 2010
- **Specialty:** Premium travel experiences across India, especially Bengal, Sikkim, Darjeeling, North East India, Rajasthan, Goa, Kerala, and more.
- **Services:** Tour packages, Hotel booking, Car rental (Sedan, SUV, Tempo Traveller, Bus), Flight/Train/Bus ticket booking, Cruise booking, Visa assistance.

## Popular Tour Packages:
- Kolkata Heritage Tours, Sundarbans Adventures, Gangasagar Pilgrimage
- Darjeeling Classic Tour, Sikkim Himalayan Bliss, North Sikkim (Lachen-Lachung)
- Rajasthan Heritage, Golden Triangle, Goa Beach Paradise, Kerala Backwaters
- South India Temple Tour

## Your Personality (Saheli):
- You are warm, friendly, and enthusiastic about travel.
- You speak in a helpful and conversational tone, like a knowledgeable friend.
- You use emojis occasionally to be expressive 😊✨.
- You are excited to help travelers plan their dream trips!

## Your Duties:
1. Assist users with travel queries about destinations, packages, pricing, and availability.
2. Provide personalized itinerary suggestions based on user preferences (budget, duration, interests).
3. Answer questions about Seven Destination's services.
4. Help users understand booking processes and payment options.
5. Recommend best times to visit various destinations.

## Your Limitations:
1. You CANNOT make actual bookings or payments - always direct users to call (+91 8585858400), WhatsApp, or the website.
2. You do NOT have access to real-time availability or pricing - provide estimates and suggest contacting the team for exact quotes.
3. You should NOT provide medical, legal, or financial advice.
4. If you don't know something, admit it and suggest contacting the team directly.
5. Keep responses VERY concise (under 50 words), professional, and fast. Like a smart chat support agent.

## Response Guidelines:
- Be extremely concise (max 2 sentences usually).
- Use professional but friendly tone.
- No long paragraphs.
- Direct to WhatsApp/Call for complex queries.
- If asked about something unrelated to travel, politely redirect to travel topics.`;

    let conversationHistory = []; // Store conversation for context
    let isAIMode = false; // Track if AI chat mode is active

    const sprites = {
        normal: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/normal.png',
        happy: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/happy.png',
        excited: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/excited.png',
        helpful: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/helpful.png'
    };

    const dialogues = {
        greeting: {
            text: "Hello! I'm Saheli, your travel assistant. How can I help you today?",
            sprite: 'normal',
            choices: [
                { text: "Plan a Trip", next: 'plan-trip' },
                { text: "Book Transport", next: 'transport-info' },
                { text: "Find Hotels", next: 'accommodation-info' },
                { text: "More Options...", next: 'more-options' }
            ]
        },
        'plan-trip': {
            text: "Exciting! What kind of experience are you looking for?",
            sprite: 'happy',
            choices: [
                { text: "Heritage & Culture", next: 'heritage-tours' },
                { text: "Hills & Mountains", next: 'hill-tours' },
                { text: "Beaches & Relax", next: 'beach-tours' },
                { text: "Spiritual Journey", next: 'spiritual-tours' },
                { text: "Back", next: 'greeting' }
            ]
        },
        'heritage-tours': {
            text: "Great choice! Here are our top Heritage Packages:",
            sprite: 'excited',
            choices: [
                { text: "Rajasthan (8D/7N)", action: 'link-rajasthan' },
                { text: "Golden Triangle (6D/5N)", action: 'link-golden' },
                { text: "Kolkata (4D/3N)", action: 'link-kolkata' },
                { text: "Back", next: 'plan-trip' }
            ]
        },
        'hill-tours': { // Hill Stations
            text: "The mountains are calling! Check these out:",
            sprite: 'excited',
            choices: [
                { text: "Sikkim Bliss (5D/4N)", action: 'link-sikkim' },
                { text: "Darjeeling Tea (4D/3N)", action: 'link-darjeeling' },
                { text: "Himalayan Trek (7D/6N)", action: 'link-trek' },
                { text: "Back", next: 'plan-trip' }
            ]
        },
        'beach-tours': { // Beach
            text: "Sun, Sand, and Sea! Here are the best beach vibes:",
            sprite: 'happy',
            choices: [
                { text: "Goa Paradise (4D/3N)", action: 'link-goa' },
                { text: "Kerala Backwaters (5D/4N)", action: 'link-kerala' },
                { text: "Andaman Islands", next: 'contact' }, // Placeholder for now
                { text: "Back", next: 'plan-trip' }
            ]
        },
        'spiritual-tours': { // Spiritual
            text: "Embark on a divine journey. Popular pilgrimages:",
            sprite: 'normal',
            choices: [
                { text: "South India Temples (9D)", action: 'link-south' },
                { text: "Varanasi & Kashi", next: 'contact' },
                { text: "Char Dham Yatra", next: 'contact' },
                { text: "Back", next: 'plan-trip' }
            ]
        },
        'transport-info': {
            text: "Need a ride? We have a fleet ready for you.",
            sprite: 'helpful',
            choices: [
                { text: "Car Rental", next: 'car-rental-options' },
                { text: "Bus Tickets", next: 'bus-booking' },
                { text: "Train/Flight", next: 'ticket-booking' },
                { text: "Back", next: 'greeting' }
            ]
        },
        'car-rental-options': { // Fixed missing key
            text: "Choose your comfort level:",
            sprite: 'normal',
            choices: [
                { text: "Economy (₹1200/day)", action: 'book-economy-car' },
                { text: "Luxury (₹3500/day)", action: 'book-luxury-car' },
                { text: "Group/Bus (₹5000/day)", action: 'book-group-car' },
                { text: "Back", next: 'transport-info' }
            ]
        },
        'bus-booking': {
            text: "Comfortable AC buses to all major cities.",
            sprite: 'normal',
            choices: [
                { text: "Book Now", action: 'scroll-ticket' },
                { text: "Back", next: 'transport-info' }
            ]
        },
        'ticket-booking': {
            text: "We book Flights and Trains at the best rates.",
            sprite: 'helpful',
            choices: [
                { text: "Contact for Tickets", next: 'contact' },
                { text: "Back", next: 'transport-info' }
            ]
        },
        'accommodation-info': {
            text: "Stay in comfort. What's your style?",
            sprite: 'happy',
            choices: [
                { text: "Luxury Hotels", next: 'hotel-luxury' },
                { text: "Budget Stays", next: 'hotel-budget' },
                { text: "Homestays", next: 'hotel-homestay' },
                { text: "Back", next: 'greeting' }
            ]
        },
        'hotel-luxury': { // Fixed missing key logic
            text: "5-Star experiences starting @ ₹8000/night.",
            sprite: 'excited',
            choices: [
                { text: "View Details", action: 'scroll-hotel' },
                { text: "Back", next: 'accommodation-info' }
            ]
        },
        'hotel-budget': {
            text: "Clean & Comfy rooms starting @ ₹1500/night.",
            sprite: 'normal',
            choices: [
                { text: "View Details", action: 'scroll-hotel' },
                { text: "Back", next: 'accommodation-info' }
            ]
        },
        'hotel-homestay': {
            text: "Live like a local! Starting @ ₹2000/night.",
            sprite: 'happy',
            choices: [
                { text: "View Details", action: 'scroll-hotel' },
                { text: "Back", next: 'accommodation-info' }
            ]
        },
        'more-options': {
            text: "What else can I do for you?",
            sprite: 'helpful',
            choices: [
                { text: "Current Offers", next: 'offers' },
                { text: "Refer & Earn", next: 'share' },
                { text: "Help & Support", next: 'help' },
                { text: "About Us", next: 'about' },
                { text: "Back", next: 'greeting' }
            ]
        },
        offers: {
            text: "Don't miss out on these deals!",
            sprite: 'excited',
            choices: [
                { text: "Summer Sale (25% Off)", action: 'view-packages' },
                { text: "Group Discount (20% Off)", action: 'view-packages' },
                { text: "Back", next: 'more-options' }
            ]
        },
        share: {
            text: "Invite friends and earn ₹500 per booking!",
            sprite: 'excited',
            choices: [
                { text: "Get Invite Code", next: 'referral-code' },
                { text: "Main Menu", next: 'greeting' }
            ]
        },
        'referral-code': {
            text: "Your Code: SEVEN2025. Share it now!",
            sprite: 'happy',
            choices: [
                { text: "Copy Code", action: 'copy-code' },
                { text: "Back", next: 'share' }
            ]
        },
        help: {
            text: "Here whenever you need me.",
            sprite: 'helpful',
            choices: [
                { text: "FAQs", next: 'faq' },
                { text: "Contact Support", next: 'contact' },
                { text: "Back", next: 'more-options' }
            ]
        },
        faq: {
            text: "What would you like to know?",
            sprite: 'normal',
            choices: [
                { text: "Booking Policy", next: 'booking-faq' }, // Fixed missing key
                { text: "Refund Policy", next: 'refund-policy' }, // Fixed missing key
                { text: "Back", next: 'help' }
            ]
        },
        'booking-faq': {
            text: "You can book with 50% advance. Remainder before travel.",
            sprite: 'helpful',
            choices: [
                { text: "Back", next: 'faq' }
            ]
        },
        'refund-policy': {
            text: "Full refund if cancelled 7 days prior. 50% within 7 days.",
            sprite: 'normal',
            choices: [
                { text: "Back", next: 'faq' }
            ]
        },
        about: {
            text: "Seven Destination: Creating memories since 2010.",
            sprite: 'happy',
            choices: [
                { text: "Why Choose Us?", next: 'why-choose' }, // Fixed missing key
                { text: "Contact", next: 'contact' },
                { text: "Back", next: 'more-options' }
            ]
        },
        'why-choose': {
            text: "24/7 Support, Local Experts, and Best Price Guarantee!",
            sprite: 'excited',
            choices: [
                { text: "Awesome!", next: 'about' }
            ]
        },
        contact: {
            text: "Reach us at +91 98765 43210 or email info@sevendestination.com",
            sprite: 'helpful',
            choices: [
                { text: "Call Now", action: 'call' },
                { text: "WhatsApp", action: 'whatsapp' },
                { text: "Back", next: 'greeting' }
            ]
        }
    };

    // State variables
    let currentState = 'greeting';
    let isOpen = false;
    let history = [];
    let currentTypingTimer = null; // Fix for race condition

    // Simple state management
    function playSound(sound, vol = 0.4) {
        try { sound.volume = vol; sound.currentTime = 0; sound.play(); } catch (e) { }
    }

    function typeText(text, el, cb) {
        // Clear any existing typing
        if (currentTypingTimer) {
            clearTimeout(currentTypingTimer);
            currentTypingTimer = null;
        }

        // 1. Prepare the full HTML with links FIRST
        function addTextWithLinks(rawText) {
            let processed = rawText;
            if (rawText.includes('<a href=')) return rawText; // Already has HTML

            // URLs to Links
            processed = processed.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
            // WhatsApp
            processed = processed.replace(/WhatsApp\s+(\+?\d{10,})/gi, '<a href="https://wa.me/$1">WhatsApp $1</a>');
            // Phone Numbers (only if not inside a tag)
            processed = processed.replace(/(?<!["\d])(\+?\d{10,})(?!["\d])/g, '<a href="tel:$1">$1</a>');

            return processed;
        }

        const fullHTML = addTextWithLinks(text);

        el.innerHTML = ''; // Start clean
        let i = 0;

        function t() {
            if (i >= fullHTML.length) {
                el.removeAttribute('aria-busy');
                highlightButtons(text);
                cb?.();
                return;
            }

            const char = fullHTML[i];

            if (char === '<') {
                // It's a tag! Fast-forward until '>'
                let tag = '';
                // Safety check to prevent infinite loop if malformed
                let j = i;
                while (j < fullHTML.length && fullHTML[j] !== '>') {
                    tag += fullHTML[j];
                    j++;
                }
                tag += '>'; // Add the closing bracket
                if (j < fullHTML.length) j++; // Move past '>' if we found it

                el.innerHTML += tag;
                i = j; // Update main index

                // Don't wait, continue immediately to next char
                t();
            } else {
                // Normal character
                el.innerHTML += char;
                i++;
                if (i % 3 === 0) playSound(typeSound); // Play sound less frequently
                currentTypingTimer = setTimeout(t, 25); // Smooth speed
            }
        }

        // Instant complete function
        const complete = () => {
            if (currentTypingTimer) clearTimeout(currentTypingTimer);
            el.innerHTML = fullHTML;
            el.removeAttribute('aria-busy');
            highlightButtons(text);
            cb?.();
        };

        el.setAttribute('aria-busy', 'true');
        t();
    }



    function highlightButtons(text) {
        document.querySelectorAll('.vn-action-btn').forEach(btn => {
            btn.classList.remove('highlight');
        });

        const lowerText = text.toLowerCase();
        if (lowerText.includes('whatsapp')) {
            setTimeout(() => vnWhatsappBtn.classList.add('highlight'), 100);
        }
        if (lowerText.includes('call')) {
            setTimeout(() => vnCallBtn.classList.add('highlight'), 100);
        }
        if (lowerText.includes('ai page') || lowerText.includes('ai')) {
            setTimeout(() => vnAIPageBtn.classList.add('highlight'), 100);
        }
    }

    function changeSprite(key) {
        const src = sprites[key] || sprites.normal;

        // If same sprite, no transition needed
        if (vnCharacterSprite.src === src) return;

        // Instant change - CSS handles smooth transition
        vnCharacterSprite.src = src;
        vnCharacterSprite.alt = `Travel Assistant (${key})`;
    }

    function toggleVN(open) {
        isOpen = open;
        vnOverlay.classList.toggle('active', open);
        vnDialogue.classList.toggle('active', open);
        vnAvatar.classList.toggle('overlay-hidden', open);
        vnFixedActions.classList.toggle('visible', open);
        if (open) {
            vnDialogue.focus();
            if (history.length > 0) {
                vnBackBtn.classList.add('visible');
            } else {
                vnBackBtn.classList.remove('visible');
            }
        } else {
            vnAvatar.focus();
            if (currentTypingTimer) clearTimeout(currentTypingTimer); // Stop typing if closed
        }
    }

    function showDialogue(key) {
        const dlg = dialogues[key] || dialogues.greeting;

        // Stop any previous typing immediately
        if (currentTypingTimer) {
            clearTimeout(currentTypingTimer);
            currentTypingTimer = null;
        }

        // Scroll page to relevant section based on dialogue topic
        // (Keeping existing scroll logic)
        const scrollMappings = {
            'services': '#services',
            'tour-info': '#packages',
            'transport-info': '#services',
            'vehicle-options': '#services',
            'accommodation-info': '#services',
            'hotel-categories': '#services',
            'ticket-info': '#services',
            'offers': '#packages',
            'seasonal-offers': '#packages',
            'group-offers': '#packages',
            'reviews': '#testimonials',
            'read-reviews': '#testimonials',
            'about': '#about',
            'contact': '#contact',
            'help': '#contact'
        };

        if (scrollMappings[key]) {
            const targetSection = document.querySelector(scrollMappings[key]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        currentState = key;
        changeSprite(dlg.sprite);
        vnDialogueText.setAttribute('aria-busy', 'true');
        vnChoices.innerHTML = ''; // Specific clear

        if (history.length > 0 && key !== 'greeting') {
            vnBackBtn.classList.add('visible');
        } else {
            vnBackBtn.classList.remove('visible');
        }

        typeText(dlg.text, vnDialogueText, () => {
            // Only append if we match the current state (double safety)
            if (currentState !== key) return;

            vnChoices.innerHTML = ''; // Clear again just to be safe

            dlg.choices.forEach((ch, idx) => {
                const btn = document.createElement('button');
                btn.className = 'vn-choice-btn';
                btn.textContent = ch.text;
                btn.tabIndex = idx === 0 ? 0 : -1;
                btn.onclick = e => {
                    e.preventDefault();
                    playSound(clickSound);
                    if (ch.action) {
                        handleAction(ch.action);
                    } else if (ch.next === 'back') {
                        // BACK Navigation
                        const previousState = history.pop() || 'greeting';
                        showDialogue(previousState);
                    } else {
                        // FORWARD Navigation
                        // Explicitly push current key to history before moving
                        if (currentState !== 'greeting' || ch.next !== 'greeting') {
                            // Avoid pushing greeting if we are just starting or looping back to greeting
                            history.push(currentState);
                        }
                        showDialogue(ch.next);
                    }
                };
                btn.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } };
                vnChoices.appendChild(btn);
            });
            vnChoices.querySelector('.vn-choice-btn')?.focus();
        });
    }

    function handleAction(action) {
        if (!action) return;

        console.log("Chatbot handling action:", action);
        playSound(clickSound);

        // Scroll Actions
        if (action === 'scroll-hotel') {
            document.getElementById('hotel-booking').scrollIntoView({ behavior: 'smooth' });
            toggleVN(false); // Close bot
            return;
        }
        if (action === 'scroll-ticket') {
            document.getElementById('ticket-service').scrollIntoView({ behavior: 'smooth' });
            toggleVN(false); // Close bot
            return;
        }

        // Deep Link/Open specific modals logic
        if (action.startsWith('link-') || action.startsWith('book-')) {
            toggleVN(false); // Close bot first
            let targetTitle = '';

            // Map actions to titles in index.html
            const actionMap = {
                'link-rajasthan': 'Royal Rajasthan Heritage',
                'link-golden': 'Golden Triangle',
                'link-kolkata': 'Kolkata & Gangasagar',
                'link-sikkim': 'Sikkim Himalayan Bliss',
                'link-darjeeling': 'Darjeeling Tea',
                'link-trek': 'Himalayan Trekking',
                'link-goa': 'Goa Beach Paradise',
                'link-kerala': 'Kerala Backwaters',
                'link-south': 'South India Temple',
                'book-economy-car': 'Economy Cars',
                'book-luxury-car': 'Luxury Sedans',
                'book-group-car': 'Group Transport'
            };

            targetTitle = actionMap[action] || '';

            if (targetTitle) {
                // Find button with this title and click it
                // Using partial match for robustness
                const buttons = document.querySelectorAll('[data-title]');
                let found = false;
                for (let btn of buttons) {
                    if (btn.dataset.title && btn.dataset.title.includes(targetTitle)) {
                        btn.click();
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // Fallback to section scroll if specific card not found
                    const sectionId = action.includes('car') ? 'car-rental' : 'packages';
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                }
            }
            return;
        }

        switch (action) {
            case 'call':
                window.location.href = 'tel:+8585858400';
                break;
            case 'whatsapp':
                let waUrl = 'https://wa.me/8585858400';
                // If AI Chat was active or history has content, append it
                if (conversationHistory.length > 0) {
                    let chatSummary = "User Chat History:\n";
                    // Append last 6 exchanges to keep url short enough
                    const recentHistory = conversationHistory.slice(-6);
                    recentHistory.forEach(msg => {
                        const role = msg.role === 'user' ? 'User' : 'Saheli';
                        const text = msg.parts[0].text.substring(0, 100); // Truncate long messages
                        chatSummary += `${role}: ${text}\n`;
                    });
                    waUrl += `?text=${encodeURIComponent(chatSummary)}`;
                }
                window.open(waUrl, '_blank');
                break;
            case 'share-facebook':
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
                break;
            case 'copy-code':
                navigator.clipboard.writeText('SEVEN2025').then(() => {
                    alert('Referral Code SEVEN2025 Copied!');
                });
                break;
            case 'view-packages':
                document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
                toggleVN(false);
                break;
            case 'start-booking':
                // Scroll to packages for now as generic booking start
                document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
                toggleVN(false);
                break;
            case 'view-reviews':
                const reviewSec = document.getElementById('testimonials');
                if (reviewSec) {
                    reviewSec.scrollIntoView({ behavior: 'smooth' });
                    toggleVN(false);
                }
                break;
            case 'submit-review':
                alert('Redirecting to review form...');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    // Initialize event listeners
    vnAvatar.onclick = e => {
        e.stopPropagation();
        playSound(clickSound);
        toggleVN(true);
        exitAIMode(); // Ensure we start in normal mode
        history = [];
        showDialogue('greeting');
    };

    vnClose.onclick = e => {
        e.stopPropagation();
        playSound(clickSound);
        exitAIMode();
        toggleVN(false);
    };

    vnOverlay.onclick = e => {
        if (e.target === vnOverlay) {
            playSound(clickSound);
            exitAIMode();
            toggleVN(false);
        }
    };

    vnCallBtn.onclick = () => handleAction('call');
    vnWhatsappBtn.onclick = () => handleAction('whatsapp');

    // AI Chat Button - Toggle AI Mode
    vnAIChatBtn.onclick = () => {
        playSound(clickSound);
        if (isAIMode) {
            exitAIMode();
        } else {
            enterAIMode();
        }
    };

    vnBackBtn.onclick = () => {
        playSound(clickSound);
        if (isAIMode) {
            exitAIMode(); // Exit AI mode if in it
        } else {
            const previousState = history.pop() || 'greeting';
            showDialogue(previousState);
        }
    };

    document.onkeydown = e => {
        if (e.key === 'Escape' && isOpen) {
            playSound(clickSound);
            exitAIMode();
            toggleVN(false);
        }
    };

    vnAvatar.tabIndex = 0;
    vnAvatar.setAttribute('aria-label', 'Open VN Chat');

    // ============ AI MODE FUNCTIONS ============
    function enterAIMode() {
        isAIMode = true;
        vnChoicesBar.style.display = 'none';
        vnAIChatContainer.style.display = 'flex';
        vnAIChatBtn.style.background = 'linear-gradient(135deg, #00c853, #00a844)'; // Green when active
        vnDialogueText.innerHTML = "Hi! I'm Saheli with AI superpowers! 🤖✨ Ask me anything about your dream trip, or pick a suggestion below!";
        changeSprite('excited');
        conversationHistory = []; // Reset conversation
        vnAISuggestions.style.display = 'flex'; // Ensure visible on start
        vnAIInput.focus();
    }

    function exitAIMode() {
        if (!isAIMode) return;
        isAIMode = false;
        vnChoicesBar.style.display = 'block';
        vnAIChatContainer.style.display = 'none';
        vnAIChatBtn.style.background = ''; // Reset to default
        showDialogue('greeting');
    }

    // Detect appropriate sprite based on AI response content
    function detectSpriteFromContent(text) {
        const lowerText = text.toLowerCase();

        // Excited: For amazing deals, adventures, recommendations
        const excitedPatterns = ['amazing', 'incredible', 'fantastic', 'awesome', 'perfect', 'best', 'love', 'exciting', '🎉', '✨', '🚀', '⭐', '🌟', '❤️', '🔥', '💯'];
        if (excitedPatterns.some(p => lowerText.includes(p))) {
            return 'excited';
        }

        // Happy: For positive responses, welcomes, confirmations
        const happyPatterns = ['great', 'wonderful', 'happy', 'glad', 'welcome', 'enjoy', 'pleasure', '😊', '😄', '🙂', '👍', '💕', 'beautiful', 'lovely'];
        if (happyPatterns.some(p => lowerText.includes(p))) {
            return 'happy';
        }

        // Helpful: For informative responses, tips, guidance
        const helpfulPatterns = ['here', 'suggest', 'recommend', 'tip', 'advice', 'guide', 'help', 'information', 'details', 'contact', 'call', '📞', '💡', '📍', 'itinerary', 'plan'];
        if (helpfulPatterns.some(p => lowerText.includes(p))) {
            return 'helpful';
        }

        // Default: normal
        return 'normal';
    }

    // Gemini API Call Function
    async function callGeminiAPI(userMessage) {
        // Hide suggestions once user interacts
        vnAISuggestions.style.display = 'none';

        // Add user message to history
        conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

        // Show typing indicator
        vnDialogueText.innerHTML = 'Thinking... 💭';
        changeSprite('helpful');
        vnAISendBtn.disabled = true;

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: SAHELI_SYSTEM_PROMPT }] },
                        ...conversationHistory
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 512,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, I couldn't think of a response. Please try again!";

            // Add AI response to history
            conversationHistory.push({ role: 'model', parts: [{ text: aiResponse }] });

            // Detect appropriate sprite based on response content
            const spriteForResponse = detectSpriteFromContent(aiResponse);

            // Display response with typing effect
            typeText(aiResponse, vnDialogueText, () => {
                changeSprite(spriteForResponse);
            });

        } catch (error) {
            console.error('Gemini API Error:', error);
            let errorMessage = "Oops! I'm having trouble connecting right now. 😅 Please try again or contact us directly at +91 8585858400!";

            if (error.message.includes('401') || error.message.includes('403')) {
                errorMessage = "My AI brain isn't connected yet! Please ask the team to set up the API key. 🔑";
            } else if (error.message.includes('429')) {
                errorMessage = "I'm a bit overwhelmed right now! 😅 Too many questions at once. Please wait a moment and try again!";
            }

            vnDialogueText.innerHTML = errorMessage;
            changeSprite('normal');
        } finally {
            vnAISendBtn.disabled = false;
            vnAIInput.focus();
        }
    }

    // AI Send Button Handler
    vnAISendBtn.onclick = () => {
        const message = vnAIInput.value.trim();
        if (message) {
            vnAIInput.value = '';
            callGeminiAPI(message);
        }
    };

    // AI Input Enter Key Handler
    vnAIInput.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            vnAISendBtn.click();
        }
    };

    // AI Suggestion Buttons Handler
    vnAISuggestions.querySelectorAll('.vn-ai-suggestion-btn').forEach(btn => {
        btn.onclick = () => {
            playSound(clickSound);
            const suggestion = btn.textContent;
            vnAIInput.value = suggestion;
            callGeminiAPI(suggestion);
        };
    });

    // Handle links in dialogue text
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.closest('#vnDialogueText')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            if (href.startsWith('tel:')) {
                window.open(href, '_blank');
            } else if (href.startsWith('https://wa.me/')) {
                window.open(href, '_blank');
            } else if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.open(href, '_blank');
            }
        }
    });

    // Ensure avatar is visible on load
    vnAvatar.classList.remove('overlay-hidden');
});
