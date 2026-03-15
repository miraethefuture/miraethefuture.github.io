import Link from 'next/link';

import { DocsShell } from '@/components/docs-shell';
import { PostCard } from '@/components/post-card';
import { TagChip } from '@/components/tag-chip';
import { getFeaturedProjects, getRecentTilPosts, getTags } from '@/lib/posts';

export default async function HomePage() {
  const [featuredProjects, recentTilPosts, tags] = await Promise.all([
    getFeaturedProjects(3),
    getRecentTilPosts(4),
    getTags(),
  ]);

  return (
    <DocsShell
      pathname="/"
      toc={[
        { id: 'start-here', title: 'Start here', level: 2 },
        { id: 'featured-projects', title: 'Featured projects', level: 2 },
        { id: 'recent-til', title: 'Recent TIL', level: 2 },
        { id: 'browse-by-tag', title: 'Browse by tag', level: 2 },
      ]}
    >
      <div className="docs-page space-y-16">
        <section id="start-here">
          <header className="docs-page-header">
            <p className="docs-eyebrow">Home</p>
            <h1 className="docs-page-title">구조적으로 읽는 iOS 개발 아카이브</h1>
            <p className="docs-page-description">
              프로젝트 결과물과 TIL 기록을 문서처럼 탐색할 수 있도록 정리했습니다. 좌측 트리로 문서를 이동하고,
              우측 목차로 현재 페이지를 빠르게 스캔할 수 있습니다.
            </p>
          </header>

          <div className="docs-grid-two">
            <article className="surface-panel pt-6">
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-950">Projects</h2>
              <p className="text-sm leading-7 text-slate-600">
                문제 정의, 설계 결정, 개선 결과를 한 문서 안에서 추적할 수 있게 정리합니다.
              </p>
            </article>
            <article className="surface-panel pt-6">
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-950">TIL</h2>
              <p className="text-sm leading-7 text-slate-600">
                학습 과정에서 나온 실험과 트러블슈팅 기록을 축적해 재사용 가능한 지식으로 바꿉니다.
              </p>
            </article>
          </div>
        </section>

        <section id="featured-projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Featured projects</h2>
            <Link href="/projects/" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
              모든 프로젝트 보기
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="docs-list">
              {featuredProjects.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">프로젝트 포스트를 추가하면 이 영역에 자동 반영됩니다.</p>
          )}
        </section>

        <section id="recent-til" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Recent TIL</h2>
            <Link href="/til/" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
              모든 TIL 보기
            </Link>
          </div>

          <div className="docs-list">
            {recentTilPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section id="browse-by-tag" className="space-y-5">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Browse by tag</h2>
          <div className="flex flex-wrap gap-2.5">
            {tags.length > 0 ? tags.slice(0, 20).map((item) => <TagChip key={item.tag} tag={item.tag} count={item.count} />) : null}
          </div>
        </section>
      </div>
    </DocsShell>
  );
}
