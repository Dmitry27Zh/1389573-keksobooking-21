'use strict';

(function () {
  const FILTRATION_INTERVAL = 500;

  window.debounce = function (cb) {
    window.setTimeout(cb, FILTRATION_INTERVAL);
  };
})();
