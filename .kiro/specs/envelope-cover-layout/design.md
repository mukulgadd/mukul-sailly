# Envelope Cover Layout Bugfix Design

## Overview

The envelope cover page — the full-viewport overlay users see before opening the wedding invitation — has six layout and composition defects compared to the reference design at sadarnimantran.in. The poster image is undersized and disconnected from surrounding elements, the invitation text floats as a separate block, initials are too small, decorative corners are visually sparse, the background feels flat, and the overall composition has too much empty space.

The fix strategy is purely CSS and minor HTML restructuring within the envelope cover section. No new image assets are required. The approach restructures the poster as a viewport-height-filling container with overlaid text, scales up the initials, replaces thin CSS bracket corners with inline SVG ornamental curves, and layers warm radial gradients for a richer background. All changes are scoped to `index.html` (envelope cover section) and `css/styles.css` (envelope cover classes).

## Glossary

- **Bug_Condition (C)**: The set of visual/layout defects where the envelope cover's composition does not match the reference design — undersized poster, disconnected text, small initials, sparse corners, flat background, excessive whitespace
- **Property (P)**: The desired visual state — poster dominates viewport, text overlays poster, large initials, ornamental corners, warm textured background, lush connected composition
- **Preservation**: Existing interactive behaviors (seal open animation, skip button, scroll unlock) and all non-envelope sections must remain unchanged
- **`.envelope-cover`**: The fixed-position overlay container in `css/styles.css` (line 2160) that wraps the entire landing page
- **`.envelope-cover__inner`**: The flex column container in `css/styles.css` (line 2230) that lays out initials, text, poster, seal, and CTA
- **`.envelope-cover__poster`**: The poster image wrapper in `css/styles.css` (line 2302) currently constrained to `width: 80%; max-width: 360px`

## Bug Details

### Bug Condition

The bug manifests when the envelope cover is displayed in the browser. The layout and sizing rules in CSS produce a composition that is sparse, disconnected, and visually flat compared to the reference design. Six specific defects exist simultaneously.

**Formal Specification:**
```
FUNCTION isBugCondition(state)
  INPUT: state of type EnvelopeCoverRenderState
  OUTPUT: boolean

  posterTooSmall := state.posterHeight < 0.75 * state.viewportHeight
  textDisconnected := state.textElement.position == "static"
                      AND state.textElement.marginBottom > 0
  initialsTooSmall := state.initialsMaxFontSize < 4rem
  cornersTooSimple := state.cornerDecoration == "css-pseudo-lines"
                      AND state.cornerLineWidth <= 1.5px
  backgroundFlat := state.backgroundLayers == 1
                    AND state.backgroundType == "linear-gradient"
  compositionSparse := state.innerMaxWidth <= 420px
                       AND state.innerPadding > 1rem

  RETURN posterTooSmall
         OR textDisconnected
         OR initialsTooSmall
         OR cornersTooSimple
         OR backgroundFlat
         OR compositionSparse
END FUNCTION
```

### Examples

- **Poster undersized**: On a 375×812 viewport, the poster renders at approximately 300×400px (37% of viewport height) with visible cream gaps above and below. Expected: poster fills ~80% of viewport height (~650px)
- **Text disconnected**: "You and your family are warmly invited" renders as a standalone paragraph with 1.5rem margin below it, separated from the poster by whitespace. Expected: text overlays the upper portion of the poster image
- **Initials too small**: "M & S" renders at max 3.2rem (approximately 51px). Expected: at least 5rem (80px) for a commanding presence
- **Corners sparse**: Thin 48px × 1.5px L-bracket lines at 60% opacity. Expected: larger, richer ornamental elements with curves or floral motifs
- **Background flat**: Single two-tone linear gradient `#fdf8f0 → #f5ede0`. Expected: warmer, layered gradient with depth and subtle texture
- **Composition loose**: `.envelope-cover__inner` constrained to max-width 420px with 1.5rem padding, creating too much dead space around elements

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Tapping the envelope seal triggers the opening animation (seal pulse → `.is-pulsing` class → split halves via `.envelope-split--top` / `.envelope-split--bottom` → reveal main content) exactly as before
- Tapping the SKIP button bypasses the cover via the same `openEnvelope()` function in `js/script.js`
- Personal information text (names "M & S", "Mukul and Sailly") remains unchanged
- All subsequent sections (hero, card, story, events, etc.) render with their existing layout after cover dismissal
- The cover renders responsively on both 375×812 mobile and 400×718 DevTools viewports
- The seal glow animation (`envelope-seal-glow` keyframes) and "Tap the seal to open" CTA text continue to display

