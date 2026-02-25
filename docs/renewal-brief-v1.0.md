# 개발 블로그 기술·디자인 리뉴얼 브리프 v1.0

## 문서 정보
- 프로젝트명: 개발 블로그 리뉴얼
- 작성일: 2026-02-25
- 작성자: Mirae
- 버전: v1.0
- 상태: <b>Draft</b> / <s>Final</s>

## 1. 리뉴얼 목표 (Top 3)

| 우선순위 | 목표 | 측정 기준 (KPI) | 기준일 |
|---|---|---|---|
| 1 | 채용 관점 포트폴리오 전달력 강화 | 대표 프로젝트 글을 최소 3개 업로드하고, 각 글에 `문제/내 역할/해결 방법/결과/기술 스택` 5가지를 빠짐없이 작성한다. | 2026-09-30 |
| 2 | 채용 전환 동선 강화 | `Home/About/Post` 페이지에 `이력서/LinkedIn/GitHub/Contact` 버튼을 모두 노출하고, 사용자 테스트(5명)에서 4명 이상이 10초 안에 연락 경로를 찾는다. | 2026-08-31 |
| 3 | 개발 블로그 브랜드 정체성 확립 | 블로그 소개 문구 1개, 톤 키워드 3개, 디자인 기준(타이포/컬러/핵심 컴포넌트)을 확정하고 `Home/About/Post`에 동일하게 적용한다. | 2026-08-31 |

## 2. 타깃 사용자
- 1순위 사용자: 채용 담당자, 테크 리드, 실무 면접관
- 2순위 사용자: 동료 iOS 개발자, 기술 커뮤니티 구성원
- 이 사용자가 사이트에 들어오는 이유: 지원자의 문제 해결 방식, 프로젝트 기여도, 기술 스택 적합도를 짧은 시간 안에 확인하기 위해
- 사용자가 보고 나가야 하는 핵심 액션: 대표 프로젝트 1~2개를 읽고 `이력서/LinkedIn/GitHub/Contact` 중 하나로 이동

## 3. 유지할 것 / 바꿀 것 / 제외할 것

### 유지할 것 (Must Keep)
- 기존 자산(이미지/영상) 파일 유지 및 재사용
- Markdown 기반 포스팅 유지 (`.md` 파일 작성 후 배포)

### 바꿀 것 (Must Change)
- 기술 스택 전환 (Jekyll -> Next.js + React + TypeScript)
- 정보구조 재설계 (홈 중심 포트폴리오 동선)
- 시각 디자인 재설계 (타이포/컬러/간격/컴포넌트)
- 채용 전환 요소 강화 (`Resume/LinkedIn/GitHub/Contact` CTA)
- 성능/접근성 기준 상향 (모바일 포함)

## 4. 정보 구조(IA)와 필수 페이지

### 사이트맵 초안
- 홈 (`/`)
- 프로젝트 아카이브 (`/projects`)
- 포스트 상세 (`/projects/[slug]`)
- TIL 아카이브 (`/til`)
- TIL 상세 (`/til/[slug]`)
- 태그/기술스택 필터 (`/tags/[tag]`)
- 검색 (`/search`)
- About (`/about`)

