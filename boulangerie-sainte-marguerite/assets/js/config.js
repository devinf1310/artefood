/* ============================================================
   CONFIG — BOULANGERIE SAINTE-MARGUERITE
   ------------------------------------------------------------
   👉 SEUL FICHIER À ÉDITER POUR LES MÉDIAS.
   Les fonctions img()/vid() encodent automatiquement les noms
   de fichiers (espaces, accents, &) : tu écris le nom réel du
   fichier tel qu'il est sur GitHub, sans t'occuper de l'URL.
   ============================================================ */

const MEDIA = "https://raw.githubusercontent.com/devinf1310/artefood/main/boulangerie-sainte-marguerite/media/images/";
const VIDEO = "https://raw.githubusercontent.com/devinf1310/artefood/main/boulangerie-sainte-marguerite/media/videos/";
const img = f => MEDIA + encodeURIComponent(f);
const vid = f => VIDEO + encodeURIComponent(f);

/* ------------------------------------------------------------
   CATALOGUE PÂTISSERIE — photo + vidéo par produit.
   src = photo (poster) · video = clip lancé au clic.
   Modifie titre / desc / cat librement. Pour ajouter un produit,
   copie une ligne ; pour le retirer, supprime la ligne.
   ⚠️ Les noms dans img()/vid() doivent rester EXACTEMENT ceux
      des fichiers sur GitHub (y compris "céfé", "&", etc.).
   ------------------------------------------------------------ */
const PATISSERIE = [
  /* ---- Entremets ---- */
  { src:img("Bavarois passion.png"),            video:vid("Bavarois passion.mp4"),            titre:"Bavarois passion",       desc:"Mousse passion, insert fruité sur biscuit moelleux.", cat:"Entremets" },
  { src:img("Charlotte aux fruits rouges.png"), video:vid("Charlotte aux fruits rouges.mp4"), titre:"Charlotte fruits rouges", desc:"Biscuit cuillère, bavaroise et fruits rouges.",      cat:"Entremets" },
  { src:img("Castel.png"),                      video:vid("Castel.mp4"),                      titre:"Castel",                 desc:"Chocolat et croustillant praliné.",                   cat:"Entremets" },
  { src:img("Castel 2.png"),                                                                  titre:"Castel (variation)",     desc:"Notre variation autour du Castel.",                   cat:"Entremets" },
  { src:img("Foret noire.png"),                 video:vid("Foret noire 1.mp4"),               titre:"Forêt noire",            desc:"Génoise cacao, chantilly et cerises.",                cat:"Entremets" },
  { src:img("Royal.png"),                       video:vid("Royal chocolat 1.mp4"),            titre:"Royal chocolat",         desc:"Croustillant praliné et mousse au chocolat.",         cat:"Entremets" },
  { src:img("Délice Caramel & Poire.png"),                                                    titre:"Délice caramel & poire", desc:"Caramel onctueux et poire fondante.",                 cat:"Entremets" },
  { src:img("ETVIT.png"),                       video:vid("ETVIT 1.mp4"),                     titre:"Etvit",                  desc:"Notre entremets signature.",                          cat:"Entremets" },
  { src:img("Gateau coeur.png"),                                                              titre:"Gâteau cœur",            desc:"Pour vos plus belles occasions.",                     cat:"Entremets" },

  /* ---- Tartes ---- */
  { src:img("Tarte au citron.png"),  video:vid("Tarte au citron.mp4"),     titre:"Tarte au citron",   desc:"Crème citron acidulée, meringue légère.", cat:"Tartes" },
  { src:img("Tarte aux fraise.png"), video:vid("Tarte aux fraises 1.mp4"), titre:"Tarte aux fraises", desc:"Fraises fraîches sur crème vanille.",     cat:"Tartes" },
  { src:img("Tarte aux fruits.png"), video:vid("Tarte aux fruits 1.mp4"),  titre:"Tarte aux fruits",  desc:"Fruits de saison, crème pâtissière.",     cat:"Tartes" },
  { src:img("Tarte aux pommes.png"), video:vid("Tarte aux pommes 2.mp4"),  titre:"Tarte aux pommes",  desc:"Pommes fondantes, pâte dorée.",           cat:"Tartes" },
  { src:img("Tartelette bavaroise framboise.png"), video:vid("Bavaroise framboise.mp4"), titre:"Tartelette framboise", desc:"Bavaroise framboise sur fond sablé.", cat:"Tartes" },
  { src:img("Figue.png"),            video:vid("Figue 1.mp4"),             titre:"Tartelette figue",  desc:"Figue fraîche et crème d'amande.",        cat:"Tartes" },

  /* ---- Individuels ---- */
  { src:img("Baba au rhum.png"),           video:vid("Baba_au_Rhum.mp4"),           titre:"Baba au rhum",       desc:"Baba imbibé, notes de rhum ambré.",      cat:"Individuels" },
  { src:img("Cannoli.png"),                video:vid("Cannoli 1.mp4"),              titre:"Cannoli",            desc:"Coque croustillante, ricotta parfumée.", cat:"Individuels" },
  { src:img("Mille feuilles.png"),         video:vid("Mille feuilles 1.mp4"),       titre:"Mille-feuille",      desc:"Feuilletage caramélisé, crème vanille.", cat:"Individuels" },
  { src:img("Eclair aux chocolat.png"),    video:vid("Eclair aux chocolat 1.mp4"),  titre:"Éclair chocolat",    desc:"Crème pâtissière et glaçage chocolat.",  cat:"Individuels" },
  { src:img("Eclair céfé.png"),            video:vid("Eclair céfé 1.mp4"),          titre:"Éclair café",        desc:"Crème café, glaçage brillant.",          cat:"Individuels" },
  { src:img("Eclair OK.png"),                                                       titre:"Éclair",             desc:"Pâte à choux, crème onctueuse.",         cat:"Individuels" },
  { src:img("Rocher praliné.png"),         video:vid("Rocher praliné.mp4"),         titre:"Rocher praliné",     desc:"Cœur praliné, enrobage croustillant.",   cat:"Individuels" },
  { src:img("Verrine Trois Chocolats.png"),video:vid("Verrine Trois Chocolats.mp4"),titre:"Verrine 3 chocolats",desc:"Noir, lait, blanc — en couches gourmandes.",cat:"Individuels" },
  {                                        video:vid("Saint honoré 1.mp4"),         titre:"Saint-honoré",       desc:"Choux caramélisés et crème chiboust.",   cat:"Individuels" },
];

