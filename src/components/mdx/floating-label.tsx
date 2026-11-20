import * as React from 'react'

/** The four inputs from "Creating an Input with Floating Label with
 * TailwindCSS", step by step. The class lists follow the post; only the
 * colours changed to the site's tokens. */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const base =
  'h-[54px] block px-2.5 py-3 w-full text-sm bg-transparent border border-input appearance-none focus:outline-none focus:ring-1 focus:ring-foreground peer disabled:cursor-not-allowed disabled:opacity-50'

const floating =
  'pointer-events-none select-none absolute cursor-text *:hidden text-sm text-muted-foreground duration-300 px-1.5 -translate-y-5 scale-75 bg-background left-1 top-2 z-[5] origin-[0] peer-focus:px-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:*:inline peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-foreground peer-focus:bg-background peer-focus:*:hidden'

function ErrorText({ id, error }: { id?: string; error?: string }) {
  return error ? (
    <em className="text-destructive text-xs not-italic" id={`${id}_error`}>
      {error}
    </em>
  ) : null
}

export function InputWithFloatingLabel({
  type = 'text',
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className="not-prose my-6 flex-1">
      <div className="relative w-full flex-1">
        <input
          type={type}
          data-hasplaceholder={props.placeholder ? true : undefined}
          className={`${base} aria-[invalid=true]:border-destructive placeholder:text-muted-foreground placeholder:invisible data-[hasplaceholder=true]:focus:placeholder:visible`}
          placeholder={props.placeholder ?? label}
          {...props}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${props.id}_error` : undefined}
        />
        <label htmlFor={props.id} className={floating}>
          {label}
        </label>
      </div>
      <ErrorText id={props.id} error={error} />
    </div>
  )
}

export function InputWithFloatingLabelA({
  type = 'text',
  label,
  error: _e,
  ...props
}: InputProps) {
  return (
    <div className="not-prose relative my-6 w-full flex-1">
      <input
        type={type}
        className={base}
        placeholder={props.placeholder ?? label}
        {...props}
      />
      <label
        htmlFor={props.id}
        className="text-muted-foreground bg-background pointer-events-none absolute top-1/2 left-1 z-[5] -translate-y-1/2 cursor-text px-1.5 text-sm duration-300 select-none"
      >
        {label}
      </label>
    </div>
  )
}

export function InputWithFloatingLabelB({
  type = 'text',
  label,
  error: _e,
  ...props
}: InputProps) {
  return (
    <div className="not-prose relative my-6 w-full flex-1">
      <input
        type={type}
        className={`${base} placeholder:invisible`}
        placeholder={props.placeholder ?? label}
        {...props}
      />
      <label
        htmlFor={props.id}
        className="text-muted-foreground bg-background peer-focus:text-foreground pointer-events-none absolute top-1/2 left-1 z-[5] origin-[0] -translate-y-1/2 cursor-text px-1.5 text-sm duration-300 select-none peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-1.5"
      >
        {label}
      </label>
    </div>
  )
}

export function InputWithFloatingLabelC(props: InputProps) {
  return <InputWithFloatingLabel {...props} />
}
