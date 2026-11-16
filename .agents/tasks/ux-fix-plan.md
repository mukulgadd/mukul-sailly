# UX Polish Implementation Plan — 23 Items

This plan addresses all 23 actionable UX gaps (items 1–25 minus skipped items 10 and 20) from the comparison report. Changes span three files: `index.html`, `css/styles.css`, and `js/script.js`. The work is split into two phases: FEAT-001 (visual polish, CSS animations, styling) and FEAT-002 (structural HTML changes, new JS features).

**Constraints (enforced throughout):**
- Do NOT break existing functionality (envelope seal, scratch hearts, countdown, RSVP form, music toggle, bottom nav links).
- Do NOT change personal information (names, dates, venues, family details).
- Do NOT change Our Story timeline content.
- Items 10 (Hindi toggle) and 20 (family expand) are skipped.
- Keep the site performant: no heavy assets, no excessive DOM elements.

**Verification:** No build system exists. Use `node --check js/script.js` for JS syntax validation. Open in browser for visual verification.

---

## FEAT-001: Visual Polish — CSS Animations, Styling & Appearance (13 items)

Primarily CSS changes with minor HTML attribute edits. No new JS modules.

- [ ] 1. **Add shimmer, breathing, and draw-in keyframes** (items 6, 18, 25)
      Add three new `@keyframes` blocks in `css/styles.css` before the responsive breakpoints section:
      - `shimmer`: `0%{background-position:-200% 0} 100%{background-position:200% 0}` — for gold elements.
      - `breathe`: `0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.03);opacity:1}` with `4s ease-in-out infinite`.
      - `draw-in`: using `stroke-dasharray` and `stroke-dashoffset` (from full offset to 0) for SVG path line-drawing.
      Files: `css/styles.css`
      Verify: CSS parses without errors; page loads normally.

- [ ] 2. **Apply shimmer to gold decorative elements** (item 6)
      Add `background-size: 200% 100%` and `animation: shimmer 3s ease-in-out infinite` with varied `animation-delay` to:
      - `.i-divider__line` (gold divider lines)
      - `.section-label` (gold section labels)
      - `.i-scratch__heart` border (the SVG stroke has gold gradient — apply shimmer to a pseudo-element or overlay)
      - Gold heart SVGs in dividers (use a shimmer overlay on `.i-divider svg` or `.i-hero__heart svg`)
      Keep subtle — use long delays (2-5s stagger) and low-contrast shimmer. Apply via a utility class `.has-shimmer` where needed.
      Files: `css/styles.css`
      Verify: Gold elements have subtle traveling sheen animation.

- [ ] 3. **Apply breathing animation to decorative elements** (item 25)
      Add `animation: breathe 4s ease-in-out infinite` to:
      - `.i-card__mandala` (mandala SVGs on card section)
      - `.diya-flame` (enhance existing flicker — add breathing as a secondary subtle pulse)
      - `.i-divider svg` (gold heart dividers — very subtle, use `breathe 6s`)
      Files: `css/styles.css`
      Verify: Decorative elements have subtle pulsing movement.

- [ ] 4. **Apply draw-in animation to SVG ornaments on reveal** (item 18)
      When `.reveal.is-visible` is applied to a container, its SVG `path` children with class `.draw-in` should animate `stroke-dashoffset` from their `stroke-dasharray` value to `0`. Add CSS rules:
      - `.draw-in { stroke-dasharray: var(--path-len, 100); stroke-dashoffset: var(--path-len, 100); transition: stroke-dashoffset 1.2s ease-out; }`
      - `.is-visible .draw-in, .reveal.is-visible .draw-in { stroke-dashoffset: 0; }`
      Apply `.draw-in` class to existing SVG `<path>` elements in dividers and corner ornaments in `index.html` (the `i-card__corner` SVGs and `i-divider` SVGs).
      Files: `css/styles.css`, `index.html` (add class to SVG paths + `--path-len` custom property)
      Verify: Divider lines and corner ornaments draw themselves in when scrolled into view.

- [ ] 5. **Increase hero name font size** (item 8)
      Change `.i-hero__name` `font-size` from `clamp(2.5rem, 10vw, 4rem)` to `clamp(48px, 12vw, 64px)`.
      Files: `css/styles.css` (line ~300, `.i-hero__name`)
      Verify: Names "Mukul" and "Sailly" appear larger on the hero section.

