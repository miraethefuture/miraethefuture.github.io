import Link from 'next/link';

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
    <div className="space-y-16">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Featured Projects</h2>
          <Link href="/projects/" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
            전체 보기
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">프로젝트 포스트를 추가하면 이 영역에 자동 반영됩니다.</p>
        )}
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Recent TIL</h2>
          <Link href="/til/" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
            전체 보기
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recentTilPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-950">기술 태그</h2>
        <div className="flex flex-wrap gap-2.5">
          {tags.length > 0 ? tags.slice(0, 20).map((item) => <TagChip key={item.tag} tag={item.tag} count={item.count} />) : null}
        </div>
      </section>
    </div>
  );
}
