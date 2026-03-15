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
    <section className="docs-page space-y-6" id="search-documents">
      <header className="docs-page-header">
        <p className="docs-eyebrow">Search</p>
        <h1 className="docs-page-title">검색</h1>
        <p className="docs-page-description">키워드로 프로젝트와 TIL 기록을 빠르게 찾습니다.</p>
      </header>

      <div className="surface-panel pt-4">
        <label className="sr-only" htmlFor="search-input">
          검색어
        </label>
        <input
          id="search-input"
          type="search"
          placeholder="예: SwiftUI, 로그인, AVFoundation"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-base text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-900"
        />
      </div>

      <div className="docs-list">
        {results.map((doc) => (
          <Link
            key={`${doc.type}-${doc.slug}`}
            href={doc.href}
            className="block border-t border-slate-900/10 py-5 first:border-t-0"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-800">{doc.type.toUpperCase()}</span>
              <span>{doc.date}</span>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-slate-950">{doc.title}</h2>
            <p className="text-sm leading-7 text-slate-600">{doc.summary}</p>
          </Link>
        ))}

        {results.length === 0 ? (
          <div className="border-t border-dashed border-slate-300 py-8 text-sm text-slate-600">검색 결과가 없습니다.</div>
        ) : null}
      </div>
    </section>
  );
}
