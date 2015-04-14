var CronJob = require('cron').CronJob;
var UntappdClient = require('./untappd-rest-client');
var RestServer = require('./rest-server');
var NixieTubeDisplay = require('./nixietube-display');

var untappd_client = new UntappdClient(process.argv[2], process.argv[3]);
var users = [];
var nixie_bar = new NixieTubeDisplay();

var job = new CronJob('1 * * * * *', function() {
        users.forEach(function(user) {
            untappd_client.getUniqueBeersFor(user, nixie_bar.display);
        });
    }, function () {
        console.log('Nixiebar stopped.');
    }
);

var rest_server = new RestServer(users, job);
rest_server.start();