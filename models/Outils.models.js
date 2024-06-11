const mongoose = require('mongoose');
const { Schema } = mongoose;

const outilSchema = new Schema({
  Production: { type: Schema.Types.Mixed, default: {} },
  IT: { type: Schema.Types.Mixed, default: {} },
  MaterielBureau: { type: Schema.Types.Mixed, default: {} },
  Transport: { type: Schema.Types.Mixed, default: {} },
  GestionStock: { type: Schema.Types.Mixed, default: {} },
  MisAjour: { type: Schema.Types.Mixed, default: {} },
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Outil = mongoose.model('Outil', outilSchema);

module.exports = Outil;
