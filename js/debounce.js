'use strict';

(function () {
  const FILTRATION_INTERVAL = 500;
  let lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, FILTRATION_INTERVAL);
  };
})();
