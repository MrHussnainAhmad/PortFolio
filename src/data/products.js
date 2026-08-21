/*
 * products.js — everything on the sheet.
 * ==================================================================
 *
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │  TO FINISH THIS FILE, SEARCH FOR:  VERIFY                    │
 *  │                                                              │
 *  │  1. storeUrl — paste each Google Play listing URL. Until you │
 *  │     do, the card shows a non-clickable "On Google Play"      │
 *  │     badge, which is accurate but not useful. Nothing is      │
 *  │     invented here on purpose.                                │
 *  │  2. stack — I inferred React Native / Unity from what you    │
 *  │     told me. Correct anything that is wrong.                 │
 *  │  3. summary — one line each, in your words, if mine miss.    │
 *  └──────────────────────────────────────────────────────────────┘
 *
 *  IMAGES
 *  Every entry points at a designed placeholder in src/assets/products/.
 *  Those placeholders are SVG. To use your real art, drop the file into
 *  that folder and change the matching import below to your filename —
 *  one line per image, nothing else to touch. Sizes are in the README
 *  in that folder.
 *
 *    icon   square    app icon / mark, shown on the card
 *    cover  16:10     wide shot, shown in the inspector panel
 *
 *  FIELDS
 *    band       'web' | 'mobile' | 'game'  → sets the colour, always
 *    elevation  metres on the climb profile. Higher = further up the
 *               journey. Used to place the pin, so keep them spread out.
 *    status     'live' | 'shipped' | 'building' | 'paused'
 */

// -- placeholder art — swap these paths for your own files -----------
import iconMuslimDeen from '../assets/products/muslim-deen.svg'
import coverMuslimDeen from '../assets/products/muslim-deen-cover.svg'
import iconHabit from '../assets/products/ai-habit-tracker.svg'
import coverHabit from '../assets/products/ai-habit-tracker-cover.svg'
import iconWhisper from '../assets/products/whisper.svg'
import coverWhisper from '../assets/products/whisper-cover.svg'
import iconCastleRush from '../assets/products/castle-rush.svg'
import coverCastleRush from '../assets/products/castle-rush-cover.svg'
import iconNisaab from '../assets/products/nisaab360.svg'
import coverNisaab from '../assets/products/nisaab360-cover.svg'

// -- existing screenshots already in the repo ------------------------
import coverStreamMe from '../assets/Streamme.png'
import coverLms from '../assets/LMS.png'
import coverEbooks from '../assets/ebookhubWeb.png'
import coverShop from '../assets/shop.png'
import coverTapWar from '../assets/Tapwar.png'
import coverCipher from '../assets/Cipher.png'
import coverVetville from '../assets/vetvillepet.png'

/* ==================================================================
   FEATURED — the work that is out in the world with a real install.
   Ordered by elevation: this is the climb.
   ================================================================== */

