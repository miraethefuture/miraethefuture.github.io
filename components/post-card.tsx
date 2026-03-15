import Link from 'next/link';

import type { PostMeta } from '@/lib/types';

interface PostCardProps {
  post: PostMeta;
}

function getHref(post: PostMeta) {
  return post.type === 'project' ? `/projects/${post.slug}/` : `/til/${post.slug}/`;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-t border-slate-900/10 py-6 first:border-t-0">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-800">{post.type.toUpperCase()}</span>
        <time dateTime={post.date}>{post.date}</time>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="mb-3 text-xl font-semibold leading-tight tracking-tight text-slate-950">{post.title}</h3>
      <p className="text-sm leading-7 text-slate-600">{post.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={getHref(post)}
        className="mt-6 inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 transition hover:underline"
      >
        Read document
      </Link>
    </article>
  );
}
