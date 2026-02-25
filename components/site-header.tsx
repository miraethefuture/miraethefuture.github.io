import Link from 'next/link';

import { cn } from '@/lib/utils';

const links = [
  { href: '/projects/', label: 'Projects' },
  { href: '/til/', label: 'TIL' },
  { href: '/about/', label: 'About' },
  { href: '/search/', label: 'Search' },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn('sticky top-0 z-30 border-b border-slate-900/5 bg-white/80 backdrop-blur-xl', className)}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-subtle transition-transform duration-200 group-hover:rotate-6">
            M
          </span>
          <span className="text-sm font-semibold tracking-[0.06em] text-slate-900 md:text-base">MIRAE DEVLOG</span>
        </Link>

        <nav aria-label="Global" className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