- [ ] 6. **Reduce hero heart SVG size** (item 22)
      In `index.html`, change the hero heart SVG from `width="60" height="52"` to `width="40" height="35"`. The SVG viewBox remains `0 0 60 52` — the browser scales it.
      Files: `index.html` (hero section, `.i-hero__heart svg`)
      Verify: Hero heart is smaller and more subtle.

- [ ] 7. **Change scroll indicator to one-time animation** (item 24)
      In `css/styles.css`, change `.i-hero__scroll` animation from `scroll-bounce 2s ease-in-out infinite` to `scroll-bounce 2s ease-in-out 1` with `animation-delay: 3s; animation-fill-mode: both`. This plays the bounce once after 3s then holds position. Remove the `infinite` keyword.
      Files: `css/styles.css` (`.i-hero__scroll` block)
      Verify: Scroll indicator bounces once and stops.

- [ ] 8. **Increase event card hero height** (item 2)
      Current: `.i-event__hero` uses `aspect-ratio: 4 / 3` which gives ~250px on mobile.
      Change to: Remove `aspect-ratio`, add `height: clamp(300px, 55vw, 420px)` so images are taller.
      **Note:** The task spec says `min(420px, 55vw)` but that gives 206px on 375px viewport (shorter than current). Using `clamp()` instead to ensure a minimum height of 300px on mobile.
      Also expand the gradient overlay to cover bottom 60%: change `.i-event__hero-overlay` gradient to start the dark region at 40% from top.
      Ensure `.i-event__hero-text` has adequate padding for breathing room (increase bottom padding to `1.5rem`).
      Files: `css/styles.css` (`.i-event__hero`, `.i-event__hero-overlay`, `.i-event__hero-text`)
      Verify: Event card images are visually taller; text on images has breathing room.

- [ ] 9. **Style scratch hearts as 3D embossed gold lockets** (item 4)
      The `.i-scratch__heart` wrapper (85×80px) needs:
      - `box-shadow: inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)` for depth.
      - An inner ring via `::after` pseudo-element: a slightly smaller heart outline (using same clip-path) with `border: 1px solid rgba(255,215,0,0.3)`.
      - A `::before` pseudo with `background: radial-gradient(circle at 40% 35%, rgba(255,255,255,0.25), transparent 60%)` for convex metallic sheen.
      - Both pseudos need the same `clip-path` as `.i-scratch__canvas` to follow the heart shape.
      - Use `filter: drop-shadow(...)` on the wrapper instead of `box-shadow` since clip-path clips box-shadow.
      Keep scratch canvas functionality intact — pseudos must have `pointer-events: none` and z-index below canvas.
      Files: `css/styles.css` (`.i-scratch__heart` and new pseudo rules)
      Verify: Scratch hearts look embossed/metallic; scratching still works.

- [ ] 10. **Update bottom nav font size and RSVP pill shape** (items 5, 14)
      Change `.bottom-nav__item` font-size from `0.6rem` (9.6px) to `clamp(11px, 2.5vw, 15px)`.
      Add `border-radius: 16px` to `.bottom-nav__item--accent` (the RSVP button) for pill shape.
      Ensure padding accommodates the larger text without overflowing.
      Files: `css/styles.css` (`.bottom-nav__item`, `.bottom-nav__item--accent`)
      Verify: Bottom nav labels are readable; RSVP has pill shape.

- [ ] 11. **Add couple photo as closing section background** (item 12)
      Add a `::before` pseudo-element on `.i-closing`:
      ```css
      .i-closing::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('../assets/images/couple-640.webp') center / cover no-repeat;
        opacity: 0.15;
        z-index: 0;
      }
      ```
      The image `couple-640.webp` already exists in `assets/images/`. The existing `.i-closing__content` already has `z-index: 2`, so it'll sit above the photo. Add a dark overlay or keep the existing dark bg — the low opacity handles it.
      Files: `css/styles.css` (`.i-closing::before`)
      Verify: Closing section shows a faint couple photo behind the text.

