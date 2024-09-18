// controllers/pmesController.js

var bcrypt = require('bcrypt');
var PME = require('../models/PMEmodels');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils.pmes');
var saltRounds = 10;

const bodyParser = require("body-parser");


module.exports = {
  register : async function (req, res) {
    try {
      console.log('Requête reçue:', req.body);
  
      // Champs communs
      const commonFields = {
        Nom: req.body.Nom,
        Password: req.body.Password,
        Logo: req.body.Logo,
        Email: req.body.Email,
        Tel: req.body.Tel,
        SiteWeb: req.body.SiteWeb,
        Effectif: req.body.Effectif ? Number(req.body.Effectif) : undefined, // Vérifier et convertir en Number
        NomResponsable: req.body.NomResponsable,
        ContactResponsable: req.body.ContactResponsable,
        StatutJuridique: req.body.StatutJuridique,
        BoitePostale: req.body.BoitePostale,
        Langues: req.body.Langues,
        Activites: req.body.Activites,
        Tarifications: req.body.Tarifications,
        Type: req.body.Type,
        ChiffreAffaire: req.body.ChiffreAffaire ? Number(req.body.ChiffreAffaire) : undefined, // Vérifier et convertir en Number
        Description: req.body.Description,
        DateCreation: req.body.DateCreation ? new Date(req.body.DateCreation) : undefined, // Vérifier et convertir en Date
        Pays: req.body.Pays,
        Region: req.body.Region,
        LocalisationGps: req.body.LocalisationGps ? req.body.LocalisationGps.map(Number) : undefined, // Vérifier et convertir en Number
        NoteMoyenne: req.body.NoteMoyenne ? Number(req.body.NoteMoyenne) : undefined, // Vérifier et convertir en Number
        NombreDeVotes: req.body.NombreDeVotes ? Number(req.body.NombreDeVotes) : undefined // Vérifier et convertir en Number
      };
  
      // Définir les champs spécifiques
      let specificFields = {};
      switch (req.body.Type) {
        case 'AgentGouv':
          specificFields = { ZoneGouv: req.body.ZoneGouv };
          break;
        case 'Banque':
          specificFields = { Projets: req.body.Projets };
          break;
        case 'Certifications':
          specificFields = {
            DomaineCertification: req.body.DomaineCertification,
            TypeCertification: req.body.TypeCertification
          };
          break;
        case 'Fournisseur':
          specificFields = {
            Certifications: req.body.Certifications,
            ZoneCouverture: req.body.ZoneCouverture
          };
          break;
        case 'Investisseur':
          specificFields = {
            MontantInvestissement: req.body.MontantInvestissement ? Number(req.body.MontantInvestissement) : undefined,
            TypeInvestissement: req.body.TypeInvestissement,
            DomaineInvestissement: req.body.DomaineInvestissement
          };
          break;
        case 'Autre':
          specificFields = {
              SecteurActivite: req.body.SecteurActivite,
              ServicesOfferts: req.body.ServicesOfferts,
              PublicCible: req.body.PublicCible,
              BesoinSpecifique: req.body.BesoinSpecifique,
              Objectifs: req.body.Objectifs,
              ModeleEconomique: req.body.ModeleEconomique,
              RessourcesDisponibles: req.body.RessourcesDisponibles
          };
          break;
        case 'Experts':
          specificFields = {
              DomaineExpertise: req.body.DomaineExpertise
          };
            break;
        case 'ONG':
          specificFields = {
            OngVille: req.body.OngVille,
            Budget: req.body.Budget ? Number(req.body.Budget) : undefined
          };
          break;
        default:
          return res.status(400).json({ message: "Type de PME non reconnu." });
      }
  
      console.log('Champs communs:', commonFields);
      console.log('Champs spécifiques:', specificFields);
  
      // Vérifiez les champs requis
      if (!commonFields.Nom || !commonFields.Password || !commonFields.Email) {
        return res.status(400).send({ message: 'Nom, Email, et Password sont requis.' });
      }
  
      // Vérifiez si l'email existe déjà
      var existingPme = await PME.findOne({ Email: commonFields.Email });
      if (existingPme) {
        return res.status(400).send({ message: 'Une PME avec cet email existe déjà.' });
      }
  
      // Hash le mot de passe
      var hashedPassword = await bcrypt.hash(commonFields.Password, saltRounds);
  
      // Créez une nouvelle PME en fusionnant les champs communs et spécifiques
      var newPme = new PME({
        ...commonFields,
        ...specificFields,
        Password: hashedPassword // Remplacez le mot de passe par le mot de passe haché
      });
  
      console.log('PME à sauvegarder:', newPme);
  
      // Sauvegarder la nouvelle PME
      await newPme.save();
      res.status(201).send({ message: 'PME enregistrée avec succès!', pme: newPme });
  
    } catch (error) {
      console.error('Erreur dans register:', error);
      res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la PME.', error: error.message });
    }
  }
  ,

    /*
    register: function(req, res) {

        
        //Champs communs
        const commonFields = {
          Nom: req.body.Nom,
          Password: req.body.Password,
          Logo: req.body.Logo,
          Email: req.body.Email,
          Tel: req.body.Tel,
          SiteWeb: req.body.SiteWeb,
          Effectif: req.body.Effectif,
          NomResponsable: req.body.NomResponsable,
          ContactResponsable: req.body.ContactResponsable,
          StatutJuridique: req.body.StatutJuridique,
          BoitePostale: req.body.BoitePostale,
          Langues: req.body.Langues,
          Activites: req.body.Activites,
          Tarifications: req.body.Tarifications,
          Type: req.body.Type,
          ChiffreAffaire: req.body.ChiffreAffaire,
          Description: req.body.Description,
          DateCreation: req.body.DateCreation,
          Pays: req.body.Pays,
          Region: req.body.Region,
          LocalisationGps: req.body.LocalisationGps,
          NoteMoyenne: req.body.NoteMoyenne,
          NombreDeVotes: req.body.NombreDeVotes
        };

        //Champs spécifiques
        let specificFields = {};
        switch (req.body.Type) {
            case 'AgentGouv':
                specificFields = {
                    ZoneGouv: req.body.ZoneGouv
                };
                break;
            case 'Banque':
                specificFields = {
                    Projets: req.body.Projets
                };
                break;
            case 'Certifications':
                specificFields = {
                  DomaineCertification : req.body.DomaineCertification,
                  TypeCertification : req.body.TypeCertification
                };
               break;
            case 'Fournisseur':
                specificFields = {
                    Certifications: req.body.Certifications,
                    ZoneCouverture: req.body.ZoneCouverture
                };
                break;
            case 'Investisseur':
                specificFields = {
                    MontantInvestissement: req.body.MontantInvestissement,
                    TypeInvestissement: req.body.TypeInvestissement,
                    DomaineInvestissement: req.body.DomaineInvestissement
                };
                break;
            case 'ONG':
                specificFields = {
                    OngVille: req.body.OngVille,
                    Budget: req.body.Budget
                };
                break;
            // Ajouter d'autres types ici si nécessaire
            default:
                throw new Error(`Unknown PME type: ${req.body.Type}`);
        }

        // Vérifiez le contenu du corps de la requête
        console.log('req.body:', req.body);
    
        // Vérifiez que les champs requis sont présents
        if (!Nom || !Password || !Email) {
          return res.status(400).send({ message: 'Nom, Email, et Password sont requis.' });
        }
    
        // Vérifiez si une PME avec le même email existe déjà
        var existingPme = await PME.findOne({ Email: Email });
        if (existingPme) {
          return res.status(400).send({ message: 'Une PME avec cet email existe déjà.' });
        }
    

        //WATERFALL CREATE NEW USER
        asyncLib.waterfall([
            function(done) {
                models.PME.findOne({
                    attributes: ['Email'],
                    where: { Email: Email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user'});
                });
            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(Password, saltRounds) {
                        done(null, userFound, saltRounds);
                        //var hashedPassword = await bcrypt.hash(Password, saltRounds);
                    });
                } else {
                    return res.status(409).json({ 'error': 'user already exist' });
                }
            },
            function(userFound, saltRounds, done) {
                var newUser = models.User.create({
                    Nom: Nom,
                    Password: await bcrypt.hash(Password, saltRounds);,
                    Email: Email,
                    Tel: Tel,
                    SiteWeb: SiteWeb,
                    Logo: Logo,
                    Effectif: Effectif,
                    NomResponsable: NomResponsable,
                    ContactResponsable: ContactResponsable,
                    Statut_juridique: Statut_juridique,
                    BoitePostale: BoitePostale,
                    Langues: Langues,
                    Activites: Activites,
                    Tarifications: Tarifications,
                    Type: Type,
                    ChiffreAffaire: ChiffreAffaire,
                    Description: Description,
                    DateCreation: DateCreation,
                    Pays: Pays,
                    Region: Region,
                    Departement: Departement,
                    LieuDit: LieuDit,
                    LocalisationGps: LocalisationGps,
                    NoteMoyenne: NoteMoyenne,
                    NombreDeVotes: NombreDeVotes,
                    //Spécifiques
                    Projets: Projets,
                    Certification: Certification,
                    DomaineCertification: DomaineCertification,
                    TypeCertification: TypeCertification,
                    DomaineExpertise: DomaineExpertise,
                    ZoneCouverture: ZoneCouverture,
                    MontantInvestissement: MontantInvestissement,
                    TypeInvestissement: TypeInvestissement,
                    DomaineInvestissement: DomaineInvestissement,
                    OngVille: OngVille,
                    Budget: Budget
                })
                .then(function(newUser) {
                    done(newUser);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
            }   
        ], function(newUser) {
            if (newUser) {
                return res.status(201).json({
                              Nom: Nom,
                              Password: hashedPassword,
                              Email: Email,
                              Tel: Tel,
                              SiteWeb: SiteWeb,
                              Logo: Logo,
                              Effectif: Effectif,
                              NomResponsable: NomResponsable,
                              ContactResponsable: ContactResponsable,
                              Statut_juridique: Statut_juridique,
                              BoitePostale: BoitePostale,
                              Langues: Langues,
                              Activites: Activites,
                              Tarifications: Tarifications,
                              Type: Type,
                              ChiffreAffaire: ChiffreAffaire,
                              Description: Description,
                              DateCreation: DateCreation,
                              Pays: Pays,
                              Region: Region,
                              Departement: Departement,
                              LieuDit: LieuDit,
                              LocalisationGps: LocalisationGps,
                              NoteMoyenne: NoteMoyenne,
                              NombreDeVotes: NombreDeVotes,
                              //Spécifiques
                              Projets: Projets,
                              Certification: Certification,
                              DomaineCertification: DomaineCertification,
                              TypeCertification: TypeCertification,
                              DomaineExpertise: DomaineExpertise,
                              ZoneCouverture: ZoneCouverture,
                              MontantInvestissement: MontantInvestissement,
                              TypeInvestissement: TypeInvestissement,
                              DomaineInvestissement: DomaineInvestissement,
                              OngVille: OngVille,
                              Budget: Budget
                })
            } else {
                return res.status(500).json({ 'error': 'cannot add user' });
            }
        });
        
    },
    */

    login : async function(req, res) {
      try {
        const { email, password } = req.body;
        console.log('Requête de connexion reçue avec:', { email, password });
    
        if (email==null || password==null) {
          console.log('Requête incorrecte: champs manquants');
          return res.status(400).send({ message: 'Email et mot de passe sont requis.' });
        }
    
        const pme = await PME.findOne({ Email: email });
    
        if (!pme) {
          console.log('PME non trouvée pour l\'email:', email);
          return res.status(404).send({ message: 'Email  incorrect.' });
        }
    
        const isMatch = await bcrypt.compare(password, pme.Password);
        if (!isMatch) {
          console.log('Mot de passe incorrect pour l\'email:', email);
          return res.status(401).send({ message: 'mot de passe incorrect.' });
        }
    
        const token = jwtUtils.generateTokenForPme(pme);
    
        res.status(200).send({
          token,
          pme: {
            id: pme._id,
            email: pme.Email,
            nom: pme.Nom
          }
        });
      } catch (error) {
        console.error('Erreur lors de la tentative de connexion:', error);
        res.status(500).send({ message: 'Erreur serveur lors de la tentative de connexion.', error: error.message });
      }
    },

    list: async function (req, res) {
      try {
        // Trouver toutes les PMEs dans la base de données
        const pmes = await PME.find();
        // Retourner les PMEs trouvées
        res.status(200).send(pmes);
      } catch (error) {
        console.error('Erreur lors de la récupération des PMEs:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des PMEs.', error: error.message });
      }
    },

    getRecommandations: async function (req, res) {
      try {
        // Suppose que l'utilisateur est déjà authentifié et que son ID est disponible
        const userId = req.user._id;
        const currentUser = await PME.findById(userId);

        if (!currentUser) {
          return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const recommendations = await PME.aggregate([
          {
              $match: {
                  // Exclut l'utilisateur actuel
                  _id: { $ne: currentUser._id },
                  // Match uniquement les PME du même type
                  Type: currentUser.Type 
              }
          },
          {
              $addFields: {
                  // Exemple d'une approche simple de similarité
                  similarityScore: { $rand: {} }
              }
          },
          {
              // Trie par ordre de similarité décroissant
              $sort: { similarityScore: -1 }
          },
          {
              // Limite le nombre de recommandations
              $limit: 10 
          }
        ]);

        // Retourner les PMEs recommandées trouvées
        res.status(200).json({ recommendations });

      } catch (error) {
        console.error('Erreur lors de la récupération des PMEs:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des PMEs.', error: error.message });
      }
    },

    listSorted : async function(req, res) {
      try {
        // Obtenir le critère de tri des paramètres de requête
        const sortBy = req.query.sortBy || 'Nom'; // Par défaut, trier par 'Nom'
        const order = req.query.order === 'desc' ? -1 : 1; // Ordre de tri, 'asc' par défaut
    
        // Trouver et trier les PMEs en fonction du critère spécifié
        const pmes = await PME.find().sort({ [sortBy]: order });
        
        // Retourner les PMEs triées
        res.status(200).send(pmes);
      } catch (error) {
        console.error('Erreur lors de la récupération des PMEs triées:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des PMEs triées.', error: error.message });
      }
    },

    listFiltered : async function(req, res) {
      try {
        // Obtenir les critères de filtrage des paramètres de requête
        const filters = {};
        
        // Ajoutez des critères de filtrage basés sur les paramètres de requête fournis
        if (req.query.Nom) filters.Nom = req.query.Nom;
        if (req.query.Email) filters.Email = req.query.Email;
        if (req.query.Statut_juridique) filters.Statut_juridique = req.query.Statut_juridique;
        if (req.query.Type) filters.Type = req.query.Type;
        if (req.query.Region) filters.Region = req.query.Region;
        if (req.query.Pays) filters.Pays = req.query.Pays;
        if (req.query.EffectifMin) filters.Effectif = { $gte: parseInt(req.query.EffectifMin) };
        if (req.query.EffectifMax) filters.Effectif = { ...filters.Effectif, $lte: parseInt(req.query.EffectifMax) };
        if (req.query.ChiffreAffaireMin) filters.ChiffreAffaire = { $gte: parseInt(req.query.ChiffreAffaireMin) };
        if (req.query.ChiffreAffaireMax) filters.ChiffreAffaire = { ...filters.ChiffreAffaire, $lte: parseInt(req.query.ChiffreAffaireMax) };
        if (req.query.NoteMin) filters.Note = { $gte: parseFloat(req.query.NoteMin) };
        if (req.query.NoteMax) filters.Note = { ...filters.Note, $lte: parseFloat(req.query.NoteMax) };
    
        // Trouver les PMEs en fonction des critères de filtrage
        const pmes = await PME.find(filters);
    
        // Retourner les PMEs filtrées
        res.status(200).send(pmes);
      } catch (error) {
        console.error('Erreur lors de la récupération des PMEs filtrées:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des PMEs filtrées.', error: error.message });
      }
    },

    autocomplete : async function(req, res) {
      try {
        // Obtenez le texte de recherche du paramètre de requête
        const searchText = req.query.searchText;
    
        // Vérifiez que le texte de recherche est fourni
        if (!searchText) {
          return res.status(400).send({ message: 'Le texte de recherche est requis.' });
        }
    
        // Utilisez une expression régulière pour rechercher des correspondances de préfixe
        const regex = new RegExp(`^${searchText}`, 'i'); // 'i' pour insensible à la casse
    
        // Rechercher des PMEs dont le Nom ou d'autres champs commencent par le texte de recherche
        const pmes = await PME.find({
          $or: [
            { Nom: regex },
            { Email: regex },
            { Type: regex },
            { Localisation: regex },
            { Region: regex },
            { Pays: regex }
          ]
        }).limit(10); // Limiter les résultats à 10 pour l'autocomplétion
    
        // Retourner les résultats de la recherche
        res.status(200).send(pmes);
      } catch (error) {
        console.error('Erreur lors de la recherche avec autocomplétion:', error);
        res.status(500).send({ message: 'Erreur lors de la recherche avec autocomplétion.', error: error.message });
      }
    },
    getPmeById : async function(req, res) {
       try {

    const pmeId = req.params._id; // Récupérer l'ID de la PME à partir des paramètres de l'URL
    console.log(`Recherche de la PME avec l'ID: ${pmeId}`);
    
    // Rechercher la PME par ID dans la base de données
    const pme = await PME.findById(pmeId);

    if (!pme) {
      // Si la PME n'est pas trouvée, retourner un statut 404
      return res.status(404).send({ message: 'PME non trouvée.' });
    }

    // Retourner les détails de la PME trouvée
    res.status(200).send(pme);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la PME:', error);
    res.status(500).send({ message: 'Erreur lors de la récupération des détails de la PME.', error: error.message });
  }
    }
}





























