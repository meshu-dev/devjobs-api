#!/usr/bin/env node

// Load config params to process.env
require('dotenv').config();

const express = require('express');
const app = express();
const mongoDb = require('./src/utils/mongoDb');
const port = process.env.APP_PORT || 3000;

// Setup CORS to grant access to frontend website
app.use(function (req, res, next) {
  let allowedOrigins = [
      process.env.APP_FRONTEND_SITE,
      process.env.APP_ADMIN_SITE,
    ],
    origin = req.headers.origin;

  if (origin && allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Total-Count'
  );
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Parse JSON data in requests
app.use(express.json());

mongoDb.connect();

// Create and setup routes
let routePath = './src/routes',
  index = require(routePath + '/index'),
  jobs = require(routePath + '/jobs'),
  jobsites = require(routePath + '/jobsites'),
  users = require(routePath + '/users');

app.use('/', index);
app.use('/jobs', jobs);
app.use('/job-sites', jobsites);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
