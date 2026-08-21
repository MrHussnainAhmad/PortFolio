import { useEffect, useRef, useState } from 'react'
import { bands } from '../data/profile'
import { Close } from './icons'
import { useScrollLock, useEscape } from '../lib/hooks'
import { BandTag, StatusBadge, DataRow, StackList, PlayBadge, ExternalLink, Rule } from './ui'

/*
 * Inspector — the detail panel.
 *
 * One panel serves the climb pins, the shipped cards and the selected
 * list, so a project only has to exist once in the data. It enters from
 * the right on desktop and from the bottom on small screens, which keeps
 * the sheet visible behind it: you are pulling a card out of a drawer,
 * not navigating away from the map.
 *
 * Modal hygiene: scroll lock, Escape to close, focus moved in on open
 * and returned to the trigger on close, Tab wrapped inside the panel.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

export function Inspector({ item, onClose }) {
  const [shown, setShown] = useState(false)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const returnTo = useRef(null)

  useScrollLock(Boolean(item))
  useEscape(Boolean(item), onClose)

  // Enter transition: mount at rest, then flip on the next frame.
  useEffect(() => {
    if (!item) {
      setShown(false)
      return
    }
    returnTo.current = document.activeElement
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [item])

  // Move focus in once the panel exists; hand it back on close.
  useEffect(() => {
    if (!item) return
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      const target = returnTo.current
      if (target && typeof target.focus === 'function') target.focus({ preventScroll: true })
    }
  }, [item])

  // Keep Tab inside the panel while it is open.
  useEffect(() => {
    if (!item) return
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [item])

  if (!item) return null

  const band = bands[item.band] || bands.web
  // Play Store links are rendered by PlayBadge instead, so they are not
  // in this list — an app's install link should not look like a footnote.
  const links = [
    item.liveUrl ? { label: 'Visit the site', href: item.liveUrl } : null,
    item.website ? { label: item.website.replace(/^https?:\/\//, ''), href: item.website } : null,
    item.listing ? { label: 'SaaSBrowser listing', href: item.listing } : null,
    item.repoUrl ? { label: 'Source on GitHub', href: item.repoUrl } : null,
  ].filter(Boolean)

  const isAndroid = Boolean(item.platform?.includes('Android'))

  return (
    <div className="fixed inset-0 z-[80]" role="presentation">
      {/* Scrim */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-ink/75 backdrop-blur-sm transition-opacity duration-300 ease-survey ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspector-title"
        className={`absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col border-t border-graticule bg-basin transition-transform duration-500 ease-survey sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(34rem,100vw)] sm:border-l sm:border-t-0 ${
          shown ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
        }`}
      >
        {/* The band colour is stated once, as a bar, and never repeated. */}
        <span
          className="block h-[3px] w-full shrink-0"
          style={{ backgroundColor: band.color }}
          aria-hidden="true"
        />

        <div className="flex shrink-0 items-center gap-4 border-b border-graticule/70 px-6 py-4">
          <span className="t-margin text-mist/70">
            {item.elevation ? `ELEV ${item.elevation} M` : 'Detail'}
          </span>
          <span className="flex-1" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-graticule text-mist transition-colors hover:border-mist/70 hover:text-bone"
            aria-label="Close panel"
          >
            <Close className="text-base" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {item.cover ? (
            <div className="border-b border-graticule/70 bg-ink">
              <img
                src={item.cover}
                alt={`${item.name} — screen`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="px-6 py-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <BandTag band={item.band} />
              {item.status ? <StatusBadge status={item.status} /> : null}
              {item.year ? <span className="t-data text-mist/80">{item.year}</span> : null}
            </div>

            <h3
              id="inspector-title"
              className="t-display-tight mt-5 text-3xl leading-tight text-bone md:text-4xl"
            >
              {item.name}
            </h3>
            {item.subtitle || item.tagline ? (
              <p className="t-eyebrow mt-2 text-mist">{item.subtitle || item.tagline}</p>
            ) : null}

            <p className="mt-6 text-base leading-relaxed text-bone/90">{item.summary}</p>
            {item.detail ? (
              <p className="mt-4 text-base leading-relaxed text-mist">{item.detail}</p>
            ) : null}

            {item.highlights?.length ? (
              <div className="mt-9">
                <div className="flex items-center gap-4">
                  <span className="t-margin shrink-0 text-mist/70">What is in it</span>
                  <Rule className="flex-1" />
                </div>
                <ul className="mt-4 space-y-3">
                  {item.highlights.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <span
                        className="mt-[0.55rem] block h-[5px] w-[5px] shrink-0"
                        style={{ backgroundColor: band.color }}
                        aria-hidden="true"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {item.facts?.length ? (
              <dl className="mt-9">
                {item.facts.map((fact) => (
                  <DataRow key={fact.label} label={fact.label} value={fact.value} />
                ))}
              </dl>
            ) : null}

            {item.stack?.length ? (
              <div className="mt-9">
                <div className="flex items-center gap-4">
                  <span className="t-margin shrink-0 text-mist/70">Built with</span>
                  <Rule className="flex-1" />
                </div>
                <StackList items={item.stack} className="mt-4" />
              </div>
            ) : null}
          </div>
        </div>

        {/* Actions pinned to the bottom, so they survive a long scroll. */}
        {isAndroid || links.length ? (
          <div className="shrink-0 border-t border-graticule/70 bg-basin/95 px-6 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {isAndroid ? <PlayBadge url={item.storeUrl} /> : null}
              {links.map((link) => (
                <ExternalLink key={link.href} href={link.href} className="text-sm">
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
