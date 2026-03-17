import { DocsShell } from '@/components/docs-shell';
import { PostCard } from '@/components/post-card';
import { getPostsByType } from '@/lib/posts';

export const metadata = {
  title: 'TIL | Mirae',
};

export default async function TilPage() {
  const posts = await getPostsByType('til');

  return (
    <DocsShell pathname="/til/" toc={[{ id: 'til-archive', title: 'TIL archive', level: 2 }]}>
      <section className="docs-page space-y-8" id="til-archive">
        <header className="docs-page-header">
          <p className="docs-eyebrow">TIL archive</p>
          <h1 className="docs-page-title">TIL 모음</h1>
          <p className="docs-page-description">
            학습 노트와 튜토리얼, 트러블슈팅 기록을 아카이브합니다. 빠르게 훑을 수 있도록 문서 리스트 구조로
            정리했습니다.
          </p>
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
