# UX overhaul — hero, scratch cards, event cards, bottom nav, gallery polish

This commit restructures the mobile-first wedding invitation across all three files (index.html, css/styles.css, js/script.js) to address eight visual and interaction issues identified in the UX review. The hero gets proper layering with text at top and couple photo anchored to the bottom, scratch hearts shrink into a single mobile-friendly row with labels, event cards move from unreadable background-image overlays to clean split-layout cards, a sticky bottom navigation replaces the floating music toggle, and various polish items (countdown fit, card ornaments, gallery placeholders, font sizing) round out the pass. Watch for: no Playwright visual verification artifacts exist for this specific pass (likely); the "More" bottom-nav button is a stub with no JS handler (confirmed, non-blocking).

**Verdict**: APPROVED

## High-level view

The hero section is now a three-layer stack: blurred background at z-index 1, couple photo anchored to the bottom 60% at z-index 2, and text content absolutely positioned at top with a dark gradient `::before` overlay at z-index 3. The name font-size moves from the problematic `16.5cqw` to `clamp(3rem, 11vw, 4.5rem)`, and text-shadow is added throughout for readability. A scroll indicator with bounce animation sits at `bottom: 4.5rem` — a magic number tuned to clear the new bottom nav.

The Save the Date section hides the explicit date from the heading (changed to "The Date"), wraps each scratch heart in a `.i-scratch__group` column with DAY/MONTH/YEAR labels, reduces hearts from 120×110 to 85×80 pixels in a single `nowrap` row, and adds both a "Reveal the date" button and a gold diamond divider. JS heart bézier path, CSS clip-path, and canvas eraser radius are all rescaled proportionally.

Event cards drop the `.i-event__bg` + `.i-event__overlay` pattern in favor of a split card: header with date/name/time, standalone `<img>` block, and details with pin/hanger SVG icons. Directions becomes a full-width maroon button. Event names lose `text-transform: uppercase` for serif presentation.

The floating `.music-toggle` is removed entirely. A fixed bottom nav provides RSVP (accent-colored), Dates, Music, and More as four items with icons above labels, backdrop blur, and `env(safe-area-inset-bottom)`. The "More" button has no behavior wired.

Countdown boxes use `flex: 1; min-width: 0; max-width: 80px` with `nowrap`, fitting all four in one row at 320px. Card ornaments grow to 48px with enhanced shadow. Gallery placeholders get 2px gold borders, 56px icons, and stronger gradients. Section titles use `clamp(2rem, 8vw, 3rem)`.

<details>
<summary>Issues (3)</summary>

1. **Missing Playwright visual verification** — No screenshot artifacts, test logs, or Playwright evidence files exist for this UX overhaul pass. The commit message documents what was changed but not what was visually confirmed at 375px/768px/1024px. A quick Playwright spot-check at mobile width would close this gap. (likely)
2. **"More" button is a dead stub** — `bottom-nav__more-btn` has no JS handler and no defined behavior. Either wire it to a drawer/share sheet or remove it to avoid confusing users who tap it and see nothing happen. (confirmed)
3. **Scroll indicator bottom coupled to nav height** — `.i-hero__scroll` uses `bottom: 4.5rem` to clear the ~64px bottom nav. If the nav height changes (safe-area insets, font scaling), the indicator may overlap or float too high. A shared CSS custom property would be more resilient. (possible)

</details>

<details>
<summary>Details</summary>

## Hero dark-gradient overlay

A `::before` pseudo-element on `.i-hero__content` draws a gradient from `rgba(26, 21, 16, 0.55)` at top to transparent at bottom. This is the primary readability mechanism — without it, white text over the couple photo and blurred background would be illegible in many lighting conditions. The "weds" label and place text gain `text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5)` as a secondary measure.

The scroll indicator is positioned absolutely against `<section class="i-hero">` (outside `.i-hero__content`), so its `bottom: 4.5rem` is relative to the hero section's bottom edge. Since the hero is `100svh` and the bottom nav is `position: fixed`, the indicator needs to clear the nav's visual footprint — hence the magic number rather than the plan's `1.5rem`.

## Scratch card geometry

At 85px × 3 hearts + 0.75rem × 2 gaps ≈ 267px, the single-row layout fits within a 375px viewport with standard section padding. The `canvas.parentElement` reference in JS still resolves to `.i-scratch__heart` because the new `.i-scratch__group` wrapper sits above the heart div, not between the canvas and its immediate parent — the critical DOM relationship for the scratch reveal logic.

## Event card cleanup

The old pattern (`.i-event__bg` full-bleed + `.i-event__overlay` at 82% white opacity) washed out the watercolor images while still leaving text readability marginal. The new split layout gives the image a dedicated `<img>` block with `max-height: 240px; object-fit: cover`, and text sits on the cream card background directly.

## "More" nav button gap

The `bottom-nav__more-btn` has markup, styling, and an `aria-label` but zero JS wiring. The plan specified the button's appearance but not its behavior. On tap, nothing happens — no drawer, no share sheet, no scroll-to-section.

## Missing visual verification

This UX overhaul commit (3152d3b) contains no Playwright screenshots, console-log captures, or viewport-verification artifacts. The code changes match the plan's specifications in every measurable dimension (font sizes, pixel values, flex properties, DOM structure, JS selectors), but the rendered output at mobile/tablet/desktop widths has not been visually confirmed in any available artifact.

</details>

<details>
<summary>File map</summary>

- **index.html** — Removed floating music toggle; added scroll indicator in hero; restructured scratch hearts into groups with labels; added reveal button and diamond divider; rebuilt 3 event cards as split layout; increased gallery SVG sizes; added bottom nav; increased card corner ornaments to 48px
- **css/styles.css** — Hero layering, dark gradient, name font clamp, scroll bounce. Scratch nowrap, 85×80, rescaled clip-path. Events split layout, removed overlay rules. Countdown nowrap flex. Card ::before bg, enhanced shadow. Gallery borders and gradients. Bottom nav with backdrop blur. Removed .music-toggle rules
- **js/script.js** — Heart bézier path rescaled to 85×80; eraser radius 18→14; reveal-date-btn handler; music toggle selector → .bottom-nav__music-btn

[Full diff: `git diff 3d8ade9..3152d3b -- card1/`]

</details>
