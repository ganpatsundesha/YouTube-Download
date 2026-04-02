export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTime?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
}
