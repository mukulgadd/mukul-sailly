# UX Comparison Report: Our Site vs Reference (sadarnimantran.in)

**Viewport:** 375×812 (iPhone-sized)
**Reference:** https://sadarnimantran.in/invite/arjun-meera
**Our site:** http://localhost:8765

## Summary

Our site faithfully reproduces the reference's section structure and overall aesthetic. However, 18+ specific UX gaps remain — ranging from missing micro-interactions and animation polish (the reference has 30+ keyframe animations vs our 10) to absent interactive features (language toggle, share button, gallery carousel, family expand button). The highest-impact gaps are: (1) the gallery is a static 2×2 placeholder grid vs the reference's scrollable carousel with gold-framed photos, (2) the venue card lacks the distinctive arch shape with floral crown, (3) the event card image area is ~47% shorter, and (4) numerous entrance/shimmer/breathe animations that give the reference its premium feel are absent from our site.

---

## Section-by-Section Comparison

### 1. Envelope / Cover

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Layout | Full-screen fixed overlay with diamond-shaped couple photo cutout, elaborate floral corners | Very similar layout — full-screen fixed, diamond photo, floral corners | Close match |
| Initials | "A & M" rendered in gold foil script at top | "M & S" same gold foil script at top | Match ✓ |
| Seal | Heart-shaped 3D gold wax seal with laurel wreath engraving inside | Heart-shaped gold seal with "M & S" text inside | Minor style difference |
| Skip button | Has "SKIP" button in top-right corner | **Missing** — no skip button | MEDIUM |
| Language toggle | Has "हिंदी" button in top-left corner for Hindi translation | **Missing** — no language toggle | MEDIUM |
| Floral corners | Fixed position decorative floral corners (TL, TR, BL, BR) | Has envelope-cover__corner elements — present | Match ✓ |
| Opening animation | Seal-burst → envelope splits up/down → content revealed | Similar envelope-seal-burst + split animations | Close match |

**Priority gaps:**
- **MEDIUM:** No Skip button (users must tap the seal; no way to bypass)
- **MEDIUM:** No Hindi language toggle

---

### 2. Hero Section

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Names font size | ~59px (Anek Devanagari for primary) | 40px (Great Vibes) | Names appear ~33% smaller |
| Names font family | Uses "Anek Devanagari" — a slightly more formal Devanagari-inspired serif | Uses "Great Vibes" — a cursive script | Different aesthetic |
| "weds" text | Placed between names in same Anek Devanagari font | Uses Cormorant Garamond, 16px, lighter weight | Slightly different |
| Text positioning | "Shubh Vivah" at top, names centered in upper-mid area, city + scroll at bottom | "Shubh Vivah" at top, names more compressed toward top, city + extra line below | Our text is more cramped toward top |
| Heart below names | Reference has a small gold heart between names and city | Our site has a larger solid gold heart | Our heart is oversized vs reference |
| Scroll indicator | "SCROLL" with subtle `sn-ph-rise` animation (cubic-bezier reveal) | "Scroll" with 2s ease-in-out infinite scroll-bounce | Reference has one-time reveal; ours loops infinitely |
| Background | Couple illustration fades to `#f7f5ef` top, visible mountains/garden | Same background treatment | Match ✓ |
| Floral arch | Gold SVG arch frame around text area | Similar gold arch | Match ✓ |

**Priority gaps:**
- **MEDIUM:** Hero names are 33% smaller (40px vs 59px) and use a different font — feels less prominent
- **LOW:** Gold heart between names is oversized compared to reference's subtle heart
- **LOW:** Scroll indicator loops rather than appearing once

---

