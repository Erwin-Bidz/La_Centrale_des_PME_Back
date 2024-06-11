// PME.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const pmeSchema = new Schema({
  Nom: String,
  Password: String,
  Logo: String,
  Statut_juridique: String,
  Effectif: Number,
  Email: String,
  Type: String,
  SiteWeb: String,
  Tel: String,
  ChiffreAffaire: Number,
  Description: String,
  Localisation: String,
  DateCreation: String,
  Departement: String,
  Region: String,
  Pays: String,
  Note: Number
}, { discriminatorKey: 'kind', collection: 'pmes' });

const PME = mongoose.model('PME', pmeSchema);

module.exports = PME;