- [ ] 12. **Reduce jhalar height and make subtler** (item 16)
      Change `.jhalar` from `height: 22px` to `height: 8px`. Update `background-size` from `22px 22px` to `12px 8px` for smaller scallops. Add `opacity: 0.35` for subtlety. Adjust the radial-gradient to use smaller radius (e.g., `3px` instead of `8px`).
      Files: `css/styles.css` (`.jhalar` block, all `.jhalar--*` variants)
      Verify: Scalloped edges between sections are thinner and barely noticeable.

- [ ] 13. **Deepen card shadows** (item 17)
      Apply the reference's layered shadow to key card elements:
      `box-shadow: rgba(61,36,32,0.05) 0 1px 2px, rgba(61,36,32,0.15) 0 12px 24px -8px;`
      Apply to: `.i-card__inner`, `.i-event`, `.i-family__card`, `.i-venue__map`, `.i-rsvp__card`.
      Files: `css/styles.css` (update existing `box-shadow` on each selector)
      Verify: Cards have more premium-feeling depth.

- [ ] 14. **Change RSVP stamp to square postage stamp** (item 21)
      Change `.i-rsvp__stamp` from `border-radius: 50%` (circle) to a square stamp look:
      - Set `border-radius: 2px` (nearly square).
      - Use `background-image: radial-gradient(circle, transparent 5px, var(--i-accent) 5.5px)` combined with background-size to create scalloped/perforated edges. Or use a simpler `border: 2px dashed rgba(255,255,255,0.4)` for the perforated look.
      - Adjust `width/height` to ~52×58px (slightly rectangular, like a real stamp).
      Keep 'M&S' text centered inside.
      Files: `css/styles.css` (`.i-rsvp__stamp`)
      Verify: RSVP badge looks like a postage stamp, not a circle.

---

## FEAT-002: Structural Changes — Gallery Carousel, Venue Arch, New Features (10 items)

HTML restructuring, new elements, and new JS modules.

