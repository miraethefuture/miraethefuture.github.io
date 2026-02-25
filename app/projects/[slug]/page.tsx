import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostDetail } from '@/components/post-detail';
import { getPostBySlug, getPostsByType } from '@/lib/posts';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getPostsByType('project');
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const post = await getPostBySlug('project', params.slug);

  if (!post) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${post.title} | Projects`,
    description: post.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const post = await getPostBySlug('project', params.slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} sectionLabel="PROJECT DETAIL" backHref="/projects/" backLabel="프로젝트 목록으로" />;
}