**Scope:**
All inputs that do NOT involve envelope cover visual styling should be completely unaffected by this fix. This includes:
- JavaScript behavior in `js/script.js` (no changes to `initEnvelope()`)
- All CSS outside the envelope cover class namespace
- All HTML outside the `#envelope-cover` element
- The `.envelope-split` animation styles (background color must match the new cover background for visual continuity)

## Hypothesized Root Cause

Based on the bug description, the issues stem from conservative initial CSS choices:

1. **Poster Constrained by Width-Only Sizing**: `.envelope-cover__poster` uses `width: 80%; max-width: 360px` with no height property. The image gets its natural aspect ratio height, which is far shorter than the viewport. The poster needs viewport-height-based sizing to dominate the screen.

2. **Text in Normal Document Flow**: `.envelope-cover__text` sits above `.envelope-cover__poster` in the flex column with `margin-bottom: 1.5rem`, creating a visible gap. It needs to be repositioned as an overlay on the poster rather than a preceding sibling.

3. **Initials Font Size Too Conservative**: `clamp(2.2rem, 8vw, 3.2rem)` produces text that is readable but not commanding. The reference design uses much larger initials as a visual anchor. Needs to scale up to approximately `clamp(3rem, 12vw, 5rem)`.

4. **Corners Use Minimal CSS Pseudo-Elements**: The `::before` and `::after` pseudo-elements on `.envelope-cover__corner` draw thin 48px lines — this is inherently limited. Richer ornamental corners require inline SVG elements in the HTML with curved or floral paths.

5. **Background Uses Single Flat Gradient**: `linear-gradient(170deg, #fdf8f0 0%, #f5ede0 100%)` produces a plain two-tone wash. Layering multiple radial gradients with warmer tones adds depth and warmth without requiring texture image assets.

6. **Inner Container Over-Constrained**: `.envelope-cover__inner` is capped at `max-width: 420px`, which is fine for text readability but makes the poster feel boxed in. The poster should be allowed to fill wider, while text elements can retain their own max-widths.

## Correctness Properties

Property 1: Bug Condition - Envelope Cover Visual Composition

_For any_ render state where the envelope cover is displayed and one or more of the six defects exists (isBugCondition returns true), the fixed CSS SHALL produce a poster that fills 75–85% of viewport height, invitation text overlaid on the poster's upper portion, initials at `clamp(3rem, 12vw, 5rem)`, ornamental SVG corner decorations, a warm layered background gradient, and a lush connected composition with minimal dead space between elements.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6**

Property 2: Preservation - Interactive and Structural Behavior

_For any_ user interaction that is NOT a visual/layout render of the envelope cover (seal tap, skip tap, scroll after dismissal, subsequent section rendering), the fixed code SHALL produce exactly the same behavior as the original code, preserving the envelope opening animation sequence, skip functionality, personal name content, post-dismissal section layouts, responsive behavior, and seal glow/CTA animations.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `css/styles.css`

**Classes**: `.envelope-cover`, `.envelope-cover__inner`, `.envelope-cover__poster`, `.envelope-cover__img`, `.envelope-cover__text`, `.envelope-cover__initials`, `.envelope-cover__corner`, `.envelope-split`

**Specific Changes**:

