/**
 * Seven Destination — Tour Package Page Scripts
 * Lightbox, Gallery, Booking Modal, Form Submission
 * Extracted from inline <script> for performance & caching
 */
function openLightbox(element) {
        const img = element.querySelector('img');
        const modalEl = document.getElementById('lightboxModal');
        const modalImg = document.getElementById('lightboxImage');
        if (!img || !modalEl || !modalImg) return;

        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Full Screen';
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    document.addEventListener('DOMContentLoaded', function () {
        const navbarCollapse = document.getElementById('navbarNav');
        const bookingModal = document.getElementById('bookingModal');
        const lightboxModal = document.getElementById('lightboxModal');
        const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

        // Move modals to <body> so Elementor/snippet containers don't trap them
        // under transformed/overflow-hidden parents while the backdrop sits above.
        [bookingModal, lightboxModal].forEach(function (modalEl) {
            if (modalEl && document.body && modalEl.parentElement !== document.body) {
                document.body.appendChild(modalEl);
            }
        });

        if (navbarCollapse && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const navbarCollapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
            navbarCollapse.querySelectorAll('.nav-link').forEach(function (link) {
                link.addEventListener('click', function () {
                    if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                        navbarCollapseInstance.hide();
                    }
                });
            });
        }

        function cleanupModalState() {
            document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
                backdrop.remove();
            });
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('padding-right');
            document.body.style.removeProperty('overflow');
        }

        [bookingModal, lightboxModal].forEach(function (modalEl) {
            if (!modalEl) return;

            modalEl.addEventListener('hidden.bs.modal', cleanupModalState);
        });

        document.addEventListener('click', function (event) {
            const closeBtn = event.target.closest('[data-bs-dismiss="modal"]');
            if (!closeBtn) return;
            window.setTimeout(cleanupModalState, 250);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;

            if (lightboxModal && lightboxModal.classList.contains('show')) {
                const lightboxInstance = bootstrap.Modal.getInstance(lightboxModal);
                if (lightboxInstance) {
                    lightboxInstance.hide();
                }
                return;
            }

            if (bookingModal && bookingModal.classList.contains('show')) {
                const bookingInstance = bootstrap.Modal.getInstance(bookingModal);
                if (bookingInstance) {
                    bookingInstance.hide();
                }
            }
        });

        if (modalWhatsAppBtn) {
            modalWhatsAppBtn.addEventListener('click', function () {
                const name = document.getElementById('modalPkgName').textContent;
                const date = document.getElementById('modalTravelDate').value || 'flexible';
                const pax = document.getElementById('modalTravelers').value;
                const req = document.getElementById('modalRequirements').value.trim();
                const msg = encodeURIComponent(
                    'Hello Seven Destination! I am interested in:\n' +
                    'Package: ' + name + '\n' +
                    'Travel Date: ' + date + '\n' +
                    'Travellers: ' + pax + '\n' +
                    (req ? 'Special: ' + req : '')
                );

                window.open('https://wa.me/918585858400?text=' + msg, '_blank');

                if (bookingModal) {
                    const bookingModalInstance = bootstrap.Modal.getInstance(bookingModal);
                    if (bookingModalInstance) {
                        bookingModalInstance.hide();
                    }
                }
            });
        }
    });
