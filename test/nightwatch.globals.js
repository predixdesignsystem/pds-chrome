const chromedriver = require('chromedriver');
const e2eServer = require('./e2e-server/server.js')();

module.exports = {
  before : function(done) {
    chromedriver.start();
    e2eServer.start(3999);

    done();
  },

  after : function(done) {
    chromedriver.stop();
    e2eServer.stop();

    done();
  }
};
