import { useParams, Link } from 'react-router-dom'
import Nav from '@/components/layout/Nav/Nav'
import Footer from '@/components/layout/Footer/Footer'
import { useSanityPost } from '@/hooks/useSanityPost'
import { PortableTextBody } from '@/lib/sanity/portableText'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading } = useSanityPost(slug ?? '')

  if (loading) {
    return (
      <>
        <Nav />
        <main className="max-w-[740px] mx-auto px-8 pt-[140px] pb-[90px]">
          <div className="h-8 w-48 bg-surface rounded animate-pulse mb-4" />
          <div className="h-16 bg-surface rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-surface rounded animate-pulse" />
            ))}
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Nav />
        <main className="max-w-[740px] mx-auto px-8 pt-[140px] pb-[90px]">
          <p className="text-[rgba(26,15,10,0.6)] text-[17px]">Post not found.</p>
          <Link to="/" className="text-terracotta font-medium mt-4 inline-block">
            ← Back home
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main className="max-w-[740px] mx-auto px-8 pt-[140px] pb-[90px]">
        <Link
          to="/"
          className="font-mono text-[13px] text-[rgba(26,15,10,0.55)] no-underline hover:text-terracotta transition-colors mb-10 inline-block"
        >
          ← Writing
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sage font-medium block mb-4">
          {post.category}
        </span>
        <h1
          className="font-display font-medium text-heading tracking-[-0.025em] leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontVariationSettings: "'opsz' 144" }}
        >
          {post.title}
        </h1>
        <p className="font-mono text-[13px] text-[rgba(26,15,10,0.55)] mb-10 tracking-[0.04em]">
          {post.date}
        </p>

        {post.body ? (
          <PortableTextBody post={post} />
        ) : (
          <>
            <p className="text-[18px] leading-[1.7] text-[rgba(26,15,10,0.8)]">{post.excerpt}</p>
            <p className="mt-8 text-[rgba(26,15,10,0.5)] italic text-[15px]">
              Full post content coming once Sanity CMS is connected.
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
