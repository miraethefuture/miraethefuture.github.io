import { DocsShell } from '@/components/docs-shell';
import { TagChip } from '@/components/tag-chip';
import { getTags } from '@/lib/posts';

export const metadata = {
  title: 'Tags | Mirae',
};

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <DocsShell pathname="/tags/" toc={[{ id: 'tags-overview', title: 'Tags overview', level: 2 }]}>
      <section className="docs-page space-y-8" id="tags-overview">
        <header className="docs-page-header">
          <p className="docs-eyebrow">Tags</p>
          <h1 className="docs-page-title">기술 태그</h1>
          <p className="docs-page-description">주제별로 문서를 모아볼 수 있도록 태그 아카이브를 제공합니다.</p>
        </header>

        <div className="flex flex-wrap gap-2.5">
          {tags.map((item) => (
            <TagChip key={item.tag} tag={item.tag} count={item.count} />
          ))}
        </div>
      </section>
    </DocsShell>
  );
}
