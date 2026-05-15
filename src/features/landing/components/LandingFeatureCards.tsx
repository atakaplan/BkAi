import { LANDING_FEATURE_CARD_DEFS } from '../data/featureCards.mock'
import { LandingFeatureCard } from './LandingFeatureCard'

/** Kart verisi: `featureCards.mock.ts` — ileride API ile değiştirilebilir. */
export function LandingFeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:gap-8">
      {LANDING_FEATURE_CARD_DEFS.map((card) => (
        <LandingFeatureCard key={card.id} card={card} />
      ))}
    </div>
  )
}
