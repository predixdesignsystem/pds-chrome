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
        root.NavUtil = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {
      "foo":"bar"
    };
}));
