// Replace with your values

const serverPort = 3001;

const cosmos = {
  name: 'your-value-goes-here',
  key: 'your-value-goes-here',
  port: 10255
};

const twitter = {
  consumerKey: 'your-value-goes-here',
  consumerSecret: 'your-value-goes-here',
  callbackURL: `http://localhost:3001/api/auth/twitter/callback`
};

module.exports = {
  serverPort,
  cosmos,
  twitter
};
