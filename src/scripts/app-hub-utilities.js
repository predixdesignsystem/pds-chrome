(function() {
  var AppHubUtil = window.AppHubUtil = function AppHubUtil(globalNavObject) {
    this._nav = globalNavObject;

    /* Attach global helper instances */
    this.Nav = new NavUtil(this._nav.main.items, this._nav.contextPath, this._nav.paths);
    this.Location = new LocationUtil(this._nav.contextPath, this._nav.paths);

    return this;
  };
  AppHubUtil.LocationUtil = LocationUtil;
  AppHubUtil.Helpers = {
  };

  var LocationUtil = function LocationUtil(contextPath, appPaths) {
    this._contextPath = contextPath;
    this._appPaths = appPaths;
    return this;
  };

  LocationUtil.prototype.getContextPath = function getContextPath() {
    return this._contextPath;
  };

  LocationUtil.prototype.getCurrentPath = function getCurrentPath() {
    return window.location.pathname + window.location.search + window.location.hash;
  };

  LocationUtil.prototype.getCurrentStatelessPath = function getCurrentStatelessPath() {
    return window.location.pathname + window.location.hash;
  };

  LocationUtil.prototype.getCurrentAppPath = function getCurrentAppPath() {
    var path = this.getCurrentPath();
    var context = this.getContextPath();
    if (context !== "" && path.indexOf(context) === 0) {
      path = path.slice(context.length);
    }
    return path;
  };

  LocationUtil.prototype.getCurrentAppId = function getCurrentAppId() {
    return parseAppIdFromPath(this.getCurrentPath(), this._appPaths).id;
  };

  LocationUtil.prototype.parseAppId = function parseAppId(path) {
    return parseAppIdFromPath(path, this._appPaths).id;
  };

  LocationUtil.parsePath = function parsePath(path) {

  };

  LocationUtil.prototype.addChromelessQuery = function addChromelessQuery(path) {
    var uriParts = parseUri(path);
    if (uriParts.queryKey.hasOwnProperty('chromeless') && uriParts.queryKey.chromeless === 'true') {
      return path;
    }
    return uriParts.path + '?chromeless=true' + (uriParts.query.length>0 ? '&' + uriParts.query : '') + (uriParts.anchor.length>0 ? '#' + uriParts.anchor : '');
  };

  function parseAppIdFromPath(path, appPaths) {
    /* Transform apps object into an array of {id, basePath} */
    var appPathsTable = Object.keys(appPaths).map(function(appId) {
      return {
        id: appId,
        path: appPaths[appId]
      };
    });
    for (var i=0; i<appPathsTable.length; i++) {
      if (path.indexOf(appPathsTable[i].path) === 0) {
        return appPathsTable[i];
      }
    }
    return {
      id: null,
      path: null
    };
  };

  function addToQuery(path, query) {
    var uriParts = parseUri(path);
    return uriParts.path + '?' + query + (uriParts.query.length>0 ? '&' + uriParts.query : '') + uriParts.anchor;
  };


  var NavUtil = function NavUtil(items, contextPath, microAppPaths) {
    this._items = items;
    this._contextPath = contextPath;
    this._microAppPaths = microAppPaths;
    return this;
  };

  NavUtil.prototype.getItems = function getItems() {
    return this._items;
  };

  NavUtil.prototype.getItemPath = function getItemPath(item) {
    return item.path;
  };

  /* Existing util */

  NavUtil.prototype.navigateToItemPath = function(item) {
    var newPath = this.getContextPath() + item.path;
    var newPathDetails = this.parsePath(newPath);
    var activePathDetails = this.getActivePathDetails();

    if (newPathDetails.fullMicroAppPath === activePathDetails.fullMicroAppPath) {
      /* This app has the same path. Don't do anything. */
      return newPath;
    }
    if (newPathDetails.microAppId !== activePathDetails.microAppId) {
      /* Load a new microapp. */
      console.log('Load a new micro app. Was %s, now %s', activePathDetails.microAppId, newPathDetails.microAppId);
      // @TODO: Figure out how to do this dynamically. For now, we'll do a full
      // refresh. In the future we should load the iFrame contents with
      // JavaScript and inject them into the page.
      // window.location.pathname = newPath;
      history.pushState(null, null, newPath);

      if (window.location.hash) {
        /**
         * If there is a hash, setting the location won't change the URL.
         * Calling reload will force a load from the server.
         */
        window.location.reload();
      }
    }
    if (window.location.search !== "") {
      /* Add existing query params to new path */
      newPath = addQueryToPath(newPath, window.location.search);
    }
    /* Push the new URL */
    history.pushState(null, null, newPath);
    /* Fire an event the microapp can catch */
    var navigateEvent = new CustomEvent('app-hub-nav-path-changed', {
      path: newPath,
      item: item
    });
    window.dispatchEvent(navigateEvent);
    return newPath;
  };

  NavUtil.prototype.findNavItemByPath = function(path) {
    if (!path || path === "") return null;
    var queue = this.getItems().slice(0);
    var item;
    while (queue.length !== 0) {
      item = queue.shift();
      if (item.path === path) {
        return item;
      }
      if (Array.isArray(item.items) && item.items.length > 0) {
        queue = queue.concat(item.items);
      }
    };
    return null;
  };

  /**
   * Returns the static "context" portion of the URL. If this is a multi-tenant
   * App Hub instance, the URL will be formatted like:
   * http://apphub-instance-name.domain.com/context/microAppPath/subpath
   *                                       ^^^^^^^^
   * If this is a single-tenant App Hub instance, returns an empty string.
   *
   * @return {string}
   */
  NavUtil.prototype.getContextPath = function() {
    return this._contextPath;
  };

  /**
   * Returns the "microapp" and subpath portion of the URL. If this is a multi-tenant
   * App Hub instance, the URL will be formatted like:
   * http://apphub-instance-name.domain.com/context/microAppPath/subpath
   *                                               ^^^^^^^^^^^^^^^^^^^^^
   *
   * @return {string}
   */
  NavUtil.prototype.getFullMicroAppPath = function() {
    var path = window.location.pathname + window.location.hash;
    var context = this.getContextPath();
    if (context.length > 0 && path.slice(0, context.length) === context) {
      path = path.slice(context.length);
    }
    return path;
  };

  NavUtil.prototype.getActivePathDetails = function() {
    var path = window.location.pathname + window.location.hash;
    return this.parsePath(path);
  };

  /**
   * Parses a full URL pathname and returns an object with the context, microapp
   * path, subpath, and full microapp path with subpath.
   *
   * @type {object} details
   * @type {string} details.contextPath
   * @type {object} details.microAppId
   * @type {string} details.microAppPath
   * @type {string} details.subPath
   * @type {string} details.fullMicroAppPath
   */
  NavUtil.prototype.parsePath = function(path) {
    var _path = path;
    var contextPath = this.getContextPath();
    var microAppPath = null;
    var subPath = null;
    var fullMicroAppPath = null;
    /* Slice context path off the beginning */
    if (contextPath.length > 0 && _path.slice(0, context.length) === contextPath) {
      _path = _path.slice(contextPath.length);
    }
    /* What remains is the full microAppPath */
    fullMicroAppPath = _path;
    /* Loop over microApp paths to find the correct one */
    var microAppDetails = findMicroAppInPath(_path, this._microAppPaths);
    return {
      contextPath: contextPath,
      microAppId: microAppDetails.id,
      microAppPath: microAppDetails.path,
      subPath: microAppDetails.subPath,
      fullMicroAppPath: fullMicroAppPath
    };
  };

  NavUtil.prototype.addQueryToPath = addQueryToPath;

  function findMicroAppInPath(path, microApps) {
    /* Transform apps object into an array of [microAppPath, microAppId] */
    var microAppPaths = Object.keys(microApps).map(function(appName) {
      return [microApps[appName], appName];
    });
    for (var i=0; i<microAppPaths.length; i++) {
      if (path.slice(0, microAppPaths[i][0].length) === microAppPaths[i][0]) {
        return {
          id: microAppPaths[i][1],
          path: microAppPaths[i][0],
          subPath: path.slice(microAppPaths[i][0].length)
        };
      }
    }
    return {
      id: null,
      path: null,
      subPath: path
    };
  };

  function addQueryToPath(pathWithHash, query) {
    var path;
    var hash;
    if (pathWithHash.indexOf('#') > -1) {
      var parts = pathWithHash.split('#');
      path = parts[0];
      hash = parts[1];
    } else {
      path = pathWithHash;
      hash = "";
    }
    return path + (query || "") + '#' + hash;
  };

  // function parsePath(pathname) {
  //   var path;
  //   var hash;
  //   var query;
  //   if (path.indexOf('#') > -1) {
  //     var parts = pathname.split('#');
  //     path = parts[0];
  //     hash = parts[1];
  //   }
  //   else {
  //     path = pathname;
  //     hash = '';
  //   }
  // };


})();


/* CustomEvent polyfill. Credit to https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent */
(function() {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
