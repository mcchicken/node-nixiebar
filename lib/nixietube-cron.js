var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;

var NixieCron = function(users, untappd_client, nixie_bar) {
    var defaultJob = new CronJob('1 * * * * *', function () {
            users.forEach(function (user) {
                untappd_client.getUniqueBeersFor(user, nixie_bar.display);
                console.log("Retrieved unique beers for %s from Untappd.", user.username);
            });
        }
    );
    NixieCron.defaultJob = defaultJob;
};

NixieCron.prototype = {
    setInterval : function(cron_pattern) {
        var cron_time = new CronTime(cron_pattern);
        NixieCron.defaultJob.setTime(cron_time);
    },
    startJob : function() {
        NixieCron.defaultJob.start();
    },
    stopJob : function() {
        NixieCron.defaultJob.stop();
    }
}

exports.NixieCron = NixieCron;