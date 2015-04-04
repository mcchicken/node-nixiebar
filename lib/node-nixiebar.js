var restify = require('restify');
var CronJob = require('cron').CronJob;
var Untappd = require('./untappd', false);

var untappd = new Untappd(process.argv[2], process.argv[3]);
var users = [];

var job = new CronJob('1 * * * * *', function() {
        users.forEach(function(user) {
            var client = restify.createJsonClient({ url : untappd.host() });
            client.get(untappd.getUserInfoUrl(user.username),
                function(err, req, res, obj) {
                    if(err) {
                        console.log("An error ocurred:", err);
                    } else {
                        //TODO: send this to nixie counter when it arrives from kickstarter
                        console.log("Send unique beers (%s) to nixie counter for %s"
                            , obj.response.user.stats.total_beers
                            , user.username);
                    }
                });
        });
    }, function () {
        console.log('Nixiebar stopped.');
    }
);

var server = restify.createServer();

var updateJob = function(req, res, next) {
    if(job.running) {
        job.stop();
    } else {
        job.start();
    }
    res.send(204);
    next();
}

var addUser = function(req, res, next) {
    users.push({"username":req.params.username});
    res.send(204);
    return next();
}

server.use(restify.bodyParser());
server.put('/users/:username', addUser);
server.post('/jobs/nixiebar', updateJob);
server.listen(8080);