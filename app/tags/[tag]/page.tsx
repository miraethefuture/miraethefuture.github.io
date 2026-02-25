import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostCard } from '@/components/post-card';
import { getPostsByTag, getTags } from '@/lib/posts';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((item) => ({ tag: item.tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `${tag} | Tags`,
    description: `${tag} 태그 포스트 모음`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-[0.1em] text-sky-700">TAG</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">#{tag}</h1>
        <p className="text-slate-700">총 {posts.length}개의 글</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
