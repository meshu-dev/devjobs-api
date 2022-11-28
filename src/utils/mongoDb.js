let mongoose = require('mongoose'),
  mongoDbUrl =
    'mongodb://' + process.env.MONGO_DB_HOST + ':' + process.env.MONGO_DB_PORT,
  options = {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
  };

if (
  process.env.MONGO_DB_USERNAME !== 'dev' &&
  process.env.MONGO_DB_USERNAME &&
  process.env.MONGO_DB_PASSWORD
) {
  options['user'] = process.env.MONGO_DB_USERNAME;
  options['pass'] = process.env.MONGO_DB_PASSWORD;
}

exports.connect = function () {
  let url = mongoDbUrl;

  if (
    process.env.MONGO_DB_USERNAME !== 'dev' &&
    process.env.MONGO_DB_AUTH_SOURCE
  ) {
    url = `${url}?authSource=` + process.env.MONGO_DB_AUTH_SOURCE;
  }

  mongoose.connect(url, options);

  mongoose.connection.on('connected', function () {
    console.log(`Mongoose default connection is open to ${mongoDbUrl}`);
  });

  mongoose.connection.on('error', function (err) {
    console.log(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', function () {
    console.log(`Mongoose default connection is disconnected`);
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(
        `Mongoose default connection is disconnected due to application termination`
      );
      process.exit(0);
    });
  });
};
