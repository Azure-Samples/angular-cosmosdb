const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportconfig = require('./config/passport');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');

const env = require('./env/' + (process.env.NODE_ENV || 'development'));
const routes = require('./routes');
const publicweb = process.env.PUBLICWEB || './publicweb';

const app = express();

/* Security headers */
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up a session to store and track each unique client
// This is also leveraged by passport for users
app.use(
  session({
    secret: env.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);

/* Authentication with Passportjs */
// Initialize Passport
// and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

/* CSRF Mitigation */
app.use(csrf());
// Send back a cookie for Angular using the naming convention XSRF-TOKEN
// and set its value to the token created by the csurf module
app.use((req, res, next) => {
  //The .csrfToken() function is added by the csurf module
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

console.log(env.twitter.callbackURL);

const port = env.serverPort;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
