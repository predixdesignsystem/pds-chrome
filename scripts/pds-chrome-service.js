/**
 * Uses the UMD 'returnExports' model to create a package that can be loaded
 * in the browser as a global, through require() in node, or through
 * Common.js/AMD importers.
 */

(function (root, factory) {
  'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.PDSChromeService = factory();
  }
}(this, function () {

  ////--------------------- CONSTRUCTOR + FACTORY ---------------------////

  /**
   * Create an PDSChromeService instance to help microapps inside an iframe
   * with navigation, state management, and other tasks.
   * @constructor
   */
  var PDSChromeService = function PDSChromeService(config) {
    var _config = config || {};
    this._appName = _config.appName;
    this._appPathById = _config.appPaths;
    this._appIdByPath = toInverse(_config.appPaths);
    this._appPathPairs = /* Array<appId, appPath> */ toPairs(_config.appPaths);
    this._appContextPath = _config.appContextPath;
    this._appLocaleData = _config.appLocaleData;
    this._mainItems = _config.mainItems;
    this._profileItems = _config.profileItems;
    this._settingsItems = _config.settingsItems;
    this._globalSource = _config.globalSource || null;
    this._window = _config.window || window;
    return this;
  };

  /**
   * Create an PDSChromeService instance from the global `window.nav` object
   * injected by AppHub at load time.
   * @param  {object} globalSource
   * @return {PDSChromeService}
   */
  PDSChromeService.fromGlobal = function(globalSource) {
    /* Global instance info */
    var appName = (typeof globalSource.appName === 'string') ? globalSource.appName : '';
    var appPaths = (typeof globalSource.paths === 'object') ? globalSource.paths : {};
    var appContextPath = (typeof globalSource.contextPath === 'string') ? globalSource.contextPath : '';
    var appLocaleData = (typeof globalSource.localeData === 'object') ? globalSource.localeData : {};
    /* User profile */
    var userInfo = (typeof globalSource.user === 'object') ? globalSource.user : {};
    /* Navigation and menus */
    var mainItems = (typeof globalSource.main === 'object' && Array.isArray(globalSource.main.items)) ? globalSource.main.items : [];
    var profileItems = (typeof globalSource.profile === 'object' && Array.isArray(globalSource.profile.items)) ? globalSource.profile.items : [];
    var settingsItems = (typeof globalSource.settings === 'object' && Array.isArray(globalSource.settings.items)) ? globalSource.settings.items : [];

    return new PDSChromeService({
      appName: appName,
      appPaths: appPaths,
      appContextPath: appContextPath,
      appLocaleData: appLocaleData,
      userInfo: userInfo,
      mainItems: mainItems,
      profileItems: profileItems,
      settingsItems: settingsItems,
      globalSource: globalSource
    });
  };

  ////--------------------- INSTANCE METHODS ---------------------////

  /**
   * Returns the path to the microapp that matches `id`. Prepends the context path
   * automatically. Returns `null` if no microapp is found matching `id`.
   * @param  {string} appId
   * @param  {boolean=false} withoutChromeless If `true` the path will not have the chromeless query added
   * @return {string}
   */
  PDSChromeService.prototype.getMicroAppPath = function(id, withoutChromeless) {
    var _id = (typeof id === 'string' && id.length > 0) ? id : this.getCurrentMicroAppId();
    var path = this._appPathById[_id];
    if (!path) {
      return null;
    }
    if (withoutChromeless === true) {
      return path;
    }
    return PDSChromeService.util.addChromelessQuery(path);
  };
  /* Compatability with ng-apphub-service */
  PDSChromeService.prototype.getPath = PDSChromeService.prototype.getMicroAppPath;

  /**
   * Returns the id of the microapp accessible at `path`. If the context path is
   * prepended, strips it off before finding the microapp. Returns `null` if no
   * microapp is accessible at `path.`
   * @param  {string} path
   * @return {string}
   */
  PDSChromeService.prototype.getMicroAppId = function(path) {
    var _path = path;
    var context = this.getContextPath();
    if (_path.indexOf(context) === 0) {
      _path = _path.slice(context.length);
    }
    if (path.length === 0) {
      return null;
    }
    // if (path.slice(0, microAppPaths[i][0].length) === microAppPaths[i][0]) {
    for (var i=0; i<this._appPathPairs.length; i++) {
      if (_path.slice(0, this._appPathPairs[i][1].length) === this._appPathPairs[i][1]) {
        return this._appPathPairs[i][0];
      }
    }
    return null;
  };

  /**
   * Returns the id of the current microapp.
   * @return {string}
   */
  PDSChromeService.prototype.getCurrentMicroAppId = function(appId) {
    var path = this._window.location.pathname.toLowerCase(); // paths are explicitly lowercase
    return this.getMicroAppId(path) || null;
  };
  /* Compatability with ng-apphub-service */
  PDSChromeService.prototype.getCurrentApp = PDSChromeService.prototype.getCurrentMicroAppId;

  /**
   * Returns the AppHub instance's multi-tenant context path prefix, or an empty
   * string if there is no context path prefix.
   * @return {string}
   */
  PDSChromeService.prototype.getContextPath = function() {
    return this._appContextPath || '';
  };
  /* Compatability with ng-apphub-service */
  PDSChromeService.prototype.getContext = PDSChromeService.prototype.getContextPath;

  /**
   * Loads a new path in the app hub instance.
   * @return {string}
   */
  PDSChromeService.prototype.loadPath = function(path) {
    var chromelessPath = PDSChromeService.util.addChromelessQuery(path);
    this._window.dispatchEvent(new CustomEvent('app-hub-location-changed', {
      detail: { path: chromelessPath }
    }));
  };

  /**
   * Loads the microapp at `id`. Appends the `subpath`, `query`, and `hash` if
   * provided.
   * @param {string} id
   * @param {string} subpath optional URL subpath, will be prefixed with '/' if it is not already
   * @param {string} hash optional URL hash, will be prefixed with '#' if it is not already
   * @param {string} query optional URL query string, will be prefixed with '?' if it is not already
   * @return {string}
   */
  PDSChromeService.prototype.loadMicroApp = function(id, subpath, hash, query) {
    var path = this.getMicroAppPath(id, true);
    if (!path) {
      console.log('[PDSChromeService#loadMicroApp] No microapp found with id %s', id);
      return;
    }
    var _subpath = (typeof subpath === 'string' && subpath.length > 0) ? addPrefix('/', subpath) : '';
    var _hash    = (typeof hash === 'string' && hash.length > 0)       ? addPrefix('#', hash)    : '';
    var _query   = (typeof query === 'string' && query.length > 0)     ? addPrefix('#', query)   : '';
    var fullPath = addSuffix('/', path + _subpath) + _query + _hash;
    var chromelessPath = PDSChromeService.util.addChromelessQuery(fullPath);
    this._window.dispatchEvent(new CustomEvent('app-hub-location-changed', {
      detail: { path: chromelessPath }
    }));
  };

  ////--------------------- COMPAT WRAPPERS FOR OLD PXH-CHROME CONCEPTS ---------------------////

  PDSChromeService.compatability = {};

  PDSChromeService.compatability.wrapNavGlobal = function(navGlobal) {
    navGlobal.refresh = navGlobal.repaint = compatNavRefresh.bind(null);
    // @TODO: Decide if we should wrap any more old window.nav methods
    // in the event they're called by app code
    return navGlobal;
  };

  function compatNavRefresh(id, backendRefresh) {
    if (backendRefresh !== true) {
      // Re-render nav from mutations made directly to the window.nav object
      // NOTE: Unlike the old window.nav.refresh method, we can ignore the
      // id in this case and just refresh all the nav items
      window.dispatchEvent(new CustomEvent('app-hub-navigation-items-changed', {
        detail: { mainItems: window.nav.main.items }
      }));
      return;
    }
    if (backendRefresh === true && (id && typeof id === 'string')) {
      // Get the config for one app and update that item in the nav
      PDSChromeService.util.getJSON('/config/nav/' + id, function(err, appConfig) {
        if (err) return;
        // @TODO: Need to finish up here and search for the app in window.nav.main.items,
        // but it might not be there (could be in window.nav.profile.items or in
        // window.nav.settings.items).
        // appConfig: { items: Array<navItems: string>, id: string, path: string }
      });
      return;
    }
    if (backendRefresh === true) {
      // Get the config for all apps, and update the items and other things in window.nav
      PDSChromeService.util.getJSON('/config/', function(err, config) {
        if (err) return;
        // @TODO: Need to finish up here and decide what to do. The old `window.nav.refresh`
        // when it hit this point updated the whole config from scratch but that
        // might not make sense. Perhaps we should only update the items.
        // config: WindowNavGlobal (window.nav)
      });
    }
  };

  ////--------------------- PUBLIC STATIC UTIL METHODS ---------------------////

  PDSChromeService.util = {};

  PDSChromeService.util.getPath = function(locationObject) {
    return locationObject.pathname + locationObject.search + locationObject.hash;
  };

  PDSChromeService.util.getPathWithoutQuery = function(locationObject) {
    return locationObject.pathname +  locationObject.hash;
  };

  PDSChromeService.util.addChromelessQuery = function(path) {
    var uriParts = parseUri(path);
    if (uriParts.queryKey.hasOwnProperty('chromeless') && uriParts.queryKey.chromeless === 'true') {
      return path;
    }
    return uriParts.path + '?chromeless=true' + (uriParts.query.length>0 ? '&' + uriParts.query : '') + (uriParts.anchor.length>0 ? '#' + uriParts.anchor : '');
  };

  PDSChromeService.util.stripChromelessQuery = function(path) {
    var uriParts = parseUri(path);
    if (uriParts.queryKey.hasOwnProperty('chromeless') && uriParts.queryKey.chromeless === 'true') {
      var queryKeys = Object.keys(uriParts.queryKey);
      var queryString = (queryKeys.length > 1) ? chromelessQueryToString(queryKeys, uriParts.queryKey) : '';
      return uriParts.path + queryString + (uriParts.anchor.length>0 ? '#' + uriParts.anchor : '');
    }
    return path;
  };

  PDSChromeService.util.chromelessQueryToString = function(queryKeys, queryObject) {
    return '?' + queryKeys.reduce(function(accum, key, index, array) {
      if (key === 'chromeless') return accum;
      accum.push(key + '=' + queryObject[key]);
      return accum;
    }, []).join('&');
  };

  PDSChromeService.util.findNavItemByPath = function(path, items) {
    if (!path || path === "" || !items || !Array.isArray(items)) return null;
    var queue = items.slice(0);
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

  PDSChromeService.util.getJSON = function(url, callback) {
    var DONE = '4';
    var OK = '200';
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === DONE) {
        if (httpRequest.status === OK) {
          var response;
          try {
            response = JSON.parse(httpRequest.responseText);
          } catch (err) {
            return callback({ message: 'Response from server at "'+url+'" is not valid JSON' });
          }
          return callback(null, response);
        } else {
          return callback({ message: 'The server at "'+url+'" responded with error code "'+httpRequest.status+'"' });
        }
      }
    }
    httpRequest.open('GET', url, true);
    httpRequest.send();
  };

  ////--------------------- PRIVATE STATIC METHODS ---------------------////

  /**
   * Takes an object like { 'a ': 'dog', 'b' : 'cat' } and reverses the keys/values
   * returning { 'dog' : 'a', 'cat' : 'b' }. Assumes values are unique.
   * @param  {object} o
   * @return {object}
   */
  function toInverse(o) {
    var newVals = Object.keys(o);
    var inverted = {};
    for (var i=0; i<newVals.length; i++) {
      inverted[o[newVals[i]]] = newVals[i];
    }
    return inverted;
  };

  /**
   * Takes an object like { 'a ': 'dog', 'b' : 'cat' } and flattens it into an
   * array of [key, value] returning [ ['a', 'dog'], ['b', 'cat'] ].
   * @param  {object} o
   * @return {array}
   */
  function toPairs(o) {
    var keys = Object.keys(o);
    var pairs = [];
    for (var i=0; i<keys.length; i++) {
      pairs.push([keys[i], o[keys[i]]]);
    }
    return pairs;
  };

  /**
   * Adds the `prefix` to the beginning of `str` if it is not already added.
   * @param  {string} prefix
   * @param  {string} str
   * @return {string}
   */
  function addPrefix(prefix, str) {
    return (str.indexOf(prefix) === 0) ? str : prefix + str;
  };

  /**
   * Adds the `suffix` to the end of `str` if it is not already added.
   */
  function addSuffix(suffix, str) {
    return (str.slice(-1 * suffix.length) === suffix) ? str :  str + suffix;
  };

  /**
   * parseUri 1.2.2
   * (c) Steven Levithan <stevenlevithan.com>
   * MIT License
   */
  function parseUri (str) {
    var	o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;
    while (i--) uri[o.key[i]] = m[i] || "";
    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });
    return uri;
  };
  parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
      name:   "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  /**
   * CustomEvent polyfill
   * Credit to https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
   */
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

  return PDSChromeService;
}));
