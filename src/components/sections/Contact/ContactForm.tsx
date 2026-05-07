import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/schemas/contact'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitState('success')
      reset()
      setTimeout(() => setSubmitState('idle'), 5000)
    } catch {
      setSubmitState('error')
    }
  }

  const fieldBase =
    'w-full bg-espresso-deep border border-[rgba(212,197,169,0.18)] text-[#F5F0E8] px-4 py-3.5 rounded-lg font-sans text-[15px] transition-[border-color,background] duration-200 focus:outline-none focus:border-terracotta focus:bg-[rgba(31,20,12,0.7)] focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-1 focus-visible:ring-offset-espresso-deep'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      {submitState === 'success' && (
        <output className="block bg-[rgba(122,140,110,0.18)] border border-[rgba(122,140,110,0.4)] px-[18px] py-4 rounded-lg text-[#d8e0cf] text-sm">
          Thanks — message landed. I'll be back to you within a day or two.
        </output>
      )}

      {submitState === 'error' && (
        <div
          role="alert"
          className="bg-[rgba(196,101,42,0.12)] border border-[rgba(196,101,42,0.3)] px-[18px] py-4 rounded-lg text-[rgba(245,240,232,0.9)] text-sm"
        >
          Something went wrong — please try emailing me directly.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        <div className="grid gap-1.5">
          <label
            htmlFor="name"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(245,240,232,0.55)]"
          >
            Your name
          </label>
          <input id="name" type="text" className={fieldBase} {...register('name')} />
          {errors.name && (
            <p role="alert" className="text-[rgba(196,101,42,0.9)] text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <label
            htmlFor="email"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(245,240,232,0.55)]"
          >
            Email
          </label>
          <input id="email" type="email" className={fieldBase} {...register('email')} />
          {errors.email && (
            <p role="alert" className="text-[rgba(196,101,42,0.9)] text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-1.5">
        <label
          htmlFor="subject"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(245,240,232,0.55)]"
        >
          What's this about
        </label>
        <input
          id="subject"
          type="text"
          placeholder="A role, a project, an argument…"
          className={fieldBase}
          {...register('subject')}
        />
      </div>

      <div className="grid gap-1.5">
        <label
          htmlFor="message"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(245,240,232,0.55)]"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me a bit about what you're working on."
          className={`${fieldBase} resize-y min-h-[130px]`}
          {...register('message')}
        />
        {errors.message && (
          <p role="alert" className="text-[rgba(196,101,42,0.9)] text-xs mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitState === 'loading'}
        className="justify-self-start inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3.5 rounded-lg text-[15px] font-medium transition-[background,transform] duration-200 hover:bg-terracotta-deep hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
      >
        {submitState === 'loading' ? 'Sending…' : 'Send message'} <span aria-hidden="true">→</span>
      </button>

      <p className="text-[13px] text-[rgba(245,240,232,0.5)]">
        Or just email me directly — whichever's easier.
      </p>
    </form>
  )
}
