import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import type { LandingFeatureCardDef } from '../data/featureCards.mock'
import { appCopy } from '../../../content/appCopy'

type Props = {
  card: LandingFeatureCardDef
}

export function LandingFeatureCard({ card }: Props) {
  const copy = appCopy.features[card.id]

  const body = (
    <>
      <div className="app-feature-card-pattern" aria-hidden />

      <div className="relative z-10 flex min-h-42 w-full flex-col items-center gap-4 px-8 pb-7 pt-8 text-center sm:min-h-52 sm:pb-8 sm:pt-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100/95 text-[#6B7280] shadow-sm ring-1 ring-black/10 backdrop-blur-[1px]">
          <Icon icon={card.icon} className="text-[26px]" aria-hidden />
        </span>
        <h3 className="text-base font-semibold leading-snug text-black sm:text-lg">{copy.title}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-[#6B7280]">{copy.description}</p>
      </div>
    </>
  )

  if (card.enabled && card.href) {
    return (
      <Link
        to={card.href}
        className="app-feature-card-shell app-feature-card-shell--interactive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
      >
        {body}
        <span className="app-feature-card-shine-wrap" aria-hidden>
          <span className="app-feature-card-shine-stripe" />
        </span>
      </Link>
    )
  }

  return (
    <div
      className="app-feature-card-shell pointer-events-none opacity-55"
      aria-disabled
      title={appCopy.comingSoon}
    >
      {body}
    </div>
  )
}
