var expect = require('chai').expect;
var http = require('http');
var RestServer = require('../lib/rest-server').RestServer;
var NixieCron = require('../lib/nixietube-cron').NixieCron;

describe('Nixie Bar', function() {
    var server = new RestServer([], []);
    server.start();

    describe('rest server', function() {
        beforeEach(function() {
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users",
                "method" : "DELETE"});
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

        it('should get all users upon request', function() {
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users/jimbob",
                "method" : "PUT"});
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users/pirate",
                "method" : "PUT"});
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users",
                "method" : "GET"});
            expect({username:"jimbob"}, {username:"pirate"});
        });

        it('should delete users upon request', function() {
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users/jimbob",
                "method" : "PUT"});
            expect(201);
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users",
                "method" : "DELETE"});
            expect(201);
            http.request({ "hostname" : "localhost",
                "port" : 8080,
                "path" : "/users",
                "method" : "GET"});
            expect({});
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

    describe('cron job', function() {
        var isClientCalled = false;
        var isDisplayShown = false;
        var untappdUser;
        var untappd_client = {
            getUniqueBeersFor : function(user, callback) {
                isClientCalled = true;
                untappdUser = user;
                callback();
            }
        }
        var nixie_display = {
            display : function() {
                isDisplayShown = true;
            }
        }
        var nixie_cron = new NixieCron([{username:"zombie_killer"}], untappd_client, nixie_display);

        beforeEach(function() {
            isClientCalled = false;
            isDisplayShown = false;
            untappdUser = null;
            nixie_cron.startJob();
        });

        afterEach(function() {
            nixie_cron.stopJob();
        });

        it('should send request for provided Untappd user', function(done) {
            setTimeout(function() {
                expect(untappdUser.username).to.equal("zombie_killer");
                done();
            }, 1005);
        });

        it('should get unique beers for user after a second', function(done) {
            setTimeout(function() {
                expect(isClientCalled).to.be.true;
                done();
            }, 1005);
        });

        it('should send unique beer count for user to nixie tubes for display', function(done) {
            setTimeout(function() {
                expect(isDisplayShown).to.be.true;
                done();
            }, 1005);
        });
    });
});