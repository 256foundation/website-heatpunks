import { getTimeAgo, getLatestTopics, getTopicsWithImages, getDiscourseData, __resetDiscourseCacheForTests } from '../discourse';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Clear the module-level last-known-good cache before every test so state
// from one case (e.g. a successful fetch) doesn't leak into the next.
beforeEach(() => {
  __resetDiscourseCacheForTests();
});

describe('getTimeAgo', () => {
  beforeEach(() => {
    // Mock Date.now() to return a consistent time
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-30T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns "just now" for recent times', () => {
    const now = new Date('2025-01-30T11:59:30Z').toISOString();
    expect(getTimeAgo(now)).toBe('just now');
  });

  it('returns minutes ago correctly', () => {
    const fiveMinutesAgo = new Date('2025-01-30T11:55:00Z').toISOString();
    expect(getTimeAgo(fiveMinutesAgo)).toBe('5 minutes ago');
  });

  it('returns "1 minute ago" (singular) correctly', () => {
    const oneMinuteAgo = new Date('2025-01-30T11:59:00Z').toISOString();
    expect(getTimeAgo(oneMinuteAgo)).toBe('1 minute ago');
  });

  it('returns hours ago correctly', () => {
    const threeHoursAgo = new Date('2025-01-30T09:00:00Z').toISOString();
    expect(getTimeAgo(threeHoursAgo)).toBe('3 hours ago');
  });

  it('returns "1 hour ago" (singular) correctly', () => {
    const oneHourAgo = new Date('2025-01-30T11:00:00Z').toISOString();
    expect(getTimeAgo(oneHourAgo)).toBe('1 hour ago');
  });

  it('returns days ago correctly', () => {
    const twoDaysAgo = new Date('2025-01-28T12:00:00Z').toISOString();
    expect(getTimeAgo(twoDaysAgo)).toBe('2 days ago');
  });

  it('returns weeks ago correctly', () => {
    const twoWeeksAgo = new Date('2025-01-16T12:00:00Z').toISOString();
    expect(getTimeAgo(twoWeeksAgo)).toBe('2 weeks ago');
  });

  it('returns months ago correctly', () => {
    const twoMonthsAgo = new Date('2024-11-30T12:00:00Z').toISOString();
    expect(getTimeAgo(twoMonthsAgo)).toBe('2 months ago');
  });

  it('returns years ago correctly', () => {
    const twoYearsAgo = new Date('2023-01-30T12:00:00Z').toISOString();
    expect(getTimeAgo(twoYearsAgo)).toBe('2 years ago');
  });

  it('returns "unknown" for invalid date strings', () => {
    expect(getTimeAgo('invalid-date')).toBe('unknown');
    expect(getTimeAgo('')).toBe('unknown');
    expect(getTimeAgo('not a date')).toBe('unknown');
  });
});

