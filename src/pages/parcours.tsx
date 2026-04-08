import Head from "next/head";
import Link from "next/link";
import { Briefcase, GraduationCap, Languages, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Parcours() {
  const experiences = [
    {
      period: "Août 2019 — Présent",
      role: "Head of Events & Marketing",
      company: "World Archery Federation, Lausanne (SUI)",
      highlights: [
        "Délégué technique aux JO Paris 2024",
        "Gestion globale des événements mondiaux et coordination d'équipe",
        "Revenus de sponsoring multipliés par 14 en 10 ans",
        "Refonte des règlements : nouveau classement mondial, augmentation des primes, structuration du calendrier",
        "Création d'une formation pour les délégués techniques",
        "Responsabilité budgétaire et protection de la propriété intellectuelle",
      ]
    },
    {
      period: "Nov. 2021 — Présent",
      role: "Technical Committee Chair for Archery",
      company: "FISU, Lausanne (SUI)",
      highlights: [
        "Suivi de l'organisation des événements de tir à l'arc au sein de la Fédération Internationale du Sport Universitaire",
      ]
    },
    {
      period: "Jan. 2015 — Juil. 2019",
      role: "Marketing Services Manager",
      company: "World Archery Federation",
      highlights: [
        "Gestion du programme de partenariat avec l'industrie du tir à l'arc",
        "Coordination des services marketing avec les agences externes",
        "Gestion des règlements et interprétations",
      ]
    },
    {
      period: "Août 2012 — Déc. 2015",
      role: "Assistant Secrétaire Général",
      company: "World Archery Federation",
      highlights: [
        "Contrôle qualité de l'information pour le Congrès et le Comité Exécutif",
        "Assistance au Directeur du Développement et de l'Éducation",
      ]
    },
    {
      period: "Août 2010 — Jan. 2011",
      role: "Stagiaire Coordinateur du Développement",
      company: "World Archery Federation",
      highlights: [
        "Gestion des programmes de la Solidarité Olympique",
        "Organisation de camps d'entraînement et séminaires",
      ]
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-24">
      <Head>
        <title>Parcours Professionnel | Thomas Aubert</title>
        <meta name="description" content="Découvrez le parcours de Thomas Aubert, de stagiaire à Head of Events & Marketing à la World Archery Federation." />
      </Head>

      {/* Header Section */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-white/50"></span>
            <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Curriculum Vitae</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold uppercase tracking-tighter mb-8 leading-[0.9]">
            Parcours <br />
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">Professionnel.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            Une ascension bâtie sur l'exigence. 15 années d'expertise stratégique, opérationnelle et financière au cœur de l'écosystème sportif international.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32">
        <div className="container">
          <div className="flex items-center gap-4 mb-16 pb-4 border-b border-white/10">
            <Briefcase className="w-8 h-8 text-foreground" />
            <h2 className="text-3xl font-heading font-extrabold uppercase tracking-widest">Expérience</h2>
          </div>

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <div key={idx} className="grid md:grid-cols-12 gap-8 group">
                <div className="md:col-span-3">
                  <span className="font-heading text-lg font-bold text-white/40 group-hover:text-foreground transition-colors">{exp.period}</span>
                </div>
                <div className="md:col-span-9 relative">
                  <div className="hidden md:block absolute left-[-3rem] top-2 w-3 h-3 bg-white/10 rounded-full group-hover:bg-foreground transition-colors border border-background"></div>
                  <div className="hidden md:block absolute left-[-2.7rem] top-5 bottom-[-4rem] w-[1px] bg-white/5 group-last:bg-transparent"></div>
                  
                  <h3 className="text-2xl font-heading font-bold uppercase tracking-wider mb-2">{exp.role}</h3>
                  <p className="text-accent font-medium uppercase tracking-widest text-sm mb-6">{exp.company}</p>
                  
                  <ul className="space-y-3">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground font-light">
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Education Grid */}
      <section className="py-32 bg-secondary/30 border-t border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Education */}
            <div className="bg-background border border-white/5 p-10">
              <GraduationCap className="w-10 h-10 text-white/50 mb-8" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-widest mb-8">Formation</h3>
              <div className="space-y-8">
                <div>
                  <p className="font-bold uppercase tracking-wider text-sm mb-1">Master en Management</p>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">ESCEM Tours-Poitiers (2012)</p>
                  <p className="text-muted-foreground text-sm font-light">Spécialisation Supply Chain Management et Achats.</p>
                </div>
                <div className="w-full h-[1px] bg-white/5"></div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-sm mb-1">BTS Commerce International</p>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Lycée Maurice Ravel, Paris (2007)</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-background border border-white/5 p-10">
              <ShieldCheck className="w-10 h-10 text-white/50 mb-8" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-widest mb-8">Compétences</h3>
              <ul className="space-y-4 text-sm text-muted-foreground font-light">
                <li className="border-b border-white/5 pb-4">Analyse de situations complexes</li>
                <li className="border-b border-white/5 pb-4">Prise de décision rapide et stratégique</li>
                <li className="border-b border-white/5 pb-4">Gestion et optimisation budgétaire</li>
                <li className="border-b border-white/5 pb-4">Négociation de sponsoring & partenariats</li>
                <li className="pb-2">Direction de projets internationaux (Asana, Suite Office, Keynote)</li>
              </ul>
            </div>

            {/* Languages */}
            <div className="bg-background border border-white/5 p-10">
              <Languages className="w-10 h-10 text-white/50 mb-8" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-widest mb-8">Langues</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold uppercase tracking-wider text-sm">Français</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Langue maternelle</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold uppercase tracking-wider text-sm">Anglais</span>
                  <span className="text-xs text-accent uppercase tracking-widest">Bilingue</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold uppercase tracking-wider text-sm">Espagnol</span>
                  <span className="text-xs text-accent uppercase tracking-widest">Bilingue</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-bold uppercase tracking-wider text-sm">Italien</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Notions</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}