### 3. Card / Couple Intro Section

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Corner ornaments | 8 SVGs for ornamental corners and decorative elements | CSS pseudo-element corner brackets (gold lines) | Our corners are simpler geometric lines vs decorative SVGs |
| Card border | Gold-tone decorative border | Simple gold-tone border | Close match |
| Ganesh image | `ganesh.webp` — ornate Ganesh illustration | Similar Ganesh image present | Match ✓ |
| Mantra text | Hindi `॥ श्री गणेशाय नमः ॥` + romanized Sanskrit shloka | Hindi + romanized shloka (same pattern) | Match ✓ |
| "weds" divider | Horizontal gold line with hearts/diamonds | Similar heart-line divider | Match ✓ |
| Elders blessings | "WITH THE BLESSINGS OF" section with golden uppercase small-caps | "With the blessings of" section present | Match ✓ |
| Box shadow on card | `rgba(61,36,32,0.05) 0px 1px 2px, rgba(61,36,32,0.36) 0px 22px 44px -26px` (deep layered shadow) | `rgba(0,0,0,0.06) 0px 2px 16px` (single lighter shadow) | Reference shadow feels more premium/layered |

**Priority gaps:**
- **LOW:** Corner ornaments are geometric CSS vs SVG decorative elements — works but less ornate
- **LOW:** Card shadow is less layered/deep

---

### 4. Our Story / Timeline

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Presence | **Does NOT exist** in reference | Present with 5 timeline milestones | Extra section in our site |

**Note:** This is an intentional addition. The reference does not have this section, but the user requested it (with placeholders). Not a gap — it's a feature. However, the reference's cleaner flow (hero → card → save the date → events) feels more focused. Consider whether the user wants to keep this.

---

### 5. Save the Date / Scratch Hearts

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Hearts design | 3D gold locket-shaped hearts with embossed laurel wreath + diamond center — feels like real metalwork | Flat CSS gold-gradient hearts — modern but 2D | Reference hearts look significantly more premium |
| Heart count | 3 hearts (Day, Month, Year) + 1 "Reveal the date" button = 4 buttons total | Same 3 hearts + reveal button | Match ✓ |
| Section title | "Save the date" with horizontal gold line + heart accent | "Save the date" / "The Date" with heart accent | Match ✓ |
| Countdown boxes | Reference does NOT show countdown timer boxes | Our site shows 4 countdown boxes (days/hours/minutes/seconds) below the hearts | Extra element |
| Scratch interaction | Canvas-based scratch to reveal with haptic-like feel | Similar scratch interaction | Match ✓ |
| Separator ornaments | Gold line + diamond between sections | Gold line + diamond | Match ✓ |

**Priority gaps:**
- **HIGH:** Heart lockets look flat/2D vs the reference's 3D embossed metalwork appearance (this is very noticeable)
- **LOW:** We show a countdown timer below the hearts — reference doesn't have one (not necessarily bad, just different)

---

### 6. Events / Functions Cards

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Image height | ~451px (`sn-pe-face` height) — image covers ~60% of the card | 240px (`i-event__hero`) — image covers ~40% of the card | **Image area is 47% shorter** — text on image feels more cramped |
| Image position | Absolute positioned in `sn-pe-face` container | Absolute positioned in `i-event__hero` | Same approach ✓ |
| Text on image | Date (gold uppercase, small), Event name (large serif), time — well-spaced vertically | Date, Event name, time — text overlays bottom of shorter image | Our text is more compressed |
| Card corners | `borderRadius: 16px` with separate top/bottom halves | `borderRadius: 16px`, `overflow: hidden` | Match ✓ |
| Card shadow | `rgba(61,36,32,0.05) 0px 1px 2px, rgba(61,36,32,0.36) 0px 22px 44px -26px` | `rgba(0,0,0,0.06) 0px 2px 16px` | Reference shadow is deeper/richer |
| Venue text | Location name + description + dress code + "Directions" link | Location + description + dress + "Directions" button | Match ✓ |
| Directions button style | Text link with arrow | Filled button (accent color) | Our button is bolder — reference is more subtle |
| Dress code styling | Styled with small icon and label | "Dress: xyz" as text | Reference has more visual treatment |
| Events count | 3 events | 4 events | Our site has one extra event (Bhaat) — correct per user data |

