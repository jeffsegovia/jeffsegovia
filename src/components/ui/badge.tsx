import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'bg-secondary text-secondary-foreground inline-flex h-6 items-center px-2 text-xs font-medium',
        className,
      )}
      {...props}
    />
  )
}
