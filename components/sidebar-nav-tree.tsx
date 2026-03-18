'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { DocsNavSection } from '@/lib/docs';
import { cn } from '@/lib/utils';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(href);
}

export function SidebarNavTree({ pathname, sections }: { pathname: string; sections: DocsNavSection[] }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((section) => [section.title, section.title === 'Projects'])),
  );

  function toggleSection(title: string) {
    setOpenSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  }

  return (
    <nav aria-label="Documentation" className="docs-tree">
      {sections.map((section) => {
        const isOpen = openSections[section.title] ?? true;

        return (
          <section key={section.title} className="docs-tree-section">
            <div className="docs-tree-heading-row">
              <div className="docs-tree-heading-group">
                <button
                  type="button"
                  className={cn('docs-tree-heading-button', section.href && isActive(pathname, section.href) && 'docs-tree-heading-active')}
                  onClick={() => toggleSection(section.title)}
                  aria-expanded={isOpen}
                  aria-controls={`docs-tree-items-${section.title}`}
                >
                  <span className="docs-tree-heading">{section.title}</span>
                </button>

                <button
                  type="button"
                  className={cn('docs-tree-toggle', isOpen && 'docs-tree-toggle-open')}
                  onClick={() => toggleSection(section.title)}
                  aria-expanded={isOpen}
                  aria-label={`${section.title} ${isOpen ? '접기' : '펼치기'}`}
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 8 4 4 4-4" />
                  </svg>
                </button>
              </div>
            </div>

            {isOpen ? (
              <div className="docs-tree-items" id={`docs-tree-items-${section.title}`}>
                {section.items.map((item) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <Link key={item.href} href={item.href} className={cn('docs-tree-item', active && 'docs-tree-item-active')}>
                      <span className="docs-tree-item-title">{item.title}</span>
                      {item.meta ? <span className="docs-tree-item-meta">{item.meta}</span> : null}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </section>
        );
      })}
    </nav>
  );
}
