const FORUM_URL = "https://forum.livepeer.org"
export const RESEARCH_FORUM_URL = `${FORUM_URL}/c/research/15`

export type ForumTopic = {
  id: number
  title: string
  slug: string
  lastPostedAt: string
  lastPosterUsername: string
  replyCount: number
}

type RawForumTopic = {
  id?: number
  title?: string
  slug?: string
  last_posted_at?: string
  last_poster_username?: string
  reply_count?: number
  pinned?: boolean
  visible?: boolean
}

export async function getLatestResearchTopics(
  limit = 3
): Promise<ForumTopic[]> {
  try {
    const response = await fetch(`${RESEARCH_FORUM_URL}.json`, {
      next: { revalidate: 600 },
    })
    if (!response.ok) return []

    const data: { topic_list?: { topics?: RawForumTopic[] } } =
      await response.json()

    return (data.topic_list?.topics ?? [])
      .filter(
        (topic) =>
          !topic.pinned &&
          topic.visible !== false &&
          typeof topic.id === "number" &&
          Boolean(topic.title && topic.slug && topic.last_posted_at)
      )
      .slice(0, limit)
      .map((topic) => ({
        id: topic.id as number,
        title: topic.title as string,
        slug: topic.slug as string,
        lastPostedAt: topic.last_posted_at as string,
        lastPosterUsername: topic.last_poster_username ?? "community",
        replyCount: Number(topic.reply_count ?? 0),
      }))
  } catch {
    return []
  }
}

export function getForumTopicUrl(topic: ForumTopic) {
  return `${FORUM_URL}/t/${topic.slug}/${topic.id}`
}
