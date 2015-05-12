var expect = require('chai').expect;
var http = require('http');
var RestServer = require('../lib/rest-server').RestServer;

describe('rest server', function() {
    var server;
    var users = [];

    beforeEach(function() {
        users = [{}];
        server = new RestServer(users, []);
        server.start();
    });

    it('should add a user upon request', function() {
        http.request({ "hostname" : "localhost",
            "port" : 8080,
            "path" : "/users/jimbob",
            "method" : "PUT"});
        http.request({ "hostname" : "localhost",
            "port" : 8080,
            "path" : "/users",
            "method" : "GET"});
        expect({username:"jimbob"});
    });

    it('should start the cron job upon request', function() {
        http.request({hostname: "localhost",
            port : 8080,
            path : "/jobs/nixiebar/settings/start",
            method : "PUT"});
        expect(204);
    });

    it('should stop the cron job upon request', function() {
        http.request({hostname: "localhost",
            port : 8080,
            path : "/jobs/nixiebar/settings/stop",
            method : "PUT"});
        expect(204);
    });
});