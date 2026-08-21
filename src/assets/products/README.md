# Product art

Everything in here is a placeholder I drew so the layout could be judged
before your real art exists. They are on-palette and labelled, but they
are not your app icons — replace them.

## How to replace one

1. Drop your file into this folder.
2. Open `src/data/products.js` and change the one matching import line.

That is the whole job. Nothing else references these paths.

```js
// before
import iconWhisper from '../assets/products/whisper.svg'

// after
import iconWhisper from '../assets/products/whisper.png'
```

## What each file is

| File | Where it shows | Size |
| --- | --- | --- |
| `<name>.svg` | Shipped card, top-left of the card | square, 512×512 is plenty |
| `<name>-cover.svg` | Inspector panel, above the title | 16:10, 1600×1000 |

Icons are rendered at 56–64px with `object-cover`, so anything square
works. Covers are rendered at `aspect-[16/10]` with `object-cover`, so a
different ratio will be cropped from the centre rather than squashed.

## Where to get the real ones

Your Play Store listing already has both, at the right sizes:

- **Icon** — the 512×512 PNG you uploaded as the app icon.
- **Cover** — the 1024×500 feature graphic, or better, a phone screenshot
  composited on the ink background (`#0D1317`) so it sits in the page
  instead of punching a bright rectangle through it.

Real screenshots beat these placeholders every time. The one thing worth
keeping is the dark ground: a screenshot on a white background will fight
the rest of the sheet.

## Palette, if you are drawing your own

The band colour is not decorative — it encodes the discipline, and it is
the same mapping everywhere on the site.

| Band | Hex | Used for |
| --- | --- | --- |
| Web | `#778C5A` | Nisaab360 |
| Mobile | `#D39A3A` | Muslim Deen, AI Habit Tracker, Whisper |
| Games | `#A8452A` | Castle Rush |

Supporting values: ink `#0D1317` (ground), basin `#141E24`, graticule
`#233038` (hairlines), mist `#7C8B92` (secondary text), bone `#E9E3D5`
(primary text).
