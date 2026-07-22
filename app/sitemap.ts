import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { pageList } from '@/data/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return pageList.map((page) => ({
    url: page.route === '/' ? baseUrl : `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
