# Implementation Plan — Indian Wedding Invitation Website

Premium, mobile-first single-page wedding invitation inspired by sadarnimantran.in. Vanilla HTML5/CSS3/JS only. File structure: index.html, css/styles.css, js/script.js, assets/.

---

- [ ] 1. Create index.html with the full HTML5 skeleton and all 12 sections in order.
      Set up the document with: `<!DOCTYPE html>`, lang="en", meta charset/viewport, Google Fonts preconnect + link for Playfair Display (400/700) and Cormorant Garamond (400/400i/600), link to css/styles.css, and a deferred script tag for js/script.js. The `<body>` contains: a `#loader` overlay div, a fixed `.music-toggle` button (with 3 `<span>` bar elements inside), and a `<main>` wrapping all sections. Between each `</section>` and next `<section>`, place a `<div class="section-divider">` containing an inline SVG ornamental flourish (a mandala-inspired horizontal rule with a central diamond/lotus — pure SVG path, no images).

      **Section 1 — Hero:** `<section id="hero" class="section hero">`. Inner `<div class="hero-bg">` for parallax target. Container with: `<p class="hero-subtitle">Shubh Vivah</p>`, `<h1>Arjun <span class="weds-text">weds</span> Meera</h1>`, `<p class="hero-location">Udaipur, Rajasthan</p>`. Full-viewport height.

      **Section 2 — Ganesh Vandana:** `<section id="blessing" class="section blessing reveal">`. `<p class="sanskrit">॥ श्री गणेशाय नमः ॥</p>`. `<p class="mantra">` with two `<span>` lines: "Vakratunda mahakaya, suryakoti samaprabha." and "Nirvighnam kuru me deva, sarva karyeshu sarvada." `<p class="blessing-text">With the blessings of our elders and the love of our families</p>`.

      **Section 3 — Couple Introduction:** `<section id="couple" class="section couple">`. `<div class="couple-cards">` containing: groom card (`<div class="couple-card groom reveal">`) with `<p class="honorific">Chi.</p>`, `<h2>Arjun</h2>`, three `<p>` (Grandson of Late Shri Om Prakash & Smt. Kamla Khanna / Son of Smt. Ritu & Shri Rajeev Khanna / Greater Kailash II, New Delhi); `<div class="weds-divider">weds</div>` with an inline SVG flourish; bride card (`<div class="couple-card bride reveal">`) with `<p class="honorific">Sau. Kan.</p>`, `<h2>Meera</h2>`, three `<p>` (Granddaughter of Smt. Shakuntala & Shri Har Prasad Saxena / Daughter of Smt. Anjali & Shri Alok Saxena / Gomti Nagar, Lucknow).

      **Section 4 — Our Story:** `<section id="our-story" class="section our-story">`. `<h2>Our Story</h2>`. `<div class="timeline">` with 5 `.timeline-item.reveal` divs, each containing `.timeline-dot`, `.timeline-content` with `<span class="timeline-date">`, `<h3>`, and `<p>`. Milestones (exact text): (1) First Met / September 2019 / "A mutual friend's Diwali party in Delhi. Arjun spilled chai, Meera laughed." (2) First Date / December 2019 / "A long walk through Lodhi Garden, talking until the guards shooed them out." (3) The Trip / March 2021 / "Backpacking through Himachal. Somewhere near Kasol, they knew." (4) The Proposal / November 2025 / "Under the stars at Fateh Sagar Lake, Udaipur. She said yes before he finished asking." (5) The Wedding / February 2027 / "And now, the beginning of forever."

      **Section 5 — Save the Date:** `<section id="save-the-date" class="section save-the-date reveal">`. `<h2>Save the Date</h2>`. `<p>Scratch the three hearts to reveal our day</p>`. `<div class="scratch-cards">` with 3 `<div class="scratch-card-wrapper">` each containing a `<canvas>` (data-label="Day"/"Month"/"Year", width="150" height="150") and a `<span class="scratch-label">`. Below: `<div class="date-reveal">` (hidden by default) with `<p class="reveal-date">Friday, 19 February 2027</p>` and `<p class="reveal-muhurat">Phere at the muhurat of 11:40 pm</p>`.

      **Section 6 — Countdown:** `<section id="countdown" class="section countdown reveal">`. `<div class="countdown-boxes">` with 4 `.countdown-box` divs: `<span class="countdown-number" id="countdown-days">00</span><span class="countdown-label">Days</span>`, same for hours/minutes/seconds.

      **Section 7 — Events:** `<section id="events" class="section events">`. `<p class="events-subtitle">18 to 19 February</p>`, `<h2>The Functions</h2>`. Three `<article class="event-card reveal stagger-N">`: (a) Haldi — `<h3>Haldi</h3>`, `<p class="event-datetime">Thursday, 18 February 2027</p>`, `<p class="event-time">10:30 am</p>`, `<p class="event-venue">The Lake Lawns, Phool Mahal Bagh</p>`, `<p class="event-desc">Marigolds, a dholki and a great deal of turmeric. Wear something you will not miss.</p>`, `<p class="dress-code"><span>Dress</span> Shades of yellow</p>`, `<a class="directions-link" href="https://www.google.com/maps/search/?api=1&query=Fateh+Sagar+Lake+Udaipur" target="_blank">Directions</a>`. (b) Mehndi & Sangeet — same structure, 5:30 pm, The Rose Courtyard, Phool Mahal Bagh, "Henna for the hands, songs for the heart, and both families on one dance floor.", dress: Pastels, pinks and greens. (c) Baraat & Shubh Vivah — same structure, The main celebration / 6:30 pm, Phool Mahal Bagh Fateh Sagar Road, "The baraat sets off at 6:30, jaimala at 8, and phere under the stars at 11:40.", dress: Your festive best.

      **Section 8 — Families:** `<section id="families" class="section families">`. `<p>The families</p>`, `<h2>Two families, one celebration</h2>`. Two `.family-card.reveal` in a grid: Groom's — "The Khannas", Smt. Ritu & Shri Rajeev Khanna, Greater Kailash II, New Delhi. Bride's — "The Saxenas", Smt. Anjali & Shri Alok Saxena, Gomti Nagar, Lucknow. Then `.family-role-group` for Darshanabhilashi (Rajeev/Sanjeev/Rakesh Khanna) and Swagatotsuk (Kabir, Tanya, Ishaan, Riya and the whole Khanna family). `<p class="family-closing">Delhi and Lucknow, one family from now on.</p>`.

      **Section 9 — Moments/Gallery:** `<section id="moments" class="section moments">`. `<p>Moments</p>`, `<h2>A few moments so far</h2>`. `.gallery-grid` with 4 `<figure class="gallery-item reveal stagger-N">`: each has `.gallery-placeholder` (styled card, no image dependency) and `<figcaption>`. Captions: "Under the rose arch", "Haldi morning", "Mehndi and sangeet", "The baraat arrives".

      **Section 10 — Venue & Travel:** `<section id="venue" class="section venue">`. `<p>The venue</p>`, `<h2>Getting here</h2>`. `.venue-grid` with 4 `.venue-item.reveal`: (1) ✈️ By air — "Maharana Pratap Airport is about 40 minutes from the venue." (2) 🚂 By train — "Udaipur City station is 20 minutes away. Tell us your train and we'll send a car." (3) 🏨 Where to stay — "Rooms are held at the venue for family and friends. Mention it in your reply." (4) 🌡️ February nights — "The days are mild, but by the lake the nights drop to about 10°C. Carry a shawl for the phere."

      **Section 11 — RSVP:** `<section id="rsvp" class="section rsvp reveal">`. `<h2>Will you come?</h2>`, `<p>Please reply by <strong>Sunday, 31 January</strong></p>`, `<p>So a room, a seat and a plate of malai ghewar are kept ready for you.</p>`, `<a class="rsvp-button" href="https://wa.me/919999999999?text=...">RSVP on WhatsApp</a>`, `<p class="gift-note">Your presence is the only gift we ask for.</p>`.

      **Section 12 — Footer:** `<footer id="footer" class="section footer">`. `<p>The Khanna & Saxena families</p>`, `<p class="credits">Made with love</p>`.

      Files: index.html
      Verify: Open index.html in a browser — all 12 sections are present, text is visible (unstyled is fine at this point), no HTML errors in console.

