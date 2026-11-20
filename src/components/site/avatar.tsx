import { site } from '@/config/site'
import { cn } from '@/lib/utils'

export function Avatar({
  className,
  priority = false,
  size = 'small',
}: {
  className?: string
  priority?: boolean
  size?: 'small' | 'large'
}) {
  const { webp, jpg } =
    size === 'large'
      ? { webp: site.avatar.webp, jpg: site.avatar.jpg }
      : { webp: site.avatar.smallWebp, jpg: site.avatar.smallJpg }
  const px = size === 'large' ? 480 : 160
  return (
    <picture
      className={cn(
        'bg-muted block shrink-0 overflow-hidden rounded-full border',
        className,
      )}
    >
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt={`Photo of ${site.name}`}
        width={px}
        height={px}
        className="size-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  )
}
