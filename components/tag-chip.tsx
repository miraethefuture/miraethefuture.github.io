import Link from 'next/link';

interface TagChipProps {
  tag: string;
  count?: number;
}

export function TagChip({ tag, count }: TagChipProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}/`}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
    >
      <span>{tag}</span>
      {typeof count === 'number' ? <span className="text-xs text-slate-500">{count}</span> : null}
    </Link>
  );
}
