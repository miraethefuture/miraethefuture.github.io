import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostDetail } from '@/components/post-detail';
import { getPostBySlug, getPostsByType } from '@/lib/posts';

interface TilDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPostsByType('til');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: TilDetailPageProps): Promise<Metadata> {
  const post = await getPostBySlug('til', params.slug);

  if (!post) {
    return { title: 'TIL Not Found' };
  }

  return {
    title: `${post.title} | TIL`,
    description: post.summary,
  };
}

export default async function TilDetailPage({ params }: TilDetailPageProps) {
  const post = await getPostBySlug('til', params.slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} sectionLabel="TIL DETAIL" backHref="/til/" backLabel="TIL 목록으로" />;
}
