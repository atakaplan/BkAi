import { appImages } from '@/assets/images'
import { LandingHero } from './components/LandingHero'
import { LandingFeatureCards } from './components/LandingFeatureCards'

export function LandingPage() {
  return (
    <div className="flex min-h-full w-full flex-1 flex-col">
      <section className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:gap-8 lg:py-10">
        <LandingHero />
        <LandingFeatureCards />
      </section>

      <div className="app-landing-floor mt-auto" aria-hidden>
        <div className="app-landing-floor__blend" />
        <img src={appImages.landingFloor} alt="" className="app-landing-floor__img" />
      </div>
    </div>
  )
}