describe('getDiscourseData', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-30T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockTopicsResponse = {
    users: [],
    topic_list: {
      topics: [
        {
          id: 1,
          title: 'Test Topic',
          fancy_title: 'Test Topic',
          slug: 'test-topic',
          excerpt: 'This is a test excerpt',
          image_url: 'https://example.com/image.jpg',
          category_id: 7,
          posts_count: 5,
          reply_count: 3,
          created_at: '2025-01-28T12:00:00Z',
          last_posted_at: '2025-01-29T12:00:00Z',
          posters: [],
        },
        {
          id: 2,
          title: 'Another Topic',
          fancy_title: 'Another Topic',
          slug: 'another-topic',
          category_id: 5,
          posts_count: 2,
          reply_count: 1,
          created_at: '2025-01-27T12:00:00Z',
          last_posted_at: '2025-01-28T12:00:00Z',
          posters: [],
        },
      ],
    },
  };

  const mockCategoriesResponse = {
    category_list: {
      categories: [
        { id: 7, name: 'Hydronics', slug: 'hydronics', color: 'ff6b00' },
        { id: 5, name: 'Control', slug: 'control', color: '00ff41' },
      ],
    },
  };

  it('fetches and returns both topics and images', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const data = await getDiscourseData(10, 12);

    expect(data).not.toBeNull();
    expect(data!.topics).toHaveLength(2);
    expect(data!.images).toHaveLength(1); // Only one topic has image_url
  });

  it('returns null when API fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const data = await getDiscourseData();

    expect(data).toBeNull();
  });

  it('serves last-known-good data when a later fetch fails', async () => {
    // First call succeeds and populates the in-memory cache.
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockTopicsResponse })
      .mockResolvedValueOnce({ ok: true, json: async () => mockCategoriesResponse });

    const good = await getDiscourseData(10, 12);
    expect(good!.topics).toHaveLength(2);
    expect(good!.images).toHaveLength(1);

    // A subsequent fetch fails entirely. Instead of a null/empty feed, we
    // should get the cached data back so the page never shows "unavailable".
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: false, status: 503 });

    const stale = await getDiscourseData(10, 12);
    expect(stale).not.toBeNull();
    expect(stale!.topics).toHaveLength(2);
    expect(stale!.images).toHaveLength(1);
  });
});

describe('getLatestTopics', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-30T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockTopicsResponse = {
    users: [],
    topic_list: {
      topics: [
        {
          id: 1,
          title: 'Test Topic',
          fancy_title: 'Test Topic',
          slug: 'test-topic',
          excerpt: 'This is a test excerpt',
          category_id: 7,
          posts_count: 5,
          reply_count: 3,
          created_at: '2025-01-28T12:00:00Z',
          last_posted_at: '2025-01-29T12:00:00Z',
          posters: [],
        },
        {
          id: 2,
          title: 'Another Topic',
          fancy_title: 'Another Topic',
          slug: 'another-topic',
          category_id: 5,
          posts_count: 2,
          reply_count: 1,
          created_at: '2025-01-27T12:00:00Z',
          last_posted_at: '2025-01-28T12:00:00Z',
          posters: [],
        },
      ],
    },
  };

  const mockCategoriesResponse = {
    category_list: {
      categories: [
        { id: 7, name: 'Hydronics', slug: 'hydronics', color: 'ff6b00' },
        { id: 5, name: 'Control', slug: 'control', color: '00ff41' },
      ],
    },
  };

  it('fetches and transforms topics correctly', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const topics = await getLatestTopics(10);

    expect(topics).toHaveLength(2);
    expect(topics![0]).toEqual({
      id: 1,
      title: 'Test Topic',
      excerpt: 'This is a test excerpt',
      category: 'Hydronics',
      url: 'https://forum.heatpunks.org/t/test-topic/1',
      timeAgo: '1 day ago',
    });
    expect(topics![1].category).toBe('Control');
  });

  it('respects the limit parameter', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const topics = await getLatestTopics(1);

    expect(topics).toHaveLength(1);
  });

  it('returns null when API fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const topics = await getLatestTopics();

    expect(topics).toBeNull();
  });

  it('uses "General" as fallback category when categories fail', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsResponse,
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

    const topics = await getLatestTopics();

    expect(topics![0].category).toBe('General');
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const topics = await getLatestTopics();

    expect(topics).toBeNull();
  });

  it('uses title as fallback when fancy_title is missing', async () => {
    const topicsWithoutFancyTitle = {
      ...mockTopicsResponse,
      topic_list: {
        topics: [
          {
            ...mockTopicsResponse.topic_list.topics[0],
            fancy_title: '',
            title: 'Plain Title',
          },
        ],
      },
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => topicsWithoutFancyTitle,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const topics = await getLatestTopics();

    expect(topics![0].title).toBe('Plain Title');
  });
});

