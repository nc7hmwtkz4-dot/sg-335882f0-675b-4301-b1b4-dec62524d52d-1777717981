import { articles, type Article } from '@/data/articles';

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function isArticlesEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ARTICLES === 'true';
}

export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}