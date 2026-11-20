import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

/** Every fenced code block: the highlighted `<pre>` with a copy button. */
export function Pre(props: React.ComponentProps<'pre'>) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  return (
    <div className="not-prose group bg-muted/40 relative my-6 border">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={async () => {
          const text = ref.current?.innerText ?? ''
          try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
          } catch {
            // Clipboard blocked: nothing to do.
          }
        }}
        className="bg-background text-muted-foreground hover:text-foreground absolute top-2 right-2 flex size-8 items-center justify-center border transition-colors"
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  )
}
