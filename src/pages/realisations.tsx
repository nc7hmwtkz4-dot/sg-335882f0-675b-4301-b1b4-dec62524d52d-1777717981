import Head from "next/head";
import Image from "next/image";
import { ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Realisations() {
  const projects = [
    {
      title: "Arc Club de Nîmes - Espace Partenaires",
      url: "https://www.arcclubnimes-partenaires.fr",
      image: "/Screenshot_2026-06-06_at_10.54.42.png",
      description: "L'Arc Club de Nîmes souhaitait moderniser la présentation de son offre partenaires. Cette vitrine expose les valeurs du club et ses atouts clés, permettant à tout chef d'entreprise de comprendre rapidement l'opportunité — tout en ayant la possibilité d'approfondir les sujets qui l'intéressent vraiment.",
      tags: ["Next.js", "Design System", "Responsive"]
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-24">
      <Head>
        <title>Mes Réalisations | Thomas Aubert</title>
        <meta name="description" content="Découvrez quelques-unes de mes réalisations web : sites vitrines modernes, plateformes sur mesure, conçus avec rigueur et efficacité." />
      </Head>

      <Navigation />

      {/* Header Section */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-white/50"></span>
            <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Portfolio</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold uppercase tracking-tighter mb-8 leading-[0.9]">
            Mes <br />
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">Réalisations.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            Des projets conçus avec précision. Sites vitrines modernes, plateformes intuitives et solutions digitales sur mesure, développés avec rigueur et attention au détail.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32">
        <div className="container">
          <div className="flex items-center gap-4 mb-16 pb-4 border-b border-white/10">
            <Code2 className="w-8 h-8 text-foreground" />
            <h2 className="text-3xl font-heading font-extrabold uppercase tracking-widest">Projets Sélectionnés</h2>
          </div>

          <div className="space-y-32">
            {projects.map((project, idx) => (
              <div key={idx} className="group">
                {/* Project Image */}
                <div className="relative aspect-[16/9] w-full border border-white/10 overflow-hidden mb-8">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <h3 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col justify-end">
                    <Button 
                      asChild 
                      className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none h-14 px-8 text-xs font-bold uppercase tracking-widest transition-all duration-300 w-full"
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visiter le site
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Divider */}
                {idx < projects.length - 1 && (
                  <div className="w-full h-[1px] bg-white/5 mt-32"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/5 bg-secondary/10">
        <div className="container text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter mb-6">
            Un projet en <span className="text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)] opacity-80">tête ?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
            De la conception à la mise en ligne, je construis des solutions digitales qui allient esthétique et performance.
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-white rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300"
            asChild
          >
            <a href="mailto:contact@taubert.pro">
              Discutons de votre projet
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}