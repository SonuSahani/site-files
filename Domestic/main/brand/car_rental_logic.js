document.addEventListener('DOMContentLoaded', function () {
    console.log("Car Rental Logic v3 Loaded");

    if (typeof carRentalData === 'undefined') {
        console.error("carRentalData not found!");
        return;
    }

    const carContainer = document.getElementById('car-container');
    const resultCount = document.getElementById('resultCount');
    const searchInput = document.getElementById('searchCar');
    const searchBtn = document.getElementById('searchBtn');
    const sortSelect = document.getElementById('sortSelect');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // Type Checkboxes
    const typeChecks = document.querySelectorAll('input[id^="type"][type="checkbox"]');
    // Seat Checkboxes
    const seatChecks = document.querySelectorAll('input[id^="seats"][type="checkbox"]');
    // AC Checkbox
    const acOnlyCheck = document.getElementById('acOnlyCheck');

    // Mobile elements
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const mobileSortBtn = document.getElementById('mobileSortBtn');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterDrawer = document.getElementById('filterDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const applyMobileFilters = document.getElementById('applyMobileFilters');
    const mobileFiltersContainer = document.getElementById('mobileFiltersContainer');

    // Initial Render
    renderCars(carRentalData);

    // Event Listeners
    if (searchBtn) searchBtn.addEventListener('click', filterCars);
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') filterCars();
        });
    }
    if (sortSelect) sortSelect.addEventListener('change', filterCars);
    typeChecks.forEach(c => c.addEventListener('change', filterCars));
    seatChecks.forEach(c => c.addEventListener('change', filterCars));
    if (acOnlyCheck) acOnlyCheck.addEventListener('change', filterCars);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearAllFilters);

    // Trending Tags
    const trendingTags = document.querySelectorAll('.trending-tag');
    trendingTags.forEach(tag => {
        tag.addEventListener('click', () => {
            trendingTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            if (searchInput) searchInput.value = tag.dataset.term;
            filterCars();
        });
    });

    // Leaflet Map Init
    if (document.getElementById('map') && typeof L !== 'undefined') {
        const map = L.map('map').setView([22.6531, 88.3444], 15); // Bally, Howrah coords

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([22.6531, 88.3444]).addTo(map)
            .bindPopup('<b>Seven Destination Tour & Travels</b><br>Bally, Howrah')
            .openPopup();
    }

    // Mobile Drawer
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => openDrawer('filter'));
        mobileSortBtn.addEventListener('click', () => openDrawer('sort'));
        filterOverlay.addEventListener('click', closeDrawer);
        closeDrawerBtn.addEventListener('click', closeDrawer);
        applyMobileFilters.addEventListener('click', () => {
            // Sync mobile filters to main filters
            const mobileTypes = document.querySelectorAll('.mobile-type');
            const mobileSeats = document.querySelectorAll('.mobile-seats');
            const mobileAc = document.querySelector('.mobile-ac');

            if (mobileTypes.length) {
                typeChecks.forEach((check, i) => {
                    const mobileCheck = Array.from(mobileTypes).find(m => m.value === check.value);
                    if (mobileCheck) check.checked = mobileCheck.checked;
                });
            }
            if (mobileSeats.length) {
                seatChecks.forEach((check, i) => {
                    const mobileCheck = Array.from(mobileSeats).find(m => m.value === check.value);
                    if (mobileCheck) check.checked = mobileCheck.checked;
                });
            }
            if (mobileAc && acOnlyCheck) {
                acOnlyCheck.checked = mobileAc.checked;
            }

            filterCars();
            closeDrawer();
        });
    }

    function openDrawer(mode) {
        filterOverlay.style.display = 'block';
        filterDrawer.classList.add('open');
        if (mode === 'filter') {
            // Compact inline filters
            mobileFiltersContainer.innerHTML = `
                <div class="d-flex justify-content-end mb-2">
                    <button class="btn btn-sm btn-link text-decoration-none text-danger p-0" id="mobileClearBtn">Clear All</button>
                </div>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    <strong class="w-100 small text-muted mb-1">Vehicle Type</strong>
                    <input type="checkbox" class="btn-check mobile-type" id="mTypeSedan" value="Sedan" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mTypeSedan">Sedan</label>
                    
                    <input type="checkbox" class="btn-check mobile-type" id="mTypeSUV" value="SUV" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mTypeSUV">SUV</label>

                    <input type="checkbox" class="btn-check mobile-type" id="mTypeLuxSUV" value="Luxury SUV" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mTypeLuxSUV">Luxury SUV</label>
                    
                    <input type="checkbox" class="btn-check mobile-type" id="mTypeTempo" value="Tempo" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mTypeTempo">Tempo</label>
                    
                    <input type="checkbox" class="btn-check mobile-type" id="mTypeBus" value="Bus" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mTypeBus">Bus</label>

                    <input type="checkbox" class="btn-check mobile-type" id="mTypeLuxury" value="Luxury" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mTypeLuxury">Luxury Car</label>
                </div>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    <strong class="w-100 small text-muted mb-1">Seats</strong>
                    <input type="checkbox" class="btn-check mobile-seats" id="mSeat4" value="4" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mSeat4">4</label>
                    
                    <input type="checkbox" class="btn-check mobile-seats" id="mSeat6" value="6" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mSeat6">6-7</label>
                    
                    <input type="checkbox" class="btn-check mobile-seats" id="mSeat12" value="12" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mSeat12">12-17</label>

                    <input type="checkbox" class="btn-check mobile-seats" id="mSeat20" value="20" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mSeat20">20-26</label>

                    <input type="checkbox" class="btn-check mobile-seats" id="mSeat30" value="30" autocomplete="off">
                    <label class="btn btn-sm btn-outline-dark rounded-pill" for="mSeat30">30+</label>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <label class="form-check-label"><input type="checkbox" class="form-check-input mobile-ac" ${acOnlyCheck && acOnlyCheck.checked ? 'checked' : ''}> AC Only</label>
                </div>
            `;

            // Sync active states from main filters to mobile filters
            typeChecks.forEach(check => {
                if (check.checked) {
                    const mobileInput = mobileFiltersContainer.querySelector(`.mobile-type[value="${check.value}"]`);
                    if (mobileInput) mobileInput.checked = true;
                }
            });

            seatChecks.forEach(check => {
                if (check.checked) {
                    const mobileInput = mobileFiltersContainer.querySelector(`.mobile-seats[value="${check.value}"]`);
                    if (mobileInput) mobileInput.checked = true;
                }
            });

            document.getElementById('mobileClearBtn').addEventListener('click', () => {
                document.querySelectorAll('.mobile-type, .mobile-seats, .mobile-ac').forEach(el => {
                    if (el.type === 'checkbox') el.checked = false;
                });
                const ac = document.querySelector('.mobile-ac');
                if (ac) ac.checked = true;
            });
        } else {
            mobileFiltersContainer.innerHTML = `
                <div class="mb-2">
                    <strong class="small text-muted">Sort By</strong>
                    <select id="mobileSortSelect" class="form-select mt-2">
                        <option value="default">Recommended</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                    </select>
                </div>
            `;
            document.getElementById('mobileSortSelect').addEventListener('change', (e) => {
                sortSelect.value = e.target.value;
                filterCars();
            });
        }
    }

    function closeDrawer() {
        filterOverlay.style.display = 'none';
        filterDrawer.classList.remove('open');
    }

    function clearAllFilters() {
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'default';
        typeChecks.forEach(c => c.checked = false);
        seatChecks.forEach(c => c.checked = false);
        if (acOnlyCheck) acOnlyCheck.checked = true;
        renderCars(carRentalData);
    }

    function getSelectedValues(checkboxes) {
        return Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
    }

    function filterCars() {
        let filtered = [...carRentalData];

        // Search Term
        const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (term) {
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(term) ||
                c.type.toLowerCase().includes(term) ||
                c.description.toLowerCase().includes(term)
            );
        }

        // Type Filter (OR logic)
        const selectedTypes = getSelectedValues(typeChecks);
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(c => selectedTypes.includes(c.type));
        }

        // Seats Filter
        const selectedSeats = getSelectedValues(seatChecks);
        if (selectedSeats.length > 0) {
            filtered = filtered.filter(c => {
                if (selectedSeats.includes('4') && c.seats <= 5) return true;
                if (selectedSeats.includes('6') && c.seats >= 6 && c.seats <= 9) return true; // 6-7 Seater (includes up to 9)
                if (selectedSeats.includes('12') && c.seats >= 10 && c.seats <= 17) return true; // 12-17 Seater
                if (selectedSeats.includes('20') && c.seats >= 18 && c.seats <= 26) return true; // 20-26 Seater
                if (selectedSeats.includes('30') && c.seats >= 27) return true; // 30+ Seater (Bus)
                return false;
            });
        }

        // AC Filter
        if (acOnlyCheck && acOnlyCheck.checked) {
            filtered = filtered.filter(c => c.ac === true);
        }

        // Sort
        const sortVal = sortSelect ? sortSelect.value : 'default';
        if (sortVal === 'price_asc') {
            filtered.sort((a, b) => a.price_per_km - b.price_per_km);
        } else if (sortVal === 'price_desc') {
            filtered.sort((a, b) => b.price_per_km - a.price_per_km);
        } else if (sortVal === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        renderCars(filtered);
    }

    function renderCars(cars) {
        if (!carContainer) return;
        carContainer.innerHTML = '';

        if (resultCount) resultCount.textContent = cars.length;

        if (cars.length === 0) {
            // No Results - Show Popular Choices
            const popularCars = carRentalData.filter(c => c.rating >= 4.8).slice(0, 4);
            carContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-car-side fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No vehicles match your search</h4>
                    <p class="text-muted">Try adjusting your filters or browse our popular choices below.</p>
                </div>
                <div class="col-12">
                    <h5 class="text-center mb-4 fw-bold">Popular Choices</h5>
                </div>
                ${popularCars.map(c => `<div class="col-lg-4 col-md-6 mb-4">${renderCarCard(c)}</div>`).join('')}
            `;
            return;
        }

        cars.forEach(car => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col-lg-4 col-md-6 mb-4';
            cardCol.innerHTML = renderCarCard(car);
            carContainer.appendChild(cardCol);
        });
    }

    function renderCarCard(car) {
        const featuresHtml = car.features.slice(0, 3).map(f =>
            `<span class="badge bg-light text-dark me-1 border">${f}</span>`
        ).join('');

        return `
            <div class="card car-card h-100">
                <div class="position-relative">
                    <img src="${car.image}" class="card-img-top" alt="${car.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Not+Found'">
                    <span class="position-absolute top-0 end-0 m-3 badge" style="background: #F58220;">${car.type}</span>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="card-title mb-0">${car.name}</h5>
                        <div class="text-warning small">${car.rating} <i class="fas fa-star"></i></div>
                    </div>
                    <div class="d-flex justify-content-between text-muted small mb-3">
                        <span><i class="fas fa-chair me-1"></i> ${car.seats} Seats</span>
                        <span><i class="fas fa-suitcase me-1"></i> ${car.bags} Bags</span>
                        <span><i class="fas fa-snowflake me-1"></i> ${car.ac ? 'AC' : 'Non-AC'}</span>
                    </div>
                    <div class="mb-3">${featuresHtml}</div>
                    
                    <div class="row align-items-center g-2">
                        <div class="col-7">
                            <h5 class="text-primary fw-bold mb-0">₹${car.price_per_km.toLocaleString()} ${car.rate_unit || '/ km'}</h5>
                            <small class="text-muted d-block">${car.rate_unit === '/ Day' ? 'Fixed Daily Rate' : 'Rate per km'}</small>
                        </div>
                        <div class="col-5">
                            <button class="btn btn-dark w-100 btn-sm rounded-pill" onclick="openBookingModal(${car.id})">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Modal Handling
    window.openBookingModal = function (carId) {
        const car = carRentalData.find(c => c.id === carId);
        if (!car) return;

        const modal = new bootstrap.Modal(document.getElementById('carBookingModal'));
        document.getElementById('modalCarName').innerText = car.name;
        document.getElementById('modalCarImage').src = car.image;
        document.getElementById('modalPriceKm').innerText = car.rate_unit === '/ Day' ? `₹${car.price_per_day}/day` : `₹${car.price_per_km}/km`;
        document.getElementById('modalMinKm').innerText = car.rate_unit === '/ Day' ? 'Fixed Rate' : `Min. ${car.min_daily_km} km/day`;
        document.getElementById('modalDriverAllowance').innerText = `Driver: ₹${car.driver_allowance}/day`;
        document.getElementById('modalCarType').innerText = car.type;
        document.getElementById('modalSeats').innerText = car.seats;
        document.getElementById('modalBags').innerText = car.bags;

        // Populate Route Select
        // Populate Datalist
        const placesList = document.getElementById('placesList');
        const uniquePlaces = new Set();
        if (typeof routeDistances !== 'undefined') {
            routeDistances.forEach(r => {
                const parts = r.route.split('⇄').map(s => s.trim());
                if (parts.length === 2) {
                    uniquePlaces.add(parts[0]);
                    uniquePlaces.add(parts[1]);
                }
            });
        }
        placesList.innerHTML = Array.from(uniquePlaces).sort().map(p => `<option value="${p}">`).join('');

        // Pickup & Drop Auto-Calculate Logic
        const pickupInput = document.getElementById('pickupLocation');
        const dropInput = document.getElementById('dropLocation');
        const fareEstimate = document.getElementById('fareEstimate');
        const estimateText = document.getElementById('estimateText');

        // Track calculation variables
        let currentMinPrice = 0, currentMaxPrice = 0, currentDA = 0;
        let discount = 0;


        // Debounce timer
        let debounceTimer;

        function checkRouteAndEstimate() {
            clearTimeout(debounceTimer);
            fareEstimate.classList.add('d-none');
            currentMinPrice = 0; currentMaxPrice = 0;

            if (car.rate_unit === '/ Day') {
                fareEstimate.classList.remove('d-none');
                estimateText.innerHTML = `<strong>Fixed Day Rate Applies</strong><br>Approx. price: ₹${car.price_per_day} / Day`;
                return;
            }

            const pVal = pickupInput.value.trim().toLowerCase();
            const dVal = dropInput.value.trim().toLowerCase();

            if (!pVal || !dVal || typeof routeDistances === 'undefined') return;

            // 1. Try finding matching route in STATIC DATA first (Instant)
            const match = routeDistances.find(r => {
                const parts = r.route.split('⇄').map(s => s.trim().toLowerCase());
                return (parts[0].includes(pVal) && parts[1].includes(dVal)) ||
                    (parts[1].includes(pVal) && parts[0].includes(dVal));
            });

            if (match) {
                const range = match.roundTrip.split('–').map(s => parseInt(s.trim()));
                if (range.length === 2) {
                    currentMinPrice = range[0] * car.price_per_km;
                    currentMaxPrice = range[1] * car.price_per_km;
                    currentDA = car.driver_allowance;
                    updateFareDisplay(match.route, match.roundTrip);
                    return;
                }
            }

            // 2. If NO Match, Trigger API Calculation (Debounced)
            fareEstimate.classList.remove('d-none');
            estimateText.innerHTML = `<span class="spinner-border spinner-border-sm text-primary" role="status"></span> Price calculating with finding best route...`;

            debounceTimer = setTimeout(() => {
                calculateDynamicDistance(pVal, dVal);
            }, 1500); // Wait 1.5s after user stops typing
        }

        async function calculateDynamicDistance(pickup, drop) {
            try {
                // Geocode logic
                const pCoords = await getCoordinates(pickup);
                const dCoords = await getCoordinates(drop);

                if (!pCoords || !dCoords) {
                    fareEstimate.classList.add('d-none');
                    return;
                }

                // OSRM Routing
                const url = `https://router.project-osrm.org/route/v1/driving/${pCoords.lon},${pCoords.lat};${dCoords.lon},${dCoords.lat}?overview=false`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.code === 'Ok' && data.routes.length > 0) {
                    const meters = data.routes[0].distance;
                    const kmOneWay = Math.round(meters / 1000);
                    const kmRound = kmOneWay * 2;

                    // Add buffer for local travel (approx +10%)
                    const finalKm = Math.round(kmRound * 1.1);

                    currentMinPrice = finalKm * car.price_per_km;
                    currentMaxPrice = Math.round(currentMinPrice * 1.05); // 5% buffer
                    currentDA = car.driver_allowance;

                    updateFareDisplay(`${pCoords.name} ⇄ ${dCoords.name}`, finalKm);
                } else {
                    fareEstimate.classList.add('d-none');
                }
            } catch (err) {
                console.error("Routing Error:", err);
                fareEstimate.classList.add('d-none');
            }
        }

        async function getCoordinates(query) {
            // Append context if vague
            let searchQuery = query;
            if (!query.includes('west bengal') && !query.includes('india')) {
                searchQuery += ', West Bengal, India';
            }

            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`;
                const res = await fetch(url);
                const data = await res.json();

                if (data && data.length > 0) {
                    return {
                        lat: data[0].lat,
                        lon: data[0].lon,
                        name: data[0].display_name.split(',')[0] // Short name
                    };
                }
            } catch (e) { return null; }
            return null;
        }

        function updateFareDisplay(route, distance) {
            fareEstimate.classList.remove('d-none');

            let minP = currentMinPrice - discount;
            let maxP = currentMaxPrice - discount;
            if (minP < 0) minP = 0;
            if (maxP < 0) maxP = 0;

            let priceHtml = `₹${minP.toLocaleString()} - ₹${maxP.toLocaleString()}`;
            if (discount > 0) {
                priceHtml = `<span class="text-decoration-line-through text-muted small">₹${currentMinPrice.toLocaleString()}</span> <span class="text-success fw-bold">${priceHtml}</span>`;
            }

            estimateText.innerHTML = `
                <strong>Route Found: ${route}</strong><br>
                Est. Round Trip: ${distance} km<br>
                Est. Fare: ${priceHtml}<br>
                <small class="text-muted">+ Driver Allowance: ₹${currentDA}/day</small><br>
                <small class="text-danger fw-bold">* Toll & Parking Charges Excluded</small>
            `;
        }

        pickupInput.addEventListener('input', checkRouteAndEstimate);
        dropInput.addEventListener('input', checkRouteAndEstimate);

        // Promo Code Logic
        const promoInput = document.getElementById('promoCodeInput');
        const promoMsg = document.getElementById('promoMessage');
        promoInput.value = '';
        promoMsg.innerText = '';
        discount = 0;

        document.getElementById('applyPromoBtn').onclick = function () {
            const code = promoInput.value.trim().toUpperCase();

            if (code === 'WELCOME500') {
                discount = 500;
                promoMsg.innerHTML = '<span class="text-success"><i class="fas fa-check-circle"></i> ₹500 discount applied!</span>';
                if (!fareEstimate.classList.contains('d-none')) {
                    checkRouteAndEstimate(); // Refresh display
                }
            } else if (code === 'RETURN10') {
                discount = 200;
                promoMsg.innerHTML = '<span class="text-success"><i class="fas fa-check-circle"></i> ₹200 discount applied!</span>';
                if (!fareEstimate.classList.contains('d-none')) {
                    checkRouteAndEstimate();
                }
            } else {
                discount = 0;
                promoMsg.innerHTML = '<span class="text-danger"><i class="fas fa-times-circle"></i> Invalid Code</span>';
                if (!fareEstimate.classList.contains('d-none')) {
                    checkRouteAndEstimate();
                }
            }
        };

        document.getElementById('modalBookBtn').onclick = function () {
            const pickup = pickupInput.value || 'Not specified';
            const drop = dropInput.value || 'Not specified';
            const date = document.getElementById('travelDate').value || 'Not specified';
            const estimate = !fareEstimate.classList.contains('d-none') ? estimateText.innerText.replace('\n', ' ').replace(/\s+/g, ' ').trim() : '';

            // Complimentary Items
            const compItems = [];
            if (document.getElementById('compWater').checked) compItems.push('Water Bottle');
            if (document.getElementById('compTissues').checked) compItems.push('Tissues');
            if (document.getElementById('compNews').checked) compItems.push('Newspaper');
            if (document.getElementById('compSanitizer').checked) compItems.push('Sanitizer');

            let msg = `Hi, I want to book *${car.name}* (${car.type}).\n\nDate: ${date}\nPickup: ${pickup}\nDrop: ${drop}`;
            if (estimate) {
                msg += `\n${estimate}`;
            }
            if (discount > 0) {
                msg += `\n*Promo Applied:* ₹${discount} OFF`;
            }
            if (compItems.length > 0) {
                msg += `\n*Complimentary:* ${compItems.join(', ')}`;
            }
            msg += `\n\nPlease confirm availability.`;

            window.open(`https://wa.me/918585858400?text=${encodeURIComponent(msg)}`, '_blank');
        };

        modal.show();
    };
});
