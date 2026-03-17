import { SearchClient } from '@/app/search/search-client';
import { DocsShell } from '@/components/docs-shell';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Search | Mirae',
};

export default async function SearchPage() {
  const posts = await getAllPosts();

  const documents = posts.map((post) => ({
    ...post,
    href: post.type === 'project' ? `/projects/${post.slug}/` : `/til/${post.slug}/`,
  }));

  return (
    <DocsShell pathname="/search/" toc={[{ id: 'search-documents', title: 'Search documents', level: 2 }]}>
      <SearchClient documents={documents} />
    </DocsShell>
  );
}
