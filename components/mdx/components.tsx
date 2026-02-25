import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 {...props} className={cn('scroll-mt-28', props.className)} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 {...props} className={cn('scroll-mt-28', props.className)} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => {
    const href = props.href ?? '';

    if (href.startsWith('/')) {
      return <Link href={href} className={cn('text-sky-700 underline underline-offset-4', props.className)}>{props.children}</Link>;
    }

    if (href.startsWith('#')) {
      return <a {...props} className={cn('text-sky-700 underline underline-offset-4', props.className)} />;
    }

    return (
      <a
        {...props}
        className={cn('text-sky-700 underline underline-offset-4', props.className)}
        target="_blank"
        rel="noreferrer"
      />
    );
  },
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ''} className={cn('my-8 w-full rounded-xl border border-slate-900/10', props.className)} />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre {...props} className={cn('my-6 overflow-x-auto rounded-xl bg-slate-950 p-4 text-slate-100', props.className)} />
  ),
};
