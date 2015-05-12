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
        if(req.params.interval && jobs[req.params.name]) {
            try {
                jobs[req.params.name].setInterval(req.params.interval);
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
        if(jobs[req.params.name]) {
            jobs[req.params.name].start();
            console.log("Started job %s", jobs[req.params.name]);
            res.send(204);
        } else {
            res.send(404, "Invalid job name %s provided.", req.params.name);
        }
        next();
    }

    var updateStopSetting = function(req, res, next) {
        if(jobs[req.params.name]) {
            jobs[req.params.name].stop();
            console.log("Stopped job %s", jobs[req.params.name]);
            res.send(204);
        } else {
            res.send(404, "Invalid job name %s provided.", req.params.name);
        }
        next();
    }

    var server = restify.createServer();

    server.use(restify.bodyParser());
    server.get('/users', getUsers);
    server.put('/users/:username', addUser);
    server.put('/jobs/:name/settings/interval', updateIntervalSetting);
    server.put('/jobs/:name/settings/start', updateStartSetting);
    server.put('/jobs/:name/settings/stop', updateStopSetting);

    RestServer.server = server;
};

RestServer.prototype = {
    start : function() {
        RestServer.server.listen(8080);
        console.log("Nixiebar rest server has started.");
    }
}

exports.RestServer = RestServer;