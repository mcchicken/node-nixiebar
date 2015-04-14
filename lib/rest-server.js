var restify = require('restify');

var NixieBarRestServer = function(users, job) {
    var server = restify.createServer();

    this.start = function() {
        server.listen(8080);
    }

    this.addUser = function(req, res, next) {
        users.push({"username":req.params.username});
        res.send(204);
        return next();
    }

    this.updateJob = function(req, res, next) {
        if(job.running) {
            job.stop();
        } else {
            job.start();
        }
        res.send(204);
        next();
    }

    server.use(restify.bodyParser());
    server.put('/users/:username', this.addUser);
    server.post('/jobs/nixiebar', this.updateJob);
};

module.exports = NixieBarRestServer;