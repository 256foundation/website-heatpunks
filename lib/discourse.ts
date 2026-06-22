import type {
  DiscourseLatestResponse,
  DiscourseCategoriesResponse,
  DiscourseTopicDetailResponse,
  ForumTopic,
  ForumImage
} from '@/types/discourse';

const DISCOURSE_URL = process.env.DISCOURSE_URL || 'https://forum.heatpunks.org';

// Hard ceiling per network attempt so a slow/hanging forum can never stall
// page regeneration (which would otherwise risk a platform/proxy timeout).
const FETCH_TIMEOUT_MS = 5000;

// Helper to build topic URL
const getTopicUrl = (slug: string, id: number) => `${DISCOURSE_URL}/t/${slug}/${id}`;

// Helper to build Discourse API headers
function getDiscourseHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Accept': 'application/json' };
  if (process.env.DISCOURSE_API_KEY && process.env.DISCOURSE_API_USERNAME) {
    headers['Api-Key'] = process.env.DISCOURSE_API_KEY;
    headers['Api-Username'] = process.env.DISCOURSE_API_USERNAME;
  }
  return headers;
}

// Validate Discourse API response structure
function isValidDiscourseResponse(data: any): data is DiscourseLatestResponse {
  return (
    data &&
    typeof data === 'object' &&
    data.topic_list &&
    typeof data.topic_list === 'object' &&
    Array.isArray(data.topic_list.topics)
  );
}

// Fetch with retry logic and exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2
): Promise<Response> {
  // Disable retries in test environment for faster tests
  const isTest = process.env.NODE_ENV === 'test';
  const maxRetries = isTest ? 0 : retries;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Bound every attempt with a timeout; on expiry fetch rejects and we
      // fall through to the retry/backoff path below.
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      // If successful, return immediately
      if (response.ok) {
        return response;
      }

      // If it's the last attempt or a client error (4xx), don't retry
      if (attempt === maxRetries || (response.status >= 400 && response.status < 500)) {
        return response;
      }

      // Wait with exponential backoff before retrying (1s, 2s, 4s...)
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));

    } catch (error) {
      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait with exponential backoff before retrying
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript requires it
  throw new Error('Failed to fetch after retries');
}

// Fetch topic details and extract images from all posts (including replies)
async function getTopicImages(topicId: number, topicTitle: string, topicSlug: string): Promise<string[]> {
  try {
    const response = await fetchWithRetry(`${DISCOURSE_URL}/t/${topicId}.json`, {
      headers: getDiscourseHeaders(),
      next: { revalidate: 300 }, // Cache for 5 minutes
    }, 1); // Gallery images are non-critical: at most one retry to keep regeneration fast

    if (!response.ok) {
      return [];
    }

    const topic: DiscourseTopicDetailResponse = await response.json();

    // Validate response structure
    if (!topic.post_stream || !Array.isArray(topic.post_stream.posts)) {
      return [];
    }

    const images: string[] = [];

    // Extract images from all posts (including replies)
    for (const post of topic.post_stream.posts) {
      if (!post.cooked) continue;

      // Match all img tags and extract src attributes
      const imgMatches = post.cooked.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*>/g);
      if (imgMatches) {
        for (const imgTag of imgMatches) {
          const srcMatch = imgTag.match(/src=["']([^"'>]+)["']/);
          if (srcMatch && srcMatch[1]) {
            const imgUrl = srcMatch[1];
            // Convert relative URLs to absolute
            const absoluteUrl = imgUrl.startsWith('http')
              ? imgUrl
              : `${DISCOURSE_URL}${imgUrl}`;
            images.push(absoluteUrl);
          }
        }
      }
    }

    return images;
  } catch (error) {
    console.error(`Failed to fetch images for topic ${topicId}:`, error);
    return [];
  }
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return 'unknown';
  }
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

// Unified data fetching - fetches topics and categories once, returns both topics and images
export interface DiscourseData {
  topics: ForumTopic[];
  images: ForumImage[];
}

// Last-known-good data, held in module memory for the lifetime of the server
// instance. When a fetch/regeneration fails transiently, we serve this instead
// of a null/empty feed — so a brief forum hiccup never poisons the cached page.
let lastGoodData: DiscourseData | null = null;

// Test-only: clear the in-memory last-known-good cache between cases so module
// state doesn't leak across tests. No effect on production code paths.
export function __resetDiscourseCacheForTests(): void {
  lastGoodData = null;
}

