const mongoose = require('mongoose');
const PME = require('./models/PMEmodels');

mongoose.connect('mongodb://localhost:27017/SMEdb', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // Créer une instance de PME avec des données de test
  const pmeData = {
    Nom: "Test PME",
    Password: "password123",
    Email: "test@pme.com",
    Tel: "+237674987589",
    SiteWeb: "https://www.testpme.com",
    Logo: "logo.png",
    Effectif: 50,
    NomResponsable: "John Doe",
    ContactResponsable: "contact@pme.com",
    StatutJuridique: "SARL",  // Remplacez par un ID valide
    BoitePostale: "BP 123",
    Langues: "Français",  // Remplacez par des IDs valides
    Activites: "66751e96cad767c1b9bde05d",  // Remplacez par des IDs valides
    Type: "Banques",
    ChiffreAffaire: 1000000,
    Description: "Description de la PME",
    DateCreation: "2023-01-01",
    Pays: "Pays",
    Region: "Région",
    Departement: "Département",
    LieuDit: "Lieu dit",
    Localisation: {
      type: "Point",
      coordinates: [3.0, 17.0]
    },
    NoteMoyenne: 0,
    NombreDeVotes: 0,
    Projets: {
      projet1: "Construction de filiale"
    }

  };

  const pme = new PME(pmeData);

  // Sauvegarder l'instance dans la base de données
  pme.save()
    .then(savedPme => {
      console.log('PME sauvegardée avec succès:', savedPme);
      mongoose.connection.close();
    })
    .catch(error => {
      console.error('Erreur lors de la sauvegarde de la PME:', error);
      mongoose.connection.close();
    });
});
