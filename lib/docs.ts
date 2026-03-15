import { cache } from 'react';

import { getAllPosts, getPostsByType, getTags } from '@/lib/posts';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface DocsNavItem {
  title: string;
  href: string;
  meta?: string;
}

export interface DocsNavSection {
  title: string;
  href?: string;
  items: DocsNavItem[];
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

export function extractTableOfContents(source: string): TocItem[] {
  const lines = source.split('\n');
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());

    if (!match) {
      continue;
    }

    const level = match[1] === '##' ? 2 : 3;
    const title = match[2].replace(/[`*_]/g, '').trim();

    if (!title) {
      continue;
    }

    items.push({
      id: slugifyHeading(title),
      title,
      level,
    });
  }

  return items;
}

export const getDocsNavigation = cache(async (): Promise<DocsNavSection[]> => {
  const [projects, tilPosts, tags, allPosts] = await Promise.all([
    getPostsByType('project'),
    getPostsByType('til'),
    getTags(),
    getAllPosts(),
  ]);

  return [
    {
      title: 'Overview',
      items: [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about/' },
        { title: 'Search', href: '/search/' },
      ],
    },
    {
      title: 'Projects',
      href: '/projects/',
      items: projects.map((post) => ({
        title: post.title,
        href: `/projects/${post.slug}/`,
        meta: post.date,
      })),
    },
    {
      title: 'TIL',
      href: '/til/',
      items: tilPosts.map((post) => ({
        title: post.title,
        href: `/til/${post.slug}/`,
        meta: post.date,
      })),
    },
    {
      title: 'Tags',
      href: '/tags/',
      items: tags.slice(0, 12).map((tag) => ({
        title: `#${tag.tag}`,
        href: `/tags/${encodeURIComponent(tag.tag)}/`,
        meta: `${tag.count}`,
      })),
    },
    {
      title: 'Recent updates',
      items: allPosts.slice(0, 6).map((post) => ({
        title: post.title,
        href: post.type === 'project' ? `/projects/${post.slug}/` : `/til/${post.slug}/`,
        meta: post.date,
      })),
    },
  ];
});
