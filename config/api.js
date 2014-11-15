var fs = require('fs');
var path = require('path');

function get(key) {
  var file = false, data, config;

  if (typeof key !== "string")
    return file;

  file = path.join(__dirname, 'api.json');

  config = fs.readFileSync(file);
  config = JSON.parse(config);

  return config[key.toUpperCase()];
}

module.exports = {
    get: get
};

