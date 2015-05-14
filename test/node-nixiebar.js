var expect = require('chai').expect;
var http = require('http');
var RestServer = require('../lib/rest-server').RestServer;
var NixieCron = require('../lib/nixietube-cron').NixieCron;

describe('rest server', function() {
    var server = new RestServer([], []);
    server.start();

    describe('REST APIs', function() {
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

    describe('Untappd Client', function() {
        var isClientCalled = false;
        var isDisplayShown = false;
        var untappdUser;

        var untappd_client = {
            getUniqueBeersFor : function(user, callback) {
                isClientCalled = true;
                untappdUser = user;
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
            nixie_cron.startJob();
        });

        afterEach(function() {
            nixie_cron.stopJob();
        });

        it('should send request for username in cron job', function(done) {
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
    });
});