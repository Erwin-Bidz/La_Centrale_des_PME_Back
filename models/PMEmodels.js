// PME.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

//[]
// Enumération des types possibles
const typesEnum = ['ONG', 'AgentGouv', 'Banque', 'Certification', 'Expert', 'Fournisseur', 'Investisseur', 'Autre'];
const statutJurid = ['SARL','EURL', 'SAS', 'SASU', 'SA', 'SNC', 'NCI', 'SCOP', 'Association', 'Auto-entrepreneur', 'Micro-entrepreneur', 'Entreprise individuelle',
  'GIE', 'SCA', 'SCS', 'Société en participation', 'Sociale civile', 'Société dexercice libérale', 'Société coopérative', 'Société européene', 'Autre'
];
//"Langues": ["Français", "English", "Deutsch", "Italiano", "Español", "Português", "Autre"],[]
const Langues = ['Français', 'Anglais', 'Allemand', 'Italien', 'Espagnol', 'Portugais', 'Arabe', 'Autre'];
//ISO, HACCP, BRC, IFS, FSSC_22000, OHSAS, IATF, CE, NF, MSC, AS9100, LEED, BREEAM, CMMI, PCI_DSS, ITIL, Six_Sigma, Lean_Managemement, FairTrade, PEFC
//"Agroalimentaire","Industrie", "Santé", "Environnement", "Qualité", "Sécurité", "Informatique", "Éducation", "Finance", "Construction", "Automobile", "Energie", "Télécommunications", "Tourisme", "RH", "Autre"

  const pmeSchema = new Schema({
    /***********Champs communs**************/
    Nom: String,
    Password: String,
    Email: String,
    Tel: String,
    SiteWeb: String,
    Logo: String,
    Effectif: Number,
    NomResponsable: String,
    ContactResponsable: String,
    StatutJuridique: [{ type: String, statut: statutJurid, required: true }],
    BoitePostale: String,
    Langues: [{ type: String, Langue: Langues, required: true }],
    //New
    // Références vers les activités, métiers et piliers
    Activites: [{ type: Schema.Types.ObjectId, ref: 'Activites' }],  // Liste des activités choisies
    Metiers: [{ type: Schema.Types.ObjectId, ref: 'Metiers' }],      // Correspondance métier
    Piliers: [{ type: Schema.Types.ObjectId, ref: 'Piliers' }],      // Correspondance pilier
    
    // Champs supplémentaires
    NAF: { type: String },  // Code NAF de l'activité choisie
    ActiviteDescription: { type: String },  // Description de l'activité (généré via l'ID de l'activité)
    
    // Informations d'activité et de division
    division_id: { type: Schema.Types.ObjectId, ref: 'Division' },  // Division associée à l'activité
    
    //
    Tarifications: { type: Schema.Types.Mixed, default: {} },
    Type: { type: String, enum: typesEnum, required: true },
    ChiffreAffaire: BigInt,
    Description: String,
    DateCreation: String,
    Pays: String,
    Region: String,
    Departement: String,
    LieuDit: String,
    LocalisationGps: {
      type: [Number],  // Accepter un tableau de deux nombres (latitude, longitude)
      validate: {
          validator: function(arr) {
              return arr.length === 2;
          },
          message: props => `${props.value} n'est pas une localisation valide !`
      }
  },
    

    /*****AgentsGouv******/
    ZoneGouv: String,

    /*******Banques*******/
    Projets: Schema.Types.Mixed,

    /********Certifications*******500*/
    Certification: Schema.Types.Mixed,
    DomaineCertification: Schema.Types.Mixed,
    TypeCertification: Schema.Types.Mixed,

    /**********Experts*********500*/
    DomaineExpertise: Schema.Types.Mixed,

    /*******Fournisseurs********500*/
    Certifications: { type: Schema.Types.Mixed, default: {} },
    ZoneCouverture: String,

    /********Investisseurs***********/
    MontantInvestissement: BigInt,
    TypeInvestissement: String,
    DomaineInvestissement: Schema.Types.Mixed,

    /*******ONG************500*/
    OngVille: String,
    Budget: BigInt,

    /*******Autre*******/
    SecteurActivite: String,
    ServicesOfferts: [String],
    PublicCible: String,
    BesoinSpecifique: [String],
    Objectifs: [String],
    RessourcesDisponibles: [String],

    /*******Nouveaux Champs pour Notations*******/
    NoteMoyenne: { type: Number, default: 0 },
    NombreDeVotes: { type: Number, default: 0 },

    /*******Nouveaux Champs pour l'Abonnement*******/
    Abonnement: {
      type: { type: String, enum: ['Gratuit', 'Premium', 'VIP'], default: 'Gratuit' },  // Type d'abonnement
      DateDebut: { type: Date, default: Date.now },  // Date de début de l'abonnement
      DateFin: { type: Date },  // Date de fin de l'abonnement (optionnelle pour 'Gratuit')
      Actif: { type: Boolean, default: true }  // Statut de l'abonnement
    },

    /*******Nouveaux Champs pour Likes et Follows*******/
    Likes: [{ type: Schema.Types.ObjectId, ref: 'pmes' }],   // Liste des PME likées
    Follows: [{ type: Schema.Types.ObjectId, ref: 'pmes' }]  // Liste des PME suivies
  });

  // Middleware avant sauvegarde (pre-save) pour gérer les champs en fonction du type 
  pmeSchema.pre('save', function(next) {
    switch (this.Type) {
      case 'AgentsGouv':
        this.ZoneGouv = undefined;
        // Supprimez les autres champs non pertinents
        break;
      case 'Banques':
        this.Budget_annuel = undefined;
        // Supprimez les autres champs non pertinents
        break;
      case 'Certifications':
        this.DomaineCertification = undefined;
        this.TypeCertification = undefined;
        break;
      case 'Experts':
        this.DomaineExpertise = undefined;
        break;
      case 'Fournisseurs':
        this.Certifications = undefined;
        this.ZoneCouverture = undefined;
        break;
      case 'Investisseurs':
        this.MontantInvestissement = undefined;
        this.TypeInvestissement = undefined;
        this.DomaineInvestissement = undefined;
        break;
      case 'Ong':
        this.ongVille = undefined;
        this.Budget = undefined;
        break;
    }
    next();
  });

const PME = mongoose.model('PME', pmeSchema);

module.exports = PME;


