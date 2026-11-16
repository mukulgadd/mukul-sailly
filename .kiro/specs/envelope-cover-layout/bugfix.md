# Bugfix Requirements Document

## Introduction

The envelope cover page (the landing overlay users see before opening the invitation) has significant layout and composition issues compared to the reference design at sadarnimantran.in. The cover poster image is undersized, text is incorrectly positioned, initials are too small, decorative corners are visually wrong, and the background feels flat and sparse. Together these make the cover feel disconnected and empty instead of lush and full like the reference.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the envelope cover is displayed THEN the cover poster image only fills approximately 60% of the viewport height, with visible cream background gaps above (between initials and poster) and below (between poster and seal), because `.envelope-cover__poster` is constrained to `width: 80%; max-width: 360px` with no height control

1.2 WHEN the envelope cover is displayed THEN the invitation text "You and your family are warmly invited" renders as a separate block element ABOVE the poster image with whitespace between them, because `.envelope-cover__text` has `margin-bottom: 1.5rem` and sits in the normal document flow before the poster div

1.3 WHEN the envelope cover is displayed THEN the initials "M & S" appear at `clamp(2.2rem, 8vw, 3.2rem)` which is noticeably smaller and less prominent than the reference design's large, commanding initials

1.4 WHEN the envelope cover is displayed THEN the decorative corners render as thin geometric gold L-brackets (48px CSS pseudo-element lines at 1.5px thickness), which are visually sparse and unlike the reference design's rich, prominent floral/botanical corner decorations

1.5 WHEN the envelope cover is displayed THEN the background is a flat two-tone cream gradient (`linear-gradient(170deg, #fdf8f0 0%, #f5ede0 100%)`) with no texture, making it feel plain compared to the reference's warmer, parchment-like background

1.6 WHEN the envelope cover is displayed THEN the overall composition feels sparse with too much empty space between elements, because the poster, text, initials, and seal are arranged in a vertically padded flex column with generous margins and a narrow max-width of 420px

### Expected Behavior (Correct)

2.1 WHEN the envelope cover is displayed THEN the system SHALL render the cover poster image filling 75–85% of the viewport height, stretching nearly edge-to-edge within the cover, so the image dominates the viewport with minimal surrounding empty space

2.2 WHEN the envelope cover is displayed THEN the system SHALL position the invitation text "You and your family are warmly invited" overlaid on the upper portion of the poster image (or positioned with minimal/zero gap above the image), integrated with the visual composition rather than separated as a standalone block

2.3 WHEN the envelope cover is displayed THEN the system SHALL render the initials "M & S" at approximately `clamp(3rem, 12vw, 5rem)`, making them large and prominent as a commanding top element of the cover

2.4 WHEN the envelope cover is displayed THEN the system SHALL render decorative corner elements that are larger, more prominent gold brackets or floral/botanical SVG ornaments, visually richer than thin L-bracket lines

2.5 WHEN the envelope cover is displayed THEN the system SHALL render the background with a warmer, more textured vintage parchment-like appearance using subtle warm tones, rather than a flat cream gradient

2.6 WHEN the envelope cover is displayed THEN the system SHALL present a lush, full composition where the poster image dominates the viewport and all elements (initials, text, poster, seal, corners) feel visually connected with minimal empty space between them

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the user taps the envelope seal button THEN the system SHALL CONTINUE TO trigger the envelope opening animation (seal pulse → split halves → reveal main content) exactly as before

3.2 WHEN the user taps the SKIP button THEN the system SHALL CONTINUE TO bypass the envelope cover and proceed to the main invitation content

3.3 WHEN the envelope cover is displayed THEN the system SHALL CONTINUE TO show the personal information (names "M & S", "Mukul and Sailly") unchanged

3.4 WHEN the envelope cover is dismissed THEN the system SHALL CONTINUE TO display all subsequent sections (hero, card, story, events, etc.) with their existing layout and styling unmodified

3.5 WHEN the envelope cover is viewed on a mobile viewport (375×812) or DevTools viewport (400×718) THEN the system SHALL CONTINUE TO render correctly and responsively at both sizes

3.6 WHEN the envelope cover is displayed THEN the system SHALL CONTINUE TO show the seal glow animation and "Tap the seal to open" CTA text
