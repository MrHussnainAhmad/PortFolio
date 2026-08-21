# Handover — Terrain Survey rebuild

Everything is written and self-consistent. What is left is yours: four Play
Store URLs, a few stack corrections, and one `npm install`.

---

## 1. Run it

```bash
npm install     # required — five FontAwesome packages were removed,
                # so package-lock.json is stale until you do this
npm run dev
npm run build
```

The install is not optional. `package.json` now lists four dependencies
(`@emailjs/browser`, `@vercel/analytics`, `react`, `react-dom`) and the
lockfile still describes the old tree.

I did not run the build myself — you asked to take that on.

---

## 2. Fill in the blanks — `src/data/products.js`

Search that file for `VERIFY`. Nine hits, three kinds:

**Play Store URLs (4).** `storeUrl: ''` on Muslim Deen, AI Habit Tracker,
Whisper and Castle Rush. Until they are filled, the card shows a
non-clickable "On Google Play" line. That is true but useless, and it is
deliberate — I would rather show you an empty field than a guessed URL.

**Stacks (5).** I inferred React Native / Expo for the three apps and
Next.js / MongoDB for Nisaab360 from what you told me. Correct anything
wrong; the arrays render verbatim.

**Nisaab360 summary.** Kept deliberately general, because I have not seen
the product. One paragraph in your own words will do more here than
anything I could write.

Nothing else in that file needs touching. Every count on the page —
"shipped", "on Play", "games" — is derived from the arrays, so it can
never contradict the lists.

---

## 3. Placeholder art — `src/assets/products/`

Eleven files: five square icons (512×512) and five 16:10 covers
(1600×1000), all hand-authored SVG in the site palette. They are designed
to be swapped, not kept.

To replace one, drop your file in that folder and change the matching
import at the top of `products.js`. One line per image, nothing else.
`src/assets/products/README.md` has the sizes, where to pull real art
from the Play Console, and the palette table.

---

## 4. What the design is doing

One coherent idea rather than three stapled together: **a topographic
survey sheet**, because a heightmap is the one artifact that belongs to
web, mobile and 3D work at once.

The palette is an elevation ramp and the mapping is fixed everywhere on
the site — moss for web (sea level, where you started), amber for mobile
(mid-slope, the Play Store releases), rust for games (the summit). The
colour is information, not decoration; nothing on the page uses a band
colour for any other reason.

The signature is `ContourField`: a seeded fBm heightmap contoured with
marching squares on a canvas behind the page. Thresholds sweep upward so
lines creep toward the ridgelines and vanish, every fifth line is drawn
heavier (the real cartographic index-contour convention), the line colour
follows the ramp as you scroll, and on a mouse the cursor is a terrain
brush that bows the contours around it. No 3D library, no images, ~4kB of
maths.

Plate 01 is the load-bearing one. The elevation profile *is* the
navigation: every project is a pin placed at its own elevation, the curve
through them is your actual progression, and clicking a pin opens it.
Below `lg` it degrades to an ordered ascent list, summit first, because
pins that small are not a real hit target.

Billing carries the judgment. Play Store releases get cards, strong
earlier work gets register rows, the rest gets a line and a link. A
portfolio that gives a 2024 practice build the same card as a shipped
release is telling the reader you cannot tell the difference.

---

## 5. Changes worth knowing about

**Single scrolling document.** The old build swapped pages with component
state, so the back button did nothing and no section could be linked to.
There are now six real anchors: `#climb`, `#shipped`, `#nisaab360`,
`#instruments`, `#selected`, `#register`.

**EmailJS is untouched.** Same three env vars
(`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`,
`VITE_EMAILJS_PUBLIC_KEY`) and the same field names (`user_name`,
`user_email`, `message`), so your existing template keeps working. New:
if any var is missing the form explains itself and offers a mailto
instead of failing silently.

**Deleted** — `Modal.jsx`, `Navbar.jsx`, `Projects.jsx`, `StarField.jsx`.
All four superseded; no surviving references.

**Removed** — five `@fortawesome/*` packages (replaced by four inline SVG
icons in `components/icons.jsx`), the unused Tailwind
`animation`/`keyframes` block, and three dead CSS classes. Every entrance
now runs through one `.reveal` primitive driven by one
IntersectionObserver.

**Added** — `public/mark.svg`, which `index.html` was already asking for
and did not have.

---

## 6. What I checked, and what I did not

Checked without a build: every relative import resolves against the
filesystem; every named import matches a real export in its target
module; no surviving reference to FontAwesome or the four deleted files;
`public/` has both `Cv.pdf` and `mark.svg`; 22 source files, no orphans.

Fixed on a second read: `reveal-d${i+1}` in `Toolkit.jsx` — Tailwind
scans source text, so the interpolated names would have been purged and
the stagger would have silently done nothing in production. Also three
real `ContourField` bugs: `pointerout` bubbles and was dragging the brush
to zero on every element transition (now `pointerleave` on the root); a
full marching-squares pass was running per scroll event under
`prefers-reduced-motion` (now one static frame and no listener); and the
canvas was on `-z-10`, relying on body-background propagation to stay
visible (now `z-0`, with content explicitly at `z-10`).

Not checked: the build, and how it looks on a real screen. Both yours.
Tell me what breaks and I will fix it.
