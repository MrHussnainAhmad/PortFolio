import { bands } from '../data/profile'
import { featured, tally } from '../data/products'
import { ArrowUpRight } from './icons'
import { Plate, BandTag, StatusBadge, PlayBadge } from './ui'

/*
 * ShippedPlate — the four things with an install button.
 *
 * These get the biggest cards on the sheet because installability is the
 * actual claim being made. Each card is one button: the whole surface
 * opens the inspector, so there is no hunt for a small link. The Play
 * badge inside is a real anchor, so it is rendered as a sibling of the
 * button rather than nested inside it.
 */

function ShippedCard({ item, onSelect }) {
  const band = bands[item.band]

  return (
    <article className="reveal group relative">
      <button
        type="button"
        onClick={() => onSelect(item.slug)}
        aria-label={`Open ${item.name}`}
        className="block w-full border border-graticule bg-basin/50 p-6 text-left transition-all duration-500 ease-survey hover:-translate-y-1 hover:bg-basin md:p-8"
        style={{ borderRadius: 2 }}
      >
        {/* Card margin: the same numbering idiom as the plates */}
        <div className="flex items-center gap-4">
          <span className="t-margin shrink-0 text-mist/70">
            {String(item.elevation).padStart(4, '0')} M
          </span>
          <span
            className="h-px flex-1 origin-left bg-graticule transition-colors duration-500"
            aria-hidden="true"
          />
          <span className="t-data shrink-0 text-mist/70">{item.year}</span>
        </div>

        {/* Icon and title share a baseline — the icon is type-sized, not
            a hero image, because the app name is doing the work. */}
        <div className="mt-8 flex items-start gap-5">
          <span
            className="block h-14 w-14 shrink-0 overflow-hidden border border-graticule bg-ink transition-colors duration-500 md:h-16 md:w-16"
            style={{ borderRadius: 2 }}
          >
            <img
              src={item.icon}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="t-display-tight text-2xl leading-tight text-bone md:text-[1.75rem]">
              {item.name}
            </h3>
            <p className="t-eyebrow mt-1.5 text-mist">{item.subtitle}</p>
          </div>

          <ArrowUpRight
            className="mt-1 shrink-0 text-base text-mist transition-all duration-500 ease-survey group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 text-[0.95rem] leading-relaxed text-mist">{item.summary}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-graticule/60 pt-5">
          <BandTag band={item.band} />
          <StatusBadge status={item.status} />
          <span className="t-data text-mist/70">{item.platform}</span>
        </div>
      </button>

      {/* Install link, outside the card button so it stays a real link. */}
      <div className="mt-4">
        <PlayBadge url={item.storeUrl} />
      </div>

      {/* Hover accent: a single tick in the band colour, top-left, drawn
          on approach. One flourish per card, and it reuses the map's own
          corner-tick language. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-px -top-px h-6 w-6 origin-top-left scale-0 transition-transform duration-500 ease-survey group-hover:scale-100"
        style={{
          borderTop: `2px solid ${band.color}`,
          borderLeft: `2px solid ${band.color}`,
        }}
      />
    </article>
  )
}

export function ShippedPlate({ onSelect }) {
  return (
    <Plate
      id="shipped"
      number="02"
      title="Shipped"
      elevation={`${tally.onPlay} ON GOOGLE PLAY`}
      lede="Everything on this plate is on Google Play with a real install button behind it. Anyone can build something; the interesting part is the last ten percent, which is where most side projects quietly die."
    >
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {featured.map((item) => (
          <ShippedCard key={item.slug} item={item} onSelect={onSelect} />
        ))}
      </div>
    </Plate>
  )
}
