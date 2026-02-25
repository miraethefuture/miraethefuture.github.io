import Link from 'next/link';

import { PostContent } from '@/components/post-content';
import type { Post } from '@/lib/types';

interface PostDetailProps {
  post: Post;
  sectionLabel: string;
  backHref: string;
  backLabel: string;
}

export function PostDetail({ post, sectionLabel, backHref, backLabel }: PostDetailProps) {
  const entries = Object.entries(post.links).filter(([, value]) => Boolean(value));

  return (
    <article className="space-y-8">
      <header className="surface-panel rounded-3xl p-7 md:p-10">
        <p className="mb-2 text-sm font-semibold tracking-[0.1em] text-sky-700">{sectionLabel}</p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{post.title}</h1>
        <p className="mb-6 max-w-3xl text-slate-700">{post.summary}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readingMinutes} min read</span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {tag}
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
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700"
              >
                {key}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <PostContent source={post.body} />

      <div className="pt-4">
        <Link href={backHref} className="text-sm font-semibold text-sky-700 underline-offset-4 hover:underline">
          {backLabel}
        </Link>
      </div>
    </article>
  );
}
