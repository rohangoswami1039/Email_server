const admin = require("firebase-admin");
//const serviceAccount = require("./firebase_sdk.json");
const serviceAccount = {
  type: process.env.SERVICE_TYPE,
  project_id: process.env.SERVICE_PROJECT_ID,
  private_key_id: process.env.SERVICE_KEY_ID,
  private_key: process.env.SERVICE_PRIVATE_KEY_ID,
  client_email: process.env.SERVICE_CLIENT_EMAIL,
  client_id: process.env.SERVICE_CLIENT_ID,
  auth_uri: process.env.SERVICE_AUTH_URI,
  token_uri: process.env.SERVICE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SERVICE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SERVICE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.SERVICE_UNIVERSE_DOMAIN,
};

//const serviceAccount = require("../../../../etc/secrets/firebase_sdk.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = auth;
