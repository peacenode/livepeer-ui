import { getCliClient } from "sanity/cli"

const ORIGIN = "https://livepeer.org"
const client = getCliClient()

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
}

function text(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
}

function absoluteUrl(value) {
  return new URL(decodeHtml(value), ORIGIN).href
}

function extensionFor(contentType, url) {
  const fromUrl = new URL(url).pathname.match(/\.([a-z0-9]+)$/i)?.[1]
  if (fromUrl) return fromUrl
  return contentType.split("/")[1]?.split("+")[0] || "bin"
}

async function fetchOk(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  return response
}

async function uploadAsset(url, slug) {
  const response = await fetchOk(url)
  const contentType = response.headers.get("content-type") || "application/octet-stream"
  const bytes = Buffer.from(await response.arrayBuffer())
  const isImage = contentType.startsWith("image/")
  const assetType = isImage ? "image" : "file"
  const filename = `${slug}-${crypto.randomUUID()}.${extensionFor(contentType, url)}`

  const existing = await client.fetch(
    `*[_type == $type && source.url == $url][0]{_id,url}`,
    { type: `sanity.${assetType}Asset`, url }
  )
  if (existing) return existing

  return client.assets.upload(assetType, bytes, {
    filename,
    contentType,
    source: { id: url, name: "livepeer.org blog import", url },
  })
}

function extract(html, pattern, label) {
  const match = html.match(pattern)
  if (!match) throw new Error(`Could not extract ${label}`)
  return decodeHtml(match[1])
}

async function articleSlugs() {
  const html = await (await fetchOk(`${ORIGIN}/blog`)).text()
  return [
    ...new Set(
      [...html.matchAll(/href="\/blog\/([^"?#]+)"/g)].map((match) => match[1])
    ),
  ]
}

async function importPost(slug) {
  const sourceUrl = `${ORIGIN}/blog/${slug}`
  const html = await (await fetchOk(sourceUrl)).text()
  const article = extract(html, /(<article[\s\S]*?<\/article>)/, "article")
  const title = text(extract(article, /<h1[^>]*>([\s\S]*?)<\/h1>/, "title"))
  const description = decodeHtml(
    extract(html, /<meta name="description" content="([^"]*)"/, "description")
  )
  const sourceCategory = text(
    extract(
      article,
      /<span class="text-foreground\/50">([\s\S]*?)<\/span>/,
      "category"
    )
  )
  const category = {
    "Product & Protocol": "Network",
    Protocol: "Network",
    Ecosystem: "Community",
    Community: "Community",
    News: "Community",
    Governance: "Proposals",
    Network: "Network",
  }[sourceCategory]
  if (!category) throw new Error(`Unmapped blog category: ${sourceCategory}`)
  const publishedAt = extract(article, /<time dateTime="([^"]+)"/, "date")
  const readingTime = Number(
    extract(article, /<span>(\d+) min read<\/span>/, "reading time")
  )
  const authorMatch = article.match(
    /<span class="text-foreground\/60">([\s\S]*?)<\/span>/
  )
  const heroTag = article.match(/<header[\s\S]*?(<img[^>]+>)[\s\S]*?<\/header>/)?.[1]
  if (!heroTag) throw new Error(`Could not extract hero image for ${slug}`)
  const heroAlt = decodeHtml(extract(heroTag, /alt="([^"]*)"/, "hero alt"))
  const heroSourceUrl = absoluteUrl(extract(heroTag, /src="([^"]+)"/, "hero URL"))
  const heroAsset = await uploadAsset(heroSourceUrl, slug)
  let bodyHtml = extract(
    article,
    /<div class="blog-prose"[^>]*>([\s\S]*?)<\/div><div class="divider-gradient/,
    "body"
  )

  const mediaUrls = [
    ...new Set(
      [...bodyHtml.matchAll(/<(?:img|video)[^>]+src="([^"]+)"/g)].map(
        (match) => absoluteUrl(match[1])
      )
    ),
  ]

  for (const mediaUrl of mediaUrls) {
    const asset = await uploadAsset(mediaUrl, slug)
    bodyHtml = bodyHtml.replaceAll(
      new URL(mediaUrl).pathname,
      asset.url
    )
    bodyHtml = bodyHtml.replaceAll(mediaUrl, asset.url)
  }

  bodyHtml = bodyHtml
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")

  const document = {
    _id: `livepeerBlogPost-${slug}`,
    _type: "livepeerBlogPost",
    title,
    slug: { _type: "slug", current: slug },
    description,
    category,
    author: authorMatch ? text(authorMatch[1]) : undefined,
    publishedAt,
    readingTime,
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroAsset._id },
      alt: heroAlt,
    },
    bodyHtml,
    sourceUrl,
  }

  await client.createOrReplace(document)
  console.log(`Imported ${slug}`)
}

const slugs = await articleSlugs()
console.log(`Found ${slugs.length} posts`)
for (const slug of slugs) await importPost(slug)
const hasBlogLink = await client.fetch(
  `defined(*[_id == "livepeerOrgSite" && $href in menuLinks[].href][0])`,
  { href: "/mockups/livepeer-org/latest" }
)
if (!hasBlogLink) {
  await client
    .patch("livepeerOrgSite")
    .setIfMissing({ menuLinks: [] })
    .append("menuLinks", [
      {
        _key: "blog",
        _type: "livepeerOrgLink",
        label: "Blog",
        href: "/mockups/livepeer-org/latest",
      },
    ])
    .commit()
}
console.log(`Imported ${slugs.length} Livepeer blog posts`)
