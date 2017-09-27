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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Security headers
app.use(helmet());
// Set up a session to store and track each unique client
// This is also leveraged by passport.
app.use(
  session({
    secret: env.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);
// Initialize and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());
// Send a cookie using the naming convention XSRF-TOKEN
// and set its value to the token created by the csurf module
app.use(csrf());
app.use((req, res, next) => {
  // The .csrfToken() function is added by the csurf module
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

app.listen(env.serverPort, () => console.log(`API running on http://localhost:${env.serverPort}`));
