import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl border-t border-slate-900/10 py-10 text-center">
      <p className="mb-2 text-sm font-semibold tracking-[0.12em] text-slate-900">NOT FOUND</p>
      <h1 className="mb-3 text-2xl font-semibold text-slate-950">페이지를 찾을 수 없습니다.</h1>
      <p className="mb-6 text-sm text-slate-600">요청한 경로가 변경되었거나 존재하지 않습니다.</p>
      <Link href="/" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
        홈으로 이동
      </Link>
    </section>
  );
}
