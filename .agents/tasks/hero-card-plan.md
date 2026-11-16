# Implementation Plan — Hero Text Placement & Event Card Restructure

## Existing Structure Summary

### Hero Section (`.i-hero`)
- **Container**: `<section class="i-hero">` — `position:relative; height:100svh; display:flex; flex-direction:column`
- **Layers**: `.i-hero__bg` (z-index:1, blurred photo), `.i-hero__fg` (z-index:2, couple photo), `.i-hero__content` (z-index:3, text overlay)
- **`.i-hero__content`**: `position:absolute; top:0; left:0; right:0` — flex column, centered, `padding: 5vh 1.5rem 1rem`
- **Text elements (top to bottom)**:
  - `.i-hero__top` (Shubh Vivah label with lines) — `margin-bottom: 0.5rem`
  - `.i-hero__names` (Arjun / weds / Meera) — `margin-bottom: 0.25rem`, gap:0
  - `.i-hero__heart` (SVG heart) — `margin: 0.25rem 0`
  - `.i-hero__place` (Udaipur, Rajasthan) — `margin-bottom: 0.5rem`
  - `.i-hero__invite` (cordially invited) — `margin-bottom: 0.5rem`
- **Gradient**: `.i-hero__content::before` — dark gradient from 0.8 at top to transparent at bottom
- **Scroll indicator**: `.i-hero__scroll` — `position:absolute; bottom:4.5rem; z-index:4`
- **Bottom gradient**: `.i-hero::after` — 20% height dark-to-transparent at bottom

### Event Cards (`#events`)
- **Grid**: `.i-events__grid` — single column mobile, 3-col at 900px+
- **Each card** (`<article class="i-event">`): flex column, rounded, card background, shadow
  - `.i-event__header` (padding 1.5rem) — contains `.i-event__date`, `.i-event__name` (h3), `.i-event__time`
  - `.i-event__image` — separate `<img>` with `max-height:240px; object-fit:cover`
  - `.i-event__details` (padding 1.25rem) — venue (with SVG pin), desc, dress (with SVG hanger), directions btn
- **No JS references** any `.i-event*` class — safe to restructure freely
- **Images**: `haldi-800.webp`, `mehndi-800.webp`, `baraat-800.webp` all exist in `assets/images/`

### Critical Preservations
- `@media (min-aspect-ratio: 4/3) { .i-hero__couple { object-position: center 70%; } }` — DO NOT TOUCH
- Bottom nav (`.bottom-nav`), music player, RSVP form, countdown, scratch hearts, scroll animations, envelope cover — DO NOT TOUCH
- `.reveal` / `.is-visible` IntersectionObserver animation system in `js/script.js` — keep all `reveal` classes on elements

---

## Issue 1: Hero Text Placement

The text block needs to feel like one cohesive unit centered in the upper ~40-45% of the viewport. Currently each element has its own margin that spreads things out. The fix is to use justify-content to vertically position the group, and tighten inter-element gaps.

- [ ] 1. Restructure `.i-hero__content` positioning and spacing in `css/styles.css`.
      Make the text overlay a constrained group in the upper portion of the viewport, with tighter spacing between elements.
      **CSS changes** (in the `SECTION 1: HERO` block):

      **a)** Replace `.i-hero__content` styles:
      ```css
      .i-hero__content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;   /* NEW — vertically center within the box */
        text-align: center;
        padding: 0 1.5rem;
        width: 100%;
        height: 45%;               /* NEW — constrain to top 45% of hero */
      }
      ```
      Key change: `height: 45%` + `justify-content: center` centers the text block in the upper portion. Removed `padding-top: 5vh` (that pushed content down unevenly); the centering handles it now.

      **b)** Tighten `.i-hero__top` margin:
      ```css
      .i-hero__top { margin-bottom: 0.35rem; }     /* was 0.5rem */
      ```

      **c)** Tighten `.i-hero__names`:
      ```css
      .i-hero__names { margin-bottom: 0.15rem; }   /* was 0.25rem */
      ```

      **d)** Tighten `.i-hero__heart`:
      ```css
      .i-hero__heart { margin: 0.15rem 0; }        /* was 0.25rem 0 */
      ```

      **e)** Tighten `.i-hero__place`:
      ```css
      .i-hero__place { margin-bottom: 0.35rem; }   /* was 0.5rem */
      ```

      **f)** Tighten `.i-hero__invite`:
      ```css
      .i-hero__invite { margin-bottom: 0; }         /* was 0.5rem — it's the last item */
      ```

      **g)** Strengthen the gradient for readability — extend it slightly further since the text block is tighter:
      ```css
      .i-hero__content::before {
        background: linear-gradient(to bottom,
          rgba(26, 21, 16, 0.85) 0%,
          rgba(26, 21, 16, 0.65) 45%,
          rgba(26, 21, 16, 0.3) 75%,
          transparent 100%);
      }
      ```

      Files: `css/styles.css`
      Verify: Open in Chrome DevTools responsive mode at 375px, 473x774, 768px, and 1024px — text should appear as a tight, centered group in the upper ~40% of the hero, readable against the photo at all widths. The couple photo and scroll indicator should remain fully visible below the text.

---

