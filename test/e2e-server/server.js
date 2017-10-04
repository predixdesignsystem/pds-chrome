const express = require('express');
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

const app = express();
/* Serve this project's bower_components/ as /ui-hub-assets/bower_components/ */
app.use('/ui-hub-assets/bower_components', express.static(path.resolve(__dirname, '..', '..', 'bower_components')));
/* Serve this project's root as /ui-hub-assets/bower_components/pds-chrome */
app.use('/ui-hub-assets/bower_components/pds-chrome', express.static(path.resolve(__dirname, '..', '..')));

const mainTemplateSource = fs.readFileSync(path.resolve(__dirname, '..', '..', 'src', 'main.handlebars'), 'utf8');
const mainTemplate = Handlebars.compile(mainTemplateSource);
const navData = require('./nav-data-two-apps');
const templateData = (chromeless=false, body='') => ({
  appname: "PDS Chrome Test",
  helpers: {
    globalScripts: [],
    globalCSS: []
  },
  chromeless: chromeless,
  newrelicHeader: '',
  navStr: JSON.stringify(navData),
  body: body
});

app.get('/', (req, res) => {
  res.redirect('/local/dashboards');
});

app.get('/local/dashboards', (req, res) => {
  const chromeless = (req.query && req.query.chromeless === 'true') ? true : false;
  res.send(mainTemplate(templateData(chromeless, '<h1>Dashboards Microapp</h1>')));
});

app.get('/local/analytics', (req, res) => {
  const chromeless = (req.query && req.query.chromeless === 'true') ? true : false;
  res.send(mainTemplate(templateData(chromeless, '<h1>Analytics Microapp</h1>')));
});

exports = module.exports = (function() {
  this.port = null;
  this.server = null;

  return {
    start: function(port) {
      this.server = app.listen(port, () => {
        this.port = port;
        console.log(`Serving e2e test server on port ${this.port}`);
      });
    },
    stop: function() {
      this.server.close();
      console.log(`Tearing down e2e test server on port ${this.port}`);
    }
  }
});
