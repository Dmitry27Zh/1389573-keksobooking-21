'use strict';

(function () {
  const mapPinMain = window.map.mapPins.querySelector(`.map__pin--main`);
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

  const activateMapPinMain = function () {
    MapPinMainSizes.changeActivatedHeight();
  };

  const getCoordinateX = function (styleLeft, width) {
    return Math.round(parseInt(styleLeft, 10) + width / 2);
  };

  const getCoordinateY = function (styleTop, height) {
    return Math.round(parseInt(styleTop, 10) + height);
  };

  const mapPinMainX = function () {
    return getCoordinateX(mapPinMain.style.left, MapPinMainSizes.Width);
  };
  const mapPinMainY = function () {
    return getCoordinateY(mapPinMain.style.top, MapPinMainSizes.Height);
  };

  window.mapPinMain = {
    element: mapPinMain,
    activate: activateMapPinMain,
    x: mapPinMainX,
    y: mapPinMainY,
  };
})();