1. **Poster Height-Based Sizing** (Req 2.1):
   - Change `.envelope-cover__poster` from `width: 80%; max-width: 360px` to `width: 92%; max-width: none; height: 80vh; position: relative; overflow: hidden; border-radius: 1rem`
   - Change `.envelope-cover__img` from `width: 100%; height: auto` to `width: 100%; height: 100%; object-fit: cover; object-position: center top`
   - Rationale: `height: 80vh` on the container ensures the poster fills the target 75–85% range. `object-fit: cover` on the image fills the container without distortion. The container also serves as a positioning context for the overlaid text.

2. **Text Overlay via Absolute Positioning** (Req 2.2):
   - Move `<p class="envelope-cover__text">` into the `.envelope-cover__poster` div in HTML (after the `<img>`)
   - Add CSS: `position: absolute; top: 1.5rem; left: 50%; transform: translateX(-50%); width: 90%; z-index: 1`
   - Add a subtle text shadow or semi-transparent backdrop for legibility against the image
   - Rationale: Absolute positioning within the relative poster container overlays the text cleanly without affecting document flow. This is more robust than negative margins, which break when content lengths change.

3. **Larger Initials** (Req 2.3):
   - Change `.envelope-cover__initials` font-size from `clamp(2.2rem, 8vw, 3.2rem)` to `clamp(3rem, 12vw, 5rem)`
   - Reduce `margin-bottom` to tighten the gap before the poster
   - Rationale: Direct scaling matches the reference's commanding initials presence.

4. **Ornamental SVG Corners** (Req 2.4):
   - Replace the four `.envelope-cover__corner` divs in HTML with `<svg>` elements containing curved floral/scroll path data
   - Remove the CSS `::before` / `::after` pseudo-element rules for corners
   - Style the SVGs with `position: fixed`, gold fill/stroke using `var(--i-gold)`, and approximately 80–100px dimensions
   - Rationale: CSS pseudo-elements are limited to straight lines. Inline SVG allows curved, organic ornamental shapes without external image files.