- [ ] 2. Create css/styles.css with CSS custom properties, global reset, base mobile-first typography, and the loader/music-toggle styles.
      Define `:root` theme tokens: `--color-gold: #c9a84c`, `--color-gold-light: #d4b85a`, `--color-maroon: #8b1a1a`, `--color-burgundy: #6b1515`, `--color-cream: #fdf6e3`, `--color-ivory: #faf3e0`, `--color-text: #3d2b1f`, `--color-text-light: #6b5b4f`, `--color-white: #fff`, `--font-display: 'Playfair Display', Georgia, serif`, `--font-body: 'Cormorant Garamond', Garamond, serif`, `--transition-smooth: 0.6s cubic-bezier(0.22, 1, 0.36, 1)`. Global reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`. Body: font-family var(--font-body), color var(--color-text), background var(--color-cream), font-size clamp(16px, 2.5vw, 18px), line-height 1.6, overflow-x hidden. `.section`: padding clamp(3rem,8vw,6rem) clamp(1rem,5vw,3rem), display flex, flex-direction column, align-items center, text-align center, position relative. `.reveal`: opacity 0, transform translateY(30px). `.reveal.active`: opacity 1, transform translateY(0), transition var(--transition-smooth). Stagger utilities `.stagger-1` through `.stagger-5` with transition-delay 0.15s increments. `#loader`: fixed fullscreen, z-index 9999, background var(--color-cream), centered, with a CSS-only pulsing animation (gold circle that pulses). `.loader-hidden`: opacity 0, pointer-events none. `.music-toggle`: fixed bottom-right, 48px circle, gold background, z-index 100, with 3 internal spans animated as audio bars using @keyframes. `.music-toggle.paused span`: animation paused.
      Files: css/styles.css
      Verify: Open index.html — loader visible, body has cream background, fonts load from Google.

