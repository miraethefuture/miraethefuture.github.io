export type PostType = 'project' | 'til';

export interface PostLinks {
  github?: string;
  demo?: string;
  note?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  type: PostType;
  featured: boolean;
  links: PostLinks;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  body: string;
}
