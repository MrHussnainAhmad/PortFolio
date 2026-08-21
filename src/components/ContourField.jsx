import { useEffect, useRef } from 'react'
import { buildHeightfield, buildBrushKernel } from '../lib/noise'
import { ContourRenderer } from '../lib/contours'

/*
 * ContourField — the signature.
 * ------------------------------------------------------------------
 * A seeded fBm heightmap, contoured with marching squares, drawn to a
 * fixed canvas behind the whole page.
 *
 * Three things make it mean something rather than just move:
 *
 *  1. Elevation sweep. Contour thresholds rise slowly, so lines creep
 *     toward the ridgelines and vanish, and new ones surface in the
 *     basins. It reads the way a terrain preview reads while it bakes.
 *
 *  2. Index contours. Every fifth line is drawn heavier — the actual
 *     cartographic convention on a printed survey sheet — and the
 *     heavier line travels with its contour as the sweep advances.
 *
 *  3. The band ramp. Line colour interpolates moss → amber → rust with
 *     scroll position, so the terrain is tinted by whichever discipline
 *     you are currently reading about. The colour is information.
 *
 * On top of that, on a fine pointer the cursor is a terrain brush: it
 * adds a cosine-falloff bump to the field, and the contours bow around
 * it. That is the gesture you make constantly in a heightmap editor.
 *
 * Cost control: grid is sized to keep cells near 11k on desktop and 4k
 * on small screens, DPR is capped at 1.75, the loop is capped at 30fps,
 * and it pauses entirely when the tab is hidden. Under
 * prefers-reduced-motion it renders exactly one static frame.
 */

const RAMP = ['#778C5A', '#D39A3A', '#A8452A'] // moss → amber → rust
const BASE_LINE = '#233038' // graticule
const LEVEL_COUNT = 14
const LO = 0.05
const HI = 0.97
const SWEEP_SECONDS = 2.6 // seconds per contour interval

