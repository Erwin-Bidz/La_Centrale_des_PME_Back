const mongoose = require('mongoose');
const { Schema } = mongoose;

const sousCategorieSchema = new Schema({
  nom: String,
  libelle: String,
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const SousCategorie = mongoose.model('SousCategorie', sousCategorieSchema);

module.exports = SousCategorie;
