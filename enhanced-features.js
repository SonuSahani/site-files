// ========================================
// ENHANCED FEATURES FOR SEVEN DESTINATION
// ========================================

// ==========================================
// 1. CURRENCY CONVERTER
// ==========================================
const CurrencyConverter = {
    rates: { USD: 83.12, EUR: 90.45, GBP: 105.23 }, // Updated rates
    currentCurrency: 'INR',

    init() {
        this.createUI();
        this.attachEvents();
        this.fetchLiveRates();
    },

    createUI() {
        const converterHTML = `
            <div class="currency-converter">
                <div class="currency-toggle">
                    <i class="fas fa-exchange-alt"></i>
                    <select id="currencySelect">
                        <option value="INR">₹ INR</option>
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                        <option value="GBP">£ GBP</option>
                    </select>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', converterHTML);
    },

    attachEvents() {
        document.getElementById('currencySelect').addEventListener('change', (e) => {
            this.currentCurrency = e.target.value;
            this.convertAllPrices();
        });
    },

    convertAllPrices() {
        document.querySelectorAll('.package-price').forEach(priceEl => {
            const inrPrice = parseInt(priceEl.getAttribute('data-inr-price') || priceEl.textContent.replace(/[^\d]/g, ''));

            if (!priceEl.getAttribute('data-inr-price')) {
                priceEl.setAttribute('data-inr-price', inrPrice);
            }

            let convertedPrice = inrPrice;
            let symbol = '₹';

            if (this.currentCurrency !== 'INR') {
                convertedPrice = Math.round(inrPrice / this.rates[this.currentCurrency]);
                symbol = this.currentCurrency === 'USD' ? '$' : this.currentCurrency === 'EUR' ? '€' : '£';
            }

            priceEl.innerHTML = `${symbol}${convertedPrice.toLocaleString()} <span class="text-muted">/person</span>`;
        });
    },

    async fetchLiveRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
            const data = await response.json();
            this.rates = {
                USD: 1 / data.rates.USD,
                EUR: 1 / data.rates.EUR,
                GBP: 1 / data.rates.GBP
            };
        } catch (error) {
            console.log('Using fallback exchange rates');
        }
    }
};

// ==========================================
// 2. LIVE WEATHER WIDGET
// ==========================================
const WeatherWidget = {
    apiKey: 'demo', // Replace with your OpenWeatherMap API key
    destinations: {
        'punjab': { city: 'Amritsar', lat: 31.6340, lon: 74.8723 },
        'tamil-nadu': { city: 'Chennai', lat: 13.0827, lon: 80.2707 },
        'default': { city: 'New Delhi', lat: 28.6139, lon: 77.2090 }
    },

    init() {
        this.detectDestination();
        this.createWidget();
        this.fetchWeather();
    },

    detectDestination() {
        const path = window.location.pathname.toLowerCase();
        for (let key in this.destinations) {
            if (path.includes(key)) {
                this.currentDest = this.destinations[key];
                return;
            }
        }
        this.currentDest = this.destinations.default;
    },

    createWidget() {
        const widgetHTML = `
            <div class="weather-widget" id="weatherWidget">
                <div class="weather-loading">
                    <i class="fas fa-spinner fa-spin"></i> Loading weather...
                </div>
            </div>
        `;
        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            searchSection.insertAdjacentHTML('afterend', widgetHTML);
        }
    },

    async fetchWeather() {
        try {
            // Using a demo endpoint - replace with actual API call
            const mockWeather = {
                temp: Math.round(20 + Math.random() * 15),
                condition: ['Clear', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
                humidity: Math.round(40 + Math.random() * 40)
            };

            this.displayWeather(mockWeather);
        } catch (error) {
            document.getElementById('weatherWidget').style.display = 'none';
        }
    },

    displayWeather(data) {
        const widget = document.getElementById('weatherWidget');
        const icon = data.condition === 'Clear' ? 'sun' : data.condition === 'Rainy' ? 'cloud-rain' : 'cloud';

        widget.innerHTML = `
            <div class="weather-content">
                <div class="weather-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${this.currentDest.city}
                </div>
                <div class="weather-info">
                    <div class="weather-temp">
                        <i class="fas fa-${icon}"></i>
                        <span>${data.temp}°C</span>
                    </div>
                    <div class="weather-condition">${data.condition}</div>
                    <div class="weather-humidity">
                        <i class="fas fa-tint"></i> ${data.humidity}% Humidity
                    </div>
                </div>
            </div>
        `;
    }
};

// ==========================================
// 3. COUNTDOWN TIMER FOR OFFERS
// ==========================================
const CountdownTimer = {
    init() {
        this.createTimer();
        this.startCountdown();
    },

    createTimer() {
        const timerHTML = `
            <div class="offer-countdown" id="offerCountdown">
                <div class="countdown-content">
                    <div class="countdown-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <div class="countdown-text">
                        <strong>Limited Time Offer!</strong>
                        <p>Book now and save 10%</p>
                    </div>
                    <div class="countdown-timer">
                        <div class="time-unit">
                            <span id="hours">00</span>
                            <small>Hours</small>
                        </div>
                        <span class="time-separator">:</span>
                        <div class="time-unit">
                            <span id="minutes">00</span>
                            <small>Minutes</small>
                        </div>
                        <span class="time-separator">:</span>
                        <div class="time-unit">
                            <span id="seconds">00</span>
                            <small>Seconds</small>
                        </div>
                    </div>
                    <button class="countdown-close" onclick="this.closest('.offer-countdown').style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', timerHTML);
    },

    startCountdown() {
        // Set countdown to 2 hours from now
        const endTime = new Date().getTime() + (2 * 60 * 60 * 1000);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                // Reset to 2 hours when expired
                location.reload();
                return;
            }

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000);

        // Show countdown after 3 seconds
        setTimeout(() => {
            document.getElementById('offerCountdown').classList.add('show');
        }, 3000);
    }
};

