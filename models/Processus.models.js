const mongoose = require('mongoose');
const { Schema } = mongoose;

const processusSchema = new Schema({
  RH: String,
  OperationsInternes: { type: Schema.Types.Mixed, default: {} },
  OperationsExternes: { type: Schema.Types.Mixed, default: {} },
  Comptabilite: { type: Schema.Types.Mixed, default: {} },
  Approvisionnement: { type: Schema.Types.Mixed, default: {} },
  ServiceClient: { type: Schema.Types.Mixed, default: {} },
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Processus = mongoose.model('Processus', processusSchema);

module.exports = Processus;
