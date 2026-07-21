import { Hero } from './Hero'
import { ActOrigin } from './acts/ActOrigin'
import { ActCraft } from './acts/ActCraft'
import { ActFrontier } from './acts/ActFrontier'
import { ActNext } from './acts/ActNext'

/** The continuous scroll film: boot hand-off → four acts → contact. */
export function Story() {
  return (
    <main className="relative">
      <Hero />
      <ActOrigin />
      <ActCraft />
      <ActFrontier />
      <ActNext />
    </main>
  )
}
