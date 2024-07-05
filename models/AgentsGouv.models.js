// agentsGouv.models.js
const mongoose = require('mongoose');
const PME = require('./PMEmodels');
const Schema = mongoose.Schema;

const agentsGouvSchema = new Schema({
  Projets: Schema.Types.Mixed,
  Budget_annuel: Number,
  Zone_couverture: String,
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
  // Ajoutez les champs spécifiques aux agents gouvernementaux ici
});

const AgentsGouv = mongoose.model('AgentsGouv', agentsGouvSchema);

module.exports = AgentsGouv;
