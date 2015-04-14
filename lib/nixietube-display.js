var NixieTubeDisplay = function() {
    this.display = function(user, uniqueBeers) {
        //TODO: send this to nixie counter when it arrives from kickstarter
        console.log("Send unique beers (%s) to nixie counter for %s", uniqueBeers, user.username);
    }
};

module.exports = NixieTubeDisplay
