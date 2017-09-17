const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/environment');
const dbSettings = {
  comsosDbName: env.cosmos.comsosDbName,
  cosmosDbKey: env.cosmos.cosmosDbKey,
  cosmosDbPort: env.cosmos.cosmosDbPort
};

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${dbSettings.comsosDbName}:${dbSettings.cosmosDbKey}@${dbSettings.comsosDbName}.documents.azure.com:${dbSettings.cosmosDbPort}/?ssl=true`; //&replicaSet=globaldb`;

function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
  connect,
  mongoose
};
