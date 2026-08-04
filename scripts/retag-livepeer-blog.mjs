import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-08-03" })
const apply = process.argv.includes("--apply")
const categories = ["Network", "Agent", "Community", "Proposals", "Engineering"]

const posts = await client.fetch(`
  *[_type == "livepeerBlogPost"] | order(publishedAt desc) {
    _id,
    title,
    category,
    "stockCategory": *[
      _type == "stockImage" &&
      image.asset._ref == ^.heroImage.asset._ref
    ][0].group->parent->name
  }
`)

const invalid = posts.filter(
  (post) => !post.stockCategory || !categories.includes(post.stockCategory)
)

if (invalid.length) {
  console.error("Every blog hero must belong to a canonical stock-image section:")
  for (const post of invalid)
    console.error(`- ${post._id}: ${post.stockCategory ?? "no matching stock image"}`)
  process.exitCode = 1
} else {
  const changes = posts.filter((post) => post.category !== post.stockCategory)

  console.log(
    JSON.stringify(
      {
        mode: apply ? "apply" : "dry-run",
        categories,
        posts: posts.length,
        changes: changes.map((post) => ({
          id: post._id,
          title: post.title,
          from: post.category,
          to: post.stockCategory,
        })),
      },
      null,
      2
    )
  )

  if (apply && changes.length) {
    let transaction = client.transaction()
    for (const post of changes)
      transaction = transaction.patch(post._id, (patch) =>
        patch.set({ category: post.stockCategory })
      )
    await transaction.commit()
    console.log(`Updated ${changes.length} blog posts.`)
  }
}
