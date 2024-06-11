const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investisseursSchema = new mongoose.Schema({
  MontantInvestissement: Number,
  TypeInvestissement: String,
  Partenariats: Schema.Types.Mixed,
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Investisseurs = mongoose.model('Investisseurs', investisseursSchema);

module.exports = Investisseurs;