**Priority gaps:**
- **HIGH:** Event card image area is much shorter (240px vs 451px) — the reference's tall image makes each event feel more immersive and gives the text on the image breathing room
- **MEDIUM:** Card shadow is less premium-feeling
- **LOW:** Directions button styling differs (filled vs text link)

---

### 7. Families Section

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Family cards | `<article>` elements with `1px solid gold-38` border, `6px` border-radius, deep shadow | Simple card layout without visible border/shadow (inferred from CSS class) | Reference cards have visible gold border and depth |
| Decorative separator | Ornamental rakhi/naagdev SVG image between groom and bride cards | No decorative separator between cards | MEDIUM |
| Quote card | `<figure>` with blockquote — "A little request" from kids Kiaan & Myra | **Missing** — no quote/fun message card | MEDIUM |
| "See the whole family" button | Expandable button to show full family list | **Missing** — all family members shown inline | LOW |
| Darshanabhilashi / Swagatotsuk | Present — family roles section | Present | Match ✓ |
| Family closing line | "Delhi and Lucknow, one family from now on." | "Dhanbad and Raniganj, one family from now on." | Match ✓ |

**Priority gaps:**
- **MEDIUM:** Missing decorative separator (rakhi/naagdev ornament) between family cards — the reference has an elegant visual break
- **MEDIUM:** Missing quote card (fun blockquote from a family member/kids) — adds personality
- **LOW:** Family cards lack the visible gold border and layered shadow from reference

---

### 8. Gallery / Moments

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Layout | **Horizontal scrollable carousel** (flex, nowrap, overflow-x: auto, scroll-snap-type: x mandatory) | **2×2 static grid** | Fundamentally different layout |
| Images | Actual couple/event photos in tall portrait format (~230×359px) with gold photo-frame borders | **Placeholder gradient boxes** with small gold icon shapes (star, diamond) — no actual photos | No real images — placeholders only |
| Navigation | Prev/Next arrow buttons + red progress bar indicator | No navigation controls | Missing carousel UX |
| Frame styling | Gold-bordered frames that look like hung photo frames with slight tilt | Plain rounded-corner cards with gradient fills | Very different visual treatment |
| Captions | Italic captions below each photo ("Under the rose arch", "Haldi morning") | Same captions below placeholder boxes | Match ✓ |
| Image count | 4 gallery images | 4 placeholder slots | Match ✓ |

**Priority gaps:**
- **HIGH:** Gallery is a static grid of placeholders vs scrollable carousel with gold-framed photos — this is one of the most visually different sections. Even before real photos are added, the carousel + frame treatment is missing.
- **HIGH:** No carousel navigation (scroll-snap, prev/next buttons, progress indicator)

---

### 9. Venue Section

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Venue card shape | **Arch-shaped top** — `border-radius: 168px 168px 0 0` creating a distinctive dome/arch silhouette | Standard rounded card | Missing the signature arch shape |
| Floral decoration | Floral bouquet imagery cascading from the top of the arch card | No floral imagery | Missing decorative crown |
| Location pin icon | Prominent location pin icon above venue name | No location pin icon in card | Minor visual cue missing |
| Venue name typography | Large serif in the arch card | Similar serif treatment | Close match |
| "Open in Google Maps" button | Accent-colored button inside the arch card | Similar button present | Match ✓ |
| Travel info cards | 4 items (By air, By train, Where to stay, February nights) with icons in list items | 4 items (same categories) with SVG icons in grid | Match ✓ |
| Parking/directions note | "Parking at the main gate..." descriptive text in venue card | No descriptive note inside venue card | MEDIUM |

**Priority gaps:**
- **HIGH:** Venue card lacks the distinctive arch shape (`border-radius: 168px 168px 0 0`) that gives the reference a memorable, mandap-like appearance
- **MEDIUM:** No floral decoration/imagery cascading over the venue card top
- **LOW:** Missing descriptive parking/directions note inside venue card

---

