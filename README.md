# pds-chrome

A Predix Design System "Cirrus" theme for ui-app-hub.

## How to install

1. Clone this repo and `cd` into it
2. Run `npm install` (or `yarn install`) to install dependencies
3. Run `npm run start` to serve the files locally for ui-app-hub

## How to demo in ui-app-hub

You'll need to download and run the following repos on your computer:

### [px-sample-microapp](https://github.build.ge.com/212584602/px-sample-microapp) (port 9004)

1. Clone [the repo](https://github.build.ge.com/212584602/px-sample-microapp) and `cd` into it
2. Run `npm install` (or `yarn install`) to install dependencies
3. Run `npm run start`

### [ui-microapp](https://github.build.ge.com/hubs/ui-microapp) (port 9000)

1. Clone [the repo](https://github.build.ge.com/hubs/ui-microapp) and `cd` into it
2. Run `npm install` (or `yarn install`) to install dependencies
3. Run `npm run start`

### [ui-config-service](https://github.build.ge.com/hubs/ui-config-service) (port 3100)

1. Clone [the repo](https://github.build.ge.com/hubs/ui-config-service) and `cd` into it
2. Run `npm install` (or `yarn install`) to install dependencies
3. Replace the `localconfig.json` with the following:

```
{
  "tenant": {
    "tenancyMode": "single",
    "singleTenant" : {
      "id": "local-single-tenant-mode",
      "uaaServer": "https://dd8418b1-b93e-4e88-be62-172b2020ebf0.predix-uaa.run.asv-pr.ice.predix.io",
      "uaaClientId": "sessionproxy",
      "uaaClientSecret": "blahblah",
      "configServiceHost": "http://localhost:3100",
      "route": "localhost",
      "contextPath": "",
      "serverURL": "http://localhost:3000",
      "customHeader": {
        "foo":"bar",
        "Cache-Control": "public, max-age=1209600"
      }
    },
    "hubConfigService": "http://localhost:3100",
    "searchPath": "/tenant"
  },
  "config": {
    "name": "PDS AppHub Demo",
    "user": {
      "name": "Edison1879",
      "firstName": "Thomas",
      "lastName": "Edison",
      "picture": "/ui-hub-assets/images/avatar.jpg"
    },
    "preferences": {
      "preferredLocale" : "en"
    },
    "theme": {
      "baseUri": "http://localhost:3005",
      "main": "src/main.handlebars",
      "options": {
        "nav": {
          "position": "horizontal"
        },
        "brandingBar": {
          "disabled": false,
          "hidePoweredByPredix": false,
          "hideGELogo": false
        }
      }
    },
    "apps": [
      {
        "id":"local",
        "host":"http://localhost:9000",
        "path":"/local",
        "template":"/index.html",
        "default": true,
        "items": [
          {
            "id": "local",
            "label": "Dashboards",
            "icon": "px-fea:dashboard",
            "path": "/local/#/",
            "items": [
              {
                "label": "Service Dashboard",
                "id": "local.dashboards",
                "path": "/local/#/subnav1"
              },
              {
                "label": "User Dashboard",
                "id": "local.dashboards",
                "path": "/local/#/subnav2"
              }
            ]
          }
        ]
      },
      {
        "id": "analytics",
        "location": "main",
        "host": "http://localhost:9004",
        "path": "/analytics",
        "template": "/index.html",
        "items": [
          {
            "id": "analytics",
            "label": "Analytics",
            "icon": "px-fea:analytics",
            "path": "/analytics/#/",
            "items": [
              {
                "label": "Dashboard",
                "id": "analytics.dashboard",
                "path": "/analytics/#/dashboard"
              },
              {
                "label": "Tabs",
                "id": "analytics.dashboards",
                "path": "/analytics/#/tabs"
              },
              {
                "label": "Inbox",
                "id": "analytics.dashboards",
                "path": "/analytics/#/inbox"
              }
            ]
          }
        ]
      },
      {
        "id":"user",
        "location": "profile",
        "host":"http://localhost:9001",
        "path":"/user",
        "template":"/index.html",
        "navService":"/nav"
      },
      {
        "id":"settings",
        "location": "settings",
        "host":"http://localhost:9002",
        "path":"/settings",
        "template":"/index.html",
        "navService":"/nav"
      }
    ]
  }
}
```

4. Run `PORT=3100 npm run start`

### [ui-app-hub](https://github.build.ge.com/212584602/ui-app-hub) (port 3000)

Make sure you clone [from this link](https://github.build.ge.com/212584602/ui-app-hub), which is to a temporary fork of ui-app-hub that includes some minor code changes that will be pulled into the main trunk soon.

1. Clone [the repo](https://github.build.ge.com/212584602/ui-app-hub) and `cd` into it
2. Run `npm install` (or `yarn install`) to install dependencies
3. Replace the `localconfig.json` with the following:

```
{
  "tenant": {
    "tenancyMode": "single",
    "singleTenant" : {
      "id": "local-single-tenant-mode",
      "uaaServer": "https://dd8418b1-b93e-4e88-be62-172b2020ebf0.predix-uaa.run.asv-pr.ice.predix.io",
      "uaaClientId": "sessionproxy",
      "uaaClientSecret": "blahblah",
      "configServiceHost": "http://localhost:3100",
      "route": "localhost",
      "contextPath": "",
      "serverURL": "http://localhost:3000",
      "customHeader": {
        "foo":"bar",
        "Cache-Control": "public, max-age=1209600"
      }
    },
    "hubConfigService": "http://localhost:3100",
    "searchPath": ""
  }
}
```

4. Run `bower install`
5. `cd` into your local copy of the `pds-chrome`, and run `bower link`
6. In the `ui-app-hub` repo, run `bower link pds-chrome`
7. Run `npm run start`

### You're up and going

Make sure you have the following running:

* pds-chrome server
* px-sample-microapp server
* ui-microapp server
* ui-config-service server
* ui-app-hub server

Now, open http://localhost:3000/. For the login, use "demo/demo".

If you make any changes to the pds-chrome repo, you should get them automatically on page refresh.

If you can any changes to the ui-config-service configuration, you'll need to logout and log back in. Load http://localhost:3000/logout to logout, or close the browser and open in a new tab (no need to go incognito, sessions are not sticky across tabs).

## Configuring theme

The look and feel of the pds-chrome theme can be configured through the ui-app-hub config service. Configurations are global across an ui-app-hub instance, and can't be changed for each micro app.

This configuration should be added to the ui-app-hub core configuration JSON file:

```json
"theme": {
  "baseUri": "http://url-of-server-running-pds-chrome.example.com",
  "main": "src/main.handlebars",
  "options": {}
}
```

The following `options` can be sent:

* `brandingBar` | `{object}`
  * `disabled` | `{boolean=true}` | Hides the branding bar
