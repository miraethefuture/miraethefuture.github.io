import Link from 'next/link';
import type { ReactNode } from 'react';

import { SidebarSearchInput } from '@/components/sidebar-search-input';
import type { DocsNavSection, TocItem } from '@/lib/docs';
import { getDocsNavigation } from '@/lib/docs';
import { cn } from '@/lib/utils';

interface DocsShellProps {
  children: ReactNode;
  pathname: string;
  toc?: TocItem[];
}

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(href);
}

function DocsSidebar({ pathname, sections }: { pathname: string; sections: DocsNavSection[] }) {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-inner">
        <Link href="/" className="docs-brand">
          <div>
            <p className="docs-brand-name">Mirae</p>
          </div>
        </Link>

        <SidebarSearchInput />

        <nav aria-label="Documentation" className="docs-tree">
          {sections.map((section) => (
            <section key={section.title} className="docs-tree-section">
              <div className="docs-tree-heading-row">
                {section.href ? (
                  <Link
                    href={section.href}
                    className={cn('docs-tree-heading', isActive(pathname, section.href) && 'docs-tree-heading-active')}
                  >
                    {section.title}
                  </Link>
                ) : (
                  <p className="docs-tree-heading">{section.title}</p>
                )}
              </div>

              <div className="docs-tree-items">
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
            </section>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function DocsToc({ toc }: { toc: TocItem[] }) {
  return (
    <section className="docs-aside-card">
      <p className="docs-aside-label">On this page</p>
      <div className="docs-toc">
        {toc.length > 0 ? (
          toc.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={cn('docs-toc-link', item.level === 3 && 'docs-toc-link-nested')}>
              {item.title}
            </a>
          ))
        ) : (
          <p className="text-sm leading-6 text-slate-500">이 페이지에는 별도 목차가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

export async function DocsShell({ children, pathname, toc = [] }: DocsShellProps) {
  const sections = await getDocsNavigation();

  return (
    <div className="docs-layout">
      <DocsSidebar pathname={pathname} sections={sections} />
      <div className="docs-main-column">
        <div className="docs-main-surface">{children}</div>
      </div>
      <aside className="docs-right-rail">
        <div className="docs-right-rail-inner">
          <DocsToc toc={toc} />
        </div>
      </aside>
    </div>
  );
}
