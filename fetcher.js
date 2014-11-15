var Sacador = require('./lib/sacador');
var SPOTIFY = require('config').get('spotify');
var Spotify = require('spotify-web-api-node');
var _ = require('lodash');

var sac = Sacador();
var keywords = [
    'beautiful',
    'love',
    'peace',
    'amor',
    'eyes',
    'melhor',
    'stars',
    'fire',
    'up',
    'need',
    'call',
    'say',
    'dance',
    'bang'
];

var results = [];


var api = new Spotify({
  clientId : SPOTIFY.CLIENT_ID,
  clientSecret : SPOTIFY.CLIENT_SECRET
});

keywords.forEach(function (key) {
    api.searchArtists(key)
      .then(function (data) {
        console.log(data.artists.items[0]);
        return data.artists.items.map(function (artist) {
          results.push(artist);
          return artist.id;
        });
        refetch(results);
      })
      .then(function (artistsIds) {
        console.log(artistsIds);
      });
});

