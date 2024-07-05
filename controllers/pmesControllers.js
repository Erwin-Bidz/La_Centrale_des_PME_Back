// controllers/pmesController.js

var bcrypt = require('bcrypt');
var PME = require('../models/PMEmodels');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils.pmes');
var saltRounds = 10;

const bodyParser = require("body-parser");


module.exports = {
    register: async function (req, res) {
      try {
        
    
        // Vérifiez le contenu du corps de la requête
        console.log('req.body:', req.body);
    
        // Params
        // Params
        var Nom = req.body.Nom;
        var Password = req.body.Password;
        var Logo = req.body.Logo;
        var Statut_juridique = req.body.Statut_juridique;
        var Effectif = req.body.Effectif;
        var Email = req.body.Email;
        var Type = req.body.Type;
        var SiteWeb = req.body.SiteWeb;
        var Tel = req.body.Tel;
        var ChiffreAffaire = req.body.ChiffreAffaire;
        var Description = req.body.Description;
        var Localisation = req.body.Localisation;
        var DateCreation = req.body.DateCreation;
        var Departement = req.body.Departement;
        var Region = req.body.Region;
        var Pays = req.body.Pays;
        var Note = req.body.Note;
        
    
        console.log('req.body2:', req.body);
        // Vérifiez que les champs requis sont présents
        if (!Nom || !Password || !Email) {
          return res.status(400).send({ message: 'Nom, Email, et Password sont requis.' });
        }
    
        // Vérifiez si une PME avec le même email existe déjà
        var existingPme = await PME.findOne({ Email: Email });
        if (existingPme) {
          return res.status(400).send({ message: 'Une PME avec cet email existe déjà.' });
        }
    
        // Hachez le mot de passe
        var hashedPassword = await bcrypt.hash(Password, saltRounds);
    
        // Créez une nouvelle PME
        var newPme = new PME({
          Nom: Nom,
          Password: hashedPassword,
          Logo: Logo,
          Statut_juridique: Statut_juridique,
          Effectif: Effectif,
          Email: Email,
          Type: Type,
          SiteWeb: SiteWeb,
          Tel: Tel,
          ChiffreAffaire: ChiffreAffaire,
          Description: Description,
          Localisation: Localisation,
          DateCreation: DateCreation,
          Departement: Departement,
          Region: Region,
          Pays: Pays,
          Note: Note
        });
    
        // Sauvegardez la nouvelle PME dans la base de données
        await newPme.save();
    
        // Retournez une réponse de succès
        res.status(201).send({ message: 'PME enregistrée avec succès!', pme: newPme });
      } catch (error) {
        console.error('Erreur dans register:', error);
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la PME.', error: error.message });
      }

        

        
    },

    login : async function(req, res) {
      try {
        const { email, password } = req.body;
        console.log('Requête de connexion reçue avec:', { email, password });
    
        if (!email || !password) {
          console.log('Requête incorrecte: champs manquants');
          return res.status(400).send({ message: 'Email et mot de passe sont requis.' });
        }
    
        const pme = await PME.findOne({ Email: email });
    
        if (!pme) {
          console.log('PME non trouvée pour l\'email:', email);
          return res.status(404).send({ message: 'Email ou mot de passe incorrect.' });
        }
    
        const isMatch = await bcrypt.compare(password, pme.Password);
        if (!isMatch) {
          console.log('Mot de passe incorrect pour l\'email:', email);
          return res.status(401).send({ message: 'Email ou mot de passe incorrect.' });
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





























