var UntappdClient = function(client_id, client_secret) {
    this.host = function() {
        return "https://api.untappd.com";
    }

    this.getUserInfoUrl = function(username) {
        return '/v4/user/info/' + username + '?client_id=' + client_id + '&client_secret=' + client_secret;
    }
};

module.exports = UntappdClient;