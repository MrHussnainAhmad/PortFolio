import { useMemo, useState } from 'react'
import { buildClimb } from '../lib/climb'
import { bands, bandOrder } from '../data/profile'
import { featured, startup, selected } from '../data/products'
import { Plate, BandTag } from './ui'

/*
 * ClimbPlate — an elevation cross-section of the work.
 *
 * Every pin is a real project, placed at its elevation. The line runs
 * through the pins, so its shape is dictated by the work rather than
 * drawn to look nice, and the roughness between pins is sampled from the
 * same noise function that draws the background field.
 *
 * The chart is also navigation: pins are focusable and open the
 * inspector, which is the reason it earns this much space. Below the lg
 * breakpoint the pins would be too small to hit, so the same data
 * renders as an ascent list instead.
 */

const MONO = "'IBM Plex Mono', ui-monospace, monospace"
const labelStyle = { fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em' }
const axisStyle = { fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em' }

export function ClimbPlate({ onSelect }) {
  const [hovered, setHovered] = useState(null)

  const items = useMemo(
    () => [
      ...featured.map((p) => ({ ...p, kind: 'featured' })),
      { ...startup, kind: 'startup' },
      ...selected.map((p) => ({ ...p, kind: 'selected' })),
    ],
    [],
  )

  const climb = useMemo(() => buildClimb(items), [items])
  const { view, plot, pins, zones, linePath, areaPath, ticks } = climb

  const lowest = pins[0]
  const highest = pins[pins.length - 1]

  return (
    <Plate
      id="climb"
      number="01"
      title="The climb"
      elevation={`${lowest.elevation} – ${highest.elevation} M`}
      lede="Three disciplines, plotted by how far into each one I have actually got. Every pin is something that exists outside my own machine — and the line through them is the honest shape of the last three years."
    >
      {/* ---------- chart (lg and up) ---------- */}
      <figure className="reveal hidden lg:block">
        <svg
          viewBox={`0 0 ${view.w} ${view.h}`}
          className="block w-full"
          role="group"
          aria-label="Elevation profile of projects, from web work at the base to Unity games at the summit"
        >
          <defs>
            {/* Horizontal band ramp for the fill under the terrain. */}
            <linearGradient id="climb-ramp" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={bands.web.color} />
              <stop offset="46%" stopColor={bands.web.color} />
              <stop offset="62%" stopColor={bands.mobile.color} />
              <stop offset="82%" stopColor={bands.game.color} />
              <stop offset="100%" stopColor={bands.game.color} />
            </linearGradient>

            {/* Vertical fade, so the fill sits down rather than blocking in. */}
            <linearGradient id="climb-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="climb-mask">
              <rect
                x={plot.x0}
                y={plot.y0 - 20}
                width={plot.x1 - plot.x0}
                height={plot.y1 - plot.y0 + 20}
                fill="url(#climb-fade)"
              />
            </mask>
          </defs>

          {/* Elevation graticule */}
          <g>
            {ticks.map((tick) => (
              <g key={tick.value}>
                <line
                  x1={plot.x0}
                  y1={tick.y}
                  x2={plot.x1}
                  y2={tick.y}
                  stroke="#233038"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                />
                <text x={plot.x0 - 12} y={tick.y + 3.5} textAnchor="end" fill="#7C8B92" style={axisStyle}>
                  {tick.value}
                </text>
              </g>
            ))}
            <text
              x={plot.x0 - 12}
              y={plot.y0 - 24}
              textAnchor="end"
              fill="#7C8B92"
              opacity="0.7"
              style={axisStyle}
            >
              M
            </text>
          </g>

          {/* Terrain */}
          <path d={areaPath} fill="url(#climb-ramp)" mask="url(#climb-mask)" opacity="0.4" />
          <path
            d={linePath}
            fill="none"
            stroke="#E9E3D5"
            strokeWidth="1.6"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Baseline */}
          <line x1={plot.x0} y1={plot.y1} x2={plot.x1} y2={plot.y1} stroke="#233038" strokeWidth="1.5" />

          {/* Band zones along the bottom axis */}
          {zones.map((zone) => {
            const band = bands[zone.band]
            const mid = (zone.from + zone.to) / 2
            return (
              <g key={zone.band}>
                <line
                  x1={zone.from + 2}
                  y1={plot.y1 + 12}
                  x2={zone.to - 2}
                  y2={plot.y1 + 12}
                  stroke={band.color}
                  strokeWidth="2.5"
                />
                <text
                  x={mid}
                  y={plot.y1 + 30}
                  textAnchor="middle"
                  fill="#7C8B92"
                  style={axisStyle}
                >
                  {band.label.toUpperCase()} · {zone.count}
                </text>
              </g>
            )
          })}

          {/* Pins */}
          {pins.map((pin) => {
            const band = bands[pin.band]
            const isHeadline = pin.kind !== 'selected'
            const isHot = hovered === pin.slug
            // Alternate label height so neighbours never sit on one line.
            const lift = pin.index % 2 === 0 ? 20 : 38
            const anchor =
              pin.x > plot.x1 - 58 ? 'end' : pin.x < plot.x0 + 58 ? 'start' : 'middle'
            const labelX = anchor === 'end' ? pin.x + 5 : anchor === 'start' ? pin.x - 5 : pin.x

            return (
              <g
                key={pin.slug}
                role="button"
                tabIndex={0}
                aria-label={`${pin.name}, ${band.label}, elevation ${pin.elevation} metres`}
                className="cursor-pointer outline-none"
                onMouseEnter={() => setHovered(pin.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(pin.slug)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect?.(pin.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect?.(pin.slug)
                  }
                }}
              >
                {/* Generous invisible hit area */}
                <rect
                  x={pin.x - 26}
                  y={pin.y - lift - 14}
                  width="52"
                  height={lift + 30}
                  fill="transparent"
                />

                {/* Leader from pin up to its label */}
                <line
                  x1={pin.x}
                  y1={pin.y - 6}
                  x2={pin.x}
                  y2={pin.y - lift + 4}
                  stroke={band.color}
                  strokeWidth="1"
                  opacity={isHot ? 0.9 : 0.35}
                />

                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={isHot ? 6 : isHeadline ? 4.5 : 3}
                  fill={isHeadline || isHot ? band.color : '#0D1317'}
                  stroke={band.color}
                  strokeWidth="1.6"
                  style={{ transition: 'r 220ms cubic-bezier(0.16,0.84,0.24,1)' }}
                />

                <text
                  x={labelX}
                  y={pin.y - lift}
                  textAnchor={anchor}
                  fill={isHot ? '#E9E3D5' : '#7C8B92'}
                  style={labelStyle}
                >
                  {pin.name.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>

        <figcaption className="mt-8 flex items-baseline gap-4 border-t border-graticule/60 pt-4">
          <span className="t-eyebrow shrink-0 text-mist/70">Reading the plate</span>
          <span className="text-sm leading-relaxed text-mist">
            Pin height is how deep I am into that discipline, not how big the project was. Select any
            pin to open it.
          </span>
        </figcaption>
      </figure>

      {/* ---------- ascent list (below lg) ---------- */}
      <ol className="reveal space-y-px lg:hidden">
        {[...pins].reverse().map((pin) => {
          const band = bands[pin.band]
          return (
            <li key={pin.slug}>
              <button
                type="button"
                onClick={() => onSelect?.(pin.slug)}
                className="flex w-full items-center gap-4 border-b border-graticule/60 py-4 text-left transition-colors hover:bg-basin/60"
              >
                <span
                  className="block h-2 w-2 shrink-0"
                  style={{ backgroundColor: band.color }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-bone">{pin.name}</span>
                  <span className="t-eyebrow text-mist">{band.label}</span>
                </span>
                <span className="t-data shrink-0 tabular-nums text-mist">{pin.elevation} m</span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* Band key, repeated compactly for the list view */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 lg:hidden">
        {bandOrder.map((key) => (
          <BandTag key={key} band={key} />
        ))}
      </div>
    </Plate>
  )
}
