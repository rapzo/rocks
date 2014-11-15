var Spotify = require('spotify-web-api-node');
var Echo = require('echojs');
var debug = require('debug')('ROCKS');
var http = require('http');
var querystring = require('querystring');

var config = require('config/api');
var SPOTIFY = config.get('spotify');
var ECHONEST = config.get('echonest');



function Sacador() {
  var self = this;

  if (!(self instanceof Sacador)) return new Sacador();

  self.api = new Spotify({
    clientId: SPOTIFY.CLIENT_ID,
    clientSecret: SPOTIFY.CLIENT_SECRET
  });

  self.echo = Echo({
      key: ECHONEST.KEY
  });

  self.search = function search(url, query, cb) {
    self.echo(url).get(query, function (err, data) {
        if (err) return cb(err, null);

        if (!data) return cb({ error: 0, message: 'falhou...' }, null);

        if (data.response.status.code == '400')
            return cb({ error: 400, message: data.response.status.message });

        return cb(null, data.response);
    });
  };
}

Sacador.prototype.artists = function (input, buckets, cb) {
    this.search(
        'artist/search',
        {
            name: input,
            bucket: buckets
        },
        function (err, done) {
            if (err) return cb(err, null);
            console.log(done)
            return cb(null, done.artists);
        }
    );
};

Sacador.prototype.songs = function (id, limit, cb) {
    this.search(
        'artist/songs',
        {
            id: id,
            results: limit
        },
        function (err, done) {
            if (err) return cb(err, null);
            return cb(null, done.songs);
        }
    );
};

Sacador.prototype.song = function (artist, title, buckets, cb) {
    this.search(
        'song/search',
        {
            artist: artist,
            title: title,
            bucket: buckets
        },
        function (err, done) {
            if (err) return cb(err, null);
            return cb(null, done.songs);
        }
    );
};

Sacador.prototype.lyrics = function (id, cb) {
    var url = 'http://test.lyricfind.com/api_service/lyric.do';

    // ?apikey=2233d1d669999ce64ee0eb073d6da191&reqtype=default&trackid=
    http.get(
        url + querystring.stringify({
            apikey: ECHONEST.KEY,
            reqtype: 'default',
            output: 'json',
            trackid: 'elid:1f27be0b3f612a135955609dc9125f49'
        }),
        function (res) {
//            console.log(res);
            res.on('data', function (data) {
                console.log(new Buffer(data).toString());
            });
        })
};

/**
 *
 *

 echo('artist/profile').get({
  id: 'ARH6W4X1187B99274F',
  bucket: ['id:7digital-US', 'id:spotify-WW', 'id:twitter']
}, function (err, json) {
  var foreign_ids = json.response.artist.foreign_ids;
  console.log('Radiohead\'s IDs on other services:');
  console.log(json.response.artist);

  echo('artist/profile').get({
    id: foreign_ids[0].foreign_id
  }, function (err, json) {
    console.log('\n...and from', foreign_ids[0].foreign_id, 'back to Echonest:');
    console.log(json.response);
  });
});

 *
 *
 */

module.exports = Sacador;
