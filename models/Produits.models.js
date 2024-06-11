const mongoose = require('mongoose');
const { Schema } = mongoose;

const produitSchema = new Schema({
  Matricule: String,
  Nombre: Number,
  Qualite: Number,
  Tarifs: { type: Schema.Types.Mixed, default: {} },
  Stock: { type: Schema.Types.Mixed, default: {} },
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
