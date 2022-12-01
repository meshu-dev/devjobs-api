#!/usr/bin/env node

// Load config params to process.env
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const app = express();
const mongoDb = require('./src/utils/mongoDb');
const tokenAuth = require('./src/utils/auth');
const port = process.env.APP_PORT || 3000;

// Setup CORS to grant access to frontend website
/*
app.use(function (req, res, next) {
  const allowedOrigins = [
      process.env.APP_FRONTEND_SITE,
      process.env.APP_ADMIN_SITE,
    ],
    origin = req.headers.origin;

  console.log('allowedOrigins', allowedOrigins);
  console.log('origin', origin);

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
}); */

// Setup CORS to grant access to frontend website
const whitelist = [
  process.env.APP_FRONTEND_SITE,
  process.env.APP_ADMIN_SITE
];

const corsHandler = (req, callback) => {
  let corsOptions = { origin: false };
  
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  }
  
  callback(null, corsOptions);
};

const corsParams = {
  origin: corsHandler,
  methods: 'GET,HEAD,PUT,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsParams));

// Parse JSON data in requests
app.use(express.json());

// Run middleware
app.all('*', tokenAuth.verify);

mongoDb.connect();

// Create and setup routes
let routePath = './src/routes',
  index = require(routePath + '/index'),
  auth = require(routePath + '/auth'),
  jobs = require(routePath + '/jobs'),
  jobsites = require(routePath + '/jobsites'),
  users = require(routePath + '/users');

app.use('/', index);
app.use('/auth', auth);
app.use('/jobs', jobs);
app.use('/job-sites', jobsites);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
