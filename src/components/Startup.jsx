import { startup } from '../data/products'
import { bands } from '../data/profile'
import { Plate, DataRow, StackList, ExternalLink, ActionButton, GhostButton } from './ui'

/*
 * StartupPlate — Nisaab360.
 *
 * Deliberately not a project card. Everything else on the sheet answers
 * "can he build it"; this plate answers "can he own it", so it is set as
 * a full-width statement with the domain as the largest type in the
 * block and the facts read as a register down the side.
 */

export function StartupPlate({ onSelect }) {
  const band = bands[startup.band]
  const domain = startup.website.replace(/^https?:\/\//, '')

  return (
    <Plate
      id="nisaab360"
      number="03"
      title="Nisaab360"
      elevation={`${startup.elevation} M · LIVE`}
      lede={startup.tagline}
    >
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="reveal">
          {/* The domain, set as type. A live URL is the whole proof, so
              it gets the size rather than a screenshot. */}
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <span
              className="t-display block break-words text-[clamp(1.9rem,5.6vw,3.4rem)] leading-[1.05] text-bone transition-colors duration-500 ease-survey group-hover:text-moss"
              style={{ fontVariationSettings: "'wdth' 108, 'wght' 620" }}
            >
              {domain}
            </span>
            <span
              className="mt-4 block h-[2px] w-full origin-left scale-x-[0.18] transition-transform duration-700 ease-survey group-hover:scale-x-100"
              style={{ backgroundColor: band.color }}
              aria-hidden="true"
            />
          </a>

          <p className="mt-9 max-w-measure text-base leading-relaxed text-bone/90 md:text-lg">
            {startup.summary}
          </p>
          <p className="mt-5 max-w-measure text-base leading-relaxed text-mist">
            {startup.detail}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ActionButton
              as="a"
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Nisaab360
            </ActionButton>
            <GhostButton type="button" onClick={() => onSelect(startup.slug)}>
              Read the notes
            </GhostButton>
          </div>
        </div>

        {/* Register of facts — the margin column of a survey sheet. */}
        <aside className="reveal reveal-d1">
          <div className="border-t-2 pt-6" style={{ borderColor: band.color }}>
            <span className="t-margin text-mist/70">Register</span>
            <dl className="mt-4">
              {startup.facts.map((fact) => (
                <DataRow key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <span className="t-margin text-mist/70">Built with</span>
            <StackList items={startup.stack} className="mt-4" />
          </div>

          <div className="mt-8">
            <span className="t-margin text-mist/70">Listed on</span>
            <div className="mt-4">
              <ExternalLink href={startup.listing} className="text-sm">
                SaaSBrowser
              </ExternalLink>
            </div>
          </div>
        </aside>
      </div>
    </Plate>
  )
}
