const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  Matricule: String,
  Nombre: Number,
  Tarifs: { type: Schema.Types.Mixed, default: {} },
  Stock: { type: Schema.Types.Mixed, default: {} },
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
