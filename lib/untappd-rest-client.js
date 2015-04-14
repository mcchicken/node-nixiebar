var restify = require('restify');

var UntappdClient = function(client_id, client_secret) {
    this.host = function() {
        return "https://api.untappd.com";
    }

    this.getUserInfoUrl = function(username) {
        return '/v4/user/info/' + username + '?client_id=' + client_id + '&client_secret=' + client_secret;
    }

    this.getUniqueBeersFor = function(user, callback) {
        var client = restify.createJsonClient({ url : this.host() });
        client.get(this.getUserInfoUrl(user.username),
            function(err, req, res, obj) {
                if(err) {
                    console.log("An error occurred fetching unique beers from Untappd: ", err);
                } else {
                    callback(user, obj.response.user.stats.total_beers);
                }
            }
        );
    }
};

module.exports = UntappdClient;