const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const routes = require('./routes');

const root = './';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(root, 'dist')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: root });
});

const TWITTER_CONSUMER_KEY = 'AnUBGSNy2IDZFBb2MsJ9CPeFu';
const TWITTER_CONSUMER_SECRET = 'zRnAMVerhDcFdIxv4PIuJOkvdQTaLMcXV49aWYiUAv1yMcuJjj';

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/twitter/callback'
    },
    (token, tokenSecret, profile, done) => {
      // find the user in this app's database using their twitter account
      console.log(profile);
      return done(null, profile);
    }
  )
);


const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));
