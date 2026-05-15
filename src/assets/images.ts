/** Uygulama görselleri — Vite import (hash + build doğrulaması). */

import cardPatternUrl from './images/card-pattern.svg'
import landingFloorUrl from './images/landing-floor.png'
import logoCompactUrl from './images/logo-compact.svg'
import logoFullUrl from './images/logo-full.svg'
import logoMarkUrl from './images/logo-mark.svg'
import loading1Url from './images/loading/loading1.png'
import loading2Url from './images/loading/loading2.png'
import loading3Url from './images/loading/loading3.png'
import loading4Url from './images/loading/loading4.png'

export const appImages = {
  logoFull: logoFullUrl,
  logoCompact: logoCompactUrl,
  logoMark: logoMarkUrl,
  cardPattern: cardPatternUrl,
  landingFloor: landingFloorUrl,
  loadingFrames: [loading1Url, loading2Url, loading3Url, loading4Url] as const,
} as const
