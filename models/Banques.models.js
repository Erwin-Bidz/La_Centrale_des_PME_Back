const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const banquesSchema = new Schema({
    DateCreation: String,
    Tarifications: Schema.Types.Mixed,
    Partenaires: Schema.Types.Mixed,
    Confidentialite: String,
    Projets: Schema.Types.Mixed,
    pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
  });
  
  const Banques = mongoose.model('Banques', banquesSchema);
  
  module.exports = Banques;
  