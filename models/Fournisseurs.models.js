const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fournisseursSchema = new Schema({
  Certifications: String,
  Partenaires: Schema.Types.Mixed,
  References_Clients: Schema.Types.Mixed,
  Politique_qualite: String,
  Zone_couverture: String,
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Fournisseurs = mongoose.model('Fournisseurs', fournisseursSchema);

module.exports = Fournisseurs;
