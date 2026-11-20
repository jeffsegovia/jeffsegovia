import { Link } from '@tanstack/react-router'
import { SocialIcon } from '@/components/site/social-icon'
import { site, socials } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1">
          <span className="text-foreground font-medium">{site.name}</span>
          <span>
            Software engineer in the {site.location}. ©{' '}
            {new Date().getFullYear()}
          </span>
        </div>
        <ul
          className="flex flex-wrap items-center gap-1"
          aria-label="Elsewhere"
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="hover:text-foreground hover:bg-accent flex size-9 items-center justify-center transition-colors"
                aria-label={s.label}
                title={s.label}
                {...(s.icon === 'mail'
                  ? {}
                  : { rel: 'me noopener', target: '_blank' })}
              >
                <SocialIcon icon={s.icon} />
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/rss.xml"
              reloadDocument
              className="hover:text-foreground hover:bg-accent flex size-9 items-center justify-center transition-colors"
              aria-label="RSS feed"
              title="RSS feed"
            >
              <SocialIcon icon="rss" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
