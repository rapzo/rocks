var fs = require('fs');
var mongoose = require('mongoose');

function register() {
  var cb = arguments.length === 0 ? function () {} : arguments[arguments.length - 1];

  fs.readdir(__dirname, function (err, models) {
    if (err) return console.log(err);

    models.forEach(function (model) {
      if (model !== 'index.js') {
        var name = model.slice(0, -3);
        mongoose.model(name, require('models/' + name));
      }
    });

    cb();
  });
}

module.exports = register;
