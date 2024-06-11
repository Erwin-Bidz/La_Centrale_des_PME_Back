const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paiementSchema = new Schema({
    id: String,
    ModePaiement: String,
    StatutPaiement: String,
    detailsPaiement: Schema.Types.Mixed,
    Montant: Number,
    Devise: Number,
    InfoClients: Schema.Types.Mixed
  });
  
  const Paiement = mongoose.model('Paiement', paiementSchema);
  
  module.exports = Paiement;
  