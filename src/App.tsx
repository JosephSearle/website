import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import BlogPostPage from '@/pages/BlogPostPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