### 10. RSVP Section

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Heading | "Will you come?" in large serif | Same heading | Match ✓ |
| Reply deadline | "Please reply by Sunday, 31 January" | "Please reply by Sunday, 15 November" | Match (different date) ✓ |
| Stamp/badge | "A&M" postage-stamp style badge with scalloped border (positioned at form corner) | "M&S" round dark badge | Our badge is circular vs reference's square stamp |
| Form fields | Name input, radio buttons (Yes/No), optional note textarea | Same form fields | Match ✓ |
| WhatsApp button | Link styled as accent-colored button "Send reply on WhatsApp" | Button styled "Send reply on WhatsApp" | Match ✓ |
| Helper text | "WhatsApp opens with your reply filled in. Just press send." | "Your reply opens WhatsApp with a pre-filled message" | Same intent ✓ |

**Priority gaps:**
- **LOW:** Stamp badge is circular vs reference's square postage-stamp design — minor visual difference

---

### 11. Closing Section

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Background | Couple photo as `::before` pseudo-element background (640px tall) behind text, with muted overlay | Solid dark background `#1a1510` with no photo | Missing couple photo background |
| Main text | "Your presence is the only gift we ask for." in script font | Same text | Match ✓ |
| Family attribution | "The Khanna & Saxena families" | "The Gaddhyan & Marodia families" | Match ✓ |
| Share button | Present — "Share" button with share icon, bordered style | **Missing** — no share button | MEDIUM |
| Diya lamps | Referenced in HTML — decorative elements | Present — animated flame-flicker diyas | Match ✓ |
| Attribution | "Invitation by Sadar Nimantran" logo | "Made With Love by Mukul Gaddhyan" | Appropriate customization ✓ |

**Priority gaps:**
- **MEDIUM:** Missing share button (allows guests to forward the invite)
- **MEDIUM:** Missing couple photo as closing background — reference has a beautiful faded couple photo creating visual closure
- **LOW:** Decorative arch framing the couple photo in reference

---

### 12. Bottom Navigation

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Position | `fixed`, bottom: 0, z-index: 40 | `fixed`, bottom: 0, z-index: 100 | Match ✓ |
| Items | RSVP, Dates, Music, More (all buttons) | RSVP (link), Dates (link), Music (button), More (button) | Same items ✓ |
| RSVP highlight | `background: rgb(139,52,70)`, white text, `border-radius: 16.8px` (pill shape) | `background: rgb(110,15,28)`, white text, no border-radius (not pill-shaped) | Our RSVP button is not pill-shaped |
| Background | Transparent (`rgba(0,0,0,0)`) | Semi-transparent with backdrop-filter blur (`rgba(251,248,242,0.85)`) | Our nav has blur backdrop — actually looks nicer |
| Font size | 17px | 9.6px | **Our nav labels are ~45% smaller** |
| Nav icons | SVG icons above text labels with adequate spacing | SVG icons above text labels | Match ✓ |
| Active state | Highlighted item gets accent background pill | No visible active state change on scroll | MEDIUM |

**Priority gaps:**
- **HIGH:** Bottom nav font size is 9.6px vs reference's 17px — our labels are nearly half the size and harder to read
- **MEDIUM:** RSVP button should have pill-shaped border-radius (16.8px)
- **MEDIUM:** Missing active section highlighting (nav should highlight current section on scroll)

---

### 13. Global / Cross-cutting

