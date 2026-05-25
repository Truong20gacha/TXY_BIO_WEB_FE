import clsx from 'clsx'

type SkeletonProps = Readonly<{
  className?: string
}>

export function Skeleton({ className }: SkeletonProps) {
  return <div className={clsx('bg-surface-alt animate-pulse-subtle', className)} aria-hidden="true" />
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col p-6 border border-line-divider md:p-8">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-1 h-4 w-1/2" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-1 h-3 w-5/6" />
      <Skeleton className="mt-1 h-3 w-2/3" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="mt-6 h-4 w-32" />
    </div>
  )
}

export function NewsCardSkeleton() {
  return (
    <article className="flex flex-col p-6 border border-line-divider md:p-8">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-1 h-5 w-1/2" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-1 h-3 w-5/6" />
      <Skeleton className="mt-6 h-4 w-24" />
    </article>
  )
}

const PRODUCTS_SKELETON_COUNT = 6
const NEWS_SKELETON_COUNT = 3

export function ProductsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {Array.from({ length: PRODUCTS_SKELETON_COUNT }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function NewsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {Array.from({ length: NEWS_SKELETON_COUNT }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container-x py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="flex flex-col justify-center">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-10 w-3/4" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-2/3" />
          <div className="flex gap-2 mt-6">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DosageTableSkeleton() {
  return (
    <div>
      <Skeleton className="h-3 w-48 mb-6" />
      <Skeleton className="h-px w-full mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