export const featured = [
  {
    slug: 'muslim-deen',
    name: 'Muslim Deen',
    subtitle: 'Quran & Prayers',
    band: 'mobile',
    elevation: 1520,
    year: '2025',
    status: 'live',
    platform: 'Android',
    icon: iconMuslimDeen,
    cover: coverMuslimDeen,
    summary: 'Quran reading and daily prayer times in one app, built to stay out of the way.',
    detail:
      'A companion app for daily practice: read the Quran, check prayer times, and keep the whole thing quiet and fast. The interface work here was the first time I designed for people who open an app five times a day, every day — which changes almost every decision you make about navigation and load time.',
    stack: ['React Native', 'Expo', 'JavaScript'], // VERIFY
    storeUrl: '', // VERIFY — paste the Google Play URL
    repoUrl: '',
    highlights: [
      'Quran reader with continuous scroll',
      'Prayer times for the user’s location',
      'Built for repeat daily use, not one-off visits',
    ],
  },
  {
    slug: 'ai-habit-tracker',
    name: 'AI Habit Tracker',
    subtitle: 'Habits, with a nudge',
    band: 'mobile',
    elevation: 1740,
    year: '2025',
    status: 'live',
    platform: 'Android',
    icon: iconHabit,
    cover: coverHabit,
    summary: 'Habit tracking that reads your streaks and tells you something useful about them.',
    detail:
      'Most habit apps stop at the checkbox. This one looks at the pattern behind the checkboxes and turns it into a plain-language read on what is actually working. The interesting engineering problem was keeping the whole thing responsive while the analysis runs.',
    stack: ['React Native', 'Expo', 'JavaScript'], // VERIFY
    storeUrl: '', // VERIFY
    repoUrl: '',
    highlights: [
      'Streaks and completion history',
      'Generated summaries of your own patterns',
      'Works offline, syncs when it can',
    ],
  },
  {
    slug: 'whisper',
    name: 'Whisper',
    subtitle: '1-to-1 chat',
    band: 'mobile',
    elevation: 1980,
    year: '2025',
    status: 'live',
    platform: 'Android',
    icon: iconWhisper,
    cover: coverWhisper,
    summary: 'A chat app with exactly one room type: you and one other person.',
    detail:
      'Group chat is a solved problem and a noisy one. Whisper deliberately does only one-to-one, which let me spend the effort on the parts that actually matter in a conversation — delivery state, message ordering when the connection drops, and notifications that arrive when they should.',
    stack: ['React Native', 'Socket.io', 'Node.js', 'MongoDB'], // VERIFY
    storeUrl: '', // VERIFY
    repoUrl: '',
    highlights: [
      'Real-time delivery over sockets',
      'Ordering that survives a dropped connection',
      'Push notifications',
    ],
  },
  {
    slug: 'castle-rush',
    name: 'Castle Rush',
    subtitle: 'Endless runner',
    band: 'game',
    elevation: 2620,
    year: '2026',
    status: 'live',
    platform: 'Android · Unity',
    icon: iconCastleRush,
    cover: coverCastleRush,
    summary: 'My first 3D game. An endless runner, shipped rather than left in a folder.',
    detail:
      'The whole point of this one was to finish. Coming from React Native, Unity meant learning a real scene graph, a fixed-timestep update loop, object pooling for the procedural track, and how much of a game is tuning numbers rather than writing code. It is on Google Play, which mattered more to me than it being ambitious.',
    stack: ['Unity', 'C#', '3D', 'Gaea'],
    storeUrl: '', // VERIFY
    repoUrl: '',
    highlights: [
      'Procedurally assembled endless track',
      'Object pooling to hold frame rate on low-end phones',
      'First shipped 3D title',
    ],
  },
]

/* ==================================================================
   STARTUP — its own plate. Not a project.
   ================================================================== */

export const startup = {
  slug: 'nisaab360',
  name: 'Nisaab360',
  band: 'web',
  elevation: 1180,
  year: '2026',
  status: 'live',
  icon: iconNisaab,
  cover: coverNisaab,
  tagline: 'A product of my own, not a client brief.',

  // VERIFY — replace with your own paragraph. I have deliberately kept
  // this general rather than describing features I have not seen.
  summary:
    'A small SaaS I designed, built and launched on my own, now live at nisaab360.app and listed on SaaSBrowser.',
  detail:
    'Every other thing on this sheet is something I built. Nisaab360 is something I had to run: decide what it does, decide what it does not do, put it on a domain, and be the person responsible when it breaks. That is a different skill from writing the code, and it is the one I most wanted to learn.',

  stack: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS'], // VERIFY
  website: 'https://www.nisaab360.app',
  listing: 'https://saasbrowser.com/en/saas/1591437/nisaab360',

  facts: [
    { label: 'Role', value: 'Everything' },
    { label: 'Status', value: 'Live' },
    { label: 'Domain', value: 'nisaab360.app' },
    { label: 'Listed on', value: 'SaaSBrowser' },
  ],
}

/* ==================================================================
   SELECTED — the strongest earlier work. Full cards, lower billing.
   ================================================================== */

