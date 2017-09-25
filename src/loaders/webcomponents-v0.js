(function() {
  'use strict';

  var webComponentsPolyfillNeeded = (
    'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')
  );

  if (webComponentsPolyfillNeeded) {
    var script = document.createElement('script');
    script.async = true;
    script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.head.appendChild(script);
  } else {
    var fire = function() {
      requestAnimationFrame(function() {
        window.WebComponents.ready = true;
        document.dispatchEvent(new CustomEvent('WebComponentsReady', {bubbles: true}));
      });
    };

    if (document.readyState !== 'loading') {
      fire();
    } else {
      document.addEventListener('readystatechange', function wait() {
        fire();
        document.removeEventListener('readystatechange', wait);
      });
    }
  }
})();
