var NixieTubeDisplay = function() {
    //TODO: Initialize GPIO pins and any other Raspberry PI configuration
};

NixieTubeDisplay.prototype = {
    display : function(user, uniqueBeers) {
        //TODO: send this to nixie counter when it arrives from kickstarter
        console.log("Send unique beers (%s) to nixie counter for %s", uniqueBeers, user.username);
    }
};

exports.NixieTubeDisplay = NixieTubeDisplay;
