import Head from "next/head";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Globe, Trophy, LineChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Head>
        <title>Thomas Aubert | Expert en Événementiel Sportif & Médaillé Mondial</title>
        <meta name="description" content="Portfolio de Thomas Aubert, expert en événementiel sportif international et ancien sportif de haut niveau." />
      </Head>

      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-12 bg-accent"></span>
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Exigence & Rationalité</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-extrabold leading-[0.9] tracking-tighter uppercase">
                Ne rien laisser <br/>
                <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">au hasard.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-light">
                Ancien médaillé mondial de tir à l'arc devenu stratège des événements olympiques. 
                J'agis dans l'ombre pour faire avancer les organisations avec précision, loin de la politique et au plus près de l'efficacité.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button size="lg" className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300">
                  Découvrir mon expertise
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative aspect-[3/4] w-full max-w-md ml-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent z-10"></div>
                <Image 
                  src="/IMG_0744.JPG" 
                  alt="Thomas Aubert" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                  priority
                />
                {/* Decorative borders */}
                <div className="absolute -inset-4 border border-white/10 z-0 hidden md:block"></div>
                <div className="absolute -inset-8 border border-white/5 z-0 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto / Values Section */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-square w-full">
              <Image 
                src="/DA6_1669.jpg" 
                alt="Thomas Aubert et Chris Wells" 
                fill 
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute bottom-0 left-0 bg-background/90 p-4 border-t border-r border-white/10 max-w-sm">
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">Avec Chris Wells, Directeur de la Communication World Archery, lors du Congrès de Gwangju 2025.</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-10 uppercase tracking-tighter leading-none">
                Le pragmatisme <br/>
                <span className="text-accent">de l'action.</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed mb-12">
                <p>
                  Rien n'est simple. Faire le centimètre de plus, ou la flèche de plus même quand l'envie n'y est plus est ce qui fait la différence sur le long terme. La patience, la détermination et la concentration sont mes atouts.
                </p>
                <p>
                  Mon combat est de faire bouger les choses dans l'ombre, sans tirer la couverture à moi, pour contourner les lenteurs administratives et transformer la complexité en efficacité au bénéfice du collectif.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-widest mb-6">Valeurs</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Précision</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Loyauté & Honnêteté</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Concentration</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Rationalité</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-widest mb-6">Forces</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span> Prise de décision rapide</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span> Analyse complexe</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span> Gestion budgétaire</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span> Trilingue (FR, EN, ES)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Gallery */}
      <section className="py-20 border-t border-white/5 bg-background">
        <div className="container">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 uppercase tracking-tighter">
                  Une expertise <span className="text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)] opacity-80">transférable.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  De la gestion des Jeux Olympiques à la refonte du calendrier international, je prouve au quotidien que mes compétences de sportif de haut niveau sont un moteur de transformation puissant pour les organisations.
                </p>
             </div>
             <div className="relative aspect-[16/9] md:aspect-[21/9] w-full border border-white/10">
                <Image 
                  src="/R3X_0332.jpg" 
                  alt="Remise de t-shirt" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 right-0 bg-background/90 p-4 border-t border-l border-white/10 max-w-sm">
                  <p className="text-xs font-medium text-muted-foreground text-right leading-relaxed">Dernier événement en tant que Head of Events & Marketing (Gwangju 2025) : remise d'un t-shirt signé au juge international Graham Potts pour sa retraite.</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Expertise Section - Minimalist Cards */}
      <section className="py-32 bg-secondary/30 border-y border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold uppercase tracking-tighter leading-none max-w-2xl">
              Domaines <br/> d'Expertise
            </h2>
            <p className="text-muted-foreground max-w-sm text-right">
              De la conception stratégique à la livraison opérationnelle d'événements sportifs mondiaux.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group bg-background border border-white/5 p-12 hover:border-accent/50 transition-colors duration-500">
              <Globe className="h-12 w-12 text-accent mb-12 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold mb-6 uppercase tracking-wider">Événementiel Sportif</h3>
              <p className="text-muted-foreground text-sm mb-12 font-light leading-relaxed min-h-[100px]">
                Gestion globale des compétitions internationales. Coordination d'équipes, logistique, procédures de candidature et supervision de la livraison.
              </p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="border-b border-white/5 pb-3">Délégué technique JO Paris 2024</li>
                <li className="border-b border-white/5 pb-3">Championnats du Monde</li>
                <li className="pb-3">Cérémonies protocolaires</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group bg-background border border-white/5 p-12 hover:border-accent/50 transition-colors duration-500">
              <LineChart className="h-12 w-12 text-accent mb-12 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold mb-6 uppercase tracking-wider">Marketing & Sponsoring</h3>
              <p className="text-muted-foreground text-sm mb-12 font-light leading-relaxed min-h-[100px]">
                Développement de programmes de parrainage, stratégie de merchandising et protection des droits de propriété intellectuelle.
              </p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="border-b border-white/5 pb-3">Revenus multipliés par 14 (10 ans)</li>
                <li className="border-b border-white/5 pb-3">Gestion des contractants</li>
                <li className="pb-3">Stratégie de marque globale</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group bg-background border border-white/5 p-12 hover:border-accent/50 transition-colors duration-500">
              <Trophy className="h-12 w-12 text-accent mb-12 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold mb-6 uppercase tracking-wider">Gouvernance & Formation</h3>
              <p className="text-muted-foreground text-sm mb-12 font-light leading-relaxed min-h-[100px]">
                Interprétation et évolution des règlements sportifs. Transmission du savoir-faire aux nouvelles générations de dirigeants.
              </p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="border-b border-white/5 pb-3">Nouveau classement mondial</li>
                <li className="border-b border-white/5 pb-3">Formation délégués techniques</li>
                <li className="pb-3">Restructuration du calendrier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Huge CTA Section */}
      <section id="contact" className="py-40 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-accent/5"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-heading font-extrabold mb-10 uppercase tracking-tighter">
            Prêt pour le <br/>
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.accent)]">prochain défi.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto font-light">
            15 années d'expérience dans le sport de haut niveau et l'événementiel international à disposition de projets ambitieux.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-white rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300">
              Discutons de votre projet
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-foreground hover:bg-white/5 rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300" asChild>
              <Link href="https://www.linkedin.com/in/thomas-aubert-archery/" target="_blank">
                LinkedIn <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}