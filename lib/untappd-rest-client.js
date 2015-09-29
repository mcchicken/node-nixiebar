var restify = require('restify');
var redis = require('then-redis');

var UntappdClient = function(client_id, client_secret) {
    const VALID_FOR = 5;
    var cache = redis.createClient();

    cache.on('error', function(err) {
        console.log('Error: ' + err);
    });

    var getCachedUser = function(username) {
        return cache.get(username);
    };

    var storeUserInCache = function(username, total_beers) {
        cache.set(username, total_beers);
        cache.expire(username, VALID_FOR);
    };

    var userTTL = function(username) {
        return cache.ttl(username);
    }

    var host = function() { return "https://api.untappd.com"; };

    var userInfoUrl = function(username) {
        return '/v4/user/info/' + username + '?client_id=' + client_id + '&client_secret=' + client_secret;
    };

    UntappdClient.host = host;
    UntappdClient.userInfoUrl = userInfoUrl;
    UntappdClient.getCachedUser = getCachedUser;
    UntappdClient.storeUserInCache = storeUserInCache;
    UntappdClient.userTTL = userTTL;
};

UntappdClient.prototype = {
    getUniqueBeersFor : function(user, callback) {
        UntappdClient.getCachedUser(user.username).then(function(total_beers) {
                if (total_beers !== null) {
                    UntappdClient.userTTL(user.username).then(function(ttl) {
                        console.log("Using cached value of %s for %s for another %s seconds", total_beers, user.username, ttl);
                        callback(user, total_beers);
                    });
                } else {
                    console.log("Retrieving total beers for %s from Untappd", user.username);
                    var client = restify.createJsonClient({url: UntappdClient.host()});
                    client.get(UntappdClient.userInfoUrl(user.username),
                        function (err, req, res, obj) {
                            if (err) {
                                console.log("An error occurred fetching unique beers from Untappd: ", err);
                            } else {
                                UntappdClient.storeUserInCache(user.username, obj.response.user.stats.total_beers);
                                callback(user, obj.response.user.stats.total_beers);
                            }
                        }
                    );
                }
            }
        );
    }
};

exports.UntappdClient = UntappdClient;