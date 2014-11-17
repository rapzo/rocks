var Schema = require('mongoose').Schema;
var mongoosastic = require('mongoosastic');

var Artist = new Schema({
    name: { type: String, es_indexed: true },
    genre: { type: Array, es_indexed: true },
    bio: { type: String, es_indexed: true }
}, {
  strict: false
});

Artist.plugin(mongoosastic);

module.exports = Artist;
