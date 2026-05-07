import { render } from '@react-email/render'
import { ContactEmail, type ContactEmailProps } from './ContactEmail'

export async function renderContactEmail(props: ContactEmailProps): Promise<string> {
  return render(<ContactEmail {...props} />)
}