- [ ] 15. **Convert gallery from 2×2 grid to horizontal carousel** (item 1)
      **HTML changes** (`index.html`, gallery section):
      - Replace `.i-gallery__grid` (the `display: grid` container) with a carousel wrapper: `<div class="i-gallery__carousel">`.
      - Keep the 4 `<figure class="i-gallery__item">` children inside.
      - Add gold photo-frame borders to `.i-gallery__placeholder`: double-border effect (inner gold line via border, outer subtle shadow via box-shadow).
      - Add a progress indicator below: `<div class="i-gallery__progress"><div class="i-gallery__progress-bar"></div></div>`.
      **CSS changes** (`css/styles.css`):
      - Replace `.i-gallery__grid` styles: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; gap: 1rem; padding: 0 12.5%;`
      - `.i-gallery__item`: `scroll-snap-align: center; flex: 0 0 75%; min-width: 0;`
      - Hide scrollbar: `.i-gallery__carousel::-webkit-scrollbar { display: none; }` + `scrollbar-width: none;`
      - `.i-gallery__placeholder` border: `border: 3px solid var(--i-gold); box-shadow: inset 0 0 0 1px var(--i-gold), 0 4px 16px rgba(0,0,0,0.1);`
      - Progress bar: thin gold bar, width updated by JS.
      **JS changes** (`js/script.js`):
      - Add `initGalleryCarousel()` function: listen to `scroll` event on the carousel, compute scroll percentage, update `.i-gallery__progress-bar` width.
      - Call it in the DOMContentLoaded handler.
      - Remove the 1024px desktop `grid-template-columns: repeat(4, 1fr)` rule since it's now a carousel everywhere.
      Files: `index.html`, `css/styles.css`, `js/script.js`
      Verify: Gallery scrolls horizontally with snap; progress bar updates; placeholder items have gold frame.

- [ ] 16. **Add venue arch shape with decorative element** (item 3)
      **CSS changes:**
      - Add `border-radius: 168px 168px 0 0` to `.i-venue__map` (or `.i-venue__map-inner` — the inner wrapper). The existing `border-radius: 16px` on `.i-venue__map` gets overridden.
      - Add a `::before` pseudo on `.i-venue__map` for a decorative floral/paisley SVG element at the top of the arch. Use an inline SVG data URI of a simple floral motif (gold color) positioned at `top: -10px; left: 50%; transform: translateX(-50%)`.
      **HTML changes** (minor):
      - May need to wrap `.i-venue__map-inner` content slightly for the arch to look correct, but likely CSS-only.
      Files: `css/styles.css`, possibly `index.html`
      Verify: Venue card has a distinctive arch/mandap doorway shape with floral decoration at top.

- [ ] 17. **Add SKIP button to envelope** (item 9)
      **HTML changes** (`index.html`):
      - Add inside `.envelope-cover__inner`, as the first child: `<button class="envelope-cover__skip" id="envelope-skip">SKIP</button>`
      **CSS changes:**
      - `.envelope-cover__skip { position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10; background: none; border: none; color: rgba(255,255,255,0.5); font-family: var(--f-serif); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; cursor: pointer; }`
      - On the current cream background, use `color: var(--i-ink-soft); opacity: 0.5;` instead of white.
      **JS changes** (`js/script.js`):
      - In `initEnvelope()`, add: `var skipBtn = document.getElementById('envelope-skip'); if (skipBtn) skipBtn.addEventListener('click', openEnvelope);`
      Files: `index.html`, `css/styles.css`, `js/script.js`
      Verify: SKIP button appears top-right of envelope; clicking it opens the envelope same as tapping the seal.

- [ ] 18. **Add share button to closing section** (item 11)
      **HTML changes** (`index.html`):
      - Add before `.i-closing__made` (the attribution line): `<button class="i-closing__share" id="share-btn">Share this invitation</button>`
      **CSS changes:**
      - `.i-closing__share { display: inline-block; background: none; border: 1px solid var(--i-gold); color: var(--i-on-stage); font-family: var(--f-serif); font-size: 0.85rem; padding: 0.6rem 1.5rem; border-radius: 24px; cursor: pointer; transition: opacity 0.2s; margin-bottom: 1.5rem; }`
      **JS changes** (`js/script.js`):
      - Add `initShareButton()` function:
        ```js
        function initShareButton() {
          var btn = document.getElementById('share-btn');
          if (!btn) return;
          btn.addEventListener('click', function() {
            var shareData = { title: 'Mukul weds Sailly', text: 'You are invited to our wedding!', url: window.location.href };
            if (navigator.share) {
              navigator.share(shareData).catch(function() {});
            } else {
              // Fallback: copy to clipboard
              navigator.clipboard.writeText(window.location.href).then(function() {
                btn.textContent = 'Link copied!';
                setTimeout(function() { btn.textContent = 'Share this invitation'; }, 2000);
              });
            }
          });
        }
        ```
      - Call `initShareButton()` in DOMContentLoaded.
      Files: `index.html`, `css/styles.css`, `js/script.js`
      Verify: Share button appears in closing section; clicking uses Web Share API or copies URL.

- [ ] 19. **Add decorative separator between family cards** (item 13)
      **HTML changes** (`index.html`):
      - Between the two `.i-family__card` divs inside `.i-family__cards`, add:
        ```html
        <div class="i-family__separator" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40"><!-- ornamental gold heart with flourishes --></svg>
        </div>
        ```
      - Design a small inline SVG: a gold heart (using `fill="url(#gold-foil)"`) flanked by small curved flourishes.
      **CSS changes:**
      - `.i-family__separator { display: flex; align-items: center; justify-content: center; padding: 0.5rem 0; }` (column layout) or use `::after` on first `.i-family__card`.
      - On tablet (768px+), the cards go side-by-side, so the separator should also work horizontally — use `align-self: center` within the flex row.
      Files: `index.html`, `css/styles.css`
      Verify: A decorative ornament appears between the Gaddhyan and Marodia family cards.

- [ ] 20. **Add family quote card** (item 19)
      **HTML changes** (`index.html`):
      - After `.i-family__roles` and before `.i-family__close`, add:
        ```html
        <div class="i-family__quote reveal" style="--reveal-offset:0.45s">
          <blockquote>"We can't wait to dance at the wedding!"</blockquote>
          <cite>— The cousins</cite>
        </div>
        ```
      **CSS changes:**
      - `.i-family__quote { max-width: 400px; margin: 1.5rem auto; text-align: center; background: var(--i-card); padding: 1.5rem 2rem; border-radius: 8px; transform: rotate(-1.5deg); }`
      - `.i-family__quote blockquote { font-family: var(--f-hand); font-size: clamp(1rem, 2.5vw, 1.15rem); color: var(--i-ink-soft); line-height: 1.5; }`
      - `.i-family__quote cite { display: block; font-family: var(--f-serif); font-style: italic; font-size: 0.8rem; color: var(--i-gold); margin-top: 0.5rem; }`
      Files: `index.html`, `css/styles.css`
      Verify: A tilted quote card appears in the family section with handwritten-style font.

- [ ] 21. **Upgrade scroll reveal to staggered child animations** (item 7)
      **JS changes** (`js/script.js`):
      - Modify `initScrollReveal()`: when a `.reveal` element enters the viewport and receives `.is-visible`, also find its direct children that have class `.reveal-child` (or `.reveal` themselves) and add staggered `transition-delay` values (0.1s increments).
      - The observer callback becomes:
        ```js
        entry.target.classList.add('is-visible');
        var children = entry.target.querySelectorAll(':scope > .reveal');
        children.forEach(function(child, i) {
          child.style.transitionDelay = (0.1 * (i + 1)) + 's';
          child.classList.add('is-visible');
        });
        ```
      **CSS changes:**
      - Update `.reveal` base: `transform: translateY(30px); opacity: 0; transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);`
      - `.reveal.is-visible`: `opacity: 1; transform: translateY(0);`
      - Keep `transition-delay: var(--reveal-offset, 0s)` for top-level reveals; child stagger is set via JS.
      **HTML changes:**
      - Add `.reveal` class to direct children within section containers that should stagger: e.g., each `.i-event` already has `.reveal`, timeline items already have `.reveal` with `--reveal-offset`. The JS upgrade makes children within a revealed parent stagger automatically.
      Files: `js/script.js`, `css/styles.css`
      Verify: When scrolling to a section, its child elements appear one-by-one with staggered delays.

- [ ] 22. **Add active section highlighting to bottom nav** (item 15)
      **JS changes** (`js/script.js`):
      - Add `initNavHighlight()` function:
        - Create an IntersectionObserver watching sections: `#rsvp`, `#countdown`, `#events`, `#top`.
        - Map sections to nav items via `href` attribute matching.
        - When a section enters 50%+ of viewport, add `.is-active` to matching `.bottom-nav__item`, remove from others.
      **CSS changes:**
      - `.bottom-nav__item.is-active { color: var(--i-gold); }` or add a subtle gold underline.
      - `.bottom-nav__item.is-active::after { content: ''; display: block; width: 60%; height: 2px; background: var(--i-gold); margin: 0.15rem auto 0; border-radius: 1px; }`
      - Don't apply active style to `.bottom-nav__item--accent` (RSVP) — it already has its own accent color.
      - Call `initNavHighlight()` in DOMContentLoaded.
      Files: `js/script.js`, `css/styles.css`
      Verify: As you scroll through sections, the corresponding bottom nav item gets a gold highlight.

---

## Known Discrepancies Between Task Spec and Actual Code

1. **Event card height**: The task says current height is "240px" but the CSS actually uses `aspect-ratio: 4 / 3` (giving ~250px on mobile). Also, `min(420px, 55vw)` yields only 206px at 375px viewport — shorter than current. Plan uses `clamp(300px, 55vw, 420px)` instead.
2. **Bottom nav font**: Task says current is "9.6px" — the CSS has `0.6rem` which is indeed ~9.6px at default sizing. Confirmed.
3. **Gallery grid class**: Task references `.i-gallery__grid` which exists. It's a `display: grid` with `grid-template-columns: repeat(2, 1fr)`.
4. **Venue map selector**: `.i-venue__map` exists and has `border-radius: 16px`. The arch radius will override this.
5. **`.i-event__hero` has no fixed height**: Uses `aspect-ratio` instead. The plan removes `aspect-ratio` and sets explicit height via `clamp()`.

---

## Execution Order

FEAT-001 runs first (CSS/styling) → FEAT-002 runs second (structure/JS) → convergence loop verifies integration.

Within each FEAT, steps are ordered so later steps don't depend on uncommitted earlier steps. All changes within a FEAT are committed together at the end.
