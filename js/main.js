'use strict';

(function () {
  const mapPinMainMousedownHandler = function (evt) {
    window.utils.isMousedownEvent(evt, activateElements);
  };

  const mapPinMainKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, activateElements);
  };

  const deactivateElements = function () {
    window.map.disableMap();
    window.form.disableForm();
    window.mapPinMain.element.addEventListener(`mousedown`, mapPinMainMousedownHandler);
    window.mapPinMain.element.addEventListener(`keydown`, mapPinMainKeydownHandler);
  };

  deactivateElements();

  const activateElements = function () {
    window.map.enableMap();
    window.form.enableForm();
    window.mapPinMain.element.removeEventListener(`mousedown`, mapPinMainMousedownHandler);
    window.mapPinMain.element.removeEventListener(`keydown`, mapPinMainKeydownHandler);
  };
})();
