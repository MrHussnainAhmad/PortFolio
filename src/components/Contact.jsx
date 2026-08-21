import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../data/profile'
import { Spinner } from './icons'
import { Plate, Rule, ExternalLink } from './ui'

/*
 * RegisterPlate — contact.
 *
 * A survey sheet ends with the surveyor's register: who made it, where
 * they were, how to reach them. The form uses ruled fields rather than
 * boxes, which is both the visual idiom of a paper form and quieter than
 * six outlined rectangles stacked up.
 *
 * The EmailJS field names (user_name, user_email, message) and the three
 * env vars are unchanged from the previous build, so the existing
 * template and Vercel environment keep working untouched.
 */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const fieldClass =
  'w-full border-0 border-b border-graticule bg-transparent px-0 py-3 text-base text-bone transition-colors duration-300 placeholder:text-mist/45 focus:border-amber focus:outline-none focus:ring-0'

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="t-eyebrow flex items-baseline gap-3 text-mist">
        {label}
        {hint ? <span className="t-data normal-case tracking-normal text-mist/50">{hint}</span> : null}
      </span>
      <span className="mt-1 block">{children}</span>
    </label>
  )
}

export function Contact() {
  const form = useRef(null)
  const [values, setValues] = useState({ user_name: '', user_email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!configured) {
      setStatus({
        type: 'error',
        message: `The form is not configured on this deployment. Email ${profile.email} directly and it will reach me.`,
      })
      return
    }

    setSending(true)
    setStatus(null)

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      setStatus({ type: 'success', message: 'Sent. I read everything and I reply.' })
      setValues({ user_name: '', user_email: '', message: '' })
      form.current?.reset()
    } catch {
      setStatus({
        type: 'error',
        message: `That did not go through. Email ${profile.email} instead and it will reach me.`,
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <Plate
      id="register"
      number="06"
      title="Register"
      elevation={`${profile.latitude} ${profile.longitude}`}
      lede="Open to work, contract or full-time, remote or relocating. If you are building something in web, mobile or Unity, tell me about it — a specific paragraph will always get a better reply than a template."
    >
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        {/* Station register */}
        <div className="reveal">
          <div className="flex items-center gap-4">
            <span className="t-margin shrink-0 text-mist/70">Station</span>
            <Rule className="flex-1" />
          </div>

          <p className="mt-5 text-base text-bone">{profile.station}</p>
          <p className="t-data mt-1 text-mist/70">
            {profile.latitude} · {profile.longitude}
          </p>

          <div className="mt-8">
            <span className="t-eyebrow text-mist">Email</span>
            <p className="mt-1.5">
              <a
                href={`mailto:${profile.email}`}
                className="group/mail inline-flex text-[0.95rem] text-bone transition-colors duration-300 hover:text-amber"
              >
                <span className="relative break-all">
                  {profile.email}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber transition-all duration-300 ease-survey group-hover/mail:w-full" />
                </span>
              </a>
            </p>
          </div>

          <ul className="mt-8 space-y-4">
            {profile.links.map((link) => (
              <li key={link.label}>
                <span className="t-eyebrow block text-mist">{link.label}</span>
                <span className="mt-1.5 block">
                  <ExternalLink href={link.href} className="text-[0.95rem]">
                    {link.handle}
                  </ExternalLink>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-graticule/60 pt-6">
            <ExternalLink href={profile.cv} className="text-[0.95rem]">
              Download CV
            </ExternalLink>
          </div>
        </div>

        {/* Field form */}
        <form ref={form} onSubmit={handleSubmit} className="reveal reveal-d1" noValidate={false}>
          <div className="flex items-center gap-4">
            <span className="t-margin shrink-0 text-mist/70">Send a note</span>
            <Rule className="flex-1" />
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Field label="Name">
              <input
                type="text"
                name="user_name"
                autoComplete="name"
                required
                value={values.user_name}
                onChange={handleChange}
                placeholder="Your name"
                className={fieldClass}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                name="user_email"
                autoComplete="email"
                required
                value={values.user_email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="mt-8">
            <Field label="Message" hint="what you are building, and what you need">
              <textarea
                name="message"
                rows={6}
                required
                value={values.message}
                onChange={handleChange}
                placeholder="A paragraph is plenty."
                className={`${fieldClass} min-h-[8rem] resize-y leading-relaxed`}
              />
            </Field>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="submit"
              disabled={sending}
              className="t-eyebrow inline-flex items-center justify-center gap-2.5 rounded-[2px] bg-bone px-7 py-3.5 text-ink transition-all duration-300 ease-survey hover:-translate-y-0.5 hover:bg-white disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Spinner className="animate-spin text-[0.95em]" />
                  Sending
                </>
              ) : (
                'Send message'
              )}
            </button>

            {/* Status is announced, and coloured from the band ramp
                rather than default browser green and red. */}
            <p
              role="status"
              aria-live="polite"
              className={`t-data max-w-[24rem] leading-relaxed ${
                status?.type === 'success' ? 'text-moss' : 'text-rust'
              }`}
            >
              {status?.message || ''}
            </p>
          </div>
        </form>
      </div>
    </Plate>
  )
}
