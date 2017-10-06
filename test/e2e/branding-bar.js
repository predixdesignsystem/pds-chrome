describe('[branding bar]', function() {
  describe('[default]', function() {
    before(function(client, done) {
      done();
    });

    after(function(client, done) {
      client.end(function() {
        done();
      });
    });

    afterEach(function(client, done) {
      done();
    });

    beforeEach(function(client, done) {
      done();
    });

    it('Shows the `appname` passed to the handlebars template by default', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .assert.containsText('#branding-bar label', 'PDS Chrome Test');
    });

    it('Shows the GE logo next to the app name by default', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .assert.visible('#branding-bar px-ge-svg-logo');
    });

    it('Shows the Powered By Predix text and logo by default', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .assert.containsText('#branding-bar .px-branding-bar__powered-by-text', 'Powered by')
        .assert.visible('#branding-bar predix-logo');
    });

    it('Shows the branding bar on desktop screen sizes by default', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .assert.visible('#branding-bar');
    });
  });

  // describe('[with configuration]', function() {
  //   before(function(client, done) {
  //     done();
  //   });
  //
  //   after(function(client, done) {
  //     client.end(function() {
  //       done();
  //     });
  //   });
  //
  //   afterEach(function(client, done) {
  //     done();
  //   });
  //
  //   beforeEach(function(client, done) {
  //     done();
  //   });
  // });
});
