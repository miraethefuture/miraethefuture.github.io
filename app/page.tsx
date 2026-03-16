import Link from 'next/link';

import { DocsShell } from '@/components/docs-shell';
import { PostCard } from '@/components/post-card';
import { TagChip } from '@/components/tag-chip';
import { getAllPosts, getRecentTilPosts, getTags } from '@/lib/posts';

export default async function HomePage() {
  const [latestPosts, recentTilPosts, tags] = await Promise.all([
    getAllPosts(),
    getRecentTilPosts(4),
    getTags(),
  ]);

  return (
    <DocsShell
      pathname="/"
      toc={[
        { id: 'start-here', title: 'Start here', level: 2 },
        { id: 'latest-posts', title: 'Latest posts', level: 2 },
        { id: 'recent-til', title: 'Recent TIL', level: 2 },
        { id: 'browse-by-tag', title: 'Browse by tag', level: 2 },
      ]}
    >
      <div className="docs-page space-y-16">
        <section id="start-here">
          <header className="docs-page-header">
            <h1 className="docs-page-title">iOS 개발 아카이브</h1>
          </header>
        </section>

        <section id="latest-posts" className="space-y-6">
          {latestPosts.length > 0 ? (
            <div className="docs-list">
              {latestPosts.slice(0, 4).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">최신 포스트가 이 영역에 표시됩니다.</p>
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
