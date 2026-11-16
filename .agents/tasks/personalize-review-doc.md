# Content personalization for Mukul & Sailly wedding invitation

This change replaces all placeholder names, family details, venue, dates, and event information across `index.html` and `js/script.js` to personalize the wedding invitation for Mukul & Sailly. The replacement covers couple names, both families' parent/grandparent/elder details, four events (Bhaat added as a new card), venue changed to Zuke Gardens in Purulia, date moved to 30 November 2026, and all initials and RSVP text updated. The Our Story timeline retains placeholder content per the user's instruction to provide milestones later.

Watch for: The "Meera trap" — the bride's name was changed from Meera to Sailly while the groom's mother Meera was correctly preserved in both the card section and the families section (confirmed). Day-of-week accuracy on four event cards was verified against a calendar (confirmed).

**Verdict**: APPROVED

## High-level view

The Meera disambiguation — the highest-risk item in this change — was handled correctly. "Meera" appears exactly twice in the final `index.html`, both times referring to the groom's mother (the card section and the families section). Every bride-facing occurrence was replaced with "Sailly". No residual "Arjun" references remain anywhere.

The four-event lineup is in the correct order (Bhaat, Sangeet, Carnival & Haldi, Baraat & Shubh Vivah) with dates and times matching the user's specification. The new Bhaat card reuses `mehndi-800.webp` since only three event images exist for four cards; Carnival & Haldi also shares that image. Both 29 November (Sunday) and 30 November (Monday) day-of-week labels are calendar-accurate.

All venue references — event cards, the venue section, Google Maps links — consistently point to Zuke Gardens, Chakra, Purulia. Travel guidance was updated (Ranchi/Kolkata airports, Purulia Junction, November weather). Family names, cities, grandparents, elders, Darshanabhilashi, and Swagatotsuk roles all match the replacement map. The RSVP deadline, plate text, and M&S stamp are correct. The JS countdown targets `2026-11-30T19:00:00+05:30` and the WhatsApp number remains `919999999999`.

CSS and image assets were not touched.

<details>
<summary>Issues (0)</summary>

No blocking issues found. All mapped replacements were applied correctly.

</details>

<details>
<summary>Details</summary>

### The Meera disambiguation

The bride "Meera" was replaced with "Sailly" in all six expected locations: page title, cover-poster alt text, hero couple alt text, hero name span, card section bride name heading, and the Our Story first-met paragraph. The groom's mother "Meera" was preserved in both places she appears: line 222 (`Son of Smt. Meera & Shri Sanjay Gaddhyan` in the card section) and line 560 (`Smt. Meera & Shri Sanjay Gaddhyan` in the families card). A full-file grep for "Meera" returns exactly these two lines. A grep for "Arjun" returns zero hits. Confidence: confirmed.

### Four events with correct structure and data

The original three event cards (Haldi, Mehndi & Sangeet, Baraat) were replaced with four: Bhaat (Sunday 29 Nov, 1:00 PM), Sangeet (Sunday 29 Nov, 7:00 PM), Carnival & Haldi (Monday 30 Nov, 11:00 AM), Baraat & Shubh Vivah (Monday 30 Nov, 7:00 PM). The Bhaat card uses the identical `article.i-event` markup structure as the existing cards — hero image, overlay, hero text with date/name/time, then details with venue pin, description, dress code, and directions link. All four cards point their directions link to `Zuke+Gardens+Chakra+Purulia`. Day-of-week labels were verified against a Python `datetime` calendar check: 29 Nov 2026 is Sunday, 30 Nov 2026 is Monday. Confidence: confirmed.

Two event cards (Bhaat and Carnival & Haldi) share `mehndi-800.webp` because only three event images exist for four events. This is a cosmetic limitation, not a data-correctness issue.

### Initials and RSVP surface

The envelope initials (`M <span>&</span> S`), the wax-seal SVG text (`M & S`), and the RSVP stamp (`M&S`) were all updated from `A & M` / `A&M`. The RSVP deadline is "Sunday, 15 November" — confirmed that 15 Nov 2026 is a Sunday. The plate text changed from "malai ghewar" to "rosogolla". The closing credit reads "The Gaddhyan & Marodia families". Confidence: confirmed.

### Family details alignment

Groom side: Grandson of Late Smt. Anandi Devi & Late Shri Kampla Prasad Gaddhyan, Son of Smt. Meera & Shri Sanjay Gaddhyan, city Chirkunda Dhanbad Jharkhand. Bride side: Granddaughter of Late Smt. Geeta Devi & Shri Omprakash Marodia, Daughter of Smt. Neelam & Shri Sanjay Kumar Marodia, city Raniganj West Bengal. The families section: The Gaddhyans / The Marodias with matching parent names and cities. Darshanabhilashi: Bimal Gaddhyan, Sanjay Gaddhyan. Swagatotsuk: Satyanarayan Marodia and the whole Gaddhyan & Marodia family. "With the blessings of" lists the late grandparents. Closing line: "Dhanbad and Raniganj, one family from now on." All match the replacement map. Confidence: confirmed.

### JS countdown and RSVP messages

The countdown target changed from `2027-02-19T23:40:00+05:30` to `2026-11-30T19:00:00+05:30` with the matching comment. Both RSVP WhatsApp messages (attending yes / no) now reference "Mukul & Sailly's wedding" instead of "Arjun & Meera's". The WhatsApp number `919999999999` is preserved at line 493. No "Arjun" or "Meera" strings remain anywhere in `script.js`. Confidence: confirmed.

### Our Story timeline — placeholder content retained

Per the replacement map ("dates/titles/content untouched"), the five timeline milestones keep their original dates and prose. Only the "First Met" paragraph's names were swapped (Arjun→Mukul, Meera→Sailly). The "Wedding" milestone still reads "February 2027" — this is intentional since the user will provide their own milestones later.

</details>

<details>
<summary>File map</summary>

- **index.html** — All couple names, family details, venue, dates, events (4 cards), initials, RSVP text, travel info, and closing credit personalized.
- **js/script.js** — Header comment, countdown target date, and both RSVP WhatsApp message templates updated with new names.

</details>
