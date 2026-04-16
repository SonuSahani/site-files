/**
 * Seven Destination — Tour Itinerary PDF Generator
 * Self-contained: injects button, loads jsPDF lazily, generates professional quotation PDF.
 * Drop a single <script src="../pdf-generator.js"></script> into any tour page.
 */
(function () {
    'use strict';

    /* ═══════════════════════════════════════════
       CONSTANTS
    ═══════════════════════════════════════════ */
    var C = {
        primary: [245, 130, 32],
        primaryDk: [230, 117, 22],
        navy: [23, 32, 51],
        dark: [34, 48, 77],
        text: [56, 72, 96],
        muted: [108, 122, 147],
        divider: [230, 232, 237],
        white: [255, 255, 255],
        green: [22, 101, 52],
        greenBg: [240, 253, 244],
        red: [185, 28, 28],
        redBg: [254, 242, 242],
        warnBg: [255, 251, 235],
        warnBdr: [251, 191, 36],
        warnTxt: [146, 64, 14],
        lightBg: [248, 249, 252]
    };
    var W = 210, H = 297, M = 18, CW = W - 2 * M;

    /* ═══════════════════════════════════════════
       1. CSS INJECTION
    ═══════════════════════════════════════════ */
    var css = document.createElement('style');
    css.textContent = [
        '.btn-download-pdf{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;',
        'padding:.7rem 1.2rem;margin-top:10px;background:transparent;',
        'border:2px solid var(--primary-color,#f58220);color:var(--primary-color,#f58220);',
        'border-radius:999px;font-family:"Poppins",sans-serif;font-weight:700;font-size:.9rem;',
        'cursor:pointer;transition:all .3s ease;outline:none;letter-spacing:.02em}',
        '.btn-download-pdf:hover{background:linear-gradient(135deg,#f58220,#e67516);color:#fff;',
        'transform:translateY(-2px);box-shadow:0 10px 24px rgba(245,130,32,.28);border-color:transparent}',
        '.btn-download-pdf .pdf-spin{display:none;width:16px;height:16px;border:2.5px solid currentColor;',
        'border-top-color:transparent;border-radius:50%;animation:pdfSp .7s linear infinite}',
        '.btn-download-pdf.generating .pdf-spin{display:inline-block}',
        '.btn-download-pdf.generating .fa-file-pdf{display:none}',
        '.btn-download-pdf.generating{pointer-events:none;opacity:.7}',
        '@keyframes pdfSp{to{transform:rotate(360deg)}}'
    ].join('\n');
    document.head.appendChild(css);

    /* ═══════════════════════════════════════════
       2. LAZY JSPDF LOADER
    ═══════════════════════════════════════════ */
    var jsPDFPromise = null;
    function loadJsPDF() {
        if (jsPDFPromise) return jsPDFPromise;
        if (window.jspdf) return (jsPDFPromise = Promise.resolve(window.jspdf));
        jsPDFPromise = new Promise(function (resolve, reject) {
            var s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
            s.onload = function () { resolve(window.jspdf); };
            s.onerror = function () { reject(new Error('Failed to load jsPDF library')); };
            document.head.appendChild(s);
        });
        return jsPDFPromise;
    }

    /* ═══════════════════════════════════════════
       3. TEXT HELPERS
    ═══════════════════════════════════════════ */
    function san(t) {
        return (t || '')
            .replace(/[\u20B9₹]/g, 'Rs.')
            .replace(/\u2014/g, ' - ')
            .replace(/\u2013/g, '-')
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/\u2026/g, '...')
            .replace(/\u00A0/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/[^\x20-\x7E\xA0-\xFF]/g, '')
            .trim();
    }

    /* ═══════════════════════════════════════════
       4. DATA EXTRACTION
    ═══════════════════════════════════════════ */
    function extractData() {
        var d = {};

        /* Tour name */
        var titleEl = document.querySelector('.tour-title') || document.querySelector('#modalPkgName');
        d.name = san(titleEl ? titleEl.textContent : 'Tour Package');

        /* Duration, location, rating */
        d.duration = ''; d.location = ''; d.rating = '';
        document.querySelectorAll('.tour-meta span').forEach(function (sp) {
            var t = san(sp.textContent);
            if (sp.querySelector('.fa-clock')) d.duration = t;
            else if (sp.querySelector('.fa-map-marker-alt')) d.location = t;
            else if (sp.querySelector('.fa-star')) d.rating = t;
        });

        /* Price */
        var pEl = document.querySelector('.booking-sidebar .price-tag') || document.querySelector('.price-tag');
        d.price = san(pEl ? pEl.textContent : '');

        /* Overview */
        var cards = [].slice.call(document.querySelectorAll('.glass-card'));
        var ovCard = cards.filter(function (c) {
            var h = c.querySelector('.section-header');
            return h && h.textContent.indexOf('Overview') !== -1;
        })[0];
        d.overview = san(ovCard ? (ovCard.querySelector('p') || {}).textContent : '');

        /* Itinerary — Style 9 */
        d.itinerary = [];
        document.querySelectorAll('.s9-day').forEach(function (day) {
            var acts = []; var meals = [];
            day.querySelectorAll('.s9-act span').forEach(function (s) { acts.push(san(s.textContent)); });
            day.querySelectorAll('.s9-mp, .s9-mn').forEach(function (m) { meals.push(san(m.textContent)); });
            d.itinerary.push({
                num: san((day.querySelector('.s9-num') || {}).textContent || ''),
                title: san((day.querySelector('.s9-title') || {}).textContent || ''),
                acts: acts,
                meals: meals
            });
        });

        /* Itinerary — generic accordion fallback */
        if (!d.itinerary.length) {
            var itinCard = cards.filter(function (c) {
                var h = c.querySelector('.section-header');
                return h && h.textContent.indexOf('Itinerary') !== -1;
            })[0];
            if (itinCard) {
                var dayIdx = 0;
                itinCard.querySelectorAll('.accordion-item, .day-item').forEach(function (item) {
                    dayIdx++;
                    var title = san((item.querySelector('.accordion-button, .day-header') || {}).textContent || '');
                    var acts = [];
                    item.querySelectorAll('.accordion-body li, .day-content li, .s9-act span').forEach(function (li) {
                        acts.push(san(li.textContent));
                    });
                    d.itinerary.push({ num: String(dayIdx).padStart(2, '0'), title: title, acts: acts, meals: [] });
                });
            }
        }

        /* Inclusions & Exclusions */
        d.inclusions = []; d.exclusions = [];
        document.querySelectorAll('.inclusions li').forEach(function (li) { var t = san(li.textContent); if (t) d.inclusions.push(t); });
        document.querySelectorAll('.exclusions li').forEach(function (li) { var t = san(li.textContent); if (t) d.exclusions.push(t); });
        if (!d.inclusions.length) d.inclusions = [
            'Accommodation as per itinerary',
            'Daily breakfast at hotel',
            'All transfers & sightseeing by private vehicle',
            'Driver allowances, toll, parking, fuel charges',
            'All applicable hotel taxes'
        ];
        if (!d.exclusions.length) d.exclusions = [
            'Airfare / train tickets',
            'Meals not mentioned in inclusions',
            'Entry fees to monuments & attractions',
            'Personal expenses (laundry, tips, shopping)',
            'Travel insurance',
            'Anything not mentioned in inclusions'
        ];

        /* Add-ons */
        d.addons = [];
        document.querySelectorAll('.list-group-item').forEach(function (item) {
            var n = item.querySelector('h6');
            var p = item.querySelector('.badge');
            if (n) d.addons.push({ name: san(n.textContent), price: san(p ? p.textContent : '') });
        });

        /* Cancellation */
        d.cancel = [];
        document.querySelectorAll('#cancel li').forEach(function (li) { d.cancel.push(san(li.textContent)); });
        if (!d.cancel.length) d.cancel = [
            '30+ days before departure: Full refund (100%)',
            '15-30 days before departure: 50% refund',
            '7-15 days before departure: 25% refund',
            'Less than 7 days: No refund'
        ];

        /* Terms */
        d.terms = [];
        document.querySelectorAll('#terms li').forEach(function (li) { d.terms.push(san(li.textContent)); });
        if (!d.terms.length) d.terms = [
            'Booking confirmation subject to availability and full payment within 24 hours.',
            'Prices valid until current season; subject to change due to fuel or seasonal surcharges.',
            'Children below 5 years free; 5-12 years 50% discount on base rate.'
        ];

        /* Guidelines */
        d.guidelines = [];
        var alertEl = document.querySelector('.alert-warning');
        if (alertEl) alertEl.querySelectorAll('li').forEach(function (li) { d.guidelines.push(san(li.textContent)); });

        /* Traveler diary quote */
        var diaryCard = cards.filter(function (c) {
            var h = c.querySelector('.section-header');
            return h && h.textContent.indexOf('Diary') !== -1;
        })[0];
        d.diary = san(diaryCard ? (diaryCard.querySelector('.fst-italic') || {}).textContent : '');

        /* Our View */
        var viewCard = cards.filter(function (c) {
            var h = c.querySelector('.section-header');
            return h && h.textContent.indexOf('Our View') !== -1;
        })[0];
        d.ourView = san(viewCard ? (viewCard.querySelector('p') || {}).textContent : '');

        return d;
    }

    /* ═══════════════════════════════════════════
       5. PDF GENERATION
    ═══════════════════════════════════════════ */
    function generatePDF(btnEl) {
        if (btnEl) btnEl.classList.add('generating');

        loadJsPDF().then(function (lib) {
            try {
                buildPDF(lib, extractData());
            } catch (e) {
                console.error('PDF Error:', e);
                alert('Sorry, PDF generation failed. Please try again.');
            } finally {
                if (btnEl) btnEl.classList.remove('generating');
            }
        }).catch(function (e) {
            console.error(e);
            alert('Could not load PDF library. Check your internet connection.');
            if (btnEl) btnEl.classList.remove('generating');
        });
    }

    function buildPDF(lib, data) {
        var doc = new lib.jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        var y = 0;

        /* ── helpers ────────────────────────────── */
        function np(h) {
            if (y + h > H - 24) { doc.addPage(); y = M; return true; }
            return false;
        }
        function fc() { doc.setFillColor.apply(doc, arguments); }
        function tc() { doc.setTextColor.apply(doc, arguments); }
        function dc() { doc.setDrawColor.apply(doc, arguments); }
        function bold(s) { doc.setFont('helvetica', 'bold'); doc.setFontSize(s); }
        function normal(s) { doc.setFont('helvetica', 'normal'); doc.setFontSize(s); }
        function italic(s) { doc.setFont('helvetica', 'italic'); doc.setFontSize(s); }
        function wrap(t, w) { return doc.splitTextToSize(t, w || CW - 8); }
        function centerText(t, yy) { doc.text(t, W / 2, yy, { align: 'center' }); }

        function sectionHeader(title) {
            np(18);
            fc.apply(null, C.primary);
            doc.rect(M, y, 4, 9, 'F');
            bold(13); tc.apply(null, C.dark);
            doc.text(title.toUpperCase(), M + 8, y + 6.5);
            y += 12;
            dc.apply(null, C.divider);
            doc.line(M, y, W - M, y);
            y += 7;
        }

        /* ══════════════════════════════════════
           PAGE 1 — COVER
        ══════════════════════════════════════ */
        // Dark header
        fc.apply(null, C.navy);
        doc.rect(0, 0, W, 58, 'F');

        bold(26); tc.apply(null, C.white);
        centerText('SEVEN DESTINATION', 22);

        normal(10); tc(200, 210, 230);
        centerText('Your Trusted Travel Partner Since 2018', 33);

        fc.apply(null, C.primary);
        doc.rect(72, 39, 66, 2.5, 'F');

        normal(7.5); tc(180, 190, 210);
        centerText('+91 85858 58400  |  email@sevendestination.com  |  www.sevendestination.com', 49);

        // Quotation badge
        y = 74;
        fc.apply(null, C.primary);
        doc.roundedRect(W / 2 - 32, y - 6, 64, 14, 4, 4, 'F');
        bold(11); tc.apply(null, C.white);
        centerText('TOUR QUOTATION', y + 3);

        // Tour name
        y += 22;
        bold(22); tc.apply(null, C.dark);
        var titleLines = wrap(data.name, CW - 20);
        titleLines.forEach(function (ln, i) { centerText(ln, y + i * 11); });
        y += titleLines.length * 11 + 10;

        // Meta boxes
        var metaItems = [];
        if (data.duration) metaItems.push({ label: 'DURATION', value: data.duration });
        if (data.price) metaItems.push({ label: 'STARTING FROM', value: data.price + ' /person' });
        if (data.rating) metaItems.push({ label: 'RATING', value: data.rating + ' / 5' });

        if (metaItems.length) {
            var bw = (CW - (metaItems.length - 1) * 6) / metaItems.length;
            metaItems.forEach(function (item, i) {
                var bx = M + (bw + 6) * i;
                fc.apply(null, C.lightBg); dc.apply(null, C.divider);
                doc.roundedRect(bx, y, bw, 24, 3, 3, 'FD');
                normal(7); tc.apply(null, C.muted);
                doc.text(item.label, bx + bw / 2, y + 9, { align: 'center' });
                bold(11); tc.apply(null, C.dark);
                doc.text(item.value, bx + bw / 2, y + 19, { align: 'center' });
            });
            y += 32;
        }

        // Overview box
        if (data.overview) {
            var ovLines = wrap(data.overview, CW - 20);
            var ovH = Math.min(ovLines.length, 7) * 4.8 + 18;
            fc(255, 250, 244); dc(245, 200, 160);
            doc.roundedRect(M, y, CW, ovH, 3, 3, 'FD');
            bold(9); tc.apply(null, C.primary);
            doc.text('OVERVIEW', M + 10, y + 10);
            normal(8.5); tc.apply(null, C.text);
            for (var oi = 0; oi < Math.min(ovLines.length, 7); oi++) {
                doc.text(ovLines[oi], M + 10, y + 18 + oi * 4.8);
            }
            y += ovH + 6;
        }

        // Traveler diary quote
        if (data.diary) {
            np(20);
            italic(9); tc.apply(null, C.muted);
            var dLines = wrap('"' + data.diary + '"', CW - 20);
            for (var di = 0; di < Math.min(dLines.length, 3); di++) {
                centerText(dLines[di], y + di * 5);
            }
            y += Math.min(dLines.length, 3) * 5 + 6;
        }

        // Date line
        y = Math.max(y, 230);
        normal(8); tc.apply(null, C.muted);
        var today = new Date();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dateStr = today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear();
        italic(8);
        centerText('Generated on: ' + dateStr, y);
        centerText('This is an indicative quotation. Final pricing subject to availability & confirmation.', y + 5);

        /* ══════════════════════════════════════
           PAGE 2+ — ITINERARY
        ══════════════════════════════════════ */
        if (data.itinerary.length) {
            doc.addPage(); y = M;
            sectionHeader('Detailed Day-by-Day Itinerary');

            data.itinerary.forEach(function (day) {
                // Estimate if we need a new page (min 30mm for a day block)
                np(32);

                // Day header bar
                fc(255, 248, 240);
                doc.roundedRect(M, y, CW, 11, 2, 2, 'F');
                fc.apply(null, C.primary);
                doc.roundedRect(M, y, 26, 11, 2, 2, 'F');
                bold(9); tc.apply(null, C.white);
                doc.text('DAY ' + day.num, M + 13, y + 7.5, { align: 'center' });
                bold(10); tc.apply(null, C.dark);
                var dtLines = wrap(day.title, CW - 34);
                doc.text(dtLines[0] || '', M + 30, y + 7.5);
                y += 15;

                // Activities
                day.acts.forEach(function (act) {
                    np(8);
                    var aLines = wrap(act, CW - 16);
                    aLines.forEach(function (ln, li) {
                        if (li === 0) {
                            fc.apply(null, C.primary);
                            doc.circle(M + 5, y - 1.2, 1.3, 'F');
                        }
                        normal(8.5); tc.apply(null, C.text);
                        doc.text(ln, M + 11, y);
                        y += 4.6;
                    });
                    y += 0.8;
                });

                // Meals
                if (day.meals.length) {
                    np(8);
                    bold(7.5); tc.apply(null, C.green);
                    doc.text('Meals: ' + day.meals.join('  |  '), M + 11, y);
                    y += 5;
                }

                y += 4;
                dc(240, 240, 245);
                doc.line(M + 6, y, W - M - 6, y);
                y += 5;
            });
        }

        /* ══════════════════════════════════════
           INCLUSIONS & EXCLUSIONS
        ══════════════════════════════════════ */
        np(50);
        sectionHeader('Inclusions & Exclusions');

        var colW = (CW - 10) / 2;
        var baseY = y;
        var lY = y, rY = y;

        // --- Inclusions column ---
        fc.apply(null, C.greenBg);
        doc.roundedRect(M, lY, colW, 9, 2, 2, 'F');
        bold(9); tc.apply(null, C.green);
        doc.text('INCLUSIONS', M + colW / 2, lY + 6.5, { align: 'center' });
        lY += 13;

        data.inclusions.forEach(function (item) {
            if (lY > H - 30) return;
            fc(34, 197, 94); doc.circle(M + 4, lY - 1, 1.5, 'F');
            normal(8); tc.apply(null, C.text);
            var lines = wrap(item, colW - 14);
            lines.forEach(function (ln) {
                doc.text(ln, M + 9, lY); lY += 4.3;
            });
            lY += 1;
        });

        // --- Exclusions column ---
        var exX = M + colW + 10;
        fc.apply(null, C.redBg);
        doc.roundedRect(exX, rY, colW, 9, 2, 2, 'F');
        bold(9); tc.apply(null, C.red);
        doc.text('EXCLUSIONS', exX + colW / 2, rY + 6.5, { align: 'center' });
        rY += 13;

        data.exclusions.forEach(function (item) {
            if (rY > H - 30) return;
            fc(239, 68, 68); doc.circle(exX + 4, rY - 1, 1.5, 'F');
            normal(8); tc.apply(null, C.text);
            var lines = wrap(item, colW - 14);
            lines.forEach(function (ln) {
                doc.text(ln, exX + 9, rY); rY += 4.3;
            });
            rY += 1;
        });

        // Divider
        var maxColY = Math.max(lY, rY);
        dc.apply(null, C.divider);
        doc.line(M + colW + 5, baseY, M + colW + 5, maxColY);
        y = maxColY + 8;

        /* ══════════════════════════════════════
           ADD-ONS
        ══════════════════════════════════════ */
        if (data.addons.length) {
            np(25);
            sectionHeader('Optional Add-ons');
            data.addons.forEach(function (a) {
                np(14);
                fc.apply(null, C.lightBg);
                doc.roundedRect(M, y, CW, 11, 2, 2, 'F');
                bold(9); tc.apply(null, C.dark);
                doc.text(a.name, M + 6, y + 7);
                if (a.price) {
                    bold(9); tc.apply(null, C.green);
                    doc.text(a.price, W - M - 6, y + 7, { align: 'right' });
                }
                y += 14;
            });
            y += 4;
        }

        /* ══════════════════════════════════════
           OUR VIEW
        ══════════════════════════════════════ */
        if (data.ourView) {
            np(22);
            fc(245, 248, 255); dc(200, 210, 240);
            var vLines = wrap(data.ourView, CW - 20);
            var vH = vLines.length * 4.5 + 12;
            doc.roundedRect(M, y, CW, vH, 3, 3, 'FD');
            fc.apply(null, C.primary);
            doc.rect(M, y, 4, vH, 'F');
            bold(9); tc.apply(null, C.primary);
            doc.text('OUR VIEW', M + 10, y + 8);
            normal(8.5); tc.apply(null, C.text);
            vLines.forEach(function (ln, i) {
                doc.text(ln, M + 10, y + 14 + i * 4.5);
            });
            y += vH + 8;
        }

        /* ══════════════════════════════════════
           POLICIES
        ══════════════════════════════════════ */
        np(35);
        sectionHeader('Policies & Terms');

        // Cancellation
        bold(10); tc.apply(null, C.dark);
        doc.text('Cancellation Policy', M + 2, y); y += 7;
        data.cancel.forEach(function (item) {
            np(7);
            fc.apply(null, C.primary); doc.circle(M + 5, y - 1, 1.2, 'F');
            normal(8.5); tc.apply(null, C.text);
            var lines = wrap(item, CW - 16);
            lines.forEach(function (ln) { doc.text(ln, M + 11, y); y += 4.5; });
        });
        y += 5;

        // Terms
        np(12);
        bold(10); tc.apply(null, C.dark);
        doc.text('Terms & Conditions', M + 2, y); y += 7;
        data.terms.forEach(function (item) {
            np(7);
            fc.apply(null, C.primary); doc.circle(M + 5, y - 1, 1.2, 'F');
            normal(8.5); tc.apply(null, C.text);
            var lines = wrap(item, CW - 16);
            lines.forEach(function (ln) { doc.text(ln, M + 11, y); y += 4.5; });
        });

        /* ══════════════════════════════════════
           IMPORTANT GUIDELINES
        ══════════════════════════════════════ */
        if (data.guidelines.length) {
            np(22);
            y += 4;
            var gH = 12 + data.guidelines.length * 5.5;
            fc.apply(null, C.warnBg); dc.apply(null, C.warnBdr);
            doc.roundedRect(M, y, CW, Math.min(gH, 55), 3, 3, 'FD');
            bold(9); tc.apply(null, C.warnTxt);
            doc.text('IMPORTANT GUIDELINES', M + 8, y + 8);
            var gY = y + 14;
            data.guidelines.forEach(function (g) {
                normal(8); tc.apply(null, C.warnTxt);
                doc.text('- ' + g.substring(0, 120), M + 8, gY);
                gY += 5.5;
            });
            y += Math.min(gH, 55) + 8;
        }

        /* ══════════════════════════════════════
           CONTACT CTA
        ══════════════════════════════════════ */
        np(55);
        y += 6;
        fc.apply(null, C.navy);
        doc.roundedRect(M, y, CW, 50, 5, 5, 'F');

        bold(16); tc.apply(null, C.white);
        centerText('Ready to Book?', y + 14);

        normal(9.5); tc(200, 210, 230);
        centerText('Contact us for final pricing, customization & instant confirmation', y + 23);

        bold(10); tc.apply(null, C.white);
        doc.text('+91 85858 58400', M + 18, y + 36);
        doc.text('email@sevendestination.com', W / 2, y + 36, { align: 'center' });
        doc.text('sevendestination.com', W - M - 18, y + 36, { align: 'right' });

        // Small orange accent line inside CTA
        fc.apply(null, C.primary);
        doc.rect(W / 2 - 25, y + 42, 50, 1.5, 'F');

        /* ══════════════════════════════════════
           FOOTERS ON ALL PAGES
        ══════════════════════════════════════ */
        var totalPages = doc.internal.getNumberOfPages();
        for (var pg = 1; pg <= totalPages; pg++) {
            doc.setPage(pg);
            dc.apply(null, C.divider);
            doc.line(M, H - 19, W - M, H - 19);
            normal(7); tc.apply(null, C.muted);
            doc.text('Seven Destination  |  +91 85858 58400  |  www.sevendestination.com', W / 2, H - 14, { align: 'center' });
            doc.text('Page ' + pg + ' of ' + totalPages, W - M, H - 14, { align: 'right' });
            normal(6); tc(180, 185, 195);
            doc.text('Indicative quotation - prices & availability subject to confirmation', W / 2, H - 10, { align: 'center' });
        }

        /* ══════════════════════════════════════
           SAVE
        ══════════════════════════════════════ */
        var slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        doc.save((slug || 'tour-itinerary') + '-quotation.pdf');
    }

    /* ═══════════════════════════════════════════
       6. BUTTON INJECTION
    ═══════════════════════════════════════════ */
    function createBtn() {
        var btn = document.createElement('button');
        btn.className = 'btn-download-pdf';
        btn.type = 'button';
        btn.innerHTML = '<i class="fas fa-file-pdf"></i><span class="pdf-spin"></span>Download Itinerary';
        btn.addEventListener('click', function () { generatePDF(btn); });
        return btn;
    }

    function injectButtons() {
        // Desktop sidebar
        var sidebar = document.querySelector('.booking-sidebar');
        if (sidebar && !sidebar.querySelector('.btn-download-pdf')) {
            var bookBtn = sidebar.querySelector('.btn-book');
            if (bookBtn) bookBtn.insertAdjacentElement('afterend', createBtn());
        }
        // Mobile card
        var mobile = document.querySelector('.mobile-booking-card');
        if (mobile && !mobile.querySelector('.btn-download-pdf')) {
            var mBookBtn = mobile.querySelector('.btn-book');
            if (mBookBtn) mBookBtn.insertAdjacentElement('afterend', createBtn());
        }
    }

    /* ═══════════════════════════════════════════
       7. INIT
    ═══════════════════════════════════════════ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectButtons);
    } else {
        injectButtons();
    }

    window.generateTourPDF = generatePDF;
})();