5. **Warm Layered Background** (Req 2.5):
   - Replace `.envelope-cover` single gradient with a layered background:
     ```
     background:
       radial-gradient(ellipse at 30% 20%, rgba(218, 190, 140, 0.3), transparent 60%),
       radial-gradient(ellipse at 70% 80%, rgba(200, 170, 120, 0.25), transparent 60%),
       linear-gradient(170deg, #faf3e6 0%, #f0e4d0 50%, #e8dbc5 100%);
     ```
   - Update `.envelope-split` background to match the new cover background for seamless animation
   - Rationale: Layered radial gradients add warmth and depth without image assets. The warmer base tones (#faf3e6 → #e8dbc5) shift from cool cream toward warm parchment.

6. **Wider Inner Container** (Req 2.6):
   - Increase `.envelope-cover__inner` max-width from `420px` to `480px` or remove the cap entirely
   - Reduce padding from `1.5rem 1rem` to `1rem 0.5rem`
   - Tighten margins between initials, poster, and seal
   - Rationale: Less constraint on the inner container allows the poster to fill more horizontal space while maintaining centred alignment of text elements.

**File**: `index.html`

**Section**: `#envelope-cover`

**Specific Changes**:

1. **Move invitation text inside poster div**: Relocate `<p class="envelope-cover__text">` from before `.envelope-cover__poster` to inside it, after the `<img>` tag
2. **Replace corner divs with inline SVG ornaments**: Replace each `.envelope-cover__corner` div with an `<svg>` element containing decorative scroll/flourish paths. Each corner's SVG should be rotated appropriately (0°, 90°, 180°, 270°) using CSS transforms
3. **No changes to seal, skip button, or CTA elements**

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the layout defects on unfixed code, then verify the fix produces correct visual output and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the layout defects BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Open the page in a browser at 375×812 and 400×718 viewports. Capture screenshots and measure element dimensions using DevTools to confirm each defect.

**Test Cases**:
1. **Poster Height Test**: Measure `.envelope-cover__poster` rendered height vs viewport height — expect it to be well under 75% (will confirm defect on unfixed code)
2. **Text Position Test**: Inspect `.envelope-cover__text` computed position — expect `static` with margin gap above poster (will confirm defect on unfixed code)
3. **Initials Size Test**: Inspect `.envelope-cover__initials` computed font-size — expect max ~51px, not the target ~80px (will confirm defect on unfixed code)
4. **Corner Decoration Test**: Inspect `.envelope-cover__corner` pseudo-elements — expect 48px thin lines (will confirm defect on unfixed code)
5. **Background Layer Test**: Inspect `.envelope-cover` computed background — expect single linear gradient (will confirm defect on unfixed code)
6. **Composition Density Test**: Measure total whitespace area vs content area within the cover — expect excessive dead space (will confirm defect on unfixed code)

**Expected Counterexamples**:
- Poster height ≈ 37% of viewport instead of 75–85%
- Text separated from poster by 24px+ gap
- Possible causes: width-only sizing constraints, text in normal flow, conservative font clamp values

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed CSS produces the expected visual layout.

**Pseudocode:**
```
FOR ALL viewport WHERE isBugCondition(renderState(viewport)) DO
  result := renderEnvelopeCover_fixed(viewport)
  ASSERT result.posterHeight >= 0.75 * viewport.height
  ASSERT result.posterHeight <= 0.85 * viewport.height
  ASSERT result.textPosition == "absolute" AND result.textOverlaysPoster == true
  ASSERT result.initialsFontSize >= 3rem
  ASSERT result.cornerDecoration == "svg-ornament"
  ASSERT result.backgroundLayers >= 2
  ASSERT result.compositionGapTotal < previousCompositionGapTotal
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold (interactive behaviors, non-envelope sections), the fixed code produces the same result as the original.

**Pseudocode:**
```
FOR ALL interaction WHERE NOT isBugCondition(interaction) DO
  ASSERT openEnvelope_original(interaction) == openEnvelope_fixed(interaction)
  ASSERT skipButton_original(interaction) == skipButton_fixed(interaction)
  ASSERT postDismissalLayout_original() == postDismissalLayout_fixed()
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It can generate many viewport sizes and interaction sequences automatically
- It catches regressions in animation timing or DOM state that manual testing might miss
- It provides strong guarantees that interactive behavior is unchanged

**Test Plan**: Observe the opening animation, skip button, and post-dismissal behavior on UNFIXED code first, then verify these continue working identically after the fix.

**Test Cases**:
1. **Seal Tap Animation Preservation**: Tap the seal and verify the pulse → split → fade → reveal sequence runs identically on both unfixed and fixed code
2. **Skip Button Preservation**: Tap SKIP and verify the cover dismisses and main content appears identically
3. **Post-Dismissal Layout Preservation**: After cover dismissal, verify all sections (hero, card, story, events) render with unchanged styles
4. **Responsive Preservation**: Test at 375×812 and 400×718 viewports — verify the cover renders correctly at both sizes after the fix
5. **Seal Glow + CTA Preservation**: Verify the `envelope-seal-glow` animation and CTA pulse animation continue displaying

### Unit Tests

- Verify `.envelope-cover__poster` computed height is between 75vh and 85vh across standard mobile viewports
- Verify `.envelope-cover__text` has `position: absolute` and is a child of `.envelope-cover__poster`
- Verify `.envelope-cover__initials` computed font-size exceeds 48px on 375px-wide viewport
- Verify `.envelope-cover__corner` SVG elements exist with gold-colored paths
- Verify `.envelope-cover` background has multiple gradient layers

### Property-Based Tests

- Generate random viewport dimensions (320–480 width, 568–926 height) and verify poster height falls in 75–85% of viewport height
- Generate random viewport dimensions and verify all elements (initials, poster, seal, CTA) remain visible and non-overlapping
- Test that seal click handler remains attached and functional across many simulated page loads

### Integration Tests

- Full flow test: load page → observe cover → tap seal → verify animation → verify main content visible
- Full flow test: load page → observe cover → tap SKIP → verify main content visible
- Visual regression test: compare fixed cover screenshots against reference design at multiple viewport sizes
