const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificationsSchema = new Schema({
    DomaineDeCertification: String,
    TypeCertification: String,
    Tarification: Schema.Types.Mixed,
    DelaiCertification: String,
    ProcessusCertification: Schema.Types.Mixed,
    pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
  });
  
  const Certifications = mongoose.model('Certifications', certificationsSchema);
  
  module.exports = Certifications;
  