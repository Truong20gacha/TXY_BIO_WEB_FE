import data from '../data/information.json'

export type SiteData = typeof data
export type Product = SiteData['products'][number]
export type Species = SiteData['species']['items'][number]
export type Certification = SiteData['certifications']['items'][number]
export type Category = SiteData['productCategories']['items'][number]
export type Stat = SiteData['stats']['items'][number]
export type Hero = SiteData['heroes'][Exclude<keyof SiteData['heroes'], 'consumedBy'>]
export type NavItem = SiteData['navigation']['main'][number]
export type BusinessType = SiteData['contact']['businessTypes'][number]
export type Dosage = Product['dosages'][number]
export type Specification = Product['specifications'][number]