- [ ] 3. Add all section-specific CSS styles to css/styles.css — hero, blessing, couple, our-story, save-the-date, countdown, events, families, moments, venue, RSVP, footer, and decorative dividers.
      **Hero**: min-height 100vh, background gradient (cream → ivory → hint of gold), `::before` pseudo with subtle radial-gradient dot pattern. `.hero-subtitle`: uppercase, letter-spacing 0.3em, gold, font-display. `h1`: font-display, clamp(2.5rem,8vw,5rem), maroon. `.weds-text`: italic, gold, 60% size. `.hero-location`: letter-spacing 0.2em, text-light color.
      **Blessing**: white background. `.sanskrit`: gold, larger font. `.mantra`: italic, light color. `.blessing-text`: maroon.
      **Couple**: `.couple-cards` flex column on mobile, row on 768px+. `.couple-card`: white card, gold border, shadow, rounded. `.honorific`: gold italic. `.weds-divider`: gold italic display font with SVG ornament.
      **Our Story**: ivory background. `.timeline`: relative, left-border line via `::before` (gold 2px, left-aligned mobile, centered desktop). `.timeline-item`: padding-left, margin-bottom. `.timeline-dot`: absolute gold circle on the line. `.timeline-date`: gold, uppercase. Desktop alternation with nth-child.
      **Save the Date**: white background. `.scratch-cards`: flex row, gap. Canvas: border-radius, cursor pointer, touch-action none. `.date-reveal`: opacity 0, scale 0.95 → `.date-reveal.visible`: opacity 1, scale 1.
      **Countdown**: ivory gradient. `.countdown-boxes` flex, gap. `.countdown-box`: white, gold border, rounded. `.countdown-number`: display font, maroon, clamp(2rem,6vw,3.5rem). `.countdown-label`: tiny uppercase gold. `@keyframes tick` scale pulse.
      **Events**: cream background. `.event-card`: white, rounded, gold left-border, shadow, max-width 600px. `.event-card h3`: display font, maroon. `.event-time`: gold. `.dress-code`: gold-tinted pill. `.directions-link`: gold with underline.
      **Families**: white background. Grid 1col mobile → 2col 768px+. `.family-card`: centered text. Role group headings gold italic. `.family-closing`: italic, light text.
      **Moments**: ivory background. `.gallery-grid`: 2col mobile, 4col desktop. `.gallery-placeholder`: aspect-ratio 3/4, gold-tinted gradient, gold border, camera icon via ::before. `figcaption`: italic. Hover scale + shadow.
      **Venue**: cream background. `.venue-grid`: 1col mobile → 2col 768px+. `.venue-item`: white card, flex with icon. Icon 2rem.
      **RSVP**: white background. `.rsvp-button`: gold pill, white text, shadow, hover lift. `.gift-note`: italic light.
      **Footer**: cream, border-top, auto height. `.credits`: small, muted.
      **Dividers**: `.section-divider` centered, max-width 200px, gold SVG flourish, margin 0 auto, padding 1.5rem 0.
      **Responsive breakpoints**: @media 480px, 768px, 1024px with the layout switches described above.
      Files: css/styles.css
      Verify: Open index.html — all sections styled, colors/typography match theme, mobile layout is single-column, resize to 768px+ and confirm multi-column layouts for couple/families/venue/gallery.

