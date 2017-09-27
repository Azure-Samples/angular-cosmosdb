const express = require('express');
const security = require('./security');
const bodyParser = require('body-parser');

const env = require('./env/' + (process.env.NODE_ENV || 'development'));
const routes = require('./routes');
const publicweb = process.env.PUBLICWEB || './publicweb';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(security());

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

app.listen(env.serverPort, () => console.log(`API running on http://localhost:${env.serverPort}`));
