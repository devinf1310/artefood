/* ============================================================
   CONFIG — AFL SNACK
   ------------------------------------------------------------
   👉 SEUL FICHIER À ÉDITER pour les infos, les prix et les médias.
   Les pages (accueil, carte, contact) se remplissent toutes seules
   à partir de ce fichier.

   Médias : déposer les fichiers dans snack-afl/media/ et écrire
   ici le nom EXACT du fichier (espaces et accents acceptés).
   ============================================================ */

const MEDIA = "media/";
const media = f => f ? MEDIA + encodeURIComponent(f) : "";

/* ------------------------------------------------------------
   INFOS DU RESTAURANT
   Un lien laissé vide ("") masque automatiquement le bouton.
   ------------------------------------------------------------ */
const SITE = {
  nom:        "AFL Snack",
  slogan:     "Le goût qui fait la différence",
  tel:        "07 43 74 52 59",
  adresse:    "26 rue Condorcet",
  ville:      "13016 Marseille",
  email:      "snack-afl@artefood.fr",

  /* Photo (.jpg/.png/.webp) OU vidéo (.mp4) de couverture de l'accueil.
     Tant que le fichier n'est pas déposé, un fond de secours s'affiche. */
  couverture: media("couverture.jpg"),
  /* Logo affiché dans l'en-tête et le pied de page (facultatif). */
  logo:       media("logo.png"),

  ouverture:  "7j/7 · 11h – 23h",
  horaires: [
    ["Lundi",    "11:00 – 23:00"],
    ["Mardi",    "11:00 – 23:00"],
    ["Mercredi", "11:00 – 23:00"],
    ["Jeudi",    "11:00 – 23:00"],
    ["Vendredi", "11:00 – 23:00"],
    ["Samedi",   "11:00 – 23:00"],
    ["Dimanche", "11:00 – 23:00"],
  ],
  livraison: {
    midi:     "11h30 – 14h30",
    soir:     "18h30 – 22h30",
    gratuite: "20 €",          // livraison gratuite à partir de…
  },

  facebook:   "",
  instagram:  "",
  avisGoogle: "",
  uberEats:   "",
};

/* ------------------------------------------------------------
   LA CARTE
   Chaque rubrique contient des groupes :
     style "cards" → grandes fiches (produits signature)
     style "list"  → liste de prix compacte
   Prix : "seul" et/ou "menu" (ou "prix" pour un prix unique).
   nouveau:true → pastille « Nouveau ».
   img (facultatif) : photo de la rubrique sur l'accueil.
   ------------------------------------------------------------ */
const VIANDES = ["Kebab", "Escalope", "Tenders", "Merguez", "Viande hachée", "Cordon bleu", "Nuggets", "Poulet mariné"];

const SUPPLEMENTS = [
  { nom: "Bacon / Cheddar / Fromagère / Chèvre", prix: "1,00" },
  { nom: "Oignons crispy",                        prix: "0,50" },
];

