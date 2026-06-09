export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: 'compétition' | 'matériel' | 'passion';
  excerpt: string;
  content: string;
  ogImage: string;
}

export const articles: Article[] = [
  {
    id: '2',
    slug: 'istanbul-55e-atterrissage-premiere-decouverte',
    title: 'Istanbul : 55e atterrissage, première découverte',
    date: '2026-06-08',
    category: 'compétition',
    excerpt: 'Retour à la compétition internationale après 10 ans d\'absence, à la Conquest Cup d\'Istanbul. Entre performance technique et découverte culturelle d\'une ville traversée 55 fois sans jamais vraiment la voir.',
    ogImage: '/SYG6569.jpg',
    content: `En atterrissant à Istanbul, l'application que j'utilise pour mes voyages depuis plusieurs années m'indique que je viens d'atterrir dans cette ville pour la 55e fois. Et je réalise à ce moment-là que, malgré l'histoire millénaire d'Istanbul, je ne connais concrètement que ses trois aéroports.

Je me fixe donc un objectif : associer cette compétition à une découverte culturelle, pour ne pas manquer — une fois de plus — l'opportunité de transformer chaque étape en progrès.

## La compétition

Mais d'abord, la compétition. Je me suis inscrit et suis venu avec un plan et une stratégie clairs : respecter le travail technique en cours, et le mettre à l'épreuve sous pression, et accepter de se détacher du résultat et d'une éventuelle performance à produire. L'objectif des qualifications était donc respecter au maximum le placement et le maintien de l'action sous le clicker. Même si le résultat pourrait laisser penser le contraire, je réussis cet exercice 69 fois sur 72. Le vent ajoutait une contrainte frustrante : arrière, mais oscillant de droite à gauche. Cela rendait la lecture instable, et ça se payait sur le cumul : beaucoup de flèches pas loin, peu de 10. Dans ce contexte, la 26e place n'est pas illogique—et surtout, elle signe un retour à la compétition internationale, encourageant pour la suite.

![Photo de compétition](/WhatsApp_Image_2026-06-04_at_17.02.54_1_.jpeg)

En élimination, le même vent nous attendait, légèrement plus fort, et venant plus souvent de la droite. Plus facile à lire, mais les rafales rendaient aussi les erreurs plus accessibles. Je mets un peu de temps à entrer dans le premier match : le rythme cardiaque s'emballe sur le premier duel, je perds de vue l'objectif technique sur quelques flèches, mais je remporte ce 1/24e face à Andrei Belici (MDA) : 7-1. Le programme m'offre ensuite trois volées d'échauffement supplémentaires avant le 1/16e. J'en profite pour me recentrer : je ramène mon attention à l'action et au point clé que je travaille—le maintien de l'action à travers le passage du clicker.

Je ne suis pas favori contre le Coréen Ji Yechan, mais j'arrive à tenir cette exigence. Le match est serré sur chaque set, chaque flèche. Je parviens à l'emporter sur la flèche de barrage (9-8), en faisant preuve de patience en visée : j'attends une légère accalmie de la rafale de vent tout en maintenant un maximum d'activité pour éviter ce relâchement qui coûte. Le centimètre de plus, ce n'est pas une promesse—c'est un comportement répété jusqu'à ce que ça devienne naturel.

La bataille menée sur ce match, et l'intensité requise pour que la technique ne se dégrade pas, ont eu leur impact sur la suite. Je ne réussis pas à être à 100 % : je me prends les pieds dans le tapis sur certaines contre-visées, mais aussi au moment où l'action doit rester continue au passage du clicker. Je perds contre Nicholas d'Amour : 7-1. Je suis un peu déçu de ne pas avoir eu les armes suffisantes pour me battre plus longtemps, mais sans regret : sur l'ensemble de la compétition, l'objectif de départ a été majoritairement respecté. Je sors de cette compétition convaincu d'être sur la bonne direction, mais aussi avec l'envie de travailler encore plus pour aller de plus en plus loin sur les compétitions.

## Découverte culturelle

Tranquille d'esprit après cette compétition menée comme je le souhaitais, je profite de la journée du dimanche (n'étant pas finaliste) pour partir dès le matin. Ayant dû faire un choix, et n'ayant que cette journée de libre avant mon retour en Suisse, je choisis de me concentrer sur les monuments les plus connus de la partie européenne de l'ancienne Constantinople. Je me construis une trame simple, que je peux réaliser à pied une fois sur place. Je parcours ainsi Hagia Sophia, le Palais de Topkapi avec ses vues magistrales sur le détroit du Bosphore, la Mosquée Bleue, et la Citerne de Théodose.

<!-- GALLERY:START -->
![Citerne de Théodose](/IMG_1698.jpeg)
![Vue du Bosphore depuis le palais de Topkapi](/IMG_1679.jpg)
![Salle du trône du palais de Topkapi](/IMG_1659.jpeg)
<!-- GALLERY:END -->

Sans oublier, le théâtre de cette compétition, le complexe de l'Okçular Vakfı, un ensemble dédié au tir à l'arc hors du commun en plein cœur d'une mégapole de plus de 15 millions d'habitants. Avec un terrain extérieur de 32 cibles, où se déroule la compétition. Mais également une chambre d'hôte, une salle de sport, un institut de recherche, un musée du tir à l'arc, plusieurs salles d'entraînement et même une mosquée. Le tout mêlant tir à l'arc moderne et traditionnel.

## Un retour après 10 ans

Enfin, il y a un contexte qui donne tout son sens à ce retour. 10 ans : cela faisait 10 ans que je n'avais pas tiré de compétition internationale en extérieur—depuis le Championnat d'Europe de Nottingham. Je suis venu à la Conquest Cup pour tester. Tester si j'ai toujours ce qu'il faut en moi. Tester aussi la crédibilité d'un nouveau projet, dont les contours se dessinent peu à peu. Et enfin tester concrètement le travail réalisé depuis ma "reprise", fin mars 2026. Je suivais la Conquest Cup déjà à l'époque où je travaillais à World Archery depuis leur volonté d'être un événement de classement mondial. Peu d'événements se lancent avec cette ambition, hors des circuits continentaux ou internationaux, mais la Conquest Cup (tout comme la Veronica's Cup en Slovénie, par exemple) a réussi à s'installer dans la durée avec une identité forte, une stratégie cohérente, et une volonté d'efficacité.

**Teşekkür ederim Okçular Vakfı, Teşekkür ederim Türkiye.**`
  }
];