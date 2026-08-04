import type { Metadata } from "next"

import { LivepeerBlogIndex } from "@/components/livepeer-ui/livepeer-blog-index"
import { getLivepeerBlogPosts } from "@/sanity/lib/livepeer-blog"

export const metadata: Metadata = {
  title: "Latest Updates",
  description: "News, insights, and updates from across the Livepeer ecosystem.",
}

export default async function LivepeerLatestPage() {
  const posts = await getLivepeerBlogPosts()
  return <LivepeerBlogIndex posts={posts} />
}
