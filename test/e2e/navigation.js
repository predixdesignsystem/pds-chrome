describe('[navigation]', function() {
  describe('[initial]', function() {
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

    it('Loads the microapp from the initial shell URL as a chromeless page in an iframe', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .assert.attributeEquals('#app', 'src', client.globals.e2eServerBaseURL + '/local/dashboards/?chromeless=true');
    });

    it('Includes the URL hash and query from the initial shell URL in the iframe URL', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/?data=val#/subnav1')
        .pause(500)
        .assert.attributeEquals('#app', 'src', client.globals.e2eServerBaseURL + '/local/dashboards/?chromeless=true&data=val#/subnav1');
    });

    it('Updates the shell URL and iframe URL when a navigation item is tapped', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        // Open 'Dashboards' navigation dropdown
        .click('#app-nav px-app-nav-group px-app-nav-item')
        .pause(250)
        // Selects 'Dashboards Subpage 1' dashboard item
        .click('#app-nav px-app-nav-group iron-dropdown px-app-nav-subitem')
        .pause(250)
        // Check that the URL was updated
        .assert.urlEquals(client.globals.e2eServerBaseURL + '/local/dashboards/#/subnav1')
        .execute(function() {
          return document.querySelector('#app').contentWindow.location.href;
        }, [], function(result) {
          client.assert.equal(result.value, client.globals.e2eServerBaseURL + '/local/dashboards/?chromeless=true#/subnav1')
        });
    });

    it('Loads a new microapp in the iframe when a navigation item is tapped', function(client, done) {
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        // Open 'Analytics' navigation dropdown
        .click('#app-nav px-app-nav-group:nth-of-type(2) px-app-nav-item')
        .pause(250)
        // Selects 'Analytics Subpage 2' dashboard item
        .click('#app-nav px-app-nav-group:nth-of-type(2) iron-dropdown px-app-nav-subitem:nth-of-type(2)')
        .pause(250)
        // Check that the URL was updated
        .assert.urlEquals(client.globals.e2eServerBaseURL + '/local/analytics/#/subnav2')
        .execute(function() {
          return document.querySelector('#app').contentWindow.location.href;
        }, [], function(result) {
          client.assert.equal(result.value, client.globals.e2eServerBaseURL + '/local/analytics/?chromeless=true#/subnav2')
        });
    });

    it('Updates the shell URL when the iframe URL changes in a way that triggers the `onhashchange` listener', function(client, done) {
      var newFrameUrl = client.globals.e2eServerBaseURL + '/local/dashboards/?chromeless=true#/subnav1';
      var newShellUrl = client.globals.e2eServerBaseURL + '/local/dashboards/#/subnav1';
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .execute('document.querySelector(\'#app\').contentWindow.location.replace(\''+newFrameUrl+'\', false)')
        .assert.urlEquals(newShellUrl);
    });

    it('Updates the shell URL and loads a new app in the iframe when an iframe link is clicked for the same origin', function(client, done) {
      var newFrameUrl = client.globals.e2eServerBaseURL + '/local/analytics/?chromeless=true#/subnav1';
      var newShellUrl = client.globals.e2eServerBaseURL + '/local/analytics/#/subnav1';
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .frame('app')
        .click('a[id="same-origin"]')
        .frame(null)
        .assert.urlEquals(newShellUrl)
        .execute(function() {
          return document.querySelector('#app').contentWindow.location.href;
        }, [], function(result) {
          client.assert.equal(result.value, newFrameUrl);
        });
    });

    it('Loads a new site in the shell window when an iframe link is clicked for a different origin', function(client, done) {
      var newFrameUrl = client.globals.e2eServerBaseURL + '/local/analytics/?chromeless=true#/subnav1';
      var newShellUrl = client.globals.e2eServerBaseURL + '/local/analytics/#/subnav1';
      client
        .url(client.globals.e2eServerBaseURL + '/local/dashboards/')
        .pause(500)
        .frame('app')
        .click('a[id="different-origin"]')
        .frame(null)
        .assert.urlEquals('https://example.com/')
        .assert.containsText('body', 'Example Domain');
    });

    it('Does not intercept link clicks for links with attribute target="_blank"', function(client, done) {
      var initialUrl = client.globals.e2eServerBaseURL + '/local/dashboards/';
      client
        .url(initialUrl)
        .pause(500)
        .frame('app')
        .click('a[id="target-blank"]')
        .frame(null)
        .assert.urlEquals(initialUrl)
        .execute(function() {
          return document.querySelector('#app').contentWindow.location.href;
        }, [], function(result) {
          client.assert.equal(result.value, initialUrl + '?chromeless=true');
        });
    });

    it('Does not intercept link clicks when link is clicked while command button is pressed', function(client, done) {
      var initialUrl = client.globals.e2eServerBaseURL + '/local/dashboards/';
      client
        .url(initialUrl)
        .pause(500)
        .frame('app')
        .keys([client.Keys.COMMAND])
        .click('a[id="same-origin"]')
        .keys(client.Keys.NULL)
        .frame(null)
        .assert.urlEquals(initialUrl)
        .execute(function() {
          return document.querySelector('#app').contentWindow.location.href;
        }, [], function(result) {
          client.assert.equal(result.value, initialUrl + '?chromeless=true');
        });
    });

    it('Does not intercept link clicks when link is clicked while shift button is pressed', function(client, done) {
      var initialUrl = client.globals.e2eServerBaseURL + '/local/dashboards/';
      client
        .url(initialUrl)
        .pause(500)
        .frame('app')
        .keys([client.Keys.SHIFT])
        .click('a[id="same-origin"]')
        .keys(client.Keys.NULL)
        .frame(null)
        .assert.urlEquals(initialUrl)
        .execute(function() {
          return document.querySelector('#app').contentWindow.location.href;
        }, [], function(result) {
          client.assert.equal(result.value, initialUrl + '?chromeless=true');
        });
    });
  });
});
