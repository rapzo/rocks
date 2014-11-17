var Schema = require('mongoose').Schema;
var mongoosastic = require('mongoosastic');

var Album = new Schema({
    name: { type: String, es_indexed: true }
}, {
  strict: false
});

Album.plugin(mongoosastic);

module.exports = Album;
