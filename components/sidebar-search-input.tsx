'use client';

import { startTransition, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function buildSearchHref(query: string) {
  const trimmed = query.trim();

  if (!trimmed) {
    return '/search/';
  }

  const params = new URLSearchParams({ q: trimmed });
  return `/search/?${params.toString()}`;
}

export function SidebarSearchInput() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') ?? '';
  const [value, setValue] = useState(currentQuery);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  function updateSearch(nextValue: string) {
    const href = buildSearchHref(nextValue);

    startTransition(() => {
      if (pathname.startsWith('/search')) {
        router.replace(href, { scroll: false });
        return;
      }

      router.push(href, { scroll: false });
    });
  }

  return (
    <div className="docs-search-link">
      <label className="sr-only" htmlFor="sidebar-search-input">
        검색어
      </label>
      <div className="docs-search-field">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="docs-search-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="sidebar-search-input"
          type="search"
          placeholder=""
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value;
            setValue(nextValue);
            updateSearch(nextValue);
          }}
          className="docs-search-input"
        />
      </div>
    </div>
  );
}
