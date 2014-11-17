var Schema = require('mongoose').Schema;
var mongoosastic = require('mongoosastic');

var Track = new Schema({
    name: { type: String, es_indexed: true }
}, {
  strict: false
});

Track.plugin(mongoosastic);

module.exports = Track;
