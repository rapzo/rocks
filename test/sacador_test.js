var Sacador = require('lib/sacador');
var expect = require('chai').expect;

describe('Sacador ole!', function () {
    var sac;

    before(function () {
        this.sac = Sacador();
    });

    it('should get artists', function (done) {
        this.sac.artists('white stripes', [], function (err, data) {
            if (err) console.log(err);
            else expect(data).to.not.be.empty();

            done();
        });
    });

});
