const express = require('express')
//const bcrypt = require('bcrypt')

const app = express()
const cors = require('cors');
const port = process.env.PORT || 8080
const porte = 3000
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const Activites = require('./models/Activites.models');
const Admin = require('./models/Activites.models');
const AgentsGouv = require('./models/AgentsGouv.models');
const Banques = require('./models/Banques.models');
const Categories = require('./models/Categories.models');
const Certifications = require('./models/Certifications.models');
const Experts = require('./models/Experts.models');
const Fournisseurs = require('./models/Fournisseurs.models');
const Investisseurs = require('./models/Investisseurs.models');
const Metiers = require('./models/Metiers.models');
const Notifications = require('./models/Notifications.models');
const ONG = require('./models/ONG.models');
const Outils = require('./models/Outils.models');
const Paiement = require('./models/Paiement.models');
const PME = require('./models/PMEmodels');
const Processus = require('./models/Processus.models');
const Produits = require('./models/Produits.models');
const Services = require('./models/Services.models');
const Social = require('./models/Social.models');
const SousCategories = require('./models/SousCategories.models');
const Visibite = require('./models/Visibilite.models');

// Autoriser CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Ctrl
var pmesRoutes = require('./routes/pmesCtrl');
var adminsRoutes = require('./routes/adminsCtrl');
var usersRoutes = require('./routes/usersCtrl');



app.get('/', (req,res) => res.send('Hello some SME CITY!'))
// Démarrer le serveur après la connexion réussie à MongoDB
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port http://localhost:${port}`);
});
app.listen(porte, () => {
  console.log(`Le serveur écoute sur le port http://localhost:${porte}`);
});
// Routes vers nos différentes fonctions.
// Routes pour les PMEs
app.use('/api/pmes', pmesRoutes);
// Routes pour les Admins app.use('/api/admins', adminsRoutes);
// Routes pour les utilisateurs non enregistrés ou généraux app.use('/api/users', usersRoutes);
app.get('/api/pmes/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    res.send(`Hello, Small and Medium Sized Enterprise No${id} : ${name}`)
})


//**************** Connexion à la base de données Mongodb ***************************//
mongoose.connect('mongodb://localhost:27017/SMEdb',
 { 
  useNewUrlParser: true,
  useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});
//Instance == serveur == bd == collection == document == _id+données

//Activites prend l'id de pillarActivity et Metiers prend l'id Activites.

/*******************EJS *****************************/
//use EJS as the view engine
app.set('view engine', 'ejs')
app.get('/api/', (req, res) => {
  res.render("login");
})
app.get('/api/signup', (req, res) => {
  res.render("signup");
})
