import * as React from 'react'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Heading,
  Link,
} from '@react-email/components'

export interface ContactEmailProps {
  name: string
  email: string
  subject?: string
  message: string
}

export function ContactEmail({ name, email, subject, message }: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        New portfolio contact from {name}: {subject ?? message.slice(0, 60)}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={label}>josephsearle.dev</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>New message</Heading>

            <Text style={metaLabel}>From</Text>
            <Text style={metaValue}>
              {name} —{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>

            {subject && (
              <>
                <Text style={metaLabel}>Subject</Text>
                <Text style={metaValue}>{subject}</Text>
              </>
            )}

            <Hr style={divider} />

            <Text style={metaLabel}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Sent via the contact form at{' '}
              <Link href="https://josephsearle.dev" style={link}>
                josephsearle.dev
              </Link>
              . Reply directly to this email to respond to {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: '#F5F0E8',
  fontFamily: 'Georgia, serif',
  margin: '0',
  padding: '0',
}

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '40px auto',
  backgroundColor: '#EDE6D6',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #D4C5A9',
}

const header: React.CSSProperties = {
  backgroundColor: '#2A1C13',
  padding: '20px 32px',
}

const label: React.CSSProperties = {
  fontSize: '11px',
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#C4652A',
  margin: '0',
}

const content: React.CSSProperties = {
  padding: '32px',
}

const heading: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: '500',
  color: '#3D2B1F',
  margin: '0 0 24px 0',
  letterSpacing: '-0.02em',
}

const metaLabel: React.CSSProperties = {
  fontSize: '11px',
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(26,15,10,0.5)',
  margin: '0 0 4px 0',
}

const metaValue: React.CSSProperties = {
  fontSize: '15px',
  color: '#1A0F0A',
  margin: '0 0 20px 0',
  lineHeight: '1.5',
}

const messageText: React.CSSProperties = {
  fontSize: '16px',
  color: 'rgba(26,15,10,0.82)',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap',
}

const divider: React.CSSProperties = {
  borderColor: '#D4C5A9',
  margin: '20px 0',
}

const link: React.CSSProperties = {
  color: '#C4652A',
  textDecoration: 'underline',
}

const footer: React.CSSProperties = {
  padding: '16px 32px',
  borderTop: '1px solid #D4C5A9',
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: 'rgba(26,15,10,0.45)',
  margin: '0',
  lineHeight: '1.6',
}
