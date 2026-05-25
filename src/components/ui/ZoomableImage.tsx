import { useRef, useState } from 'react'

type ZoomableImageProps = Readonly<{
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
  scale?: number
  className?: string
}>

export function ZoomableImage({
  src,
  alt,
  loading = 'lazy',
  scale = 1.8,
  className = '',
}: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [origin, setOrigin] = useState('50% 50%')
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  const handleLeave = () => {
    setHovered(false)
    setOrigin('50% 50%')
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      className={`relative h-full w-full overflow-hidden cursor-zoom-in [@media(hover:none)]:cursor-auto ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        draggable={false}
        style={{
          transformOrigin: origin,
          transform: hovered ? `scale(${scale})` : 'scale(1)',
        }}
        className="h-full w-full object-contain transition-transform duration-300 ease-out will-change-transform select-none"
      />
    </div>
  )
}
