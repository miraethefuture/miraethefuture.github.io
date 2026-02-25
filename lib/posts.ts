import { cache } from 'react';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join, basename } from 'node:path';
import matter from 'gray-matter';

import type { Post, PostLinks, PostMeta, PostType } from '@/lib/types';

const POSTS_DIR = join(process.cwd(), '_posts');

const TYPE_OVERRIDES: Record<string, PostType> = {
  '2024-09-20-lottoMate': 'project',
  '2024-09-22-lottoMate-refactoringLog': 'project',
  '2024-10-03-login': 'project',
  '2024-09-27-responsiveMediaApp': 'project',
};

const FEATURED_OVERRIDES = new Set<string>([
  '2024-09-20-lottoMate',
  '2024-09-22-lottoMate-refactoringLog',
  '2024-10-03-login',
]);

type RawFrontmatter = {
  title?: string;
  date?: string | Date;
  summary?: string;
  tags?: string[] | string;
  category?: string;
  categories?: string[];
  type?: PostType;
  featured?: boolean;
  links?: PostLinks;
};

function toSlug(filename: string) {
  return basename(filename, extname(filename));
}

function toDateText(value: string | Date | undefined, slug: string) {
  const fallback = slug.slice(0, 10);
  if (!value) return fallback;
  if (value instanceof Date) return value.toISOString().slice(0, 10);

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;

  return parsed.toISOString().slice(0, 10);
}

function toTags(frontmatter: RawFrontmatter) {
  const raw: string[] = [];

  if (typeof frontmatter.tags === 'string') {
    raw.push(...frontmatter.tags.split(','));
  }

  if (Array.isArray(frontmatter.tags)) {
    raw.push(...frontmatter.tags);
  }

  if (typeof frontmatter.category === 'string') {
    raw.push(frontmatter.category);
  }

  if (Array.isArray(frontmatter.categories)) {
    raw.push(...frontmatter.categories);
  }

  return [...new Set(raw.map((tag) => tag.trim()).filter(Boolean))];
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/[#>*_~\-|]/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLegacyMarkdown(markdown: string) {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\{\:.*\}\s*$/gm, '')
    .replace(/\sstyle=(\"[^\"]*\"|'[^']*')/gi, '')
    .replace(/<br>/gi, '<br />')
    .replace(/<img([^>]*?)>/gi, (match, attrs: string) => {
      if (match.endsWith('/>')) {
        return match;
      }

      return `<img${attrs} />`;
    });
}

function toSummary(frontmatter: RawFrontmatter, body: string) {
  if (frontmatter.summary?.trim()) {
    return frontmatter.summary.trim();
  }

  const plain = stripMarkdown(body);
  if (!plain) {
    return '요약이 준비되지 않았습니다.';
  }

  const maxLength = 150;

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}...`;
}

function toReadingMinutes(body: string) {
  const words = stripMarkdown(body)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}

function inferType(frontmatter: RawFrontmatter, slug: string) {
  if (frontmatter.type === 'project' || frontmatter.type === 'til') {
    return frontmatter.type;
  }

  if (TYPE_OVERRIDES[slug]) {
    return TYPE_OVERRIDES[slug];
  }

  const title = frontmatter.title ?? '';

  if (/프로젝트|project/i.test(title)) {
    return 'project';
  }

  return 'til';
}

const loadPosts = cache(async (): Promise<Post[]> => {
  const files = await readdir(POSTS_DIR);
  const markdownFiles = files.filter((file) => extname(file) === '.md');

  const posts = await Promise.all(
    markdownFiles.map(async (file) => {
      const source = await readFile(join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(source);
      const frontmatter = data as RawFrontmatter;
      const slug = toSlug(file);
      const type = inferType(frontmatter, slug);
      const normalizedContent = normalizeLegacyMarkdown(content);

      return {
        slug,
        type,
        title: frontmatter.title?.trim() || slug,
        date: toDateText(frontmatter.date, slug),
        summary: toSummary(frontmatter, normalizedContent),
        tags: toTags(frontmatter),
        featured: typeof frontmatter.featured === 'boolean' ? frontmatter.featured : FEATURED_OVERRIDES.has(slug),
        links: frontmatter.links ?? {},
        readingMinutes: toReadingMinutes(normalizedContent),
        body: normalizedContent,
      } satisfies Post;
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
});

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const posts = await loadPosts();
  return posts.map(({ body: _body, ...meta }) => meta);
});

export const getPostsByType = cache(async (type: PostType): Promise<PostMeta[]> => {
  const posts = await loadPosts();
  return posts.filter((post) => post.type === type).map(({ body: _body, ...meta }) => meta);
});

export const getPostBySlug = cache(async (type: PostType, slug: string): Promise<Post | null> => {
  const posts = await loadPosts();
  const post = posts.find((item) => item.slug === slug && item.type === type);
  return post ?? null;
});

export const getFeaturedProjects = cache(async (limit = 3): Promise<PostMeta[]> => {
  const projects = await getPostsByType('project');
  return projects.filter((project) => project.featured).slice(0, limit);
});

export const getRecentTilPosts = cache(async (limit = 6): Promise<PostMeta[]> => {
  const posts = await getPostsByType('til');
  return posts.slice(0, limit);
});

export const getTags = cache(async (): Promise<{ tag: string; count: number }[]> => {
  const posts = await getAllPosts();
  const map = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const next = (map.get(tag) ?? 0) + 1;
      map.set(tag, next);
    });
  });

  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
});

export const getPostsByTag = cache(async (tag: string): Promise<PostMeta[]> => {
  const normalized = tag.toLowerCase();
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.some((item) => item.toLowerCase() === normalized));
});
