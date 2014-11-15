var mongoose = require('mongoose');
var Sacador = require('lib/sacador');
var db = require('config/db');

//
//sac.artists('white stripes', function (err, data) {
//  if (err) console.log(err);
//  else console.log(data);
//});


// sac.song(
//   'white stripes', 'seven nation army', ['id:lyricfind-US'],
//   function (err, data) {
//     if (err) return console.log(err);
// 
//     data.forEach(function (item) {
//       console.log(item)
// 
//       item.artist_foreign_ids.forEach(function (id) {
//         sac.lyrics(id.foreign_id, function (err, data) {
//             if (err) console.log(err);
//             else console.log(data);
//         });
//       })
//     })
//   }
// );

var keywords = [
    'beautiful', 'love', 'peace', 'amor', 'eyes', 'melhor',
    'stars', 'fire', 'up', 'need', 'call', 'say', 'dance', 'bang',
    'death', 'blood', 'cage', 'white', 'black', 'blue', 'jazz',
    'rock', 'symphony', 'rage', 'red', 'heavy', 'wolf'
];


db('mongodb://localhost/rocks', function () {
    var sac = Sacador();
    var Artist = mongoose.model('artist');
    var artist;

    keywords.forEach(function (key) {
        sac.artists(key, ['id:spotify', 'id:musixmatch-WW', 'musicbrainz'], function (err, data) {
            if (err) return console.log(err);

            artist = new Artist();
            artist.set(data);

            artist.save(function (err, a) {
                if (err) return console.log(err);

                console.log(a.id + ' saved.');
            });
        });
    });
});
