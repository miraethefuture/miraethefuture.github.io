'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

interface SearchDocument {
  slug: string;
  type: 'project' | 'til';
  title: string;
  summary: string;
  tags: string[];
  date: string;
  href: string;
}

interface SearchClientProps {
  documents: SearchDocument[];
}

export function SearchClient({ documents }: SearchClientProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return documents.slice(0, 20);
    }

    return documents
      .filter((doc) => {
        const haystack = `${doc.title} ${doc.summary} ${doc.tags.join(' ')}`.toLowerCase();
        return haystack.includes(keyword);
      })
      .slice(0, 30);
  }, [documents, query]);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-[0.1em] text-sky-700">SEARCH</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">검색</h1>
        <p className="text-slate-700">키워드로 프로젝트와 TIL 기록을 빠르게 찾습니다.</p>
      </header>

      <div className="surface-panel rounded-2xl p-4">
        <label className="sr-only" htmlFor="search-input">
          검색어
        </label>
        <input
          id="search-input"
          type="search"
          placeholder="예: SwiftUI, 로그인, AVFoundation"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-sky-200 transition focus:ring"
        />
      </div>

      <div className="space-y-3">
        {results.map((doc) => (
          <Link
            key={`${doc.type}-${doc.slug}`}
            href={doc.href}
            className="block rounded-2xl border border-slate-900/10 bg-white p-5 shadow-subtle transition hover:-translate-y-0.5 hover:shadow-medium"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-slate-100 px-2 py-0.5">{doc.type.toUpperCase()}</span>
              <span>{doc.date}</span>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-slate-950">{doc.title}</h2>
            <p className="text-sm text-slate-700">{doc.summary}</p>
          </Link>
        ))}

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600">검색 결과가 없습니다.</div>
        ) : null}
      </div>
    </section>
  );
}
