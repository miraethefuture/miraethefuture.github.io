import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocsShell } from '@/components/docs-shell';
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
    <DocsShell pathname={`/tags/${encodeURIComponent(tag)}/`} toc={[{ id: 'tag-archive', title: `#${tag}`, level: 2 }]}>
      <section className="docs-page space-y-8" id="tag-archive">
        <header className="docs-page-header">
          <p className="docs-eyebrow">Tag</p>
          <h1 className="docs-page-title">#{tag}</h1>
          <p className="docs-page-description">총 {posts.length}개의 문서가 이 태그에 연결되어 있습니다.</p>
        </header>

        <div className="docs-list">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </DocsShell>
  );
}
