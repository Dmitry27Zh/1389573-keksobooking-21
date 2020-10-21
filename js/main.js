'use strict';

(function () {
  const deactivateElements = function () {
    window.map.disableMap();
    window.adForm.disable();
    window.mapPinMain.activate();
  };

  deactivateElements();

  const activateElements = function () {
    window.map.enableMap();
    window.adForm.enable();
  };

  window.main = {
    deactivateElements,
    activateElements,
  };
})();
