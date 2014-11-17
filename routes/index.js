var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

/* GET home page. */
router.get('/', function(req, res) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200'
    });
    client.search({
        q: 'pants'
    }).then(function (body) {
        console.log(body);
        res.render('index', { title: 'Express' });
    });
});

router.post('/search', function (req, res) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200'
    });

    client.search({
        index: 'artists',
        q: req.body.query
    }).then(function (body) {
        console.log(body);
        res.render('search', { results: body });
    });
})

module.exports = router;