export const selected = [
  {
    slug: 'streamme',
    name: 'StreamMe',
    band: 'web',
    elevation: 860,
    year: '2025',
    status: 'live',
    cover: coverStreamMe,
    summary:
      'A Next.js streaming platform with CDN-delivered video, auth, and an ad layer instead of a paywall.',
    detail:
      'The hard part of a streaming site is not the player, it is delivery. This one leans on a CDN for the video and keeps the app layer thin, with authentication and an advertising layer in place of payments.',
    stack: ['Next.js', 'MongoDB', 'CDN', 'MERN'],
    repoUrl: 'https://github.com/MrHussnainAhmad/Streaming-Site',
    liveUrl: '',
  },
  {
    slug: 'college-lms',
    name: 'College LMS',
    band: 'web',
    elevation: 780,
    year: '2025',
    status: 'live',
    cover: coverLms,
    summary:
      'Two clients, one backend: a mobile app for teachers and students, a web console for admins.',
    detail:
      'Classes, subjects, attendance, assignments and announcements, with a React Native app for the people using it daily and a web admin for the people configuring it. Designing one API that served two very different clients was the whole lesson.',
    stack: ['React', 'React Native', 'Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/MrHussnainAhmad/aplhamobile',
    liveUrl: '',
  },
  {
    slug: 'ebookshub',
    name: 'EBooksHub',
    band: 'web',
    elevation: 640,
    year: '2024',
    status: 'live',
    cover: coverEbooks,
    summary:
      'A library for Islamic eBooks — categorised browsing, author pages, and readable or downloadable text.',
    detail:
      'Built for readers rather than crawlers first, then made to work for both: server-rendered content, real category structure, and accessible markup. There is a companion React Native reader with offline support.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Tailwind CSS'],
    repoUrl: 'https://github.com/MrHussnainAhmad/ebookshubFront0.1.7',
    liveUrl: 'https://ebookshub.live/',
  },
  {
    slug: 'ecommerce',
    name: 'Storefront',
    band: 'web',
    elevation: 700,
    year: '2025',
    status: 'live',
    cover: coverShop,
    summary:
      'A full commerce flow — browse, cart, checkout, orders, admin — on Next.js with Clerk and Cloudinary.',
    detail:
      'Commerce is where sloppy state management stops being survivable. Cart and order state had to be right, image delivery had to be fast, and the admin side had to be usable by someone who is not me.',
    stack: ['Next.js', 'MongoDB', 'Clerk', 'Cloudinary'],
    repoUrl: 'https://github.com/MrHussnainAhmad/shop2',
    liveUrl: '',
  },
  {
    slug: 'tapwar',
    name: 'TapWar',
    band: 'game',
    elevation: 2180,
    year: '2025',
    status: 'live',
    cover: coverTapWar,
    summary:
      'The game before the game. A 2D reflex tapper in React Native — endless mode and timed mode.',
    detail:
      'Small, but it is the reason Castle Rush exists. TapWar was where I found out that game feel is a real engineering concern, and that React Native was not going to take me where I wanted to go. Unity followed shortly after.',
    stack: ['React Native', 'JavaScript'],
    repoUrl: 'https://github.com/MrHussnainAhmad/TapWar',
    liveUrl: '',
  },
]

/* ==================================================================
   ARCHIVE — kept on the sheet, not given a card. Links only.
   ================================================================== */

export const archive = [
  {
    name: 'Cipher — web & mobile chat',
    band: 'web',
    year: '2024',
    note: 'Real-time chat on Socket.io, with a React Native client alongside the web app.',
    cover: coverCipher,
    repoUrl: 'https://github.com/MrHussnainAhmad/Talko-WEB-frontend-v1',
  },
  {
    name: 'Cipher Mobile',
    band: 'mobile',
    year: '2024',
    note: 'The React Native client. Firebase, Expo, offline sync.',
    repoUrl: 'https://github.com/MrHussnainAhmad/Talkora-Mobile-App',
  },
  {
    name: 'EBooksHub Reader',
    band: 'mobile',
    year: '2024',
    note: 'React Native reader for the EBooksHub library, with offline reading.',
    repoUrl: 'https://github.com/MrHussnainAhmad/eBooksHub-apk',
  },
  {
    name: 'VetvillePets',
    band: 'web',
    year: '2024',
    note: 'Portfolio site for a pet care startup. Services, gallery, enquiries.',
    cover: coverVetville,
    repoUrl: 'https://github.com/MrHussnainAhmad/vetpet',
    liveUrl: 'https://vetpet-port.vercel.app/',
  },
  {
    name: 'This sheet',
    band: 'web',
    year: '2026',
    note: 'The site you are reading. Contour field is marching squares over a seeded fBm heightmap.',
    repoUrl: 'https://github.com/MrHussnainAhmad/portfolio',
  },
]

/* Counts used in the hero. Derived, so they can never drift from the
   lists above — the one number a portfolio must never get wrong. */
export const tally = {
  shipped: featured.length + selected.length,
  onPlay: featured.filter((p) => p.platform?.includes('Android')).length,
  games: [...featured, ...selected].filter((p) => p.band === 'game').length,
}

/* Every openable item, indexed once. The inspector, the climb pins and
   the card grids all resolve through here, so a project is described in
   exactly one place. */
const bySlug = new Map(
  [...featured, startup, ...selected].map((item) => [item.slug, item]),
)

export function findBySlug(slug) {
  return bySlug.get(slug) || null
}
