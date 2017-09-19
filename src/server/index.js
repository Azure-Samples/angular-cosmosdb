const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const TwitterStrategy = require('passport-twitter').Strategy;

const env = require('./env/environment');
const routes = require('./routes');

const publicweb = process.env.PUBLICWEB || './publicweb';
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport
// and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: env.twitter.consumerKey,
      consumerSecret: env.twitter.consumerSecret,
      callbackURL: env.twitter.callbackURL
    },
    (token, tokenSecret, profile, done) => {
      // find the user in this app's database using their twitter account
      console.log(profile);
      return done(null, profile);
    }
  )
);

console.log(env.twitter.callbackURL);

const port = env.serverPort;
app.listen(port, () => console.log(`API running on localhost:${port}`));
