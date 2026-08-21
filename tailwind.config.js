/** @type {import('tailwindcss').Config} */

/*
 * TERRAIN SURVEY — design tokens
 * ------------------------------------------------------------------
 * The palette is a topographic elevation ramp. It is not decoration:
 * each ramp stop maps to one discipline, and that mapping is fixed
 * across the whole site.
 *
 *   moss   → web        (sea level, where the journey started)
 *   amber  → mobile     (mid-slope, the Play Store releases)
 *   rust   → games      (the summit, Unity 3D / Gaea)
 *
 * Base tones are a deep petrol ink rather than pure black, so the
 * contour lines have something to sit on without crushing to #000.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D1317',        // unexposed plate — page ground
        basin: '#141E24',      // raised panel / card ground
        ridge: '#1B272E',      // hovered panel
        graticule: '#233038',  // hairlines, grid, borders
        mist: '#7C8B92',       // marginalia, secondary text
        bone: '#E9E3D5',       // plate paper — primary text
        // elevation ramp
        moss: '#778C5A',
        amber: '#D39A3A',
        rust: '#A8452A',
      },
      fontFamily: {
        // Archivo carries a width axis — we run it expanded for plate
        // titles, which is what gives the survey-sheet register.
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        plate: '-0.015em',
        survey: '0.18em',
        margin: '0.26em',
      },
      maxWidth: {
        sheet: '84rem',
        measure: '38rem',
      },
      transitionTimingFunction: {
        survey: 'cubic-bezier(0.16, 0.84, 0.24, 1)',
      },
      // No animation/keyframes block. Every entrance on this site runs
      // through the single .reveal primitive in index.css, driven by one
      // IntersectionObserver — four competing keyframe utilities was how
      // the old build ended up with animations firing over each other.
    },
  },
  plugins: [],
}
