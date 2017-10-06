const e2eServer = require('./e2e-server/server.js')();
const chromedriver = require('chromedriver');

module.exports = {
  before : function(done) {
    if (!process.env.TRAVIS) {
      chromedriver.start();
    }
    e2eServer.start(3999);

    done();
  },

  after : function(done) {
    if (!process.env.TRAVIS) {
      chromedriver.stop();
    }
    e2eServer.stop();

    done();
  }
};
