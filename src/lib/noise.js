/*
 * noise.js — deterministic terrain generation
 * ------------------------------------------------------------------
 * A small fBm value-noise field, mixed with ridged octaves so the
 * result has ridgelines and basins rather than smooth blobs. This is
 * the same shape of maths a heightmap generator like Gaea starts from,
 * which is the whole point: the background of this site is a real
 * heightmap, contoured, not a decorative SVG.
 *
 * Everything here is pure and seeded, so the terrain is identical on
 * every load and across server/client. No Math.random().
 */

/** 32-bit integer hash → float in [0, 1). Cheap and well distributed. */
function hash2(ix, iy, seed) {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iy, 0x165667b1) ^ Math.imul(seed, 0x9e3779b1)
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b)
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

/** Quintic smoothstep. Gentler second derivative than cubic, which
 *  matters here: contour lines expose interpolation creases. */
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

/** 2D value noise in [0, 1). */
function valueNoise(x, y, seed) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy

  const a = hash2(ix, iy, seed)
  const b = hash2(ix + 1, iy, seed)
  const c = hash2(ix, iy + 1, seed)
  const d = hash2(ix + 1, iy + 1, seed)

  const ux = fade(fx)
  const uy = fade(fy)

  const top = a + (b - a) * ux
  const bottom = c + (d - c) * ux
  return top + (bottom - top) * uy
}

/**
 * Build a normalised heightmap.
 *
 * @param {number} cols  grid cells across (field is cols+1 wide)
 * @param {number} rows  grid cells down  (field is rows+1 tall)
 * @param {object} opts
 * @returns {Float32Array} (cols+1) * (rows+1) values, normalised to 0..1
 */
export function buildHeightfield(cols, rows, opts = {}) {
  const {
    seed = 20260821,
    scale = 3.1, // base frequency across the width
    octaves = 5,
    lacunarity = 2.02,
    gain = 0.5,
    ridged = 0.45, // 0 = rolling hills, 1 = sharp ridgelines
    aspect = 1.6,
  } = opts

  const w = cols + 1
  const h = rows + 1
  const field = new Float32Array(w * h)

  let min = Infinity
  let max = -Infinity

  for (let j = 0; j < h; j++) {
    const ny = (j / rows) * scale
    for (let i = 0; i < w; i++) {
      const nx = (i / cols) * scale * aspect

      let amp = 1
      let freq = 1
      let sum = 0
      let norm = 0

      for (let o = 0; o < octaves; o++) {
        const n = valueNoise(nx * freq + o * 17.13, ny * freq + o * 31.7, seed + o)
        // Ridged transform folds the noise at its midpoint, producing
        // creases. Blending it in gives eroded ridges instead of blobs.
        const r = 1 - Math.abs(n * 2 - 1)
        const v = n * (1 - ridged) + r * ridged

        sum += v * amp
        norm += amp
        amp *= gain
        freq *= lacunarity
      }

      const value = sum / norm
      field[j * w + i] = value
      if (value < min) min = value
      if (value > max) max = value
    }
  }

  // Normalise to the full 0..1 range so contour levels are predictable.
  const span = max - min || 1
  for (let k = 0; k < field.length; k++) {
    field[k] = (field[k] - min) / span
  }

  return field
}

/**
 * Sample a 1D slice of terrain detail, in [-1, 1].
 * Used by the climb profile so its wobble comes from the same maths as
 * the background field rather than being drawn by hand.
 *
 * @param {number} t  position along the slice, 0..1
 * @param {object} opts
 */
export function sampleRidge(t, opts = {}) {
  const { seed = 8712, scale = 7.5, octaves = 4, gain = 0.55 } = opts

  let amp = 1
  let freq = 1
  let sum = 0
  let norm = 0

  for (let o = 0; o < octaves; o++) {
    const n = valueNoise(t * scale * freq + o * 11.9, o * 4.3, seed + o)
    sum += (n * 2 - 1) * amp
    norm += amp
    amp *= gain
    freq *= 2.03
  }

  return sum / norm
}

/**
 * Precompute a radial falloff kernel used as a terrain brush.
 * Adding this into the field under the cursor lifts the ground, which
 * makes the contour lines bunch and bow — the gesture you make a
 * thousand times in a terrain editor.
 *
 * @param {number} radius  kernel radius in grid cells
 * @returns {{size:number, radius:number, data:Float32Array}}
 */
export function buildBrushKernel(radius) {
  const size = radius * 2 + 1
  const data = new Float32Array(size * size)

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      const dx = (i - radius) / radius
      const dy = (j - radius) / radius
      const d = Math.sqrt(dx * dx + dy * dy)
      // Smooth cosine falloff, zero at the rim so there is no hard edge.
      data[j * size + i] = d >= 1 ? 0 : 0.5 * (1 + Math.cos(Math.PI * d))
    }
  }

  return { size, radius, data }
}
