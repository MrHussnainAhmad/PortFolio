import { useState } from 'react'
import { profile, bands, bandOrder } from '../data/profile'
import { Close, Menu, ArrowDown } from './icons'
import { useScrollLock, useEscape } from '../lib/hooks'

/*
 * SheetHeader
 * The mark doubles as an instrument: its swatch takes the colour of the
 * band you are currently reading, and the readout beside it reports your
 * elevation on the sheet. It is the smallest possible way to keep the
 * metaphor legible without adding another panel to the page.
 */

const PLATES = [
  { id: 'climb', label: 'The climb' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'nisaab360', label: 'Nisaab360' },
  { id: 'instruments', label: 'Instruments' },
  { id: 'selected', label: 'Selected' },
  { id: 'register', label: 'Contact' },
]

const MAX_ELEVATION = 2900

function bandForProgress(progress) {
  if (progress < 0.34) return bands.web
  if (progress < 0.7) return bands.mobile
  return bands.game
}

export function SheetHeader({ active, progress }) {
  const [open, setOpen] = useState(false)
  useScrollLock(open)
  useEscape(open, () => setOpen(false))

  const band = bandForProgress(progress)
  const elevation = Math.round(progress * MAX_ELEVATION)

  return (
    <>
      <a
        href="#climb"
        className="t-eyebrow fixed left-1/2 top-2 z-[60] -translate-x-1/2 -translate-y-20 rounded-[2px] bg-bone px-4 py-2 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-graticule/70 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-sheet items-center gap-6 px-6 md:px-10">
          {/* Mark — swatch reports the current band */}
          <a href="#top" className="group flex items-center gap-3 shrink-0">
            <span
              className="block h-3 w-3 transition-colors duration-700 ease-survey"
              style={{ backgroundColor: band.color }}
              aria-hidden="true"
            />
            <span className="t-eyebrow text-bone">Hussnain Ahmad</span>
          </a>

          {/* Elevation readout */}
          <span className="hidden items-baseline gap-2 md:flex" aria-hidden="true">
            <span className="h-px w-8 bg-graticule" />
            <span className="t-data tabular-nums text-mist">
              ELEV {String(elevation).padStart(4, '0')} M
            </span>
          </span>

          <span className="flex-1" />

          {/* Plate navigation */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Plates">
            {PLATES.map((plate) => (
              <a
                key={plate.id}
                href={`#${plate.id}`}
                aria-current={active === plate.id ? 'true' : undefined}
                className={`t-eyebrow transition-colors duration-300 hover:text-bone ${
                  active === plate.id ? 'text-bone' : 'text-mist'
                }`}
              >
                {plate.label}
              </a>
            ))}
          </nav>

          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="t-eyebrow hidden shrink-0 rounded-[2px] border border-graticule px-4 py-2.5 text-bone transition-colors duration-300 hover:border-mist/70 hover:bg-basin md:inline-flex"
          >
            CV
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open plate index"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-graticule text-bone transition-colors hover:bg-basin lg:hidden"
          >
            <Menu className="text-lg" />
          </button>
        </div>

        {/* Progress hairline: how far up the sheet you are. */}
        <div className="h-px w-full bg-graticule/50" aria-hidden="true">
          <div
            className="h-px transition-[width] duration-200 ease-out"
            style={{ width: `${progress * 100}%`, backgroundColor: band.color }}
          />
        </div>
      </header>

      {/* Mobile plate index */}
      {open ? (
        <div className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-xl lg:hidden">
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-6">
            <span className="t-eyebrow text-mist">Plate index</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close plate index"
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-graticule text-bone"
            >
              <Close className="text-lg" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 pb-10" aria-label="Plates">
            {PLATES.map((plate, i) => (
              <a
                key={plate.id}
                href={`#${plate.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 border-b border-graticule/60 py-5 text-bone"
              >
                <span className="t-data w-8 shrink-0 text-mist">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="t-display-tight text-2xl">{plate.label}</span>
              </a>
            ))}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="t-eyebrow rounded-[2px] bg-bone px-5 py-3 text-ink"
              >
                Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="t-eyebrow rounded-[2px] border border-graticule px-5 py-3 text-bone"
              >
                Email me
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}

/*
 * HeroPlate — the title block of the sheet.
 * Name set in Archivo across two widths and two weights: the surname in
 * a hairline weight against the given name in heavy. That contrast is
 * the whole type moment, so nothing else in the hero competes with it.
 */
export function HeroPlate() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-[7.5rem] md:px-10 md:pb-14"
    >
      {/* Top margin: where the sheet was surveyed */}
      <div className="mx-auto flex w-full max-w-sheet flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="t-data text-mist">{profile.latitude}</span>
        <span className="t-data text-mist">{profile.longitude}</span>
        <span className="hidden h-px flex-1 bg-graticule sm:block" aria-hidden="true" />
        <span className="t-margin text-mist/70">{profile.sheet}</span>
      </div>

      {/* Title block */}
      <div className="mx-auto w-full max-w-sheet py-16">
        <h1 className="t-display uppercase text-bone">
          <span
            className="block text-[clamp(3rem,13.5vw,9.5rem)]"
            style={{ fontVariationSettings: "'wdth' 118, 'wght' 760" }}
          >
            Hussnain
          </span>
          <span
            className="mt-1 block text-[clamp(3rem,13.5vw,9.5rem)] text-mist"
            style={{ fontVariationSettings: "'wdth' 118, 'wght' 220" }}
          >
            Ahmad
          </span>
        </h1>

        <div className="mt-10 grid gap-x-16 gap-y-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div>
            <p className="t-display-tight max-w-measure text-xl text-bone md:text-2xl">
              {profile.thesis}
            </p>
            <p className="mt-6 max-w-measure text-base leading-relaxed text-mist">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#shipped"
                className="t-eyebrow inline-flex items-center gap-2 rounded-[2px] bg-bone px-6 py-3.5 text-ink transition-all duration-300 ease-survey hover:-translate-y-0.5 hover:bg-white"
              >
                View the work
                <ArrowDown className="text-[0.95em]" />
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="t-eyebrow inline-flex items-center gap-2 rounded-[2px] border border-graticule px-6 py-3.5 text-bone transition-all duration-300 ease-survey hover:-translate-y-0.5 hover:border-mist/70 hover:bg-basin"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Field notes live in the margin, where asides belong. */}
          <aside className="md:pt-2">
            <span className="t-margin text-mist/70">Field notes</span>
            <ul className="mt-4 space-y-2.5">
              {profile.fieldNotes.map((note) => (
                <li key={note} className="flex gap-3 text-sm leading-relaxed text-mist">
                  <span className="mt-2 block h-px w-3 shrink-0 bg-graticule" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {/* Legend — a map has one, and here it explains the colour system
          that the rest of the page depends on. */}
      <div className="mx-auto w-full max-w-sheet">
        <div className="flex items-center gap-4">
          <span className="t-margin shrink-0 text-mist/70">Legend</span>
          <span className="h-px flex-1 bg-graticule" aria-hidden="true" />
        </div>

        <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-3">
          {bandOrder.map((key) => {
            const band = bands[key]
            return (
              <div key={key} className="flex gap-3">
                <span
                  className="mt-1.5 block h-2.5 w-2.5 shrink-0"
                  style={{ backgroundColor: band.color }}
                  aria-hidden="true"
                />
                <div>
                  <dt className="t-eyebrow text-bone">
                    {band.label}
                    <span className="ml-2 text-mist/70">{band.elevationLabel}</span>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-mist">{band.note}</dd>
                </div>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
