const express = require('express');
const bodyParser = require('body-parser');

const env = require('./env/' + (process.env.NODE_ENV || 'development'));
const routes = require('./routes');
const publicweb = process.env.PUBLICWEB || './publicweb';

const passport = require('passport');
const passportconfig = require('./config/passport');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use([
  helmet(),
  session({
    secret: env.sessionSecret,
    resave: true,
    saveUninitialized: true
  }),
  passport.initialize(),
  passport.session(),
  csrf(),
  (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return next();
  }
]);

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

app.listen(env.serverPort, () => console.log(`API running on http://localhost:${env.serverPort}`));