- [ ] 4. Create js/script.js with the loader, scroll-reveal (Intersection Observer), and smooth scroll modules.
      Wrap everything in a `DOMContentLoaded` listener. **Loader**: after 1.5s timeout, add `.loader-hidden` to `#loader`; on `transitionend`, set `display:none`; fallback: also hide after 3s via setTimeout. **Scroll Reveal**: queryAll `.reveal`, create IntersectionObserver with `{ threshold: 0.15, rootMargin: '0px 0px -50px 0px' }`, on intersection add `.active` class and `unobserve`. **Smooth Scroll**: queryAll `a[href^="#"]`, on click preventDefault and `scrollIntoView({ behavior: 'smooth' })`. Also set `document.documentElement.style.scrollBehavior = 'smooth'`.
      Files: js/script.js
      Verify: Open index.html — loader fades out after ~1.5s; scroll down and sections/cards animate in with fade+slide; staggered elements animate in sequence.

- [ ] 5. Add the countdown timer module to js/script.js.
      Target: `new Date('2027-02-19T23:40:00+05:30')`. `updateCountdown()` calculates diff, extracts days/hours/minutes/seconds, updates `textContent` of `#countdown-days/hours/minutes/seconds`. On number change, add `.tick` class (CSS keyframe: brief scale to 1.1), remove after 600ms. Call immediately + `setInterval(updateCountdown, 1000)`. If past target, show 0s and clear interval.
      Files: js/script.js
      Verify: Open index.html, scroll to countdown — numbers display and tick every second; values are mathematically correct for current date vs Feb 19 2027 11:40 PM IST.

- [ ] 6. Add the canvas scratch card module to js/script.js — setup, mouse handlers, touch handlers, and reveal logic.
      **Setup**: For each of 3 canvases in `.scratch-cards`: set canvas width/height to offsetWidth/offsetHeight * devicePixelRatio, scale context. Draw gold (#c9a84c) filled heart shape using bezier curves (ctx.beginPath, moveTo, bezierCurveTo ×4 for heart outline, closePath, fill). Set globalCompositeOperation to 'destination-out'.
      **Mouse handlers**: mousedown → isScratching=true; mousemove → if scratching, erase 20px radius circle at (e.clientX - rect.left, e.clientY - rect.top) scaled by devicePixelRatio; mouseup → isScratching=false, check percentage.
      **Touch handlers**: touchstart/touchmove/touchend mirroring mouse logic; use e.touches[0] for coords; e.preventDefault() on touchmove with `{ passive: false }`; canvas CSS has `touch-action: none`.
      **Reveal logic**: On each mouseup/touchend, getImageData and count alpha===0 pixels. If >50% transparent, mark canvas as scratched. Track all 3; when all scratched, add `.visible` class to `.date-reveal`.
      Files: js/script.js
      Verify: Open index.html — three gold hearts visible in Save the Date section. Mouse-drag over each heart erases gold revealing text underneath. After all 3 scratched >50%, the full date line appears with a fade-in animation. Test touch in Chrome DevTools device mode.

- [ ] 7. Add parallax and music-toggle modules to js/script.js.
      **Parallax**: On scroll (throttled via rAF), if scrollY < innerHeight, apply `transform: translateY(${scrollY * 0.3}px)` to `.hero-bg` element. Reduce factor to 0.15 on mobile (<768px) via matchMedia check. Use a rAF flag to avoid queuing multiple frames.
      **Music toggle**: Query `.music-toggle`, on click toggle `.paused` class. Initial state: paused. Visual only — no audio.
      Files: js/script.js
      Verify: Open index.html — scroll near hero and see subtle background shift. Click music toggle button — bars animate/pause.

- [ ] 8. Final integration check and polish.
      Walk through the entire page in a browser: (1) Loader appears and fades. (2) Hero renders fullscreen with gradient and parallax. (3) Scroll through all 12 sections — each animates in. (4) Scratch card hearts work with mouse. (5) Countdown ticks. (6) Event cards stagger. (7) Timeline items alternate on wide viewport. (8) Gallery placeholders show. (9) RSVP button is styled and clickable. (10) Footer renders. (11) Music toggle works. (12) Responsive: test at 375px, 768px, 1024px. (13) No console errors. Fix any issues found — missing reveal classes, broken layout, animation glitches.
      Files: index.html, css/styles.css, js/script.js (fixes only)
      Verify: Full walkthrough at 375px and 1024px viewport — all sections present, all interactions work, no console errors, smooth 60fps animations.
