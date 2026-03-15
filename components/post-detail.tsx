import Link from 'next/link';

import { PostContent } from '@/components/post-content';
import type { TocItem } from '@/lib/docs';
import type { Post } from '@/lib/types';

interface PostDetailProps {
  post: Post;
  sectionLabel: string;
  backHref: string;
  backLabel: string;
  toc?: TocItem[];
}

export function PostDetail({ post, sectionLabel, backHref, backLabel }: PostDetailProps) {
  const entries = Object.entries(post.links).filter(([, value]) => Boolean(value));

  return (
    <article className="docs-page space-y-8">
      <header className="docs-page-header">
        <p className="docs-eyebrow">{sectionLabel}</p>
        <h1 className="docs-page-title docs-page-title-detail">{post.title}</h1>
        <p className="docs-page-description">{post.summary}</p>

        <div className="docs-meta-row">
          <span className="docs-meta-pill">
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <span className="docs-meta-pill">{post.readingMinutes} min read</span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`} className="docs-meta-pill">
              #{tag}
            </Link>
          ))}
        </div>

        {entries.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {entries.map(([key, url]) => (
              <Link
                key={key}
                href={url as string}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:text-slate-900"
              >
                {key}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <PostContent source={post.body} />

      <div className="pt-4">
        <Link href={backHref} className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
          {backLabel}
        </Link>
      </div>
    </article>
  );
}
