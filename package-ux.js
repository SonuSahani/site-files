/* ═══════════════════════════════════════════════════════════
   package-ux.js — UX Enhancement Suite for Tour Package Pages
   CDN: cdn.jsdelivr.net/gh/SonuSahani/site-files@main/package-ux.js
   
   Features:
   1. Skeleton page loader
   2. Exit intent popup (desktop)
   3. Time-on-page offer (60s)
   4. Copy phone number on click
   5. Back to top button
   6. Auto-fill booking date (7 days ahead)
   7. Lazy load polyfill
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── HELPERS ──
  function getPageTitle() {
    var el = document.querySelector('.tour-title');
    return el ? el.textContent.trim() : 'Tour Package';
  }
  function getPagePrice() {
    var el = document.querySelector('.price-tag');
    if (!el) return '10,000';
    return el.textContent.replace(/[^\d,]/g, '');
  }
  function encodeWA(text) {
    return encodeURIComponent(text).replace(/%20/g, '+');
  }

  // ════════════════════════════════════════════
  // 1. SKELETON PAGE LOADER
  // ════════════════════════════════════════════
  (function () {
    var overlay = document.createElement('div');
    overlay.className = 'sd-skeleton-overlay';
    overlay.innerHTML =
      '<div class="sd-skeleton-brand">' +
      '<img src="https://www.sevendestination.com/wp-content/uploads/2025/10/seven-destination.png" alt="Loading...">' +
      '</div>' +
      '<div class="sd-skeleton-bar"></div>';
    document.body.insertBefore(overlay, document.body.firstChild);

    function hideLoader() {
      overlay.classList.add('sd-fade-out');
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 500);
    }

    // Hide on load or after max 3 seconds
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      setTimeout(hideLoader, 3000);
    }
  })();

  // ════════════════════════════════════════════
  // 2. EXIT INTENT POPUP (Desktop only)
  // ════════════════════════════════════════════
  (function () {
    if ('ontouchstart' in window) return; // Skip mobile
    var shown = false;

    document.addEventListener('mouseleave', function (e) {
      if (e.clientY < 10 && !shown) {
        shown = true;
        sessionStorage.setItem('sd_exit_shown', '1');

        var title = getPageTitle();
        var price = getPagePrice();
        var popup = document.createElement('div');
        popup.className = 'sd-exit-overlay';
        popup.innerHTML =
          '<div class="sd-exit-card">' +
          '<button class="sd-exit-close" aria-label="Close">&times;</button>' +
          '<h3>Wait! Before You Go &#128591;</h3>' +
          '<p>Get an <strong>exclusive quote</strong> for ' + title +
          ' — starting &#8377;' + price + '</p>' +
          '<a class="sd-exit-cta" href="https://wa.me/918585858400?text=' +
          encodeWA('Hi, I want a quote for ' + title) +
          '" target="_blank" rel="noopener">' +
          '&#128172; Get WhatsApp Quote</a>' +
          '</div>';

        document.body.appendChild(popup);

        // Close handlers
        popup.querySelector('.sd-exit-close').addEventListener('click', function () {
          popup.remove();
        });
        popup.addEventListener('click', function (ev) {
          if (ev.target === popup) popup.remove();
        });

        // GA4 tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'exit_intent_shown', {
            event_category: 'engagement',
            event_label: title
          });
        }
      }
    });
  })();

  // ════════════════════════════════════════════
  // 3. TIME-ON-PAGE OFFER (shows after 60 seconds)
  // ════════════════════════════════════════════
  (function () {
    if (sessionStorage.getItem('sd_offer_closed')) return;

    setTimeout(function () {
      var title = getPageTitle();
      var bar = document.createElement('div');
      bar.className = 'sd-time-offer';
      bar.id = 'sdTimeOffer';
      bar.innerHTML =
        '&#127881; <strong>Limited Offer:</strong> Extra &#8377;500 off — Book today!' +
        '<a href="https://wa.me/918585858400?text=' +
        encodeWA('I want the limited offer on ' + title) +
        '" target="_blank" rel="noopener">Claim Now</a>' +
        '<span class="sd-offer-close" aria-label="Close">&times;</span>';

      document.body.appendChild(bar);

      bar.querySelector('.sd-offer-close').addEventListener('click', function () {
        bar.remove();
        sessionStorage.setItem('sd_offer_closed', '1');
      });

      // GA4 tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'time_offer_shown', {
          event_category: 'engagement',
          event_label: title
        });
      }
    }, 60000);
  })();

  // ════════════════════════════════════════════
  // 4. COPY PHONE NUMBER ON CLICK
  // ════════════════════════════════════════════
  (function () {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        var phone = el.href.replace('tel:', '');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(phone).then(function () {
            // Show tooltip
            var existing = el.querySelector('.sd-copy-tip');
            if (existing) existing.remove();
            var tip = document.createElement('span');
            tip.className = 'sd-copy-tip';
            tip.textContent = ' \u2713 Copied!';
            el.appendChild(tip);
            setTimeout(function () { tip.remove(); }, 2000);
          });
        }
      });
    });
  })();

  // ════════════════════════════════════════════
  // 5. BACK TO TOP BUTTON (shows when footer visible)
  // ════════════════════════════════════════════
  (function () {
    var btn = document.createElement('button');
    btn.id = 'sdBackToTop';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    document.body.appendChild(btn);

    var footer = document.querySelector('footer');

    if (footer && 'IntersectionObserver' in window) {
      // Show only when footer is visible
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            btn.classList.add('sd-visible');
          } else {
            btn.classList.remove('sd-visible');
          }
        });
      }, { threshold: 0.1 });
      observer.observe(footer);
    } else {
      // Fallback: show at 80% scroll depth if no footer found
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled > 0.8) {
              btn.classList.add('sd-visible');
            } else {
              btn.classList.remove('sd-visible');
            }
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (typeof gtag !== 'undefined') {
        gtag('event', 'back_to_top', { event_category: 'engagement' });
      }
    });
  })();

  // ════════════════════════════════════════════
  // 6. AUTO-FILL BOOKING DATE (7 days from now)
  // ════════════════════════════════════════════
  (function () {
    var dateInput = document.getElementById('modalTravelDate');
    if (dateInput) {
      var today = new Date();
      var weekLater = new Date();
      weekLater.setDate(today.getDate() + 7);

      dateInput.min = today.toISOString().split('T')[0]; // block past dates
      dateInput.value = weekLater.toISOString().split('T')[0]; // default: 1 week
    }
  })();

  // ════════════════════════════════════════════
  // 7. LAZY LOAD POLYFILL (older browsers)
  // ════════════════════════════════════════════
  (function () {
    if (!('loading' in HTMLImageElement.prototype) && 'IntersectionObserver' in window) {
      var lazyImgs = document.querySelectorAll('img[loading="lazy"]');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      lazyImgs.forEach(function (img) { observer.observe(img); });
    }
  })();

})();
