export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    "id": _id,
    "date": publishedAt,
    category,
    title,
    excerpt,
    "slug": slug.current
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    "date": publishedAt,
    category,
    title,
    excerpt,
    "slug": slug.current,
    body
  }
`

export const allProjectsQuery = `
  *[_type == "project"] | order(coalesce(order, 999)) {
    "id": _id,
    title,
    description,
    tags,
    "url": coalesce(url, "#"),
    iconVariant
  }
`