// Build the gallery image list from an already-fetched topic list.
// First pass uses topic.image_url (no extra network). Second pass fetches a
// few topics' posts in PARALLEL to fill gaps without serializing latency.
async function buildImages(
  data: DiscourseLatestResponse,
  imagesLimit: number
): Promise<ForumImage[]> {
  const images: ForumImage[] = data.topic_list.topics
    .filter((topic) => topic.image_url)
    .slice(0, imagesLimit)
    .map((topic) => ({
      id: topic.id,
      url: topic.image_url!.startsWith('http')
        ? topic.image_url!
        : `${DISCOURSE_URL}${topic.image_url}`,
      topicTitle: topic.fancy_title || topic.title,
      topicUrl: getTopicUrl(topic.slug, topic.id),
    }));

  if (images.length >= imagesLimit) {
    return images;
  }

  // Fill remaining slots from topics without a thumbnail. Cap at 5 topics and
  // run them concurrently; getTopicImages already swallows its own errors.
  const candidates = data.topic_list.topics
    .filter((topic) => !topic.image_url)
    .slice(0, 5);

  const candidateImages = await Promise.all(
    candidates.map(async (topic) => {
      const replyImages = await getTopicImages(
        topic.id,
        topic.fancy_title || topic.title,
        topic.slug
      );
      if (replyImages.length === 0) return null;
      return {
        id: topic.id,
        url: replyImages[0],
        topicTitle: topic.fancy_title || topic.title,
        topicUrl: getTopicUrl(topic.slug, topic.id),
      } as ForumImage;
    })
  );

  for (const image of candidateImages) {
    if (images.length >= imagesLimit) break;
    if (image) images.push(image);
  }

  return images;
}

export async function getDiscourseData(topicsLimit = 10, imagesLimit = 12): Promise<DiscourseData | null> {
  const headers = getDiscourseHeaders();

  let validTopicData: DiscourseLatestResponse | null = null;
  let categoryMap: Record<number, string> = {};

  // Fetch topics and categories in parallel. Network/parse failures are
  // contained here so they degrade to last-known-good rather than throwing.
  try {
    const [topicsResponse, categoriesResponse] = await Promise.all([
      fetchWithRetry(`${DISCOURSE_URL}/latest.json`, {
        headers,
        next: { revalidate: 300 }, // Cache for 5 minutes
      }),
      fetchWithRetry(`${DISCOURSE_URL}/categories.json`, {
        headers,
        next: { revalidate: 3600 }, // Cache categories for 1 hour
      }),
    ]);

    if (topicsResponse.ok) {
      const data = await topicsResponse.json();
      if (isValidDiscourseResponse(data)) {
        validTopicData = data;
      } else {
        console.error('Invalid Discourse response structure:', data);
      }
    } else {
      console.error(`Discourse API error: ${topicsResponse.status}`);
    }

    if (categoriesResponse.ok) {
      try {
        const categoriesData: DiscourseCategoriesResponse = await categoriesResponse.json();
        categoryMap = Object.fromEntries(
          categoriesData.category_list.categories.map((cat) => [cat.id, cat.name])
        );
      } catch (categoriesError) {
        console.error('Error parsing Discourse categories:', categoriesError);
      }
    }
  } catch (error) {
    console.error('Failed to fetch Discourse data:', error);
  }

  // Process whatever we successfully fetched. Topics and images are built
  // independently so one failing never wipes out the other.
  let freshTopics: ForumTopic[] | null = null;
  let freshImages: ForumImage[] | null = null;

  if (validTopicData) {
    try {
      freshTopics = validTopicData.topic_list.topics
        .slice(0, topicsLimit)
        .map((topic) => ({
          id: topic.id,
          title: topic.fancy_title || topic.title,
          excerpt: topic.excerpt || '',
          category: categoryMap[topic.category_id] || 'General',
          url: getTopicUrl(topic.slug, topic.id),
          timeAgo: getTimeAgo(topic.last_posted_at || topic.created_at),
        }));
    } catch (processingError) {
      console.error('Error processing Discourse topics:', processingError);
    }

    try {
      freshImages = await buildImages(validTopicData, imagesLimit);
    } catch (imageError) {
      console.error('Error processing Discourse images:', imageError);
    }
  }

  // Merge fresh results with last-known-good, per-section. A successful fetch
  // that yields an empty array (e.g. no images) is still "fresh" and kept.
  const topics = freshTopics ?? lastGoodData?.topics ?? null;
  const images = freshImages ?? lastGoodData?.images ?? null;

  // Persist whatever fresh data we obtained so future failures can fall back.
  if (freshTopics || freshImages) {
    lastGoodData = {
      topics: freshTopics ?? lastGoodData?.topics ?? [],
      images: freshImages ?? lastGoodData?.images ?? [],
    };
  }

  if (!topics && !images) {
    return null;
  }

  return { topics: topics ?? [], images: images ?? [] };
}

// Legacy functions for backward compatibility and independent usage
export async function getLatestTopics(limit = 10): Promise<ForumTopic[] | null> {
  const data = await getDiscourseData(limit, 0);
  return data?.topics ?? null;
}

export async function getTopicsWithImages(limit = 12): Promise<ForumImage[] | null> {
  const data = await getDiscourseData(0, limit);
  return data?.images ?? null;
}
