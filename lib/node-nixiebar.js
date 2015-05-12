/**
 * Application to run a group of Cron jobs for a group of users.  Default
 * job polls Untappd and displays results on a nixie tube counter.  Users
 * and jobs are managed via a rest server.
 */
var UntappdClient = require('./untappd-rest-client').UntappdClient;
var RestServer = require('./rest-server').RestServer;
var NixieTubeDisplay = require('./nixietube-display').NixieTubeDisplay;
var NixieCron = require('./nixietube-cron').NixieCron;

var users = [];
var jobs = [];

jobs["nixiebar"] = new NixieCron(users
    , new UntappdClient(process.argv[2], process.argv[3])
    , new NixieTubeDisplay());

var rest_server = new RestServer(users, jobs);
rest_server.start();