/* Sélection mise en avant sur la page d'accueil */
const ACCUEIL = [
  "Verrine 3 chocolats","Charlotte fruits rouges","Tarte aux fraises",
  "Mille-feuille","Royal chocolat","Forêt noire","Éclair café","Bavarois passion"
].map(t => PATISSERIE.find(x => x.titre === t)).filter(Boolean);

window.SITE = {

  /* ---- Coordonnées (à compléter) ---- */
  tel:        "04 __ __ __ __",              // TODO
  telHref:    "+3340000000",                 // TODO (format international, sans espaces)
  email:      "contact@artefood.fr",         // TODO
  adresse:    "998 avenue Émile Ripert, 13600 La Ciotat",
  horaires:   "Du mardi au dimanche — 6h30 à 19h30. Fermé le lundi.", // TODO
  facebook:   "#",                           // TODO
  instagram:  "#",                           // TODO
  formAction: "",                            // TODO Formspree/Brevo (vide = ouvre le client mail)

  /* ---- Bannières de page (image de fond) ---- */
  hero: {
    accueil:      { img: img("Charlotte aux fruits rouges.png"), imgMobile: img("Verrine Trois Chocolats.png") },
    boulangerie:  { img: "" },   // en attente d'une photo de pains/viennoiseries
    patisserie:   { img: img("Verrine Trois Chocolats.png") },
    creations:    { img: img("Mille feuilles.png") },
    maison:       { img: img("Bavarois passion.png") },
    contact:      { img: img("Tarte aux fraise.png") },
  },

  /* ---- Diaporama accueil ---- */
  accueilCreations: ACCUEIL,

  /* ---- Boulangerie : une seule viennoiserie pour l'instant ---- */
  boulangerie: [
    { video:vid("Pain_au_chocolat.mp4"), titre:"Pain au chocolat", desc:"Feuilletage pur beurre, deux barres de chocolat.", cat:"Viennoiseries" },
  ],
  boulangeriePlaceholders: 5,   // en attendant tes photos de pains

  /* ---- Pâtisserie ---- */
  patisserie: PATISSERIE,
  patisseriePlaceholders: 0,

  /* ---- Nos créations : tout le catalogue ---- */
  creations: PATISSERIE,
  creationsPlaceholders: 0,

  /* ---- Vidéo à la une (page Créations) ---- */
  /* Provisoire : un clip produit. Remplace par ton film de marque quand tu veux. */
  creationsVideo: {
    src:    vid("Verrine Trois Chocolats.mp4"),
    poster: img("Verrine Trois Chocolats.png"),
    titre:  "Nos créations en mouvement",
    desc:   "Un aperçu du savoir-faire de la maison.",
  },

  /* ---- La Maison : images des rangées éditoriales (dans l'ordre) ---- */
  maison: [
    { src: img("Foret noire.png") },
    { src: img("Rocher praliné.png") },
    { src: img("Tarte aux pommes.png") },
  ],
};
