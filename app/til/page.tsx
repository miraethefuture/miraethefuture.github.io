import { PostCard } from '@/components/post-card';
import { getPostsByType } from '@/lib/posts';

export const metadata = {
  title: 'TIL | Mirae Dev Blog',
};

export default async function TilPage() {
  const posts = await getPostsByType('til');

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-[0.1em] text-sky-700">TIL ARCHIVE</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">TIL 모음</h1>
        <p className="max-w-3xl text-slate-700">
          학습 노트와 튜토리얼, 트러블슈팅 기록을 아카이브합니다. 빠른 스캔을 위해 요약과 태그를 함께 제공합니다.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