## Issue 2: Event Cards — Image-as-Background with Overlaid Text

Current structure puts the image as a cropped `<img>` between header text and details. The new structure makes each card's image fill a "hero" area with date/name/time overlaid on top of it.

- [ ] 2. Restructure event card HTML in `index.html` — merge `.i-event__header` and `.i-event__image` into a single positioned container.
      For **each** of the 3 event cards (`<article class="i-event">`), replace the current `<div class="i-event__header">` and `<div class="i-event__image">` blocks with a single `.i-event__hero` wrapper:

      **New HTML structure per card** (example: Haldi):
      ```html
      <article class="i-event reveal" style="--reveal-offset:0.1s">
        <div class="i-event__hero">
          <img src="assets/images/haldi-800.webp" alt="Haldi ceremony" loading="lazy" class="i-event__hero-img">
          <div class="i-event__hero-overlay"></div>
          <div class="i-event__hero-text">
            <p class="i-event__date">Thursday &middot; 18 February</p>
            <h3 class="i-event__name">Haldi</h3>
            <p class="i-event__time">10:30 am</p>
          </div>
        </div>
        <div class="i-event__details">
          <!-- venue, desc, dress, btn — UNCHANGED from current -->
        </div>
      </article>
      ```

      Apply the same pattern to all 3 cards:
      - **Haldi**: `haldi-800.webp`, name "Haldi"
      - **Mehndi**: `mehndi-800.webp`, name "Mehndi &amp; Sangeet"
      - **Baraat**: `baraat-800.webp`, name "Baraat &amp; Shubh Vivah"

      Keep all existing `reveal` classes and `--reveal-offset` values. Keep all existing `.i-event__details` content (venue SVGs, description, dress, directions button) exactly as-is.

      The `.i-event__name` font changes to `var(--f-script)` (Great Vibes) for the elegant script look, handled in step 3.

      Files: `index.html`
      Verify: Page loads without console errors. All three event cards render (even if unstyled — the CSS comes next).

- [ ] 3. Add CSS for the new `.i-event__hero` image-as-background layout in `css/styles.css`.
      Replace the existing `.i-event__header`, `.i-event__image`, and `.i-event__image img` rules with the new hero-area styles. Keep `.i-event__details` and everything below it unchanged.

      **Remove these existing rules**:
      - `.i-event__header` (the old `padding: 1.5rem 1.5rem 1rem; text-align: center;` block)
      - `.i-event__image` and `.i-event__image img`

      **Add these new rules** (in the SECTION 5: EVENTS block):

      ```css
      /* Event card hero area — image background with overlaid text */
      .i-event__hero {
        position: relative;
        width: 100%;
        aspect-ratio: 4 / 3;          /* ~55-60% of card height */
        overflow: hidden;
      }

      .i-event__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      /* Dark gradient overlay for text readability on the image */
      .i-event__hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top,
          rgba(26, 21, 16, 0.7) 0%,
          rgba(26, 21, 16, 0.3) 40%,
          rgba(26, 21, 16, 0.1) 100%);
        pointer-events: none;
      }

      /* Text positioned at bottom of the image area */
      .i-event__hero-text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.25rem 1.5rem;
        text-align: center;
        z-index: 1;
      }
      ```

      **Update existing `.i-event__date`, `.i-event__name`, `.i-event__time`** — these now sit on a dark image, so they need light colors:

      ```css
      .i-event__date {
        font-family: var(--f-serif);
        font-weight: 500;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(255, 255, 255, 0.85);     /* was var(--i-gold) */
        margin-bottom: 0.25rem;
      }

      .i-event__name {
        font-family: var(--f-script);          /* was var(--f-serif) — now elegant script */
        font-weight: 400;                      /* was 600 — Great Vibes only has 400 */
        font-size: clamp(1.8rem, 5vw, 2.4rem); /* was clamp(1.4rem, 4vw, 1.8rem) — larger for hero text */
        color: #fff;                           /* was var(--i-ink) */
        margin-bottom: 0.15rem;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      }

      .i-event__time {
        font-family: var(--f-serif);
        font-weight: 400;
        font-size: clamp(0.8rem, 2vw, 0.9rem);
        color: rgba(255, 255, 255, 0.8);       /* was var(--i-ink-soft) */
      }
      ```

      Files: `css/styles.css`
      Verify: Open in Chrome DevTools responsive mode at 375px and 473x774 — each event card should show the watercolor image filling the top ~60% with the event name in script font, date, and time overlaid at the bottom of the image area. Below: venue, description, dress, directions button. Images should not be awkwardly cropped. Check at 900px+ that the 3-column grid still works.

---

## Preservation Checklist (for implementer to verify)

- [ ] `@media (min-aspect-ratio: 4/3) { .i-hero__couple { object-position: center 70%; } }` is untouched
- [ ] Bottom nav (`.bottom-nav`) renders and functions
- [ ] Music player toggle works
- [ ] RSVP form renders and WhatsApp button works
- [ ] Countdown timer ticks
- [ ] Scratch hearts reveal date
- [ ] Scroll reveal animations fire on `.reveal` elements (including new `.i-event__hero` cards)
- [ ] Envelope cover shows and opens on seal tap
- [ ] No console errors on page load
