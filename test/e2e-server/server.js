/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const expressQueryBoolParser = require('express-query-boolean');

const app = express();
/* Decode query string 'true' and 'false' strings as booleans */
app.use(expressQueryBoolParser());
/* Serve this project's bower_components/ as /ui-hub-assets/bower_components/ */
app.use('/ui-hub-assets/bower_components', express.static(path.resolve(__dirname, '..', '..', 'bower_components')));
/* Serve this project's root as /ui-hub-assets/bower_components/pds-chrome */
app.use('/ui-hub-assets/bower_components/pds-chrome', express.static(path.resolve(__dirname, '..', '..')));

const mainTemplateSource = fs.readFileSync(path.resolve(__dirname, '..', '..', 'views', 'main.handlebars'), 'utf8');
const mainTemplate = Handlebars.compile(mainTemplateSource);
const navData = require('./nav-data-two-apps');
const templateData = (chromeless=false, body='', customThemeOptions={}) => ({
  appname: "PDS Chrome Test",
  helpers: {
    globalScripts: [],
    globalCSS: []
  },
  chromeless: chromeless,
  newrelicHeader: '',
  navStr: JSON.stringify(navData),
  customThemeOptions: customThemeOptions,
  body: body
});

app.get('/', (req, res) => {
  res.redirect('/local/dashboards');
});

app.get('/local/dashboards', (req, res) => {
  const chromeless = (req.query && req.query.chromeless === true) ? true : false;
  const customThemeOptions = (req.query && req.query.customThemeOptions) ? req.query.customThemeOptions : {};
  res.send(mainTemplate(templateData(chromeless, `
    <h1>Dashboards Microapp</h1>
    <p><a id="same-origin" href="/local/analytics/#/subnav1">Open Analytics Subpage 1</a></p>
    <p><a id="different-origin" href="https://example.com/">Open Google</a></p>
    <p><a id="target-blank" target="_blank" href="/local/analytics/#/subnav1">Open Analytics Subpage 1 in a new tab</a></p>
  `, customThemeOptions)));
});

app.get('/local/analytics', (req, res) => {
  const chromeless = (req.query && req.query.chromeless === true) ? true : false;
  const customThemeOptions = (req.query && req.query.customThemeOptions) ? req.query.customThemeOptions : {};
  res.send(mainTemplate(templateData(chromeless, '<h1>Analytics Microapp</h1>', customThemeOptions)));
});

app.get('/config/nav/:id', (req, res) => {
  if (req.params.id === 'dashboards') {
    res.json({
      id: 'dashboards',
      path: '/local/dashboards',
      items: [navData.main.items[0]]
    });
  }
  if (req.params.id === 'analytics') {
    res.json({
      id: 'dashboards',
      path: '/local/analytics',
      items: [navData.main.items[1]]
    });
  }
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
