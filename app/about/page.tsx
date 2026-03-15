import { DocsShell } from '@/components/docs-shell';

export const metadata = {
  title: 'About | Mirae Dev Blog',
};

export default function AboutPage() {
  return (
    <DocsShell
      pathname="/about/"
      toc={[
        { id: 'about-mirae', title: 'About Mirae', level: 2 },
        { id: 'focus-areas', title: 'Focus areas', level: 2 },
        { id: 'working-style', title: 'Working style', level: 2 },
      ]}
    >
      <section className="docs-page space-y-10">
        <header className="docs-page-header" id="about-mirae">
          <p className="docs-eyebrow">About</p>
          <h1 className="docs-page-title">Mirae</h1>
          <p className="docs-page-description">
            iOS 개발 과정에서 마주친 문제를 구조적으로 분석하고, 재현 가능한 해결 방식으로 정리하는 것을 중요하게
            생각합니다. 이 블로그는 그 과정과 결과를 문서 형태로 축적하는 공간입니다.
          </p>
        </header>

        <div className="docs-grid-two">
          <article className="surface-panel pt-6" id="focus-areas">
            <h2 className="mb-3 text-xl font-semibold text-slate-950">관심 분야</h2>
            <ul className="space-y-2 text-sm leading-7 text-slate-700">
              <li>UIKit/SwiftUI 기반 앱 아키텍처 개선</li>
              <li>UI 성능 최적화와 반응성 개선</li>
              <li>문제 재현과 원인 추적 중심의 트러블슈팅</li>
            </ul>
          </article>

          <article className="surface-panel pt-6" id="working-style">
            <h2 className="mb-3 text-xl font-semibold text-slate-950">작업 방식</h2>
            <ul className="space-y-2 text-sm leading-7 text-slate-700">
              <li>문제 상황을 먼저 정량/정성으로 분해</li>
              <li>원인 가설 수립 후 실험으로 검증</li>
              <li>재사용 가능한 패턴으로 문서화</li>
            </ul>
          </article>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </DocsShell>
  );
}
