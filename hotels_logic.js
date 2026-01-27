document.addEventListener('DOMContentLoaded', function () {
    console.log("Hotel Logic Loaded");

    // Check if data exists
    if (typeof hotelsData === 'undefined') {
        console.error("hotelsData not found! Make sure hotels_data.js is loaded.");
        return;
    }

    const hotelContainer = document.getElementById('hotel-container');
    const propertyCountElement = document.getElementById('property-count');

    // Filter Elements
    const searchDestination = document.getElementById('searchDestination');
    const searchDates = document.getElementById('searchDates');
    const searchGuests = document.getElementById('searchGuests');
    const searchBtn = document.getElementById('searchBtn');

    const priceRange = document.getElementById('priceRange');
    const sortSelect = document.getElementById('sortSelect');

    // Debounce Utility
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Initial Render
    renderHotels(hotelsData);

    // Event Listeners with Debounce for Text Inputs
    if (searchDestination) searchDestination.addEventListener('input', debounce(filterHotels, 300));
    if (priceRange) priceRange.addEventListener('input', debounce(filterHotels, 100)); // Faster response for slider
    if (sortSelect) sortSelect.addEventListener('change', filterHotels);

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            // Trigger filter immediately on button click
            filterHotels();
            // Optional: Scroll to results
            hotelContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Checkboxes don't need debounce usually, but good to be consistent or just direct
    const amenitiesCheckboxes = document.querySelectorAll('input[name="amenities"]');
    const typeCheckboxes = document.querySelectorAll('input[name="propertyType"]');
    const starCheckboxes = document.querySelectorAll('input[name="rating"]');

    amenitiesCheckboxes.forEach(cb => cb.addEventListener('change', filterHotels));
    typeCheckboxes.forEach(cb => cb.addEventListener('change', filterHotels));
    starCheckboxes.forEach(cb => cb.addEventListener('change', filterHotels));

    function renderHotels(hotels) {
        hotelContainer.innerHTML = '';

        if (hotels.length === 0) {
            hotelContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No hotels found matching your criteria.</h4>
                    <p class="text-muted">Try changing your filters or search terms.</p>
                    <button class="btn btn-custom mt-3" onclick="resetFilters()">Reset Filters</button>
                </div>`;
            if (propertyCountElement) propertyCountElement.innerText = `0 properties found`;
            return;
        }

        if (propertyCountElement) propertyCountElement.innerText = `Showing ${hotels.length} properties`;

        // Use DocumentFragment for performance
        const fragment = document.createDocumentFragment();

        hotels.forEach(hotel => {
            const card = document.createElement('div');
            card.className = 'hotel-card fade-in';

            // Generate Stars HTML
            let starsHtml = '';
            for (let i = 0; i < hotel.stars; i++) {
                starsHtml += '<i class="fas fa-star small"></i>';
            }

            // Generate Amenities HTML (First 4)
            let amenitiesHtml = '';
            // Safe check for amenities array
            const amenitiesList = hotel.amenities || [];
            amenitiesList.slice(0, 4).forEach(am => {
                let icon = 'check'; // Default icon
                const amLower = am.toLowerCase();
                if (amLower.includes('wifi')) icon = 'wifi';
                else if (amLower.includes('pool')) icon = 'swimmer';
                else if (amLower.includes('food') || amLower.includes('restaurant') || amLower.includes('breakfast')) icon = 'utensils';
                else if (amLower.includes('spa')) icon = 'spa';
                else if (amLower.includes('parking') || amLower.includes('car')) icon = 'car';
                else if (amLower.includes('gym')) icon = 'dumbbell';
                else if (amLower.includes('bar')) icon = 'glass-martini';
                else if (amLower.includes('ac') || amLower.includes('air')) icon = 'snowflake';

                amenitiesHtml += `<span class="amenity-item"><i class="fas fa-${icon}"></i> ${am}</span>`;
            });

            // Generate Badges HTML
            let badgesHtml = '';
            if (hotel.badges) {
                hotel.badges.forEach(badge => {
                    badgesHtml += `<div class="position-absolute top-0 start-0 m-3 badge bg-danger">${badge}</div>`;
                });
            }

            // Rating Color
            let ratingColor = '#00aa6c';
            if (hotel.rating < 4.0) ratingColor = '#ffb74d';
            if (hotel.rating < 3.0) ratingColor = '#ff5252';

            // Features (Cancellation/Breakfast)
            let featuresHtml = '';
            if (hotel.freeCancellation) featuresHtml += '<div class="text-success small"><i class="fas fa-check"></i> Free Cancellation</div>';
            else if (hotel.breakfastIncluded) featuresHtml += '<div class="text-success small"><i class="fas fa-check"></i> Breakfast Included</div>';


            card.innerHTML = `
                <div class="hotel-img-wrapper">
                    <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
                    ${badgesHtml}
                </div>
                <div class="hotel-content">
                    <div>
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h4>${hotel.name}</h4>
                                <div class="hotel-location"><i class="fas fa-map-marker-alt text-primary me-1"></i> ${hotel.location}</div>
                            </div>
                            <div class="rating-badge" style="background: ${ratingColor};">
                                ${hotel.rating} <i class="fas fa-star small"></i>
                            </div>
                        </div>
                        <div class="hotel-amenities">
                            ${amenitiesHtml}
                        </div>
                        <p class="text-muted small mb-0">${hotel.description}</p>
                    </div>
                    <div class="hotel-price-section">
                        ${featuresHtml}
                        <div class="text-end">
                            <div class="price-tag">₹${hotel.price.toLocaleString('en-IN')} <span>/ night</span></div>
                            <button class="btn btn-sm btn-custom rounded-pill px-4 mt-2" onclick="viewDetails(${hotel.id})">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });

        hotelContainer.appendChild(fragment);
    }

    function filterHotels() {
        let filtered = hotelsData;

        // 1. Destination Filter (Smart Search)
        const destTerm = searchDestination ? searchDestination.value.toLowerCase().trim() : '';

        // Define Location Groups for "Smart Search"
        const locationGroups = {
            'kolkata': ['kolkata', 'howrah', 'salt lake', 'new town', 'dum dum', 'park street', 'chowringhee', 'ballygunge'],
            'digha': ['digha', 'mandarmani', 'tajpur', 'shankarpur'],
            'darjeeling': ['darjeeling', 'kalimpong', 'kurseong'],
            'sundarban': ['sundarban', 'canming', 'gosaba'],
            'shaktipith': ['tarapith', 'kalighat', 'dakshineswar', 'kamakhya', 'bakreswar'] // Added generic term
        };

        if (destTerm) {
            filtered = filtered.filter(h => {
                const hotelLoc = h.location ? h.location.toLowerCase() : '';
                const hotelName = h.name ? h.name.toLowerCase() : '';

                // Check direct match first
                if (hotelLoc.includes(destTerm) || hotelName.includes(destTerm)) return true;

                // Check group match
                // If user typed "Kolkata", show "Howrah" hotels too
                for (const [groupKey, subLocations] of Object.entries(locationGroups)) {
                    if (groupKey.includes(destTerm) || destTerm.includes(groupKey)) {
                        // User term matches a group key (e.g. "Kolkata")
                        // Return true if hotel location is anywhere in this group
                        if (subLocations.some(sub => hotelLoc.includes(sub))) return true;
                    }

                    // Inverse: If user types "Howrah", and we want to show broader group? 
                    // Usually we don't, unless requested. User request: "like howrah show near city show for more result"
                    // So if user types "Howrah", we might want to show "Kolkata"?
                    // Let's implements: If input matches any sub-location in a group, show ALL hotels in that group.
                    if (subLocations.some(sub => destTerm.includes(sub))) {
                        if (subLocations.some(sub => hotelLoc.includes(sub))) return true;
                    }
                }
                return false;
            });
        }

        // 2. Guest Filter (Mock: Assuming hotels can accommodate guests if specified)
        // Since data doesn't have capacity, we won't filter strictly to avoid empty results,
        // unless we want to simulate it. For now, let's assume all hotels take up to 4 guests.
        // If users puts > 4, maybe warn or filter? 
        // Let's just log it for now to show it's "working" in logic, or filter if we had data.
        // For accurate robust behavior without data, we ignore it for filtering but keep the value for booking.

        // 3. Price Filter
        const maxPrice = priceRange ? parseInt(priceRange.value) : 50000;
        // Update price label if exists
        // (UI update is handled by simple native range usually? No, we might want to update a label)
        // If we want to verify accuracy, we check <=
        filtered = filtered.filter(h => h.price <= maxPrice);

        // 4. Star Rating Filter (OR Logic)
        const selectedStars = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseInt(cb.value));
        if (selectedStars.length > 0) {
            filtered = filtered.filter(h => selectedStars.includes(h.stars));
        }

        // 5. Amenities Filter (AND Logic - Hotel must have ALL selected)
        const selectedAmenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value.toLowerCase());
        if (selectedAmenities.length > 0) {
            filtered = filtered.filter(h => {
                if (!h.amenities) return false;
                const hotelAmenities = h.amenities.map(a => a.toLowerCase());
                return selectedAmenities.every(sa => {
                    // Fuzzy match for amenities to handle "Free Wifi" matching "Wifi"
                    return hotelAmenities.some(ha => ha.includes(sa));
                });
            });
        }

        // 6. Property Type Filter (OR Logic)
        const selectedTypes = Array.from(document.querySelectorAll('input[name="propertyType"]:checked')).map(cb => cb.value.toLowerCase());
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(h => selectedTypes.includes(h.type.toLowerCase()));
        }

        // 7. Sorting
        const sortValue = sortSelect ? sortSelect.value : 'recommended';

        if (sortValue === 'price_asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price_desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }
        // Recommended logic: maybe combination of rating and price? 
        // For now, default order or standard sort
        if (sortValue === 'recommended') {
            // Let's say Recommended is Rating desc, then Price asc
            filtered.sort((a, b) => b.rating - a.rating || a.price - b.price);
        }

        renderHotels(filtered);
    }

    window.resetFilters = function () {
        if (searchDestination) searchDestination.value = '';
        if (searchGuests) searchGuests.value = '';
        if (searchDates) searchDates.value = '';
        if (priceRange) priceRange.value = 50000;

        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        if (sortSelect) sortSelect.value = 'Recommended';

        filterHotels();
    }

    // Placeholder function for details
    // --- Modal Logic ---
    let currentHotelDetails = {};

    window.viewDetails = function (id) {
        const hotel = hotelsData.find(h => h.id === id);
        if (!hotel) return;

        // 1. Simulate Missing Data (Room Types, Images)
        // Base Price is for "Simple" room. Deluxe = +20%, Luxury = +50%
        const basePrice = hotel.price;
        const roomTypes = [
            { type: 'Simple', price: basePrice, desc: 'Cozy standard room with essential amenities.' },
            { type: 'Deluxe', price: Math.round(basePrice * 1.2), desc: 'Spacious room with better view and mini-bar.' },
            { type: 'Luxury', price: Math.round(basePrice * 1.5), desc: 'Premium suite with jacuzzi and private balcony.' }
        ];

        // Mock Multiple Images based on the main image
        const images = [
            hotel.image,
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        ];

        // Store for calculation
        currentHotelDetails = {
            name: hotel.name,
            roomTypes: roomTypes,
            selectedRoomPrice: basePrice,
            selectedMealCost: 0,
            selectedAddonsCost: 0
        };

        // 2. Populate Modal
        document.getElementById('modalHotelName').textContent = hotel.name;
        document.getElementById('modalLocation').textContent = hotel.location;
        document.getElementById('modalRating').innerHTML = `${hotel.rating} <i class="fas fa-star small"></i>`;
        document.getElementById('modalDescription').textContent = hotel.description + " Experience world-class service and luxury.";

        // Render Images
        const carouselInner = document.getElementById('modalCarouselInner');
        carouselInner.innerHTML = images.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" style="height: 300px; object-fit: cover;" alt="Hotel Image">
            </div>
        `).join('');

        // Render Amenities
        const amenitiesContainer = document.getElementById('modalAmenities');
        amenitiesContainer.innerHTML = (hotel.amenities || ['Wifi', 'Parking', 'Restaurant']).map(am =>
            `<span class="badge bg-light text-dark border"><i class="fas fa-check text-success me-1"></i> ${am}</span>`
        ).join('');

        // Render Room Type Options
        const roomTypeContainer = document.getElementById('modalRoomTypes');
        roomTypeContainer.innerHTML = roomTypes.map((room, index) => `
            <div class="form-check p-3 border rounded ${index === 0 ? 'bg-light border-primary' : ''}" style="cursor:pointer" onclick="selectRoomType(this, ${room.price}, '${room.type}')">
                <input class="form-check-input" type="radio" name="roomType" id="room${index}" value="${room.type}" ${index === 0 ? 'checked' : ''}>
                <label class="form-check-label w-100" for="room${index}" style="cursor:pointer">
                    <div class="d-flex justify-content-between">
                        <strong>${room.type}</strong>
                        <span class="text-primary fw-bold">₹${room.price.toLocaleString()}</span>
                    </div>
                    <small class="text-muted d-block mt-1">${room.desc}</small>
                </label>
            </div>
        `).join('');

        // Reset Form Defaults
        document.getElementById('modalMealPlan').value = 'ep';
        document.querySelectorAll('.addon-check').forEach(cb => cb.checked = false);

        // Initial Calc
        updateTotalCost();

        // Attach Listeners for Dynamic Calculation
        attachModalListeners();

        // Show Modal
        const modal = new bootstrap.Modal(document.getElementById('hotelDetailsModal'));
        modal.show();
    }

    window.viewDetails = function (id) {
        const hotel = hotelsData.find(h => h.id === id);
        if (!hotel) return;

        // 1. Simulate Missing Data (Room Types, Images)
        const basePrice = hotel.price;
        const roomTypes = [
            { type: 'Simple', price: basePrice, desc: 'Cozy standard room with essential amenities.' },
            { type: 'Deluxe', price: Math.round(basePrice * 1.2), desc: 'Spacious room with better view and mini-bar.' },
            { type: 'Luxury', price: Math.round(basePrice * 1.5), desc: 'Premium suite with jacuzzi and private balcony.' }
        ];

        const images = [
            hotel.image,
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        ];

        // Store for calculation
        currentHotelDetails = {
            name: hotel.name,
            roomTypes: roomTypes,
            selectedRoomPrice: basePrice,
            selectedMealCost: 0,
            selectedAddonsCost: 0,
            discountPercent: 0,
            nights: 1
        };

        // 2. Populate Modal
        document.getElementById('modalHotelName').textContent = hotel.name;
        document.getElementById('modalLocation').textContent = hotel.location;
        document.getElementById('modalRating').innerHTML = `${hotel.rating} <i class="fas fa-star small"></i>`;
        document.getElementById('modalDescription').textContent = hotel.description + " Experience world-class service and luxury.";

        // Render Images
        const carouselInner = document.getElementById('modalCarouselInner');
        carouselInner.innerHTML = images.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" style="height: 220px; object-fit: cover;" alt="Hotel Image">
            </div>
        `).join('');

        // Render Amenities
        const amenitiesContainer = document.getElementById('modalAmenities');
        amenitiesContainer.innerHTML = (hotel.amenities || ['Wifi', 'Parking', 'Restaurant']).map(am =>
            `<span class="badge bg-light text-dark border"><i class="fas fa-check text-success me-1"></i> ${am}</span>`
        ).join('');

        // Render Room Type Options
        const roomTypeContainer = document.getElementById('modalRoomTypes');
        roomTypeContainer.innerHTML = roomTypes.map((room, index) => `
            <div class="form-check p-3 border rounded ${index === 0 ? 'bg-light border-primary' : ''}" style="cursor:pointer" onclick="selectRoomType(this, ${room.price}, '${room.type}')">
                <input class="form-check-input" type="radio" name="roomType" id="room${index}" value="${room.type}" ${index === 0 ? 'checked' : ''}>
                <label class="form-check-label w-100" for="room${index}" style="cursor:pointer">
                    <div class="d-flex justify-content-between">
                        <strong>${room.type}</strong>
                        <span class="text-primary fw-bold">₹${room.price.toLocaleString()}</span>
                    </div>
                    <small class="text-muted d-block mt-1">${room.desc}</small>
                </label>
            </div>
        `).join('');

        // Reset Defaults
        document.getElementById('modalMealPlan').value = 'ep';
        document.querySelectorAll('.addon-check').forEach(cb => cb.checked = false);
        document.getElementById('modalDiscountCode').value = '';
        document.getElementById('discountMessage').classList.add('d-none');
        document.getElementById('modalAdults').value = 2;
        document.getElementById('modalChildren').value = 0;

        // Set Dates (Today + Tomorrow)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('modalCheckIn').valueAsDate = today;
        document.getElementById('modalCheckOut').valueAsDate = tomorrow;

        // Initial Calc
        updateTotalCost();

        // Attach Listeners
        attachModalListeners();

        // Show Modal
        const modal = new bootstrap.Modal(document.getElementById('hotelDetailsModal'));
        modal.show();
    }

    window.selectRoomType = function (element, price, type) {
        document.querySelectorAll('#modalRoomTypes .form-check').forEach(el => {
            el.classList.remove('bg-light', 'border-primary');
            el.querySelector('input').checked = false;
        });
        element.classList.add('bg-light', 'border-primary');
        element.querySelector('input').checked = true;

        currentHotelDetails.selectedRoomPrice = price;
        currentHotelDetails.selectedRoomType = type;
        updateTotalCost();
    }

    function attachModalListeners() {
        const mealSelect = document.getElementById('modalMealPlan');
        mealSelect.onchange = function () {
            currentHotelDetails.selectedMealCost = parseInt(this.options[this.selectedIndex].getAttribute('data-cost'));
            updateTotalCost();
        };

        document.querySelectorAll('.addon-check').forEach(check => {
            check.onchange = function () {
                let totalAddons = 0;
                document.querySelectorAll('.addon-check:checked').forEach(c => totalAddons += parseInt(c.getAttribute('data-cost')));
                currentHotelDetails.selectedAddonsCost = totalAddons;
                updateTotalCost();
            };
        });

        // Discount Logic
        document.getElementById('applyDiscountBtn').onclick = function () {
            const code = document.getElementById('modalDiscountCode').value.toUpperCase().trim();
            const msg = document.getElementById('discountMessage');
            if (code === 'SAVE10') {
                currentHotelDetails.discountPercent = 10;
                msg.textContent = '10% Discount Applied!';
                msg.classList.remove('d-none', 'text-danger');
                msg.classList.add('text-success');
            } else if (code === 'WELCOME5') {
                currentHotelDetails.discountPercent = 5;
                msg.textContent = '5% Welcome Discount Applied!';
                msg.classList.remove('d-none', 'text-danger');
                msg.classList.add('text-success');
            } else {
                currentHotelDetails.discountPercent = 0;
                msg.textContent = 'Invalid Code';
                msg.classList.remove('d-none', 'text-success');
                msg.classList.add('text-danger');
            }
            updateTotalCost();
        };

        // Date Change Logic
        const checkIn = document.getElementById('modalCheckIn');
        const checkOut = document.getElementById('modalCheckOut');

        function updateNights() {
            const d1 = new Date(checkIn.value);
            const d2 = new Date(checkOut.value);
            if (d1 && d2 && d2 > d1) {
                const diffTime = Math.abs(d2 - d1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                currentHotelDetails.nights = diffDays;
            } else {
                currentHotelDetails.nights = 1; // Default fallback
            }
            updateTotalCost();
        }
        checkIn.onchange = updateNights;
        checkOut.onchange = updateNights;

        // Guest input change
        document.getElementById('modalAdults').onchange = updateTotalCost;
        document.getElementById('modalChildren').onchange = updateTotalCost;
    }

    function updateTotalCost() {
        // Base Cost per night involves Room + Meal + Addons? 
        // Usually Addons like "Pickup" are one-time. 
        // Let's assume Addons are One-Time, Room/Meal are Per-Night for simplicity, or all Per-Night.
        // Clarification: "Airport Pickup" is usually one-time. "Sightseeing" is usually one-time.
        // But "Meal Plan" is per night.
        // Logic: (Room + Meal) * Nights + Addons

        const nightlyRate = currentHotelDetails.selectedRoomPrice + currentHotelDetails.selectedMealCost;
        const totalStayCost = (nightlyRate * currentHotelDetails.nights) + currentHotelDetails.selectedAddonsCost;

        // Apply Discount
        const discountAmount = (totalStayCost * currentHotelDetails.discountPercent) / 100;
        const finalTotal = totalStayCost - discountAmount;

        const detailText = document.getElementById('modalTotalDetail');
        const nights = currentHotelDetails.nights;
        const adults = document.getElementById('modalAdults').value;
        const kids = document.getElementById('modalChildren').value;

        if (detailText) {
            detailText.innerHTML = `*${nights} Night(s), ${adults} Adults, ${kids} Kids${currentHotelDetails.discountPercent > 0 ? `<br><span class="text-success">(-₹${discountAmount.toLocaleString()})</span>` : ''}`;
        }

        document.getElementById('modalTotalCost').textContent = `₹${finalTotal.toLocaleString()}`;

        // WhatsApp Link
        const roomType = document.querySelector('input[name="roomType"]:checked')?.value || 'Simple';
        const mealPlan = document.getElementById('modalMealPlan').options[document.getElementById('modalMealPlan').selectedIndex].text;

        const addons = [];
        document.querySelectorAll('.addon-check:checked').forEach(c => addons.push(c.nextElementSibling.innerText.split('(')[0].trim()));
        const addonStr = addons.length > 0 ? addons.join(', ') : 'None';
        const checkInDate = document.getElementById('modalCheckIn').value;

        const message = `*Hello Seven Destination!* %0A%0A I am interested in booking: %0A 🏨 *${currentHotelDetails.name}* %0A 📅 Check-in: ${checkInDate} (${nights} Nights) %0A 👥 Guests: ${adults} Adults, ${kids} Kids %0A 🛏 Room: ${roomType} %0A 🍽 Meal: ${mealPlan} %0A ➕ Add-ons: ${addonStr} %0A%0A 💰 *Total Est: ₹${finalTotal.toLocaleString()}* ${currentHotelDetails.discountPercent > 0 ? `(Inc. ${currentHotelDetails.discountPercent}% Off)` : ''} %0A%0A Please confirm availability.`;

        document.getElementById('modalWhatsAppBtn').href = `https://wa.me/918585858400?text=${message}`;
    }
    // Mobile Floating Action Logic
    const floatFilterBtn = document.getElementById('floatFilterBtn');
    const floatSortBtn = document.getElementById('floatSortBtn');

    const sidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('filterOverlay');
    const closeBtn = document.getElementById('filterCloseBtn');

    const sortModal = document.getElementById('sortModal');
    const closeSortModal = document.getElementById('closeSortModal');
    const sortOptions = document.querySelectorAll('.sort-option');

    // Filter Sidebar Logic
    if (floatFilterBtn && sidebar) {
        floatFilterBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Reuse close logic if not already handled by previous script (it might be duplicated but safe)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Sort Modal Logic
    if (floatSortBtn && sortModal) {
        floatSortBtn.addEventListener('click', () => {
            sortModal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeSortModal.addEventListener('click', () => {
            sortModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Sort Selection Logic
    if (sortOptions.length > 0) {
        sortOptions.forEach(option => {
            option.addEventListener('click', function () {
                // UI Update
                sortOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                // Logic Update
                const sortValue = this.getAttribute('data-value');
                // Use the sortSelect reference defined at the top of this scope
                if (sortSelect) {
                    sortSelect.value = sortValue;
                    // Trigger change event manually (optional if we call filterHotels directly)
                    // const event = new Event('change');
                    // sortSelect.dispatchEvent(event);

                    // Call filter directly since we are in the same scope now
                    filterHotels();
                }

                // Close Modal
                sortModal.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Overlay Click Closes All
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            if (sortModal) sortModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Auto-hide floating buttons when Hotel Details Modal is open
    const hotelDetailsModalEl = document.getElementById('hotelDetailsModal');
    const mobileActions = document.querySelector('.mobile-bottom-actions');

    if (hotelDetailsModalEl && mobileActions) {
        hotelDetailsModalEl.addEventListener('show.bs.modal', function () {
            mobileActions.classList.add('d-none');
        });

        hotelDetailsModalEl.addEventListener('hidden.bs.modal', function () {
            mobileActions.classList.remove('d-none');
        });
    }
});

