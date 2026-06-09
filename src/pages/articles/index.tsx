import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAllArticles, isArticlesEnabled, formatArticleDate } from '@/lib/articles';
import { Article } from '@/data/articles';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArticlesPageProps {
  articles: Article[];
  enabled: boolean;
}

export default function ArticlesPage({ articles, enabled }: ArticlesPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) {
      router.replace('/404');
    }
  }, [enabled, router]);

  if (!enabled) {
    return null;
  }

  const categoryLabels = {
    competition: 'Compétition',
    materiel: 'Matériel',
    passion: 'Passion'
  };

  return (
    <>
      <SEO
        title="Articles - Thomas Aubert"
        description="Retrouvez mes articles sur mes compétitions, tests de matériel et passions."
        canonical="/articles"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Articles</h1>
            <p className="text-lg text-muted-foreground">
              Résultats de compétitions, tests de matériel et réflexions sur mes passions.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.ogImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[article.category]}
                      </Badge>
                      <time className="text-xs text-muted-foreground">
                        {formatArticleDate(article.date)}
                      </time>
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-primary font-medium group-hover:text-accent transition-colors">
                      Lire la suite →
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Aucun article pour le moment. Revenez bientôt !
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const enabled = isArticlesEnabled();
  const articles = enabled ? getAllArticles() : [];

  return {
    props: {
      articles,
      enabled
    }
  };
};