#### Animations

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Total keyframe animations | **30+** (reveal-rise, write-on, spin, ping, pulse, sway, flicker, float, pp-fade, pp-in, pp-draw, pp-sheen, pp-breathe, pp-ripple, pp-glint, pp-bloom, pp-wash, sn-ph-settle-a/b, sn-ph-rise, sn-ph-fade, sn-ph-write, sn-ph-draw, sn-ph-nudge, sn-ph-bloom, sn-date-sheen, sn-date-touch, sn-date-spark, sn-date-rise) | **10** (loader-pulse, seal-pulse, scroll-bounce, cd-tick, flame-flicker, envelope-seal-burst, envelope-split-up, envelope-split-down, envelope-seal-glow, envelope-cta-pulse) | **20+ missing animation types** |
| Scroll-reveal elements | Uses `sn-ph-rise`, `sn-ph-fade`, `sn-ph-write` staggered animations with varied delays | Uses `.reveal` class with simple translateY(24px) + opacity fade | Our reveals are simpler — no write-on, draw, bloom effects |
| Section entrance | Staggered: elements appear one-by-one with 0.1-0.3s delays | Single reveal: all elements in a section fade up together | Reference feels more choreographed |
| Gold shimmer/sheen | `pp-sheen`, `pp-glint`, `sn-date-sheen` create gold shimmer on hearts, ornaments | No shimmer effects | Missing premium gold shine animations |
| Breathing/pulse | `pp-breathe`, `pulse` — subtle scale/opacity breathing on decorative elements | No breathing animations on decorative elements | Missing organic movement |
| Write-on effect | `sn-ph-write`, `pp-draw` — SVG path drawing animations for ornaments | No write-on or draw animations | Missing elegant reveal for ornamental elements |

**Priority gaps:**
- **HIGH:** Missing shimmer/sheen animations on gold elements (hearts, ornaments, dividers)
- **HIGH:** Missing staggered entrance animations — elements should appear one-by-one, not all at once
- **MEDIUM:** Missing write-on / draw-in animations for SVG ornaments
- **MEDIUM:** Missing breathing/pulse micro-animations on decorative elements

#### Typography

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Primary font | "Anek Devanagari" for headings and body text | "Anek Latin" for body, "Cormorant Garamond" for headings | Different primary font |
| Script font | "Great Vibes" for names | "Great Vibes" for names | Match ✓ |
| Serif font | "Cormorant Garamond" for certain elements | "Cormorant Garamond" | Match ✓ |
| Section labels | Gold uppercase, letter-spaced small text | Gold uppercase, letter-spaced | Match ✓ |

#### Jhalar / Scalloped Edges

| Aspect | Reference | Our Site | Gap |
|--------|-----------|----------|-----|
| Implementation | `::before`/`::after` pseudo-elements with small heights (6-9px), subtle gold gradient on countdown | Radial-gradient scalloped circles, 22px height, placed as separate `<div>` elements between sections | Our jhalars are larger/chunkier |
| Count | Present on 5 sections (countdown, family, gallery, venue, closing) | 8 jhalar divs (between every section) | More frequent in our site |
| Visual impact | Barely noticeable — elegant thin lines | More visible scalloped circles | Our implementation is more prominent, less refined |

**Priority gaps:**
- **MEDIUM:** Jhalar edges are too large/prominent — should be thinner, more subtle like the reference's 6-9px treatment
- **LOW:** Too many jhalars — reference uses them selectively, not between every section

#### Missing Features

| Feature | Reference | Our Site | Priority |
|---------|-----------|----------|----------|
| Hindi language toggle | ✅ Button to switch all text to Hindi | ❌ Missing | MEDIUM |
| Skip button on envelope | ✅ "SKIP" in top corner | ❌ Missing | MEDIUM |
| Share button | ✅ In closing section | ❌ Missing | MEDIUM |
| Gallery carousel | ✅ Horizontal scroll with snap + nav buttons | ❌ Static 2×2 grid | HIGH |
| Family quote card | ✅ Fun blockquote from family member | ❌ Missing | LOW |
| Family expand button | ✅ "See the whole family" collapsible | ❌ Missing | LOW |
| Couple photo in closing | ✅ Faded couple photo as background | ❌ Solid dark background | MEDIUM |
| Venue arch card | ✅ Arch-shaped card top | ❌ Standard rounded card | HIGH |

---

## Priority Summary

