
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('./test/untappd.js', [1,2,4,5,6,10,14,7,11,15], {}, ["var expect = require('chai').expect;","var Untappd = require('../lib/untappd.js');","","describe('untappd', function() {","    var untappd;","    beforeEach(function() {","        untappd = new Untappd(\"my client id\", \"my client secret\");","    });","","    it('should return Untappd API host URL', function() {","        expect(untappd.host()).to.equal(\"https://api.untappd.com\");","    });","","    it('should return Untappd API user info URL with client_id and client_secret', function() {","        expect(untappd.getUserInfoUrl(\"zombie\"))","            .to.equal(\"/v4/user/info/zombie?client_id=my client id&client_secret=my client secret\");","    });","});"]);
_$jscmd("./test/untappd.js", "line", 1);

var expect = require("chai").expect;

_$jscmd("./test/untappd.js", "line", 2);

var Untappd = require("../lib/untappd.js");

_$jscmd("./test/untappd.js", "line", 4);

describe("untappd", function() {
    _$jscmd("./test/untappd.js", "line", 5);
    var untappd;
    _$jscmd("./test/untappd.js", "line", 6);
    beforeEach(function() {
        _$jscmd("./test/untappd.js", "line", 7);
        untappd = new Untappd("my client id", "my client secret");
    });
    _$jscmd("./test/untappd.js", "line", 10);
    it("should return Untappd API host URL", function() {
        _$jscmd("./test/untappd.js", "line", 11);
        expect(untappd.host()).to.equal("https://api.untappd.com");
    });
    _$jscmd("./test/untappd.js", "line", 14);
    it("should return Untappd API user info URL with client_id and client_secret", function() {
        _$jscmd("./test/untappd.js", "line", 15);
        expect(untappd.getUserInfoUrl("zombie")).to.equal("/v4/user/info/zombie?client_id=my client id&client_secret=my client secret");
    });
});