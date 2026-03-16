document.addEventListener('DOMContentLoaded', function () {
    const tourContainer = document.getElementById('tour-grid');
    const searchInput = document.getElementById('searchTour');
    const sortSelect = document.getElementById('sortTours');
    const monthFilter = document.getElementById('monthFilter');
    const filterTags = document.querySelectorAll('.filter-tag');
    const resultCount = document.getElementById('tourCount');

    // Mobile Elements
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const mobileSortBtn = document.getElementById('mobileSortBtn');
    const closeDrawer = document.getElementById('closeDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const mobileFilterDrawer = document.getElementById('mobileFilterDrawer');
    const drawerContent = document.getElementById('drawerContent');
    const applyMobileFilters = document.getElementById('applyMobileFilters');

    let currentFilters = {
        keyword: '',
        tag: 'All',
        month: 'All',
        sort: 'trending'
    };

    function renderTours(tours) {
        if (!tourContainer) return;
        tourContainer.innerHTML = '';

        if (tours.length === 0) {
            tourContainer.innerHTML = '<div class="col-12 text-center py-5"><i class="fas fa-search-minus mb-3" style="font-size: 3rem; color: #ccc;"></i><h3>No tours found matching your search</h3></div>';
            return;
        }

        tours.forEach(tour => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <div class="category-card h-100">
                    <div class="position-relative">
                        <img src="${tour.image}" class="category-img w-100" alt="${tour.name}">
                        <div class="tour-type-badge">${tour.type}</div>
                    </div>
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="fw-bold mb-0">${tour.name}</h5>
                            <span class="badge bg-light text-dark border"><i class="fas fa-star text-warning me-1"></i>${tour.rating}</span>
                        </div>
                        <p class="text-muted small mb-3"><i class="fas fa-map-marker-alt me-2"></i>${tour.destination}</p>
                        <div class="row g-2 mb-3">
                            <div class="col-6">
                                <span class="small text-muted d-block"><i class="far fa-calendar-alt me-2"></i>Departure</span>
                                <span class="fw-medium small">${tour.bestMonth}</span>
                            </div>
                            <div class="col-6">
                                <span class="small text-muted d-block"><i class="far fa-clock me-2"></i>Duration</span>
                                <span class="fw-medium small">${tour.duration}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="small text-muted d-block">Starting from</span>
                                <span class="fw-bold fs-5">₹${Math.round(tour.price).toLocaleString()}</span>
                            </div>
                            <button class="btn btn-primary rounded-pill px-4 fw-bold" onclick="inquireForTour('${tour.name}', '${tour.destination}', '${tour.price}', '${tour.duration}')">Inquire Now</button>
                        </div>
                    </div>
                </div>
            `;
            tourContainer.appendChild(card);
        });

        if (resultCount) resultCount.innerText = `${tours.length} Tours Found`;
    }

    function filterTours() {
        let filtered = window.groupToursData || [];

        // Keyword search
        if (currentFilters.keyword) {
            const k = currentFilters.keyword.toLowerCase();
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(k) ||
                t.destination.toLowerCase().includes(k) ||
                t.type.toLowerCase().includes(k)
            );
        }

        // Tag filter
        if (currentFilters.tag !== 'All') {
            filtered = filtered.filter(t => t.tags.includes(currentFilters.tag) || t.type === currentFilters.tag);
        }

        // Month filter
        if (currentFilters.month !== 'All') {
            filtered = filtered.filter(t => t.bestMonth.includes(currentFilters.month));
        }

        // Sort
        if (currentFilters.sort === 'priceLow') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentFilters.sort === 'priceHigh') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentFilters.sort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else {
            // Trending
            filtered.sort((a, b) => (b.rating * 0.7 + (b.tags.includes('Trending') ? 1 : 0)) - (a.rating * 0.7 + (a.tags.includes('Trending') ? 1 : 0)));
        }

        renderTours(filtered);
    }

    // Event Listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.keyword = e.target.value;
            filterTours();
        });
    }

    // Mobile Search Input (visible on mobile)
    const mobileSearchInput = document.getElementById('mobileSearchTour');
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            currentFilters.keyword = e.target.value;
            if (searchInput) searchInput.value = e.target.value; // Sync with desktop
            filterTours();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            filterTours();
        });
    }

    if (monthFilter) {
        monthFilter.addEventListener('change', (e) => {
            currentFilters.month = e.target.value;
            filterTours();
        });
    }

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentFilters.tag = tag.dataset.tag;
            filterTours();
            // Sync sidebar tags
            syncSidebarTags(tag.dataset.tag);
        });
    });

    // Sidebar Filter Tags (Desktop)
    const sidebarTags = document.querySelectorAll('.sidebar-filter-tag');
    sidebarTags.forEach(tag => {
        tag.addEventListener('click', () => {
            sidebarTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentFilters.tag = tag.dataset.tag;
            filterTours();
        });
    });

    function syncSidebarTags(tagValue) {
        const sidebarTags = document.querySelectorAll('.sidebar-filter-tag');
        sidebarTags.forEach(t => {
            t.classList.remove('active');
            if (t.dataset.tag === tagValue) t.classList.add('active');
        });
    }

    // Mobile Drawer Logic
    function toggleDrawer(open, type = 'filter') {
        if (open) {
            mobileFilterDrawer.classList.add('open');
            drawerOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            renderDrawerContent(type);
        } else {
            mobileFilterDrawer.classList.remove('open');
            drawerOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    function renderDrawerContent(type) {
        if (type === 'filter') {
            drawerContent.innerHTML = `
                <div class="mb-4">
                    <label class="form-label fw-bold small">Category</label>
                    <select id="mobileTagFilter" class="form-select rounded-pill">
                        <option value="All" ${currentFilters.tag === 'All' ? 'selected' : ''}>All Categories</option>
                        <option value="Trending" ${currentFilters.tag === 'Trending' ? 'selected' : ''}>Trending</option>
                        <option value="Corporate" ${currentFilters.tag === 'Corporate' ? 'selected' : ''}>Corporate</option>
                        <option value="Educational" ${currentFilters.tag === 'Educational' ? 'selected' : ''}>Educational</option>
                        <option value="Family" ${currentFilters.tag === 'Family' ? 'selected' : ''}>Family</option>
                        <option value="International" ${currentFilters.tag === 'International' ? 'selected' : ''}>International</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="form-label fw-bold small">Best Month</label>
                    <select id="mobileMonthFilter" class="form-select rounded-pill">
                        <option value="All" ${currentFilters.month === 'All' ? 'selected' : ''}>All Months</option>
                        <option value="Jan" ${currentFilters.month === 'Jan' ? 'selected' : ''}>Jan</option><option value="Feb" ${currentFilters.month === 'Feb' ? 'selected' : ''}>Feb</option>
                        <option value="Mar" ${currentFilters.month === 'Mar' ? 'selected' : ''}>Mar</option><option value="Apr" ${currentFilters.month === 'Apr' ? 'selected' : ''}>Apr</option>
                        <option value="May" ${currentFilters.month === 'May' ? 'selected' : ''}>May</option><option value="Jun" ${currentFilters.month === 'Jun' ? 'selected' : ''}>Jun</option>
                        <option value="Jul" ${currentFilters.month === 'Jul' ? 'selected' : ''}>Jul</option><option value="Aug" ${currentFilters.month === 'Aug' ? 'selected' : ''}>Aug</option>
                        <option value="Sep" ${currentFilters.month === 'Sep' ? 'selected' : ''}>Sep</option><option value="Oct" ${currentFilters.month === 'Oct' ? 'selected' : ''}>Oct</option>
                        <option value="Nov" ${currentFilters.month === 'Nov' ? 'selected' : ''}>Nov</option><option value="Dec" ${currentFilters.month === 'Dec' ? 'selected' : ''}>Dec</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold small">Search</label>
                    <input type="text" id="mobileSearch" class="form-control rounded-pill" placeholder="Search destination..." value="${currentFilters.keyword}">
                </div>
            `;
        } else {
            drawerContent.innerHTML = `
                <div class="mb-4">
                    <label class="form-label fw-bold small">Sort By</label>
                    <select id="mobileSortSelect" class="form-select rounded-pill">
                        <option value="trending" ${currentFilters.sort === 'trending' ? 'selected' : ''}>Trending</option>
                        <option value="priceLow" ${currentFilters.sort === 'priceLow' ? 'selected' : ''}>Price: Low to High</option>
                        <option value="priceHigh" ${currentFilters.sort === 'priceHigh' ? 'selected' : ''}>Price: High to Low</option>
                        <option value="rating" ${currentFilters.sort === 'rating' ? 'selected' : ''}>Top Rated</option>
                    </select>
                </div>
            `;
        }
    }

    if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', () => toggleDrawer(true, 'filter'));
    if (mobileSortBtn) mobileSortBtn.addEventListener('click', () => toggleDrawer(true, 'sort'));
    if (closeDrawer) closeDrawer.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    if (applyMobileFilters) {
        applyMobileFilters.addEventListener('click', () => {
            const mTag = document.getElementById('mobileTagFilter');
            const mMonth = document.getElementById('mobileMonthFilter');
            const mSearch = document.getElementById('mobileSearch');
            const mSort = document.getElementById('mobileSortSelect');

            if (mTag) currentFilters.tag = mTag.value;
            if (mMonth) currentFilters.month = mMonth.value;
            if (mSearch) currentFilters.keyword = mSearch.value;
            if (mSort) currentFilters.sort = mSort.value;

            // Sync with desktop UI if needed (optional but good practice)
            if (searchInput) searchInput.value = currentFilters.keyword;
            if (sortSelect) sortSelect.value = currentFilters.sort;
            if (monthFilter) monthFilter.value = currentFilters.month;

            filterTours();
            toggleDrawer(false);
        });
    }

    // Initial render
    if (window.groupToursData) {
        renderTours(window.groupToursData);
    } else {
        setTimeout(() => renderTours(window.groupToursData || []), 500);
    }
});

// Store current tour for modal
let currentTour = null;

function inquireForTour(name, dest, price, duration) {
    // Populate modal with tour details
    document.getElementById('modalTourName').textContent = name;
    document.getElementById('modalTourDest').textContent = dest;
    document.getElementById('modalTourPrice').textContent = price ? `₹${parseInt(price).toLocaleString()}` : '₹ On Request';
    document.getElementById('modalTourDuration').textContent = duration || 'Custom';

    currentTour = { name, dest };

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('tourInquiryModal'));
    modal.show();
}

// Handle Modal Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const modalForm = document.getElementById('modalInquiryForm');
    if (modalForm) {
        modalForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('modalName').value;
            const pickupCity = document.getElementById('modalPickupCity').value;
            const groupSize = document.getElementById('modalGroupSize').value;
            const travelDate = document.getElementById('modalTravelDate').value;
            const stayType = document.getElementById('modalStayType').value;
            const mealPlan = document.getElementById('modalMealPlan').value;
            const message = document.getElementById('modalMessage').value;

            const tourName = currentTour?.name || 'Tour Package';
            const tourDest = currentTour?.dest || 'Destination';

            const text = `*Group Tour Inquiry*%0A%0A` +
                `*Tour:* ${tourName}%0A` +
                `*Destination:* ${tourDest}%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Pickup City:* ${pickupCity}%0A` +
                `*Travelers:* ${groupSize}%0A` +
                `*Travel Date:* ${travelDate || 'Flexible'}%0A` +
                `*Stay Type:* ${stayType || 'Not specified'}%0A` +
                `*Meal Plan:* ${mealPlan || 'Not specified'}%0A` +
                `*Special Requests:* ${message || 'None'}`;

            window.open(`https://wa.me/918585858400?text=${text}`, '_blank');

            // Close modal
            const modalEl = document.getElementById('tourInquiryModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        });
    }
});

// General Inquiry Modal (no specific tour)
function openGeneralInquiryModal() {
    document.getElementById('modalTourName').textContent = 'Group Tour Inquiry';
    document.getElementById('modalTourDest').textContent = 'Custom Destination';
    document.getElementById('modalTourPrice').textContent = 'On Request';
    document.getElementById('modalTourDuration').textContent = 'Flexible';

    currentTour = { name: 'Custom Group Tour', dest: 'Your Choice' };

    const modal = new bootstrap.Modal(document.getElementById('tourInquiryModal'));
    modal.show();
}
