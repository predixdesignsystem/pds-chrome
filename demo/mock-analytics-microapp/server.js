/**
 * server.js
 *
 * Simple static server for the microapp files.
 */

const express = require('express');
const path = require('path');

const app = express();

/* Serve `/public` folder at `/` */
app.use(express.static(path.join(__dirname, 'public')));

exports = module.exports = app;
