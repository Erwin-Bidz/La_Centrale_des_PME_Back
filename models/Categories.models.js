const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorieSchema = new Schema({
  nom: String,
  libelle: String,
});

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
