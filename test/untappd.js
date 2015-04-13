var expect = require('chai').expect;
var Untappd = require('../lib/untappd.js');

describe('untappd', function() {
    var untappd;
    beforeEach(function() {
        untappd = new Untappd("my client id", "my client secret");
    });

    it('should return Untappd API host URL', function() {
        expect(untappd.host()).to.equal("https://api.untappd.com");
    });

    it('should return Untappd API user info URL with client_id and client_secret', function() {
        expect(untappd.getUserInfoUrl("zombie"))
            .to.equal("/v4/user/info/zombie?client_id=my client id&client_secret=my client secret");
    });
});