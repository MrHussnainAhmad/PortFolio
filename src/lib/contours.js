/*
 * contours.js — marching squares
 * ------------------------------------------------------------------
 * Turns a heightfield into contour lines. This is what makes the
 * background read as a survey plate rather than a gradient.
 *
 * Performance notes, because this runs every frame:
 *  - One pass over cells, not one pass per level. Each cell computes
 *    the min/max of its four corners and only visits levels that
 *    actually cross it, which for a smooth field is 0-2 levels.
 *  - Segment buffers are preallocated and reused, so a steady-state
 *    frame allocates nothing and the GC stays quiet.
 *  - One stroke() per level rather than per segment.
 */

const MAX_SEGMENTS_PER_LEVEL = 4096

export class ContourRenderer {
  constructor(maxLevels = 24) {
    this.maxLevels = maxLevels
    // buffers[l] holds x0,y0,x1,y1 quadruples; counts[l] is how many.
    this.buffers = Array.from(
      { length: maxLevels },
      () => new Float32Array(MAX_SEGMENTS_PER_LEVEL * 4),
    )
    this.counts = new Int32Array(maxLevels)
  }

  /**
   * Marching squares over the field, filling the segment buffers.
   *
   * @param {Float32Array} field  (cols+1)*(rows+1) heights
   * @param {number} cols
   * @param {number} rows
   * @param {Float32Array|number[]} levels  ascending threshold values
   * @param {number} cellW  device px per cell, horizontally
   * @param {number} cellH  device px per cell, vertically
   */
  march(field, cols, rows, levels, cellW, cellH) {
    const w = cols + 1
    const levelCount = Math.min(levels.length, this.maxLevels)
    this.counts.fill(0, 0, levelCount)

    for (let j = 0; j < rows; j++) {
      const row0 = j * w
      const row1 = row0 + w
      const y0 = j * cellH
      const y1 = y0 + cellH

      for (let i = 0; i < cols; i++) {
        // Corners, clockwise from top-left.
        const tl = field[row0 + i]
        const tr = field[row0 + i + 1]
        const br = field[row1 + i + 1]
        const bl = field[row1 + i]

        let min = tl
        let max = tl
        if (tr < min) min = tr
        else if (tr > max) max = tr
        if (br < min) min = br
        else if (br > max) max = br
        if (bl < min) min = bl
        else if (bl > max) max = bl

        // Cull: no contour crosses this cell at all. This is the hot
        // path — most cells exit here.
        if (max - min < 1e-6) continue

        const x0 = i * cellW
        const x1 = x0 + cellW

        for (let l = 0; l < levelCount; l++) {
          const level = levels[l]
          if (level <= min || level > max) continue

          // Case index: bit per corner above the level.
          let code = 0
          if (tl > level) code |= 8
          if (tr > level) code |= 4
          if (br > level) code |= 2
          if (bl > level) code |= 1
          if (code === 0 || code === 15) continue

          // Crossing points, linearly interpolated along each edge.
          // top: tl→tr, right: tr→br, bottom: bl→br, left: tl→bl
          // Only the edges this case actually crosses get read, and a
          // crossed edge always has distinct corner values, so the
          // divisions below are safe where they matter.
          const buf = this.buffers[l]
          let n = this.counts[l]
          if (n >= MAX_SEGMENTS_PER_LEVEL - 2) continue

          const topX = x0 + cellW * ((level - tl) / (tr - tl))
          const rightY = y0 + cellH * ((level - tr) / (br - tr))
          const bottomX = x0 + cellW * ((level - bl) / (br - bl))
          const leftY = y0 + cellH * ((level - tl) / (bl - tl))

          // Written inline rather than through a helper: a closure here
          // would allocate on every crossing and keep the GC busy.
          let o = n * 4

          switch (code) {
            case 1: // bottom-left corner above
            case 14:
              buf[o] = x0
              buf[o + 1] = leftY
              buf[o + 2] = bottomX
              buf[o + 3] = y1
              n += 1
              break
            case 2: // bottom-right
            case 13:
              buf[o] = bottomX
              buf[o + 1] = y1
              buf[o + 2] = x1
              buf[o + 3] = rightY
              n += 1
              break
            case 3: // bottom edge
            case 12:
              buf[o] = x0
              buf[o + 1] = leftY
              buf[o + 2] = x1
              buf[o + 3] = rightY
              n += 1
              break
            case 4: // top-right
            case 11:
              buf[o] = topX
              buf[o + 1] = y0
              buf[o + 2] = x1
              buf[o + 3] = rightY
              n += 1
              break
            case 6: // right edge
            case 9:
              buf[o] = topX
              buf[o + 1] = y0
              buf[o + 2] = bottomX
              buf[o + 3] = y1
              n += 1
              break
            case 7: // top-left
            case 8:
              buf[o] = x0
              buf[o + 1] = leftY
              buf[o + 2] = topX
              buf[o + 3] = y0
              n += 1
              break

            // Saddles: two disjoint lines. Resolved with the cell average
            // so neighbouring cells agree and the lines don't tear.
            case 5: {
              const avg = (tl + tr + br + bl) * 0.25
              if (avg > level) {
                buf[o] = x0
                buf[o + 1] = leftY
                buf[o + 2] = topX
                buf[o + 3] = y0
                o += 4
                buf[o] = bottomX
                buf[o + 1] = y1
                buf[o + 2] = x1
                buf[o + 3] = rightY
              } else {
                buf[o] = x0
                buf[o + 1] = leftY
                buf[o + 2] = bottomX
                buf[o + 3] = y1
                o += 4
                buf[o] = topX
                buf[o + 1] = y0
                buf[o + 2] = x1
                buf[o + 3] = rightY
              }
              n += 2
              break
            }
            case 10: {
              const avg = (tl + tr + br + bl) * 0.25
              if (avg > level) {
                buf[o] = x0
                buf[o + 1] = leftY
                buf[o + 2] = bottomX
                buf[o + 3] = y1
                o += 4
                buf[o] = topX
                buf[o + 1] = y0
                buf[o + 2] = x1
                buf[o + 3] = rightY
              } else {
                buf[o] = x0
                buf[o + 1] = leftY
                buf[o + 2] = topX
                buf[o + 3] = y0
                o += 4
                buf[o] = bottomX
                buf[o + 1] = y1
                buf[o + 2] = x1
                buf[o + 3] = rightY
              }
              n += 2
              break
            }
            default:
              break
          }

          this.counts[l] = n
        }
      }
    }

    return levelCount
  }