### 페이지별 요구사항
| 페이지 | 목적 | 핵심 콘텐츠 | 주요 CTA | 필수 컴포넌트 |
|---|---|---|---|---|
| Home | 채용 담당자가 10초 안에 지원자 강점을 파악 | 한 줄 소개, 대표 프로젝트 2~3개, 최신 글 요약 | `이력서`, `LinkedIn`, `GitHub`, `Contact` | Hero, Featured Project Cards, Quick Intro, Global Nav |
| Project Archive | 프로젝트를 빠르게 비교/스캔 | 프로젝트 카드 목록, 요약, 사용 기술, 결과 | `프로젝트 상세 보기`, `GitHub` | Filter Chips, Sort, Project Cards, Pagination or Load More |
| Post Detail | 문제 해결 능력과 의사결정 과정 전달 | 문제/역할/해결/결과/기술스택, 이미지, 관련 링크 | `GitHub`, `다음 프로젝트`, `Contact` | TOC, Sticky CTA, Related Posts |
| TIL Archive | 학습 지속성과 기술 관심사 전달 | 튜토리얼/실험/트러블슈팅 글 목록 | `글 읽기`, `태그 보기` | List View, Tag Badges, Date/Reading Time |
| TIL Detail | 학습 기록의 깊이와 기술적 사고 전달 | 배운 점, 실험 코드, 참고 링크, 회고 | `관련 글 이동`, `Contact` | TOC, Code Block, Related Posts |
| Search | 원하는 주제를 빠르게 찾기 | 키워드 결과, 제목/요약/태그 | `해당 글 이동` | Search Input, Result List, Empty State |
| About | 개발자 배경과 협업 스타일 전달 | 소개, 경력/관심사, 작업 방식 | `이력서`, `Contact` | Profile Section, Timeline, CTA Group |

## 5. 디자인 방향 (Visual Direction)

### 톤 키워드 (3개)
- 신뢰감
- 선명함
- 문제해결 중심

### 디자인 원칙
- 10초 안에 핵심 전달: 첫 화면에서 어떤 개발자인지, 무엇을 잘하는지 즉시 파악 가능해야 한다.
- 증거 중심 구성: 감성 문구보다 프로젝트의 문제, 역할, 결과를 우선 노출한다.
- 일관성 있는 브랜드 경험: 페이지가 달라도 타이포, 컬러, 컴포넌트 규칙을 동일하게 유지한다.

### 시각 시스템 가이드
- Typography: `Pretendard Variable`(본문/UI), `JetBrains Mono`(코드/기술 메타), 헤드라인은 본문 대비 1.25~1.5배 스케일.
- Color system: 라이트 베이스 중심. `--bg #F6F7F9`, `--surface #FFFFFF`, `--text-primary #0F172A`, `--text-secondary #475569`, `--accent #0EA5E9`, `--accent-strong #0369A1`.
- Spacing: 8px 기반 스케일(8/12/16/24/32/48). 카드 내부 여백 20~24px, 섹션 간격 48~72px.
- Radius / Shadow: 카드 radius 14px, 버튼 radius 10px. 그림자는 `subtle -> medium` 2단계만 사용해 깊이 과다를 방지.
- Icon / Illustration: 라인 아이콘 중심(1.5px stroke), 장식용 일러스트는 최소화하고 프로젝트 스크린샷을 우선 사용.
- Motion: 페이지 진입 200~300ms fade+slide, 카드 hover는 120~180ms로 제한, `prefers-reduced-motion` 지원.

### 참고 레퍼런스
- 참고 사이트 1: Apple Developer 문서 구조 (정보 밀도와 스캔성 참고)
- 참고 사이트 2: Stripe Docs/Blog 레이아웃 (타이포 대비와 카드 정보 구조 참고)
- 피하고 싶은 스타일: 과도한 네온/그라데이션, 템플릿 느낌의 과장된 애니메이션, 텍스트 대비가 낮은 미니멀 UI

## 6. 기술 기준 (Next.js 리뉴얼 기준)
- 프레임워크: Next.js (App Router)
- 언어: TypeScript
- 콘텐츠 포맷: MDX (기본), 기존 `.md` 포스트도 호환 유지
- 스타일링 방식: Tailwind CSS + CSS Variables(디자인 토큰) + `clsx`/`tailwind-merge`
- 검색 방식: Pagefind 기반 인덱스 검색(빌드 시 인덱스 생성)
- 분석 도구: Google Analytics 4 (GA4) + Google Search Console
- 컴포넌트 설계: 공통 UI 컴포넌트 + MDX 전용 컴포넌트(`components/mdx`) 분리
- 콘텐츠 스키마: Frontmatter 공통 필수(`title`, `date`, `summary`, `tags`, `type`) + `type=project` 필수(`featured`, `links`) + `type=til` 선택(`featured`, `links`)
- 배포 기준: GitHub Pages 정적 배포(SSG/export) + 이미지 정적 최적화 + URL slug 규칙 고정

