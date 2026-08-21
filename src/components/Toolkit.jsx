import { bands } from '../data/profile'
import { toolkit, levels } from '../data/toolkit'
import { Plate } from './ui'

/*
 * ToolkitPlate — instruments, by band.
 *
 * The rank is drawn as three segments filled to level, which is an
 * ordinal scale honestly presented: shipping / building / learning is
 * genuinely all I know about my own competence. A percentage bar would
 * be a number I could not defend, and technical readers know it.
 */

// Written out rather than built as `reveal-d${i + 1}`: Tailwind scans
// source text for class names, so an interpolated name is never emitted
// and the delay would silently do nothing in the production build.
const REVEAL_DELAY = ['reveal-d1', 'reveal-d2', 'reveal-d3']

function LevelMeter({ level }) {
  const info = levels[level]
  return (
    <span className="flex shrink-0 items-center gap-[3px]" aria-hidden="true">
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className="block h-[3px] w-3 transition-colors duration-500"
          style={{
            backgroundColor: step <= info.rank ? 'currentColor' : 'rgba(35,48,56,1)',
          }}
        />
      ))}
    </span>
  )
}

export function ToolkitPlate() {
  return (
    <Plate
      id="instruments"
      number="04"
      title="Instruments"
      elevation="3 STATES · NO PERCENTAGES"
      lede="Grouped by band and marked by how far each one has actually got. Shipping means it is inside something people have installed. Learning means I am studying it now and have not shipped with it yet."
    >
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
        {toolkit.map((group, groupIndex) => {
          const band = bands[group.band]
          return (
            <section
              key={group.band}
              className={`reveal ${REVEAL_DELAY[groupIndex] || ''}`}
              aria-labelledby={`toolkit-${group.band}`}
            >
              <div className="h-[2px] w-full" style={{ backgroundColor: band.color }} />
              <h3
                id={`toolkit-${group.band}`}
                className="t-display-tight mt-5 text-xl uppercase text-bone"
              >
                {group.heading}
              </h3>
              <p className="mt-3 min-h-[3.5rem] max-w-[26rem] text-sm leading-relaxed text-mist">
                {group.caption}
              </p>

              <ul className="mt-6">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-4 border-b border-graticule/60 py-2.5"
                    style={{ color: band.color }}
                  >
                    <span className="min-w-0 flex-1 truncate text-[0.95rem] text-bone">
                      {item.name}
                    </span>
                    <span className="t-data hidden text-mist/70 sm:inline">
                      {levels[item.level].label}
                    </span>
                    <LevelMeter level={item.level} />
                    <span className="sr-only">{levels[item.level].note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {/* Key for the meter, so it is never a mystery graphic. */}
      <dl className="reveal mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-graticule/60 pt-6 text-mist">
        {Object.entries(levels)
          .sort((a, b) => b[1].rank - a[1].rank)
          .map(([key, info]) => (
            <div key={key} className="flex items-center gap-3 text-bone/80">
              <LevelMeter level={key} />
              <dt className="t-eyebrow text-bone">{info.label}</dt>
              <dd className="t-data text-mist/80">{info.note}</dd>
            </div>
          ))}
      </dl>
    </Plate>
  )
}
