import { bands } from '../data/profile'
import { ArrowUpRight, PlayMark } from './icons'

/*
 * ui.jsx — the survey sheet vocabulary.
 * Shared parts, so every plate is numbered, ruled and labelled the same
 * way. If a device shows up in two places it belongs in here.
 */

/** Hairline graticule rule that fills available space. */
export function Rule({ className = '' }) {
  return <span className={`rule block ${className}`} aria-hidden="true" />
}

/**
 * A plate. Numbered, ruled, with an elevation readout on the right.
 *
 * The numbering is not decoration: the plates are read in order and the
 * order is the actual journey — web, then phones, then 3D.
 */
export function Plate({ id, number, title, elevation, lede, children, className = '' }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-sheet px-6 md:px-10">
        <header className="reveal">
          <div className="flex items-center gap-4">
            <span className="t-margin shrink-0 text-mist">Plate {number}</span>
            <Rule className="flex-1" />
            {elevation ? (
              <span className="t-data shrink-0 text-mist/80">{elevation}</span>
            ) : null}
          </div>

          <h2 className="t-display mt-7 text-[clamp(2.1rem,6.4vw,4.25rem)] uppercase text-bone">
            {title}
          </h2>

          {lede ? (
            <p className="mt-5 max-w-measure text-base leading-relaxed text-mist md:text-lg">
              {lede}
            </p>
          ) : null}
        </header>

        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  )
}

/** Small monospace caption used throughout the margins. */
export function Mono({ children, className = '' }) {
  return <span className={`t-data text-mist ${className}`}>{children}</span>
}

/** Band tag — the colour is the information, so the dot is not optional. */
export function BandTag({ band, className = '' }) {
  const info = bands[band]
  if (!info) return null
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="block h-[7px] w-[7px] shrink-0"
        style={{ backgroundColor: info.color }}
        aria-hidden="true"
      />
      <span className="t-eyebrow text-mist">{info.label}</span>
    </span>
  )
}

/** Status pill. Live gets a pulse; nothing else does. */
export function StatusBadge({ status }) {
  const map = {
    live: { label: 'Live', color: '#778C5A' },
    shipped: { label: 'Shipped', color: '#778C5A' },
    building: { label: 'Building', color: '#D39A3A' },
    paused: { label: 'Paused', color: '#7C8B92' },
  }
  const info = map[status] || map.shipped

  return (
    <span className="t-eyebrow inline-flex items-center gap-2 text-mist">
      <span
        className="relative block h-[5px] w-[5px] rounded-full"
        style={{ backgroundColor: info.color }}
        aria-hidden="true"
      />
      {info.label}
    </span>
  )
}

const buttonBase =
  't-eyebrow inline-flex items-center justify-center gap-2 rounded-[2px] px-6 py-3.5 transition-all duration-300 ease-survey'

/** Filled action. One per view, at most. */
export function ActionButton({ as = 'button', className = '', children, ...rest }) {
  const Tag = as
  return (
    <Tag
      className={`${buttonBase} bg-bone text-ink hover:-translate-y-0.5 hover:bg-white ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Outlined action. */
export function GhostButton({ as = 'button', className = '', children, ...rest }) {
  const Tag = as
  return (
    <Tag
      className={`${buttonBase} border border-graticule text-bone hover:-translate-y-0.5 hover:border-mist/70 hover:bg-basin ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * External link, styled as a survey annotation: label, hairline, arrow.
 * The underline grows from the left on hover, which is the only
 * flourish in the whole link treatment.
 */
export function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex items-baseline gap-1.5 text-bone transition-colors duration-300 hover:text-amber ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber transition-all duration-300 ease-survey group-hover/link:w-full" />
      </span>
      <ArrowUpRight className="translate-y-[1px] text-[0.85em] opacity-60 transition-transform duration-300 group-hover/link:-translate-y-0 group-hover/link:opacity-100" />
    </a>
  )
}

/**
 * Google Play badge. Renders as a link when a store URL exists and as a
 * plain statement of fact when it doesn't — the app really is on Play,
 * the URL just hasn't been pasted into src/data/products.js yet.
 */
export function PlayBadge({ url, className = '' }) {
  const content = (
    <>
      <PlayMark className="text-[0.9em]" />
      <span>On Google Play</span>
    </>
  )

  if (!url) {
    return (
      <span
        className={`t-eyebrow inline-flex items-center gap-2 rounded-[2px] border border-graticule px-3 py-2 text-mist ${className}`}
      >
        {content}
      </span>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`t-eyebrow inline-flex items-center gap-2 rounded-[2px] border border-graticule px-3 py-2 text-bone transition-colors duration-300 hover:border-amber/60 hover:text-amber ${className}`}
    >
      {content}
      <ArrowUpRight className="text-[0.85em] opacity-60" />
    </a>
  )
}

/** Definition row used in the inspector and the startup plate. */
export function DataRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-graticule/60 py-3">
      <dt className="t-eyebrow text-mist">{label}</dt>
      <dd className="t-data text-right text-bone">{value}</dd>
    </div>
  )
}

/** Stack chips. Flat, square, quiet — they're metadata, not features. */
export function StackList({ items, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-x-2 gap-y-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="t-data rounded-[2px] border border-graticule bg-basin/70 px-2.5 py-1 text-mist"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
