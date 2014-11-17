var Sacador = require('lib/sacador');
var assert = require('assert');
var SPOTIFY = require('config/api').get('spotify');
var Spotify = require('spotify-web-api-node');
var expect = require('chai').expect;

describe('Spotify ole!', function () {

    beforeEach(function () {
        this.spotify = new Spotify({
            clientId : SPOTIFY.CLIENT_ID,
            clientSecret : SPOTIFY.CLIENT_SECRET
        });
    });

    it('should get artists from a given input', function (done) {
        this.spotify.searchArtists('white stripes')
            .then(function (data) {
                data.artists.items.forEach(function (a) {
                    expect(a.id).not.be.undefined;
                })
            })
            .then(done)
            .catch(done);
    });
});
