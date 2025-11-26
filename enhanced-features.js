// ========================================
// ENHANCED FEATURES V2 - CLEAN & MINIMAL
// Seven Destination
// ========================================

// ==========================================
// 1. FLOATING TOGGLE BUTTON (Controls all)
// ==========================================
const FloatingControls = {
    weatherEnabled: false,
    currencyEnabled: false,

    init() {
        this.createButton();
        this.attachEvents();
    },

    createButton() {
        const html = `
            <div class="float-controls">
                <button class="control-toggle" id="controlToggle">
                    <i class="fas fa-cog"></i>
                </button>
                <div class="control-menu" id="controlMenu">
                    <div class="control-item">
                        <label>
                            <input type="checkbox" id="toggleWeather">
                            <span>🌤️ Weather</span>
                        </label>
                    </div>
                    <div class="control-item">
                        <label>
                            <input type="checkbox" id="toggleCurrency">
                            <span>💱 Currency</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    attachEvents() {
        const toggle = document.getElementById('controlToggle');
        const menu = document.getElementById('controlMenu');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });

        document.getElementById('toggleWeather').addEventListener('change', (e) => {
            this.weatherEnabled = e.target.checked;
            if (this.weatherEnabled) {
                WeatherWidget.show();
            } else {
                WeatherWidget.hide();
            }
        });

        document.getElementById('toggleCurrency').addEventListener('change', (e) => {
            this.currencyEnabled = e.target.checked;
            CurrencyConverter.toggle(this.currencyEnabled);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.float-controls')) {
                menu.classList.remove('show');
            }
        });
    }
};

// ==========================================
// 2. CURRENCY CONVERTER
// ==========================================
const CurrencyConverter = {
    rates: { USD: 83.12, EUR: 90.45, GBP: 105.23 },
    currentCurrency: 'INR',
    active: false,

    init() {
        this.fetchLiveRates();
        this.createSelector();
    },

    createSelector() {
        const html = `
            <div class="currency-selector" id="currencySelector" style="display:none;">
                <select id="currencySelect">
                    <option value="INR">₹ INR</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                    <option value="GBP">£ GBP</option>
                </select>
            </div>
        `;

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.insertAdjacentHTML('afterend', html);
        }

        document.getElementById('currencySelect').addEventListener('change', (e) => {
            this.currentCurrency = e.target.value;
            this.convertAllPrices();
        });
    },

    toggle(enabled) {
        this.active = enabled;
        const selector = document.getElementById('currencySelector');
        selector.style.display = enabled ? 'block' : 'none';

        if (!enabled) {
            this.currentCurrency = 'INR';
            this.convertAllPrices();
        }
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

            const perPerson = priceEl.querySelector('.text-muted');
            const perPersonText = perPerson ? perPerson.outerHTML : '';
            priceEl.innerHTML = `${symbol}${convertedPrice.toLocaleString()} ${perPersonText}`;
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
// 3. WEATHER WIDGET (Minimal Card)
// ==========================================
const WeatherWidget = {
    destinations: {
        'punjab': { city: 'Amritsar', emoji: '☀️' },
        'tamil-nadu': { city: 'Chennai', emoji: '🌤️' },
        'kerala': { city: 'Kochi', emoji: '🌧️' },
        'rajasthan': { city: 'Jaipur', emoji: '☀️' },
        'himachal': { city: 'Shimla', emoji: '❄️' },
        'uttarakhand': { city: 'Dehradun', emoji: '⛰️' },
        'goa': { city: 'Goa', emoji: '🏖️' },
        'default': { city: 'Delhi', emoji: '🌤️' }
    },

    init() {
        this.detectDestination();
        this.createCard();
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

    createCard() {
        const temp = Math.round(18 + Math.random() * 18); // 18-36°C

        const html = `
            <div class="weather-card" id="weatherCard" style="display:none;">
                <span class="weather-emoji">${this.currentDest.emoji}</span>
                <div class="weather-info">
                    <div class="weather-city">${this.currentDest.city}</div>
                    <div class="weather-temp">${temp}°C</div>
                </div>
            </div>
        `;

        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            searchSection.insertAdjacentHTML('afterend', html);
        }
    },

    show() {
        const card = document.getElementById('weatherCard');
        if (card) {
            card.style.display = 'flex';
        }
    },

    hide() {
        const card = document.getElementById('weatherCard');
        if (card) {
            card.style.display = 'none';
        }
    }
};

// ==========================================
// 4. EXIT-INTENT POPUP (Simple)
// ==========================================
const ExitPopup = {
    shown: false,

    init() {
        this.createPopup();
        this.attachEvents();
    },

    createPopup() {
        const html = `
            <div class="exit-popup" id="exitPopup">
                <div class="exit-overlay" onclick="ExitPopup.close()"></div>
                <div class="exit-content">
                    <button class="exit-close" onclick="ExitPopup.close()">×</button>
                    <h3>🎁 Special Offer!</h3>
                    <p>Get <strong>15% OFF</strong> on your first booking</p>
                    <div class="exit-code">
                        <span>Code: <strong>SAVE15NOW</strong></span>
                        <button onclick="ExitPopup.copyCoupon()">Copy</button>
                    </div>
                    <div class="exit-actions">
                        <a href="tel:+918585858400" class="exit-btn">📞 Call Now</a>
                        <a href="https://wa.me/918585858400?text=I want to use SAVE15NOW" target="_blank" class="exit-btn exit-btn-wa">💬 WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    attachEvents() {
        let lastScrollTop = 0;

        // Desktop: Mouse leave
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !this.shown) {
                this.show();
            }
        });

        // Mobile: Scroll up fast
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop < lastScrollTop - 150 && scrollTop < 300 && !this.shown) {
                this.show();
            }
            lastScrollTop = scrollTop;
        });
    },

    show() {
        const lastShown = localStorage.getItem('exitPopupShown');
        const shouldShow = !lastShown || (new Date().getTime() - lastShown > 24 * 60 * 60 * 1000);

        if (shouldShow && !this.shown) {
            document.getElementById('exitPopup').classList.add('show');
            this.shown = true;
            localStorage.setItem('exitPopupShown', new Date().getTime());
        }
    },

    close() {
        document.getElementById('exitPopup').classList.remove('show');
    },

    copyCoupon() {
        navigator.clipboard.writeText('SAVE15NOW').then(() => {
            alert('✓ Coupon code copied!');
        });
    }
};

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    FloatingControls.init();
    CurrencyConverter.init();
    WeatherWidget.init();
    ExitPopup.init();
});
