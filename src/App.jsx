import { useCallback, useMemo, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { ContourField } from './components/ContourField'
import { SheetHeader, HeroPlate } from './components/Hero'
import { ClimbPlate } from './components/Climb'
import { ShippedPlate } from './components/Shipped'
import { StartupPlate } from './components/Startup'
import { ToolkitPlate } from './components/Toolkit'
import { SelectedPlate } from './components/Selected'
import { Contact } from './components/Contact'
import { SheetFooter } from './components/Footer'
import { Inspector } from './components/Inspector'

import { findBySlug } from './data/products'
import { useReveal, useSheetPosition } from './lib/hooks'

/*
 * One continuous sheet, read top to bottom.
 *
 * The previous build swapped pages with component state, which meant the
 * back button did nothing and no section could be linked to. This is a
 * single scrolling document with real anchors instead, so every plate has
 * a URL and the browser behaves the way people expect.
 *
 * Inspector state lives here because three plates open it and a project
 * should be described in exactly one place: src/data/products.js.
 */

const PLATE_IDS = ['climb', 'shipped', 'nisaab360', 'instruments', 'selected', 'register']

function App() {
  const [openSlug, setOpenSlug] = useState(null)

  const revealRef = useReveal()
  const { active, progress } = useSheetPosition(PLATE_IDS)

  const open = useCallback((slug) => setOpenSlug(slug), [])
  const close = useCallback(() => setOpenSlug(null), [])

  const item = useMemo(() => (openSlug ? findBySlug(openSlug) : null), [openSlug])

  return (
    <>
      {/* The field sits at z-0 and the content at z-10, stated explicitly.
          A negative z-index on the canvas would put it behind the body's
          own background and rely on background propagation to stay
          visible — which breaks the moment anything sets a background on
          html or body. */}
      <ContourField />

      <SheetHeader active={active} progress={progress} />

      <main ref={revealRef} className="grain relative z-10">
        <HeroPlate />
        <ClimbPlate onSelect={open} />
        <ShippedPlate onSelect={open} />
        <StartupPlate onSelect={open} />
        <ToolkitPlate />
        <SelectedPlate onSelect={open} />
        <Contact />
      </main>

      <SheetFooter />

      <Inspector item={item} onClose={close} />

      <Analytics />
    </>
  )
}

export default App
