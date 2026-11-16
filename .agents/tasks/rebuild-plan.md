# Implementation Plan — Wedding Invitation Complete Rebuild

Complete rebuild of mobile-first Indian wedding invitation to match reference site sadarnimantran.in/invite/arjun-meera. Full rewrite of index.html, css/styles.css, js/script.js. Images already in assets/images/. No build step — static files served directly.

---

## FEAT-001: HTML + CSS (Visual Foundation)

- [ ] 1. Set up index.html skeleton with all 5 Google Fonts (Great Vibes, Cormorant Garamond, Anek Devanagari, Anek Latin, Kalam), meta viewport, CSS link, deferred JS link. Body: #loader, .music-toggle button, `<main>` wrapping 10 sections.
      Files: index.html
      Verify: Open in browser — blank page loads without errors, fonts begin downloading.

- [ ] 2. Create css/styles.css with exact --i-* CSS custom properties (--i-bg:#f7f5ef, --i-bg2:#f9faf7, --i-card:#fbf8f2, --i-ink:#2b0f14, --i-ink-soft:#3d2420, --i-gold:#a98238, --i-gold-dark:#8a6a2c, --i-accent:#6e0f1c, --i-stage:#1a1510, --i-on-stage:#fff, --i-line:rgba(169,130,56,0.34)), font stack variables, gold foil gradient, global reset, body base styles, container queries on main, reveal animation system (.reveal → .is-visible), loader styles, music toggle styles.
      Files: css/styles.css
      Verify: Open in browser — cream background, loader overlay visible, music toggle positioned bottom-right.

- [ ] 3. Build the jhalar scalloped edge divider as a reusable CSS class (.jhalar) using radial-gradient(circle at 50% 0, var(--jhalar-color) 8px, transparent 8.5px) repeat-x, 22px size. Create color variants for --i-stage, --i-bg, --i-bg2. Place .jhalar divs between every section color transition in HTML.
      Files: css/styles.css, index.html
      Verify: Scalloped edges visible between section backgrounds when scrolling.

- [ ] 4. Build Section 1 — HERO (#top): full-screen 100svh, couple-640.webp blurred background (filter blur(18px), scale(1.15)), couple.webp foreground centered with radial gradient glow, overlay with 'Shubh Vivah' + hairlines, 'Arjun'/'Meera' in Great Vibes 16.5cqw with 'weds' italic, heart SVG divider, 'Udaipur, Rajasthan', 'You and your family are cordially invited', two circular seal SVGs. Dark --i-stage background, white text. Staggered --reveal-offset delays (0.35s through 2.7s).
      Files: index.html, css/styles.css
      Verify: Hero fills viewport with blurred couple bg, foreground photo, overlay text in correct fonts/colors.

- [ ] 5. Build Section 2 — CARD (#card): jhalar transition from dark hero. Central card (max-width 640px, rounded, shadow) with four corner ornament SVGs, ganesh.webp centered, '॥ श्री गणेशाय नमः ॥' Anek Devanagari, Sanskrit mantra Cormorant italic, blessings text, couple details two-column (Chi. Arjun / weds / Sau. Kan. Meera with full family details), gold heart divider, elder blessings (Late Shri Om Prakash Khanna, Smt. Kamla Khanna). Desktop-only mandala SVGs left/right at 30% opacity.
      Files: index.html, css/styles.css
      Verify: Card section renders with ganesh image, couple columns, and corner ornaments. Desktop shows mandalas.

- [ ] 6. Build Section 3 — OUR STORY (#our-story): timeline with vertical gold line, 5 milestones with dots, dates in Cormorant uppercase gold, titles in Cormorant, descriptions in Kalam font. Mobile: left-aligned. Desktop >=768px: alternating left/right with centered line. Staggered reveal delays per item.
      Files: index.html, css/styles.css
      Verify: Timeline renders with gold line, dots, correct fonts. At 768px+ items alternate sides.

- [ ] 7. Build Section 4 — SAVE THE DATE + COUNTDOWN (#countdown): 'Save the date: Friday, 19 February 2027', scratch instruction, three SVG heart shapes with canvas overlays (clip-path heart), hidden text underneath ('Friday,' / '19 February' / '2027'), revealed date display (initially hidden), 'Phere at the muhurat of 11:40 pm', and countdown timer with 4 boxes (days/hours/minutes/seconds) styled with --i-card bg, --i-accent numbers, --i-gold labels.
      Files: index.html, css/styles.css
      Verify: Three heart shapes visible, countdown boxes show '00' placeholder values, date reveal hidden.

- [ ] 8. Build Section 5 — EVENTS (#events): heading area with gold divider, three event cards with watercolor background images (haldi-800/mehndi-800/baraat-800.webp), cream overlay for readability, event name large, date/time, venue, description (exact reference text), dress code gold pill, 'Directions' accent button. 1-col mobile → 3-col at >=900px.
      Files: index.html, css/styles.css
      Verify: Event cards show watercolor backgrounds with overlaid text. At 900px+ they become 3-column grid.

- [ ] 9. Build Section 6 — FAMILIES (#family): jhalar divider, 'Two families, one celebration', two family cards ('The groom's family' / 'The bride's family' labels, family names, parents, cities), handwritten quote card (Kalam font, tilted, gold left border), Darshanabhilashi and Swagatotsuk member lists, closing line.
      Files: index.html, css/styles.css
      Verify: Family cards side by side on tablet+, handwritten card has Kalam font, member lists render.

- [ ] 10. Build Section 7 — GALLERY (#gallery): 4 placeholder cards with distinct gradient backgrounds, gold borders, small SVG ornaments, figcaptions. 2x2 mobile, 4-col desktop. Hover: scale + shadow.
      Files: index.html, css/styles.css
      Verify: 4 elegant placeholder cards visible — NOT broken images. Gradients and captions render.

- [ ] 11. Build Section 8 — VENUE (#venue): jhalar divider, map card (styled placeholder with venue name, 'Open in Google Maps' accent button), 4 travel info cards with SVG line-art icons (plane, train, bed, thermometer). 2x2 grid.
      Files: index.html, css/styles.css
      Verify: Map card and 4 info cards with icons render. Google Maps link works.

- [ ] 12. Build Section 9 — RSVP (#rsvp): jhalar divider, 'Will you come?', deadline text, plate text, form card with stamp badge 'A&M' (accent circle, rotated), name input, yes/no radios (custom styled), message textarea, 'Send reply on WhatsApp' submit button (accent), small WhatsApp note. Custom radio and input styling with gold focus states.
      Files: index.html, css/styles.css
      Verify: RSVP form renders with all inputs, stamp badge visible, custom radio styling works.

- [ ] 13. Build Section 10 — CLOSING (#closing): jhalar from cream to dark, dark --i-stage background, two inline SVG diya lamps with @keyframes flame-flicker animation, gold heart divider, 'Your presence is the only gift we ask for.' large white text, 'The Khanna & Saxena families' credit, 'Invitation by' small footer.
      Files: index.html, css/styles.css
      Verify: Dark section renders with diya lamps, flame animation visible, text in white.

- [ ] 14. Add responsive breakpoints: @media 768px (couple columns, timeline alternation, family row, venue 2x2), @media 900px (events 3-col), @media 1024px (mandala SVGs, gallery 4-col, larger max-widths). Container query for hero names (16.5cqw). Fluid clamp() throughout. Gold foil gradient on SVG hearts/dividers.
      Files: css/styles.css
      Verify: Screenshot at 375px, 768px, 1024px — layouts shift correctly at each breakpoint.

---

## FEAT-002: JavaScript (Interactivity)

- [ ] 15. Create js/script.js — loader module (fade after 1.2s, display:none on transitionend, 2.5s fallback), scroll reveal (IntersectionObserver threshold 0.12, adds .is-visible, one-shot), smooth scroll for anchor links.
      Files: js/script.js
      Verify: Loader fades, sections animate in on scroll.

- [ ] 16. Add countdown timer targeting Feb 19 2027 11:40 PM IST. Updates #cd-days/hours/minutes/seconds every second. .is-ticking class for CSS pulse on change.
      Files: js/script.js
      Verify: Countdown shows correct remaining time, numbers tick every second.

- [ ] 17. Add SVG heart scratch card. Canvas setup matching heart clip-path, gold fill, destination-out erasing. Mouse + touch handlers (passive:false touchmove). Reveal check at >45% scratched. All 3 scratched → .is-visible on date reveal.
      Files: js/script.js
      Verify: Mouse-drag scratches gold hearts revealing text. All 3 scratched shows date. Touch works in device emulation.

- [ ] 18. Add hero parallax (rAF-throttled scroll, translateY on blur image, 0.25 factor desktop, 0.12 mobile), music toggle (.is-paused class), RSVP WhatsApp form builder (reads name/attending/message, builds wa.me URL, opens in new tab on submit).
      Files: js/script.js
      Verify: Parallax on hero scroll, music toggle animates/pauses, RSVP form opens WhatsApp with pre-filled message.

---

## Visual Verification Protocol

After all implementation: use Playwright MCP to:
1. Open file:///Users/mukul.gaddhyan/Git/shadhi/card1/index.html
2. Screenshot at 375px width (mobile) — verify single-column, touch-friendly
3. Screenshot at 768px width (tablet) — verify multi-column layouts
4. Screenshot at 1024px width (desktop) — verify mandala SVGs, 3-col events, 4-col gallery
5. Open https://sadarnimantran.in/invite/arjun-meera at same widths for side-by-side comparison
6. Check console for JS errors
7. Test scratch card, countdown, RSVP form interactivity
