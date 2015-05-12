var restify = require('restify');

var RestServer = function(users, jobs) {
    var addUser = function(req, res, next) {
        users.push({username : req.params.username});
        res.send(204);
        next();
    }

    var getUsers = function(req, res, next) {
        res.send(200, JSON.stringify(users));
        next();
    }

    var updateIntervalSetting = function(req, res, next) {
        var job = jobs[req.params.name];
        if(req.params.interval && job) {
            try {
                job.setInterval(req.params.interval);
                res.send(204, "Interval set to %s", req.params.interval);
            } catch (Error) {
                res.send(400, "Interval %s is invalid", req.params.interval);
            }
        } else {
            res.send(400, "Interval was not specified.");
        }
        next();
    }

    var updateStartSetting = function(req, res, next) {
        var job = jobs[req.params.name];
        if(job) {
            job.startJob();
            console.log("Started job %s", req.params.name);
            res.send(204);
        } else {
            res.send(404, "Invalid job name %s provided.", req.params.name);
        }
        next();
    }

    var updateStopSetting = function(req, res, next) {
        var job = jobs[req.params.name];
        if(job) {
            job.stopJob();
            console.log("Stopped job %s", req.params.name);
            res.send(204);
        } else {
            res.send(404, "Invalid job name %s provided.", req.params.name);
        }
        next();
    }

    var server = restify.createServer();

    server.use(restify.bodyParser());
    server.put('/users/:username', addUser);
    server.put('/jobs/:name/settings/interval', updateIntervalSetting);
    server.put('/jobs/:name/settings/start', updateStartSetting);
    server.put('/jobs/:name/settings/stop', updateStopSetting);
    server.get('/users', getUsers);

    RestServer.server = server;
};

RestServer.prototype = {
    start : function() {
        RestServer.server.listen(8080);
        console.log("Nixiebar rest server has started.");
    }
}

exports.RestServer = RestServer;