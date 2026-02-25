import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@/components/ga/google-analytics';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import './globals.css';

export const metadata: Metadata = {
  title: 'Mirae Dev Blog',
  description: '채용 관점 포트폴리오 전달을 위한 iOS 개발 블로그',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics />
        <div className="site-bg" aria-hidden="true" />
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
