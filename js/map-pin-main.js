'use strict';

(function () {
  const mapPinMain = window.pin.mapPins.querySelector(`.map__pin--main`);
  const mapPinMainInitialLeft = mapPinMain.style.left;
  const mapPinMainInitialTop = mapPinMain.style.top;
  const mapPinMainImg = mapPinMain.querySelector(`img`);
  const MAP_PINS_MIN_CORD = 131;
  const MAP_PINS_MAX_CORD = 639;

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

  const moveMapPinMain = function (evt, moveSomething) {
    moveSomething(evt, function (move) {
      const getPinX = function (initialX, moveValueX) {
        let x = initialX - moveValueX;
        const maxCoord = window.pin.mapPins.offsetWidth - MapPinMainSizes.Width;
        if (x < 0) {
          x = 0;
        } else if (x > maxCoord) {
          x = maxCoord;
        }
        return x;
      };
      const getPinY = function (initialY, moveValueY) {
        let y = initialY - moveValueY;
        const minCoord = MAP_PINS_MIN_CORD - MapPinMainSizes.Height;
        const maxCoord = MAP_PINS_MAX_CORD - MapPinMainSizes.Height;
        if (y < minCoord) {
          y = minCoord;
        } else if (y > maxCoord) {
          y = maxCoord;
        }
        return y;
      };
      mapPinMain.style.left = `${getPinX(mapPinMain.offsetLeft, move.x)}px`;
      mapPinMain.style.top = `${getPinY(mapPinMain.offsetTop, move.y)}px`;
      window.adForm.fillAddress();
    });
  };


  const mapPinMainMousedownHandler = function (evt) {
    window.utils.isMousedownEvent(evt, function () {
      if (window.map.element.classList.contains(`map--faded`)) {
        window.main.activateElements();
        mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
      }
      moveMapPinMain(evt, window.move.add);
    });
  };

  const mapPinMainKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.main.activateElements();
      mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
    });
  };

  const deactivateMapPinMain = function () {
    mapPinMain.style.left = mapPinMainInitialLeft;
    mapPinMain.style.top = mapPinMainInitialTop;
    MapPinMainSizes.changeDeactivatedHeight();
  };

  const activateMapPinMain = function () {
    mapPinMain.addEventListener(`mousedown`, mapPinMainMousedownHandler);
    mapPinMain.addEventListener(`keydown`, mapPinMainKeydownHandler);
    MapPinMainSizes.changeActivatedHeight();
  };

  window.mapPinMain = {
    activate: activateMapPinMain,
    deactivate: deactivateMapPinMain,
    getCoordX,
    getCoordY,
  };
})();
