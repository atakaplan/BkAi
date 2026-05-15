export type LandingFeatureId =
  | 'soruOlustur'
  | 'dersPlaniOlustur'
  | 'etutOlustur'
  | 'ogrenciSinifRaporlari'
  | 'kompozisyonRubrik'
  | 'evCalismasi'

export type LandingFeatureCardDef = {
  id: LandingFeatureId
  icon: string
  href: string | null
  enabled: boolean
}

export const LANDING_FEATURE_CARD_DEFS: LandingFeatureCardDef[] = [
  {
    id: 'soruOlustur',
    icon: 'mdi:creation',
    href: '/bkai/soru-olustur',
    enabled: true,
  },
  {
    id: 'dersPlaniOlustur',
    icon: 'mdi:triangle-outline',
    href: null,
    enabled: false,
  },
  {
    id: 'etutOlustur',
    icon: 'mdi:notebook-outline',
    href: null,
    enabled: false,
  },
  {
    id: 'ogrenciSinifRaporlari',
    icon: 'mdi:chart-box-outline',
    href: null,
    enabled: false,
  },
  {
    id: 'kompozisyonRubrik',
    icon: 'mdi:file-document-outline',
    href: null,
    enabled: false,
  },
  {
    id: 'evCalismasi',
    icon: 'mdi:book-open-page-variant-outline',
    href: null,
    enabled: false,
  },
]
