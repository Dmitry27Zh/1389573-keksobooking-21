'use strict';

(function () {
  const mapPinMain = window.pin.mapPins.querySelector(`.map__pin--main`);
  const mapPinMainImg = mapPinMain.querySelector(`img`);

  const MapPinMainSizes = {
    Width: mapPinMainImg.offsetWidth,
    Height: mapPinMainImg.offsetHeight + 22,
    changeDeactivatedHeight() {
      this.Height = mapPinMainImg.offsetHeight + 22;
    },
    changeActivatedHeight() {
      this.Height = mapPinMainImg.offsetHeight / 2;
    }
  };

  const getCoordX = function () {
    return Math.round(mapPinMain.offsetLeft + MapPinMainSizes.Width / 2);
  };
  const getCoordY = function () {
    return Math.round(mapPinMain.offsetTop + MapPinMainSizes.Height);
  };

  const mapPinMainMousedownHandler = function (evt) {
    window.utils.isMousedownEvent(evt, function () {
      if (window.map.element.classList.contains(`map--faded`)) {
        window.main.activateElements();
        mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
      }
    });
  };

  const mapPinMainKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.main.activateElements();
      mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
    });
  };

  const activateMapPinMain = function () {
    mapPinMain.addEventListener(`mousedown`, mapPinMainMousedownHandler);
    mapPinMain.addEventListener(`keydown`, mapPinMainKeydownHandler);
    MapPinMainSizes.changeActivatedHeight();
  };

  window.mapPinMain = {
    activate: activateMapPinMain,
    getCoordX,
    getCoordY,
  };
})();
