/*
 * icons.jsx
 * A deliberately tiny set. The old build pulled in four FontAwesome
 * packages for a handful of glyphs; a survey sheet wants labels and
 * hairlines, not an icon for everything, so this is all that's left.
 *
 * Every icon inherits currentColor and sits on a 16-unit grid.
 */

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function ArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
    </svg>
  )
}

export function ArrowDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v10M4 9.5 8 13.5l4-4" />
    </svg>
  )
}

export function Close(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}

export function Menu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 5h11M2.5 11h11" />
    </svg>
  )
}

/** A play-shaped mark for Google Play listings. Not their logo — just a
 *  triangle, which is all the badge needs to read correctly. */
export function PlayMark(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 3.2 12.4 8 5 12.8V3.2Z" />
    </svg>
  )
}

/** Survey pin. Used on the climb profile and beside plate numbers. */
export function Pin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 14V7" />
      <circle cx="8" cy="4.6" r="2.4" />
    </svg>
  )
}

export function Spinner(props) {
  return (
    <svg {...base} {...props} className={`animate-spin ${props.className || ''}`}>
      <path d="M8 2a6 6 0 1 0 6 6" />
    </svg>
  )
}
