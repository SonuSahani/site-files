        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
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
            const vnCallBtn = document.getElementById('vnCallBtn');
            const vnWhatsappBtn = document.getElementById('vnWhatsappBtn');
            const vnAIPageBtn = document.getElementById('vnAIPageBtn');
            const vnBackBtn = document.getElementById('vnBackBtn');
            const vnFixedActions = document.querySelector('.vn-fixed-actions');

            // Check if all elements exist
            if (!vnAvatar || !vnOverlay || !vnDialogue || !vnClose || !vnDialogueText ||
                !vnChoices || !vnCharacterSprite || !vnCallBtn || !vnWhatsappBtn ||
                !vnAIPageBtn || !vnBackBtn || !vnFixedActions) {
                console.error('One or more chatbot elements not found');
                return;
            }

            const sprites = {
                normal: 'http://www.sevendestination.com/wp-content/uploads/2025/10/normal-e1761737225955.png',
                happy: 'http://www.sevendestination.com/wp-content/uploads/2025/10/happy-e1761737141423.png',
                excited: 'http://www.sevendestination.com/wp-content/uploads/2025/10/excited-e1761737091289.png',
                helpful: 'http://www.sevendestination.com/wp-content/uploads/2025/10/helpful-e1761737173245.png'
            };

            const dialogues = {
                greeting: {
                    text: "Hello! I'm Saheli, your travel assistant from Seven Destination. How can I assist you today?",
                    sprite: 'normal',
                    choices: [
                        { text: "Our Services", next: 'services' },
                        { text: "Current Offers", next: 'offers' },
                        { text: "Customer Reviews", next: 'reviews' },
                        { text: "Share & Refer", next: 'share' },
                        { text: "Help & Support", next: 'help' },
                        { text: "About Us", next: 'about' }
                    ]
                },
                services: {
                    text: "We offer comprehensive travel services including tour packages, transportation, accommodation, and ticket booking. What would you like to know?",
                    sprite: 'happy',
                    choices: [
                        { text: "Tour Packages", next: 'tour-info' },
                        { text: "Transportation", next: 'transport-info' },
                        { text: "Accommodation", next: 'accommodation-info' },
                        { text: "Ticket Booking", next: 'ticket-info' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'tour-info': {
                    text: "Our tour packages include guided experiences, cultural tours, adventure activities, and customized itineraries. All packages include accommodation and meals.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Booking Process", next: 'booking-process' },
                        { text: "Pricing Info", next: 'pricing' },
                        { text: "Back to Services", next: 'services' }
                    ]
                },
                'transport-info': {
                    text: "We provide car rentals, bus services, and flight arrangements. All vehicles are well-maintained with professional drivers for your safety.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Vehicle Options", next: 'vehicle-options' },
                        { text: "Booking Process", next: 'booking-process' },
                        { text: "Back to Services", next: 'services' }
                    ]
                },
                'accommodation-info': {
                    text: "We partner with verified hotels, resorts, and homestays across various categories. All accommodations are quality-checked for your comfort.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Hotel Categories", next: 'hotel-categories' },
                        { text: "Booking Process", next: 'booking-process' },
                        { text: "Back to Services", next: 'services' }
                    ]
                },
                'ticket-info': {
                    text: "We book flights, trains, and buses for your travel needs. We ensure the best prices and convenient scheduling for your journey.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Booking Process", next: 'booking-process' },
                        { text: "Cancellation Policy", next: 'cancellation' },
                        { text: "Back to Services", next: 'services' }
                    ]
                },
                'booking-process': {
                    text: "Our booking process is simple: 1) Select your service 2) Choose dates 3) Make payment 4) Receive confirmation. We assist at every step!",
                    sprite: 'happy',
                    choices: [
                        { text: "Payment Options", next: 'payment' },
                        { text: "Start Booking", action: 'start-booking' },
                        { text: "Back", next: 'services' }
                    ]
                },
                offers: {
                    text: "We have exciting offers and discounts available! Save more on your travel with our current promotions.",
                    sprite: 'excited',
                    choices: [
                        { text: "Seasonal Discounts", next: 'seasonal-offers' },
                        { text: "Group Packages", next: 'group-offers' },
                        { text: "Loyalty Rewards", next: 'loyalty-program' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'seasonal-offers': {
                    text: "Enjoy up to 25% off on summer packages and 30% off on monsoon specials. Limited time offers with flexible booking dates.",
                    sprite: 'excited',
                    choices: [
                        { text: "View Packages", action: 'view-packages' },
                        { text: "Terms Apply", next: 'terms' },
                        { text: "Back to Offers", next: 'offers' }
                    ]
                },
                'group-offers': {
                    text: "Travel with friends and family! Get 15% discount for groups of 4-7 people and 20% for groups of 8 or more.",
                    sprite: 'happy',
                    choices: [
                        { text: "Group Packages", action: 'view-packages' },
                        { text: "Booking Details", next: 'booking-process' },
                        { text: "Back to Offers", next: 'offers' }
                    ]
                },
                'loyalty-program': {
                    text: "Join our loyalty program! Earn points with every booking and redeem them for discounts on future travels.",
                    sprite: 'helpful',
                    choices: [
                        { text: "How to Join", next: 'loyalty-details' },
                        { text: "Benefits", next: 'loyalty-benefits' },
                        { text: "Back to Offers", next: 'offers' }
                    ]
                },
                reviews: {
                    text: "We value our customers' feedback! Read what travelers say about their experiences with Seven Destination.",
                    sprite: 'happy',
                    choices: [
                        { text: "Read Reviews", next: 'read-reviews' },
                        { text: "Write a Review", next: 'write-review' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'read-reviews': {
                    text: "Our customers love us! With 4.8/5 average rating, travelers praise our professional service and value for money.",
                    sprite: 'excited',
                    choices: [
                        { text: "View All Reviews", action: 'view-reviews' },
                        { text: "Write a Review", next: 'write-review' },
                        { text: "Back to Reviews", next: 'reviews' }
                    ]
                },
                'write-review': {
                    text: "We'd love to hear about your experience! Share your feedback to help us improve.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Submit Review", action: 'submit-review' },
                        { text: "Back to Reviews", next: 'reviews' }
                    ]
                },
                share: {
                    text: "Love our services? Share Seven Destination with friends and family! Refer others and earn rewards.",
                    sprite: 'excited',
                    choices: [
                        { text: "Refer Friends", next: 'refer-friends' },
                        { text: "Share on Social", next: 'share-social' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'refer-friends': {
                    text: "Refer friends and earn ₹500 for each successful booking! Your friend gets 10% off their first booking.",
                    sprite: 'happy',
                    choices: [
                        { text: "Get Referral Code", action: 'get-referral' },
                        { text: "Back to Share", next: 'share' }
                    ]
                },
                'share-social': {
                    text: "Share your travel experiences on social media! Tag us @SevenDestination and use #TravelWithSeven.",
                    sprite: 'excited',
                    choices: [
                        { text: "Share on Facebook", action: 'share-facebook' },
                        { text: "Share on Instagram", action: 'share-instagram' },
                        { text: "Back to Share", next: 'share' }
                    ]
                },
                help: {
                    text: "I'm here to help you navigate our services and find the information you need.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Website Guide", next: 'website-guide' },
                        { text: "FAQs", next: 'faq' },
                        { text: "Contact Support", next: 'contact' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'website-guide': {
                    text: "Our website is organized into sections: Services, Offers, Reviews, and Contact.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Services Section", action: 'navigate-services' },
                        { text: "Offers Section", action: 'navigate-offers' },
                        { text: "Reviews Section", action: 'navigate-reviews' },
                        { text: "Contact Page", action: 'navigate-contact' },
                        { text: "Back to Help", next: 'help' }
                    ]
                },
                faq: {
                    text: "Frequently asked questions: How to book? Payment options? Cancellation policy?",
                    sprite: 'normal',
                    choices: [
                        { text: "Booking FAQ", next: 'booking-faq' },
                        { text: "Payment FAQ", next: 'payment-faq' },
                        { text: "Back to Help", next: 'help' }
                    ]
                },
                'booking-faq': {
                    text: "Booking FAQ: How far in advance to book? What documents are needed?",
                    sprite: 'helpful',
                    choices: [
                        { text: "Start Booking", action: 'start-booking' },
                        { text: "More FAQ", next: 'faq' }
                    ]
                },
                'payment-faq': {
                    text: "Payment FAQ: What payment methods are accepted? Is payment secure?",
                    sprite: 'helpful',
                    choices: [
                        { text: "Payment Options", next: 'payment' },
                        { text: "Back to FAQ", next: 'faq' }
                    ]
                },
                about: {
                    text: "Seven Destination is your trusted travel partner with years of experience.",
                    sprite: 'happy',
                    choices: [
                        { text: "Our Mission", next: 'mission' },
                        { text: "Why Choose Us", next: 'why-choose' },
                        { text: "Contact Us", next: 'contact' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                mission: {
                    text: "Our mission is to make travel accessible, enjoyable, and memorable for everyone.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Why Choose Us", next: 'why-choose' },
                        { text: "Back to About", next: 'about' }
                    ]
                },
                'why-choose': {
                    text: "Choose us for: Expert planning, 24/7 support, competitive prices, and memorable experiences.",
                    sprite: 'excited',
                    choices: [
                        { text: "View Services", next: 'services' },
                        { text: "Current Offers", next: 'offers' },
                        { text: "Read Reviews", next: 'reviews' },
                        { text: "Back to About", next: 'about' }
                    ]
                },
                contact: {
                    text: "We're here to help! Reach out to us through multiple channels for assistance.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Call Us", action: 'call' },
                        { text: "WhatsApp", action: 'whatsapp' },
                        { text: "Email Support", action: 'email' },
                        { text: "Office Hours", next: 'office-hours' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'office-hours': {
                    text: "We're available Monday to Saturday, 9 AM to 8 PM. For urgent assistance, please use WhatsApp.",
                    sprite: 'normal',
                    choices: [
                        { text: "Call Now", action: 'call' },
                        { text: "WhatsApp", action: 'whatsapp' },
                        { text: "Back to Contact", next: 'contact' }
                    ]
                },
                terms: {
                    text: "Our terms and conditions cover booking policies, payment terms, and cancellation rules.",
                    sprite: 'normal',
                    choices: [
                        { text: "Booking Terms", next: 'booking-terms' },
                        { text: "Payment Terms", next: 'payment-terms' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'booking-terms': {
                    text: "Booking terms: Advance payment required, confirmation within 24 hours, valid ID proof needed.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Start Booking", action: 'start-booking' },
                        { text: "Full Terms", action: 'full-terms' },
                        { text: "Back to Terms", next: 'terms' }
                    ]
                },
                'payment-terms': {
                    text: "Payment terms: Multiple payment methods accepted, installment options available.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Payment Options", next: 'payment' },
                        { text: "Back to Terms", next: 'terms' }
                    ]
                },
                cancellation: {
                    text: "Cancellation policy: Free cancellation 48+ hours before, partial refund after 48 hours.",
                    sprite: 'normal',
                    choices: [
                        { text: "Refund Policy", next: 'refund-policy' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'refund-policy': {
                    text: "Refund policy: Refunds processed within 7-10 working days to original payment method.",
                    sprite: 'normal',
                    choices: [
                        { text: "Back to Cancellation", next: 'cancellation' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                payment: {
                    text: "We accept credit/debit cards, net banking, UPI, wallets, and cash. Secure payment gateway.",
                    sprite: 'helpful',
                    choices: [
                        { text: "Installment Options", next: 'installments' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                installments: {
                    text: "Installment options available for bookings above ₹10,000. Pay 50% now and 50% before travel.",
                    sprite: 'happy',
                    choices: [
                        { text: "Start Booking", action: 'start-booking' },
                        { text: "Back to Payment", next: 'payment' }
                    ]
                },
                safety: {
                    text: "Your safety is our priority. All partners verified, vehicles sanitized, 24/7 emergency support.",
                    sprite: 'helpful',
                    choices: [
                        { text: "COVID Measures", next: 'covid-measures' },
                        { text: "Back to Main", next: 'greeting' }
                    ]
                },
                'covid-measures': {
                    text: "COVID safety: Regular sanitization, masks available, social distancing maintained.",
                    sprite: 'normal',
                    choices: [
                        { text: "Safety Measures", next: 'safety' },
                        { text: "Book Now", action: 'start-booking' }
                    ]
                },
                'booking-confirm': {
                    text: "You've been redirected to our booking section. Please complete your details to confirm.",
                    sprite: 'happy',
                    choices: [
                        { text: "Explore More Options", next: 'greeting' },
                        { text: "View Other Services", next: 'services' },
                        { text: "Contact Support", next: 'contact' }
                    ]
                }
            };

            // State variables
            let currentState = 'greeting';
            let isOpen = false;
            let history = [];

            // Simple state management
            function playSound(sound, vol = 0.4) {
                try { sound.volume = vol; sound.currentTime = 0; sound.play(); } catch (e) { }
            }

            function typeText(text, el, cb) {
                el.innerHTML = '';
                let i = 0, int;

                function addTextWithLinks(text) {
                    let processedText = text;

                    if (text.includes('<a href=')) {
                        return text;
                    }

                    processedText = processedText.replace(/(\+?\d{10,})/g, '<a href="tel:$1">$1</a>');
                    processedText = processedText.replace(/WhatsApp\s+(\+?\d{10,})/gi, '<a href="https://wa.me/$1">WhatsApp $1</a>');
                    processedText = processedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

                    return processedText;
                }

                function t() {
                    if (i < text.length) {
                        el.innerHTML = addTextWithLinks(text.substring(0, i + 1));
                        i++;
                        if (i % 2 == 0) playSound(typeSound);
                        int = setTimeout(t, 40);
                    } else {
                        el.removeAttribute('aria-busy');
                        highlightButtons(text);
                        cb?.();
                    }
                }
                const pause = () => {
                    clearTimeout(int);
                    el.innerHTML = addTextWithLinks(text);
                    el.removeAttribute('aria-busy');
                    highlightButtons(text);
                    cb?.();
                };
                document.addEventListener('click', pause, { once: true });
                document.addEventListener('keydown', pause, { once: true });
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
                vnCharacterSprite.src = src;
                vnCharacterSprite.alt = `Travel Assistant (${key})`;
                vnCharacterSprite.style.opacity = '0.7';
                setTimeout(() => vnCharacterSprite.style.opacity = '1', 300);
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
                }
            }

            function showDialogue(key) {
                const dlg = dialogues[key] || dialogues.greeting;

                if (currentState && key !== 'greeting') {
                    if (!history.includes(currentState)) history.push(currentState);
                    if (key === 'greeting') history = []; // FIX: CLEAR HISTORY ON MAIN MENU
                }

                currentState = key;
                changeSprite(dlg.sprite);
                vnDialogueText.setAttribute('aria-busy', 'true');
                vnChoices.innerHTML = '';

                if (history.length > 0) {
                    vnBackBtn.classList.add('visible');
                } else {
                    vnBackBtn.classList.remove('visible');
                }

                typeText(dlg.text, vnDialogueText, () => {
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
                                const previousState = history.pop() || 'greeting';
                                showDialogue(previousState);
                            } else {
                                showDialogue(ch.next);
                            }
                        };
                        btn.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } };
                        vnChoices.appendChild(btn);
                    });
                    vnChoices.querySelector('.vn-choice-btn')?.focus();
                });
            }

            function handleAction(act) {
                playSound(clickSound);
                switch (act) {
                    case 'call': window.open('tel:+918585858400', '_blank'); break;
                    case 'whatsapp': window.open('https://wa.me/918585858400', '_blank'); break;
                    case 'email': window.open('mailto:info@sevendestination.com', '_blank'); break;
                    case 'ai-page': window.location.href = '#ai-page'; break;
                    case 'start-booking':
                        document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'view-packages':
                        document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'navigate-services':
                        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'navigate-offers':
                        document.querySelector('#offers')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'navigate-reviews':
                        document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'navigate-contact':
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'full-terms':
                        document.querySelector('#terms')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'signup':
                        document.querySelector('#signup')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'view-reviews':
                        document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'submit-review':
                        document.querySelector('#review-form')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'get-referral':
                        document.querySelector('#referral')?.scrollIntoView({ behavior: 'smooth' });
                        showDialogue('booking-confirm');
                        break;
                    case 'share-facebook':
                        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
                        break;
                    case 'share-instagram':
                        window.open('https://www.instagram.com/', '_blank');
                        break;
                    case 'share-twitter':
                        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('Check out Seven Destination for amazing travel experiences!') + '&url=' + encodeURIComponent(window.location.href), '_blank');
                        break;
                }
            }

            // Initialize event listeners
            vnAvatar.onclick = e => {
                e.stopPropagation();
                playSound(clickSound);
                toggleVN(true);
                history = [];
                showDialogue('greeting');
            };

            vnClose.onclick = e => {
                e.stopPropagation();
                playSound(clickSound);
                toggleVN(false);
            };

            vnOverlay.onclick = e => {
                if (e.target === vnOverlay) {
                    playSound(clickSound);
                    toggleVN(false);
                }
            };

            vnCallBtn.onclick = () => handleAction('call');
            vnWhatsappBtn.onclick = () => handleAction('whatsapp');
            vnAIPageBtn.onclick = () => handleAction('ai-page');

            vnBackBtn.onclick = () => {
                playSound(clickSound);
                const previousState = history.pop() || 'greeting';
                showDialogue(previousState);
            };

            document.onkeydown = e => {
                if (e.key === 'Escape' && isOpen) {
                    playSound(clickSound);
                    toggleVN(false);
                }
            };

            vnAvatar.tabIndex = 0;
            vnAvatar.setAttribute('aria-label', 'Open VN Chat');

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
