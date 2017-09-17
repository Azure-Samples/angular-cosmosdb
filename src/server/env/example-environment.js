// Replace with your default values
const serverPort = process.env.SERVER_PORT || 3001;

const cosmos = {
  comsosDbName: process.env.COSMOSDB_NAME || 'your-cosmosdb-name-goes-here', //
  cosmosDbKey: process.env.COSMOSDB_KEY || 'your-cosmosdb-key-goes-here',
  cosmosDbPort: process.env.COSMOSDB_PORT || 10255 // replace with your port
};

const twitter = {
  consumerKey: process.env.TWITTER_CLIENT_KEY || 'your-twitter-client-key-goes-here',
  consumerSecret: process.env.TWITTER_CLIENT_SECRET || 'your-twitter-client-secret-goes-here',
  callbackURL: process.env.TWITTER_CALLBACK_URL || 'your-twitter-callback-url'
};

module.exports = {
  serverPort,
  cosmos,
  twitter
};
