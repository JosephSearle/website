import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { contactSchema } from '../src/schemas/contact'
import { renderContactEmail } from '../emails/renderContactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() })
  }

  const { name, email, subject, message } = parsed.data

  const html = await renderContactEmail({ name, email, subject, message })

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'portfolio@josephsearle.dev',
    to: 'josephwilliamsearle@gmail.com',
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `Portfolio contact from ${name}`,
    html,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }

  return res.status(200).json({ success: true })
}
