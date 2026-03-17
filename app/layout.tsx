import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@/components/ga/google-analytics';
import { SiteFooter } from '@/components/site-footer';

import './globals.css';

export const metadata: Metadata = {
  title: 'Mirae',
  description: '채용 관점 포트폴리오 전달을 위한 iOS 개발 블로그',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics />
        <div className="site-bg" aria-hidden="true" />
        <main className="mx-auto w-full max-w-[1720px] px-4 py-6 md:px-6 md:py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
