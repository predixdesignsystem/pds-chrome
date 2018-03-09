/**
 * server.js
 *
 * This is an AppHub-like express application. It gets microapp entrypoints
 * and compiles them with the theme to create the app shell + theme HTML page
 * for the client. It proxies requests to microapp subpaths for their
 * dependencies. But it does not implement any auth or session handling.
 *
 * This application is intended only for use as a demo of an AppHub theme or
 * microapps in a non-production environment.
 */

const express = require('express');
const Handlebars = require('handlebars');
const expressQueryBoolParser = require('express-query-boolean');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const proxy = require('express-request-proxy');
const request = require('request');
const path = require('path');
const fs = require('fs');
const url = require('url');
const {URL} = url;
const navData = require('./nav-data');
const microapps = require('./microapp-config');

/* Create express app */
const app = express();

/* Use the cookie parser to get/set AppHub theme configs from the user's session */
app.use(cookieParser());

/* Use the body parser to handle POST requests with new AppHub theme configs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Decode query string 'true' and 'false' strings as booleans */
app.use(expressQueryBoolParser());

/* Serve this project's bower_components/ as /ui-hub-assets/bower_components/ */
app.use('/ui-hub-assets/bower_components', express.static(path.resolve(__dirname, 'bower_components')));

/* Compile handlebars template */
const mainTemplatePath = path.resolve(__dirname, 'bower_components', 'pds-chrome', 'build', 'es6', 'views', 'main.handlebars');
const mainTemplateSource = fs.readFileSync(mainTemplatePath, 'utf8');
const mainTemplate = Handlebars.compile(mainTemplateSource);

/** Returns a rendered handlebars template with the options applied */
function prepareTemplate(body='', chromeless=false, customThemeOptions={}) {
  const options = {
    appname: "PDS Chrome Demo",
    helpers: {
      globalScripts: [],
      globalCSS: []
    },
    chromeless: chromeless,
    newrelicHeader: '',
    navStr: JSON.stringify(navData),
    customThemeOptions: customThemeOptions,
    body: body
  };
  return mainTemplate(options);
};

/** Fetches microapp template string from a URL */
const microappTemplateCache = {};
function fetchMicroappTemplate(url) {
  return new Promise((resolve, reject) => {
    if (microappTemplateCache[url]) {
      resolve(microappTemplateCache[url]);
    }
    return request(url, (err, response, body) => {
      if (err) reject(err);
      microappTemplateCache[url] = body;
      resolve(body);
    });
  });
};

/* Redirect requests with no path to the analytics microapp */
app.get('/', (req, res) => {
  res.redirect('/analytics/');
});

/* Serve the favicon as an empty string */
app.get('/favicon.icon?/', (req, res) => {
  res.send('');
})

/* Serve the special @configure path to let users set their theme config */
const configTemplatePath = path.resolve(__dirname, 'views', 'config.hbs');
const configTemplateSource = fs.readFileSync(configTemplatePath, 'utf8');
const configTemplate = Handlebars.compile(configTemplateSource);
app.get('/@config', (req, res) => {
  const config = req.cookies.apphubdemoconfig || {};
  const html = configTemplate({
    config: JSON.stringify(config, null, '  ').trim(),
    saved: req.query.saved || false
  });
  res.send(html);
});
app.post('/@config', (req, res) => {
  const config = JSON.parse(req.body.config);
  res.cookie('apphubdemoconfig', config);
  res.redirect('/@config?saved=true');
});

/* Fetch microapp entrypoint template to render in the iFrame */
app.get('/:microapp/', (req, res) => {
  const sourceUrl = url.parse(req.url);
  if (!/\/$/.test(sourceUrl.pathname)) {
    // microapp pathname must end in a slash, redirect if it does not
    const newUrl = sourceUrl.pathname + '/' + (sourceUrl.search || '') + (sourceUrl.hash || '');
    res.redirect(newUrl);
  }
  else {
    console.log(`Serving microapp path: ${req.originalUrl}`);
    const {microapp} = req.params;
    const chromeless = (req.query && req.query.chromeless === true) ? true : false;
    const cookieThemeOptions = req.cookies.apphubdemoconfig || {};
    const queryThemeOptions = (req.query && req.query.customThemeOptions) ? req.query.customThemeOptions : {};
    const customThemeOptions = Object.assign({}, cookieThemeOptions, queryThemeOptions);
    if (Object.keys(customThemeOptions).length) {
      console.log('Applied customThemeOptions:')
      console.log(JSON.stringify(customThemeOptions, null, '  '));
    }

    const microappUrl = `${microapps[microapp].host}/${microapps[microapp].template}`;
    fetchMicroappTemplate(microappUrl)
      .then(microappTemplate => {
        res.send(prepareTemplate(microappTemplate, chromeless, customThemeOptions));
      })
      .catch(err => {
        console.log(err);
        res.send(err).status(500);
      });
  }
});

/* Proxy requests to microapp subpaths */
app.all('/:microapp/*', (req, res, next) => {
  const {microapp} = req.params;
  if (microapp) {
    const host = microapps[microapp].host;
    proxy({
      url: microapps[microapp].host + '/*',
      userAgent: req.get('user-agent')
    })(req, res, err => {
      console.log(err);
      next(err);
    });
  }
});

/* Respond to nav API requests */
app.get('/config/nav/:id', (req, res) => {
  if (req.params.id === 'analytics') {
    res.json({
      id: 'analytics',
      path: '/analytics',
      items: [navData.main.items[1]]
    });
  }
  // if (req.params.id === 'dashboards') {
  //   res.json({
  //     id: 'dashboards',
  //     path: '/dashboards',
  //     items: [navData.main.items[0]]
  //   });
  // }
});

exports = module.exports = app;