## 7. 완료 기준 (Definition of Done)
- [ ] 기존 URL 유지(리다이렉트 없이 동일 경로 제공)
- [ ] 모바일(최소 375px)부터 레이아웃 깨짐 없음
- [ ] 접근성 기본 요건(alt, heading 순서, 키보드 포커스) 통과
- [ ] Core Web Vitals/Lighthouse 목표 달성
- [ ] 주요 브라우저(Chrome/Safari) 검증 완료
- [ ] 검색/카테고리/포스트 이동 플로우 동작 확인
- [ ] 배포 후 404/깨진 링크 점검 완료

## 8. 일정 초안
| 단계 | 기간 | 산출물 |
|---|---|---|
| 브리프 확정 | 2026-02-25 ~ 2026-02-28 | 리뉴얼 브리프 v1.0 확정(목표, IA, 디자인/기술 기준) |
| IA/와이어프레임 | 2026-03-02 ~ 2026-03-08 | Home, Project Archive, Post Detail, About 저해상도 와이어프레임 |
| 디자인 시스템 | 2026-03-09 ~ 2026-03-15 | 컬러/타이포/간격 토큰, 핵심 컴포넌트(카드/버튼/태그/내비) 시안 |
| 개발 구현 | 2026-03-16 ~ 2026-04-05 | Next.js 기본 구조, MDX 파이프라인, 페이지 구현, 검색/분석 연동 |
| QA/배포 | 2026-04-06 ~ 2026-04-12 | 크로스브라우저/성능/접근성 점검, 기존 URL 검증, GitHub Pages 배포 |

## 9. 리스크 및 의존성
- 리스크 1: 기존 URL이 배포 결과와 불일치하면 SEO/외부 링크 유입 손실이 발생할 수 있음.
- 리스크 2: 과거 포스트의 frontmatter 불일치로 목록/필터/검색 결과가 불완전할 수 있음.
- 리스크 3: 이미지/영상 자산 용량이 커서 빌드 시간 증가 및 초기 로딩 성능 저하가 발생할 수 있음.
- 리스크 4: 디자인 결정 지연 시 개발 단계에서 재작업 비용이 커질 수 있음.
- 의존성 1: 대표 프로젝트 3개의 콘텐츠 원고와 링크(GitHub/데모/회고) 준비가 필요함.
- 의존성 2: GA4 속성 생성 및 측정 ID 발급이 선행되어야 함.
- 의존성 3: 최종 타이포/컬러/컴포넌트 가이드 승인 후 UI 구현을 고정할 수 있음.
- 의존성 4: 기존 포스트 slug와 실제 배포 경로 일치 검증표 작성이 필요함.

## 10. 의사결정 로그
| 날짜 | 결정 내용 | 이유 | 담당 |
|---|---|---|---|
| 2026-02-25 | 리뉴얼 목표를 `포트폴리오 전달력`, `채용 전환 동선`, `블로그 브랜드 정체성`으로 확정 | 채용 담당자/면접관 관점의 정보 전달을 우선하기 위해 | Mirae |
| 2026-02-25 | 콘텐츠 포맷을 MDX 기본으로 채택하고 기존 `.md` 호환 유지 결정 | 재사용 컴포넌트를 활용하면서 기존 작성 워크플로우를 유지하기 위해 | Mirae |
| 2026-02-25 | 기술 스택을 Next.js(App Router) + TypeScript + Tailwind CSS로 확정 | 정적 사이트 성능과 유지보수 확장성을 동시에 확보하기 위해 | Mirae |
| 2026-02-25 | 분석 도구를 GA4 + Google Search Console로 확정 | 비용 제약 없이 채용 유입/행동 데이터를 추적하기 위해 | Mirae |
