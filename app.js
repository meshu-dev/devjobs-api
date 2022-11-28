const express = require('express');
const app = express();
const port = 3000;

// Create and setup routes
let routePath = './src/routes',
  index = require(routePath + '/index'),
  jobs = require(routePath + '/jobs'),
  jobsites = require(routePath + '/jobsites'),
  users = require(routePath + '/users');

app.use('/', index);
app.use('/jobs', jobs);
app.use('/jobsites', jobsites);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
