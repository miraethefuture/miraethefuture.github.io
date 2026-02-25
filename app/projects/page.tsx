import { PostCard } from '@/components/post-card';
import { getPostsByType } from '@/lib/posts';

export const metadata = {
  title: 'Projects | Mirae Dev Blog',
};

export default async function ProjectsPage() {
  const projects = await getPostsByType('project');

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-[0.1em] text-sky-700">PROJECT ARCHIVE</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">프로젝트 모음</h1>
        <p className="max-w-3xl text-slate-700">
          핵심 프로젝트를 문제 정의, 역할, 해결 방식, 결과 관점으로 정리했습니다. 채용 관점에서 빠르게 비교할 수 있도록
          카드 구조로 제공합니다.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600">
          프로젝트 타입 포스트가 아직 없습니다. `_posts` frontmatter에 `type: project`를 추가하면 자동 분류됩니다.
        </div>
      )}
    </section>
  );
}
