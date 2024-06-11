const mongoose = require('mongoose');
const { Schema } = mongoose;

const expertSchema = new Schema({
  DomaineExpertise: String,
  ExperienceProfessionnelle: { type: Schema.Types.Mixed, default: {} },
  Tarification: { type: Schema.Types.Mixed, default: {} },
  Realisation: { type: Schema.Types.Mixed, default: {} },
  ZoneDeCouverture: String,
  DateDeCreation: String,
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
