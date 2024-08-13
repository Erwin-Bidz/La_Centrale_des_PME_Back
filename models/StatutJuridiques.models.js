const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statutJuridiqueSchema = new Schema({
    name: { type: String, required: true, unique: true }
  });
  
  const StatutJuridique = mongoose.model('StatutJuridique', statutJuridiqueSchema);
  