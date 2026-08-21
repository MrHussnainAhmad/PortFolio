import { bands } from '../data/profile'
import { selected, archive } from '../data/products'
import { ArrowUpRight } from './icons'
import { Plate, BandTag, ExternalLink } from './ui'

/*
 * SelectedPlate — the earlier work, on two tiers.
 *
 * Billing is the point of this plate. Shipped gets cards; selected gets
 * register rows; archive gets a line and a link. Three tiers of visual
 * weight so the curation itself communicates — a portfolio that gives a
 * 2024 practice build the same card as a Play Store release is telling
 * you the author cannot tell the difference.
 */

function SelectedRow({ item, onSelect }) {
  const band = bands[item.band]

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item.slug)}
        aria-label={`Open ${item.name}`}
        className="group relative block w-full border-b border-graticule/60 py-6 text-left transition-colors duration-300 hover:bg-basin/50"
      >
        {/* Left edge marker grows on approach. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 transition-transform duration-500 ease-survey group-hover:scale-y-100"
          style={{ backgroundColor: band.color }}
        />

        <div className="grid items-baseline gap-x-8 gap-y-2 pl-5 md:grid-cols-[5rem_minmax(0,13rem)_minmax(0,1fr)_auto]">
          <span className="t-data tabular-nums text-mist/70">
            {String(item.elevation).padStart(4, '0')} m
          </span>

          <span className="t-display-tight text-lg leading-snug text-bone transition-colors duration-300 md:text-xl">
            {item.name}
          </span>

          <span className="text-sm leading-relaxed text-mist">{item.summary}</span>

          <span className="flex items-center gap-4">
            <BandTag band={item.band} className="hidden md:inline-flex" />
            <span className="t-data text-mist/70">{item.year}</span>
            <ArrowUpRight
              className="text-sm text-mist opacity-0 transition-all duration-300 ease-survey group-hover:translate-x-0.5 group-hover:opacity-100"
              aria-hidden="true"
            />
          </span>
        </div>
      </button>
    </li>
  )
}

export function SelectedPlate({ onSelect }) {
  const ordered = [...selected].sort((a, b) => b.elevation - a.elevation)

  return (
    <Plate
      id="selected"
      number="05"
      title="Selected"
      elevation={`${selected.length} SELECTED · ${archive.length} ARCHIVED`}
      lede="The web work the apps were built on top of. Full stack, mostly MERN and Next.js, all of it real rather than tutorial output — and cut down to the ones that taught me something."
    >
      <ul className="reveal">
        {ordered.map((item) => (
          <SelectedRow key={item.slug} item={item} onSelect={onSelect} />
        ))}
      </ul>

      {/* ---------- archive ---------- */}
      <div className="reveal mt-20">
        <div className="flex items-baseline gap-4">
          <span className="t-margin shrink-0 text-mist/70">Also on the sheet</span>
          <span className="h-px flex-1 bg-graticule" aria-hidden="true" />
        </div>
        <p className="mt-4 max-w-measure text-sm leading-relaxed text-mist">
          Kept for the record rather than the reel. Source is on GitHub if you want to look.
        </p>

        <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {archive.map((item) => (
            <li key={item.name} className="flex gap-4">
              <span
                className="mt-[0.6rem] block h-[7px] w-[7px] shrink-0"
                style={{ backgroundColor: bands[item.band].color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[0.95rem] text-bone">{item.name}</span>
                  <span className="t-data text-mist/60">{item.year}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-mist">{item.note}</p>
                <div className="mt-2 flex flex-wrap gap-x-6">
                  {item.liveUrl ? (
                    <ExternalLink href={item.liveUrl} className="text-sm">
                      Live
                    </ExternalLink>
                  ) : null}
                  {item.repoUrl ? (
                    <ExternalLink href={item.repoUrl} className="text-sm">
                      Source
                    </ExternalLink>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Plate>
  )
}
