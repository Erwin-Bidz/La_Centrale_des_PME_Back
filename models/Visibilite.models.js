const mongoose = require('mongoose');
const { Schema } = mongoose;

const visibiliteSchema = new Schema({
  SiteWeb: String,
  AvisUtilisateur: { type: Schema.Types.Mixed, default: {} },
  Marketing: { type: Schema.Types.Mixed, default: {} },
  Evenements: { type: Schema.Types.Mixed, default: {} },
  ReseauSociaux: { type: Schema.Types.Mixed, default: {} },
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Visibilite = mongoose.model('Visibilite', visibiliteSchema);

module.exports = Visibilite;