const CARTE = [
  {
    id: "burgers", titre: "Nos Burgers", icone: "burger", img: "",
    accroche: "Classiques, signatures et gourmands",
    note: "Menu = Burger + Frites + Boisson 33cl",
    groupes: [
      { titre: "Signatures", style: "cards", items: [
        { nom: "Géant Double Cheese", desc: "Double steak, Cheddar",            seul: "6,50", menu: "8,00" },
        { nom: "Royal",               desc: "Steak, Bacon, Cheddar",            seul: "5,50", menu: "7,50" },
        { nom: "La Croustille",       desc: "Cheese + Géant",                   seul: "6,50", menu: "8,00" },
        { nom: "Crispy",              desc: "Tenders, Cheddar",                 seul: "7,00", menu: "8,50" },
        { nom: "French",              desc: "Steak, Cheddar, Bacon, Boursin",   seul: "6,50", menu: "8,00" },
        { nom: "Gold",                desc: "Steak, Œuf, Bacon, Cheddar",       seul: "6,50", menu: "8,50" },
        { nom: "Chèvre Miel",         desc: "Steak, Chèvre, Miel",              seul: "7,00", menu: "8,50" },
        { nom: "Géant Cheese",        desc: "Steak, Cheddar",                   seul: "5,00", menu: "6,50" },
        { nom: "Country",             desc: "Steak, Galette PDT, Œuf, Cheddar", seul: "7,00", menu: "8,50" },
      ]},
      { titre: "Classiques", style: "list", items: [
        { nom: "Classic Cheese", seul: "4,00", menu: "6,00" },
        { nom: "Double Cheese",  seul: "6,00", menu: "7,50" },
        { nom: "Triple Cheese",  seul: "7,00", menu: "8,50" },
        { nom: "Fish",           seul: "5,50", menu: "7,00" },
        { nom: "Chicken",        seul: "5,50", menu: "7,00" },
      ]},
    ],
    supplements: SUPPLEMENTS,
  },
  {
    id: "duos", titre: "Nos Duos", icone: "duo", img: "",
    accroche: "Deux burgers, un seul menu",
    note: "Cheese + Burger au choix + Frites + Boisson 33cl",
    groupes: [
      { titre: "", style: "cards", items: [
        { nom: "Duo 1", desc: "Cheese + Big Mac",        menu: "9,00"  },
        { nom: "Duo 2", desc: "Cheese + Chicken",        menu: "9,00"  },
        { nom: "Duo 3", desc: "Cheese + Gold",           menu: "10,50" },
        { nom: "Duo 4", desc: "Cheese + Géant",          menu: "9,00"  },
        { nom: "Duo 5", desc: "Cheese + Triple Cheese",  menu: "10,50" },
        { nom: "Duo 6", desc: "Cheese + Royal",          menu: "10,50" },
        { nom: "Duo 7", desc: "Cheese + Double Géant",   menu: "10,00" },
        { nom: "Duo 8", desc: "Cheese + Crousty",        menu: "10,50" },
        { nom: "Duo 9", desc: "Cheese + Cheese",         menu: "8,00"  },
      ]},
    ],
  },
  {
    id: "sandwichs", titre: "Nos Sandwichs", icone: "sandwich", img: "",
    accroche: "Spéciaux, maxi et simples",
    note: "Menu = Sandwich + Frites + Boisson 33cl",
    groupes: [
      { titre: "Spéciaux", style: "cards", items: [
        { nom: "Suprême",    desc: "Steak, Boursin, Œuf, Cheddar",           seul: "7,00", menu: "8,00" },
        { nom: "Curry",      desc: "Poulet curry, Fromage",                  seul: "7,00", menu: "8,00" },
        { nom: "Paprika",    desc: "Poulet paprika, Fromage",                seul: "7,00", menu: "8,00" },
        { nom: "Kefta",      desc: "Viande hachée assaisonnée, Fromage",     seul: "7,00", menu: "8,00", nouveau: true },
        { nom: "Spicy",      desc: "Poulet épicé, Olives, Fromage",          seul: "7,00", menu: "8,00", nouveau: true },
        { nom: "Mix",        desc: "½ Curry, ½ Paprika, Fromage",            seul: "7,00", menu: "8,00", nouveau: true },
        { nom: "Boursin",    desc: "Viande au choix",                        seul: "8,50", menu: "9,50" },
        { nom: "3 Fromages", desc: "Viande au choix",                        seul: "7,50", menu: "9,00" },
        { nom: "Délice",     desc: "Escalope, Crème champignon, Cheddar",    seul: "7,00", menu: "8,00" },
      ]},
      { titre: "Maxi", style: "cards", items: [
        { nom: "Extrême",       desc: "Steak, Escalope, Bacon, Boursin",   seul: "9,00", menu: "10,50" },
        { nom: "Maxi C. Bleu",  desc: "Steak, Cordon bleu, Fromage",       seul: "7,50", menu: "9,00"  },
        { nom: "Maxi Paprika",  desc: "Steak, Poulet paprika, Cheddar",    seul: "7,50", menu: "9,00"  },
        { nom: "Maxi Kebab",    desc: "Steak, Kebab, Fromage",             seul: "7,50", menu: "9,00"  },
        { nom: "Maxi Tenders",  desc: "Kebab, Tenders, Fromage",           seul: "7,50", menu: "9,00"  },
        { nom: "Maxi Curry",    desc: "Steak, Poulet curry, Fromage",      seul: "7,50", menu: "9,00"  },
      ]},
      { titre: "Simples", style: "list", items: [
        { nom: "Kebab",            seul: "6,00", menu: "7,50" },
        { nom: "Steak",            seul: "5,00", menu: "6,50" },
        { nom: "Steak œuf",        seul: "5,50", menu: "7,00" },
        { nom: "Merguez",          seul: "5,00", menu: "6,50" },
        { nom: "Escalope de poulet", seul: "5,50", menu: "7,00" },
        { nom: "Tenders",          seul: "5,50", menu: "7,00" },
        { nom: "Cordon bleu",      seul: "5,50", menu: "7,00" },
      ]},
    ],
    supplements: SUPPLEMENTS,
  },
  {
    id: "tacos", titre: "Tacos & Bowl", icone: "tacos", img: "",
    accroche: "1, 2 ou 3 viandes au choix",
    note: "Menu = Plat + Frites + Boisson 33cl",
    viandes: VIANDES,
    groupes: [
      { titre: "Tacos", style: "list", items: [
        { nom: "Tacos 1 viande",  seul: "7,00",  menu: "8,50"  },
        { nom: "Tacos 2 viandes", seul: "9,00",  menu: "10,50" },
        { nom: "Tacos 3 viandes", seul: "10,00", menu: "11,50" },
      ]},
      { titre: "Bowl", style: "list", items: [
        { nom: "Bowl 1 viande",  seul: "7,00",  menu: "8,50"  },
        { nom: "Bowl 2 viandes", seul: "9,00",  menu: "10,50" },
        { nom: "Bowl 3 viandes", seul: "10,00", menu: "11,50" },
      ]},
    ],
    supplements: [
      { nom: "Tacos gratiné — Fromage",                   prix: "1,00" },
      { nom: "Tacos gratiné — Fromage + Jambon ou Bacon", prix: "2,00" },
      ...SUPPLEMENTS,
    ],
  },
  {
    id: "crousty", titre: "AFL Crousty", icone: "fire", img: "",
    accroche: "Le nouveau best-seller",
    note: "Menu = Crousty + Boisson 33cl",
    groupes: [
      { titre: "", style: "cards", items: [
        { nom: "AFL Crousty", desc: "Tenders croustillants, riz et sauce au choix", seul: "7,00", menu: "8,50", nouveau: true },
      ]},
    ],
  },
  {
    id: "paninis", titre: "Nos Paninis", icone: "panini", img: "",
    accroche: "3 Fromages, Steak ou Poulet",
    note: "Menu = Panini + Frites + Boisson 33cl",
    groupes: [
      { titre: "", style: "list", items: [
        { nom: "Panini 3 Fromages", seul: "6,00", menu: "7,50" },
        { nom: "Panini Steak",      seul: "6,00", menu: "7,50" },
        { nom: "Panini Poulet",     seul: "6,00", menu: "7,50" },
      ]},
    ],
  },
  {
    id: "texmex", titre: "Tex Mex & Frites", icone: "texmex", img: "",
    accroche: "À grignoter ou à partager",
    groupes: [
      { titre: "", style: "list", items: [
        { nom: "Tenders x3 + sauce",                prix: "4,50" },
        { nom: "Barquette de frites — Petite",      prix: "1,50" },
        { nom: "Barquette de frites — Grande",      prix: "2,50" },
        { nom: "Tex Mex x3", desc: "Mozzastick, Oignons rings, Camembert, Jalapeños, Nuggets", prix: "2,50" },
        { nom: "Tex Mex x6", desc: "Au choix",      prix: "4,50" },
        { nom: "Tex Mex x9", desc: "Au choix",      prix: "7,00" },
        { nom: "Nems / Samossa / Chicken Rolls x3", prix: "3,50" },
      ]},
    ],
  },
  {
    id: "enfant", titre: "Menu Enfant", icone: "enfant", img: "",
    accroche: "Pour les petits gourmands",
    groupes: [
      { titre: "", style: "cards", items: [
        { nom: "Menu Enfant", desc: "Cheese Burger, 5 Nuggets ou Mini Tacos au choix + Frites + Compote + Caprisun", prix: "5,50" },
      ]},
    ],
  },
  {
    id: "desserts", titre: "Desserts & Boissons", icone: "dessert", img: "",
    accroche: "La touche finale",
    groupes: [
      { titre: "Desserts", style: "list", items: [
        { nom: "Tiramisu",      prix: "2,90" },
        { nom: "Tarte au Daim", prix: "2,90" },
      ]},
      { titre: "Boissons", style: "list", items: [
        { nom: "Canette 33cl",           prix: "1,50" },
        { nom: "Soda 1,5L", desc: "Coca-Cola…", prix: "3,00" },
        { nom: "Eau 50cl",               prix: "1,00" },
        { nom: "Caprisun",               prix: "0,80" },
      ]},
    ],
  },
];
