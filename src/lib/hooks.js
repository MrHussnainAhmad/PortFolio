import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll. Adds .is-visible once, then stops observing —
 * elements shouldn't re-animate when you scroll back up.
 *
 * Returns a ref to attach to any container; every descendant carrying
 * .reveal inside it is observed.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll('.reveal')
    if (!targets.length) return

    // Reduced motion: show everything immediately, observe nothing.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Which plate is currently in view, and how far down the sheet we are.
 * Drives the elevation readout and the active nav state.
 *
 * `active` is null while the hero is still filling the viewport — no
 * plate is being read yet, so nothing in the nav should claim to be
 * current.
 *
 * @param {string[]} ids  section ids, in sheet order
 */
export function useSheetPosition(ids) {
  const [active, setActive] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0

      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)

      // Active plate is the last one whose top has passed the upper
      // third of the viewport — the line your eye actually reads from.
      const line = window.innerHeight * 0.34
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return { active, progress }
}

/**
 * Lock body scroll while a dialog is open, without the layout shift you
 * get from plain overflow:hidden on a page that has a scrollbar.
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}

/** Close on Escape. */
export function useEscape(active, onEscape) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onEscape])
}