function parseHex(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

function rampAt(t) {
  const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t
  const span = 1 / (RAMP.length - 1)
  const idx = Math.min(RAMP.length - 2, Math.floor(clamped / span))
  const local = (clamped - idx * span) / span
  const a = parseHex(RAMP[idx])
  const b = parseHex(RAMP[idx + 1])
  return [
    a[0] + (b[0] - a[0]) * local,
    a[1] + (b[1] - a[1]) * local,
    a[2] + (b[2] - a[2]) * local,
  ]
}

export function ContourField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    const renderer = new ContourRenderer(LEVEL_COUNT + 2)
    const baseLine = parseHex(BASE_LINE)

    // ---- mutable render state -------------------------------------
    let field = null
    let work = null
    let cols = 0
    let rows = 0
    let cellW = 0
    let cellH = 0
    let dpr = 1
    let width = 0
    let height = 0

    let brush = null
    const levels = new Float32Array(LEVEL_COUNT)

    let phase = 0 // 0..1 within one contour interval
    let origin = 0 // how many intervals have passed, for index lines
    let scroll = 0 // 0..1 page progress, eased
    let scrollTarget = 0

    let brushX = -9999
    let brushY = -9999
    let brushTargetX = -9999
    let brushTargetY = -9999
    let brushAmount = 0
    let brushTargetAmount = 0

    let raf = 0
    let last = 0
    let running = true

    // ---- sizing ---------------------------------------------------
    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Aim for roughly square cells, then clamp total cell count.
      const budget = width < 900 ? 4200 : 11000
      const aspect = height / width
      cols = Math.max(28, Math.round(Math.sqrt(budget / aspect)))
      rows = Math.max(18, Math.round(cols * aspect))

      cellW = canvas.width / cols
      cellH = canvas.height / rows

      field = buildHeightfield(cols, rows, {
        seed: 20260821,
        scale: width < 900 ? 2.4 : 3.1,
        octaves: 5,
        ridged: 0.45,
        // Stretch x frequency by the viewport aspect so terrain features
        // stay square on screen instead of smearing on wide monitors.
        aspect: width / height,
      })
      work = new Float32Array(field.length)

      const brushRadius = Math.max(6, Math.round(cols * 0.11))
      brush = buildBrushKernel(brushRadius)
    }

    // ---- one frame ------------------------------------------------
    function render() {
      const w = cols + 1

      // Start from the pristine heightmap. .set() is a fast memcpy, and
      // it means the brush never permanently deforms the terrain.
      work.set(field)

      // Stamp the brush. Only the cells inside the kernel are touched,
      // so this stays cheap regardless of grid size.
      if (brushAmount > 0.001) {
        const gx = Math.round((brushX / width) * cols)
        const gy = Math.round((brushY / height) * rows)
        const r = brush.radius
        const size = brush.size
        const strength = brushAmount * 0.11

        const jStart = Math.max(0, gy - r)
        const jEnd = Math.min(rows, gy + r)
        const iStart = Math.max(0, gx - r)
        const iEnd = Math.min(cols, gx + r)

        for (let j = jStart; j <= jEnd; j++) {
          const krow = (j - gy + r) * size
          const frow = j * w
          for (let i = iStart; i <= iEnd; i++) {
            work[frow + i] += brush.data[krow + (i - gx + r)] * strength
          }
        }
      }

      // Contour thresholds for this frame. Lines march upward as phase
      // advances; a new line surfaces each time phase wraps.
      const interval = (HI - LO) / LEVEL_COUNT
      for (let l = 0; l < LEVEL_COUNT; l++) {
        levels[l] = LO + (l + phase) * interval
      }

      const levelCount = renderer.march(work, cols, rows, levels, cellW, cellH)

      // Band colour for the current scroll position.
      const band = rampAt(scroll)
      // Terrain firms up slightly as you gain elevation through the page.
      const globalAlpha = 0.4 + scroll * 0.3

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      renderer.draw(ctx, levelCount, (l) => {
        const t = (levels[l] - LO) / (HI - LO)
        // Low ground stays close to the graticule; high ground takes the
        // band colour. Mixing rather than switching keeps it cohesive.
        const mix = 0.2 + t * 0.8
        const r = Math.round(baseLine[0] + (band[0] - baseLine[0]) * mix)
        const g = Math.round(baseLine[1] + (band[1] - baseLine[1]) * mix)
        const b = Math.round(baseLine[2] + (band[2] - baseLine[2]) * mix)

        // Every fifth contour is an index contour, drawn heavier. The
        // offset travels with the sweep so a given line keeps its weight.
        const isIndex = (l + origin) % 5 === 0
        const alpha = (isIndex ? 0.78 : 0.4) * (0.35 + t * 0.65) * globalAlpha

        return {
          stroke: `rgba(${r},${g},${b},${alpha.toFixed(3)})`,
          width: (isIndex ? 1.5 : 0.8) * dpr,
        }
      })
    }

    // ---- loop -----------------------------------------------------
    function frame(now) {
      raf = requestAnimationFrame(frame)
      if (!running) return

      const minFrame = width < 900 ? 1000 / 20 : 1000 / 30
      const elapsed = now - last
      if (elapsed < minFrame) return
      last = now
      const dt = Math.min(elapsed / 1000, 0.1)

      phase += dt / SWEEP_SECONDS
      while (phase >= 1) {
        phase -= 1
        origin += 1
      }

      // Ease scroll and brush so nothing snaps.
      scroll += (scrollTarget - scroll) * Math.min(1, dt * 4)
      brushAmount += (brushTargetAmount - brushAmount) * Math.min(1, dt * 5)
      if (brushTargetX > -9000) {
        if (brushX < -9000) {
          brushX = brushTargetX
          brushY = brushTargetY
        } else {
          const k = Math.min(1, dt * 7)
          brushX += (brushTargetX - brushX) * k
          brushY += (brushTargetY - brushY) * k
        }
      }

      render()
    }

    // ---- listeners ------------------------------------------------
    function onScroll() {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      scrollTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    function onPointerMove(e) {
      brushTargetX = e.clientX
      brushTargetY = e.clientY
      brushTargetAmount = 1
    }

    // pointerleave on the root element, not pointerout on window:
    // pointerout bubbles, so it fires on every element-to-element
    // transition and would drag the brush back to zero as you move.
    // pointerleave does not bubble, so on <html> it means "left the page".
    function onPointerLeave() {
      brushTargetAmount = 0
    }

    function onVisibility() {
      running = !document.hidden
      last = performance.now()
    }

    let resizeTimer = 0
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        render()
      }, 160)
    }

    // ---- boot -----------------------------------------------------
    resize()
    onScroll()
    scroll = scrollTarget
    render()

    window.addEventListener('resize', onResize)

    if (reduceMotion) {
      // One static frame and nothing else. No scroll listener either: a
      // full marching-squares pass per scroll event is exactly the kind
      // of work someone who asked for reduced motion does not want.
      return () => {
        clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResize)
      }
    }

    const root = document.documentElement

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      root.addEventListener('pointerleave', onPointerLeave)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* Vignette: keeps the plate legible where type sits, and stops the
          contour field competing with the content at the edges. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 32%, rgba(13,19,23,0) 0%, rgba(13,19,23,0.55) 58%, rgba(13,19,23,0.88) 100%)',
        }}
      />
    </div>
  )
}
