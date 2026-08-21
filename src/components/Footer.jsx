import { profile, bands, bandOrder } from '../data/profile'
import { tally } from '../data/products'

/*
 * SheetFooter — the colophon.
 *
 * Printed maps carry a strip at the bottom stating the projection, the
 * edition and who drew it. This is that strip, so it states how the page
 * was actually made rather than a decorative sign-off.
 */

const year = new Date().getFullYear()

export function SheetFooter() {
  return (
    <footer className="relative border-t border-graticule/70">
      <div className="mx-auto w-full max-w-sheet px-6 py-14 md:px-10">
        {/* Elevation ramp, stated one final time as a continuous strip —
            the key to everything above it. */}
        <div className="flex h-1 w-full" aria-hidden="true">
          {bandOrder.map((key) => (
            <span
              key={key}
              className="block h-full flex-1"
              style={{ backgroundColor: bands[key].color }}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="t-display-tight text-lg text-bone">{profile.name}</p>
            <p className="mt-2 max-w-measure text-sm leading-relaxed text-mist">
              {profile.role}. {profile.station}.
            </p>

            <p className="t-data mt-6 max-w-measure leading-relaxed text-mist/60">
              Built with Vite, React and Tailwind. The background is a live contour field:
              marching squares over a seeded fBm heightmap, redrawn each frame on a 2D canvas.
              No 3D library, no images.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-x-8 self-start md:gap-x-12">
            {[
              { label: 'Shipped', value: tally.shipped },
              { label: 'On Play', value: tally.onPlay },
              { label: 'Games', value: tally.games },
            ].map((stat) => (
              <div key={stat.label}>
                <dd
                  className="t-display text-3xl tabular-nums text-bone md:text-4xl"
                  style={{ fontVariationSettings: "'wdth' 110, 'wght' 600" }}
                >
                  {String(stat.value).padStart(2, '0')}
                </dd>
                <dt className="t-eyebrow mt-2 text-mist">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-graticule/60 pt-6">
          <span className="t-margin text-mist/60">{profile.sheet}</span>
          <span className="t-data text-mist/50">© {year}</span>
          <span className="flex-1" />
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Elsewhere">
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-eyebrow text-mist transition-colors duration-300 hover:text-bone"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#top"
              className="t-eyebrow text-mist transition-colors duration-300 hover:text-bone"
            >
              Back to top
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
