import { sampleRidge } from './noise'

/*
 * climb.js — the elevation profile.
 * ------------------------------------------------------------------
 * Plots every piece of work as a survey pin and runs a terrain line
 * through them. Two things keep this from being a decorative squiggle:
 *
 *  - The line is interpolated through the real pin positions, so its
 *    shape is determined by the work, not drawn by hand.
 *  - The roughness between pins comes from sampleRidge(), the same
 *    noise that generates the background field, with its amplitude
 *    tapered to zero at each pin so the pins stay exactly on the line.
 */

const VIEW = { w: 1000, h: 380 }
const PAD = { top: 58, right: 22, bottom: 48, left: 56 }
const DOMAIN = { min: 400, max: 2900 }
const TICKS = [500, 1000, 1500, 2000, 2500]

const plot = {
  x0: PAD.left,
  x1: VIEW.w - PAD.right,
  y0: PAD.top,
  y1: VIEW.h - PAD.bottom,
}

/** Uniform Catmull-Rom through a scalar series. */
function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t
  const t3 = t2 * t
  return (
    0.5 *
    (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  )
}

function elevationToY(elevation) {
  const t = (elevation - DOMAIN.min) / (DOMAIN.max - DOMAIN.min)
  return plot.y1 - Math.min(1, Math.max(0, t)) * (plot.y1 - plot.y0)
}

/**
 * @param {Array<{elevation:number, band:string}>} items — any objects
 *   with an elevation; they are sorted here, so caller order is free.
 */
export function buildClimb(items) {
  const pins = [...items]
    .sort((a, b) => a.elevation - b.elevation)
    .map((item, i, all) => {
      const t = all.length === 1 ? 0.5 : i / (all.length - 1)
      return {
        ...item,
        index: i,
        x: plot.x0 + t * (plot.x1 - plot.x0),
        y: elevationToY(item.elevation),
      }
    })

  // --- terrain line -----------------------------------------------
  // Sample the spline finely, then add tapered noise. Taper uses the
  // distance to the nearest pin so every pin sits on the line exactly.
  const SAMPLES_PER_SEGMENT = 26
  const xs = pins.map((p) => p.x)
  const ys = pins.map((p) => p.y)
  const n = pins.length
  const at = (arr, i) => arr[Math.min(n - 1, Math.max(0, i))]

  const points = []
  for (let s = 0; s < n - 1; s++) {
    for (let k = 0; k < SAMPLES_PER_SEGMENT; k++) {
      const t = k / SAMPLES_PER_SEGMENT
      const x = catmullRom(at(xs, s - 1), at(xs, s), at(xs, s + 1), at(xs, s + 2), t)
      const y = catmullRom(at(ys, s - 1), at(ys, s), at(ys, s + 1), at(ys, s + 2), t)

      // Taper: 0 at the pins, 1 midway between them.
      const taper = Math.sin(t * Math.PI)
      const u = (s + t) / (n - 1)
      const wobble = sampleRidge(u, { seed: 4471, scale: 8.5, octaves: 4 }) * 11 * taper

      points.push([x, y + wobble])
    }
  }
  points.push([xs[n - 1], ys[n - 1]])

  const round = (v) => Math.round(v * 100) / 100
  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`)
    .join(' ')

  const areaPath = `${linePath} L${round(plot.x1)} ${plot.y1} L${round(plot.x0)} ${plot.y1} Z`

  // --- band zones along the bottom axis ---------------------------
  // Bands are contiguous because elevation ranges don't overlap, so the
  // zone for each band spans from its first pin to its last.
  const step = n > 1 ? (plot.x1 - plot.x0) / (n - 1) : plot.x1 - plot.x0
  const zoneMap = new Map()
  pins.forEach((pin) => {
    const zone = zoneMap.get(pin.band)
    const from = pin.x - step / 2
    const to = pin.x + step / 2
    if (!zone) {
      zoneMap.set(pin.band, { band: pin.band, from, to, count: 1 })
    } else {
      zone.from = Math.min(zone.from, from)
      zone.to = Math.max(zone.to, to)
      zone.count += 1
    }
  })

  const zones = [...zoneMap.values()]
    .sort((a, b) => a.from - b.from)
    .map((zone) => ({
      ...zone,
      from: Math.max(plot.x0, zone.from),
      to: Math.min(plot.x1, zone.to),
    }))

  return {
    view: VIEW,
    plot,
    pins,
    zones,
    linePath,
    areaPath,
    ticks: TICKS.map((value) => ({ value, y: elevationToY(value) })),
  }
}