  /**
   * Stroke the buffered segments. One path and one stroke per level so
   * we pay the canvas state cost a dozen times, not ten thousand.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} levelCount
   * @param {(levelIndex:number) => {stroke:string, width:number}} styleFor
   */
  draw(ctx, levelCount, styleFor) {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    for (let l = 0; l < levelCount; l++) {
      const n = this.counts[l]
      if (n === 0) continue

      const style = styleFor(l)
      if (!style || style.width <= 0) continue

      const buf = this.buffers[l]
      ctx.beginPath()
      for (let s = 0; s < n; s++) {
        const o = s * 4
        ctx.moveTo(buf[o], buf[o + 1])
        ctx.lineTo(buf[o + 2], buf[o + 3])
      }
      ctx.strokeStyle = style.stroke
      ctx.lineWidth = style.width
      ctx.stroke()
    }
  }
}

/** Linear interpolation between two #rrggbb strings. */
export function mixHex(a, b, t) {
  const ar = parseInt(a.slice(1, 3), 16)
  const ag = parseInt(a.slice(3, 5), 16)
  const ab = parseInt(a.slice(5, 7), 16)
  const br = parseInt(b.slice(1, 3), 16)
  const bg = parseInt(b.slice(3, 5), 16)
  const bb = parseInt(b.slice(5, 7), 16)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `rgb(${r},${g},${bl})`
}

/** Sample a multi-stop ramp at t in 0..1. */
export function sampleRamp(stops, t) {
  const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t
  const span = 1 / (stops.length - 1)
  const idx = Math.min(stops.length - 2, Math.floor(clamped / span))
  const local = (clamped - idx * span) / span
  return mixHex(stops[idx], stops[idx + 1], local)
}