describe('getTopicsWithImages', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  const mockCategoriesResponse = {
    category_list: {
      categories: [
        { id: 7, name: 'Hydronics', slug: 'hydronics', color: 'ff6b00' },
        { id: 5, name: 'Control', slug: 'control', color: '00ff41' },
      ],
    },
  };

  const mockTopicsWithImages = {
    users: [],
    topic_list: {
      topics: [
        {
          id: 1,
          title: 'Topic with Image',
          fancy_title: 'Topic with Image',
          slug: 'topic-with-image',
          image_url: 'https://example.com/image.jpg',
          category_id: 7,
          posts_count: 5,
          reply_count: 3,
          created_at: '2025-01-28T12:00:00Z',
          last_posted_at: '2025-01-29T12:00:00Z',
          posters: [],
        },
        {
          id: 2,
          title: 'Topic without Image',
          fancy_title: 'Topic without Image',
          slug: 'topic-without-image',
          category_id: 5,
          posts_count: 2,
          reply_count: 1,
          created_at: '2025-01-27T12:00:00Z',
          last_posted_at: '2025-01-28T12:00:00Z',
          posters: [],
        },
        {
          id: 3,
          title: 'Topic with Relative Image',
          fancy_title: 'Topic with Relative Image',
          slug: 'topic-with-relative-image',
          image_url: '/uploads/image.jpg',
          category_id: 5,
          posts_count: 1,
          reply_count: 0,
          created_at: '2025-01-26T12:00:00Z',
          last_posted_at: '2025-01-26T12:00:00Z',
          posters: [],
        },
      ],
    },
  };

  it('filters topics to only those with images', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsWithImages,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const images = await getTopicsWithImages();

    expect(images).toHaveLength(2);
    expect(images![0].id).toBe(1);
    expect(images![1].id).toBe(3);
  });

  it('transforms image data correctly', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsWithImages,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const images = await getTopicsWithImages();

    expect(images![0]).toEqual({
      id: 1,
      url: 'https://example.com/image.jpg',
      topicTitle: 'Topic with Image',
      topicUrl: 'https://forum.heatpunks.org/t/topic-with-image/1',
    });
  });

  it('prepends DISCOURSE_URL for relative image URLs', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsWithImages,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const images = await getTopicsWithImages();

    expect(images![1].url).toBe('https://forum.heatpunks.org/uploads/image.jpg');
  });

  it('respects the limit parameter', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopicsWithImages,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const images = await getTopicsWithImages(1);

    expect(images).toHaveLength(1);
  });

  it('returns null when API fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const images = await getTopicsWithImages();

    expect(images).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const images = await getTopicsWithImages();

    expect(images).toBeNull();
  });

  it('returns empty array when no topics have images', async () => {
    const topicsWithoutImages = {
      users: [],
      topic_list: {
        topics: [
          {
            id: 1,
            title: 'No Image',
            fancy_title: 'No Image',
            slug: 'no-image',
            category_id: 7,
            posts_count: 1,
            reply_count: 0,
            created_at: '2025-01-28T12:00:00Z',
            last_posted_at: '2025-01-28T12:00:00Z',
            posters: [],
          },
        ],
      },
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => topicsWithoutImages,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const images = await getTopicsWithImages();

    expect(images).toEqual([]);
  });

  it('returns null when response is missing topic_list', async () => {
    const malformedResponse = {
      users: [],
      // Missing topic_list field
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const data = await getDiscourseData();

    expect(data).toBeNull();
  });

  it('returns null when topic_list.topics is not an array', async () => {
    const malformedResponse = {
      users: [],
      topic_list: {
        topics: 'not-an-array', // Invalid: should be array
      },
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const data = await getDiscourseData();

    expect(data).toBeNull();
  });

  it('returns null when topic_list is null', async () => {
    const malformedResponse = {
      users: [],
      topic_list: null,
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const data = await getDiscourseData();

    expect(data).toBeNull();
  });

  it('returns null when response is completely invalid', async () => {
    const malformedResponse = {
      invalid: 'structure',
      random: 'data',
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      });

    const data = await getDiscourseData();

    expect(data).toBeNull();
  });
});
