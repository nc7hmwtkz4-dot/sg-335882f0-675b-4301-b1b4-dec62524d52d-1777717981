import { cn } from "@/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";
import { SEOElements } from "@/components/SEO";

export default function Document() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Thomas Aubert",
    "jobTitle": "Expert Événementiel Sportif International",
    "description": "Médaillé mondial de tir à l'arc et expert en gestion d'événements sportifs internationaux",
    "url": "https://taubert.pro",
    "sameAs": [
      "https://www.linkedin.com/in/thomas-aubert-archery/"
    ],
    "knowsLanguage": ["French", "English", "Spanish"],
    "award": [
      "Vice-Champion du Monde de Tir à l'Arc par équipe (Ulsan 2009)",
      "Champion d'Europe des Clubs (Arc Club de Nîmes 2010)"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "École de Commerce - Master en Management"
    }
  };

  return (
    <Html lang="fr">
      <Head>
        <SEOElements />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7K99Z9WZ70"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7K99Z9WZ70');
            `,
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/*
          CRITICAL: DO NOT REMOVE THIS SCRIPT
          The Softgen AI monitoring script is essential for core app functionality.
          The application will not function without it.
        */}
        <script
          src="https://cdn.softgen.ai/script.js"
          async
          data-softgen-monitoring="true"
        />
      </Head>
      <body
        className={cn(
          "min-h-screen w-full scroll-smooth bg-background text-foreground antialiased"
        )}
      >
        <Main />
        <NextScript />

        {/* Visual Editor Script */}
        {process.env.NODE_ENV === "development" && (
          <script
            src="https://cdn.softgen.dev/visual-editor.min.js"
            async
            data-softgen-visual-editor="true"
          />
        )}
      </body>
    </Html>
  );
}
