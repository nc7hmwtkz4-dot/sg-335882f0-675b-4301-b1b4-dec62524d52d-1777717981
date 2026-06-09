export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  coverImage: string;
  content: string;
  category: 'competition' | 'materiel' | 'passion';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'exemple-article',
    title: 'Article d\'exemple',
    date: '2026-06-09',
    summary: 'Un article d\'exemple pour tester la structure de données et l\'affichage.',
    coverImage: '/IMG_1550.jpg',
    content: `
# Premier article

Ceci est un article d'exemple pour valider la structure de données.

## Section de texte

Le contenu complet de l'article sera formaté en Markdown et pourra inclure :
- Des listes
- Des images
- Des vidéos
- Du texte enrichi

![Image d'exemple](/IMG_1550.jpg)

Le système est prêt à accueillir vos contenus.
    `.trim(),
    category: 'passion',
    seo: {
      metaTitle: 'Article d\'exemple - Thomas Aubert',
      metaDescription: 'Un article d\'exemple pour tester la structure de données.',
      ogImage: '/IMG_1550.jpg'
    }
  }
];