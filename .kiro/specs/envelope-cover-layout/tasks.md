# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Envelope Cover Visual Composition Defects
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior — it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate all six layout defects exist
  - **Scoped PBT Approach**: Open the page in Playwright at 400×718 viewport and measure each defect
  - Test that `.envelope-cover__poster` rendered height is less than 75% of viewport height (confirms poster undersized)
  - Test that `.envelope-cover__text` computed position is `static` with margin gap above poster (confirms text disconnected)
  - Test that `.envelope-cover__initials` computed font-size is below 4rem / 64px (confirms initials too small)
  - Test that `.envelope-cover__corner` uses CSS pseudo-elements only, no SVG children (confirms corners sparse)
  - Test that `.envelope-cover` computed background contains only a single linear-gradient layer (confirms flat background)
  - Test that `.envelope-cover__inner` max-width is 420px or less (confirms composition over-constrained)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct — it proves the defects exist)
  - Document counterexamples: poster height ≈37% viewport, text margin-bottom 1.5rem, initials max 3.2rem, corners are 48px pseudo-lines, single gradient, inner max-width 420px
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Seal Animation, Skip Button, and Post-Dismissal Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe on UNFIXED code: tap seal → verify `.is-pulsing` class added → envelope splits via `.envelope-split--top` / `.envelope-split--bottom` → main content revealed → body scroll unlocked
  - Observe on UNFIXED code: tap SKIP button → verify cover dismissed → main content visible
  - Observe on UNFIXED code: after dismissal, verify hero, card, story, events sections render with existing styles
  - Observe on UNFIXED code: verify seal glow animation (`envelope-seal-glow` keyframes) and CTA pulse are active
  - Observe on UNFIXED code: verify personal names "M & S" and "Mukul and Sailly" are displayed
  - Write property-based test: for all interaction paths (seal tap, skip tap), the envelope dismissal sequence and post-dismissal layout are identical
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 3. Fix envelope cover layout and composition

  - [x] 3.1 Poster height-based sizing
    - In `css/styles.css`: change `.envelope-cover__poster` from `width: 80%; max-width: 360px` to `width: 92%; max-width: none; height: 80vh; position: relative; overflow: hidden; border-radius: 1rem`
    - In `css/styles.css`: change `.envelope-cover__img` from `width: 100%; height: auto` to `width: 100%; height: 100%; object-fit: cover; object-position: center top`
    - Poster container now fills 80% of viewport height; image covers without distortion
    - _Bug_Condition: state.posterHeight < 0.75 * state.viewportHeight due to width-only sizing_
    - _Expected_Behavior: poster fills 75–85% of viewport height_
    - _Preservation: no changes to seal, skip, or post-dismissal behavior_
    - _Requirements: 2.1_

  - [x] 3.2 Move invitation text inside poster and overlay
    - In `index.html`: move `<p class="envelope-cover__text">` from before `.envelope-cover__poster` to inside it, after the `<img>` tag
    - In `css/styles.css`: add to `.envelope-cover__text`: `position: absolute; top: 1.5rem; left: 50%; transform: translateX(-50%); width: 90%; z-index: 1`
    - Add subtle text shadow or semi-transparent backdrop for legibility over the image
    - Remove the old `margin-bottom: 1.5rem` that created the gap
    - _Bug_Condition: state.textElement.position == "static" AND state.textElement.marginBottom > 0_
    - _Expected_Behavior: text overlays upper portion of poster image_
    - _Preservation: text content unchanged, just repositioned_
    - _Requirements: 2.2_

  - [x] 3.3 Scale up initials
    - In `css/styles.css`: change `.envelope-cover__initials` font-size from `clamp(2.2rem, 8vw, 3.2rem)` to `clamp(3rem, 12vw, 5rem)`
    - Reduce `margin-bottom` on initials to tighten gap before the poster
    - _Bug_Condition: state.initialsMaxFontSize < 4rem_
    - _Expected_Behavior: initials render at clamp(3rem, 12vw, 5rem) for commanding presence_
    - _Preservation: text content "M & S" unchanged_
    - _Requirements: 2.3_

  - [x] 3.4 Replace CSS corner brackets with SVG ornamental corners
    - In `index.html`: replace the four `.envelope-cover__corner` divs with inline `<svg>` elements containing curved floral/scroll path data
    - Each corner SVG rotated appropriately (0°, 90°, 180°, 270°) via CSS transforms
    - In `css/styles.css`: remove the `::before` / `::after` pseudo-element rules for `.envelope-cover__corner`
    - Style SVGs with `position: fixed`, gold fill/stroke using `var(--i-gold)`, approximately 80–100px dimensions
    - _Bug_Condition: state.cornerDecoration == "css-pseudo-lines" AND state.cornerLineWidth <= 1.5px_
    - _Expected_Behavior: ornamental SVG corner decorations with curved gold paths_
    - _Preservation: corners remain in same viewport positions (four corners)_
    - _Requirements: 2.4_

  - [x] 3.5 Warm layered background gradient
    - In `css/styles.css`: replace `.envelope-cover` single gradient with layered background:
      - `radial-gradient(ellipse at 30% 20%, rgba(218,190,140,0.3), transparent 60%)`
      - `radial-gradient(ellipse at 70% 80%, rgba(200,170,120,0.25), transparent 60%)`
      - `linear-gradient(170deg, #faf3e6 0%, #f0e4d0 50%, #e8dbc5 100%)`
    - Update `.envelope-split` background to match new cover background for seamless animation continuity
    - _Bug_Condition: state.backgroundLayers == 1 AND state.backgroundType == "linear-gradient"_
    - _Expected_Behavior: warm layered gradient with depth and parchment-like warmth_
    - _Preservation: .envelope-split backgrounds updated to match so animation remains seamless_
    - _Requirements: 2.5_

  - [x] 3.6 Widen inner container and tighten spacing
    - In `css/styles.css`: increase `.envelope-cover__inner` max-width from `420px` to `480px` (or remove cap)
    - Reduce padding from `1.5rem 1rem` to `1rem 0.5rem`
    - Tighten margins between initials, poster, and seal to eliminate dead space
    - _Bug_Condition: state.innerMaxWidth <= 420px AND state.innerPadding > 1rem_
    - _Expected_Behavior: lush connected composition with minimal dead space_
    - _Preservation: flex column layout direction unchanged; element order unchanged_
    - _Requirements: 2.6_

  - [x] 3.7 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Envelope Cover Visual Composition
    - **IMPORTANT**: Re-run the SAME test from task 1 — do NOT write a new test
    - The test from task 1 encodes the expected behavior for all six defects
    - When this test passes, it confirms: poster ≥75% viewport height, text overlays poster, initials ≥4rem, SVG corners present, multiple background layers, wider composition
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms all six defects are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 3.8 Verify preservation tests still pass
    - **Property 2: Preservation** - Seal Animation, Skip Button, Post-Dismissal
    - **IMPORTANT**: Re-run the SAME tests from task 2 — do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm seal tap animation, skip button, post-dismissal layout, responsive behavior, and seal glow all work identically

  - [x] 3.9 Side-by-side Playwright comparison at 400×718
    - Open fixed page and reference site (sadarnimantran.in) side by side in Playwright at 400×718 viewport
    - Take screenshots of both envelope covers
    - Compare poster size, text positioning, initials prominence, corner richness, background warmth, overall composition density
    - Document any remaining visual gaps between fixed version and reference
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 4. Checkpoint — Ensure all tests pass
  - Verify exploration test (task 1) passes on fixed code
  - Verify preservation tests (task 2) pass on fixed code
  - Verify Playwright comparison (task 3.9) shows composition matches reference
  - Ensure no regressions in seal animation, skip button, or post-dismissal sections
  - Ask the user if questions arise
