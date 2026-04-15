/* ═══════════════════════════════════════════════════════════════
   Saheli Chatbot — Seven Destination  |  Premium Theme-Matched
   All original content, dialogues, choices, prompts preserved
   ═══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ─── Config ──────────────────────────────────── */
    var CONTACT_PHONE = '+918585858400';
    var WHATSAPP_NUMBER = '918585858400';
    var DEFAULT_SUPABASE_URL = 'https://sekbkktlvntgkhdcrwpj.supabase.co';
    // Supabase anon keys are safe for public client-side use. Never put service_role here.
    var DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNla2Jra3Rsdm50Z2toZGNyd3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTQwMTQsImV4cCI6MjA4ODI5MDAxNH0.a5-zCFIq7JYx0pEiO3cF3fw4bT0226zSCHWlIrGE378';
    var DEFAULT_API_BASE = (window.location && /^https?:/i.test(window.location.origin || ''))
        ? window.location.origin.replace(/\/$/, '') + '/api'
        : '';
    var AI_API_BASE = window.SAHELI_API_BASE
        || localStorage.getItem('SAHELI_API_BASE')
        || DEFAULT_API_BASE;
    var SAHELI_SUPABASE_URL = window.SAHELI_SUPABASE_URL
        || localStorage.getItem('SAHELI_SUPABASE_URL')
        || DEFAULT_SUPABASE_URL;
    var SAHELI_SUPABASE_ANON_KEY = window.SAHELI_SUPABASE_ANON_KEY
        || localStorage.getItem('SAHELI_SUPABASE_ANON_KEY')
        || DEFAULT_SUPABASE_ANON_KEY;
    var AI_API_URL = window.SAHELI_AI_API_URL
        || localStorage.getItem('SAHELI_AI_API_URL')
        || (SAHELI_SUPABASE_URL ? SAHELI_SUPABASE_URL.replace(/\/$/, '') + '/functions/v1/saheli-chat' : '')
        || (AI_API_BASE ? AI_API_BASE.replace(/\/$/, '') + '/generateChat' : '');
    var BOOKING_API_URL = window.SAHELI_BOOKING_API_URL
        || localStorage.getItem('SAHELI_BOOKING_API_URL')
        || (SAHELI_SUPABASE_URL ? SAHELI_SUPABASE_URL.replace(/\/$/, '') + '/functions/v1/saheli-booking' : '');

    /* ─── Helpers ────────────────────────────────────────────── */
    function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
    function qsa(sel, ctx) { return [].slice.call((ctx || document).querySelectorAll(sel)); }

    function getPackageName() {
        var el = qs('#modalPkgName') || qs('.tour-title') || qs('h1');
        return (el ? el.textContent : document.title || 'this package').trim();
    }

    function stamp() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    /* ─── Auto-scrape page context from DOM ────────────────────── */
    function scrapePageContext() {
        var ctx = [];

        // Package name
        var nameEl = qs('.tour-title') || qs('h1');
        if (nameEl) ctx.push('Package: ' + nameEl.textContent.trim());

        // Duration
        var metaEl = qs('.tour-meta');
        if (metaEl) {
            var metaText = metaEl.textContent.replace(/\s+/g, ' ').trim();
            ctx.push('Meta: ' + metaText);
        }

        // Price
        var priceEl = qs('.price-tag');
        if (priceEl) ctx.push('Price: ' + priceEl.textContent.trim() + ' per person');

        // Badge (e.g. "Popular Tour", "Bestseller")
        var badgeEl = qs('.tour-badge');
        if (badgeEl) ctx.push('Badge: ' + badgeEl.textContent.trim());

        // Overview
        var overviewCard = null;
        qsa('.section-header').forEach(function (h) {
            if (h.textContent.trim() === 'Overview') overviewCard = h.parentElement;
        });
        if (overviewCard) {
            var p = overviewCard.querySelector('p');
            if (p) ctx.push('Overview: ' + p.textContent.trim());
        }

        // Itinerary (day titles + activities — compact)
        var days = qsa('.s9-day');
        if (days.length > 0) {
            var itin = [];
            days.forEach(function (day, idx) {
                var title = day.querySelector('.s9-title');
                var acts = qsa('.s9-act span', day);
                var dayText = 'Day ' + (idx + 1) + ': ' + (title ? title.textContent.trim() : '');
                if (acts.length > 0) {
                    var actTexts = [];
                    acts.forEach(function (a) { actTexts.push(a.textContent.trim()); });
                    dayText += ' — ' + actTexts.join('; ');
                }
                // Meal tags
                var meals = qsa('.s9-mp', day);
                if (meals.length > 0) {
                    var mealTexts = [];
                    meals.forEach(function (m) { mealTexts.push(m.textContent.trim()); });
                    dayText += ' [' + mealTexts.join(', ') + ']';
                }
                itin.push(dayText);
            });
            ctx.push('Itinerary:\n' + itin.join('\n'));
        }

        // Inclusions
        var incItems = qsa('.inclusions li');
        if (incItems.length > 0) {
            var incTexts = [];
            incItems.forEach(function (li) { incTexts.push(li.textContent.trim()); });
            ctx.push('Inclusions: ' + incTexts.join('; '));
        }

        // Exclusions
        var excItems = qsa('.exclusions li');
        if (excItems.length > 0) {
            var excTexts = [];
            excItems.forEach(function (li) { excTexts.push(li.textContent.trim()); });
            ctx.push('Exclusions: ' + excTexts.join('; '));
        }

        // Add-ons
        var addOns = qsa('.list-group-item h6');
        if (addOns.length > 0) {
            var aoTexts = [];
            addOns.forEach(function (h6) {
                var parent = h6.closest('.list-group-item');
                var badge = parent ? parent.querySelector('.badge') : null;
                aoTexts.push(h6.textContent.trim() + (badge ? ' (' + badge.textContent.trim() + ')' : ''));
            });
            ctx.push('Add-ons: ' + aoTexts.join('; '));
        }

        // FAQs (second itinerary block is actually FAQ in these pages)
        var faqSection = null;
        var sectionHeaders = qsa('.section-header');
        var itinCount = 0;
        sectionHeaders.forEach(function (h) {
            if (h.textContent.trim() === 'Itinerary') {
                itinCount++;
                if (itinCount === 2) faqSection = h.parentElement;
            }
        });
        if (faqSection) {
            var faqDays = qsa('.s9-day', faqSection);
            if (faqDays.length > 0) {
                var faqTexts = [];
                faqDays.forEach(function (d) {
                    var q = d.querySelector('.s9-title');
                    var aEls = qsa('.s9-act span', d);
                    if (q) {
                        var aTexts = [];
                        aEls.forEach(function (a) { aTexts.push(a.textContent.trim()); });
                        faqTexts.push('Q: ' + q.textContent.trim() + ' A: ' + aTexts.join(' '));
                    }
                });
                ctx.push('FAQ:\n' + faqTexts.join('\n'));
            }
        }

        // Traveler tips
        var tips = qsa('.glass-card strong');
        var tipTexts = [];
        tips.forEach(function (el) {
            if (['Day planning:', 'Stay connected:', 'Pack smart:', 'Golden hours:'].indexOf(el.textContent.trim()) !== -1) {
                var nextP = el.parentElement.querySelector('p');
                if (nextP) tipTexts.push(el.textContent.trim() + ' ' + nextP.textContent.trim());
            }
        });
        if (tipTexts.length > 0) ctx.push('Tips: ' + tipTexts.join('; '));

        // Cancellation
        var cancelTab = qs('#cancel');
        if (cancelTab) ctx.push('Cancellation: ' + cancelTab.textContent.replace(/\s+/g, ' ').trim());

        return ctx.join('\n\n');
    }

    /* ─── Original System Prompt + auto page context ─────────── */
    function buildSystemPrompt(pkg) {
        var pageContext = scrapePageContext();

        return 'You are Saheli, the friendly and knowledgeable virtual travel assistant for Seven Destination Tour & Travel.\n\n' +
            '## About Seven Destination:\n' +
            '- Company Name: Seven Destination Tour & Travel\n' +
            '- Location: 13/29A Mohanlal Bahalwala Road, Bally, Howrah, West Bengal 711201, India\n' +
            '- Phone: +91 85858 58400\n' +
            '- Email: info@sevendestination.com\n' +
            '- Website: sevendestination.com\n' +
            '- Founded: 2010\n' +
            '- Services: Tour packages, hotel booking, car rental, flight and train ticket booking, visa assistance.\n\n' +
            '## Current page context:\n' +
            '- The visitor is currently viewing the package: ' + pkg + '\n\n' +
            '## Full package details (auto-extracted from current page):\n' +
            pageContext + '\n\n' +
            '## Your duties:\n' +
            '1. Answer travel questions clearly and quickly using the package details above.\n' +
            '2. Help with itinerary ideas, best time to visit, and budget guidance.\n' +
            '3. When answering about this specific package, use the real data from above.\n' +
            '4. Encourage the user to contact the team on WhatsApp or phone for final pricing and booking.\n\n' +
            '## Your limitations:\n' +
            '1. You cannot make actual bookings or payments.\n' +
            '2. You do not have real-time availability or live prices.\n' +
            '3. Keep replies concise, useful, and friendly.\n\n' +
            '## Response style:\n' +
            '- Usually 1 or 2 short sentences.\n' +
            '- Be practical, warm, and fast.\n' +
            '- If the user asks for exact rates or booking, direct them to WhatsApp or call.';
    }

    /* ─── Original Sprites ───────────────────────────────────── */
    var sprites = {
        normal: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/normal.png',
        happy: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/happy.png',
        excited: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/excited.png',
        helpful: 'https://raw.githubusercontent.com/SonuSahani/site-files/refs/heads/main/sprites/helpful.png'
    };

    /* ─── Original Topic Prompts ─────────────────────────────── */
    var topicPrompts = {
        'link-rajasthan': 'Tell me about Royal Rajasthan Heritage tour highlights, duration, and best season.',
        'link-golden': 'Explain the Golden Triangle tour plan, ideal duration, and sightseeing highlights.',
        'link-kolkata': 'Share a short overview of the Kolkata package, ideal trip length, and major experiences.',
        'link-sikkim': 'Give me a short plan for the Sikkim Himalayan Bliss package and best time to visit.',
        'link-darjeeling': 'Tell me the main highlights of the Darjeeling Tea package and ideal travel season.',
        'link-trek': 'Explain the Himalayan Trek option, who it suits, and when to go.',
        'link-goa': 'Tell me about the Goa Beach Paradise package highlights and budget guidance.',
        'link-kerala': 'Explain the Kerala Backwaters trip, best time, and who it suits.',
        'link-south': 'Tell me about the South India Temple tour route, duration, and best time.',
        'book-economy-car': 'Explain economy car rental options from Seven Destination and what details are needed to book.',
        'book-luxury-car': 'Explain luxury car rental options from Seven Destination and who usually books them.',
        'book-group-car': 'Explain group transport options like tempo traveller or bus and what details are needed.'
    };

    /* ─── Original Dialogue Tree (exact text & choices) ──────── */
    function buildDialogues(pkg) {
        return {
            greeting: {
                text: "Hello! I'm Saheli, your travel assistant. Want help with " + pkg + " or another trip?",
                sprite: 'normal',
                choices: [
                    { text: 'Book Now', action: 'start-booking-wiz' },
                    { text: 'This Package', action: 'package-details' },
                    { text: 'Plan a Trip', next: 'plan-trip' },
                    { text: 'Book Transport', next: 'transport-info' }
                ]
            },
            'plan-trip': {
                text: 'Exciting! What kind of experience are you looking for?',
                sprite: 'happy',
                choices: [
                    { text: 'Heritage & Culture', next: 'heritage-tours' },
                    { text: 'Hills & Mountains', next: 'hill-tours' },
                    { text: 'Beaches & Relax', next: 'beach-tours' },
                    { text: 'Spiritual Journey', next: 'spiritual-tours' },
                    { text: 'Back', next: 'greeting' }
                ]
            },
            'heritage-tours': {
                text: 'Great choice! Here are some strong heritage ideas:',
                sprite: 'excited',
                choices: [
                    { text: 'Rajasthan (8D/7N)', action: 'link-rajasthan' },
                    { text: 'Golden Triangle (6D/5N)', action: 'link-golden' },
                    { text: 'Kolkata (4D/3N)', action: 'link-kolkata' },
                    { text: 'Back', next: 'plan-trip' }
                ]
            },
            'hill-tours': {
                text: 'The mountains are calling. Try one of these:',
                sprite: 'excited',
                choices: [
                    { text: 'Sikkim Bliss', action: 'link-sikkim' },
                    { text: 'Darjeeling Tea', action: 'link-darjeeling' },
                    { text: 'Himalayan Trek', action: 'link-trek' },
                    { text: 'Back', next: 'plan-trip' }
                ]
            },
            'beach-tours': {
                text: 'Sun, sand, and sea. Here are easy beach picks:',
                sprite: 'happy',
                choices: [
                    { text: 'Goa Paradise', action: 'link-goa' },
                    { text: 'Kerala Backwaters', action: 'link-kerala' },
                    { text: 'Ask AI for more', action: 'package-ai' },
                    { text: 'Back', next: 'plan-trip' }
                ]
            },
            'spiritual-tours': {
                text: 'Divine journeys always need good planning.',
                sprite: 'helpful',
                choices: [
                    { text: 'South India Temple', action: 'link-south' },
                    { text: 'Ask on WhatsApp', action: 'whatsapp' },
                    { text: 'Back', next: 'plan-trip' }
                ]
            },
            'transport-info': {
                text: 'Need a ride? We arrange economy, luxury, and group transport.',
                sprite: 'helpful',
                choices: [
                    { text: 'Economy Car', action: 'book-economy-car' },
                    { text: 'Luxury Sedan', action: 'book-luxury-car' },
                    { text: 'Group Transport', action: 'book-group-car' },
                    { text: 'Back', next: 'greeting' }
                ]
            },
            'more-options': {
                text: 'How else can I help you today?',
                sprite: 'normal',
                choices: [
                    { text: 'Current Package', action: 'package-details' },
                    { text: 'Contact', next: 'contact' },
                    { text: 'AI Chat', action: 'package-ai' },
                    { text: 'Back', next: 'greeting' }
                ]
            },
            contact: {
                text: 'Reach us on WhatsApp or call directly for final pricing, availability, and quick booking help.',
                sprite: 'helpful',
                choices: [
                    { text: 'Call Now', action: 'call' },
                    { text: 'WhatsApp', action: 'whatsapp' },
                    { text: 'Ask AI', action: 'package-ai' },
                    { text: 'Back', next: 'greeting' }
                ]
            }
        };
    }

    /* ─── Original sprite detection ──────────────────────────── */
    function detectSpriteFromContent(text) {
        var lt = text.toLowerCase();
        if (['amazing', 'perfect', 'best', 'exciting', 'great', 'wonderful'].some(function (w) { return lt.indexOf(w) !== -1; })) return 'excited';
        if (['help', 'guide', 'contact', 'itinerary', 'plan', 'details'].some(function (w) { return lt.indexOf(w) !== -1; })) return 'helpful';
        if (['happy', 'glad', 'welcome', 'enjoy', 'beautiful'].some(function (w) { return lt.indexOf(w) !== -1; })) return 'happy';
        return 'normal';
    }

    /* ─── Original link processing ───────────────────────────── */
    function addTextWithLinks(raw) {
        var p = raw;
        if (p.indexOf('<a href=') !== -1) return p;
        p = p.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
        p = p.replace(/WhatsApp\s+(\+?\d{10,})/gi, '<a href="https://wa.me/$1" target="_blank" rel="noopener">WhatsApp $1</a>');
        p = p.replace(/(?<!["\\d])(\+?\d{10,})(?!["\\d])/g, '<a href="tel:$1">$1</a>');
        return p;
    }

    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function getFriendlyChatError(err) {
        var raw = (err && err.message ? String(err.message) : '').trim();
        var msg = raw.toLowerCase();

        if (!raw) {
            return 'I am having trouble connecting right now. Please try again or contact us on WhatsApp for quick help.';
        }

        if (msg.indexOf('quota') !== -1 || msg.indexOf('rate limit') !== -1 || msg.indexOf('billing') !== -1) {
            return 'AI is connected, but the current Gemini API key has no quota available right now. Please update the Gemini key in Supabase secrets or try again later.';
        }

        if (msg.indexOf('not configured') !== -1 || msg.indexOf('gemini_api_keys') !== -1) {
            return 'AI backend is live, but Gemini API keys are not configured in Supabase secrets yet.';
        }

        if (msg.indexOf('invalid jwt') !== -1 || msg.indexOf('missing authorization header') !== -1 || msg.indexOf('401') !== -1) {
            return 'The chatbot backend is live, but the page is missing the correct Supabase auth setup.';
        }

        return raw.length > 220
            ? raw.slice(0, 220) + '...'
            : raw;
    }

    /* ═══════════════════════════════════════════════════════════════
       BUILD WIDGET DOM
       ═══════════════════════════════════════════════════════════════ */
    function buildWidget() {
        var old = qs('.vn-chatbot-container');
        if (old) old.remove();
        // also remove any previous instance
        var prev = qs('#sbChatbot');
        if (prev) prev.remove();

        var w = document.createElement('div');
        w.className = 'sb-chatbot';
        w.id = 'sbChatbot';

        w.innerHTML =
            // Overlay removed
            '<div class="sb-fab-promo" id="sbFabPromo">Book from chat & get ₹500 off!</div>' +
            '<button class="sb-fab" id="sbFab" aria-label="Open Saheli chat" type="button">' +
            '  <i class="fas fa-comments sb-fab-icon"></i>' +
            '  <span class="sb-badge" id="sbBadge" style="display:none">1</span>' +
            '</button>' +

            '<div class="sb-panel" id="sbPanel" role="dialog" aria-label="Saheli Chat">' +

            '  <div class="sb-header">' +
            '    <div class="sb-header-avatar" id="sbAvatar">' +
            '      <img src="' + sprites.normal + '" alt="Saheli">' +
            '    </div>' +
            '    <div class="sb-header-info">' +
            '      <h4 class="sb-header-name">Saheli</h4>' +
            '      <div class="sb-header-status">Online</div>' +
            '    </div>' +
            '    <div class="sb-header-actions">' +
            '      <button class="sb-header-btn" id="sbResetBtn" title="New chat" type="button"><i class="fas fa-rotate-right"></i></button>' +
            '      <button class="sb-header-btn" id="sbMinBtn" title="Close" type="button"><i class="fas fa-chevron-down"></i></button>' +
            '    </div>' +
            '  </div>' +

            '  <div class="sb-quick-bar" id="sbQuickBar">' +
            '    <button class="sb-quick-btn sb-whatsapp" id="sbQWA" type="button"><i class="fab fa-whatsapp"></i> WhatsApp</button>' +
            '    <button class="sb-quick-btn sb-call" id="sbQCall" type="button"><i class="fas fa-phone"></i> Call</button>' +
            '    <button class="sb-quick-btn" id="sbQAI" type="button"><i class="fas fa-robot"></i> AI Chat</button>' +
            '    <button class="sb-quick-btn" id="sbQBack" type="button" style="display:none"><i class="fas fa-arrow-left"></i> Back</button>' +
            '  </div>' +

            '  <div class="sb-messages" id="sbMsgs"></div>' +

            '  <div class="sb-input-area" id="sbInputArea" style="display:none">' +
            '    <div class="sb-input-row">' +
            '      <input class="sb-input" id="sbInput" type="text" placeholder="Ask Saheli anything about travel..." autocomplete="off">' +
            '      <button class="sb-send" id="sbSendBtn" type="button" aria-label="Send"><i class="fas fa-paper-plane"></i></button>' +
            '    </div>' +
            '    <div class="sb-input-hint">AI can make mistakes. All bookings will be verified by a human agent before payment.</div>' +
            '  </div>' +

            '</div>';

        document.body.appendChild(w);
    }

    /* ═══════════════════════════════════════════════════════════════
       MAIN
       ═══════════════════════════════════════════════════════════════ */
    function init() {
        buildWidget();

        var pagePackageName = getPackageName();
        var SYSTEM_PROMPT = buildSystemPrompt(pagePackageName);
        var dialogues = buildDialogues(pagePackageName);

        /* refs */
        var fab = qs('#sbFab');
        var panel = qs('#sbPanel');
        var badge = qs('#sbBadge');
        var msgs = qs('#sbMsgs');
        var inp = qs('#sbInput');
        var sendBtn = qs('#sbSendBtn');
        var inputArea = qs('#sbInputArea');
        var quickBar = qs('#sbQuickBar');
        var qWA = qs('#sbQWA');
        var qCall = qs('#sbQCall');
        var qAI = qs('#sbQAI');
        var qBack = qs('#sbQBack');
        var avatar = qs('#sbAvatar');
        var resetBtn = qs('#sbResetBtn');
        var minBtn = qs('#sbMinBtn');

        /* state */
        var isOpen = false;
        var isAIMode = false;
        var historyStack = [];
        var conversationHistory = [];
        var currentState = 'greeting';
        var typingTimer = null;
        var isBookingMode = false;
        var bookingData = {};
        var bookingStep = 0;

        /* ── open/close ─────── */
        function doOpen() {
            isOpen = true;
            fab.style.display = 'none';
            if (qs('#sbFabPromo')) qs('#sbFabPromo').style.display = 'none';
            panel.classList.add('active');
            badge.style.display = 'none';
        }

        function doClose() {
            isOpen = false;
            fab.style.display = '';
            if (qs('#sbFabPromo')) qs('#sbFabPromo').style.display = '';
            panel.classList.remove('active');
        }

        /* ── sprite ─────── */
        function setSprite(key) {
            var src = sprites[key] || sprites.normal;
            var img = avatar.querySelector('img');
            if (img) { img.src = src; img.alt = 'Saheli (' + key + ')'; }
        }

        /* ── scroll ─────── */
        function scroll() {
            requestAnimationFrame(function () { msgs.scrollTop = msgs.scrollHeight; });
        }

        /* ── bot message with typewriter ─────── */
        function botMsg(text, callback) {
            var html = addTextWithLinks(text);
            var curSrc = (avatar.querySelector('img') || {}).src || sprites.normal;

            var wrap = document.createElement('div');
            wrap.className = 'sb-msg sb-bot';
            wrap.innerHTML =
                '<div class="sb-msg-avatar"><img src="' + curSrc + '" alt="Saheli" style="width:100%;height:100%;object-fit:scale-down;transform:scale(1.35) translateY(4px)"></div>' +
                '<div class="sb-msg-body">' +
                '  <div class="sb-msg-bubble"></div>' +
                '  <div class="sb-msg-time">' + stamp() + '</div>' +
                '</div>';
            msgs.appendChild(wrap);
            scroll();

            var bubble = wrap.querySelector('.sb-msg-bubble');

            if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }

            var i = 0;
            bubble.setAttribute('aria-busy', 'true');

            function step() {
                if (i >= html.length) {
                    bubble.removeAttribute('aria-busy');
                    highlightBtns(text);
                    if (callback) callback();
                    return;
                }
                if (html[i] === '<') {
                    var j = i;
                    while (j < html.length && html[j] !== '>') j++;
                    j++;
                    bubble.innerHTML += html.slice(i, j);
                    i = j;
                    step();
                    return;
                }
                bubble.innerHTML += html[i];
                i++;
                typingTimer = setTimeout(step, 20);
            }
            step();
        }

        /* ── user message ─────── */
        function userMsg(text) {
            var wrap = document.createElement('div');
            wrap.className = 'sb-msg sb-user';
            wrap.innerHTML =
                '<div class="sb-msg-avatar"><i class="fas fa-user"></i></div>' +
                '<div class="sb-msg-body">' +
                '  <div class="sb-msg-bubble">' + escHtml(text) + '</div>' +
                '  <div class="sb-msg-time">' + stamp() + '</div>' +
                '</div>';
            msgs.appendChild(wrap);
            scroll();
        }

        /* ── typing dots ─────── */
        function showDots() {
            var curSrc = (avatar.querySelector('img') || {}).src || sprites.normal;
            var el = document.createElement('div');
            el.className = 'sb-msg sb-bot';
            el.id = 'sbDots';
            el.innerHTML =
                '<div class="sb-msg-avatar"><img src="' + curSrc + '" alt="Saheli" style="width:100%;height:100%;object-fit:scale-down;transform:scale(1.35) translateY(4px)"></div>' +
                '<div class="sb-msg-body">' +
                '  <div class="sb-msg-bubble sb-typing">' +
                '    <div class="sb-typing-dot"></div><div class="sb-typing-dot"></div><div class="sb-typing-dot"></div>' +
                '  </div>' +
                '</div>';
            msgs.appendChild(el);
            scroll();
        }

        function hideDots() {
            var d = qs('#sbDots');
            if (d) d.remove();
        }

        /* ── render choice chips ─────── */
        function renderChoices(choices) {
            var c = document.createElement('div');
            c.className = 'sb-chips';
            choices.forEach(function (ch) {
                var btn = document.createElement('button');
                btn.className = 'sb-chip';
                btn.type = 'button';
                btn.textContent = ch.text;
                btn.addEventListener('click', function () {
                    if (ch.action) { handleAction(ch.action); return; }
                    if (ch.next) { historyStack.push(currentState); showDialogue(ch.next); }
                });
                c.appendChild(btn);
            });
            msgs.appendChild(c);
            scroll();
        }

        /* ── render AI suggestion chips inside msgs ─────── */
        function renderAISuggestions() {
            var c = document.createElement('div');
            c.className = 'sb-chips';
            var suggestions = [
                'Tell me about ' + pagePackageName,
                'Best time to visit Darjeeling?',
                'Create a 5-day Kerala itinerary'
            ];
            suggestions.forEach(function (txt) {
                var btn = document.createElement('button');
                btn.className = 'sb-chip';
                btn.type = 'button';
                btn.textContent = txt;
                btn.addEventListener('click', function () {
                    inp.value = txt;
                    callGemini(txt);
                });
                c.appendChild(btn);
            });
            msgs.appendChild(c);
            scroll();
        }

        /* ── highlight quick buttons (original) ─────── */
        function highlightBtns(text) {
            var lt = text.toLowerCase();
            if (lt.indexOf('whatsapp') !== -1) {
                qWA.classList.add('sb-highlight');
                setTimeout(function () { qWA.classList.remove('sb-highlight'); }, 1500);
            }
            if (lt.indexOf('call') !== -1) {
                qCall.classList.add('sb-highlight');
                setTimeout(function () { qCall.classList.remove('sb-highlight'); }, 1500);
            }
            if (lt.indexOf('ai') !== -1) {
                qAI.classList.add('sb-highlight');
                setTimeout(function () { qAI.classList.remove('sb-highlight'); }, 1500);
            }
        }

        /* ── show dialogue (original logic) ─────── */
        function showDialogue(key) {
            var dlg = dialogues[key] || dialogues.greeting;
            currentState = key;
            setSprite(dlg.sprite);

            qBack.style.display = (historyStack.length > 0 && key !== 'greeting') ? '' : 'none';

            botMsg(dlg.text, function () {
                renderChoices(dlg.choices);
            });
        }

        /* ── WhatsApp summary (original) ─────── */
        function buildWASummary(prefix) {
            var text = prefix || ('Hi Seven Destination, I want details for ' + pagePackageName + '.');
            if (conversationHistory.length > 0) {
                var recent = conversationHistory.slice(-6);
                var sum = '\n\nUser Chat History:\n';
                recent.forEach(function (m) {
                    var role = m.role === 'user' ? 'User' : 'Saheli';
                    var snippet = (m.parts[0].text || '').substring(0, 100);
                    sum += role + ': ' + snippet + '\n';
                });
                text += sum;
            }
            return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
        }

        /* ── booking modal (original) ─────── */
        function openBookingModal() {
            var trigger = document.querySelector('[data-bs-target="#bookingModal"]');
            if (trigger) { trigger.click(); return true; }
            return false;
        }

        /* ── enter AI mode (original logic) ─────── */
        function enterAIMode(prefill, autoSend) {
            isAIMode = true;
            inputArea.style.display = '';
            qAI.style.background = 'linear-gradient(135deg, #00c853, #00a844)';
            qAI.style.borderColor = 'rgba(0,200,83,0.3)';
            qAI.style.color = '#fff';
            setSprite('excited');
            conversationHistory = [];

            botMsg("Hi! I'm Saheli with AI superpowers. Ask me anything about " + pagePackageName + " or any other trip.", function () {
                renderAISuggestions();
            });

            if (prefill) {
                inp.value = prefill;
            } else {
                inp.value = '';
            }
            inp.focus();
            if (prefill && autoSend) {
                callGemini(prefill);
            }
        }

        /* ── exit AI mode (original logic) ─────── */
        function exitAIMode() {
            if (!isAIMode) return;
            isAIMode = false;
            inputArea.style.display = 'none';
            qAI.style.background = '';
            qAI.style.borderColor = '';
            qAI.style.color = '';
            msgs.innerHTML = '';
            showDialogue('greeting');
        }

        /* ── Gemini API (Direct with Key Rotation) ─────── */
        function callGemini(userMessage) {
            conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });
            userMsg(userMessage);
            showDots();
            setSprite('helpful');
            sendBtn.disabled = true;

            if (!AI_API_URL) {
                hideDots();
                botMsg('AI chat is not configured yet. Please connect the chatbot API first.');
                setSprite('normal');
                sendBtn.disabled = false;
                inp.focus();
                return;
            }

            var headers = { 'Content-Type': 'application/json' };
            if (SAHELI_SUPABASE_ANON_KEY) {
                headers.apikey = SAHELI_SUPABASE_ANON_KEY;
                headers.Authorization = 'Bearer ' + SAHELI_SUPABASE_ANON_KEY;
            }

            fetch(AI_API_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    messages: conversationHistory,
                    systemInstruction: SYSTEM_PROMPT
                })
            })
            .then(function (res) {
                return res.json()
                    .catch(function () { return {}; })
                    .then(function (data) {
                        if (!res.ok) {
                            throw new Error(data.error || data.message || ('API Error: ' + res.status));
                        }
                        return data;
                    });
            })
            .then(function (data) {
                var aiText = data.reply
                    || (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text)
                    || 'I could not think of a response right now.';
                conversationHistory.push({ role: 'model', parts: [{ text: aiText }] });
                hideDots();
                botMsg(aiText, function () {
                    setSprite(detectSpriteFromContent(aiText));
                });
                sendBtn.disabled = false;
                inp.focus();
            })
            .catch(function (err) {
                hideDots();
                console.error('Chat API error:', err);
                botMsg(getFriendlyChatError(err));
                setSprite('normal');
                sendBtn.disabled = false;
                inp.focus();
            });
        }

        /* ── handle action (original logic) ─────── */
        function handleAction(action) {
            if (!action) return;

            if (action === 'call') {
                window.location.href = 'tel:' + CONTACT_PHONE;
                return;
            }
            if (action === 'whatsapp') {
                window.open(buildWASummary(), '_blank');
                return;
            }
            if (action === 'package-details') {
                enterAIMode('Tell me about ' + pagePackageName + '. Share the main highlights, best time to visit, and who this package is best for.', true);
                return;
            }
            if (action === 'package-ai') {
                enterAIMode('Help me plan ' + pagePackageName + '. Share itinerary ideas, best time to visit, and rough budget guidance.', false);
                return;
            }
            if (action === 'start-booking') {
                if (!openBookingModal()) {
                    window.open(buildWASummary('Hi Seven Destination, I want to book ' + pagePackageName + '. Please guide me.'), '_blank');
                }
                return;
            }
            if (action === 'start-booking-wiz') {
                startBookingWizard();
                return;
            }
            if (topicPrompts[action]) {
                enterAIMode(topicPrompts[action], true);
                return;
            }
            var contactEl = document.getElementById('contact');
            if ((action === 'view-packages' || action === 'view-reviews') && contactEl) {
                contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                doClose();
                return;
            }
        }

        /* ── auto booking wizard ─────── */
        function startBookingWizard() {
            if (isAIMode) exitAIMode(); // Safety
            isBookingMode = true;
            bookingData = { package: pagePackageName };
            bookingStep = 0;
            inputArea.style.display = '';
            qAI.style.background = '';
            qAI.style.borderColor = '';
            qAI.style.color = '';
            setSprite('happy');
            msgs.innerHTML = '';
            botMsg('Let\'s book your ' + pagePackageName + ' tour! First, could you tell me your full name?', function() {
                inp.value = '';
                inp.focus();
            });
        }

        function handleBookingInput(text) {
            userMsg(text);
            if (bookingStep === 0) {
                bookingData.name = text;
                botMsg('Nice to meet you, ' + text + '! What is your phone or WhatsApp number?');
                bookingStep++;
            } else if (bookingStep === 1) {
                bookingData.phone = text;
                botMsg('Got it. What date are you planning to start your trip? (e.g., 15 Oct 2026)');
                bookingStep++;
            } else if (bookingStep === 2) {
                bookingData.date = text;
                botMsg('Great. How many people will be traveling in total?');
                bookingStep++;
            } else if (bookingStep === 3) {
                bookingData.pax = text;
                var summary = 'Here is your booking summary:<br>• Name: ' + bookingData.name + '<br>• Phone: ' + bookingData.phone + '<br>• Date: ' + bookingData.date + '<br>• Travelers: ' + bookingData.pax + '<br><br>Should I confirm this booking?';
                botMsg(summary, function() {
                    var c = document.createElement('div');
                    c.className = 'sb-chips';
                    var yBtn = document.createElement('button');
                    yBtn.className = 'sb-chip'; yBtn.textContent = 'Yes, Confirm';
                    yBtn.addEventListener('click', submitBooking);
                    var nBtn = document.createElement('button');
                    nBtn.className = 'sb-chip'; nBtn.textContent = 'Cancel';
                    nBtn.addEventListener('click', resetAll);
                    c.appendChild(yBtn); c.appendChild(nBtn);
                    msgs.appendChild(c);
                    scroll();
                });
                inputArea.style.display = 'none'; // hide input to force chip choice
                bookingStep++;
            }
        }

        function submitBooking() {
            botMsg('Saving your booking request securely in our backend...');
            showDots();

            if (!BOOKING_API_URL) {
                hideDots();
                botMsg('Booking backend is not configured yet. Please contact us on WhatsApp for now.');
                setTimeout(function() { resetAll(); }, 4000);
                return;
            }

            var bd = {
                package: bookingData.package,
                name: bookingData.name,
                phone: bookingData.phone,
                date: bookingData.date,
                pax: bookingData.pax,
                source: 'saheli-chatbot',
                pageUrl: window.location.href,
                meta: {
                    pageTitle: document.title || pagePackageName
                }
            };

            var headers = {
                'Content-Type': 'application/json'
            };
            if (SAHELI_SUPABASE_ANON_KEY) {
                headers.apikey = SAHELI_SUPABASE_ANON_KEY;
                headers.Authorization = 'Bearer ' + SAHELI_SUPABASE_ANON_KEY;
            }

            fetch(BOOKING_API_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bd)
            })
            .then(function(res) {
                return res.json()
                    .catch(function () { return {}; })
                    .then(function (data) {
                        if (!res.ok) {
                            throw new Error(data.error || data.message || 'Booking failed');
                        }
                        return data;
                    });
            })
            .then(function(data) {
                bookingData.bookingRef = data.bookingRef || '';
                hideDots();
                botMsg('Your booking lead has been saved. Reference: ' + (bookingData.bookingRef || 'pending') + '. Our team will verify availability and contact you shortly.', function() {
                    generateInvoicePDF();
                    setTimeout(function() { resetAll(); }, 6000);
                });
            })
            .catch(function(err) {
                hideDots();
                console.error('Backend booking error:', err);
                botMsg('Sorry, there was an error saving your booking request in our backend. Please chat with us on WhatsApp instead.');
                setTimeout(function() { resetAll(); }, 4000);
            });
        }

        function generateInvoicePDF() {
            if (!window.jspdf) {
                var s = document.createElement('script');
                s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                s.onload = doPDFGeneration;
                document.head.appendChild(s);
            } else {
                doPDFGeneration();
            }
        }

        var PDF_LOGO_URL = 'https://i0.wp.com/www.sevendestination.com/wp-content/uploads/2025/10/seven-destination.png?w=800';
        var PDF_COMPANY_NAME = 'Seven Destination';
        var PDF_CONTACT_NAME = 'Vivek Sharma';
        var PDF_ADDRESS = '13, 29,A, Mohanlal Bahalwalla Rd, Belur, Bally, Howrah, West Bengal 711201';
        var PDF_PHONE = '085858 58400';
        var PDF_EMAIL = 'email@sevendestination.com';

        function sanitizePdfText(value) {
            return String(value || '')
                .replace(/\u20B9/g, 'Rs. ')
                .replace(/[•]/g, '-')
                .replace(/\s+/g, ' ')
                .trim();
        }

        function writeWrappedPdfText(doc, text, x, y, maxWidth, lineHeight) {
            var lines = doc.splitTextToSize(sanitizePdfText(text), maxWidth);
            doc.text(lines, x, y);
            return y + (lines.length * lineHeight);
        }

        function loadPdfImageData(url) {
            return new Promise(function (resolve) {
                if (!url) {
                    resolve(null);
                    return;
                }

                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    try {
                        var canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth || img.width;
                        canvas.height = img.naturalHeight || img.height;
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    } catch (_error) {
                        resolve(null);
                    }
                };
                img.onerror = function () {
                    resolve(null);
                };
                img.src = url;
            });
        }

        async function doPDFGeneration() {
            var jsPDF = window.jspdf.jsPDF;
            var doc = new jsPDF();
            var logoDataUrl = await loadPdfImageData(PDF_LOGO_URL);
            var priceEl = qs('.price-tag');
            var priceText = sanitizePdfText(priceEl ? priceEl.textContent : 'TBD');
            var lineY = 62;

            if (logoDataUrl) {
                try {
                    doc.addImage(logoDataUrl, 'PNG', 20, 14, 26, 26);
                } catch (_error) {
                    logoDataUrl = null;
                }
            }

            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.setTextColor(245, 130, 32);
            doc.text(PDF_COMPANY_NAME, logoDataUrl ? 52 : 20, 24);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Contact: ' + sanitizePdfText(PDF_CONTACT_NAME), logoDataUrl ? 52 : 20, 31);
            doc.text('Phone: ' + sanitizePdfText(PDF_PHONE), logoDataUrl ? 52 : 20, 37);
            doc.text('Email: ' + sanitizePdfText(PDF_EMAIL), logoDataUrl ? 52 : 20, 43);
            writeWrappedPdfText(doc, 'Address: ' + PDF_ADDRESS, logoDataUrl ? 52 : 20, 49, logoDataUrl ? 138 : 170, 5);

            doc.setDrawColor(230, 230, 230);
            doc.line(20, 56, 190, 56);

            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text("Proforma Invoice & Booking Request", 20, 62);
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            lineY = writeWrappedPdfText(doc, "Package: " + bookingData.package, 20, lineY + 10, 170, 7);
            doc.setFontSize(12);
            doc.text(sanitizePdfText("Booking Ref: " + (bookingData.bookingRef || "Pending")), 20, lineY + 3);
            doc.text(sanitizePdfText("Name: " + bookingData.name), 20, lineY + 10);
            doc.text(sanitizePdfText("Phone: " + bookingData.phone), 20, lineY + 17);
            doc.text(sanitizePdfText("Travel Date: " + bookingData.date), 20, lineY + 24);
            doc.text(sanitizePdfText("Travelers: " + bookingData.pax), 20, lineY + 31);
            lineY = writeWrappedPdfText(doc, "Est. Base Price: " + priceText + " (Subject to final confirmation)", 20, lineY + 38, 170, 6);
            
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            writeWrappedPdfText(doc, "Thank you for choosing Seven Destination. Our team will contact you shortly.", 20, lineY + 10, 170, 5);

            doc.save((bookingData.bookingRef || ("Booking_" + bookingData.name.replace(/\s+/g, '_'))) + ".pdf");
        }

        /* ── reset ─────── */
        function resetAll() {
            if (isAIMode) {
                isAIMode = false;
                inputArea.style.display = 'none';
                qAI.style.background = '';
                qAI.style.borderColor = '';
                qAI.style.color = '';
            }
            if (isBookingMode) {
                isBookingMode = false;
                bookingStep = 0;
                inputArea.style.display = 'none';
            }
            historyStack = [];
            conversationHistory = [];
            msgs.innerHTML = '';
            showDialogue('greeting');
        }

        /* ═══════════════════════════════════════════════════════
           EVENTS
           ═══════════════════════════════════════════════════════ */

        fab.addEventListener('click', function (e) {
            e.stopPropagation();
            if (isOpen) {
                if (isAIMode) exitAIMode();
                doClose();
            } else {
                doOpen();
                resetAll();
            }
        });

        // overlay removed

        minBtn.addEventListener('click', function () {
            if (isAIMode) exitAIMode();
            doClose();
        });

        resetBtn.addEventListener('click', function () {
            resetAll();
        });

        qWA.addEventListener('click', function () { handleAction('whatsapp'); });
        qCall.addEventListener('click', function () { handleAction('call'); });

        qAI.addEventListener('click', function () {
            if (isAIMode) { exitAIMode(); return; }
            enterAIMode('', false);
        });

        qBack.addEventListener('click', function () {
            if (isAIMode) { exitAIMode(); return; }
            var prev = historyStack.pop() || 'greeting';
            msgs.innerHTML = '';
            showDialogue(prev);
        });

        sendBtn.addEventListener('click', function () {
            var v = inp.value.trim();
            if (!v) return;
            inp.value = '';
            
            if (isBookingMode) {
                handleBookingInput(v);
                return;
            }
            
            callGemini(v);
        });

        inp.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                if (isAIMode) exitAIMode();
                doClose();
            }
        });

        msgs.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                var href = e.target.getAttribute('href');
                if (href.indexOf('tel:') === 0 || href.indexOf('https://wa.me/') === 0) {
                    window.open(href, '_blank');
                } else if (href.indexOf('#') === 0) {
                    var t = document.querySelector(href);
                    if (t) t.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.open(href, '_blank');
                }
            }
        });

        /* badge after 3s */
        setTimeout(function () {
            if (!isOpen) badge.style.display = 'flex';
        }, 3000);
    }

    /* ─── Start ──────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
