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

// Setup static urls
app.use(express.static('public')); 
app.use('/images', express.static('images'));

// Setup CORS to grant access to frontend website
const whitelist = [
  process.env.APP_FRONTEND_SITE,
  process.env.APP_ADMIN_SITE
];

const corsHandler = (origin, callback) => {
  let corsOptions = { origin: false };
  
  if (whitelist.indexOf(origin) !== -1) {
    corsOptions = { origin: true };
  }
  
  callback(null, corsOptions);
};

const corsParams = {
  origin: corsHandler,
  allowedHeaders: 'Content-Type,Authorization',
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
