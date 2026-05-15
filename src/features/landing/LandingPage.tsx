import { LandingHero } from './components/LandingHero'
import { LandingFeatureCards } from './components/LandingFeatureCards'

const FLOOR_BG = '/assets/landing-floor.png'

export function LandingPage() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <section className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 pb-2 pt-0 sm:gap-12 sm:pb-3 lg:gap-14 lg:pb-4">
        <LandingHero />
        <LandingFeatureCards />
      </section>

      <div className="app-landing-floor mt-auto" aria-hidden>
        <div className="app-landing-floor__blend" />
        <img src={FLOOR_BG} alt="" className="app-landing-floor__img" />
      </div>
    </div>
  )
}
