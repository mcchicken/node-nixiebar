var supertest = require('supertest');
var api = supertest('http://localhost:8080');
var RestServer = require('../lib/rest-server');

describe('rest server', function() {
    var server;
    beforeEach(function() {
        server = new RestServer([]);
        server.start();
    });

    it('should add a user upon request', function() {
        api.put('/users/jimbob').expect(204);
    });

    it('should start the cron job upon request', function() {
        api.post('/jobs/nixiebar').expect(204);
    });

    it('should stop the cron job upon request', function() {
        api.post('/jobs/nixiebar').expect(204);
        api.post('/jobs/nixiebar').expect(204);
    });
});