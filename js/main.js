'use strict';

(function () {
  const deactivateElements = function () {
    window.map.disableMap();
    window.AdForm.disable();
    window.mapPinMain.activate();
  };

  deactivateElements();

  const activateElements = function () {
    window.map.enableMap();
    window.AdForm.enable();
  };

  window.main = {
    deactivateElements,
    activateElements,
  };
})();
