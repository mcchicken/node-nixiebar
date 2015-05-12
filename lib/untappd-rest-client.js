var restify = require('restify');

var UntappdClient = function(client_id, client_secret) {
    var host = function() {
        return "https://api.untappd.com";
    }

    var userInfoUrl = function(username) {
        return '/v4/user/info/' + username + '?client_id=' + client_id + '&client_secret=' + client_secret;
    }

    UntappdClient.host = host;
    UntappdClient.userInfoUrl = userInfoUrl;
};

UntappdClient.prototype = {
    getUniqueBeersFor : function(user, callback) {
        var client = restify.createJsonClient({ url : UntappdClient.host() });
        client.get(UntappdClient.userInfoUrl(user.username),
            function(err, req, res, obj) {
                if(err) {
                    console.log("An error occurred fetching unique beers from Untappd: ", err);
                } else {
                    callback(user, obj.response.user.stats.total_beers);
                }
            }
        );
    }
}

exports.UntappdClient = UntappdClient;