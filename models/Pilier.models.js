const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sous-Pilier Schema
const SousPilierSchema = new Schema({
  nom: { type: String, required: true },
  objectifs: { type: Map, of: String } // Pour les objectifs numérotés
});

// Pilier Schema
const PilierSchema = new Schema({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  sous_piliers: { type: Map, of: SousPilierSchema } // Chaque sous-pilier est un objet
});

const Pilier = mongoose.model('Pilier', PilierSchema);

module.exports = Pilier;
