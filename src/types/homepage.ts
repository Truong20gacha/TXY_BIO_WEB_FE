import data from '../data/homepage.json'

export type HomepageData = typeof data
export type HeroData = HomepageData['hero']
export type StatItem = HomepageData['stats']['items'][number]
export type ProcessStep = HomepageData['process']['steps'][number]
export type SpeciesOption = HomepageData['speciesSelector']['options'][number]
export type SpeciesProduct = SpeciesOption['products'][number]
export type HomepageProduct = HomepageData['products']['items'][number]
export type Region = HomepageData['globalReach']['regions'][number]
export type CertItem = HomepageData['certifications']['items'][number]
export type FeaturedNews = HomepageData['news']['featured']
export type CompactNews = HomepageData['news']['compact'][number]
export type TrustSignal = HomepageData['inquiryBanner']['trustSignals'][number]
