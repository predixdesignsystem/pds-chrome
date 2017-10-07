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
        .assert.elementPresent('#branding-bar predix-logo')
        .assert.visible('#branding-bar predix-logo');
    });

    it('Shows the branding bar on desktop screen sizes by default', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .assert.elementPresent('#branding-bar')
        .assert.visible('#branding-bar');
    });
  });

  describe('[with configuration]', function() {
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

    it('Hides the branding bar if `customThemeOptions.brandingBar.disabled` is true', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/?customThemeOptions[brandingBar][disabled]=true')
        .pause(500)
        .assert.elementNotPresent('#branding-bar');
    });

    it('Hides the app logo if `customThemeOptions.brandingBar.hideLogo` is true', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/?customThemeOptions[brandingBar][hideLogo]=true')
        .pause(500)
        .assert.elementNotPresent('#branding-bar px-ge-svg-logo');
    });

    it('Hides the "Powered by Predix" attribution if `customThemeOptions.brandingBar.hideAttribution` is true', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/?customThemeOptions[brandingBar][hideAttribution]=true')
        .pause(500)
        .assert.elementNotPresent('#branding-bar .px-branding-bar__powered-by-text')
        .assert.elementNotPresent('#branding-bar predix-logo');
    });
  });
});
