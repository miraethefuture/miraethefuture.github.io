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
    <article className="group h-full rounded-2xl border border-slate-900/10 bg-white p-6 shadow-subtle transition duration-300 hover:-translate-y-1 hover:shadow-medium">
      <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-600">
        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-700">{post.type.toUpperCase()}</span>
        <time dateTime={post.date}>{post.date}</time>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="mb-3 text-lg font-semibold leading-tight text-slate-950">{post.title}</h3>
      <p className="text-sm leading-6 text-slate-700">{post.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={getHref(post)}
        className="mt-6 inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 transition hover:text-sky-700 hover:underline"
      >
        자세히 보기
      </Link>
    </article>
  );
}
