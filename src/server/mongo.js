const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/environment');
const dbSettings = {
  comsosDbName: env.comsosDbName || process.env.COSMOSDB_NAME,
  cosmosDbKey: env.cosmosDbKey || process.env.COSMOSDB_KEY,
  cosmosDbPort: env.cosmosDbPort || process.env.COSMOSDB_PORT
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
