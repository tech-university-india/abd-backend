require('dotenv').config();

const PORT = process.env.PORT || 3001;

const OIDC = {
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: 'https://' + process.env.OKTA_DOMAIN + '/oauth2/default',
  assertClaims: {
    aud: 'api://default',
    cid: process.env.OKTA_CLIENT_ID,
  }
};

module.exports = {
  PORT,
  OIDC
};
