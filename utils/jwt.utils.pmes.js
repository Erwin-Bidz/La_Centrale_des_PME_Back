let jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET || '$2b$05$GndKnnSxZvRAg9Z9J9d5a.WTD.nnjIlCYWpMVeiYe/1td8T8cE5Mi';

const bodyParser = require("body-parser");
// Exported functions
module.exports = {
  generateTokenForPme: function(pmeData) {
    return jwt.sign({
      pmeNom: pmeData.Nom,
      pmeEmail: pmeData.Email,
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '24h' 
    });
  },
  
  parseAuthorization: function(authorization) {
    return (authorization != null && authorization.startsWith('Bearer ')) ? authorization.replace('Bearer ', '') : null;
  },

  getPmeEmail: function(authorization) {
    let pmeEmail = null;
    let token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null && jwtToken.pmeEmail != null)
          pmeEmail = jwtToken.pmeEmail;
      } catch (err) {
        console.error('Erreur lors de la vérification du token:', err);
      }
    }
    return pmeEmail;
  },

  getPmeNom: function(authorization) {
    let pmeNom = null;
    let token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null)
          pmeNom = jwtToken.pmeNom;
      } catch (err) {
        console.error('Erreur lors de la vérification du token:', err);
      }
    }
    return pmeNom;
  }
}
