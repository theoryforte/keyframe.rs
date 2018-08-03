const jwt = require('jsonwebtoken');

// Generate an Access Token for the given User ID
function generateAccessToken(email) {
  // How long will the token be valid for
  const expiresIn = '1 month';
  // Which service issued the token
  // const issuer = config.get('authentication.token.issuer');
  // // Which service is the token intended for
  // const audience = config.get('authentication.token.audience');
  // // The signing key for signing the token
  const secret = 'secret';

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    subject: email
  });

  return token;
}

module.exports = {
  generateAccessToken
};