// ==========================================
// 4. EXIT-INTENT POPUP
// ==========================================
const ExitIntentPopup = {
    shown: false,

    init() {
        this.createPopup();
        this.attachEvents();
    },

    createPopup() {
        const popupHTML = `
            <div class="exit-popup" id="exitPopup">
                <div class="exit-popup-overlay"></div>
                <div class="exit-popup-content">
                    <button class="exit-popup-close" onclick="ExitIntentPopup.close()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="exit-popup-body">
                        <div class="exit-popup-icon">
                            <i class="fas fa-gift"></i>
                        </div>
                        <h2>Wait! Don't Miss Out!</h2>
                        <p class="exit-popup-subtitle">Get an exclusive <strong>15% discount</strong> on your first booking</p>
                        <div class="exit-popup-features">
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Free Visa Assistance</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>24/7 Customer Support</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Flexible Payment Options</span>
                            </div>
                        </div>
                        <div class="exit-popup-coupon">
                            <div class="coupon-code">
                                <span>Use Code:</span>
                                <strong id="couponCode">SAVE15NOW</strong>
                            </div>
                            <button class="copy-coupon" onclick="ExitIntentPopup.copyCoupon()">
                                <i class="fas fa-copy"></i> Copy Code
                            </button>
                        </div>
                        <div class="exit-popup-cta">
                            <a href="tel:+918585858400" class="btn-call">
                                <i class="fas fa-phone"></i> Call Now
                            </a>
                            <a href="https://wa.me/918585858400?text=I want to use the SAVE15NOW coupon" class="btn-whatsapp" target="_blank">
                                <i class="fab fa-whatsapp"></i> WhatsApp Us
                            </a>
                        </div>
                        <p class="exit-popup-footer">
                            <i class="fas fa-clock"></i> Offer valid for 24 hours only!
                        </p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    },

    attachEvents() {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !this.shown) {
                this.show();
            }
        });

        // Also show on mobile when user scrolls back to top quickly
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop < lastScrollTop - 100 && scrollTop < 200 && !this.shown) {
                this.show();
            }
            lastScrollTop = scrollTop;
        });
    },

    show() {
        if (!this.shown) {
            document.getElementById('exitPopup').classList.add('show');
            this.shown = true;

            // Save to localStorage to not show again for 24 hours
            localStorage.setItem('exitPopupShown', new Date().getTime());
        }
    },

    close() {
        document.getElementById('exitPopup').classList.remove('show');
    },

    copyCoupon() {
        const code = document.getElementById('couponCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.querySelector('.copy-coupon');
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = '#28a745';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
                btn.style.background = '';
            }, 2000);
        });
    }
};

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if exit popup was shown in last 24 hours
    const lastShown = localStorage.getItem('exitPopupShown');
    const shouldShowExitPopup = !lastShown || (new Date().getTime() - lastShown > 24 * 60 * 60 * 1000);

    CurrencyConverter.init();
    WeatherWidget.init();
    CountdownTimer.init();

    if (shouldShowExitPopup) {
        ExitIntentPopup.init();
    }
});
