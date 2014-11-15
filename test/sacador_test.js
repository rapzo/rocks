var Sacador = require('lib/sacador');

describe('Sacador ole!', function () {
    var sac;

    before(function () {
        this.sac = Sacador();
    });

    it('should get artists', function (done) {
        Sacador.artists('black');
        done();
    });

});
