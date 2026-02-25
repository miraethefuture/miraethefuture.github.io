import { SearchClient } from '@/app/search/search-client';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Search | Mirae Dev Blog',
};

export default async function SearchPage() {
  const posts = await getAllPosts();

  const documents = posts.map((post) => ({
    ...post,
    href: post.type === 'project' ? `/projects/${post.slug}/` : `/til/${post.slug}/`,
  }));

  return <SearchClient documents={documents} />;
}
