const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ongSchema = new mongoose.Schema({
  Mission: Schema.Types.Mixed,
  Projets: Schema.Types.Mixed,
  Realisation: String,
  Partenaires: Schema.Types.Mixed,
  Budget_annuel: Number,
  zoneInvestissement: String,
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const ONG = mongoose.model('ONG', ongSchema);

module.exports = ONG;
