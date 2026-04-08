import Head from "next/head";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Globe, Trophy, LineChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Thomas Aubert | Expert en Événementiel Sportif & Médaillé Mondial</title>
        <meta name="description" content="Portfolio de Thomas Aubert, expert en événementiel sportif international et ancien sportif de haut niveau." />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent">
              <Target className="mr-2 h-4 w-4" />
              <span>Précision. Efficacité. Rationalité.</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight">
              Architecte de <span className="text-accent">performances</span> internationales.
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Ancien médaillé mondial de tir à l'arc devenu stratège des événements olympiques. 
              Je conjugue la discipline du sportif de haut niveau à l'exigence de la gouvernance sportive internationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 rounded-none h-14 px-8 text-base">
                Découvrir mon expertise
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-none h-14 px-8 text-base">
                Me contacter
              </Button>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-[4/5] bg-secondary/10">
            {/* Placeholder for a portrait photo */}
            <div className="absolute inset-0 bg-primary-foreground/5 mix-blend-overlay"></div>
            <Image 
              src="/IMG_0744.JPG" 
              alt="Thomas Aubert" 
              fill 
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* Values / Brand Section */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6 text-primary">L'exigence du terrain, appliquée à la stratégie.</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Rien n'est simple. Faire le centimètre de plus, ou la flèche de plus même quand l'envie n'y est plus est ce qui fait la différence sur le long terme. J'applique cette même patience, détermination et concentration acquises sur les pas de tir mondiaux à la gestion des événements sportifs d'envergure.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-primary mb-2">Forces</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Prise de décision rapide</li>
                    <li>Analyse de situations complexes</li>
                    <li>Gestion budgétaire rigoureuse</li>
                    <li>Trilingue (FRA, ENG, ESP)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">Valeurs</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Loyauté & Honnêteté</li>
                    <li>Droiture</li>
                    <li>Précision & Concentration</li>
                    <li>Efficacité & Rationalité</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative aspect-video bg-muted">
               <Image 
                src="/IMG_5604.JPG" 
                alt="Thomas Aubert en compétition" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 text-primary">Expertise Professionnelle</h2>
            <p className="text-muted-foreground">De la conception stratégique à la livraison opérationnelle d'événements sportifs mondiaux.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 border border-border">
              <Globe className="h-10 w-10 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-3 text-primary">Événementiel Sportif</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Gestion globale des compétitions internationales. Coordination d'équipes, logistique, procédures de candidature et supervision de la livraison selon les plus hauts standards.
              </p>
              <ul className="text-sm space-y-2 text-primary font-medium">
                <li>• Délégué technique JO Paris 2024</li>
                <li>• Championnats du Monde</li>
                <li>• Cérémonies protocolaires</li>
              </ul>
            </div>

            <div className="bg-background p-8 border border-border">
              <LineChart className="h-10 w-10 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-3 text-primary">Marketing & Sponsoring</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Développement de programmes de parrainage, stratégie de merchandising et protection des droits de propriété intellectuelle.
              </p>
              <ul className="text-sm space-y-2 text-primary font-medium">
                <li>• Revenus multipliés par 14 (10 ans)</li>
                <li>• Gestion des contractants</li>
                <li>• Stratégie de marque globale</li>
              </ul>
            </div>

            <div className="bg-background p-8 border border-border">
              <Trophy className="h-10 w-10 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-3 text-primary">Gouvernance & Formation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Interprétation et évolution des règlements sportifs. Transmission du savoir-faire aux nouvelles générations de dirigeants.
              </p>
              <ul className="text-sm space-y-2 text-primary font-medium">
                <li>• Nouveau classement mondial</li>
                <li>• Formation délégués techniques</li>
                <li>• Restructuration du calendrier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6">Prêt à relever un nouveau défi.</h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Aujourd'hui, je mets mes 15 années d'expérience dans le sport de haut niveau et l'événementiel international à disposition de nouveaux projets ambitieux.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 rounded-none h-14 px-8 text-base">
              Discutons de votre projet
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-none h-14 px-8 text-base" asChild>
              <Link href="https://www.linkedin.com/in/thomas-aubert-archery/" target="_blank">
                Mon profil LinkedIn <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}