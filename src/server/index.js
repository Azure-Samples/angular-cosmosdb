const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const passport = require('passport');
const helmet = require('helmet');
const TwitterStrategy = require('passport-twitter').Strategy;

const env = require('./env/' + (process.env.NODE_ENV || 'development'));

const routes = require('./routes');

const publicweb = process.env.PUBLICWEB || './publicweb';
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: env.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);

app.use(csrf());
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});

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

if (env.twitter.consumerKey) {
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
}

console.log(env.twitter.callbackURL);

const port = env.serverPort;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
