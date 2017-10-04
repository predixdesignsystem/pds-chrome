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
  });
});
