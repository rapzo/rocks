var mongoose = require('mongoose');
var debug = require('debug')('rocks:database');

module.exports = function (url, next) {
  var db = mongoose.connection;

  mongoose.connect(url);
  db.on('connected', function () { debug('connected'); next(); });
  db.on('reconnected', function () { debug('reconnected'); next(); });
  db.on('disconnected', function () { debug('disconnected'); next() });
  db.on('closed', function() { degub('closed'); next(); });

  // Load models
  require('models')();

  return db;
};
