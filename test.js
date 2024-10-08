
const mongoose = require('mongoose');
const Pilier = require('../La_Centrale_des_PME_Back/models/Pilier.models');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/SMEdb', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error', err));

// Document des piliers
const piliersData = [{
  "_id": "6697644f4b8318c27ffba146",
  "nom": "Transformation structurelle de l'économie",
  "SousPilier": {
    "nom": "Développement des industries et des services",
    "objectifs": {
      "1": "Industrie de l'énergie",
      "2": "Agro-industrie",
      "3": "Numérique",
      "4": "Forêt-Bois",
      "5": "Textle-Confection-Cuir",
      "6": "Mines-Métallurgie-Sidérurgie",
      "7": "Hydrocarbures-Raffinage-Pétrochimie",
      "8": "Chimie-Pharmacie",
      "9": "Construction-Services-Professionnels-Scientifiques-Techniques",
      "10": "Développement des services non financiers"
    },
    "nom": "Développement de la productivité et de la production agricoles",
    "objectifs": {
      "1": "Accroissement de la productivité, de la production et de la compétitivité des produits agro-sylvo-pastoraux et halieutiques",
      "2": "Accès à la terre, aux équipements et infrastructures de production",
      "3": "Structuration et renforcement des capacités des acteurs"
    },
    "nom": "développement des infrastructures productives",
    "objectifs": {
      "1": "Infrastructures énergétiques",
      "2": "Infrastructures de transport",
      "3": "Infrastructures de télécommunications",
      "4": "Infrastructures hydrauliques et d'assainissement",
      "5": "Modernisation urbaine",
      "6": "Gestion domaniale et cadastrale"
    },
    "nom": "Intégration régionale et facilitation des échanges",
    "objectifs": {
      "1": "Intégration régionale",
      "2": "Facilitation des échanges"
    },
    "nom": "Dynamisation du secteur privé",
    "objectifs": {
      "1": "Rattrapage et développement technologique",
      "2": "Incitations au développement des entreprises",
      "3": "Protection de l'espace économique national"
    },
    "Environnement et protection de la nature": {
      "1": "Gestion durable des ressources naturelles",
      "2": "Adaptation aux changements climatiques"
    },
    "nom": "Transformation du système financier",
    "objectifs": {
      "1": "Accroissement de l'inclusion financière et densification du système financier et banquaire",
      "2": "Développement du financement local des investissements et des exportations",
      "3": "Renforcement du financement régional et international des investissements et des exportations",
      "4": "Développement du crédit fournisseur",
      "5": "Mobilisation des financements de la diaspora et rapatriement des capitaux",
      "6": "Développement des talents et compétences financières"
    }
  }
},
{
  "_id": "6697ddb14b8318c27ffba14f",
  "nom": "DEVELOPPEMENT DU CAPITAL HUMAIN ET DU BIEN-ÊTRE",
  "SousPilier": {
    "nom": "Contexte démographique",
    "ojectifs": {},
    "nom": "Education, formation et employabilité",
    "objectifs": {
      "1": "Accès et équité",
      "2": "Qualité, employabilité et entreprenariabilité",
      "3": "Renforcement du système éducatif"
    },
    "nom": "Santé et nutrition",
    "objectifs": {
      "1": "Promotion de la santé et de la nutrition",
      "2": "Prévention de la maladie",
      "3": "Prise en charge des cas",
      "4": "Renforcement du système de santé"
    },
    "nom":"Accès aux facultés sociales de base",
    "objectifs": {
      "1": "Accès à l'habitat",
      "2": "Accès à l'eau potable",
      "3": "Accès à l'électricité"
    },
    "nom": "Protection sociale",
    "objectifs": {
      "1": "Sécurité sociale",
      "2": "Tranferts sociaux",
      "3": "Action sociale",
      "4": "Promotion du genre et de l'équité",
      "5": "Communication pour le développement social"
    },
    "nom":"Recherche; développement et innovation",
    "objectifs": {}
  }
},
{
  "_id": "6697de854b8318c27ffba150",
  "nom": "PROMOTION DE L'EMPLOI ET INSERTION ECONOMIQUE",
  "SousPilier": {
    "nom": "Promotion de l'emploi dans les projets d'investissement public",
    "objectifs": {},
    "nom": "Productivité agricole, emploi et revenus en milieu rural",
    "objectifs": {},
    "nom":"Développement des TPE, PME et de l'entrepreneuriat jeunes en zones urbaines",
    "objectifs": {},
    "nom": "Création et préservation de l'emploi décent dans les grandes entreprises",
    "objectifs": {},
    "nom": "Mise en adéquation formation-emploi et insertion professionnelle",
    "objectifs": {},
    "nom": "Régulation du marché du travail",
    "objectifs": {}
  }
},
{
  "_id": "6697deae4b8318c27ffba151",
  "nom": "GOUVERNANCE, DECENTRALISATION ET GESTION STRATEGIQUE DE L'ETAT",
  "SousPilier": {
    "nom": "Décentralisation et développement local",
    "objectifs": {},
    "nom": "Renforcement de l'état de droit et sécurité des personnes et des biens",
    "objectifs": {
      "1": "Renforcement de l'état de droit et protection des droits humains",
      "2": "Consolidation du pouvoir judiciaire et accès de tous à une justice équiable",
      "3": "Intensification de la lutte contre l'insécurité, la criminalité et le terrorisme",
      "4": "Prévention et gestion des crises",
      "5": "Amélioration de la communication institutionnelle et de l'accès à l'information publique"
    },
    "nom": "Amélioration du service public de l'état",
    "objectifs": {
      "1": "Modernisation de l'administration publique",
      "2": "Optimisation du fonctionnement de l'administration publique",
      "3": "Amélioration de la gestion des ressources humaines de l'état",
      "4": "Renforcement de la lutte contre la corruption, les détournements de fonds et les conflits d'intéret"
    },
    "nom": "Gouvernance économique et financière",
    "objectifs": {
      "1": "Modernisation de la gestion des finances publiques",
      "2": "Amélioration de la gestion de la dette",
      "3": "Rationalisation de la gestion des établissements et entreprises publics",
      "4": "Amélioration du climat des affaires",
      "5": "Renforcement de la coopération et du partenariat au développement",
      "6": "Contribution de la disapora au développement et apport de la diplomatie économique",
      "7": "Régulation et surveillance de l'espace économique national"
    },
    "nom": "Aménagement du territoire",
    "objectifs": {},
    "nom": "Promotion du bilinguisme, du multiculturalisme et de la citoyenneté",
    "objectifs": {
      "1": "Promotion du bilinguisme",
      "2": "Promotion du multiculturalisme et développement d'une identité culturelle synthétique",
      "3": "Réappropriation de la citoyenneté et du patriotisme",
      "4": "Raffermissement du lien social, de l'autorité de l'Etat et du rapport Etat-citoyen"
    }
  }
}];

// Fonction pour insérer les piliers
const insertPiliers = async () => {
  try {
    await Pilier.insertMany(piliersData);
    console.log('Piliers insérés avec succès');
    mongoose.disconnect();
  } catch (err) {
    console.error('Erreur lors de l\'insertion', err);
  }
};

insertPiliers();
