import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, GraduationCap, Languages, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Parcours() {
  const experiences = [
    {
      period: "Août 2012 — Présent",
      role: "Head of Events & Marketing",
      company: "World Archery Federation, Lausanne (SUI)",
      highlights: [
        "Événements : Direction stratégique et opérationnelle des événements mondiaux, gestion du calendrier, procédures de candidature, budgétisation et supervision des règles d'accréditation.",
        "Délégué technique aux JO Paris 2024 : nomination et assistance des délégués techniques, supervision de la documentation officielle et des manuels d'événements.",
        "Marketing & Sponsoring : revenus de sponsoring multipliés par 14 en 10 ans, gestion du merchandising (stocks, ventes), octroi de licences et protection de la propriété intellectuelle.",
        "Refonte structurelle : création d'un nouveau classement mondial, augmentation des primes et élaboration de stratégies approuvées par le Bureau Exécutif.",
        "Ressources Humaines & Formation : officier de liaison des comités (entraîneurs, tir en campagne, 3D), création d'une formation pour les délégués techniques.",
      ],
      certificate: "/Certificat_Travail_WA.pdf"
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
      period: "Déc. 2015 — Oct. 2021",
      role: "Substitute Technical Committee Chair - Archery",
      company: "FISU, Lausanne (SUI)",
      highlights: [
        "Membre suppléant du comité technique pour le tir à l'arc",
        "Support à l'organisation des compétitions universitaires mondiales",
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
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h3 className="text-2xl font-heading font-bold uppercase tracking-wider">{exp.role}</h3>
                    {exp.certificate && (
                      <Button variant="outline" size="sm" asChild className="border-white/20 text-foreground hover:bg-white/5 rounded-none text-xs uppercase tracking-widest font-bold shrink-0">
                        <a href={exp.certificate} target="_blank" rel="noopener noreferrer">Voir le certificat</a>
                      </Button>
                    )}
                  </div>
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

      {/* Leadership Gallery Section */}
      <section className="py-32 border-t border-white/5 relative bg-secondary/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter mb-4">
              Au cœur de <span className="text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)] opacity-80">l'organisation.</span>
            </h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              Direction d'équipes internationales, gestion de congrès mondiaux et coordination avec les comités d'organisation locaux. Une décennie à faire avancer le sport dans l'ombre.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Main large photo */}
            <div className="md:col-span-8 space-y-4">
              <div className="relative aspect-[16/9] w-full border border-white/10 overflow-hidden group">
                <Image src="/X17_6847.jpg" alt="Staff World Archery et Comité d'organisation Mexico 2017" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Championnats du Monde Mexico 2017 &mdash; Staff World Archery et Comité d'Organisation</p>
            </div>

            {/* Smaller side photos */}
            <div className="md:col-span-4 space-y-8">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full border border-white/10 overflow-hidden group">
                  <Image src="/A16_7589.jpg" alt="Championnat du Monde indoor Ankara 2016" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">Championnat du Monde indoor Ankara 2016<br/><span className="text-accent">Avec Fernando Suarez et Andrea Vasquez</span></p>
              </div>

              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full border border-white/10 overflow-hidden group">
                  <Image src="/X17_3731.jpg" alt="WA staff au congrès de Mexico 2017" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Congrès de Mexico 2017 &mdash; Staff World Archery</p>
              </div>
            </div>
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
                  <p className="font-bold uppercase tracking-wider text-sm mb-1">Certificats de Participation</p>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">JO & Paralympiques de Paris 2024</p>
                  <p className="text-muted-foreground text-sm font-light mb-4">Reconnaissance officielle du Comité International Olympique et Paralympique pour la contribution au succès des Jeux.</p>
                  <Button variant="outline" size="sm" asChild className="border-white/20 text-foreground hover:bg-white/5 rounded-none text-xs uppercase tracking-widest font-bold h-9">
                    <a href="/Certificats_Paris_2024.pdf" target="_blank" rel="noopener noreferrer">Voir les certificats</a>
                  </Button>
                </div>
                <div className="w-full h-[1px] bg-white/5"></div>
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
                <div className="w-full h-[1px] bg-white/5"></div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-sm mb-1">Sustainability Literacy Test (TASK)</p>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Sulitest (Juin 2024)</p>
                  <p className="text-muted-foreground text-sm font-light">Score Global : 63,7/100 — Évaluation des connaissances en développement durable et responsabilité sociétale.</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-background border border-white/5 p-10">
              <ShieldCheck className="w-10 h-10 text-white/50 mb-8" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-widest mb-8">Compétences</h3>
              <ul className="space-y-4 text-sm text-muted-foreground font-light">
                <li className="border-b border-white/5 pb-4">Constitution de dossiers solides et hiérarchisation</li>
                <li className="border-b border-white/5 pb-4">Analyse pertinente et prise de décision rapide</li>
                <li className="border-b border-white/5 pb-4">Grande autonomie et sens de l'organisation</li>
                <li className="border-b border-white/5 pb-4">Négociation de contrats de marketing & sponsoring</li>
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