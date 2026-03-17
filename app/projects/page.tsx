import { DocsShell } from '@/components/docs-shell';
import { PostCard } from '@/components/post-card';
import { getPostsByType } from '@/lib/posts';

export const metadata = {
  title: 'Projects | Mirae',
};

export default async function ProjectsPage() {
  const projects = await getPostsByType('project');

  return (
    <DocsShell pathname="/projects/" toc={[{ id: 'project-archive', title: 'Project archive', level: 2 }]}>
      <section className="docs-page space-y-8" id="project-archive">
        <header className="docs-page-header">
          <p className="docs-eyebrow">Project archive</p>
          <h1 className="docs-page-title">프로젝트 모음</h1>
          <p className="docs-page-description">
            핵심 프로젝트를 문제 정의, 역할, 해결 방식, 결과 관점으로 정리했습니다. 문서 흐름으로 읽을 수 있게
            정리해 두었습니다.
          </p>
        </header>

        {projects.length > 0 ? (
          <div className="docs-list">
            {projects.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="border-t border-dashed border-slate-300 py-8 text-sm text-slate-600">
            프로젝트 타입 포스트가 아직 없습니다. `_posts` frontmatter에 `type: project`를 추가하면 자동 분류됩니다.
          </div>
        )}
      </section>
    </DocsShell>
  );
}
