/**
 * server.js
 *
 * Simple static server for serving the theme files.
 */

const express = require('express');
const path = require('path');

const app = express();

/* Serve project files from root */
app.use('/bower_components', express.static(path.resolve(__dirname, 'bower_components')));
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/elements', express.static(path.resolve(__dirname, 'elements')));
app.use('/scripts', express.static(path.resolve(__dirname, 'scripts')));
app.use('/views', express.static(path.resolve(__dirname, 'views')));

exports = module.exports = app;