### HIGH Priority (visually obvious or interaction-breaking)
1. **Gallery layout**: Static 2×2 placeholder grid → horizontal scrollable carousel with gold-framed photos, prev/next buttons, and progress indicator. (Files: `css/styles.css` `.i-gallery`, `index.html` gallery section, `js/script.js`)
2. **Event card image height**: 240px → ~450px to match reference's immersive image feel. (Files: `css/styles.css` `.i-event__hero`)
3. **Venue arch card**: Add `border-radius: 168px 168px 0 0` arch shape with floral imagery at top. (Files: `css/styles.css` `.i-venue__map`, `index.html` venue section)
4. **Save-the-date hearts**: Flat gold gradient → 3D embossed metalwork locket appearance with laurel wreath. (Files: `css/styles.css`, possibly SVG/image assets)
5. **Bottom nav font size**: 9.6px → ~17px for readability. (Files: `css/styles.css` `.bottom-nav`)
6. **Missing shimmer/sheen animations**: Add gold shimmer on hearts, ornaments, dividers. (Files: `css/styles.css` new keyframes)
7. **Missing staggered entrance animations**: Elements should reveal one-by-one with delays, not all at once. (Files: `css/styles.css`, `js/script.js` IntersectionObserver)

### MEDIUM Priority (noticeable polish difference)
8. **Hero name font size**: 40px → ~55-60px for more prominence. (Files: `css/styles.css`)
9. **Missing Skip button on envelope** (Files: `index.html`, `css/styles.css`)
10. **Missing Hindi language toggle** (Files: `index.html`, `js/script.js` — significant i18n work)
11. **Missing Share button in closing** (Files: `index.html`, `js/script.js`)
12. **Missing couple photo in closing background** (Files: `css/styles.css` `.i-closing`, assets)
13. **Family decorative separator**: Add ornamental element between family cards. (Files: `index.html`, `css/styles.css`)
14. **RSVP button pill shape**: Add `border-radius: 16.8px` to bottom nav RSVP. (Files: `css/styles.css`)
15. **Bottom nav active section highlighting** on scroll. (Files: `js/script.js`, `css/styles.css`)
16. **Jhalar edges too prominent**: Reduce from 22px to ~8px, use subtler styling. (Files: `css/styles.css`)
17. **Card shadows too flat**: Use deeper layered shadows matching reference. (Files: `css/styles.css`)
18. **Write-on / draw-in animations** for SVG ornaments. (Files: `css/styles.css`)

### LOW Priority (subtle refinement)
19. **Family quote card**: Add fun blockquote from a family member. (Files: `index.html`)
20. **Family expand button**: "See the whole family" collapsible section. (Files: `index.html`, `js/script.js`)
21. **RSVP stamp badge shape**: Square postage-stamp vs current circle. (Files: `css/styles.css`)
22. **Gold heart size on hero**: Reduce to match reference's subtle heart. (Files: `css/styles.css`)
23. **Corner ornament SVGs**: Replace CSS brackets with decorative SVG ornaments. (Files: `index.html`, `css/styles.css`)
24. **Scroll indicator**: Change from infinite loop to one-time reveal. (Files: `css/styles.css`)
25. **Breathing/pulse micro-animations** on decorative elements. (Files: `css/styles.css`)

---

## Relevant Files

- `index.html` — all HTML structure changes
- `css/styles.css` — all styling, animation, and layout changes
- `js/script.js` — interaction logic (carousel, scroll-reveal, share, language toggle)
- `assets/images/` — image assets for gallery, venue floral, couple photo

## Conclusions

The overall structure is solid and closely mirrors the reference. The biggest visual gaps are concentrated in three areas:

1. **Animation richness** — the reference has 3× more animation keyframes and uses staggered, choreographed entrance effects that make the site feel alive. Our reveals are functional but uniform.

2. **Gallery and Venue** — these two sections have fundamentally different treatments (static grid vs carousel, flat card vs arch card) that would noticeably elevate the experience.

3. **Bottom nav readability** — at 9.6px, our nav labels are nearly half the reference's 17px, making them hard to read on mobile.

Fixing the HIGH-priority items would close the largest perceived quality gap between the two sites.
