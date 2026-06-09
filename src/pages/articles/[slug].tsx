import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug, isArticlesEnabled, formatArticleDate } from '@/lib/articles';
import { Article } from '@/data/articles';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  article: Article | null;
  enabled: boolean;
}

export default function ArticlePage({ article, enabled }: ArticlePageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled || !article) {
      router.replace('/404');
    }
  }, [enabled, article, router]);

  if (!enabled || !article) {
    return null;
  }

  const categoryLabels = {
    competition: 'Compétition',
    materiel: 'Matériel',
    passion: 'Passion'
  };

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-12 first:mt-0">
            {paragraph.replace('# ', '')}
          </h1>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-10">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-semibold text-foreground mb-3 mt-8">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('![')) {
        const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, alt, src] = match;
          return (
            <div key={index} className="my-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                />
              </div>
              {alt && (
                <p className="text-sm text-muted-foreground text-center mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          );
        }
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-6 text-foreground/90">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-lg leading-relaxed text-foreground/90 mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      <SEO
        title={article.seo.metaTitle || `${article.title} - Thomas Aubert`}
        description={article.seo.metaDescription || article.summary}
        canonical={`/articles/${article.slug}`}
        ogImage={article.seo.ogImage || article.coverImage}
        ogType="article"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/articles">
              <Button variant="ghost" className="mb-8 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
              </Button>
            </Link>

            <article>
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="secondary">
                    {categoryLabels[article.category]}
                  </Badge>
                  <time className="text-sm text-muted-foreground">
                    {formatArticleDate(article.date)}
                  </time>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {article.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  {article.summary}
                </p>

                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg mb-10">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </header>

              <div className="prose prose-lg max-w-none">
                {renderContent(article.content)}
              </div>
            </article>

            <div className="mt-16 pt-8 border-t border-border">
              <Link href="/articles">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voir tous les articles
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const enabled = isArticlesEnabled();
  const articles = enabled ? getAllArticles() : [];

  const paths = articles.map((article) => ({
    params: { slug: article.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const enabled = isArticlesEnabled();
  const slug = params?.slug as string;
  const article = enabled ? getArticleBySlug(slug) : null;

  return {
    props: {
      article,
      enabled
    }
  };
};