import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="text-muted-foreground font-mono text-sm">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for has moved or never existed.
      </p>
      <div className="flex gap-3 pt-2">
        <Link to="/" className={buttonVariants()}>
          Go home
        </Link>
        <Link to="/blogs" className={buttonVariants({ variant: 'outline' })}>
          Read the blog
        </Link>
      </div>
    </div>
  )
}
