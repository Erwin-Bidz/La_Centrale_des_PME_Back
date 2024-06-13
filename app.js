const express = require('express')

const app = express()
const port = 8080

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
const PME = require('./models/PME.models');
const Processus = require('./models/Processus.models');
const Produits = require('./models/Produits.models');
const Services = require('./models/Services.models');
const Social = require('./models/Social.models');
const SousCategories = require('./models/SousCategories.models');
const Visibite = require('./models/Visibilite.models');


// Connexion à la base de données Mongodb
mongoose.connect('mongodb://localhost:27017/SMEdb',
 { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

//Instance == serveur == bd == collection == document == _id+données
app.get('/', (req,res) => res.send('Hello some SME CITY!'))

app.get('/api/smes/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    res.send(`Hello, Small and Medium Sized Enterprise No${id} : ${name}`)
})
//Activites prend l'id de pillarActivity et Metiers prend l'id Activites.