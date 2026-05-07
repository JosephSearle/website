import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/contact', async () => {
    return HttpResponse.json({ success: true }, { status: 200 })
  }),
]

export const errorHandlers = [
  http.post('/api/contact', async () => {
    return HttpResponse.json({ error: 'Server error' }, { status: 500 })
  }),
]
