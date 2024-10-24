const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

//const bcrypt = require('bcrypt')

const app = express()
const cors = require('cors');
const port = process.env.PORT || 8080 
//const port = process.env.PORT || 8080
//const porte = 3000
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const Activites = require('./models/Activites.models');
const Admin = require('./models/Activites.models');
const Categories = require('./models/Categories.models');
const Metiers = require('./models/Metiers.models');
const Notifications = require('./models/Notifications.models');
const Outils = require('./models/Outils.models');
const Paiement = require('./models/Paiement.models');
const PME = require('./models/PMEmodels');
const Pilier = require('./models/Pilier.models');
const Langues = require('./models/Langues.models');
const StatutJuridiques = require('./models/StatutJuridiques.models');
const Processus = require('./models/Processus.models');
const Produits = require('./models/Produits.models');
const Services = require('./models/Services.models');
const Social = require('./models/Social.models');
const SousCategories = require('./models/SousCategories.models');
const Visibite = require('./models/Visibilite.models');

//Gestion des sessions
/*app.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: {secure: false}
  /*cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 60000
  }
}))*/ 

// Autoriser CORS
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, Timeout: '50000ms' }));
app.use(bodyParser.json({ limit: '50mb'}));

//Ctrl
let pmesRoutes = require('./routes/pmesCtrl');
let adminsRoutes = require('./routes/adminsCtrl');
let usersRoutes = require('./routes/usersCtrl');


app.get('/', (req,res) => res.send('Hello some SME CITY!'))
/*app.listen(porte, () => {
  console.log(`Le serveur écoute sur le port http://localhost:${porte}`);
});*/

//Route par défaut

// Routes vers nos différentes fonctions.
// Routes pour les PMEs
app.use('/api/pmes', pmesRoutes);
// Routes pour les Admins app.use('/api/admins', adminsRoutes);
// Routes pour les utilisateurs non enregistrés ou généraux app.use('/api/users', usersRoutes);
/*app.get('/api/pmes/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    res.send(`Hello, Small and Medium Sized Enterprise No${id} : ${name}`)
})*/


//**************** Connexion à la base de données Mongodb ***************************//


/*mongoose.connect('mongodb://localhost:27017/SMEdb',
 { 
  useNewUrlParser: true,
  useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
}); */
//Instance == serveur == bd == collection == document == _id+données

//Activites prend l'id de pillarActivity et Metiers prend l'id Activites.


// Connexion à MongoDB Atlas avec dotenv
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas');
});

// Démarrer le serveur après la connexion réussie à MongoDB
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port http://localhost:${port}`);
});
