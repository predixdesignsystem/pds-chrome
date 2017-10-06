module.exports = {
  "src_folders" : ["test/e2e"],
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "./test/nightwatch.globals.js",

  "selenium" : {
    "start_process" : true,
    "server_path" : "./bin/vendor/selenium-server-standalone-3.6.0.jar",
    "log_path" : "",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./bin/vendor/chromedriver_mac64"
    }
  },

  "test_settings" : {
    "default" : {
      "selenium_port" : 4444,
      "selenium_host" : "localhost",
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName" : "chrome",
        "javascriptEnabled" : true,
        "acceptSslCerts" : true
      },
      "globals" : {
        "e2eServerBaseURL" : "http://localhost:3999"
      }
    },
    "travis" : {
      "selenium_port" : 80,
      "selenium_host" : "ondemand.saucelabs.com",
      "silent" : true,
      "username" : process.env.SAUCE_USERNAME,
      "access_key" : process.env.SAUCE_ACCESS_KEY,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "tunnel-identifier" : process.env.TRAVIS_JOB_NUMBER,
        "build" : `build-${process.env.TRAVIS_JOB_NUMBER}`
      },
      "globals" : {
        "e2eServerBaseURL" : "http://ondemand.saucelabs.com:80"
      }
    },
  },
  "test_runner" : "mocha",
  /* Local chrome */
  "chrome": { // your local Chrome browser (chromedriver)
    "desiredCapabilities": {
      "browserName": "chrome",
      "javascriptEnabled": true,
      "acceptSslCerts": true
    }
  },
  /* Browsers used on saucelabs */
  "chromesauce": {
    "desiredCapabilities": {
      "browserName": "chrome",
      "platform": "OS X 10.11",
      "version": "47",
   },
  },
};
