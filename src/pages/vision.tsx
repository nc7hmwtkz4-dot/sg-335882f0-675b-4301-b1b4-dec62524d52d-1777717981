import Head from "next/head";
import { Quote, Target, Crosshair, Anchor, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Vision() {
  const valeurs = [
    "Précision", "Loyauté", "Honnêteté", "Droiture",
    "Concentration", "Rapidité", "Efficacité", "Rationalité"
  ];

  return (
    <div className="bg-background min-h-screen pt-24">
      <Head>
        <title>Vision & Valeurs | Thomas Aubert</title>
        <meta name="description" content="Plateforme de marque personnelle, valeurs et philosophie d'action de Thomas Aubert." />
      </Head>

      <Navigation />

      {/* Header */}
      <section className="py-20 border-b border-white/5 text-center">
        <div className="container max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-white/50"></span>
            <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Plateforme de Marque</span>
            <span className="h-[1px] w-8 bg-white/50"></span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold uppercase tracking-tighter mb-8 leading-[0.9]">
            La Philosophie <br />
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">de l'action.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Un manifeste fondé sur 15 années d'exigence absolue. Des pas de tirs internationaux aux salles de conseils, les principes restent les mêmes.
          </p>
        </div>
      </section>

      {/* Mission / Combat */}
      <section className="py-32 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden lg:block"></div>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="lg:pr-10">
              <Quote className="w-12 h-12 text-white/10 mb-8" fill="currentColor" />
              <h2 className="text-3xl font-heading font-extrabold uppercase tracking-tighter mb-6">Mon Combat</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                Faire bouger les choses dans l'ombre. Sans chercher à prendre le devant de la scène ni tirer la couverture à moi, mon objectif est d'œuvrer au bénéfice de la majorité.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ce qui m'anime, c'est de contourner les lenteurs administratives, de défier l'aspect politisé des organisations et de transformer la complexité en efficacité pure.
              </p>
            </div>
            
            <div className="lg:pl-10 pt-10 lg:pt-0">
              <Target className="w-12 h-12 text-accent mb-8" strokeWidth={1} />
              <h2 className="text-3xl font-heading font-extrabold uppercase tracking-tighter mb-6">La Leçon</h2>
              <div className="bg-secondary/30 border-l-4 border-accent p-8">
                <p className="text-2xl font-serif italic leading-relaxed text-foreground/90">
                  "Rien n'est simple. Faire le centimètre de plus, ou la flèche de plus même quand l'envie n'y est plus est ce qui fera la différence sur le long terme."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-foreground text-background">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter mb-6">Les fondations.</h2>
            <p className="text-background/70 max-w-2xl mx-auto text-lg">Les 8 valeurs cardinales qui dictent mes choix et mon éthique de travail.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {valeurs.map((valeur, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto border border-background/20 flex items-center justify-center mb-6 group-hover:bg-background group-hover:text-foreground transition-all duration-500">
                  <span className="font-heading font-bold text-xl">{idx + 1}</span>
                </div>
                <h3 className="font-heading font-bold text-xl uppercase tracking-widest">{valeur}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aspirations & Lexique */}
      <section className="py-32 border-t border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-heading font-extrabold uppercase tracking-tighter mb-10 flex items-center gap-4">
                <Crosshair className="text-accent" /> Vision & Avenir
              </h2>
              <div className="space-y-8 text-muted-foreground font-light leading-relaxed">
                <p>
                  Je veux prouver que mes compétences acquises dans le sport de haut niveau et la direction internationale sont réelles, tangibles, et peuvent être mises à profit de manière explosive dans de nouveaux environnements.
                </p>
                <p>
                  L'avenir tend vers <strong>l'indépendance et l'entrepreneuriat</strong>. Créer ma propre structure, ne plus dépendre de carcans hiérarchiques lourds, et appliquer mes principes de rationalité au service de projets qui font sens.
                </p>
                <p>
                  À terme, ma réussite se définira par l'équilibre : gérer une structure à taille humaine dans le sud de la France, financer le club qui m'a vu grandir (l'Arc Club de Nîmes), et retrouver le chemin de la compétition sportive par passion pure.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-secondary/20 border border-white/5 p-10 h-full">
                <h2 className="text-xl font-heading font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-white/50" /> Mon Lexique
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["Performance", "Exigence", "Ombre", "Collectif", "Pragmatisme", "Stratégie", "Précision", "Loyauté", "Indépendance", "Rationalité", "Centimètre", "Flèche", "Impact"].map((mot, i) => (
                    <span key={i} className="px-4 py-2 border border-white/10 text-sm font-medium uppercase tracking-wider hover:bg-white/5 transition-colors cursor-default">
                      {mot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}