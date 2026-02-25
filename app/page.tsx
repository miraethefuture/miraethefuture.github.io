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
      <section className="surface-panel animate-rise rounded-3xl p-7 md:p-10">
        <p className="mb-4 text-sm font-semibold tracking-[0.12em] text-sky-700">IOS ENGINEER PORTFOLIO</p>
        <h1 className="hero-title mb-5 font-semibold text-slate-950">
          문제를 구조화하고
          <br className="hidden md:block" />
          실행 가능한 해법으로 연결합니다.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
          채용 담당자와 실무 개발자가 빠르게 스캔할 수 있도록 프로젝트의 배경, 역할, 해결 과정, 결과를 중심으로 정리한
          개발 블로그입니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects/"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            프로젝트 보기
          </Link>
          <Link
            href="/about/"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
          >
            About
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Featured Projects</h2>
          <Link href="/projects/" className="text-sm font-semibold text-sky-700 underline-offset-4 hover:underline">
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
          <Link href="/til/" className="text-sm font-semibold text-sky-700 underline-offset-4 hover:underline">
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
