# Hero text centering and event card image-as-background

This change addresses two user-reported issues on the wedding invitation site. The hero section's text overlay (`.i-hero__content`) is constrained to the top 45% of the viewport and vertically centered within that box, replacing the old loose padding-based layout. The three event cards (Haldi, Mehndi, Baraat) are restructured from a separate header-then-cropped-image layout to a single hero container where the watercolor image fills the top ~55–60% of each card and date/name/time are overlaid on top with a gradient for contrast. Watch for: no Playwright screenshot artifacts exist to back the coder's verification claims — the commit message attests to visual checks at 473×774, 375×812, and 1024×768 but no image or log files were recorded (confirmed); three dead CSS rules reference classes no longer present in the HTML (confirmed, non-blocking).

**Verdict**: APPROVED

## High-level view

The hero text positioning moves from a padding-push approach (`padding: 5vh 1.5rem 1rem`) to a height-constrained box (`height: 45%`) with `justify-content: center`, which makes the text block self-centering regardless of viewport height. Inter-element margins are uniformly tightened by ~30–40%, and the dark gradient behind the text is strengthened slightly (0.80→0.85 at top, midpoint extended from 40%→45%). The result should be a cohesive text group in the upper portion of the hero that doesn't drift as the viewport changes.

The event cards replace the old three-part structure (header → cropped `<img>` → details) with a two-part structure (hero area with background image + text overlay → details). Each hero area uses `aspect-ratio: 4/3` with the watercolor image absolutely positioned as a cover fill, a bottom-up gradient overlay for legibility, and date/name/time anchored at the bottom of the image area. The event name switches to Great Vibes script (`--f-script`) at a larger size with white text and shadow for readability against the dark overlay. Below the hero area, venue/description/dress/directions remain unchanged.

The `@media (min-aspect-ratio: 4/3)` rule for `.i-hero__couple` is present in the final code with `object-position: center 70%`. The diff shows it being added rather than preserved — it did not exist in the prior commit. This is a net improvement; the rule is needed for landscape viewports where the default 30% anchor would crop the couple photo.

<details>
<summary>Issues (2)</summary>

1. **No visual verification artifacts** — Commit message attests to Playwright checks at three viewports but no screenshots, logs, or evidence files exist in the repo. Add screenshot artifacts or a Playwright report for future passes. (confirmed, non-blocking)
2. **Dead CSS rules for removed classes** — `.i-event__header`, `.i-event__image`, and `.i-event__image img` are set to `display: none` but no HTML elements use those classes after the restructure. Remove them to avoid confusion. (confirmed, non-blocking)

</details>

<details>
<summary>Details</summary>

## Hero text centering via height-constrained box

On a 100svh hero at 812px (iPhone), the 45% box gives 365px for a text stack that totals roughly 170–180px at 375px width — plenty of room for the centering to work without content overflow.

At very wide aspect ratios (landscape tablet, desktop), `height: 45%` of a short viewport (say 600px) gives only 270px. The text still fits, but the gradient's 75% fade-out point maps to ~200px, leaving thin margin between the gradient edge and the bottom of the text group. Worth a visual check if landscape viewports matter for this invitation (possible).

## Event card restructure and image overlay

The image area uses `aspect-ratio: 4/3` inside cards that are roughly 340px wide at 375px mobile width, yielding an image area of ~255px tall. With a details section of ~200–250px below, the image area lands at about 50–55% of total card height — slightly under the 55–60% target. At wider viewports in the 3-column grid, the narrower columns push this ratio higher.

The gradient overlay runs from `rgba(26,21,16, 0.7)` at the bottom to `0.1` at the top. For watercolor images that are light at the bottom, 0.7 alpha provides adequate contrast for white text at WCAG AA, and `text-shadow: 0 2px 8px rgba(0,0,0,0.4)` on `.i-event__name` adds additional insurance. A visual spot-check against the actual haldi/mehndi/baraat images would confirm this holds (likely).

Great Vibes only ships weight 400, so the change from `font-weight: 600` to `400` is necessary — the browser was silently falling back to 400 with the old value.

## Dead CSS from the old structure

Three CSS rules are set to `display: none` with "legacy — replaced by" comments: `.i-event__header`, `.i-event__image`, and `.i-event__image img`. No HTML elements use these class names anymore — the HTML was fully replaced, not just hidden. These rules are unreachable dead code. They don't affect rendering, but they add confusion for the next person reading the stylesheet. Removing them and the comments would be cleaner.

## Verification gap

The commit message claims Playwright testing at 473×774, 375×812, and 1024×768 with passing results for hero text centering, event card rendering, and the 3-column grid. No screenshot files, Playwright HTML reports, or log files exist in the repository or task directory to substantiate these claims. The code changes are structurally sound based on diff review — the CSS techniques are well-established and the values are geometrically consistent — but visual rendering on actual watercolor images (contrast, cropping, focal point) can only be confirmed with a real viewport check.

</details>

<details>
<summary>File map</summary>

- **css/styles.css** — Hero text overlay constrained to 45% height with center justify; margins tightened; gradient strengthened; old event header/image rules replaced with new hero-area layout (positioned image, gradient overlay, overlaid text); event text colors switched to white; event name font changed to Great Vibes script.
- **index.html** — All three event cards restructured: `i-event__header` + `i-event__image` replaced by `i-event__hero` wrapper with background image, overlay div, and text container. Details sections unchanged.

</details>
